import React from 'react';
import Greeting from './Greeting';

function Profile() {
  console.log('Profile');

  return (
    <>
      <Greeting />
    </>
  );
}

export default React.memo(Profile);
