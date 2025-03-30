import cv2
import torch
import RPi.GPIO as GPIO
import time
from ultralytics import YOLO  

# Load YOLOv8 Model from Local Folder
model = YOLO("yolov8n.pt")  # Update the path to your stored model

# Setup GPIO for L298N Motor Driver
GPIO.setmode(GPIO.BCM)

# Motor 1 (Left)
in1, in2, en1 = 24, 23, 25
# Motor 2 (Right)
in3, in4, en2 = 17, 27, 22

# Setup GPIO pins
GPIO.setup([in1, in2, en1, in3, in4, en2], GPIO.OUT)
pwm1 = GPIO.PWM(en1, 1000)
pwm2 = GPIO.PWM(en2, 1000)
pwm1.start(50)
pwm2.start(50)

# Function to move the robot
def move_forward():
    GPIO.output(in1, GPIO.HIGH)
    GPIO.output(in2, GPIO.LOW)
    GPIO.output(in3, GPIO.HIGH)
    GPIO.output(in4, GPIO.LOW)

def move_backward():
    GPIO.output(in1, GPIO.LOW)
    GPIO.output(in2, GPIO.HIGH)
    GPIO.output(in3, GPIO.LOW)
    GPIO.output(in4, GPIO.HIGH)

def turn_left():
    GPIO.output(in1, GPIO.LOW)
    GPIO.output(in2, GPIO.HIGH)
    GPIO.output(in3, GPIO.HIGH)
    GPIO.output(in4, GPIO.LOW)

def turn_right():
    GPIO.output(in1, GPIO.HIGH)
    GPIO.output(in2, GPIO.LOW)
    GPIO.output(in3, GPIO.LOW)
    GPIO.output(in4, GPIO.HIGH)

def stop_motors():
    GPIO.output(in1, GPIO.LOW)
    GPIO.output(in2, GPIO.LOW)
    GPIO.output(in3, GPIO.LOW)
    GPIO.output(in4, GPIO.LOW)

# Start Video Capture
cap = cv2.VideoCapture(0)

try:
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # YOLOv8 Detection
        results = model(frame)
        person_detected = False
        frame_center = frame.shape[1] // 2

        for result in results:
            boxes = result.boxes  # Get bounding boxes

            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]  # Bounding box coordinates
                cls = int(box.cls[0])  # Class ID

                if cls == 0:  # Class 0 is 'person' in YOLO
                    person_detected = True
                    person_center = int((x1 + x2) / 2)

                    # Determine movement based on person's position
                    if person_center < frame_center - 100:
                        turn_left()
                    elif person_center > frame_center + 100:
                        turn_right()
                    else:
                        move_forward()
                    break

        if not person_detected:
            stop_motors()

        # Display the output
        cv2.imshow("YOLOv8 Human Tracking", frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

except KeyboardInterrupt:
    print("Stopped by User")

finally:
    cap.release()
    cv2.destroyAllWindows()
    stop_motors()
    GPIO.cleanup()
