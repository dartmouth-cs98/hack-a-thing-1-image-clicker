import React from 'react';

import { Animated, Dimensions } from 'react-native';


export default class Apple extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moveAppleVal: new Animated.Value(0),
      appleStartposX: 0,
      source: this.findSource(),
    };
  }

  componentDidMount() {
    this.animateApple();
  }

  findSource() {
    if (this.props.isBad) {
      if (Math.round(Math.random()) === 0) {
        return require('./img/wormy.jpg');
      } else {
        return require('./img/green_bad.jpg');
      }
    } else if (Math.round(Math.random()) === 0) {
      return require('./img/red.jpg');
    } else {
      return require('./img/green.jpg');
    }
  }

  isColliding() {
    const windowH = Dimensions.get('window').height;
    return this.state.moveAppleVal._value > windowH - 120 &&
      this.state.moveAppleVal._value < windowH - 80 &&
      this.state.appleStartposX - this.props.movePlayerVal._value > -10 &&
    this.state.appleStartposX - this.props.movePlayerVal._value < 40;
  }

  animateApple() {
    this.state.moveAppleVal.setValue(-100);
    const windowW = Dimensions.get('window').width;
    // generate left distance for apple
    this.setState({ appleStartposX: (windowW - 60) * Math.random() });

    // interval to check for collision each 50 ms
    const refreshIntervalId = setInterval(() => {
      // Collision logic
      if (this.isColliding()) {
        if (this.props.isBad) {
          clearInterval(refreshIntervalId);
          this.setState({ gameOver: true });
          this.props.setGameOver();
        } else {
          this.props.increasePoints();
        }
      }
    }, 50);


    const appleSpeed = (Math.random() * 3000) + 3000;
    // Animate the apples
    Animated.timing(
      this.state.moveAppleVal,
      {
        toValue: Dimensions.get('window').height - 80,
        duration: appleSpeed,
      },
    ).start((event) => {
      // if no collision
      if (event.finished && this.props.isGameOver === false) {
        clearInterval(refreshIntervalId);
        this.animateApple();
      }
    });
  }


  render() {
    return (
      <Animated.Image
        source={this.state.source}
        style={{
          width: 35,
          height: 35,
          position: 'absolute',
          left: this.state.appleStartposX,
          transform: [{
            translateY: this.state.moveAppleVal,
          }],
        }}
      >
      </Animated.Image>
    );
  }
}
