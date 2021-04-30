import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/core';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, Image, View, Alert } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

const genericProfilePictureSource=require('../assets/blank-profile-picture-973460_640.png');

export default function MyAccount(props) {
  const [user,setUser]=useState('');
  const [somethingChanged, setSomethingChanged]=useState(false);
  const navigation=props.navigation;

  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [oldPassword, setOldPassword]=useState('');
  const [newPassword, setnewPassword]=useState('');

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  function update() {
      getUser();
      setSomethingChanged(false);
      if((name!=='' && name!==user.name) || (email!=='' && email!==user.email && validateEmail(email)) && (oldPassword==='' && newPassword==='')) setSomethingChanged(true);
      if(oldPassword===user.password && newPassword!==oldPassword && newPassword.length>=8) setSomethingChanged(true);
  }

  function getUser() {
    AsyncStorage.getItem('loggedUser',(error, result)=>{
        result=JSON.parse(result);
        setUser(result);
    });
  }

  useFocusEffect(update);

  async function HandleFileSelect() {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      base64:true
    });
    if(result.cancelled) return;

    let newUser={...user};
    newUser.profileImageData=result;
    await AsyncStorage.setItem('loggedUser', JSON.stringify(newUser));
    let users=await AsyncStorage.getItem('users');
    users=JSON.parse(users);
    const index=users.findIndex(u=>u.id===newUser.id);
    users[index]=newUser;
    users=JSON.stringify(users);
    await AsyncStorage.setItem('users', users);
  }

  async function HandleDeleteAccount() {
    let users=await AsyncStorage.getItem('users');
    users=JSON.parse(users);
    const index=users.findIndex(u=>u.id===user.id);
    users.splice(index,1);
    users=JSON.stringify(users);
    await AsyncStorage.setItem('users', users);
    await AsyncStorage.removeItem('loggedUser');
    navigation.navigate('SignUp');
  }

  async function HandleLogOut() {
      await AsyncStorage.removeItem('loggedUser');
      navigation.navigate('Login');
  }

  const createTwoButtonAlert = () =>
    Alert.alert(
      "Warning",
      "You're about to delete your account. This action is permanent. Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Confirm", onPress: HandleDeleteAccount, style:'destructive' }
      ]
    );

  return (
    <SafeAreaView style={styles.topmost}>
        <View style={styles.tab}>
        <Text style={{
            fontSize: 24,
            color: "#0dd",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase"
          }}>My Account</Text>
          <Text 
            onPress={()=>navigation.navigate('Store')}
            style={{
              fontSize: 20,
              color: "#555",
              fontWeight: "normal",
              alignSelf: "center",
              textTransform: "uppercase"
          }}>Store</Text>
        </View>
        <Image style={user.profileImageData==null? {maxHeight:'50%'}:{aspectRatio:user.profileImageData.width/user.profileImageData.height,width:'100%', maxHeight:'50%'}} source={user.profileImageData==null? genericProfilePictureSource:{uri:'data:image/jpeg;base64,'+user.profileImageData.base64}}/>
        <TouchableOpacity onPress={HandleFileSelect} style={styles.appButtonContainer}><Text>Change Profile Picture</Text></TouchableOpacity>
        <Text>Edit Name:</Text>
        <TextInput onChangeText={setName} value={name} placeholder={user.name}/>
        <Text>Edit Email:</Text>
        <TextInput onChangeText={setEmail} value={email} placeholder={user.email}/>
        <Text>Change password:</Text>
        <TextInput onChangeText={setOldPassword} secureTextEntry={true} value={oldPassword} placeholder={'old password'}/>
        <TextInput onChangeText={setnewPassword} secureTextEntry={true} value={newPassword} placeholder={'new password'}/>
        <TouchableOpacity disabled={!somethingChanged} style={somethingChanged? styles.appButtonContainer: [styles.appButtonContainer, {backgroundColor:'#888'}]}><Text>Save Changes</Text></TouchableOpacity>
        <TouchableOpacity onPress={HandleLogOut} style={[styles.appButtonContainer, {backgroundColor:'#ffae42'}]}><Text>Log out</Text></TouchableOpacity>
        <TouchableOpacity onPress={createTwoButtonAlert} style={[styles.appButtonContainer,{backgroundColor:'#e05'}]}><Text>Delete Account</Text></TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: '10%'
    },
  tab:{
    flexDirection:'row',
    marginTop:0,
    paddingTop:50,
    width:'100%',
    backgroundColor:'#eee',
    justifyContent:'space-around'
  },
  topmost: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
