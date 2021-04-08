import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import DocumentPicker from 'react-native-document-picker';
//import * as DocumentPicker from 'expo-document-picker';
import CurrencyInput from 'react-native-currency-input';
import FilePickerManager from 'react-native-file-picker';

 const mimeFormats=['application/pdf','application/epub+zip','text/plain'];

export default class CreateBookScreen extends React.Component {
state={
    nomeLivro:"", 
    coverUri:"" , 
    autor:this.props.autor, 
    bookData:{}, 
    error:false, 
    value:0
};
    handleBookSubmission= () => {
        //TODO
        if('onSubmit' in this.props) this.props.onSubmit(this.state.nomeLivro); 
    }

    handleBookUpload= () => {
        FilePickerManager.showFilePicker(null, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled file picker');
            }
            else if (response.error) {
              console.log('FilePickerManager Error: ', response.error);
            }
            else {
              this.setState({
                file: response
              });
            }
          });
    }

    render() {
        return (
            <View>
                <CurrencyInput unit='BRL' ignoreNegative={true} value={this.state.value} precision={2} onChangeValue={formattedValue=>this.setState({value:formattedValue})}/>
                <Text>Autor: {this.props.autor}</Text>
                <TextInput placeholder="Nome do Livro" onChangeText={text => this.setState({nomeLivro: text})}/>
                <Text>{'name' in this.state.bookData? this.state.bookData.name:''}</Text>
                <Button title="Selecionar Arquivo do Livro" onPress={this.handleBookUpload}/>
                <Button onPress={this.handleBookSubmission} title="Concluir"/>
            </View>
        );
    }
}