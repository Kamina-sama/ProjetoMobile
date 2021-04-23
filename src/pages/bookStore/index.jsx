import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Book } from '../../components/Book';

export const BookStore = (props) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Bem vindo à e-biblioteca!</Text>
                <Text style={styles.h2}>Abaixo encontramos todos os livros cadastrados na plataforma.</Text>
                <Text style={styles.h2}>Pressione em cada item para mais detalhes.</Text>
                <View style={styles.mainContent}>
                    <Book onPress={()=>props.navigation.navigate('BookDetail')}/>
                    <Book />
                    <Book />
                    <Book />
                    <Book />
                    <Book />
                    <Book />
                    <Book />
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