import os
import asyncio
import google.generativeai as genai
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
import websockets
import base64
import json
import pyttsx3
import speech_recognition as sr


# Configure Gemini API
GEMINI_API_KEY = ''
if not GEMINI_API_KEY:
    print("WARNING: Gemini API key not set. Using mock responses.")

# Initialize FastAPI
app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class DementiaAssistant:
    def __init__(self):
        try:
            # Initialize Gemini model if API key is available
            if GEMINI_API_KEY:
                genai.configure(api_key=GEMINI_API_KEY)
                self.model = genai.GenerativeModel('gemini-2.0-flash')
            else:
                print("No Gemini API key found. Using mock responses.")
                self.model = None
            
            self.conversation_history = []
        except Exception as e:
            print(f"Model initialization error: {e}")
            self.model = None

    async def generate_response(self, message: str) -> str:
        # Mock response if no Gemini API key
        if not self.model:
            return f"Mock response to: {message}. I'm here to help!"

        try:
            # Add message to conversation history
            self.conversation_history.append(message)
            
            # Limit conversation history
            if len(self.conversation_history) > 5:
                self.conversation_history.pop(0)
            
            # Prepare context-aware prompt
            full_context = """Name: Jack

                Age: 75 years old

                Diagnosis: Early stages of dementia, with short-term memory loss and mild cognitive impairment.

                Medical History: No significant physical health issues, but experiences difficulty remembering recent events and maintaining focus on daily tasks.

                Support System: Jack's family provides primary care and supervision, but they work full-time, so he spends a significant amount of time alone during the day.

                Environment: Lives in a comfortable, well-furnished home with clear markers and reminders for daily tasks.""".join(self.conversation_history)
            
            prompt = f"""You are a compassionate AI assistant helping a dementia patient. 
            Previous context: {full_context}
            Current input: {message}
            Provide a gentle, clear, and supportive response that helps the patient feel understood and supported.
            Dont provide lengthy responses all the time look at the context and answer accordingly."""
            
            # Generate response
            response = self.model.generate_content(prompt)
            return response.text
        
        except Exception as e:
            return f"I'm having trouble understanding. Could you repeat that? Error: {str(e)}"

# WebSocket endpoint
@app.websocket("/assist")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    assistant = DementiaAssistant()
    
    try:
        while True:
            try:
                # Receive message (could be text or audio data)
                data = await websocket.receive()
                
                message = ""
                is_audio = False
                
                # Check if it's text or binary data
                if isinstance(data, str):
                    # Try to parse as JSON
                    try:
                        json_data = json.loads(data)
                        if 'audio' in json_data:
                            # This is base64 encoded audio data
                            audio_data = base64.b64decode(json_data['audio'])
                            message = await transcribe_audio(audio_data)
                            is_audio = True
                        else:
                            message = json_data.get('text', '')
                    except json.JSONDecodeError:
                        message = data
                elif isinstance(data, bytes):
                    # Direct binary audio data
                    message = await transcribe_audio(data)
                    is_audio = True
                
                # Generate response
                response_text = await assistant.generate_response(message)
                
                # Send response back
                if is_audio:
                    # Convert text to speech and send as audio
                    audio_response = await text_to_speech(response_text)
                    await websocket.send_bytes(audio_response)
                else:
                    await websocket.send_text(response_text)
            
            except WebSocketDisconnect:
                print("Client disconnected")
                break
            
            except Exception as e:
                error_response = f"An error occurred: {str(e)}"
                await websocket.send_text(error_response)
                print(f"WebSocket error: {e}")
    
    except Exception as e:
        print(f"Unexpected WebSocket error: {e}")

async def transcribe_audio(audio_data: bytes) -> str:
    """
    Convert speech to text using a speech recognition service.
    In a production environment, you would use a service like Google Speech-to-Text,
    Azure Speech Services, or Whisper.
    """
    try:
        # This is a placeholder for actual speech recognition
        # In production, you would call an API like:
        # return await call_speech_to_text_api(audio_data)
        
        # For demo purposes, we'll just return a mock response
        print("Received audio data (mock transcription)")
        return "This is a mock transcription of your audio input."
        
    except Exception as e:
        print(f"Speech recognition error: {e}")
        return "I couldn't understand what you said. Could you please repeat?"

async def text_to_speech(text: str) -> bytes:
    """
    Convert text to speech using a TTS service.
    In a production environment, you would use a service like Google Text-to-Speech,
    Azure Speech Services, or Amazon Polly.
    """
    try:
        # This is a placeholder for actual TTS
        # In production, you would call an API like:
        # return await call_text_to_speech_api(text)
        
        # For demo purposes, we'll just return mock audio data
        print(f"Generating speech for: {text}")
        return b"mock_audio_data"
        
    except Exception as e:
        print(f"Text-to-speech error: {e}")
        return b"error_audio_data"

# Initialize text-to-speech engine
engine = pyttsx3.init()

def speak(text):
    engine.say(text)
    engine.runAndWait()

def listen():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        recognizer.adjust_for_ambient_noise(source)
        try:
            audio = recognizer.listen(source)
            text = recognizer.recognize_google(audio)
            return text
        except sr.UnknownValueError:
            return "Sorry, I couldn't understand that."
        except sr.RequestError:
            return "Speech recognition service is unavailable."

async def main():
    assistant = DementiaAssistant()
    while True:
        user_input = listen()
        print(f"User: {user_input}")
        response = await assistant.generate_response(user_input)
        print(f"Assistant: {response}")
        speak(response)

if __name__ == "__main__":
    asyncio.run(main())
