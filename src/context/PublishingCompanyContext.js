import React, {useState} from 'react';

const EditoraContext =  React.createContext([{}, ()=> {}])

const EditoraProvider = (props) => {
    const editoraIni = {
        "id": "",
        "nome": "",
        "cnpj": "",
        "endereco": "",
        "telefone":"",
        "email": ""
    }

    const [editora, setEditora] = useState(editoraIni);
    return (
        <EditoraContext.Provider value={[editora, setEditora]}>
            {props.children}
        </EditoraContext.Provider>
    )
}

export { EditoraContext, EditoraProvider }