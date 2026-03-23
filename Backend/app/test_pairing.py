import requests
import json

# --- CONFIGURATION ---
BASE_URL = "http://127.0.0.1:5001/api/v1/robot/claim"
USER_ID = "63147dd7-c028-4ff1-86b3-42d6cad802d8"
SERIAL = "BEAN-001"
CORRECT_PIN = "1234"

# --- TEST SCENARIOS ---
test_cases = [
    {
        "name": "✅ SUCCESS: Valid Pairing",
        "payload": {"robot_serial": SERIAL, "user_id": USER_ID, "pin": CORRECT_PIN},
        "expected_status": 200
    },
    {
        "name": "❌ FAILURE: Invalid PIN",
        "payload": {"robot_serial": SERIAL, "user_id": USER_ID, "pin": "9999"},
        "expected_status": 401
    },
    {
        "name": "❌ FAILURE: Missing Serial Number",
        "payload": {"user_id": USER_ID, "pin": CORRECT_PIN},
        "expected_status": 400
    },
    {
        "name": "❌ FAILURE: Robot Not Found",
        "payload": {"robot_serial": "FAKE-ROBOT-XYZ", "user_id": USER_ID, "pin": CORRECT_PIN},
        "expected_status": 404
    }
]

def run_tests():
    print(f"🚀 Starting NeuroBloom Backend Test Suite...\n" + "="*50)
    
    for case in test_cases:
        print(f"Running: {case['name']}")
        try:
            response = requests.post(BASE_URL, json=case['payload'])
            
            if response.status_code == case['expected_status']:
                print(f"  ✨ PASS (Status: {response.status_code})")
            else:
                print(f"  ⚠️ FAIL (Expected {case['expected_status']}, got {response.status_code})")
                print(f"  Response: {response.text}")
                
        except Exception as e:
            print(f"  ❌ Connection Error: {e}")
        print("-" * 50)

if __name__ == "__main__":
    run_tests()