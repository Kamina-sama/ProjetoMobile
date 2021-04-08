import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import CreateBookScreen from './CreateBook';
import StartScreen from './StartScreen';
import LoginScreen from './LoginScreen';
import CadastroScreen from './CadastroScreen'
import LoginAnalizer from './LoginAnalizer';

const Stack=createStackNavigator();

const Routes = ()=> {
  return (
    <Stack.Navigator initialRouteName='StartScreen'>
        <Stack.Screen component={StartScreen} name='StartScreen'/>
        <Stack.Screen component={LoginScreen} name='LoginScreen'/>
        <Stack.Screen component={CadastroScreen} name='CadastroScreen' />
        <Stack.Screen component={LoginAnalizer} name='LoginAnalizer' />
    </Stack.Navigator>
  );
}
export default Routes;