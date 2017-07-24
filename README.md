\#Code9000
===================
----------

\#Code9000 is a project in which Digipolis Ghent and the City of Ghent experiment with open data to create new open source proof-of-concepts. The project was developed by oSoc17. This organisation collaborates with students to create IT-related projects. Students get real cases to work on and move beyond the theoretical and we get new learnings and code to test and iterate upon.

<div align="center">
<img src="https://raw.githubusercontent.com/oSoc17/code9000/develop/web-app/src/theme/crest.png" width=300px />
</div>

For this project, we wanted to observe the common tern, a bird living near the "Houtdok" in Ghent. tbc
####  Status
<a href="https://travis-ci.org/oSoc17/code9000.svg?branch=master" >
<img src="https://camo.githubusercontent.com/3700a6394b649fb2e3620c649ae29f8ccce97be8/68747470733a2f2f7472617669732d63692e6f72672f6f536f6331372f6f617369732d66726f6e74656e642e706e67" alt="Build Status" data-canonical-src="https://travis-ci.org/oSoc17/oasis-frontend.png" style="max-width:100%;">
</a>


####  Technologies
##### API
The API handles the pictures taken by the IoT-device. We use it to collect our pictures, save it and make it accessible for other services. Since we don't have another way of validating what creature triggered the infraredsensor, we are using a human voting system. Votes are send to the API, and when an image reaches a certain treshhold, the API will assume it's validated and send it forward.

The API is made in PHP, using the Laravel framework. We chose to include user accounts as it's the only way to know for sure one person can only vote once on a picture.

##### Webapplication
To do the validation of our pictures, human validation looked like the best way (given the time we had). As a simple yes-maybe-no validation onepager seemed a little dull and unappealing, we tried to gamify it.

We made a ReactJS webapp where you can do all the account-related stuff like logging in or making an account. We made an voting page as well, and tried to implement fun features like scores, badges and a monthly leaderboard.

##### Hardware
We developed an IoT-device which takes pictures of everything that moves and send it to the API. The IoT works asynchronously to simultaneous send the pictures to the API and take pictures of the birds.

The device consists of a Raspberry Pi A+, a Raspberry Pi Camera V2 and a PIR sensor. To keep it self-sustainable we use a solar panel and a battery while a 4G router takes care of the Internet connection.
####  Contributers

##### Students
 - [Demian Dekoninck](https://github.com/DemianD)
 - [Diëgo De Wilde](https://github.com/diegodewilde)
 - [Dylan Van Assche](https://github.com/DylanVanAssche)
 - [Bert Commeine](https://github.com/BertCommeine)
 - [Cynthia Vanoirbeek](https://github.com/cynthiav11)

##### Coaches
- [Miet Claes](https://miet.be)
- [Xavier Bertels](https://mono.company)

#### MIT License
This project is released as an open-source project under the <a href="https://github.com/oSoc17/code9000/blob/develop/LICENSE"> MIT License </a>
