from flask import Flask, jsonify, request
from utils.supabase_client import supabase
from datetime import datetime
import pytz
import os
from dotenv import load_dotenv
from groq import Groq
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import secrets

# Load the hidden variables from your .env file
load_dotenv()

# Configure the Groq AI Client
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

app = Flask(__name__)

# --- UTILS ---
def get_ist_time():
    """Converts UTC to Sri Lanka Time for accurate emotional logging."""
    sri_lanka_tz = pytz.timezone('Asia/Colombo')
    return datetime.now(sri_lanka_tz).strftime('%Y-%m-%d %I:%M %p')

# --- ROUTES ---

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "status": "Online",
        "message": "Bean's Groq AI Backend is running",
        "system_time": get_ist_time()
    }), 200

# 1. The Pairing Endpoint (Links Mobile App + Robot to Cloud)
@app.route('/api/v1/robot/pair', methods=['POST'])
def pair_robot():
    data = request.json
    user_id = data.get('user_id')
    robot_serial = data.get('robot_serial')
    
    if not all([user_id, robot_serial]):
        return jsonify({"error": "Missing user_id or robot_serial"}), 400

    try:
        robot_check = supabase.table('robots').select('*').eq('robot_serial', robot_serial).single().execute()
        if not robot_check.data:
            return jsonify({"status": "error", "message": "Robot serial number not found"}), 404

        supabase.table('robots').update({
            "owner_id": user_id,
            "is_paired": True,
            "status": "online"
        }).eq('robot_serial', robot_serial).execute()

        return jsonify({"status": "success", "message": f"Bean ({robot_serial}) linked."}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": f"Database Error: {str(e)}"}), 500

# 2. The Chat Logging Endpoint (Robot Hardware sends data here)
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_id = data.get('user_id')
    message = data.get('message')

    if not user_id or not message:
        return jsonify({"error": "User ID and message are required"}), 400
    
    try:
        supabase.table('chat_logs').insert({
            "user_id": user_id,
            "message": message,
            "created_at": get_ist_time(),
            "sender": "user"
        }).execute()
        return jsonify ({"status" : "success"}), 200
    except Exception as e:
        return jsonify ({"status" : "error", "message" : f"Database Error: {str(e)}"}), 500

# 3. The App Chat Endpoint (Mobile App talks to Bean's AI here)
@app.route('/api/app/chat', methods=['POST'])
def app_chat():
    data = request.json
    user_id = data.get('user_id')
    user_message = data.get('message')

    if not user_id or not user_message:
        return jsonify({"error": "User ID and message are required"}), 400
    
    try:
        # 1. Log the USER'S message to Supabase
        supabase.table('chat_logs').insert({
            "user_id": user_id,
            "message": user_message,
            "created_at": get_ist_time(),
            "sender": "user"
        }).execute()

        # 2. THE GROQ AI LOGIC
        bean_persona = """
        You are Bean, a highly empathetic, warm, and supportive mental wellness companion robot created by the startup NeuroBloom. 
        Your goal is to listen, validate the user's feelings, and offer gentle encouragement.
        Keep your responses short, conversational, and friendly (like a text message). 
        Never give medical diagnoses.
        """
        
        # 3. Ask Groq for the response (Using LLaMA 3 - ultra fast and smart)
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": bean_persona},
                {"role": "user", "content": user_message}
            ],
            model="llama-3.1-8b-instant",
        )
        
        ai_reply = chat_completion.choices[0].message.content

        # 4. Log BEAN'S reply to Supabase 
        supabase.table('chat_logs').insert({
            "user_id": user_id,
            "message": ai_reply,
            "created_at": get_ist_time(),
            "sender": "bean"
        }).execute()

        # 5. Send the reply back to React Native
        return jsonify ({
            "status" : "success",
            "response" : ai_reply
        }), 200

    except Exception as e:
        return jsonify ({"status" : "error", "message" : f"AI/Database Error: {str(e)}"}), 500
    
    # --- EMAIL HELPER FUNCTION ---
def send_verification_email(patient_email, token):
    sender_email = os.getenv("EMAIL_ADDRESS")
    sender_password = os.getenv("EMAIL_PASSWORD") 

    # TODO: Replace YOUR_MAC_IP with your actual Wi-Fi IP while testing!
    # When deployed, this will be your Render/Cloud URL.
    verify_link = f"http://192.168.8.146:5001/api/guardian/verify/{token}"

    msg = MIMEMultipart()
    msg['From'] = f"NeuroBloom Security <{sender_email}>"
    msg['To'] = patient_email
    msg['Subject'] = "Action Required: Guardian Access Request"

    # The Email Body
    body = f"""
    Hello,

    A guardian has requested to connect with your NeuroBloom account to support your mental wellness journey with Bean.

    To approve this request and securely link your accounts, please click the verification link below:
    {verify_link}

    If you did not expect this request, you can safely ignore this email.

    Warmly,
    The NeuroBloom Team
    """
    msg.attach(MIMEText(body, 'plain'))

    # Connect to Google's SMTP server securely and send the email
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, patient_email, msg.as_string())


# --- 4. The Guardian Request Endpoint ---
@app.route('/api/guardian/request-link', methods=['POST'])
def request_guardian_link():
    data = request.json
    # Read the data the way React Native sends it:
    guardian_incoming_id = data.get('guardian_id') 
    patient_email = data.get('patient_email')

    if not guardian_incoming_id or not patient_email:
        return jsonify({"error": "Missing guardian ID or patient email"}), 400

    try:
        patient_check = supabase.table('users').select('id').eq('email', patient_email).execute()
        
        if len(patient_check.data) == 0:
            return jsonify({
                "status": "error", 
                "message": "No NeuroBloom user found with that email."
            }), 404
        
        patient_user_id = patient_check.data[0]['id']
        token = secrets.token_urlsafe(32)

        # Save to the database using your exact column names
        supabase.table('guardian_links').insert({
            "guardian_user_id": guardian_incoming_id,
            "patient_user_id": patient_user_id,
            "status": "pending",
            "verification_token": token
        }).execute()

        send_verification_email(patient_email, token)

        return jsonify({
            "status": "success", 
            "message": "Verification email sent. Waiting for patient approval."
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": f"Server Error: {str(e)}"}), 500
        
    
    # --- 5. The Email Click Endpoint (Patient clicks this in their browser) ---
@app.route('/api/guardian/verify/<token>', methods=['GET'])
def verify_guardian(token):
    try:
        # 1. Look up the token in the database
        link_check = supabase.table('guardian_links').select('*').eq('verification_token', token).single().execute()

        if not link_check.data:
            return "Invalid or expired verification link.", 400

        # 2. If it's already verified, just tell them
        if link_check.data['status'] == 'verified':
            return "This account is already verified. You can close this window.", 200

        # 3. Update the status to 'verified'
        supabase.table('guardian_links').update({"status": "verified"}).eq('verification_token', token).execute()

        # 4. Show a friendly success webpage
        return """
        <html>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #F8FAFC;">
            <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 400px; margin: 0 auto;">
                <h1 style="color: #22C55E;">Verification Successful! ✅</h1>
                <p style="color: #334155; font-size: 16px;">You have successfully securely connected with your guardian.</p>
                <p style="color: #64748B; font-size: 14px;">You can now close this window and return to your day.</p>
            </div>
          </body>
        </html>
        """, 200

    except Exception as e:
        return f"Server Error: {str(e)}", 500


    # --- 6. The Status Check Endpoint (React Native app polls this) ---
@app.route('/api/guardian/status/<guardian_user_id>', methods=['GET'])
def check_guardian_status(guardian_user_id):
    try:
        # Fetch the most recent link request for this specific guardian
        status_check = supabase.table('guardian_links') \
            .select('status') \
            .eq('guardian_user_id', guardian_user_id) \
            .order('created_at', desc=True) \
            .limit(1) \
            .execute()

        if not status_check.data:
            return jsonify({"status": "error", "message": "No pending request found for this guardian."}), 404

        current_status = status_check.data[0]['status'] # Will be 'pending' or 'verified'

        return jsonify({
            "status": "success", 
            "verification_status": current_status
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": f"Database Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)