import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  ImageBackground,
  Animated,
  View,
  Text,
  Dimensions,
} from 'react-native';
import Apple from './apple';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  left: {
    flex: 1,
    color: 'grey',
    margin: 0,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  right: {
    flex: 1,
    color: 'grey',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  points: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movePlayerVal: new Animated.Value(100),
      points: 0,

      moveAppleVal: new Animated.Value(0),
      appleStartposX: 0,
      appleSpeed: 4000,
      gameOver: false,
    };
  }
  componentDidMount() {
    this.animateApple();
  }

  movePlayer(direction) {
    if (direction === 'left') {
      if (this.state.movePlayerVal._value >= 20) {
        Animated.spring(
          this.state.movePlayerVal,
          {
            toValue: this.state.movePlayerVal._value - 20,
            tension: 50,
          },
        ).start();
      }
    }
    if (direction === 'right') {
      if (this.state.movePlayerVal._value <= Dimensions.get('window').width - 100) {
        Animated.spring(
          this.state.movePlayerVal,
          {
            toValue: this.state.movePlayerVal._value + 20,
            tension: 50,
          },
        ).start();
      }
    }
  }

  isColliding() {
    const windowH = Dimensions.get('window').height;
    return this.state.moveAppleVal._value > windowH - 120 &&
      this.state.moveAppleVal._value < windowH - 80 &&
      Math.abs(this.state.appleStartposX - this.state.movePlayerVal._value) < 20;
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
        clearInterval(refreshIntervalId);
        this.setState({ gameOver: true });
        this.gameOver();
      }
    }, 50);

    // increase apple speed each 20th second
    setInterval(() => {
      this.setState({ appleSpeed: this.state.appleSpeed - 50 });
    }, 20000);

    // Animate the apples
    Animated.timing(
      this.state.moveAppleVal,
      {
        toValue: Dimensions.get('window').height,
        duration: this.state.appleSpeed,
      },
    ).start((event) => {
      // if no collision
      if (event.finished && this.state.gameOver === false) {
        clearInterval(refreshIntervalId);
        this.setState({ points: this.state.points + 1 });
        this.animateApple();
      }
    });
  }

  gameOver() {
    alert('You got bad apples!');
  }

  render() {
    return (
      <ImageBackground source={require('./img/bg.jpg')} style={styles.container} >
        <View style={{ flex: 1, marginTop: 10 }}>
          <View style={styles.points}>
            <Text style={{ fontWeight: 'bold', fontSize: 30 }}>{this.state.points}</Text>
          </View>
        </View>
        <Animated.Image source={require('./img/holder.jpg')} style={{ position: 'absolute', zIndex: 1, bottom: 50, transform: [{ translateX: this.state.movePlayerVal }] }}>
        </Animated.Image>

        <Apple appleImg={require('./img/red.jpg')} appleStartposX={this.state.appleStartposX} moveAppleVal={this.state.moveAppleVal} />

        <View style={styles.controls}>
          <Text style={styles.left} onPress={() => this.movePlayer('left')}> {'<'} </Text>
          <Text style={styles.right} onPress={() => this.movePlayer('right')}> {'>'} </Text>
        </View>
      </ImageBackground>
    );
  }
}


AppRegistry.registerComponent('Game', () => Game);
