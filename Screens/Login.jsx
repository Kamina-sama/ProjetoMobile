import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { Alert, FlatList, ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {UserContext} from "../UserContext";

export default function Login(props) {
  const userContext=useContext(UserContext);
  const {navigation}=props;
  const [field, setField]=useState('');
  const [password, setPassword]=useState('');

  function clearFields() {
    setField('');
    setPassword('');
  }

  async function handleLogin() {
    /*let users=await AsyncStorage.getItem('users');
    if(users===null) users=JSON.stringify([{name:'admin', id:0, email:'admin@email.com', password:'admin', profileImageData:null}]) 
    users=JSON.parse(users);
    let desired_user=null;
    users.forEach(element => {
      if((element.name===field || element.email===field) && element.password===password) desired_user=element;
    });
    if(desired_user!==null) {
      if(desired_user.id===0) Alert.alert('Admin mode','welcome back, admin!');
      AsyncStorage.setItem('loggedUser', JSON.stringify(desired_user));
      clearFields();
      props.navigation.navigate('Store');
    }
    else {
      //Seria legal mostrar um texto em vermelho dizendo que a senha ou o nome estao errados,
      //mas isso é de menos
      Alert.alert('User not found', 'please check if the fields are correct and try again');
    }*/
    var result=await userContext.login(field, password);
    if(result!==null) {
      clearFields();
      props.navigation.navigate('Store');
    }
    else {
      userContext.logout();
      Alert.alert("Error:", "Couldn't find user, please check the fields");
    }
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <ImageBackground source={require('../assets/book-library-with-open-textbook.jpg')} style={{flex:1}}>
        <View style={styles.formContainer}>
          <TextInput 
            style={styles.input} 
            value={field} onChangeText={setField} 
            textContentType={'emailAddress'} 
            placeholder={'Name or Email'}/>
          <TextInput 
            style={styles.input} 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry={true} 
            textContentType={'password'} 
            placeholder={'Password'}/>
          <View style={styles.buttons}>
            <TouchableOpacity 
              onPress={handleLogin} 
              style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={()=>{clearFields(); navigation.navigate('SignUp')}}
              style={[styles.appButtonContainer,{backgroundColor:'#e05'}]}>
              <Text style={styles.appButtonText}>Go back</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.text}>Forgot Password? Click here to reset password.</Text>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  buttons:{
    marginTop:10,
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: '10%'
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  text: { 
    alignSelf:'center',
    color:'blue',
    fontSize: 14,
    textDecorationLine: 'underline',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formContainer: {
    alignSelf:'center',
    borderRadius:20,
    marginTop:300,
    paddingTop:10,
    paddingBottom:10,
    justifyContent:'center',
    backgroundColor:'#eee',
    width:'70%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  input: {
    alignSelf:'center',
    borderRadius:20,
    height: 40,
    width: '90%',
    paddingHorizontal: 5,
    marginVertical:10,
    backgroundColor: 'white',
    marginBottom: 5,
  },
});