import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (props)=> {
  const [email, setEmail]=useState('');
  const [senha, setSenha]=useState('');

  function analizeLogin() {
  
  }

  return (
    <View>
        <TextInput textContentType='emailAddress' value={email} onChangeText={setEmail}  placeholder='email@host.com'/>
        <FloatingLabelInput 
          label={'Senha'} 
          textContentType='password' 
          isPassword 
          togglePassword={false} 
          value={senha} 
          onChangeText={setSenha}
        />
        <Button title='Login' onPress={analizeLogin}/>
        <Text>Não possui uma conta? <Text style={styles.link} onPress={()=>props.navigation.navigate('CadastroScreen')}>cadastre-se</Text></Text>
    </View>
  );
}
export default LoginScreen;

const styles=StyleSheet.create({
  link:{color:'blue'}
}
);