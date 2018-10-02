# Catch the apples!

Sorry for this deceptive repo name "image-clicker", I changed ideas midway and this is actually a mobile game about apples!

## Game description
Apples are falling from the tree, catch it with your basket! You can move basket using the arrows on the left and right corner of your screen. There are both good and bad apples. You are supposed to catch the good apples and avoid the bad apples. You will gain points by catching good apples. Game will be over if you catch bad apples which are either wormy or has an evil face. You can restart the game by clicking 'restart'.

See a demo of the game [here](https://youtu.be/xZAT7GZyobc)

## Who did what
I did the project by myself.

## What I learnt
I learn to set up a local dev environment for mobile apps using React Native. I learnt some react native components such as View and Modal and how to animate objects using Animated in the React Native Library. I learnt how to create stateful component in React Native and import them to App.js.

## What didn't work
I was trying to style the modal but didn't find props that allow me to style it. I also tried styling using style={} but it didn't do the trick. I hope to refine the game more if I had more time.

## Frontend tools
- Node - npm
- Babel
- React Native
- Eslint
- Expo

## Test locally
- run 'npm install'
- run `npm start`, use `i` to run ios simulator. Or use `s` to get an expo link and test on your phone.

## Author
- Ruoni Wang

## Acknowledgements
I started with this tutorial https://www.youtube.com/watch?v=jsIlewXb_Q0. I changed the design to the apples. And I ended up extending the game to include multiple apples, which required a different organization i.e. a stateful new Component to represent the apples.
