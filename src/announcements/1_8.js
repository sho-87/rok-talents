import React from 'react';
import '../styles/Announcement.css';

const Announcement = React.memo((props) => {
  return (
    <>
      <h1>{`Update: v1.8.0`}</h1>
      <div>
        Added new legendary commanders: Mulan, Harald, and Zenobia
      </div>

      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Mulan.png`}
          className="announce-img"
          alt="Mulan"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Harald Sigurdsson.png`}
          className="announce-img"
          alt="Harald"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Zenobia.png`}
          className="announce-img"
          alt="Zenobia"
        ></img>
      </div>
    </>
  );
});

export default Announcement;
