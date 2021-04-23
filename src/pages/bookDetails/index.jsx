import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

export const BookDetail = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Detalhes sobre a obra</Text>

                <Text style={styles.h2}>Autor:</Text>
                <Text style={styles.paragraphy}>José de Alencar</Text>

                <Text style={styles.h2}>Título:</Text>
                <Text style={styles.paragraphy}>Senhora</Text>

                <Text style={styles.h2}>Gênero:</Text>
                <Text style={styles.paragraphy}>Romance</Text>

                <Text style={styles.h2}>Ano de lançamento:</Text>
                <Text style={styles.paragraphy}>1875</Text>

                <Text style={styles.h2}>Resumo:</Text>
                <Text style={styles.paragraphy}>A protagonista Aurélia Camargo é filha de uma costureira pobre e deseja se casar com o namorado, Fernando Seixas. O rapaz, porém, troca Aurélia por Adelaide Amaral, uma menina rica que proporcionaria um futuro mais promissor. O tempo passa e Aurélia torna-se órfã e recebe uma herança enorme do avô.</Text>
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
        fontWeight: "bold",
        marginBottom: 16
    },
    h2: {
        fontSize: 24,
        fontWeight: "bold",
    },
    paragraphy: {
        fontSize: 18,
        marginBottom: 16,
    }
});