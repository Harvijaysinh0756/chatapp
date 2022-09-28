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

var userdetails = JSON.parse(localStorage.getItem("userdetail"))
// console.log(userdetails.name);

function messageView() {
    db.collection("chat").orderBy("time").onSnapshot((testmessage) => {
        document.getElementById('messagebox').innerHTML = ''
        testmessage.forEach((element) => {

            var message = document.getElementById('messagebox')
            var timekk = element.data().time

            let seconds = Math.floor(timekk / 1000);
            let minutes = Math.floor(seconds / 60)+30;
            let hours = Math.floor(minutes / 60) +5 ;
            seconds = seconds % 60;
            minutes = minutes % 60;
            hours = hours % 24 ;
            var showtime = hours + " : " +minutes
            console.log(showtime)

            if (userdetails.name === element.data().userName) {
                var chat = document.createElement('div')
                chat.setAttribute('class', 'mydivchat')
                var messagetext = document.createElement('p')
                messagetext.textContent = element.data().message
                messagetext.setAttribute('class', 'messagestag')
                var username = document.createElement('p')  
                var smallusername = document.createElement('small')
                var spantime = document.createElement('span')
                spantime.setAttribute('class','settime')
                spantime.textContent = showtime
                smallusername.setAttribute('class', 'smalltext')
                smallusername.textContent = element.data().userName
                smallusername.append(spantime)
                username.append(smallusername)
                chat.append(username, messagetext)
                message.append(chat)
            }
            else {
                var chat = document.createElement('div')
                chat.setAttribute('class', 'divchat')
                var messagetext = document.createElement('p')
                messagetext.textContent = element.data().message
                // messagetext.setAttribute('class', 'messagestag')
                var username = document.createElement('p')
                var smallusername = document.createElement('small')
                var spantime = document.createElement('span')
                spantime.setAttribute('class','settime')
                spantime.textContent = showtime
                smallusername.textContent = element.data().userName
                smallusername.append(spantime)
                username.append(smallusername)
                chat.append(username, messagetext)
                message.append(chat)

            }
            message.scrollTop = message.scrollHeight;

            console.log(element.data())
        });
    })
}

function sendMessage() {

    var sendmessage = document.getElementById('Message').value

    firebase.firestore().collection("chat")
        .add({
            "userName": userdetails.name,
            "message": sendmessage,
            "time": Date.now()
        })
        .then((ref) => {

            messageView()
            document.getElementById('Message').value = ""
        })


    // console.log(sendmessage)
}
messageView()