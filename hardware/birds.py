"""
    Title: birds.py
    Description: Take pictures when a birds is passing by and send it to the API.
    License: see Github project: https://www.github.com/oSoc17/code9000
"""

# Python built-in modules
import logging
import json
from time import gmtime, strftime, sleep

# Set logging level
logging.setLevel(logging.DEBUG)

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

# Create a camera instance
camera = picamera.PiCamera()

# Setup GPIO pins
GPIO.setmode(GPIO.BOARD) # Use BOARD GPIO numbers
GPIO.setup(configData['pirsensor'], GPIO.IN, pull_up_down=GPIO.PUD_DOWN)  # Setup GPIO for PIR sensor
GPIO.add_event_detect(configData['pirsensor'], GPIO.FALLING, bouncetime=configData['bouncetime'])

def loop():
    try:
        print('You can always exit this program by pressing CTRL + C')
        logging.info('Looking for birds...')

        while True:
            # Bird detected, take a picture
            if GPIO.event_detected(configData['pirsensor']):
                logging.debug('Bird detected!')
                GPIO.remove_event_detect(configData['pirsensor']) # Disable interrupt
                logging.debug('Getting current time...')
                currentTime = getTime() # Read the current time
                logging.debug('Taking picture...')
                camera.capture('{}.jpg'.format(currentTime)) # Take picture
                GPIO.add_event_detect(configData['pirsensor'], GPIO.FALLING, bouncetime=configData['bouncetime']) # Enabled interrupt again
                logging.debug('Bird event completed!')

            # Nothing happened, sleep further
            else:
                sleep(configData['sleeptime'])

    except KeyboardInterrupt:
        GPIO.cleanup()
        logging.info('I stopped with looking for birds!')

# Start the loop()
# Reason for the IF statement is here: https://stackoverflow.com/questions/419163/what-does-if-name-main-do
if __name__ == "__main__":
    loop()

# Clean up in case something is failing
GPIO.cleanup()
