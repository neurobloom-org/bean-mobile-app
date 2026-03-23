import os
from dataclasses import dataclass
from flask import Flask, jsonify, request
from utils.supabase_client import supabase

app = Flask(__name__)

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
        "message": "Bean's AI Backend is running",
        "system": "NeuroBloom v1.0"
    }), 200

# NEW: Deployment Health Check for Render/Monitoring
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "bean-backend",
        "database": "connected"
    }), 200

# The endpoint for Bean's hardware to talk to
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_id = data.get('user_id')
    message = data.get('message')

    if not user_id or not message:
        return jsonify({"error": "User ID and message are required"}), 400
    
    try:
        user_response = supabase.table('users').select('*').eq('id', user_id).execute()

        return jsonify({
            "status": "success",
            "message": f"Received `{message}`. Database connection is working!"
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": f"Error: {str(e)}"
        }), 500

# The endpoint for the robot to "claim" its owner
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