import os
from dataclasses import dataclass
from flask import Flask, jsonify, request
from utils.supabase_client import supabase
from datetime import datetime
import pytz
import os
import json  # <-- Added the missing json import!
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

# --- 1. MIDDLEWARE: REQUEST LOGGING ---
# This helps you debug what the Robot or App is sending in real-time
@app.before_request
def log_request_info():
    print(f"📥 [LOG] {request.method} {request.path}")
    if request.is_json:
        print(f"📦 [BODY] {request.get_json()}")

# --- 2. GLOBAL ERROR HANDLERS ---
# Ensures your API always returns JSON even if it crashes
@app.errorhandler(404)
def resource_not_found(e):
    return jsonify({"Error": "Resource not found", "code": 404}), 404

@app.errorhandler(500)
def internal_server_error(e):
    return jsonify({"Error": "Internal server error. Check backend logs.", "code": 500}), 500

@app.errorhandler(400)
def bad_request(e):
    return jsonify({"Error": "Bad request. Check your JSON keys.", "code": 400}), 400

# --- 3. CORE ENDPOINTS ---

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "status": "Online",
        "message": "Bean's Groq AI Backend is running",
        "system": "NeuroBloom v1.0",
        "system_time": get_ist_time()
    }), 200

# NEW: Deployment Health Check for Render/Monitoring
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "bean-backend",
        "database": "connected"
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

        # 2. THE UPGRADED GROQ AI LOGIC (Forcing JSON Output)
        bean_persona = """
        You are Bean, a highly empathetic, warm, and supportive mental wellness companion robot created by the startup NeuroBloom. 
        Your goal is to listen, validate the user's feelings, and offer gentle encouragement.
        Keep your responses short, conversational, and friendly (like a text message). 
        Never give medical diagnoses.

        CRITICAL INSTRUCTION: You must respond strictly in JSON format. 
        Analyze the user's message and determine their primary emotion from this exact list: [Joy, Sadness, Anxiety, Anger, Calm, Active].
        
        Your output must be a valid JSON object looking exactly like this:
        {
            "reply": "Your conversational response to the user here.",
            "detected_mood": "One of the exact mood words from the list above"
        }
        """
        
        chat_completion = groq_client.chat.completions.create(
            messages=[
                {"role": "system", "content": bean_persona},
                {"role": "user", "content": user_message}
            ],
            model="llama-3.1-8b-instant",
            response_format={"type": "json_object"} 
        )
        
        # 3. Parse JSON and split data
        ai_response_data = json.loads(chat_completion.choices[0].message.content)
        ai_reply = ai_response_data['reply']
        detected_mood = ai_response_data['detected_mood']

        # 4. Log BEAN'S reply 
        supabase.table('chat_logs').insert({
            "user_id": user_id,
            "message": ai_reply,
            "created_at": get_ist_time(),
            "sender": "bean"
        }).execute()

        # 5. Log the USER'S MOOD for the Caregiver Dashboard Charts!
        supabase.table('emotion_events').insert({
            "user_id": user_id,
            "mood": detected_mood,
            "created_at": get_ist_time()
        }).execute()

        return jsonify ({"status": "success", "response": ai_reply}), 200

    except Exception as e:
        return jsonify ({"status": "error", "message": f"AI/Database Error: {str(e)}"}), 500

# --- EMAIL HELPER FUNCTION ---
def send_verification_email(patient_email, token):
    sender_email = os.getenv("EMAIL_ADDRESS")
    sender_password = os.getenv("EMAIL_PASSWORD") 

    # TODO: Replace YOUR_MAC_IP with your actual Wi-Fi IP while testing!
    verify_link = f"http://192.168.8.146:5001/api/guardian/verify/{token}"

    msg = MIMEMultipart()
    msg['From'] = f"NeuroBloom Security <{sender_email}>"
    msg['To'] = patient_email
    msg['Subject'] = "Action Required: Guardian Access Request"

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

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, patient_email, msg.as_string())


# --- 4. The Guardian Request Endpoint ---
@app.route('/api/guardian/request-link', methods=['POST'])
def request_guardian_link():
    data = request.json
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
        link_check = supabase.table('guardian_links').select('*').eq('verification_token', token).single().execute()

        if not link_check.data:
            return "Invalid or expired verification link.", 400

        if link_check.data['status'] == 'verified':
            return "This account is already verified. You can close this window.", 200

        supabase.table('guardian_links').update({"status": "verified"}).eq('verification_token', token).execute()

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
        status_check = supabase.table('guardian_links') \
            .select('status') \
            .eq('guardian_user_id', guardian_user_id) \
            .order('created_at', desc=True) \
            .limit(1) \
            .execute()

        if not status_check.data:
            return jsonify({"status": "error", "message": "No pending request found for this guardian."}), 404

        current_status = status_check.data[0]['status'] 

        return jsonify({
            "status": "success", 
            "verification_status": current_status
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": f"Database Error: {str(e)}"}), 500

# --- 7. The Robot Claim Endpoint (new from main) ---
@app.route('/api/v1/robot/claim', methods=['POST'])
def claim_robot():
    data = request.json
    serial = data.get('robot_serial') 
    user_id = data.get('user_id')
    received_pin = data.get('pin') 

    if not serial or not user_id or not received_pin:
        return jsonify({"error": "Serial, User ID, and PIN are required"}), 400
    
    try:
        # 1. Fetch the robot 
        query = supabase.table("robots").select("pairing_code").eq("serial_number", serial).execute()
        
        # 2. Check if the robot exists in the table
        if not query.data or len(query.data) == 0:
            return jsonify({"status": "error", "message": "Robot serial number not found"}), 404

        # 3. Extract the first result
        db_robot = query.data[0]
        
        # 4. Verify the PIN
        if str(db_robot.get('pairing_code')) != str(received_pin):
            return jsonify({"status": "error", "message": "Invalid PIN"}), 401

        # 5. Success: Perform the Update
        supabase.table("robots").update({
            "owner_id": user_id,
            "is_online": True,
            "last_paired_at": "now()" 
        }).eq("serial_number", serial).execute()

        return jsonify({
            "status": "success",
            "message": f"Robot {serial} successfully linked to {user_id}"
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"System Error: {str(e)}"
        }), 500

if __name__ == '__main__':
    # Use environment port if available (for Render deployment)
    port = int(os.environ.get("PORT", 5001))
    app.run(debug=True, host="0.0.0.0", port=port)