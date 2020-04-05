import React from 'react';
import '../styles/Announcement.css';

const Announcement = React.memo((props) => {
  return (
    <>
      <h1>{`Update: v1.4.0`}</h1>
      <h2>New Features</h2>
      <div>
        Added video guides and talent build discussions by{' '}
        <a
          href="https://www.youtube.com/channel/UCM2N9uCL0nvKNuJT7u4t2Lw"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shinchi42
        </a>
        . You can find these for the newest commanders (Ramesses and Artemisia).
        More video guides will be added once they are created.
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/screenshots/shinchi.png`}
        className="announce-img announce-img-border"
        alt="guide"
      ></img>
      <hr className="announce-hr" />
      <div>
        A number of new Settings have been added. These are some of the most
        requested features, and are designed to make talent point assignment{' '}
        <i>much</i> faster. Like, seriously fast.
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/screenshots/settings-autofill.png`}
        className="announce-img announce-img-border"
        alt="settings"
      ></img>
      Screenshot Settings:
      <ul>
        <li>
          <strong>Include stats:</strong> Turning this on will now add your
          build stats to screenshots
        </li>
      </ul>
      Expert Settings:
      <ul>
        <li>
          <strong>Instant zero:</strong> When <i>removing</i> talent points,
          this option will instantly set the selected talent to 0 with a single
          click. No need to click multiple times to remove a talent anymore.
        </li>
        <li>
          <strong>Instant max:</strong> When <i>adding</i> talent points, this
          option will instantly max out the selected talent.
        </li>
        <li>
          <strong>Auto fill:</strong> This option will automatically fill in all
          prerequisite talents. Add points to any talent{' '}
          <i>(even ones at the end of a tree)</i>, and all prereqs will be
          completed for you instantly.
        </li>
      </ul>
      <hr className="announce-hr" />
      <h2>Other Changes</h2>
      <ul>
        <li>
          You can now view announcements for past updates in the Info page
        </li>
        <li>Reduced screenshot banner/logo size so it is less obnoxious</li>
        <li>
          Screenshots have been changed to JPEG format so they are more
          iPhone/iPad friendly
        </li>
        <li>
          The way stats are calculated has been changed to allow for some of the
          new Settings listed above. Let me know if this is noticeably slower
          than before
        </li>
      </ul>
      <h2>Bug Fixes</h2>
      <ul>
        <li>
          Fixed dependent talents for the Conquering talent 'Moment of Triumph'
        </li>
        <li>Fixed values for the Archer talent 'Armed and Armored'</li>
      </ul>
    </>
  );
});

export default Announcement;
