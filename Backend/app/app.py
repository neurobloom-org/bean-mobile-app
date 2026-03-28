from flask import Flask, jsonify, request
from utils.supabase_client import supabase
from datetime import datetime
import pytz
import os
from dotenv import load_dotenv
from groq import Groq

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

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)