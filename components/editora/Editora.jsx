import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import EditoraStorage from './EditoraStuff';
import AddEditora from './CreateEditora'
import DeleteEditora from './DeleteEditora'
import EditarEditora from './EditarEditora'

const editoraStorage = new EditoraStorage();

const Editora = (props) => {
    const [editora, setEditora]=useState([]);
    const [isAddEditoraModalOpen, setIsAddEditoraModalOpen] = useState(false);
    const [isDeleteEditoraModalOpen, setIsDeleteEditoraModalOpen] = useState(false);
    const [isEditarEditoraModalOpen, setIsEditarEditoraModalOpen] = useState(false);
    const [selectedEditora, setSelectedEditora] = useState(false);

    const addEditora = (data) => {
      const resultado= editoraStorage.storeData(JSON.stringify(data), data.cnpj);
      if(resultado){
          Alert.alert("Sucesso","Editora cadastrada com sucesso");
          /*editoraStorage.getData(editora.cnpj).then(result => {
              Alert.alert("Dados cadastrados", JSON.stringify(result));
          });*/
          setEditora([data, ...editora]);
      }else{
          Alert.alert("Erro", "Houve erro ao cadastrar a editora.\n\n\n"+resultado);
      }
    }

    const updateEditora = (data) => {
      const resultado = editoraStorage.storeData(JSON.stringify(data), data.cnpj)
        if(resultado){
          Alert.alert("Sucesso","Editora atualizada com sucesso");
          /*editoraStorage.getData(editora.cnpj).then(result => {
              Alert.alert("Dados cadastrados", JSON.stringify(result));
          });*/
          setEditora(editora.map(edit => edit.cnpj == data.cnpj ? data : edit) );
      }else{
          Alert.alert("Erro", "Houve erro ao atualizar a editora.\n\n\n"+resultado);
      }
    
    }
  
    const deleteEditora = cnpj => {
      editoraStorage.removeItem(cnpj);
      setEditora(editora.filter(edit => edit.cnpj !== cnpj));
    }


    const toggleAddEditora = () => {
      setIsAddEditoraModalOpen(!isAddEditoraModalOpen)
    }

    const toggleDeleteEditoraModal = () => {
      setIsDeleteEditoraModalOpen(!isDeleteEditoraModalOpen)
    }
  
    const toggleEditarEditoraModal = () => {
      setIsEditarEditoraModalOpen(!isEditarEditoraModalOpen)
    }

    useEffect(() => {
        editoraStorage.getAllKeys()
            .then(keys => {
                editoraStorage.multiGet(keys)
                    .then(data => {
                        setEditora(data);
                        Alert.alert("Editora",JSON.stringify(data));
                        for (let i = 0; i < data.length; i++) {
                          rows.push(data[i]);
                        }
                    });
            });
    },[]);

    return (
      <ScrollView>
        <View style={styles.container}>
            <View >
                <Text style={styles.title}>Lista de editoras:</Text>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                      onPress={ toggleAddEditora }
                      style={styles.button}
                  >
                      <Text style={styles.buttonText}>Nova Editora</Text>
                  </TouchableOpacity>
                </View>
            </View>
            {editora.map( (data, index) =>
              <View style={styles.EditoraListContainer}>
                <Text style={styles.name}>{data.nome}</Text>
                <Text style={styles.listItem}>Endereço: {data.endereco}</Text>
                <Text style={styles.listItem}>Telefone: {data.telefone}</Text>
                <Text style={styles.listItem}>Email: {data.email}</Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      toggleEditarEditoraModal();
                      setSelectedEditora(data)
                    }}
                    style={{ ...styles.button, marginVertical: 0 }}>
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      toggleDeleteEditoraModal();
                      setSelectedEditora(data)
                    }}
                    style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}



          {isAddEditoraModalOpen ? <AddEditora
            isOpen = { isAddEditoraModalOpen }
            closeModal = { toggleAddEditora }
            addEditora = { addEditora }
          /> : null}

          {isEditarEditoraModalOpen ? <EditarEditora
            isOpen={isEditarEditoraModalOpen}
            closeModal={toggleEditarEditoraModal}
            selectedEditora={selectedEditora}
            updateEditora={updateEditora}
          /> : null}

          {isDeleteEditoraModalOpen ? <DeleteEditora
            isOpen={isDeleteEditoraModalOpen}
            closeModal={toggleDeleteEditoraModal}
            selectedEditora={selectedEditora}
            deleteEditora={deleteEditora}
          /> : null}

        </View>
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%'
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
  title:{
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20
  },
  name: {
    fontWeight: "bold",
    fontSize: 16
  },
  listItem: {
    fontSize: 16
  },
  editoraListContainer: {
    marginBottom: 25,
    elevation: 4,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 6,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    width: '100%'
  },
});

export default Editora;