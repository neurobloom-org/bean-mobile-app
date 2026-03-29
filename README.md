<div align="center">

# Bean Mobile App
### **The AI-Powered Pulse of the NeuroBloom Ecosystem**

<div align="center">
  <img src="https://img.shields.io/badge/React--Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq_AI_&_LLaMA_3-F55036?style=for-the-badge&logo=meta&logoColor=white" />
</div>

---

## 🌟 Overview
**Bean** is more than an app; it is the **central command center** for the Bean Mental Wellness Robot. Developed by **NeuroBloom**, this mobile interface bridges the gap between physical robotics and cloud-based emotional intelligence. It serves as a secure, empathetic bridge connecting users, guardians, and therapeutic systems into a single supportive ecosystem.

---

## 🛠 Technical Architecture
The Bean Mobile App is built on a **High-Availability "Thin-Client" Architecture**:
* **Frontend:** React Native via Expo (Cross-platform iOS/Android) with Global Auth State Management.
* **Backend:** Flask Micro-framework (Python) handling complex API routing and database synchronization.
* **Database & Auth:** Supabase (PostgreSQL) utilizing Row Level Security (RLS) and custom JSONB metadata storage.
* **Intelligence Engine:** Groq Cloud (LLaMA 3.1 8b-instant) enforcing strict JSON-structured emotional analysis.
* **Emergency Protocols:** Twilio Programmable SMS for instant crisis intervention.

---

## 👤 User Ecosystem

### 🧘 **Primary User (The Companion)**
* **Real-time Interaction:** Engage in empathetic, AI-driven dialogue with the Bean Robot.
* **Emotional Regulation:** Access grounding exercises and mood-tracking tools.
* **Secure Independence:** Approve or deny Guardian connection requests via secure email verification links.

### 🛡️ **Guardian / Therapist (The Support)**
* **Progress Analytics:** View real-time emotional breakdowns (Joy, Sadness, Anxiety, Anger, Calm, Active) via the Caregiver Donut Chart Dashboard.
* **Safety Protocols (SOS):** Receive automated Twilio SMS alerts immediately if the patient reports a high-anxiety or crisis episode to Bean.
* **Intervention Tools:** Remotely assign tasks or wellness activities to support the user’s journey.

---

## 🚀 Key Features

* **📊 AI Emotion Extraction:** Conversations with Bean are processed in real-time, automatically categorizing the user's primary emotion and logging it to the cloud without interrupting the chat.
* **🔗 Secure Guardian Linking:** A robust verification flow preventing unauthorized dashboard access until the patient explicitly approves the email request.
* **🚨 Automated Crisis Dispatch:** The system reads the Guardian's verified phone number directly from Supabase's hidden `raw_user_meta_data` to dispatch emergency texts instantly.
* **🤖 Robot Synchronization:** One-touch pairing linking the physical Bean robot to the user's cloud profile.
* **🔐 Clinical-Grade Security:** Role-based access control (RBAC) ensuring patient data remains completely private.

---

## 📦 Installation & Setup

**1. Clone the Repository:**
```bash
git clone [https://github.com/NeuroBloom-Dev/bean-mobile-app.git](https://github.com/NeuroBloom-Dev/bean-mobile-app.git)
cd bean-mobile-app
```

**2. Install Frontend Dependencies (React Native / Expo):**
```bash
npm install
```

**3. Configure Environment Variables:**
Create a `.env` file in your root directory and add your keys:
```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
# Backend variables (Groq, Twilio, Email) are handled in the Flask app.py environment
```

**4. Start the Application:**
```bash
# Clears cache and starts the Expo bundler
npx expo start -c
```
*Scan the QR code with the Expo Go app on your physical device, or press `i` to open the iOS simulator.*

</div>

