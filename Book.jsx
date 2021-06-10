import axios from "axios";

var instance = axios.create({
    baseURL: 'https://60bb119b42e1d000176203fd.mockapi.io/',
    timeout: 4000,
    headers: {'Content-type': 'application/json'}
  });

export default class Book {

    id;
    title;
    sinopsis;
    author;
    comments;
    coverImageData;
    genre;
    price;

    constructor(title, sinopsis, author, genre, price, coverImageData=null, comments=[], id=1) {
        this.title=title;
        this.id=id;
        this.sinopsis=sinopsis;
        this.author=author;
        this.genre=genre;
        this.price=price;
        this.coverImageData=coverImageData;
        this.comments=comments;
    }
    static Copy(book) {
        return new Book(book.title, book.sinopsis, book.author, book.genre, book.price, book.coverImageData,  book.comments, book.id);
    }

    Create = async () => {
        var {status}=await instance.post("Book", 
        {
            id:this.id,
            title:this.title,
            sinopsis:this.sinopsis,
            author:this.author,
            genre:this.genre,
            price:this.price,
            coverImageData:this.coverImageData,
            comments:this.comments
        });
        if(status>=200 && status <=299) return true;
        return false;
    }
    Delete = async () => {
        var {status}=await instance.delete("Book/"+this.id);
        if(status>=200 && status <=299) return true;
        return false;
    }
    Update = async () => {
        var {status}=await instance.put("Book/"+this.id, 
        {
            id:this.id,
            title:this.title,
            sinopsis:this.sinopsis,
            author:this.author,
            genre:this.genre,
            price:this.price,
            coverImageData:this.coverImageData,
            comments:this.comments
        });
        if(status>=200 && status <=299) return true;
        return false;
    }
    static async GetByID(id) {
        var {data}=await instance.get("Book?id="+id);
        if(data.length>0) return data[0];
        return null;
    }
    static async GetBooks() {
        var {data}=await instance.get("Book");
        return data;
    }
}