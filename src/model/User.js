import { Firebase } from "../util/Firebase";
import { getDoc, getAll, setDoc, doc, collection, onSnapshot, getDocs } from "firebase/firestore";
import { Model } from "./Model";

export class User extends Model {

    constructor(id) {
        super();

        if(id) this.getById(id);
    }

    get name() { return this._data.name; }
    set name(value) { this._data.name = value; }

    get email() { return this._data.email; }
    set email(value) { this._data.email = value; }

    get photo() { return this._data.photo; }
    set photo(value) { this._data.photo = value; }

    get chatId() { return this._data.chatId; }
    set chatId(value) { this._data.chatId = value; }

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

    static getContactsRef(id){
        return collection(
            doc(User.getRef(), id),'contacts');
    }

    static findByEmail(email){

        return doc(this.getRef(), email);
    }

    addContact(contact){
        return setDoc(
            doc(
                User.getContactsRef(this.email), 
                    btoa(contact.email)), 
                    contact.toJSON()); 

        
    }

    getContacts(){
        return new Promise((s,f)=>{

            onSnapshot(User.getContactsRef(this.email), data => {
                let contacts = [];
                
                data.forEach(doc =>{

                    let data = doc.data();

                    data.id = doc.id;

                    contacts.push(data);   
                    
                });

                this.trigger('contactschange', contacts);
                s(data);
            });
            
        })
    }
}