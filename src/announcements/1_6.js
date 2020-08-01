import React from 'react';
import '../styles/Announcement.css';

const Announcement = React.memo((props) => {
  return (
    <>
      <h1>{`Update: v1.6.0`}</h1>
      <div>
        Two new legendary commanders have been added: Chandragupta and William I
      </div>

      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Chandragupta Maurya.png`}
          className="announce-img"
          alt="Chandragupta"
        ></img>
      </div>
      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/William I.png`}
          className="announce-img"
          alt="William I"
        ></img>
      </div>
    </>
  );
});

export default Announcement;
