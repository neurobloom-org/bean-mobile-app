from dataclasses import dataclass
from flask import Flask, jsonify, request
from utils.supabase_client import supabase

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"message":"Bean's AI Backend is running"}), 200


# The endpoint for Bean's hardware to talk to
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_id = data.get('user_id')
    message = data.get('message')


    if not user_id or not message:
        return jsonify({"error": "User ID and message are required"}), 400
    
    #test the database connection by fetching the user
    try:
        user_response = supabase.table('users').select('*').eq('id', user_id).execute()

        return jsonify ({
            "status" : "success",
            "message" : f"Recieved `{message}`. Database connection is working!"
        }), 200

    except Exception as e:
        return jsonify ({
            "status" : "error",
            "message" : f"Error: {str(e)}"
        }), 500

#The new endpoint for the robot to "claim" it's owner
@app.route('/api/v1/robot/claim', methods=['POST'])
def claim_robot():
    data = request.json
    # Ensure these keys match what your test_pairing.py is sending!
    serial = data.get('robot_serial') 
    user_id = data.get('user_id')
    received_pin = data.get('pin') 

    if not serial or not user_id or not received_pin:
        return jsonify({"error": "Serial, User ID, and PIN are required"}), 400
    
    try:
        # 1. Fetch the robot without .single() to avoid the crash
        query = supabase.table("robots").select("pairing_code").eq("serial_number", serial).execute()
        
        # 2. Check if the robot exists in the table
        if not query.data or len(query.data) == 0:
            return jsonify({"status": "error", "message": "Robot serial number not found"}), 404

        # 3. Extract the first (and only) result
        db_robot = query.data[0]
        
        # 4. Verify the PIN (Convert both to strings to avoid type mismatch)
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
    app.run(debug=True, host="0.0.0.0", port=5001)

