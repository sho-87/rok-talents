import React from 'react';
import { repository } from '../../package.json';
import '../styles/Announcement.css';

const Announcement = React.memo((props) => {
  return (
    <>
      <h1>{`Update: v2.0.0`}</h1>
      <h2>Open source!</h2>
      <div>
        Ever since the original release and{' '}
        <a
          href="https://www.reddit.com/r/RiseofKingdoms/comments/f2oe39/rok_online_talent_builder/"
          target="_blank"
          rel="noopener noreferrer"
        >
          announcement
        </a>{' '}
        of RoK Talents, the plan has always been to open source the code. So...
      </div>
      <br></br>
      <div>
        The full source code can be found on GitHub:{' '}
        <a href={repository.url} target="_blank" rel="noopener noreferrer">
          sho-87/rok-talents
        </a>
        .
      </div>
      <br></br>
      <div>
        Code contributions are welcome. Information on how you can contribute can be found{' '}
        <a
          href={
            'https://github.com/sho-87/rok-talents/blob/master/CONTRIBUTING.md'
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </div>
    </>
  );
});

export default Announcement;
