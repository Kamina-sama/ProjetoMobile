import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const Book = ({onPress}) => {
    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={onPress}
        >
            <Text style={styles.author}>José de Alencar</Text>
            <Text style={styles.title}>Senhora</Text>
            <Text style={styles.year}>1875</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        borderWidth: 2,
        borderColor: "#000",
        backgroundColor: "#ff9000",
        borderRadius: 14,
        padding: 8,
        justifyContent: "space-between",
        marginBottom: 8,
        marginRight: 8,
    },
    author: {
        fontWeight: "bold",
        fontSize: 22,
        color: "#FFF"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    year: {
        fontSize: 18
    }
});