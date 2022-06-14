import React from 'react';
import '../styles/Announcement.css';

const Announcement = React.memo((props) => {
  return (
    <>
      <h1>{`Update: v2.1.0`}</h1>
      <div>
        Added new commanders: Pakal, Cheok Jun Gyeong, Gilgamesh, Amanitore, Honda Tadakatsu, Suleiman I, Alexander
        Nevsky, Bertand du Guesclin, Flavius Aetius, Scipio Prime, Boudica Prime, Henry V, Ragnar Lodbrok, Bjorn
        Ironside, Imhotep, Thutmose III.
      </div>

      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Kinich Janaab Pakal.png`}
          className="announce-img"
          alt="Kinich Janaab Pakal"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Cheok Jun Gyeong.png`}
          className="announce-img"
          alt="Cheok Jun Gyeong"
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
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Amanitore.png`}
          className="announce-img"
          alt="Amanitore"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Honda Tadakatsu.png`}
          className="announce-img"
          alt="Honda Tadakatsu"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Suleiman I.png`}
          className="announce-img"
          alt="Amanitore"
        ></img>
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
          src={`${process.env.PUBLIC_URL}/images/commanders/Bertrand du Guesclin.png`}
          className="announce-img"
          alt="Bertrand"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Flavius Aetius.png`}
          className="announce-img"
          alt="Flavius Aetius"
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
          src={`${process.env.PUBLIC_URL}/images/commanders/Henry V.png`}
          className="announce-img"
          alt="Henry V"
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
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Thutmose III.png`}
          className="announce-img"
          alt="Thutmose III"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Bjorn Ironside.png`}
          className="announce-img"
          alt="Bjorn Ironside"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Imhotep.png`}
          className="announce-img"
          alt="Imhotep"
        ></img>
      </div>
    </>
  );
});

export default Announcement;
