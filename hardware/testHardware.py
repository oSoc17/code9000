# Libraries
import RPi.GPIO as GPIO
import requests
import picamera
from time import gmtime, strftime

#Constants
PIR_SENSOR = 13
LATITUDE = 50.8503 # Change this to real location
LONGITUDE = 4.3517

def getTime():
	return strftime('%Y-%m-%d %H:%M:%S', gmtime())

# Triggered when interrupt detected from the PIR sensor
def pir(channel):
	print('PIR sensor triggered!')

# Handle camera
def capturePicture():
	currentTime = getTime()
	camera.capture('{}.jpg'.format(currentTime))

def main():
	GPIO.setmode(GPIO.BCM) # Use BCM GPIO numbers
	GPIO.setup(PIR_SENSOR, GPIO.IN, pull_up_down=GPIO.PUD_UP)  # Setup GPIO for PIR sensor
	GPIO.add_event_detect(PIR_SENSOR, GPIO.FALLING, callback=my_callback2, bouncetime=300) # Dtetct interrupts for the PIR sensor
	camera = picamera.PiCamera()
	capturePicture()

