import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import CreateBookScreen from './CreateBook';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginAnalizer = (props)=> {
    const [user, setUser]=useState({});
    useEffect(() => 
      {
      async function doStuff() {
        const keys=await AsyncStorage.getAllKeys();
        keys.forEach((key)=>{
          async function doOtherStuff() {
            const userString=await AsyncStorage.getItem(key);
            const u=JSON.parse(userString);
            if(u.email===props.email && props.senha===u.senha) {
              setUser(u);
              return;
            }
          }
          doOtherStuff();
        });
        doStuff();
      }
    });

    return (
    <View>
      <Text>
      {'email' in user? 'Email: '+ user.email: 'Nope, no match here'}
      </Text>
    </View>
  );
}
export default LoginAnalizer;