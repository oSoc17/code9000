"""
    Title: birds.py
    Description: Take pictures when a birds is passing by and send it to the API.
    License: see Github project: https://www.github.com/oSoc17/code9000
    Depends: python-requests, python-picamera
"""

# Python built-in modules
import logging
import json
import sys
from time import gmtime, strftime, sleep
import threading
import os
import asyncio

# Set current working directory
os.chdir(sys.path[0])

# Set logging level
logging.basicConfig(stream=sys.stdout, level=logging.DEBUG, format='%(asctime)s %(message)s')

# Python external modules
try:
	import requests
except ImportError:
	logging.critical('Python Requests is not installed!')
	exit('Importing Python Requests module failed!')

# Python Raspberry Pi specific modules
try:
	import RPi.GPIO as GPIO
	import picamera
except ImportError:
	logging.critical('Raspberry Pi Python modules are missing or this program is not running on a Raspberry Pi!')
	exit('Importing Python Raspberry Pi modules failed!')

# Read configuration (you can edit this file for your system)
configFile = open('constants.json')
configData = configFile.read()
configFile.close()
configData = json.loads(configData)

# Create directories if not exist
if not os.path.exists(configData['pictureDir']):
	os.makedirs(configData['pictureDir'])

# Create a camera instance
camera = picamera.PiCamera()

# Upload queue
uploadQueue = []
uploading = False

def takePicture(channel):
	global camera
	global uploadQueue

	logging.debug('Bird detected!')
	logging.debug('Getting current time...')
	currentTimestamp = getTime() # Read the current time
	logging.debug('Taking picture...')
	camera.capture('{}/{}.jpg'.format(configData['pictureDir'], currentTimestamp)) # Take picture
	uploadQueue.append('{}/{}.jpg'.format(configData['pictureDir'], currentTimestamp))
	logging.debug('Bird event completed!')

# Setup GPIO pins
GPIO.setmode(GPIO.BOARD) # Use BOARD GPIO numbers
GPIO.setup(configData['pirsensor'], GPIO.IN, pull_up_down=GPIO.PUD_DOWN)  # Setup GPIO for PIR sensor
GPIO.add_event_detect(configData['pirsensor'], GPIO.FALLING, bouncetime=configData['bouncetime'], callback=takePicture)

@asyncio.coroutine
def uploadAsync():
	global uploadQueue
	global uploading

	logging.debug('Uploading asynchronous the picture and meta data to API')
	logging.debug('Uploadqueue: {}'.format(str(uploadQueue)))

	for index,picture in enumerate(uploadQueue):
		currentFile = open(picture, 'rb')
		currentUpload = {'image': currentFile} # Read file
		currentTimestamp = os.path.basename(currentFile.name).split('.')[0]
		try:
			r = requests.post(configData['api'], data={'longitude': configData['location']['lon'], 'latitude': configData['location']['lat'], 'captured_at': currentTimestamp, 'token': configData['token'] }, files=currentUpload) # Upload data to API
			uploadQueue.remove(picture)
		except requests.exceptions.ConnectionError:
			logging.debug('Suddenly, a wild network error appeared')
		except:
			logging.debug('Uploading failed!')
	return False


def getTime():
	return strftime('%Y-%m-%d %H:%M:%S', gmtime())

def loop():
	try:
		logging.info('You can always exit this program by pressing CTRL + C')
		logging.info('Looking for birds...')
		busy = False
		while(True):
			if len(uploadQueue) and busy == False:
				busy = True
				asyncLoop = asyncio.get_event_loop()
				busy = asyncLoop.run_until_complete(uploadAsync())
			sleep(configData['sleeptime'])

	except KeyboardInterrupt:
		logging.debug('Shutting down and cleaning up...')
		GPIO.cleanup()
		logging.info('Shutdown complete!')

# Start the loop()
# Reason for the IF statement is here: https://stackoverflow.com/questions/419163/what-does-if-name-main-do
if __name__ == '__main__':
	loop()

# Clean up too when crashing...
logging.error('Shutdown and cleaning up after crash...')
GPIO.cleanup()
