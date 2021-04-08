import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import CreateBookScreen from './CreateBook';
import { NavigationContainer } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createUser, setCurrentUser} from './UserStuff';



const CadastroScreen = (props) => {
    const [user, setUser]=useState('');
    const [email, setEmail]=useState('');
    const [senha, setSenha]=useState('');

    const cadastrar = async () => {
        const id=await createUser(user, email, senha);
        await setCurrentUser(id);
        const x=await AsyncStorage.getItem(id);
    }

    return (
        <View>
            <TextInput textContentType='username' value={user} onChangeText={setUser}  placeholder='Nome de usuario'/>
            <TextInput textContentType='emailAddress' value={email} onChangeText={setEmail}  placeholder='Email@Host.com'/>
            <FloatingLabelInput 
                label={'Senha'} 
                textContentType='newPassword' 
                isPassword 
                togglePassword={false} 
                value={senha} 
                onChangeText={setSenha}
            />
            <Button title='Cadastrar' onPress={cadastrar}/>
            <Text>Já possui uma conta? <Text style={styles.link} onPress={()=>props.navigation.navigate('LoginScreen')}>Faça Login</Text></Text>
        </View>
    );
}
export default CadastroScreen;

const styles=StyleSheet.create({
    link:{color:'blue'}  
});