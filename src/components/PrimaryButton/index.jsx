import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const PrimaryButton = ({children, onPress}) => {
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
        backgroundColor: "#ff9000",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold"
    }
});