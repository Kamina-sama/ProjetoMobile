import axios from "axios";

var instance = axios.create({
    baseURL: 'https://60c3a1b12df2cb00178aba54.mockapi.io/api/v1/',
    timeout: 4000,
    headers: {'Content-type': 'application/json'}
  });

export default class EditoraService {

    id;
    nome;
    endereco;
    telefone;
    email;

    setData(nome,cnpj,endereco,telefone,email) {
        this.nome = nome;
        this.id = cnpj;
        this.endereco = endereco;
        this.telefone = telefone;
        this.email = email;
    }
    static Copy(editoraService) {
        return new EditoraService(
            editoraService.nome,
            editoraService.cnpj,
            editoraService.endereco,
            editoraService.telefone,
            editoraService.email
        );
    }

    Create = async () => {
        var {status}=await instance.post("editora", 
        {
            id:this.id,
            nome:this.nome,
            endereco:this.endereco,
            telefone:this.telefone,
            email:this.email,
        });
        if(status>=200 && status <=299) return true;
        return false;
    }
    Delete = async () => {
        var {status}=await instance.delete("editora/"+this.id);
        if(status>=200 && status <=299) return true;
        return false;
    }
    Update = async () => {
        var {status}=await instance.put("editora/"+this.id, 
        {
            id:this.id,
            nome:this.nome,
            endereco:this.endereco,
            telefone:this.telefone,
            email:this.email,
        });
        if(status>=200 && status <=299) return true;
        return false;
    }
    static async GetByID(id) {
        var {data}=await instance.get("editora?id="+id);
        if(data.length>0) return data[0];
        return null;
    }
    static async GetEditoras() {
        var {data}=await instance.get("editora");
        return data;
    }
}