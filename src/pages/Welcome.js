import React from 'react';
import Onboard from './onboard.png';

const Welcome = () => {

  const style404 = {
    fontSize: 72,
    fontWeight: 'bold'
  };

  return (
    <div style={{ textAlign:'center' }}>
      <h1>Welcome to</h1>
      <div style={style404}>OnBoard</div>
      <img alt="error" src={Onboard} />
    </div>
  );
};

export default Welcome;
