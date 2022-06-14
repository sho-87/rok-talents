import React from 'react';
import '../styles/Announcement.css';

const Announcement = React.memo((props) => {
  return (
    <>
      <h1>{`Update: v2.1.0`}</h1>
      <div>
        Added new commanders: Pakal, Cheok Jun, Gilgamesh, Amani, Alexander Nevsky, Bertand, Flavius, Scipio Prime,
        Boudica Prime, Henry IV, Ragnar Lodbrok, Bjorn.
      </div>

      <div className="announce-img-container">
        <img src={`${process.env.PUBLIC_URL}/images/commanders/Pakal.png`} className="announce-img" alt="Pakal"></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Cheok Jun.png`}
          className="announce-img"
          alt="Cheok Jun"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Gilgamesh.png`}
          className="announce-img"
          alt="Gilgamesh"
        ></img>
      </div>
      <div className="announce-img-container">
        <img src={`${process.env.PUBLIC_URL}/images/commanders/Amani.png`} className="announce-img" alt="Amani"></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Alexander Nevsky.png`}
          className="announce-img"
          alt="Alexander Nevsky"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Bertrand.png`}
          className="announce-img"
          alt="Bertrand"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Flavius.png`}
          className="announce-img"
          alt="Flavius"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Scipio Africanus Prime.png`}
          className="announce-img"
          alt="Scipio Africanus Prime"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Boudica Prime.png`}
          className="announce-img"
          alt="Boudica Prime"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Henry IV.png`}
          className="announce-img"
          alt="Henry IV"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Ragnar Lodbrok.png`}
          className="announce-img"
          alt="Ragnar Lodbrok"
        ></img>
      </div>
      <div className="announce-img-container">
        <img src={`${process.env.PUBLIC_URL}/images/commanders/Bjorn.png`} className="announce-img" alt="Bjorn"></img>
      </div>
    </>
  );
});

export default Announcement;
