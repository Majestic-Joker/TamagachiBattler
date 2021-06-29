const firebaseConfig = {
    apiKey: "AIzaSyBYzZtcoU2vKqAPzGckbMZ-mjo9MA5dITc",
    authDomain: "tamagachibattler.firebaseapp.com",
    projectId: "tamagachibattler",
    storageBucket: "tamagachibattler.appspot.com",
    messagingSenderId: "1093945818343",
    appId: "1:1093945818343:web:8faf6f4c21f29dd0ef3642"
};

class FireManager {
    /**
    * FireManager is a SINGLETON; DO NOT USE CONSTRUCTOR!
    * (Use FireManager.get() instead)
    */
    constructor() {
        this.instance = null;
        // Initialize the firebase app
        this.app = firebase.initializeApp(firebaseConfig);
        // firebase.analytics();
    };

    static get() {
        if (this.instance == null) {
            this.instance = new FireManager();
        }
        return this.instance;
    }

    async signInWithGoogle() {
        // Provider is a connection to the given authentication service
        // (In this case, Google!)
        var provider = new firebase.auth.GoogleAuthProvider();
        try {
            // Try to sign in (with a popup, must not be blocked!)
            return await firebase.auth().signInWithPopup(provider);
        }
        catch (e) {
            throw (e);
        }
    }

    async signOut() {
        try {
            // Try to sign out
            await firebase.auth().signOut();
        }
        catch (e) {
            throw (e);
        }
    }

    user() {
        if (this.app){
            return this.app.auth().currentUser;
        }
            
        else
            return null;
    }
}