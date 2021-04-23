import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, ImageBackground, Image, Button, Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';


export default function MyBooks({navigation, route}) {
  const [loggedUser, setLoggedUser]=useState(route.params.loggedUser);
  const [seeTitle, setSeeTitle]=useState(null);

  useEffect(()=>{
    AsyncStorage.getItem('loggedUser', (error, result)=>{
      result=JSON.parse(result);
      if(loggedUser.myBooks.length!==result.myBooks.length) {
        setLoggedUser(result);
      }
    });
  });

  useFocusEffect(refresh);

  function refresh() {
    AsyncStorage.getItem('loggedUser', (error, result)=>{
      result=JSON.parse(result);
      setLoggedUser(result);
    });
  }

  function ChangeSeeTitle(title) {
    if(title===seeTitle) setSeeTitle(null);
    else setSeeTitle(title);
  }

  const BookSummary=({item})=>{

    const createTwoButtonAlert = () =>
    Alert.alert(
      "Warning",
      "You're about to delete this book. This action is permanent. Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel"
        },
        { text: "Confirm", onPress: HandleDeleteBook, style:'destructive' }
      ]
    );
    
    async function HandleDeleteBook() {
      const index=loggedUser.myBooks.findIndex((e)=>e.title==item.title && e.sinopsis==item.sinopsis)
      if(index!==-1) loggedUser.myBooks.splice(index,1);
      await AsyncStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      let users=await AsyncStorage.getItem('users');
      users=JSON.parse(users);
      users=users.map(u=>{
        if(u.name===loggedUser.name && u.email===loggedUser.email && u.password===loggedUser.password) {
          return loggedUser;
        }
        return u;
      });
      users=JSON.stringify(users);
      await AsyncStorage.setItem('users', users);
      setLoggedUser({...loggedUser});
    }

    function HandleEdit() {
      navigation.navigate('EditBook',{book:item});
    }

    return (
      <View style={[styles.item, {flex:0, height:'auto'}]}>
        <TouchableOpacity
          onPress={()=>ChangeSeeTitle(item.title)}
          style={{flex:0, flexDirection:'row', height:'auto'}}>
          {item.coverImageData!==null?<Image 
            style={[styles.image, {aspectRatio:item.coverImageData.width/item.coverImageData.height}]}
            source={{uri:'data:image/jpeg;base64,'+item.coverImageData.base64}}/>:null}
          <View style={{flexDirection:'column'}}>
            <Text>Title: {item.title}</Text>
            <Text>Genre: {item.genre}</Text>
            {seeTitle===item.title? <Text>Sinopsis: {item.sinopsis}</Text>:null}
            <View style={{flexDirection:'row'}}>
            {seeTitle===item.title? <TouchableOpacity 
              onPress={HandleEdit} 
              title={'Edit'} 
              style={styles.editButton}>
              <Text style={styles.appButtonText}>Edit</Text>
            </TouchableOpacity>:null}
            {seeTitle===item.title? <TouchableOpacity 
              onPress={createTwoButtonAlert} 
              title={'Delete'} 
              style={styles.deleteButton}>
              <Text style={styles.appButtonText}>Delete</Text>
            </TouchableOpacity>:null}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <ImageBackground source={require('../../assets/book-library-with-open-textbook.jpg')} style={{flex:1}}>
        <View style={styles.tab}>
          <Text 
            style={{
            fontSize: 24,
            color: "#444",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase"
            }}
          >Store</Text>
          <Text style={{
            fontSize: 24,
            color: "#0dd",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase"
          }}>My Books</Text>
        </View>
        <View style={styles.formContainer}>
          {loggedUser.myBooks.length==0? <Text style={{alignSelf:'center',marginTop:'80%', fontSize:24, color:'#f00'}}>You don't have any books!</Text>:null}
          <FlatList 
            data={loggedUser.myBooks} 
            renderItem={BookSummary} 
            keyExtractor={(item) => item.title}
            extraData={seeTitle}/>

          <TouchableOpacity
            onPress={()=>navigation.navigate('UploadBook')}
            style={styles.uploadBookButton}>
            <Icon name="plus"  size={30} color="#0dd" />
          </TouchableOpacity>

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
    alignSelf:'flex-start',
    width:'20%',
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