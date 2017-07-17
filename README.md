\#Code9000
===================
----------

\#Code9000 is a project in which Digipolis Ghent and the City of Ghent experiment with open data to create new open source proof-of-concepts. We’ve been doing this since 2011 and love to work with technical, business and communication students to co-create new tools. Students get real cases to work on and move beyond the theoretical and we get receive new learnings and code to test and iterate upon. This time we want to build an IOT use case, combining hardware and software to feed our data portal rather than using the data we already have.  


Getting Started
-------------
----------
####  Requirements

 - npm
 - php
 - yarn
 - python

####  Installation

##### 1. Webapplicatie
To install the webapplication, first go the the folder "webapp". Then use npm to install the required modules.

```
$  cd webapp/
$  npm install
```


Copy .env.example to .env, and change the URL to the one of your API. This will probably be a localhost:// + the port where you run the API.

```
$  cp .env.example .env
$  nano .env
$ npm start
```


#### Documentation

#### MIT License
This project is released as an open-source project under the <a href="https://github.com/oSoc17/lopeningent_backend/blob/develop/LICENSE"> MIT License </a>
