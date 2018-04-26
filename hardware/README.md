# IoT hardware

The IoT installation uses several components to get the job done. These
components are mostly included in the NatureBytes kit but some other
things are bought somewhere else.

## I. How does thing work?

1. PIR sensor detects a bird.
2. The Raspberry Pi wakes up.
3. The Raspberry Pi Camera takes a picture.
4. A 4G connection is initiated.
5. The picture and the meta data is send to the API.

## II. Hardware

- NatureBytes kit (enclosure, Raspberry Pi A+, Raspberry Pi Camera V2, PIR sensor)
- Solar kit
- Arduino UNO (Battery Guard)
- A few resistors (2x 20K Ohm and 2x 10K Ohm) and some wires
- 5V Relay
- 4G router
- Waterproof box

An alternative setup could be achieved using a 3G/4G network shield for example: [Adafruit FONA 3G + GPS](https://learn.adafruit.com/adafruit-fona-3g-cellular-gps-breakout/overview) which also includes GPS. With this shield the setup becomes smaller and easier to hide.
However, a separate 5V power supply will be needed to provide enough power for the shield while sending data over the cellular network.

You can find more information about the solar kit [here](https://github.com/oSoc17/code9000/blob/develop/hardware/SOLARKIT.md).

## III. Installation

You can find the installation instructions for both the hardware and the software [here](https://github.com/oSoc17/code9000/blob/develop/hardware/SETUP.md).

## IV. Deployment

You can find the deployment instructions [here](https://github.com/oSoc17/code9000/blob/develop/hardware/DEPLOYMENT.md).

## V. Maintenance

You can find the maintenance instructions [here](https://github.com/oSoc17/code9000/blob/develop/hardware/MAINTENANCE.md).