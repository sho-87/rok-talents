import React from 'react';
import { homepage } from '../package.json';
import './styles/Banner.css';

function Banner(props) {
  return (
    <div id="banner" data-testid="banner">
      <span>
        Created at{' '}
        <a href={homepage} target="_blank" rel="noopener noreferrer">
          {homepage.split('//')[1]}
        </a>
      </span>
      <img
        src={`${process.env.PUBLIC_URL}/icon.svg`}
        alt="roktalents banner"
      ></img>
    </div>
  );
}

export default Banner;
