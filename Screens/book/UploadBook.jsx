import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { ScrollView, Alert, Image, Picker, Slider, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import Input from '../../src/components/Input';

const generos=["Romance", "Comédia", "Biografia", "Aventura", "Drama", "Clássico"]

export default function UploadBook({navigation, route}) {
  const [title, setTitle]=useState('');
  const [genre, setGenre]=useState(generos[0]);
  const [sinopsis, setSinopsis]=useState('');
  const [imageData, setImageData]=useState(null);
  const [author, setAuthor]=useState('');
  const [price, setPrice]=useState(10);

  function ClearFields() {
    setTitle('');
    setGenre('Romance');
    setSinopsis('');
    setImageData(null);
    setAuthor('');
    setPrice(10);
  }

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
    setImageData(result);
  }

  async function HandleValidation() {
    if(title.length==0 || sinopsis.length==0 || author.length==0) 
    Alert.alert('Erro','é necessario preencher todos os campos de texto');
    else {
      await HandleUpload();
    }
  }

  async function HandleUpload() {
    let ID=await AsyncStorage.getItem('ID');
    if(ID===null) ID=JSON.stringify({nextBookID:0, nextUserID:0, nextCommentID:0});
    ID=JSON.parse(ID);
    console.log(ID.nextBookID);
    let newBook={id:ID.nextBookID, title, genre, price, sinopsis, coverImageData:imageData, author, comments:[]};
    let livros=await AsyncStorage.getItem('books');
    if(livros==null) livros=JSON.stringify([]);
    livros=JSON.parse(livros);
    livros.push(newBook);
    livros=JSON.stringify(livros);
    await AsyncStorage.setItem('books', livros);
    ++ID.nextBookID;
    ID=JSON.stringify(ID);
    await AsyncStorage.setItem('ID',ID);
    ClearFields();
    navigation.navigate('Store');
  }
  
  function handleGoBack() {
    ClearFields();
    navigation.navigate('Store');
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
          <View style={{flexDirection:'row'}}>
            <Text style={{marginHorizontal:20,paddingTop:15, fontSize:14}}>Genre:</Text>
            <Picker
              selectedValue={genre}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setGenre(itemValue)}
            >
              {generos.map(genero => <Picker.Item key={genero} label={genero} value={genero}/>)}
            </Picker>
          </View>
          <TextInput 
            style={[styles.input,{borderRadius:10, height:100, textAlignVertical: 'top'}]} 
            value={sinopsis} 
            onChangeText={setSinopsis}  
            multiline={true}
            numberOfLines={4}
            textContentType={'none'} 
            placeholder={'Sinopsis'}/>
          <TextInput 
            style={styles.input} 
            value={author} 
            onChangeText={setAuthor} 
            textContentType={'name'} 
            placeholder={'Author\'s name'}/>
            <Text style={{alignSelf:'center'}}>Price: R${price}</Text>
          <Slider minimumValue={10} maximumValue={500} onValueChange={(value)=>setPrice(value.toFixed(2))}/>
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
              onPress={HandleValidation} 
              style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Upload</Text>
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