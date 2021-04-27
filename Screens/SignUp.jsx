import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { Alert, FlatList, ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';



export default function SignUp({navigation}) {
  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');

  async function handleSignUp() {
    let users=await AsyncStorage.getItem('users');
    if(users===null) users=JSON.stringify([{name:'admin', email:'admin@email.com', id:0, password:'admin'}]);
    users=JSON.parse(users);

    const ID=await AsyncStorage.getItem('ID');
    if(ID===null) ID=JSON.stringify({nextBookID:0, nextUserID:1});
    ID=JSON.parse(ID);

    let created_user={id:ID.nextUserID, name, email, password};

    users.push(created_user);
    users=JSON.stringify(users);
    await AsyncStorage.setItem('users', users);

    created_user=JSON.stringify(created_user);
    await AsyncStorage.setItem('loggedUser', created_user);

    ++ID.nextUserID;
    ID=JSON.stringify(ID);
    await AsyncStorage.setItem('ID', ID);
    
    navigation.navigate('Store');
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <ImageBackground source={require('../assets/book-library-with-open-textbook.jpg')} style={{flex:1}}>
        <View style={styles.formContainer}>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
            textContentType={'nickname'} 
            placeholder={'Username'}/>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            textContentType={'emailAddress'} 
            placeholder={'Email'}/>
          <TextInput 
            style={styles.input} 
            value={password} 
            onChangeText={setPassword} 
            secureTextEntry={true} 
            textContentType={'password'} 
            placeholder={'Password'}/>
          <View style={styles.buttons}>
            <TouchableOpacity 
              onPress={handleSignUp}
              style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text onPress={()=>navigation.navigate('Login')} style={styles.text}>Already have an account? click here to Login.</Text>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  buttons:{
    flexDirection:'row',
    justifyContent:'space-evenly',
    marginTop:10
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
    marginVertical:10,
    height: 40,
    width: '90%',
    paddingHorizontal: 5,
    backgroundColor: 'white',
    marginBottom: 5,
  },
});