import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import CreateBookScreen from './CreateBook';
import { NavigationContainer } from '@react-navigation/native';

const StartScreen = (props)=> {
  return (
    <View>
        <Button title='Login' onPress={()=>props.navigation.navigate('LoginScreen')}/>
        <Button title='Cadastro' onPress={()=>props.navigation.navigate('CadastroScreen')} />
        <Button title='Cadastro de editora' onPress={()=>props.navigation.navigate('CreateEditora')} />
    </View>
  );
}
export default StartScreen;