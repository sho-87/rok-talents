import React from 'react';
import { homepage } from '../package.json';
import './styles/Banner.css';

const Banner = React.memo(props => {
  const style = {
    visibility: props.show ? 'visible' : 'hidden',
    fontSize: props.embed ? '0.9em' : ''
  };

  return (
    <div id="banner" data-testid="banner" style={style}>
      <div>
        Created at{' '}
        <a href={homepage} target="_blank" rel="noopener noreferrer">
          {homepage.split('//')[1]}
        </a>
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/icon.svg`}
        alt="roktalents banner"
      ></img>
    </div>
  );
});

export default Banner;
