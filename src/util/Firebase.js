import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export class Firebase {

    constructor(){

        this._config = {
            apiKey: "AIzaSyCyg9CHyMdDYkEM6uHTE0FCyn5JX6l7Bj4",
            authDomain: "whatsapp-clone-17472.firebaseapp.com",
            projectId: "whatsapp-clone-17472",
            storageBucket: "whatsapp-clone-17472.appspot.com",
            messagingSenderId: "870130922167",
            appId: "1:870130922167:web:876bfed66f802d2dca1332"      
        }
        
        console.log('chegou firebase')

        this.init();

    }

    init(){

        if(!window._initializedFirebase){

            this._firebase = initializeApp(this._config);           

            window._initializedFirebase = true;

        }     
        
    
    }

    static db(){
        return  this._firebase.firestore();
    }

    static hd(){
        return  this._firebase.storage();
    }

    initAuth(){
        return new Promise((s,f)=>{
            let provider = new GoogleAuthProvider();
            let auth = getAuth();    
            signInWithPopup(auth, provider)
            .then(result=>{

                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                s(user, token);

            })
            .catch(err=>{
                f(err)
            });
        })
    }

    
}