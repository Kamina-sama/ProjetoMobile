import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, ImageBackground, Image, Button, Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';


export default function Store({navigation, route}) {
  const [id, setID]=useState(null);
  const [books, setBooks]=useState(null);

  useFocusEffect(getBooks);

  function getBooks() {
    AsyncStorage.getItem('books', (error, result)=>{
      result=JSON.parse(result);
      setBooks(result);
    });
  }

  function ChangeBookView(bookID) {
    if(id===bookID) setID(null);
    else setID(bookID);
  }

  const BookSummary=({item})=>{
    return (
      <View style={[styles.item, {flex:0, height:'auto'}]}>
        <TouchableOpacity
          onPress={()=>ChangeBookView(item.id)}
          style={{flex:0, flexDirection:'row', height:'auto'}}>
          {item.coverImageData!==null?<Image 
            style={[styles.image, {aspectRatio:item.coverImageData.width/item.coverImageData.height}]}
            source={{uri:'data:image/jpeg;base64,'+item.coverImageData.base64}}/>:null}
          <View style={{flexDirection:'column'}}>
            <Text>Title: {item.title}</Text>
            <Text>Genre: {item.genre}</Text>
            <Text>Author: {item.author}</Text>
            <Text>Price: {item.price}</Text>
            {id===item.id? <Text>Sinopsis: {item.sinopsis}</Text>:null}
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <ImageBackground source={require('../assets/book-library-with-open-textbook.jpg')} style={{flex:1}}>
        <View style={styles.tab}>
          <Text style={{
            fontSize: 24,
            color: "#0dd",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase"
          }}>Store</Text>
        </View>
        <View style={styles.formContainer}>
          <FlatList 
            data={books} 
            renderItem={BookSummary} 
            keyExtractor={(item) => item.id.toString()}
            extraData={id}/>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tab:{
    flexDirection:'row',
    marginTop:0,
    paddingTop:50,
    marginBottom:10,
    width:'100%',
    backgroundColor:'#eee',
    justifyContent:'space-evenly'
  },
  formContainer: {
    alignSelf:'center',
    borderRadius:10,
    justifyContent:'center',
    backgroundColor:'#eee',
    height:'100%',
    width:'90%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor:'transparent'
  },
  item: {
    alignSelf:'center',
    backgroundColor: '#ddd',
    borderRadius:10,
    width:'95%',
    marginVertical: 5,
  },
  image:{
    margin:5,
    alignSelf:'flex-start',
    maxWidth:'40%',
    minWidth:'20%',
    height: undefined
  },
  deleteButton: {
    elevation: 8,
    backgroundColor: "#f00",
    borderRadius: 0,
    alignSelf:'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  editButton: {
    elevation: 8,
    backgroundColor: "#ffae42",
    borderRadius: 0,
    alignSelf:'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  uploadBookButton: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:80,
    position: 'absolute',                                          
    bottom: '12%',                                                    
    right: '39%',
    height:80,
    backgroundColor:'#fff',
    borderRadius:100,
  }
});