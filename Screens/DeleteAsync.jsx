import 'react-native-gesture-handler';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Button, StyleSheet, View } from 'react-native';

export default function DeleteAsync() {

  function HandleDeleteEverything() {
    AsyncStorage.removeItem('users');
    AsyncStorage.removeItem('books');
    AsyncStorage.removeItem('ID');
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

  return (
    <View style={{flex:1, justifyContent:'center'}}>
    <Button style={styles.button} title={'Delete Everything'} onPress={HandleDeleteEverything}/>
    <Button style={styles.button} title={'Delete Users'} onPress={HandleDeleteUsers}/>
    <Button style={styles.button} title={'Delete Books'} onPress={HandleDeleteBooks}/>
    </View>
  );
}

const styles=StyleSheet.create({
    button:{
        
    }
});