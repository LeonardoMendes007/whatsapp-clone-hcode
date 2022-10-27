import { Firebase } from "../util/Firebase";
import { getDoc, setDoc, doc, collection, onSnapshot } from "firebase/firestore";
import { Model } from "./Model";

export class User extends Model {

    constructor(id) {
        super();

        if(id) this.getById(id);
    }

    get name(){ return this._data.name;}
    set name(value){ return this._data.name = value;}

    get email(){ return this._data.email;}
    set email(value){ return this._data.email = value;}

    get photo(){ return this._data.photo;}
    set photo(value){ return this._data.photo = value;}

    getById(id){

        return new Promise((s,f)=>{

            onSnapshot(User.findByEmail(id),doc => {
              
                this.fromJSON(doc.data());
            
            });

        });
    }

    save(){
        return setDoc(User.findByEmail(this.email),this.toJSON());
    }
    

    static getRef(){

        return collection(Firebase.db(),'/users');

    }

    static findByEmail(email){

        return doc(this.getRef(), email);
    }

    addContact(contact){
        return setDoc(
            doc(
                collection(
                    doc(User.getRef(), this.email),'contacts'), 
                    btoa(contact.email)), 
                    contact.toJSON()); 

        
    }
}