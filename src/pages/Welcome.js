import React from 'react';
import Onboard from './onboard.png';
import { normalize } from 'path';
require('./welcome.css');
const Welcome = () => {
/*
  const style404 = {
    fontSize: 50,
    fontWeight: 'normal',
    color: fccbff,
    fontStyle: normal,
    fontFamily: sans-serif
  };*/

  return (
    <div style={{ textAlign:'center' }}>
      <div className="style404">
        Welcome to
        </div>
      <img alt="error" src={Onboard} />
    </div>
  );
};

export default Welcome;
