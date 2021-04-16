import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomInput } from '../../components/Input';
import { PrimaryButton } from '../../components/PrimaryButton';

const CadastroScreen = (props)=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Informe os dados de cadastro</Text>
        <Text style={styles.label}>Email</Text>
        <CustomInput 
          onChange={input => setEmail(input)}
          value={email}
        />
        <Text style={styles.label}>Senha</Text>
        <CustomInput 
          onChange={input => setPassword(input)}
          value={password}
        />
        <PrimaryButton 
          onPress={()=>props.navigation.navigate('BookStore')}
        >Cadastrar</PrimaryButton>
    </View>
  );
}
export default CadastroScreen;

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
  label: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "flex-start",
    marginBottom: 8,
    width: 300
  }
});