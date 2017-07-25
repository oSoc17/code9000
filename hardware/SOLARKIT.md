# Solar kit
*This guide will help you to choose the right solar kit for your IoT.*

## I. Solar irradiance
Every place on earth performs differently when it comes to solar panels.
The reason for that is related to the amount of sun, clouds, shadow, ... for that specific place.

You can find out quickly how your solar panel will perform in reality by using historical data.
The website [solarelectricityhandbook.com](http://solarelectricityhandbook.com/solar-irradiance.html) allows you to check out the data easily for almost every location in the world.

We used the 'Optimal Year Round' setting to have the best performance in every season of the year.

<p align="center">
  <img src="images/solarIrradiance.png" alt="Screenshot">
  <br>
  <i>Solar irradiance for Ghent, Belgium (<a href="http://solarelectricityhandbook.com/solar-irradiance.html" target="_blank">source</a>)</i>
</p>

If you look at the months we see that December has the lowest amount of sunlight available for Ghent, Belgium: 1030 KWh/m²/day.

<i>Tip: Always use the lowest values to make sure it works in even the worst possible conditions.</i>

## II. Determining technology
Now that we know how much sunlight is available we can select our solar kit.
The technology used in the solar panel plays a roll in how efficient the solar panel is (how much sunlight will be converted into electricity). Those information should be available in the datasheet of the solar panel provided by the manufacturer. However, our manufacturer didn't provide a detailed datasheet with this information so we used the following chart to determine the efficiency:

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3d/PVeff%28rev170414%29.jpg" alt="Screenshot">
  <br>
  <i>Solar efficiency for each technology through the years (<a href="https://en.wikipedia.org/wiki/Solar_cell_efficiency" target="_blank">source</a>)</i>
</p>

We are using a 'Single Crystal' solar panel, the current efficiency is around 25-27 %.

## III. Calculating the solar panel size
1. Measure the voltage of each component that will be connected to the battery charged by the solar panel.
2. Do the same with for the current of each component.
3. We should calculate how much power in Watt's our device will use, this can be done pretty simple using the following formula: ```Power P = Voltage V * Current I``` Do this for every device that will be connected to the battery and take the sum of it. For example: <table style="width:100%">
	<tr>
    	<th>Device</th>
    	<th>Voltage</th>
    	<th>Current</th>
		<th>Power</th>
	</tr>
	<tr>
    	<td>Raspberry Pi A+</td>
    	<td>5 V</td>
    	<td>0.15 A</td>
		<td>0.75 W</td>
	</tr>
	<tr>
		<td>TP-Link TL-MR6400 (4G router)</td>
		<td>12 V</td>
		<td>0.15 A</td>
		<td>1.80 W</td>
	</tr>
</table>

<b>TOTAL: 2.55 W power consumption for all the devices connected to the battery.</b>

4. Now we need to take the efficiency of the solar panel and DC-DC convertor into account. Since our battery works on 12 V we need to convert it into 5 V to power the Raspberry Pi A+. These convertors have an efficiency between 75-85%. To combine the efficiencies you need to multiply them:

```TOTAL EFFICIENCY = PANEL EFFICIENCY * DC-DC EFFICIENCY```


We will do this for our example above: <b>TOTAL= 0.25 * 0.75 = 0.19 (19 %)</b>

<i>Tip: Always use the lowest values to make sure it works in even the worst possible conditions.</i>

5. Do you want to run the device 24/24 or not? The amount of hours/day is important to determine how much the devices will consume of the battery. In our case, the device only needs to running during the day (12 hours).

6. The actual size of the solar panel is determined by the efficiency, the power consumption of the devices, the amount of sunlight available for your location and how long the devices need to be active, let's bring them together!
Convert the power consumption calculated in step 3 to Wh/day with this formula:
```POWER USED DAY = POWER CONSUMPTION * HOURS OF OPERATION```
In our example: <b>CONSUMPTION EACH DAY = 2.55 W * 12 hours = 30.6 Wh/day</b> We use the famous '[Rule of Three](https://en.wikipedia.org/wiki/Cross-multiplication#Rule_of_Three)' for this. For example: <table style="width:100%">
	<tr>
		<th>Available power</th>
		<th>Panel size</th>
	</tr>
	<tr>
		<td>1030 Wh/day</td>
		<td>1 m²</td>
	</tr>
	<tr>
		<td>1 Wh/day</td>
		<td>0.000970874 m²</td>
	</tr>
	<tr>
		<td>30.6 Wh/day</td>
		<td>0.029708738 m²</td>
	</tr>
</table>
But we forgot something! The efficiency we calculated in step 5! We can do that using this formula:

```ACTUAL SIZE = CALCULATED SIZE * TOTAL EFFICIENCY * CHARGER EFFICIENCY```


For example (CHARGER EFFICIENCY = 1): <b>ACTUAL SIZE = 0.029708738 m²/0.19 = 0.16 m²</b>
See the further for the real charger efficiency.

## IV. Battery & charger
We selected a solar panel but we also need a battery to store the generated energy and a charger to keep the battery healthy.
We will explain this using a simple example:

From the datasheet of a [80Wp solar panel](http://www.conrad.be/ce/nl/product/1485914/):

<table style="width:100%">
	<tr>
		<th>No load voltage</th>
		<th>Nominal voltage</th>
		<th>Nominal current</th>
		<th>Short-circuit current</th>
	</tr>
	<tr>
		<td>22.3 V</td>
		<td>12 V</td>
		<td>4.49 A</td>
		<td>4.85 A</td>
	</tr>
</table>

If the charger has an efficiency of 100% then the nominal current (4.49 A) of the solar panel will be delivered to the battery, in the real world this isn't true of course.

### A) PWM based charger

Since our system is small we used a PWM based charger because it's cheap for small solar systems.
You need to choose a charger that can handle the current from your solar panel and can handle the battery. Most chargers are compatible with 12/24 V lead acid batteries.

For our example we can buy a charger that can handle at least 6 A of charging current. We picked up this one: [solar charger PWM](http://www.conrad.be/ce/nl/product/110864/IVT-200001-Solar-laadregelaar-12-V-24-V-8-A?ref=list).

### B) MPPT  based charger

For bigger solar systems a MPPT (Maximum Point to Point Tracker) charger is better because it's efficiency is much higher then in comparison with a PWM charger.
Choosing a MPPT charger is almost the same process as with the PWM charger in step A.

### C) Which charger do I need?
It all depends on how big you installation will be, in our case we only need to feed one device so a cheaper PWM charger is sufficient for our purpose.
You can find more information [here](http://offgridham.com/2015/12/solar-charge-controller/).

### D) Battery
The size of your battery depends on how much generated energy you would like to store.
We will explain the calculations using a simple example:

From the datasheet of a [12V lead acid 6.6 Ah](http://www.conrad.be/ce/nl/product/110752/):

<table style="width:100%">
	<tr>
		<th>Voltage</th>
		<th>Capacity</th>
	</tr>
	<tr>
		<td>12 V</td>
		<td>6.6 Ah</td>
	</tr>
</table>

In step III we did the calculations of the power consumption of our IoT, we can use that to figure out how long our IoT can run on a fully charged battery.

The capacity of a battery is defined as the as '[Ampere hour](https://en.wikipedia.org/wiki/Ampere_hour)'. So the current that can flow in 1 hour is equal to 6.6 A, if our device uses 6.6 A then it runs exactly for 1 hour.
To make the calculations easier we asume that the lead acid battery has a steady voltage of 12 V (in the real world this depends on the temperature, charging level, ...)

<b>Available power capacity: 12 V * 6.6 A = 79.2 Wh</b>

We use the famous '[Rule of Three](https://en.wikipedia.org/wiki/Cross-multiplication#Rule_of_Three)' for this in a slightly differnt way then above. For example: <table style="width:100%">
   <tr>
	   <th>Power</th>
	   <th>Time</th>
   </tr>
   <tr>
	   <td>79.2 W</td>
	   <td>1 hour</td>
   </tr>
   <tr>
	   <td>1 W</td>
	   <td>79.2 hours</td>
   </tr>
   <tr>
	   <td>2.55 W</td>
	   <td>approx. 31 hours</td>
   </tr>
</table>

## V. Conclusion
Using the calculations above, we determined that we need to buy a solar panel with a size of at least 0.16 m² for our example. Because we haven't no information about the charger efficiency we over dimension the solar panel a little bit. It's always advised to add some overhead as a reserve.
