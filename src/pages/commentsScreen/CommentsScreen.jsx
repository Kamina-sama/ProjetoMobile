import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { CustomInput } from '../../components/Input';
import { PrimaryButton } from '../../components/PrimaryButton';
import { CheckBox,Input } from 'react-native-elements';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, AsyncStorage } from 'react-native';
/* import  from '@react-native-community/async-storage' */


export const CommentsScreen = (props) => {
    const [comentarios, setComentarios] = useState([])
    const [comentario, setComentario] = useState({
        nome: "",
        titulo: "",
        descricao: "",
        recomenda: false,
    })

    React.useEffect(() => {
        async function getData() {
            let json = await AsyncStorage.getItem('comentatios');
            let resultado = JSON.parse(json)
            console.log('=>',resultado)
            /* setComentario(resultado) */
        }
        getData()
    },[])

    async function handleComemnt() {     

        if (comentario.nome === ''){
            alert('Informe o Nome do Autor do Comentario!')
        }else if (comentario.nome.length < 4){
             alert('O Nome do autor do comentário deve ter mais que 4 letras')
        }else if (comentario.titulo === ''){
            alert('Informe o Titulo!')
        }else if (comentario.titulo.length < 10){
            alert('O Titulo deve ter pelo menos 10 caracteres!')
        }else if (comentario.descricao === ''){
            alert('Escreva seu Comentário com pelo menos 15 Caracteres!')
        }else if (comentario.descricao.length < 10){
            alert('O Comentario deve ter pelo menos 15 caracters!') 
        }else{
            alert('Adicionado comentário');
          /* AsyncStorage.setItem('comentatios', JSON.stringify(comentarios.map(i => i))); */
        }
        
        let json = await AsyncStorage.getItem('comentatios');
        let resultado = JSON.parse(json)

        let resultado2 = resultado.map(i => i)
        console.log(resultado2)
        /* setComentario(resultado2) */

        /* if( comentatios === null ) comentatios = JSON.stringify([{name:'admin', id:0, email:'admin@email.com', password:'admin'}]) 
        users=JSON.parse(users);
        let desired_user=null;
        users.forEach(element => {
          if((element.name===field || element.email===field) && element.password===password) desired_user=element;
        }); */
      }

      
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <Text style={styles.title}>Comentarios</Text>
                   <View style={styles.mainContent}>
                <Input
                    placeholder='Seu Nome'
                    onChangeText={(text)=>setComentario({...comentario,nome:text})}
                    
                />
                <Input
                    placeholder='Seu titulo'
                    onChangeText={(text)=>setComentario({...comentario,titulo:text})}
                />
                <Input
                    placeholder='Seu comentario'
                    onChangeText={(text)=>setComentario({...comentario,descricao:text})}
                />
                <CheckBox
                    title='Recomenda ?'
                    checked={comentario.recomenda}
                    onPress={()=>setComentario({...comentario,recomenda:!comentario.recomenda})}
                />
                <PrimaryButton
                    onPress={()=> {
                        setComentarios([comentario,...comentarios])
                        handleComemnt()
                    }}
                   
                > 
                    Publicar 
                </PrimaryButton>
                   
                <View>
                    {comentarios.map((item,index)=>{
                        console.log(item)
                        return(
                            <View key={index}> 
                                <Text>{item.nome}</Text>
                                <Text>{item.titulo}</Text>
                                <Text>{item.descricao}</Text>
                                <Text>{item.recomenda}</Text>
                            </View>
                        )
                    })}
                </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 32
    },
    title: {
        fontSize: 34,
    },
    h2: {
        fontSize: 18,
        marginTop: 16,
    },
    mainContent: {
        marginTop: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
}); 

export default CommentsScreen
