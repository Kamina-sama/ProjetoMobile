import React, { useState } from 'react';

import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

const DeleteEditora = (props) => {

    const { isOpen, closeModal, selectedEditora } = props;

    const deleteEditora = () => {
      props.deleteEditora(props.selectedEditora.cnpj);
      props.closeModal();
    }

    return (
        <Modal
            visible={isOpen}
            onRequestClose={closeModal}
            animationType="slide"
            transparent
        >
            <View style={styles.BackgroundContainer}>
                <View key={selectedEditora.cnpj} style={styles.container}>
                    <Text style={styles.title}>Deseja excluir essa editora? ({selectedEditora.nome})?</Text>
                    <Text style={styles.subTitle}>Se deseja excluir a editora aperte o botão OK.</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={deleteEditora}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ marginLeft: 10 }}
                            onPress={closeModal}>
                            <Text style={{ ...styles.buttonText, color: "skyblue" }}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}



export default DeleteEditora;

const styles = StyleSheet.create({
    BackgroundContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.2)"
    },
    container: {
        width: "90%",
        padding: 15,
        maxHeight: "40%",
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 4
    },
    title: {
        fontWeight: "bold",
        fontSize: 17,
        marginBottom: 5
    },
    subTitle: {
        fontSize: 16
    },
    textBox: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "rgba(0,0,0,0.3)",
        marginBottom: 15,
        fontSize: 18,
        padding: 10
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignSelf: "flex-end"
    },
    buttonText: {
        color: "tomato",
        fontSize: 17
    },
    message: {
        color: "tomato",
        fontSize: 17
    }
})