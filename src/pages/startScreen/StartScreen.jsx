import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../../components/PrimaryButton';
import { SecondaryButton } from '../../components/SecondaryButton';

const StartScreen = (props)=> {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seja bem vindo ao CRUD</Text>
      <Text style={styles.h2}>Faça login caso tenha usuário ou cadastre-se</Text>
  
      <PrimaryButton 
        onPress={()=>props.navigation.navigate('LoginScreen')}
      >Login</PrimaryButton>
      <SecondaryButton 
        onPress={()=>props.navigation.navigate('CadastroScreen')} 
      >Cadastro</SecondaryButton>
    </View>
  );
}
export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  title: {
    fontSize: 34,
  },
  h2: {
    fontSize: 18,
    marginTop: 16,
    marginBottom:16
  }
});