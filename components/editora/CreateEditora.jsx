import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {FloatingLabelInput} from 'react-native-floating-label-input';
//import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeData, getData} from './EditoraStuff';



const CreateEditora = (props) => {
    const initialEditora = {
        "nome": "",
        "cnpj": "",
        "endereco": "",
        "telefone":"",
        "email": ""
    }

    const [editora, setEditora]=useState(initialEditora);

    const handleChange = (value, name) => {
        setEditora({...editora, [name] : value});
    }

    const cadastrar = () => {
        const resultado= storeData(editora, editora.cnpj);
        if(resultado){
            Alert.alert("Sucesso","Editora cadastrada com sucesso");
            getData(editora.cnpj).then(result => {
                Alert.alert("Dados cadastrados", JSON.stringify(result));
            });
        }else{
            Alert.alert("Erro", "Houve erro ao cadastrar a editora.\n\n\n"+resultado);
        }
    }
    
    /*const cadastrar = async () => {
        const id=await createUser(user, email, senha);
        await setCurrentUser(id);
        const x=await AsyncStorage.getItem(id);
    }*/

    return (
        <View style={styles.container}>
            <TextInput 
                textContentType='name' 
                onChangeText={ (text) => { handleChange(text,"nome")} }  
                placeholder='Nome da editora'
                style={styles.textBox}
            />
            
            <TextInput 
                keyboardType="numeric"
                onChangeText={ (text) => { handleChange(text,"cnpj")} }  
                placeholder='CNPJ'
                style={styles.textBox}
            />

            <TextInput 
                onChangeText={ (text) => { handleChange(text,"endereco")} }  
                placeholder='Endereço'
                style={styles.textBox}
            />

            <TextInput 
                keyboardType="numeric"
                onChangeText={ (text) => { handleChange(text,"telefone")} }  
                placeholder='Telefone'
                style={styles.textBox}
            />

            <TextInput 
                textContentType='emailAddress' 
                onChangeText={ (text) => {handleChange(text, "email")} } 
                placeholder='Email@Host.com'
                style={styles.textBox}
            />
            <Text style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={cadastrar}
                    style={ {...styles.button, marginVertical: 0} }
                >
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={ {...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato"} }
                >
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
            </Text>
        </View>
    );
}
export default CreateEditora;

const styles=StyleSheet.create({
    container: {
        padding: 15
    },
    title:{
      fontWeight: "bold",
      fontSize: 20,
      marginBottom: 20
    },
    textBox: {
      borderWidth: 1,
      borderRadius: 6,
      borderColor: "rgba(0,0,0,0.3)",
      marginBottom: 15,
      fontSize: 18,
      padding: 10
    },
    buttonContainer: {
      marginTop: 10,
      flexDirection: "row",
      alignItems: "center"
    },
    button: {
      borderRadius: 5,
      marginVertical: 20,
      alignSelf: 'flex-start',
      backgroundColor: "gray",
    },
    buttonText: {
        color: "white",
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 16
    },
});