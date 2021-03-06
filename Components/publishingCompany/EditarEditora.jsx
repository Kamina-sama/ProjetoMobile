import React, { useContext } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { EditoraContext } from '../../src/context/PublishingCompanyContext';

const EditarEditora = (props) => {
    //const [editora, setEditora] = useState(initialEditoraState);
    const { isOpen, closeModal } = props;
    const [editora, setEditora] = useContext(EditoraContext);

    const handleChange = (value, name) => {
        setEditora({ ...editora, [name]: value });
    }

    const validation = () => {
        if(editora.nome == "" || editora.cnpj == "" || editora.endereco == "" || editora.telefone == "" || editora.email == ""){
            Alert.alert("Erro!","O todos os campos são de preenchimento obrigatório.");
        }else{
            updateEditora();
        }
    }

    const updateEditora = () => {
        props.updateEditora(editora.id, editora);
        props.closeModal();
    }

    return (
        <Modal
            visible={isOpen}
            onRequestClose={closeModal}
            animationType="slide"
        >
            <View style={styles.container}>
                <Text style={styles.title}>Editar Editora</Text>

                <TextInput 
                    textContentType='name' 
                    onChangeText={ (text) => { handleChange(text,"nome")} }  
                    value={editora.nome}
                    placeholder='Nome da editora'
                    style={styles.textBox}
                />
                
                <TextInput 
                    keyboardType="numeric"
                    onChangeText={ (text) => { handleChange(text,"cnpj")} }  
                    placeholder='CNPJ'
                    value={editora.cnpj}
                    style={styles.textBox}
                />

                <TextInput 
                    onChangeText={ (text) => { handleChange(text,"endereco")} }  
                    placeholder='Endereço'
                    value={editora.endereco}
                    style={styles.textBox}
                />

                <TextInput 
                    keyboardType="numeric"
                    onChangeText={ (text) => { handleChange(text,"telefone")} }  
                    placeholder='Telefone'
                    value={editora.telefone}
                    style={styles.textBox}
                />

                <TextInput 
                    textContentType='emailAddress' 
                    onChangeText={ (text) => {handleChange(text, "email")} } 
                    placeholder='Email@Host.com'
                    value={editora.email}
                    style={styles.textBox}
                />
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={validation}
                        style={{ ...styles.button, marginVertical: 0 }}>
                        <Text style={styles.buttonText}>Atualizar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={closeModal}
                        style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </Modal>
    );
    
}



export default EditarEditora;

const styles = StyleSheet.create({
    container: {
        padding: 15
    },
    title: {
        fontWeight: "bold",
        fontSize: 20,
        marginBottom: 20
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
        alignItems: "center"
    },
    button: {
        borderRadius: 5,
        marginVertical: 20,
        alignSelf: 'flex-start',
        backgroundColor: "gray",
    },
    buttonText: {
        color: "white",
        paddingVertical: 6,
        paddingHorizontal: 10,
        fontSize: 16
    },
    message: {
        color: "tomato",
        fontSize: 17
    }
})