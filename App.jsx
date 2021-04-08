import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import CreateBookScreen from './CreateBook';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './Routes';

const App = ()=> {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
export default App;
//<CreateBookScreen autor={this.state.usuario} onSubmit={this.handleSubmit}/>
/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
