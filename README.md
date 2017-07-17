\#Code9000
===================
----------

\#Code9000 is a project in which Digipolis Ghent and the City of Ghent experiment with open data to create new open source proof-of-concepts. We’ve been doing this since 2011 and love to work with technical, business and communication students to co-create new tools. Students get real cases to work on and move beyond the theoretical and we get receive new learnings and code to test and iterate upon. This time we want to build an IOT use case, combining hardware and software to feed our data portal rather than using the data we already have.  


Getting Started
-------------
----------
####  Requirements

 - php  (^7.x.x)
 - yarn  (^v0.22.0)
 - python (^v3.4)
 - composer  (^v1.4.2)
 - mysql (or other database)

####  Installation

##### 1. Webapplicatie
To install the webapplication, first go the the folder "webapp". Then use yarn to install the required modules.

```
$  cd webapp/
$  yarn install
```


Copy .env.example to .env, and change the URL to the one of your API. This will probably be a localhost:// + the port where you run the API.

```
$  cp .env.example .env
$  nano .env
$  yarn start
$  yarn watch css
```

##### 2. API
To run the API locally, you'll need to install the dependencies using composer.

```
$  composer install
```
When everything is installed, the environment variables need to be declared. Copy your .env.example to .env and fill in your settings.

```
$  cp .env.example .env
```

Now comes the php part. To make, migrate and seed your database, run:
```
$ php artisan key:generate
$ php artisan migrate
$ php artisan db:seed
```

Your local API is finished. There are multiple ways to run it eg. a virtualhost. To setup a localhost, run:

```
$  php artisan serve
```

##### 3. hardware
###### I. Raspberry Pi

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

###### II.Battery Guard (Arduino)

1. Build the hardware from the schematic below:
	SCHEMATIC HERE
	*Tip: You can measure the voltage dividers output to check if the circuit is correctly build.*

2. Download the [Arduino IDE](https://www.arduino.cc/en/Main/Software) and install it.

3. Install the following Arduino libraries:
	- [DS3231 by NorthernWidget](https://github.com/NorthernWidget/DS3231)
	- [Adafruit SleepyDog by Adafruit](https://github.com/adafruit/Adafruit_SleepyDog)

4. Open the ```powerManager.ino``` script in the Arduino IDE.

5. Configure the script according to your configuration.

6. Flash it on your Arduino. This script is tested **only** on the Arduino UNO R3.


#### Documentation

#### MIT License
This project is released as an open-source project under the <a href="https://github.com/oSoc17/lopeningent_backend/blob/develop/LICENSE"> MIT License </a>

