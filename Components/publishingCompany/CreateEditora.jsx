import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Modal } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const CreateEditora = (props) => {
    const initialEditora = {
        "nome": "",
        "cnpj": "",
        "endereco": "",
        "telefone":"",
        "email": ""
    }

    const [editora, setEditora]=useState(initialEditora);
    const {isOpen, closeModal} = props;

    const handleChange = (value, name) => {
        setEditora({...editora, [name] : value});
    }

    const validation = () => {
        if(editora.nome == "" || editora.cnpj == "" || editora.endereco == "" || editora.telefone == "" || editora.email == ""){
            Alert.alert("Erro!","O campo '"+ name +"' é de preenchimento obrigatório.");
        }else{
            cadastrarEditora();
        }
    }

    const cadastrarEditora = () => {
        props.addEditora(editora);
        props.closeModal();
    }
    
    return (
        <Modal visible={isOpen} onRequestClose={closeModal} animationType="slide">
            <View style={styles.container}>
                <Text style={styles.title}>Nova Editora </Text>
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
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        onPress={validation}
                        style={ {...styles.button, marginVertical: 0} }
                    >
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress = {closeModal}
                        style={ {...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato"} }
                    >
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
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