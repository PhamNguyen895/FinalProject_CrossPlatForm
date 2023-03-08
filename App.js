import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createStackNavigator } from 'react-navigation'
//import 2 screen already create before login and homescreen
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'

export default class App extends React.Component {

  render() {
      return (
          <AppStackNavigator />
      );
  }
}
// create navigation for 2 screen login and home
const AppStackNavigator = createStackNavigator({
    Login: { screen: LoginScreen },
    Home: { screen: HomeScreen }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding:10
    },
    titlelogin: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 30,
        padding: 70
    },
    forbutton: {
        color: 'white',
        fontWeight: 'bold',
    }
});
