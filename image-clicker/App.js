import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  ImageBackground,
  Animated,
  View,
  Text,
  Modal,
  TouchableHighlight,
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
      gameOver: false,
      modalVisible: false,
      badApples: 3,
      goodApples: 2,
    };
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

  increasePoints = () => {
    this.setState({ points: this.state.points + 1 });
  }

  gameOver = () => {
    this.setState({ modalVisible: true });
  }

  restart = () => {
    this.setState({ modalVisible: false, points: 0, gameOver: false });
  }

  renderApples = () => {
    const apples = [];
    for (let i = 0; i < this.state.badApples; i++) {
      apples.push(<Apple
        isBad={true}
        appleSpeed={this.state.appleSpeed}
        isGameOver={this.state.gameOver}
        movePlayerVal={this.state.movePlayerVal}
        setGameOver={this.gameOver}
        increasePoints={this.increasePoints}
      />);
    }
    for (let i = 0; i < this.state.goodApples; i++) {
      apples.push(<Apple
        isBad={false}
        appleSpeed={this.state.appleSpeed}
        isGameOver={this.state.gameOver}
        movePlayerVal={this.state.movePlayerVal}
        setGameOver={this.gameOver}
        increasePoints={this.increasePoints}
      />);
    }
    return apples;
  }

  render() {
    console.log(this.state.modalVisible);
    return (
      <ImageBackground source={require('./img/bg.jpg')} style={styles.container} >
        <View style={{ flex: 1, marginTop: 10 }}>
          <View style={styles.points}>
            <Text style={{ fontWeight: 'bold', fontSize: 30 }}>{this.state.points}</Text>
          </View>
        </View>
        <Animated.Image source={require('./img/holder.jpg')} style={{ position: 'absolute', zIndex: 1, bottom: 50, transform: [{ translateX: this.state.movePlayerVal }] }}>
        </Animated.Image>

        {this.renderApples()}

        <View style={styles.controls}>
          <Text style={styles.left} onPress={() => this.movePlayer('left')}> {'<'} </Text>
          <Text style={styles.right} onPress={() => this.movePlayer('right')}> {'>'} </Text>
        </View>
        <Modal
          animationType="slide"
          visible={this.state.modalVisible}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center' }}
          >
            <View>
              <Text>You just got bad apples!</Text>
              <TouchableHighlight
                onPress={this.restart}
                style={{
                  alignItems: 'center',
                }}
              >
                <Text>Restart</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    );
  }
}


AppRegistry.registerComponent('Game', () => Game);
