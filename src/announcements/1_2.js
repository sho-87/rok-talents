import React from 'react';
import '../styles/Announcement.css';

const Announcement = React.memo((props) => {
  return (
    <>
      <h1>{`Update: v1.2.0`}</h1>

      <h2>New Features</h2>
      <div>
        Thanks to a partnership with{' '}
        <a href="https://rok.guide" target="_blank" rel="noopener noreferrer">
          rok.guide
        </a>
        , each commander now has a guide. Clicking on the guide icon next to the
        commander name now takes you to the guide for that commander:
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/screenshots/guide.png`}
        className="announce-img"
        alt="guide"
      ></img>

      <hr className="announce-hr" />

      <div>
        You can now embed talent builds directly into other websites. If you run
        your own website or blog, your talent build can be directly embedded
        into your site using an iframe.
        <br />
        <br />
        The embedded talent build will be view-only (i.e. talent points cannot
        be changed). You can find the embed code in the Share menu:
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/screenshots/embed.png`}
        className="announce-img"
        alt="guide"
      ></img>

      <h2>Other Changes</h2>
      <ul>
        <li>Added Cleopatra to the commander list</li>
        <li>Added a share button for Weibo</li>
        <li>Removed the commander background image from the info panel</li>
      </ul>

      <h2>Bug Fixes</h2>
      <ul>
        <li>Fixed resolution of images and site logo</li>
      </ul>
    </>
  );
});

export default Announcement;
