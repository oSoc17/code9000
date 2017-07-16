# Hardware

The IOT installation uses several components to get the job done. These
components are mostly included in the NatureBytes kit but some other
things are bought somewhere else.

## Hardware

- NatureBytes kit (enclosure, Raspberry Pi, Raspberry Pi Camera V2)
- Solar panels
- Solar charger
- Solar battery
- Arduino UNO (Battery Guard)
- A few resistors (2x 20K Ohm and 2x 10K Ohm) and some wires
- 5V Relay
- 4G router

An alternative setup could be achieved using a 3G/4G network shield for example: [Adafruit FONA 3G + GPS](https://learn.adafruit.com/adafruit-fona-3g-cellular-gps-breakout/overview) which also includes GPS. With this shield the setup becomes smaller and easier to hide.
However, a separate 5V power supply will be needed to provide enough power for the shield while sending data over the cellular network.

## How does thing work?

1. PIR sensor detects a bird.
2. The Raspberry Pi wakes up.
3. The Raspberry Pi Camera takes a picture.
4. A 4G connection is initiated.
5. The picture and the meta data is send to the API.

## How to set this thing up?

### I. Raspberry Pi

1. Download the Raspbian OS from the official Raspberry Pi website:
2. Run ```sudo apt-get update && sudo apt-get upgrade -y``` in the terminal to get the Raspberry Pi up to date.
3. Install the following Python module with pip (if not installed):
	- Requests (```sudo pip install requests```)

4. Clone the #code9000 project to the Raspberry Pi:
	- ```sudo apt-get install git```
	- ```git clone https://github.com/osoc17/code9000```
5. Configure the Raspberry Pi: ```sudo raspi-config```

	**Switch to CLI mode**
	- Select ```Boot Options```
	- Select ```Desktop / CLI```
	- Select ```Console Autologin```

	**Enable camera**
	- Select ```Interfacing Options```
	- Select ```Camera```
	- Select ```Yes (enable camera interface) and OK```

	**Timezone and keyboard layout**
	- Select ```Localisation Options```
	- Select ```Change Timezone```
	- Select ```Select your timezone from the list```
	- Select ```Localisation Options```
	- Select ```Change Keyboard Layout```

	**Splash screen**
	- Select ```Boot Options```
	- Select ```Splash Screen```
	- Select ```No```
	- Exit raspi-config: ```Finish and reboot```

6. Modify ```constants.json``` to your own configuration.

7. Add a crontab entry to launch the shell script when booting

	- Navigate to the launcher.sh path: ```cd /path/to/launcher.sh```
	- Make the script executable: ```chmod +x launcher.sh```
	- Edit crontab table: ```crontab -e```
	- Add this line at the end of the file: ```@reboot sh /path/to/launcher.sh > /path/to/cronlog 2>&1```
	- Close the file using CTRL+X (Nano editor)
	- You should see a message that a new entry was added to the crontab jobs
8. Reboot the Raspberry Pi using ```sudo reboot```

9. If everything goes well, you should see a message in the terminal that we're looking now for birds.

10. To save power, you can disable the HDMI display by adding ```@reboot /opt/vc/bin/tvservice -o``` to the crontab (explained in 6). This setting doesn't survive a reboot.

### II.Battery Guard (Arduino)

1. Build the hardware from the schematic below:
	SCHEMATIC HERE
	*Tip: You can measure the voltage dividers output to check if the circuit is correctly build.*

2. Download the [Arduino IDE](https://www.arduino.cc/en/Main/Software) and install it.

3. Open the ```powerManager.ino``` script in the Arduino IDE.

4. Configure the script according to your configuration.

5. Flash it on your Arduino. This script is tested **only** on the Arduino UNO R3.

### III. Solar panels & charger
