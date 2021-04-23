import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import StartScreen from '../pages/startScreen/StartScreen';
import LoginScreen from '../pages/loginScreen/LoginScreen';
import CadastroScreen from '../pages/cadastroScreen/CadastroScreen'
import { BookStore } from '../pages/bookStore';
import { BookDetail } from '../pages/bookDetails';

const Stack=createStackNavigator();

const Routes = ()=> {
  return (
    <Stack.Navigator initialRouteName='StartScreen'>
        <Stack.Screen component={StartScreen} name='StartScreen'/>
        <Stack.Screen component={LoginScreen} name='LoginScreen'/>
        <Stack.Screen component={CadastroScreen} name='CadastroScreen'/>
        <Stack.Screen component={BookStore} name='BookStore'/>
        <Stack.Screen component={BookDetail} name='BookDetail'/>
    </Stack.Navigator>
  );
}
export default Routes;