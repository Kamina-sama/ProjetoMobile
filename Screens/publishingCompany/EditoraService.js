import axios from "axios";

var instance = axios.create({
    baseURL: 'https://60c3a1b12df2cb00178aba54.mockapi.io/api/v1/',
    timeout: 4000,
    headers: {'Content-type': 'application/json'}
  });

export default class EditoraService {
    Create = async (data) => {
        var {status}=await instance.post("editora", data);
        if(status>=200 && status <=299) return true;
        return false;
    }
    Delete = async (id) => {
        var {status}=await instance.delete("editora/"+id);
        if(status>=200 && status <=299) return true;
        return false;
    }
    Update = async (id,data) => {
        var {status}=await instance.put("editora/"+id, data);
        if(status>=200 && status <=299) return true;
        return false;
    }
    GetByID = async(id) => {
        var {data}=await instance.get("editora/"+id);
        if(data.length>0) return data[0];
        return null;
    }
    GetEditoras = async() => {
        var {data}=await instance.get("editora");
        return data;
    }
}