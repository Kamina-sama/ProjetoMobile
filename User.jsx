import axios from "axios";

var instance = axios.create({
    baseURL: 'https://60bb119b42e1d000176203fd.mockapi.io/',
    timeout: 4000,
    headers: {'Content-type': 'application/json'}
  });

export default class User {

    createdAt;
    id;
    name;
    password;
    email;
    profileImageData;

    constructor(name, password, email, profileImageData=null, createdAt=new Date(), id=1) {
        this.createdAt=createdAt;
        this.id=id;
        this.email=email;
        this.name=name;
        this.password=password;
        this.profileImageData=profileImageData;
    }
    static Copy(user) {
        return new User(user.name, user.password, user.email, user.profileImageData, user.createdAt, user.id);
    }

    Create = async () => {
        var {status}=await instance.post("User", 
        {
            id:this.id,
            createdAt:this.createdAt,
            name:this.name,
            password:this.password,
            profileImageData:this.profileImageData,
            email:this.email
        });
        if(status>=200 && status <=299) return true;
        return false;
    }
    Delete = async () => {
        //console.log("We arrived at User's Delete!");
        var {status}=await instance.delete("User/"+this.id);
        if(status>=200 && status <=299) return true;
        return false;
    }
    Update = async () => {
        var {status}=await instance.put("User/"+this.id, 
        {
            id:this.id,
            createdAt:this.createdAt,
            name:this.name,
            password:this.password,
            profileImageData:this.profileImageData,
            email:this.email
        });
        if(status>=200 && status <=299) return true;
        return false;
    }
    static async GetByID(id) {
        var {data}=await instance.get("User?id="+id);
        if(data.length>0) return data[0];
        return null;
    }
    static async GetUsers() {
        var {data}=await instance.get("User");
        return data;
    }
    static async GetByNameAndPass(name, password) {
        var {data}=await instance.get("User", 
        {
            params:
            {
                name:name,
                password:password
            }
        });
        data=data.filter((user)=>{
            return user.name===name && user.password===password;
        })
        if(data.length>0) return data[0];
        return null;
    }
    static async GetByEmailAndPass(email, password) {
        var {data}=await instance.get("User", 
        {
            params: 
            {
                email:email,
                password:password
            }
        });
        data=data.filter((user)=>{
            return user.email===email && user.password===password;
        })
        if(data.length>0) return data[0];
        return null;
    }
}