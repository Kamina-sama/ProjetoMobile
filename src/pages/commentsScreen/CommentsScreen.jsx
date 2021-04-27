import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { CustomInput } from '../../components/Input';
import { PrimaryButton } from '../../components/PrimaryButton';
import { CheckBox,Input } from 'react-native-elements';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';



export const CommentsScreen = (props) => {
    const [comentario, setComentario] = useState({
        nome: "",
        titulo: "",
        descricao: "",
        recomenda: false,
    })

    const [comentarios, setComentarios] = useState([])
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
                    onPress={()=>setComentarios([comentario,...comentarios])}
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
