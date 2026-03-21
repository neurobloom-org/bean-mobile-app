import requests
import json

# Replace this with your actual User ID from the Supabase 'users' table
USER_ID = "63147dd7-c028-4ff1-86b3-42d6cad802d8" 
# This must match the 'serial_number' you manually inserted into the 'robots' table
SERIAL_NUMBER = "BEAN-001"
# This must match the 'pairing_code' in your 'robots' table
PAIRING_PIN = "1234" 

URL = "http://127.0.0.1:5001/api/v1/robot/claim"

payload = {
    "robot_serial": SERIAL_NUMBER,
    "user_id": USER_ID,
    "pin": PAIRING_PIN
}

print(f"🚀 Sending claim request for {SERIAL_NUMBER}...")

try:
    response = requests.post(URL, json=payload)
    print(f"📡 Status Code: {response.status_code}")
    print(f"📦 Response: {json.dumps(response.json(), indent=2)}")
except Exception as e:
    print(f"❌ Connection Failed: {e}")