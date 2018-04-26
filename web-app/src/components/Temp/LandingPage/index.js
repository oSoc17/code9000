import React from 'react';
import { Link } from 'react-router-dom';

import '../bootstrap.css';
import './landingpage.css';

import imageBall from '../images/bal.svg';
import imageBallRight from '../images/bal_rechts.svg';
import imageBert from './images/bert_1.svg';
import imageLeader from './images/leader.png';
import imageLogoHeader from '../images/logo_header.svg';
import imageVoting from '../images/voting.png';

const LandingPage = () => {
  return (
    <div className="LandingPage">
      <section id="header">
        <div className="container">
          <nav className="navbar navbar-default">
            <div className="container-fluid container-fluid_1">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <Link to="app">App</Link>
                </li>
                <li>
                  <Link to="developer">Developers</Link>
                </li>
              </ul>
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

      <section id="bert">
        <div className="container">
          <div className="row bert_header row-eq-height vertical-center">
            <div className="col-xs-12 col-md-4 center-text">
              <img className="img_bert" src={imageBert} alt="bert" />
            </div>

            <div className="col-xs-12 col-md-8">
              <p className="center">
                Birds.today offers a unique and user-friendly way to identify birds in{' '}
                <b>hard-to-reach locations</b> — on any device, any time, even{' '}
                <b>from your couch. </b>
                <br />
                <br />
                Bert will be your host, to find the Bird of the day: the <b>common tern</b>. The
                pictures are taken at the Houtdok in Ghent, which is a new breeding spot for the
                common tern.{' '}
              </p>
              <div className="center-text">
                <Link to="app" className="btn btn-default btn_blue">
                  Help Bert
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pilers">
        <div className="container">
          <div className="row image_design margin_top_images">
            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <p className="fa_icons">
                <i className="fa fa-compass fa-lg" aria-hidden="true" />{' '}
              </p>
              <div className="pilers_header">
                <h3>Explore locations</h3>
                <p>Spot birds on locations you could never visit, until now. </p>
              </div>
            </div>

            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <p className="fa_icons">
                {' '}<i className="fa fa-rocket fa-lg" aria-hidden="true" />
              </p>
              <div className="pilers_header">
                <h3>No more waiting</h3>
                <p>Tired of waiting hours to spot that special bird? That&apos;s over now! </p>
              </div>
            </div>

            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <p className="fa_icons">
                {' '}<i className="fa fa-globe fa-lg" aria-hidden="true" />
              </p>
              <div className="pilers_header">
                <h3>Be part of a community</h3>
                <p> Be a part of something larger while supporting the research on biodiversity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="app">
        <div className="container">
          <div className="row app_header">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
              <h2 className="center-text-bird center-text">How it works</h2>
            </div>
          </div>

          <div className="row app_header row-eq-height vertical-center">
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-md-push-8 center-text">
              <img className="img_size" src={imageVoting} alt="Iphone" />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-md-pull-4">
              <p className="center">
                Whenever a picture of the common tern is shown, you can drag it to the picture book.
                If it depicts a different kind of bird, drag it to the trash can. It’s as easy as
                that!
              </p>
            </div>
          </div>

          <div className="row app_header row-eq-height vertical-center">
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4 center-text">
              <img className="img_size" src={imageLeader} alt="Iphone" />
            </div>

            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
              <p className="center">
                Check out your progress on the leader board, and see who else is participating on
                birds.today.
              </p>
              <div className="center-text">
                <button type="button" className="btn btn-default btn_blue ">
                  Go to app
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="developer">
        <div className="container">
          <div className="row dev_header row-eq-height vertical-center">
            <div className="col-md-4 center-text">
              <span className="fa_icons " style={{ display: 'inline-block' }}>
                {' '}<i className="fa fa-cloud fa-lg" aria-hidden="true" />
              </span>
            </div>

            <div className="col-md-8 ">
              <h2 className="center-text">Contribute to birds.today</h2>
              <p className="center">
                Interested in supporting this project? Birds.today is open source and available for
                everyone. You are welcome to contribute, improve our application or even build your
                own based on the data we collect. Check out our developerspage to know more about
                this open source project.{' '}
              </p>
              <div className="center-text">
                <Link to="developer" className="btn btn-default btn_white">
                  Contribute
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="footer">
        <div className="container">
          <div className="row row_footer">
            <div className="icon_bottom">
              <a href="https://www.facebook.com/TodayBirds/">
                <i className="fa fa-facebook-square fa-3x icons" aria-hidden="true" target="_blank" rel="noopener noreferrer" />
              </a>
              <a href="https://github.com/oSoc17/code9000">
                <i className="fa fa-github-square fa-3x icons" aria-hidden="true" target="_blank" rel="noopener noreferrer" />
              </a>
              <a href="https://twitter.com/TodayBirds">
                <i className="fa fa-twitter-square fa-3x icons" aria-hidden="true" target="_blank" rel="noopener noreferrer" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
