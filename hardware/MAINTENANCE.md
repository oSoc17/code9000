# Maintenance guide
*This guide will guide you in fixing any problems with the IoT.*

## I. Preparation

If the device ever stops sending pictures it is advised you have the following before attempting to fix it:

- Power adapters for the Raspberry Pi and the 4g router - if not, you will only have power when there is sufficient daylight and if the panel is set up correctly
- Multimeter
- Set of screwdrivers
- Ethernet cable to connect to the router
- Computer

## II. Fixing it

The most likely culprit is the camera: this is easily solved by reseating the ribbon connector.

1. Ensure the device gets enough power during daylight. 

Angle the panel as described in deployment. If both red and green leds on the solar power controller are lit it means the battery's voltage is too low and needs to be recharged. The other components will not receive power until that happens. 
Decouple the arduino from the power controller and wait until the battery is charged. You should read a little above 12V when that happens. Reattach the arduino. Only the green led should be turned on. 

2. Connect to the Raspberry Pi 

Make sure both the Raspberry Pi and the router are powered - it is advised you use power adapters instead of the power from the battery and/or solar panel. Connect your computer to the router via ethernet cable and find the ip adress of the Pi with Wireshark or a similar tool. Connect to the Pi with Putty or similar.

3. Fix any problems with the Pi

Make sure the pictures folder is not full. Delete all pictures if it is. 

Make sure the python script is running (```top```).
If it isn't running, try to start it manually. Read the cronlog file to see what's going wrong. 
It is likely the camera is the problem:
- This can easily be verified with ```vcgencmd get_camera```. If the returned is supported=1 detected=0 the connector needs to be reseated.
- Reseat the ribbon connector between the Pi and the camera **on both ends**.
- Enable the camera with ```sudo raspi-config```. Then reboot.

If this does not fix it, stack overflow it and pray to your preferred diety.

As a last resort you can try this but only if literally everything else didn't work:
```sudo apt-get update```
```sudo apt-get upgrade```

