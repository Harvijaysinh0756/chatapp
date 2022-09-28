// firbase configration
var firebaseConfig = {
    apiKey: "AIzaSyDYQxoFMDV5gKie-E8zg_lz6CCXHcYOvcM",
    authDomain: "notion-it-chat.firebaseapp.com",
    projectId: "notion-it-chat",
    storageBucket: "notion-it-chat.appspot.com",
    messagingSenderId: "432618414673",
    appId: "1:432618414673:web:0ec827619226dae0f0ce70"
};

// Initialize Firebase
var firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

function login() {
    var fname = document.getElementById('firstname').value
    var lname = document.getElementById('lastname').value
    // console.log("name", fname, lname);

    firebase.firestore().collection("users")
        .add({
             Firstname : fname,
             Lastname : lname
        })
        .then((ref) => {
            console.log(ref.id)
            let name = fname + " "+ lname  
            localStorage.setItem('userdetail' ,JSON.stringify({
                name : name,
                id : ref.id
            }))
            console.log("",name);
            window.location.href='/chat.html'

        })
}

