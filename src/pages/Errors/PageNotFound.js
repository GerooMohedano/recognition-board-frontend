import React from 'react';
import Error404 from './error404.gif';

const PageNotFound = () => {

  const style404 = {
    fontSize: 72,
    fontWeight: 'bold'
  };

  return (
    <div style={{textAlign:'center'}}>
      <h1>Page Not Found</h1>
      <div style={style404}>404</div>
      <img alt="error" src={Error404} />
    </div>
  );
};

export default PageNotFound;
