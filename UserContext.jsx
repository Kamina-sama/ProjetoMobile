import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState, useEffect, createContext } from 'react';
import { Alert } from 'react-native';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import User from './User';

const UserContext= createContext(
    {
        user:null,
        login: async (field, pass)=>{},
        logout:()=>{},
        signup: async (name, email, pass)=>{},
        deleteAccount:async () => {}
    });

const UserContextComponent = ({children})=> {
    const [user, setUser]=useState(null);
    const login = async (field, pass)=>{
        var u=await User.GetByNameAndPass(field, pass);
        var v=await User.GetByEmailAndPass(field, pass);
        if(u===null && v===null) {
            setUser(null);
            return null;
        }
        setUser(u!==null? u:v);
        return u!==null? u:v;
    }
    const logout=()=>{
        setUser(null);
    }
    const signup=async (name, email, pass)=>{
        var u=new User(name, pass, email);
        var result=await u.Create();
        if(result) {
            setUser(u);
            return true;
        }
        return false;
    }
    const deleteAccount=async ()=>{
        console.log("on UserContext's deleteAccount:");
        if(user!==null) {
            var u=User.Copy(user);
            var result=await u.Delete();
            logout();
            return result;
        }
        return true;
    }
    return (<UserContext.Provider value={
        {
            user:user,
            login:login,
            logout:logout,
            signup:signup,
            deleteAccount:deleteAccount
        }}>{children}</UserContext.Provider>);
}

export {UserContext, UserContextComponent};