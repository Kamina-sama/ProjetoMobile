import 'react-native-gesture-handler';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Button, StyleSheet, View } from 'react-native';
import User from '../User';
import axios from "axios";
export default function DeleteAsync() {

  function HandleDeleteEverything() {
    AsyncStorage.removeItem('users');
    AsyncStorage.removeItem('books');
    AsyncStorage.removeItem('ID');
    AsyncStorage.removeItem('loggedUser');
    Alert.alert('deleted');
  }
  function HandleDeleteUsers() {
    AsyncStorage.removeItem('users');
    Alert.alert('deleted');
  }
  function HandleDeleteBooks() {
    AsyncStorage.removeItem('books');
    Alert.alert('deleted');
  }
  async function HandleShowUsers() {
    var admin=await User.GetByNameAndPass("admin","nimda");
    var newUser=User.Copy(admin);
    newUser.name="justAGuy";
    await newUser.Create();
    console.log(newUser);
  }

  return (
    <View style={{flex:1, justifyContent:'center'}}>
    <Button style={styles.button} title={'Delete Everything'} onPress={HandleDeleteEverything}/>
    <Button style={styles.button} title={'Delete Users'} onPress={HandleDeleteUsers}/>
    <Button style={styles.button} title={'Delete Books'} onPress={HandleDeleteBooks}/>
    <Button style={styles.button} title={'Show users in Database'} onPress={HandleShowUsers}/>
    </View>
  );
}

const styles=StyleSheet.create({
    button:{
        
    }
});