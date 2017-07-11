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
logging.basicConfig(stream=sys.stdout, level=logging.INFO, format='%(asctime)s %(message)s')

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

def takePicture(channel):
    global camera
    global uploadNow
    
    logging.debug('Bird detected!')
    logging.debug('Getting current time...')
    currentTimestamp = getTime() # Read the current time
    logging.debug('Taking picture...')
    camera.capture('{}/{}.jpg'.format(configData['pictureDir'], currentTimestamp)) # Take picture

    # Too much pictures on the SD card, start uploading directly
    if len(os.listdir(configData['pictureDir'])) > configData['maxpictures'] and not uploadTimer.is_alive() and not uploadNow:	
        logging.info('Picture batch too large, initiate upload now...')
        uploadNow = True

    logging.debug('Bird event completed!')
    

# Setup GPIO pins
GPIO.setmode(GPIO.BOARD) # Use BOARD GPIO numbers
GPIO.setup(configData['pirsensor'], GPIO.IN, pull_up_down=GPIO.PUD_DOWN)  # Setup GPIO for PIR sensor
GPIO.add_event_detect(configData['pirsensor'], GPIO.FALLING, bouncetime=configData['bouncetime'], callback=takePicture)

uploadNow = False

# Upload timer callback
def upload():
	global uploadNow
	uploadNow = True

networkBuffer = 0 # Limit max requests to avoid overloading the network card

@asyncio.coroutine
def uploadAsync():
	asyncLoop = asyncio.get_event_loop()
	global uploadNow

	def _executeReq(f):
		global networkBuffer
		if networkBuffer < configData['networkBuffer']:
			networkBuffer = networkBuffer + 1
			currentFile = open('{}/{}'.format(configData['pictureDir'], f), 'rb')
			currentUpload = {'image': currentFile} # Read file
			currentTimestamp = f.split('.')[0]
			try:
				r = requests.post(configData['api'], data={'longitude': configData['location']['lon'], 'latitude': configData['location']['lat'], 'captured_at': currentTimestamp, 'token': configData['token'] }, files=currentUpload) # Upload data to API
			except requests.exceptions.ConnectionError as error:
				logging.error('Suddenly, a wild network error appeared: {}'.format(error))
			except:
				logging.error('An error occured while uploading data to the API')
			finally:
				if r.status_code == 200:
					os.remove('{}/{}'.format(configData['pictureDir'], f))
					networkBuffer = networkBuffer - 1 # Request complete
					logging.debug('Uploading data OK')
	
			return currentFile.close() # Close file
		else:
			return logging.debug('Network buffer is full!')


	if uploadNow and len(os.listdir(configData['pictureDir'])):
		logging.debug('Uploading asynchronous the picture and meta data to API')
		req = asyncLoop.run_in_executor(None, _executeReq, os.listdir(configData['pictureDir'])[0])

uploadTimer = threading.Timer(configData['timebetween'], upload)
uploadTimer.start()

def getTime():
	return strftime('%Y-%m-%d %H:%M:%S', gmtime())

def loop():
    try:
        logging.info('You can always exit this program by pressing CTRL + C')
        logging.info('Looking for birds...')
        while(True):
            asyncLoop = asyncio.get_event_loop()
            asyncLoop.run_until_complete(uploadAsync())
            sleep(configData['sleeptime'])

    except KeyboardInterrupt:
        logging.debug('Shutting down and cleaning up...')
        uploadTimer.join()
        GPIO.cleanup()
        logging.info('Shutdown complete!')

# Start the loop()
# Reason for the IF statement is here: https://stackoverflow.com/questions/419163/what-does-if-name-main-do
if __name__ == '__main__':
    loop()

# Clean up too when crashing...
logging.error('Shutdown and cleaning up after crash...')
uploadTimer.join()
GPIO.cleanup()
