import { Firebase } from "../util/Firebase";
import { getDoc, getDocs, collection, where, query, doc, addDoc} from "firebase/firestore";
import { Model } from "./Model";

export class Chat extends Model{

    constructor(){
        super();
    }

    get users() { this._data.users;}
    set users(value) { this._data.users = value;}

    get timeStamp() { this._data.timeStamp;}
    set timeStamp(value) { this._data.timeStamp = value;}

    static getRef(){
        return collection(Firebase.db(),'/chats');
    }

    static create(meEmail, contactEmail){

        return new Promise((s,f) => {

            let users = {};

            users[btoa(meEmail)] = true;
            users[btoa(contactEmail)] = true;
            
            addDoc(Chat.getRef(),{
                users,
                timeStamp: new Date()
            })
            .then(document => {

                getDoc( doc(Chat.getRef(), document.id) ).then(chat => {

                    s(chat);

                }).catch(err=>{
                    f(err);
                });

            }).catch(err=>{
                f(err);
            });
            
        });

    }

    static find(meEmail, contactEmail){

        return getDocs(query(this.getRef(), 
            where(btoa(meEmail),'==',true),
            where(btoa(contactEmail),'==',true)));

    }

    static createIfNotExists(meEmail, contactEmail){

        return new Promise((s,f) => {

            Chat.find(meEmail, contactEmail).then(chats => {

                console.log(chats);
                if (chats.empty){

                    Chat.create(meEmail,contactEmail).then(chat=>{

                        s(chat);

                    })

                }else {

                    chats.forEach(chat => {
                        s(chat);
                    });

                }
            }).catch(err=>{
                f(err);
            });
        })
    }
}