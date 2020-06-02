import React from 'react';
import '../styles/Announcement.css';

const Announcement = React.memo((props) => {
  return (
    <>
      <h1>{`Update: v1.5.0`}</h1>
      <div>
        Two new legendary commanders have been added: Theodora and Yi Sun-sin.
      </div>

      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Theodora.png`}
          className="announce-img"
          alt="Theodora"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Yi Sun-sin.png`}
          className="announce-img"
          alt="Yi Sun-sin"
        ></img>
      </div>

      <div>
        New epic commander, Keira, has also been added. The image for Eulji
        Mundeok has been updated.
      </div>

      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Keira.png`}
          className="announce-img"
          alt="Keira"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Eulji Mundeok.png`}
          className="announce-img"
          alt="Eulji"
        ></img>
      </div>

      <h2>Bug Fixes</h2>
      <ul>
        <li>Fixed a bug in gathering tree talent values</li>
        <li>Fixed a bug with Elite Soldiers talent</li>
      </ul>
    </>
  );
});

export default Announcement;
