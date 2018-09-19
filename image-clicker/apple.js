import React from 'react';

import { Animated } from 'react-native';


function Apple(props) {
  return (
    <Animated.Image
      source={props.appleImg}
      style={{
        position: 'absolute',
        left: props.appleStartposX,
        transform: [{
          translateY: props.moveAppleVal,
        }],
      }}
    >
    </Animated.Image>
  );
}


module.exports = Apple;
