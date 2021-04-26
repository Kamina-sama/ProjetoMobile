import 'react-native-gesture-handler';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Button, StyleSheet, View } from 'react-native';

export default function DeleteAsync() {

  function HandleDelete() {
    AsyncStorage.removeItem('users');
    AsyncStorage.removeItem('books');
    AsyncStorage.removeItem('ID');
    Alert.alert('deleted');
  }

  return (
    <View style={{flex:1, justifyContent:'center'}}>
    <Button style={styles.button} title={'Delete'} onPress={HandleDelete}/>
    </View>
  );
}

const styles=StyleSheet.create({
    button:{
        
    }
});