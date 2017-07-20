/*
    #code9000 power manager for the IOT Bird installation
*/

#include <Wire.h>
#include "DS3231.h"
#include <Adafruit_SleepyDog.h>

RTClib RTC;

/*
    Settings
*/
#define HOUR_ON 7
#define HOUR_OFF 19
#define TIMEZONE_OFFSET 2
#define SHUTDOWN_PIN 6
#define BATTERY_PIN A0
#define POWER_PIN 2
#define MINIMUM_VOLTAGE 750
#define SLEEP_TIME 8000
#define SHUTDOWN_TIME 60000

/*
    Setup pins and RTC clock
*/
void setup () {
  Serial.begin(115200);
  Wire.begin();
  pinMode(SHUTDOWN_PIN, OUTPUT);
  pinMode(POWER_PIN, OUTPUT);
  pinMode(BATTERY_PIN, INPUT);
}

/*
    Loop
*/
void loop () {
  Serial.println("Sleeping in a moment.");
  delay(10); // Wait for going to sleep
  Watchdog.sleep(SLEEP_TIME); // Sleep to save power
  delay(10); // Wait for waking up

  // Check if we need to go to sleep or battery is critical
  if (getSleepState() || getBatteryState()) {
    Serial.println("Shutting down IOT...");
    digitalWrite(SHUTDOWN_PIN, HIGH);
    delay(SHUTDOWN_TIME);
    Serial.println("Powering down NOW...");
    digitalWrite(POWER_PIN, LOW);
  }
  else {
    Serial.println("System running...");
    digitalWrite(SHUTDOWN_PIN, LOW);
    digitalWrite(POWER_PIN, HIGH);
  }
}

/*
    Returns if in sleep mode
    True = shutdown
    False = keep power ON
*/
bool getSleepState() {
  DateTime now = RTC.now();
  return (now.hour() + TIMEZONE_OFFSET) <= HOUR_ON || (now.hour() + TIMEZONE_OFFSET) >= HOUR_OFF)
}

/*
    Returns the status of the battery
    True = shutdown
    False = keep power ON
*/
bool getBatteryState() {
  return analogRead(BATTERY_PIN) < MINIMUM_VOLTAGE)
}
