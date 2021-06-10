import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Modal, ImageBackground, Image, Button, Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from '@react-navigation/native';
import Book from "../Book";
import { RefreshControl } from 'react-native';
import {UserContext} from "../UserContext";

const genericBookSource=require('../assets/generic-book.jpg');

export default function Store({navigation, route}) {
  const userContext=useContext(UserContext);
  const [loggedUser, setLoggedUser]=useState(null);
  const [id, setID]=useState(null);
  const [books, setBooks]=useState(null);
  const [isAdmin, setIsAdmin]=useState(false);
  const [refreshThingy, setRefreshThingy]=useState(true);

  const [comment, setComment]=useState('');

  function ClearFields() {
    setIsAdmin(false);
    setLoggedUser(null);
    setID(null);
    setBooks(null);
    setComment('');
  }

  async function HandlePostComment(book) {
    /*if(comment==='') {
      Alert.alert('Error','comment is empty!');
      return;
    }
    let newComment={userID:id, userName:loggedUser.name, body:comment, date:new Date()}
    let books=await AsyncStorage.getItem('books');
    books=JSON.parse(books);
    const index=books.findIndex(b=>b.id===book.id);
    let comments=books[index].comments;
    const userIndex=comments.findIndex(c=>c.userID===id);
    if(userIndex===-1) comments.push(newComment);
    else comments[userIndex]=newComment;
    books=JSON.stringify(books);
    AsyncStorage.setItem('books', books);
    setComment('');*/
  }

  useFocusEffect(React.useCallback(update, [userContext.user])); //before it was loggedUser

  function update() {
    console.log('update');
    CheckIfAdmin();
    Refresh();
    //setTimeout(()=>{setRefreshThingy(!refreshThingy)}, 1000);
  }

  function CheckIfAdmin() {
    /*console.log('checkIfAdmin');
    AsyncStorage.getItem('loggedUser',(error,result)=>{
      result=JSON.parse(result);
      if(result==null || loggedUser==null || loggedUser.id!==result.id) setLoggedUser(result);
      if(result==null || result.id==undefined || result.id>1) setIsAdmin(false);
      else setIsAdmin(true);
    });*/
    if(userContext.user!==null && userContext.user.id<=1) setIsAdmin(true);
    else setIsAdmin(false);
  }

  function getBooks() {
    console.log('getBooks');
    /*AsyncStorage.getItem('books', (error, result)=>{
      result=JSON.parse(result);
      if(JSON.stringify(result)!==JSON.stringify(books)) setBooks(result);
    });*/
    //Book.GetBooks().then(result=>setBooks(result));
  }

  function Refresh() {
    Book.GetBooks().then(result=>setBooks(result));
  }

  function ChangeBookView(bookID) {
    if(id===bookID) setID(null);
    else setID(bookID);
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
      /*let books=await AsyncStorage.getItem('books');
      books=JSON.parse(books);
      const index=books.findIndex(book=>book.id===item.id);
      books.splice(index,1);
      ChangeBookView(item.id);
      setBooks(books);
      books=JSON.stringify(books);
      await AsyncStorage.setItem('books',books);*/
      var book=Book.Copy(item);
      await book.Delete();
      ChangeBookView(item.id);
      Refresh();
    }

    return (
      <View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={id===item.id}
        onRequestClose={() => {
          setComment('');
          ChangeBookView(item.id);
        }}
      >
        <ScrollView contentContainerStyle={{justifyContent:'flex-start'}} style={{flex:1, flexGrow:1}}>
          {isAdmin?
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity 
                onPress={()=>{
                  navigation.navigate('EditBook',{book:item});
                }}
                style={styles.editButton}
                >
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={createTwoButtonAlert}
                style={styles.deleteButton}
                >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>:null}
          {item.coverImageData!==null?<Image 
            style={{aspectRatio:item.coverImageData.width/item.coverImageData.height, flex:0, width:undefined}}
            source={{uri:'data:image/jpeg;base64,'+item.coverImageData.base64}}/>:<Image 
            style={{aspectRatio:420/600, flex:0, width:undefined}}
            source={genericBookSource}/>}
          <Button title={'Buy'}/>
          <View style={{flexDirection:'row', justifyContent:'space-between', margin:10}}>
            <View>
              <Text>{item.title} por {item.author}</Text>
              <Text style={{marginTop:20}}>Sinopsis:</Text>
              <Text>{item.sinopsis}</Text>
            </View>
            <View>
              <Text>R${item.price}</Text>
            </View>
          </View>
          <View style={{paddingTop:20,alignItems:'center'}}>
            <Text>Comments:</Text>
            <Text>Write a comment:</Text>
            <TextInput multiline={true} onChangeText={setComment} value={comment} placeholder={'place your comment here'}/>
            <Button title={'Post Comment'}/>
            {/*Aqui seria a parte dos comentarios. Sugiro uma flatList ou algo parecido, e criar o componente Comment
              que seria renderizado pela flatlist. Lembrando que seria o crud, entao teria que haver como criar, editar e apagar comentarios
              , mas apenas se o comentario for do proprio usuario. bastaria checar se o id de usuario do comentario é compativel com o id do usuario logado
            */}
          </View>

        </ScrollView>
      </Modal>

      <View style={[styles.item, {flex:0, height:'auto'}]}>
        <TouchableOpacity
          onPress={()=>ChangeBookView(item.id)}
          style={{flex:0, flexDirection:'row', height:'auto', justifyContent:'space-between'}}>
          <View style={{flex:0, flexDirection:'row', height:'auto'}}>
          <Image 
            style={[styles.image, {aspectRatio:item.coverImageData!==null?item.coverImageData.width/item.coverImageData.height:420/600}]}
            source={item.coverImageData!==null? {uri:'data:image/jpeg;base64,'+item.coverImageData.base64} :genericBookSource}/>
          <View style={{flexDirection:'column', justifyContent:'space-around'}}>
            <Text style={{ flexDirection:'row' ,maxWidth:160, flexWrap: 'wrap'}}>{item.title} escrito por {item.author}</Text>
            <Text>{item.genre}</Text>
          </View>
          </View>
          <Text style={{alignSelf:'center', margin:10}}>R${item.price}</Text>
        </TouchableOpacity>
      </View>

      </View>
    );
  }

  return (
    <SafeAreaView style={{flex:1}}>

      <ImageBackground source={require('../assets/book-library-with-open-textbook.jpg')} style={{flex:1}}>
        <View style={styles.tab}>
        <Text 
          onPress={()=>{
            ClearFields();
            navigation.navigate('MyAccount')
          }}
          style={{
            fontSize: 20,
            color: "#555",
            fontWeight: "normal",
            alignSelf: "center",
            textTransform: "uppercase"
          }}>My Account</Text>
          <Text style={{
            fontSize: 24,
            color: "#0dd",
            fontWeight: "bold",
            alignSelf: "center",
            textTransform: "uppercase"
          }}>Store</Text>
        </View>
        <Button title="Refresh" onPress={Refresh} />
        <View style={styles.formContainer}>
          <FlatList 
            data={books} 
            renderItem={BookSummary} 
            keyExtractor={(item) => item.id.toString()}
            extraData={id}/>
          {isAdmin? <TouchableOpacity
            onPress={()=>{
              ClearFields();
              navigation.navigate('UploadBook');
            }}
            style={styles.uploadBookButton}>
            <Icon name="plus"  size={30} color="#0dd" />
          </TouchableOpacity>:null}
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
    justifyContent:'space-around'
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
    width:'30%',
    height: undefined
  },
  deleteButton: {
    flex:1,
    elevation: 8,
    backgroundColor: "#f00",
    borderRadius: 0,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  editButton: {
    flex:1,
    elevation: 8,
    backgroundColor: "#ffae42",
    borderRadius: 0,
    paddingVertical: 20,
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
    bottom: '20%',                                                    
    right: '39%',
    height:80,
    backgroundColor:'#fff',
    borderRadius:100,
  }
});