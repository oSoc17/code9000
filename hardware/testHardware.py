# Libraries
import RPi.GPIO as GPIO
import requests
import picamera
from time import gmtime, strftime, sleep

#Constants
PIR_SENSOR = 13
BOUNCE_TIME = 100
LATITUDE = 50.8503 # Change this to real location
LONGITUDE = 4.3517
API_URL = "develop.birds.today/api/observations"

camera = picamera.PiCamera()

def getTime():
	return strftime('%Y-%m-%d %H:%M:%S', gmtime())

# Triggered when interrupt detected from the PIR sensor
def pir(PIR_SENSOR):
	print('Hello World')

	print('PIR sensor triggered!')

# Handle camera
def capturePicture():
	camera = picamera.PiCamera()
	currentTime = getTime()
	print('Capturing..')
	camera.capture('{}.jpg'.format(currentTime))

def main():
	print("MAIN")
	GPIO.setmode(GPIO.BOARD) # Use BCM GPIO numbers
	GPIO.setup(PIR_SENSOR, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)  # Setup GPIO for PIR sensor
	GPIO.add_event_detect(PIR_SENSOR, GPIO.FALLING, bouncetime=BOUNCE_TIME)

	#GPIO.wait_for_edge(PIR_SENSOR, GPIO.FALLING)
	try:

		print('Waiting for PIR event...')
		while True:
			if GPIO.event_detected(PIR_SENSOR):
				GPIO.remove_event_detect(PIR_SENSOR)
				print('Capturing..')
				currentTime = getTime()
				camera.capture('{}.jpg'.format(currentTime))
				GPIO.add_event_detect(PIR_SENSOR, GPIO.FALLING, bouncetime=BOUNCE_TIME)
			else:
				sleep(0.1)

	except KeyboardInterrupt:
		GPIO.cleanup()
		print('DONE')
main()
