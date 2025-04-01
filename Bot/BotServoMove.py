import RPi.GPIO as GPIO
import time

# Setup
SERVO_PIN = 18  # BCM GPIO 18
GPIO.setmode(GPIO.BCM)
GPIO.setup(SERVO_PIN, GPIO.OUT)

# PWM Configuration
pwm = GPIO.PWM(SERVO_PIN, 50)  # 50 Hz frequency
pwm.start(0)  # Start with 0% duty cycle

def set_servo_angle(angle):
    duty = angle / 18 + 2  # Convert angle to duty cycle (2% to 12%)
    GPIO.output(SERVO_PIN, True)
    pwm.ChangeDutyCycle(duty)
    time.sleep(0.3)  # Allow servo to move
    GPIO.output(SERVO_PIN, False)

try:
    while True:
        set_servo_angle(0)    # 0 degrees
        time.sleep(1)
        set_servo_angle(90)   # 90 degrees
        time.sleep(1)
except KeyboardInterrupt:
    pwm.stop()
    GPIO.cleanup()