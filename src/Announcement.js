import React from 'react';
import './styles/Announcement.css';

function Announcement(props) {
  return (
    <>
      <h1>{`New release: v1.3.0`}</h1>

      <h2>New Features</h2>
      <div>
        I have received many requests for this feature and it is finally here:
        screenshots!
        <br />
        <br />
        Click the Screenshot button in the top navigation bar to take a
        screenshot of your current talent build. Whatever you see in the middle
        talent tree window will be what gets saved.
        <br />
        <br />
        Don't settle for those blurry in-game screenshots anymore!
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/screenshots/screenshot.png`}
        className="announce-img announce-img-border"
        alt="guide"
      ></img>

      <hr className="announce-hr" />

      <div>
        Two new legendary commanders have been added: Artemisia I and Ramesses
        II. This includes full talent trees as well as commander guides.
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/screenshots/artemisia_ramesses.png`}
        className="announce-img"
        alt="guide"
      ></img>

      <h2>Other Changes</h2>
      <ul>
        <li>Created a new icon and logo for the website</li>
        <li>
          Commander image sizes have been reduced, so the commander list should
          load faster. Image quality has not been reduced.
        </li>
      </ul>

      <h2>Bug Fixes</h2>
      <ul>
        <li>
          Fixed a bug where new users would always see the announcement window.
        </li>
        <li>Fixed some talent description typos.</li>
      </ul>
    </>
  );
}

export default Announcement;
