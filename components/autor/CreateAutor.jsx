import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {FloatingLabelInput} from 'react-native-floating-label-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeData, getData} from './autor';

const CreateAutor = (props) => {

    const [list, setList] = useState([
    ])

    const [autor, setAutor] = useState({
        codigoAutor: "",
        nome: "",
    });

    /* const handleChange = (value, name) => {
        setAutor({...autor, [name] : value});
    } */

    /* function cadastro()  {
        Alert('Ok true!')
        if(resultado){
            Alert.alert (" Autor Cadastrado com Sucesso!")
                getData(autor.codigoAutor).then(result => {
                    Alert.alert("Autor Cadastrado", JSON.stringify(result));
        });

        }else{
            Alert.alert("Erro ao Cadastrar o Autor, Verificar as informações Preenchidas.\n\n\n"+resultado);
        }
    } */

return (
    <View style={styles.container}>
        <Text> Cadastro do Autor </Text>
        <TextInput 
            textContentType='name' 
            onChangeText={ (text) => { setAutor({...autor, nome : text}) } }  
            placeholder='Nome do Autor'
            style={styles.textBox}
        />
        
        <TextInput 
            keyboardType="numeric"
            onChangeText={ (text) => { setAutor({...autor, codigoAutor : text}) } }  
            placeholder='Codigo'
            style={styles.textBox}
        />

        <Text style={styles.buttonContainer}>
            <TouchableOpacity 
                onPress={() => {                   
                    setList([...list, autor])
                    storeData('teste', '1')
                }}
                style={ {...styles.button, marginVertical: 0} }
            >
                <Text style={styles.buttonText}>FazerCadastro</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={ {...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato"} }
            >
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </Text>

        {list.map(item => {
            return(
                <>
                    <Text>{item.nome} - {item.codigoAutor}</Text> 
                </>
            )
        }) }
    </View>
);
}

export default CreateAutor;

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
