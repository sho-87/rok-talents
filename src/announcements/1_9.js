import React from 'react';
import '../styles/Announcement.css';

const Announcement = React.memo((props) => {
  return (
    <>
      <h1>{`Update: v1.9.0`}</h1>
      <div>
        Added new commanders: Diaochan, Lu Bu, Nebuchadnezzar II, Cyrus the Great, Trajan, and Moctezuma I 
      </div>

      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Diaochan.png`}
          className="announce-img"
          alt="Diaochan"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Lu Bu.png`}
          className="announce-img"
          alt="Lu Bu"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Nebuchadnezzar II.png`}
          className="announce-img"
          alt="Nebuchadnezzar II"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Cyrus the Great.png`}
          className="announce-img"
          alt="Cyrus the Great"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Trajan.png`}
          className="announce-img"
          alt="Trajan"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Moctezuma I.png`}
          className="announce-img"
          alt="Moctezuma I"
        ></img>
      </div>
    </>
  );
});

export default Announcement;
