import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const SecondaryButton = ({children, onPress}) => {
    return(
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.buttonText}>{children}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        borderRadius: 10,
        backgroundColor: "#FFF",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
        borderColor: "#000",
        borderWidth: 3
    },
    buttonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold"
    }
});