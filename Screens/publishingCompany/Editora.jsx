import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import EditoraStorage from './EditoraStuff';
import AddEditora from '../../Components/publishingCompany/CreateEditora';
import DeleteEditora from '../../Components/publishingCompany/DeleteEditora';
import EditarEditora from '../../Components/publishingCompany/EditarEditora';
import EditoraService from './EditoraService';
import { ActivityIndicator } from 'react-native';

const editoraStorage = new EditoraStorage();
const editoraService = new EditoraService();

const Editora = (props) => {
    const [editora, setEditora]=useState([]);
    const [isAddEditoraModalOpen, setIsAddEditoraModalOpen] = useState(false);
    const [isDeleteEditoraModalOpen, setIsDeleteEditoraModalOpen] = useState(false);
    const [isEditarEditoraModalOpen, setIsEditarEditoraModalOpen] = useState(false);
    const [selectedEditora, setSelectedEditora] = useState(false);
    const [isLoading, setLoading] = useState(true);

    const addEditora = (data) => {
      //const resultado= editoraStorage.storeData(JSON.stringify(data), data.cnpj);
      const resultado = editoraService.Create(data);
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
      //const resultado = editoraStorage.storeData(JSON.stringify(data), data.cnpj);
      const resultado = editoraService.Update(data.id, data);
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
  
    const deleteEditora = id => {
      var resultado = editoraService.Delete(id);
      if(resultado){
        setEditora(editora.filter(edit => edit.id !== id));
        Alert.alert("Sucesso","Editora removida com sucesso.");
      }
    }

    const loading = () => (
      <View style={styles.loading}>
        <ActivityIndicator size='large' color="#0000ff" />
      </View>
    )

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
      setLoading(true);
      editoraService.GetEditoras().then(value =>{
        setEditora(value);
        setLoading(false);
      }, (err)=> {
        console.log(err);
        setLoading(false);
        Alert.alert('Erro','Houve um erro verifique com administrador do sistema.');
      });
        /*editoraStorage.getAllKeys()
            .then(keys => {
                editoraStorage.multiGet(keys)
                    .then(data => {
                        setEditora(data);
                        Alert.alert("Editora",JSON.stringify(data));
                        for (let i = 0; i < data.length; i++) {
                          rows.push(data[i]);
                        }
                    });
            });*/
    },[JSON.stringify(editora)]);

    return (
      <ScrollView style={styles.scllview}>
        {isLoading && loading()}
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
            {!isLoading &&editora.map( (data, index) =>
              <View style={styles.editoraListContainer} key={index}>
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
    width: '100%',
  },
  scllview:{
    marginTop:"10%"
  },
  loading:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999999
  }
});

export default Editora;