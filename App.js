import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect, createContext } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import MyBooks from './Screens/book/MyBooks';
import UploadBook from './Screens/book/UploadBook';
import EditBook from './Screens/book/EditBook';
import Store from './Screens/Store';
import Editora from './Screens/publishingCompany/Editora';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DeleteAsync from './Screens/DeleteAsync';
import CommentsScreen from './src/pages/commentsScreen/CommentsScreen'
import PaymentCards from './src/pages/paymentCards';
import { DetailedCard } from './src/pages/paymentCards/detailedCard';
import MyAccount from './Screens/MyAccount'
import {UserContextComponent} from "./UserContext";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <UserContextComponent>
      <PaymentCardProvider>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName={'SignUp'}>
            <Drawer.Screen name={'SignUp'} component={SignUp} options={{gestureEnabled:true}}/>
            <Drawer.Screen name={'Login'} component={Login} options={{gestureEnabled:false}}/>
            <Drawer.Screen name={'UploadBook'} component={UploadBook} options={{gestureEnabled:false}}/>
            <Drawer.Screen name={'EditBook'} component={EditBook} options={{gestureEnabled:false}}/>
            <Drawer.Screen name={'Editora'} component={Editora} />
            <Drawer.Screen name={'Store'} component={Store}/>
            <Drawer.Screen name={'DeleteAsync'} component={DeleteAsync}/>
            <Drawer.Screen name={'CommentsScreen'} component={CommentsScreen}/>
            <Drawer.Screen name={'PaymentCardList'} component={PaymentCards} />
            <Drawer.Screen name={'DetailedCard'} component={DetailedCard} />
            <Drawer.Screen name={'MyAccount'} component={MyAccount} options={{gestureEnabled:false}}/>
          </Drawer.Navigator>
        </NavigationContainer>
      </PaymentCardProvider>
    </UserContextComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
