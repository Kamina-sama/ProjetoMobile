import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { Alert, Image, FlatList, ImageBackground, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

const generos=["Romance", "Comédia", "Biografia", "Aventura", "Drama", "Clássico"]

export default function EditBook({navigation, route}) {
  const originalBook=route.params.book;
  const bookId=route.params.book.id;

  const [title, setTitle]=useState(route.params.book.title);
  const [genre, setGenre]=useState(route.params.book.genre);
  const [sinopsis, setSinopsis]=useState(route.params.book.sinopsis);
  const [imageData, setImageData]=useState(route.params.book.coverImageData);
  const [author, setAuthor]=useState(route.params.book.author);
  const [price, setPrice]=useState(route.params.book.price);

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
    let newBook={id:bookId, title, genre, sinopsis, coverImageData:imageData, price, author};
    let books=await AsyncStorage.getItem('books');
    books=JSON.parse(books);
    const index=books.findIndex(book=>book.id===bookId);
    books[index]=newBook;
    books=JSON.stringify(books);
    await AsyncStorage.setItem('books', books);
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