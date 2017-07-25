# IoT hardware
*This guide will help you to get quickly the IoT deployed*

The IoT installation uses several components to get the job done. These
components are mostly included in the NatureBytes kit but some other
things are bought somewhere else.

## I. Hardware

- NatureBytes kit (enclosure, Raspberry Pi A+, Raspberry Pi Camera V2, PIR sensor)
- Solar panels
- Solar charger
- Solar battery
- Arduino UNO (Battery Guard)
- A few resistors (2x 20K Ohm and 2x 10K Ohm) and some wires
- 5V Relay
- 4G router
- Waterproof box

An alternative setup could be achieved using a 3G/4G network shield for example: [Adafruit FONA 3G + GPS](https://learn.adafruit.com/adafruit-fona-3g-cellular-gps-breakout/overview) which also includes GPS. With this shield the setup becomes smaller and easier to hide.
However, a separate 5V power supply will be needed to provide enough power for the shield while sending data over the cellular network.

## II. How does thing work?

1. PIR sensor detects a bird.
2. The Raspberry Pi wakes up.
3. The Raspberry Pi Camera takes a picture.
4. A 4G connection is initiated.
5. The picture and the meta data is send to the API.

## III. Installation

You can find the installation instructions [here](https://github.com/oSoc17/code9000/hardware/INSTALLATION.md).

## IV. Deployment

You can find the deployment instructions [here](https://github.com/oSoc17/code9000/hardware/DEPLOYMENT.md).
