# HealthGuardian

## Overview
HealthGuardian is a project designed to assist individuals suffering from dementia. It consists of two main components:

1. **DementiaBot**: A smart robot that tracks and follows dementia patients, reminds them of important information, provides AI therapy, and delivers medicines at scheduled times.
2. **HealthGuardian App**: A React Native app that allows caregivers and family members to monitor the patient, schedule medicine deliveries, book doctor appointments, and control the DementiaBot via video connection.

## Features

### DementiaBot
- Tracks the movement of dementia patients using YOLO v8-based detection.
- Engages in live conversations using **Gemini Live APIs**.
- Remembers patient-specific information and provides reminders.
- Acts as an AI therapist for mental health support.
- Delivers medicines via a servo-controlled medicine box.

### HealthGuardian App
- Displays patient reports.
- Allows scheduling of doctor checkups.
- Provides an instant video connection with the bot.
- Enables remote bot control.
- Allows caregivers to schedule medicine deliveries.

## Technologies Used
- **Robot:** Python (FastAPI, Google Gemini API, YOLO v8, WebSockets, OpenCV, Pyttsx3, SpeechRecognition)
- **App:** React Native
- **Hardware:** Raspberry Pi, Servo Motor, Camera, Four Geared Motors and Motor Driver

## Images
App Images

![1743304008375](https://github.com/user-attachments/assets/7637b93d-0075-4038-b82a-247d1981c38e)

Bot Images

![1743304008368](https://github.com/user-attachments/assets/bcd4e7da-d7ae-470f-9985-4b1e9bc09873)

## Setup Guide

### Setting Up the HealthGuardian App (React Native)

#### Prerequisites:
- Install [Node.js](https://nodejs.org/) (Ensure npm/yarn is available)
- Install [Expo CLI](https://expo.dev/)

#### Installation Steps:
```sh
# Clone the repository
git clone https://github.com/your-repo/HealthGuardian.git
cd HealthGuardian/Android

# Install dependencies
npm install

# Start the Expo development server
npx expo start
```

#### Running the App:
- Scan the QR code in the Expo Developer Tools using the Expo Go app (Android/iOS).

---

### Setting Up the DementiaBot (Python & Raspberry Pi)

#### Prerequisites:
- Raspberry Pi with Python 3 installed
- Camera module connected
- Servo motor connected

#### Installation Steps:
```sh
# Clone the repository
git clone https://github.com/your-repo/HealthGuardian.git
cd HealthGuardian/Bot

# Create a virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install RPi.GPIO
pip install time
pip install os-sys
pip install asyncio
pip install google-generativeai
pip install fastapi
pip install websockets
pip install base64
pip install json
pip install pyttsx3
pip install SpeechRecognition
pip install opencv-python
pip install torch
pip install ultralytics
```

#### Running the Bot:
```sh
python BotMovement.py
python BotServoMove.py
python BotSpeech.py
```

---

## Contributors
1. [Ashish Gupta](https://github.com/haitomnsg/)
2. [Rubina Dangol Maherjan](https://github.com/ruBY-DANGOL)
3. [Santit Shakya](https://github.com/santit23)
4. [Krishna Singh](https://github.com/krishna09-dev)

## License
This project is open-source and available under the [MIT License](LICENSE).
