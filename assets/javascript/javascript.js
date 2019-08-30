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

var isPlayerOneConnected = false;
var isPlayerTwoConnected = false;
var playerOneChoice = "";
var playerTwoChoice = "";

var database = firebase.database();
var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function(snap) {
  if (snap.val() === true) {
    alert("connected");
  } else {
    alert("not connected");
  }
});




// On Click
$("#click-button").on("click", function() {

  // Add 1 to clickCounter
  clickCounter++;

  // **** Store Click Data to Firebase in a JSON property called clickCount *****
  // **** Note how we are using the Firebase .set() method ****
  // **** .ref() refers to the path you want to save your data to
  // **** Since we left .ref() blank, it will save to the root directory
  database.ref().set({
    clickCount: clickCounter,
    codeQuality: "super-excellent-wonderful"
  });
});

database.ref().on("value", function(snapshot) {

  // Log everything that's coming out of snapshot
  console.log(snapshot.val());
  console.log(snapshot.val().name);
  console.log(snapshot.val().email);
  console.log(snapshot.val().age);
  console.log(snapshot.val().comment);

  // Change the HTML to reflect
  $("#name-display").text(snapshot.val().name);
  $("#email-display").text(snapshot.val().email);
  $("#age-display").text(snapshot.val().age);
  $("#comment-display").text(snapshot.val().comment);

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});