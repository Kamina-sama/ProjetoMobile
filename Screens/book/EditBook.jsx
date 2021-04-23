import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { Alert, Image, FlatList, ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

export default function EditBook({navigation, route}) {
  const originalTitle=route.params.book.title;
  const originalGenre=route.params.book.genre;
  const originalSinopsis=route.params.book.sinopsis;

  const [title, setTitle]=useState(route.params.book.title);
  const [genre, setGenre]=useState(route.params.book.genre);
  const [sinopsis, setSinopsis]=useState(route.params.book.sinopsis);
  const [imageData, setImageData]=useState(route.params.book.coverImageData);

  async function HandleFileSelect() {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
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
    setImageData(result);
  }

  //TODO: change this function to modify user original book:
  async function HandleUpload() {
    let newBook={title, genre, sinopsis, coverImageData:imageData};
    let loggedUser=await AsyncStorage.getItem('loggedUser');
    loggedUser=JSON.parse(loggedUser);

    loggedUser.myBooks=loggedUser.myBooks.map((book)=>{
        console.log(book.title);
      if(book.title===originalTitle && book.genre===originalGenre && book.sinopsis===originalSinopsis) {
        return newBook;
      }
      return book;
    });

    //update logged user in users:
    let users=await AsyncStorage.getItem('users');
    users=JSON.parse(users);
    users=users.map(element=>{
      if(element.name===loggedUser.name && element.email===loggedUser.email) return loggedUser;
      return element;
    });
    users=JSON.stringify(users);
    await AsyncStorage.setItem('users',users);

    //now we just need to wrap it up by updating the loggedUser itself:
    loggedUser=JSON.stringify(loggedUser);
    await AsyncStorage.setItem('loggedUser', loggedUser);

    loggedUser=JSON.parse(loggedUser);

    navigation.navigate('MyBooks',{loggedUser});
  }
  
  function handleGoBack() {
    AsyncStorage.getItem('loggedUser', (error, result)=>{
      result=JSON.parse(result);
      navigation.navigate('MyBooks',{loggedUser:result});
    });
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <ImageBackground source={require('../../assets/book-library-with-open-textbook.jpg')} style={{flex:1}}>
        <View style={styles.formContainer}>
          <TextInput 
            style={styles.input} 
            value={title} onChangeText={setTitle} 
            textContentType={'none'}
            placeholder={'Title'}/>
          <TextInput 
            style={styles.input} 
            value={genre} 
            onChangeText={setGenre}  
            textContentType={'none'} 
            placeholder={'Genre'}/>
          <TextInput 
            style={[styles.input,{borderRadius:10, height:100, textAlignVertical: 'top'}]} 
            value={sinopsis} 
            onChangeText={setSinopsis}  
            multiline={true}
            numberOfLines={4}
            textContentType={'none'} 
            placeholder={'Sinopsis'}/>
          {imageData!==null && 'uri' in imageData?
              <Image 
                style={[styles.image, {aspectRatio:imageData.width/imageData.height}]} 
                resizeMode={'contain'}
                source={{uri:'data:image/jpeg;base64,'+imageData.base64}}/>
            :
            null}
          <TouchableOpacity 
            onPress={HandleFileSelect} 
            style={[styles.appButtonContainer,{alignSelf:'center', borderRadius:40, width:'50%', backgroundColor:'#0dd', marginTop:10, marginBottom:10}]}>
              <Text style={[styles.appButtonText, {fontSize:14}]}>Select File</Text>
          </TouchableOpacity>
          <View style={styles.buttons}>
            <TouchableOpacity 
              onPress={HandleUpload} 
              style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleGoBack}
              style={[styles.appButtonContainer,{backgroundColor:'#e05'}]}>
              <Text style={styles.appButtonText}>Go back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  buttons:{
    flexDirection:'row',
    justifyContent:'space-evenly'
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: '5%'
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
  image:{
    alignSelf:'center',
    width:'90%',
    height: undefined
  },
  formContainer: {
    alignSelf:'center',
    borderRadius:20,
    marginTop:'50%',
    paddingTop:10,
    paddingBottom:10,
    justifyContent:'center',
    backgroundColor:'#eee',
    width:'70%',
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
    backgroundColor: 'white',
    marginBottom: 5,
  },
});