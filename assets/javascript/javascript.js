// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCyRdnTBWciurlZKeh00AeqDzyLhxW3MLQ",
  authDomain: "multiplayer-rps-dbf7f.firebaseapp.com",
  databaseURL: "https://multiplayer-rps-dbf7f.firebaseio.com",
  projectId: "multiplayer-rps-dbf7f",
  storageBucket: "multiplayer-rps-dbf7f.appspot.com",
  messagingSenderId: "481817965714",
  appId: "1:481817965714:web:5cdc0ad35e70c912"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// var connectedRef = firebase.database().ref(".info/connected");
// connectedRef.on("value", function(snap) {
//   if (snap.val() === true) {
//     alert("connected");
//   } else {
//     alert("not connected");
//   }
// });