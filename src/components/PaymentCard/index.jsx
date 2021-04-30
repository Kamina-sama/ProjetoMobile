import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export const PaymentCard = ({creditNumber, navigation, name, creditValidate, id}) => {
    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => {
                navigation.navigate('DetailedCard', {
                    creditNameProp: name,
                    creditNumberProp: creditNumber,
                    validateProp: creditValidate,
                    idProp: id,
                });
            }}
        >
            <Text>Cartão número:</Text>
            <Text>{creditNumber}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 250,
        height: 80,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: "#FFF",
        borderRadius: 10,
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'left',
    },
});