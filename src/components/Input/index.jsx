import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

export const CustomInput = ({onChange, value, textContentType, placeholder}) => {
    return(
        <View style={styles.cotainer}>
            <TextInput onChangeText={onChange} value={value} textContentType={textContentType} placeholder={placeholder}/>
        </View>
    );
}

const styles = StyleSheet.create({
    cotainer: {
        width: 300,
        height: 60,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: "#FFF",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16
    }
});