import React from 'react';
import '../styles/Announcement.css';

const Announcement = React.memo((props) => {
  return (
    <>
      <h1>{`Update: v1.7.0`}</h1>
      <div>
        Added new epic commander: Matilda of Flanders
      </div>

      <div className="announce-img-container">
        <img
          src={`${process.env.PUBLIC_URL}/images/commanders/Matilda of Flanders.png`}
          className="announce-img"
          alt="Matilda"
        ></img>
      </div>
    </>
  );
});

export default Announcement;
