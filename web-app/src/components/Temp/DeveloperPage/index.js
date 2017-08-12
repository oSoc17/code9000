import React from 'react';
import { Link } from 'react-router-dom';

import '../bootstrap.css';
import './developerpage.css';

import imageBall from '../images/bal.svg';
import imageBallRight from '../images/bal_rechts.svg';
import imageLogoHeader from '../images/logo_header.svg';
import imageVoting from '../images/voting.png';

import imageBert from './images/bert.jpg';
import imageCynthia from './images/cynthia.jpg';
import imageDemian from './images/demian.jpg';
import imageDiego from './images/diego.jpg';
import imageDylan from './images/dylan.jpg';

import imageCam from './images/cam.jpg';
import imageDigipolis from './images/digipolis.svg';
import imageGent from './images/gent.svg';
import imageOpen from './images/open.svg';
import imageWebapp from './images/webapp.png';

const DeveloperPage = () => {
  return (
    <div className="DeveloperPage">
      <section id="header">
        <div className="container">
          <nav className="navbar navbar-default">
            <div className="container-fluid container-fluid_1">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1"
                  aria-expanded="false"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
              </div>

              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <Link to="app">App</Link>
                  </li>
                  <li>
                    <Link to="/">Welcome</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="row banner_header row-eq-height vertical-center">
            <div
              className=" col-xs-12 col-sm-12 col-md-12 center-text-bird center-text"
              style={{ paddingBottom: '5%' }}
            >
              <img className="img_size_bird" src={imageLogoHeader} alt="bert" />
            </div>
          </div>
        </div>

        <div className="outer">
          <img className="rechts" src={imageBallRight} alt="" />
          <img className="links" src={imageBall} alt="" />
        </div>
      </section>

      <section id="intro">
        <div className="container">
          <div className="row intro_header row-eq-height vertical-center">
            <div className="col-xs-12 col-md-7">
              <h2 className="center-text"> Introduction</h2>
              <p className="center">
                Birds.today is a project developed by the #Code9000 team for Digipolis Ghent and the
                City of Ghent to experiment with open data and to create new open source
                proof-of-concepts.
              </p>
              <p className="center">
                This project was developed during #oSoc17. Open Summer of Code collaborates with
                students to create IT-related projects. Students get real cases to work on and move
                beyond the theory, get new insights and code to test and iterate upon.
              </p>
              <p className="center">
                The main goal of the project was to make a self-sustaining IoT device that takes
                pictures and collects data of birds in a specific place. This collected data needed
                to be send to an API so it is accesible to everyone. And since the focus of the
                project was to collect data on one specific bird, the common tern, a webapp was also
                created to allow users to help verify whether or not a common tern was photographed.
              </p>
              <p className="center">
                This entire project is open source and available. All information and code can be
                found at the links below.
              </p>
            </div>

            <div className="col-xs-12 col-md-5 center-text">
              <img className="img_bert2" src={imageWebapp} alt="bert" />
            </div>
          </div>
        </div>
      </section>

      <section id="hardware">
        <div className="container">
          <div className="row hardware_header row-eq-height vertical-center">
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 center-text">
              <div className="circular_hardware">
                <img src={imageCam} alt="Naturebytes kit" />
              </div>
            </div>

            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
              <h2 className="center-text">The hardware</h2>
              <p className="center">
                We developed an IoT-device which takes pictures of every living thing it detects and
                send it to the API. The IoT works asynchronously to simultaneous send the pictures
                to the API and take pictures of the birds.
                <br />
                <br />
                The device consists of a Raspberry Pi A+, a Raspberry Pi Camera V2 and a PIR sensor.
                To keep it self-sustainable we use a solar panel and a battery while a 4G router
                takes care of the Internet connection.
              </p>
              <div className="center-text">
                <a
                  href="https://github.com/oSoc17/code9000/tree/develop/hardware"
                  className="btn btn-default btn_white"
                  role="button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="app">
        <div className="container">
          <div className="row app_header row-eq-height vertical-center">
            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
              <h2 className="center-text">The Webapplication</h2>
              <p className="center">
                To do the validation of our pictures, human validation looked like the best way
                (given the timespan of the project). As a simple yes-no validation onepager seemed a
                little dull and unappealing, we tried to gamify it.
                <br />
                <br />
                We made a ReactJS webapp where you can do all the account-related stuff like logging
                in or making an account. We made an voting page as well, and tried to implement fun
                features like scores and a monthly leaderboard.
              </p>
              <div className="center-text">
                <a
                  href="https://github.com/oSoc17/code9000/tree/develop/web-app"
                  className="btn btn-default btn_blue btn_blue_margin"
                  role="button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </a>
                <Link to="app" className="btn btn-default btn_blue">Go to app</Link>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 center-text">
              <img src={imageVoting} alt="Iphone" />
            </div>
          </div>
        </div>
      </section>

      <section id="api">
        <div className="container">
          <div className="row api_header row-eq-height vertical-center">
            <div className="col-md-4 center-text">
              <span className="fa_icons " style={{ display: 'inline-block' }}>
                {' '}<i className="fa fa-cloud fa-lg" aria-hidden="true" />
              </span>
            </div>

            <div className="col-md-8">
              <h2 className="center-text">The API</h2>
              <p className="center">
                The API handles the pictures taken by the IoT-device. We use it to collect our
                pictures, save it and make it accessible for other services. Since we
                don&apos;t have
                another way of validating what triggered the infrared sensor, we are using a human
                voting system. Votes are send to the API, and when an image reaches a certain
                threshold, the API will assume it&apos;s validated and send it forward.
                <br />
                <br />
                The API is made in PHP, using the Laravel framework. We chose to include user
                accounts as it&apos;s the only way to know for sure one person can only
                vote once on a picture.
              </p>
              <div className="center-text">
                <a
                  href="https://github.com/oSoc17/code9000/tree/develop/api"
                  className="btn btn-default btn_white"
                  role="button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team">
        <div className="container">
          <div className="row team_header team_title row-eq-height horizontal-center">
            <div className="col-md-12">
              <h2 className="center-text">The team</h2>
            </div>
          </div>
          <div className="row team_header row-eq-height horizontal-center">
            <div className="col-md-4 col_margin">
              <a className="img_circular" href="https://www.linkedin.com/in/demiandekoninck/" target="_blank" rel="noopener noreferrer">
                <div className="img__overlay">
                  <i className="fa fa-linkedin-square fa-2x play" />
                </div>
                <img src={imageDemian} alt="" />
              </a>
              <p>Demian Dekoninck</p>
            </div>
            <div className="col-md-4 col_margin">
              <a className="img_circular" href="https://www.linkedin.com/in/dewilde-it/" target="_blank" rel="noopener noreferrer">
                <div className="img__overlay">
                  <i className="fa fa-linkedin-square fa-2x play" />
                </div>
                <img src={imageDiego} alt="" />
              </a>
              <p>Diëgo De Wilde</p>
            </div>
            <div className="col-md-4 col_margin">
              <a className="img_circular" href="https://www.linkedin.com/in/bert-commeine/" target="_blank" rel="noopener noreferrer">
                <div className="img__overlay">
                  <i className="fa fa-linkedin-square fa-2x play" />
                </div>
                <img src={imageBert} alt="" />
              </a>
              <p>Bert Commeine</p>
            </div>
          </div>
          <div className="row team_header row-eq-height horizontal-center">
            <div className="col-md-6 col_margin">
              <a className="img_circular" href="https://www.linkedin.com/in/dylanvanassche/" target="_blank" rel="noopener noreferrer">
                <div className="img__overlay">
                  <i className="fa fa-linkedin-square fa-2x play" />
                </div>
                <img src={imageDylan} alt="" />
              </a>
              <p>Dylan Van Assche</p>
            </div>
            <div className="col-md-6 col_margin">
              <a className="img_circular" href="https://www.linkedin.com/in/cynthiavanoirbeek/" target="_blank" rel="noopener noreferrer">
                <div className="img__overlay">
                  <i className="fa fa-linkedin-square fa-2x play" />
                </div>
                <img src={imageCynthia} alt="" />
              </a>
              <p>Cynthia Vanoirbeek</p>
            </div>
          </div>
        </div>
      </section>

      <section id="partner">
        <div className="container">
          <div className="row partner_header row-eq-height horizontal-center">
            <div className="col-md-12">
              <h2 className="center-text">Partners</h2>
            </div>
          </div>
          <div className="row partner_header row-eq-height horizontal-center">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 " style={{ margin: '5% 0' }}>
              <div className="img_size">
                <a href="https://www.digipolis.be/" target="_blank" rel="noopener noreferrer">
                  <img src={imageDigipolis} alt="" />
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 " style={{ margin: '5% 0' }}>
              <div className="img_size">
                <a href="https://stad.gent/" target="_blank" rel="noopener noreferrer">
                  <img src={imageGent} alt="" />
                </a>
              </div>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 " style={{ margin: '5% 0' }}>
              <div className="img_size">
                <a href="http://2017.summerofcode.be/" target="_blank" rel="noopener noreferrer">
                  <img src={imageOpen} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="footer">
        <div className="container">
          <div className="row row_footer">
            <div className="icon_bottom">
              <a href="https://www.facebook.com/TodayBirds/" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-facebook-square fa-3x icons" aria-hidden="true" />
              </a>
              <a href="https://github.com/oSoc17/code9000" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-github-square fa-3x icons" aria-hidden="true" />
              </a>
              <a href="https://twitter.com/TodayBirds" target="_blank" rel="noopener noreferrer">
                <i className="fa fa-twitter-square fa-3x icons" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeveloperPage;
