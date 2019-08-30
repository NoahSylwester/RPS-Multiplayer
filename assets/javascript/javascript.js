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
var playerId = 0;
var playerOneChoice = "";
var playerTwoChoice = "";
var chatMessage = "";


var database = firebase.database();
var connectedRef = firebase.database().ref(".info/connected");
var presenceRef = firebase.database().ref();


// initialize firebase variables locally, determine playerId
var startup = true;
database.ref().on("value", function(snapshot) {
  
  if (startup) {
    isPlayerOneConnected = snapshot.val().isPlayerOneConnected;
    isPlayerTwoConnected = snapshot.val().isPlayerTwoConnected;
    playerOneChoice = snapshot.val().playerOneChoice;
    playerTwoChoice = snapshot.val().playerTwoChoice;
    startup = false;
    if (!isPlayerOneConnected) {
      console.log('first');
      playerId = 1;
      isPlayerOneConnected = true;
      database.ref().update({
        isPlayerOneConnected: isPlayerOneConnected
      })
    }
    else if (!isPlayerTwoConnected) {
      console.log('second');
      playerId = 2;
      isPlayerTwoConnected = true;
      database.ref().update({
        isPlayerTwoConnected: isPlayerTwoConnected
      })
    }
    else {
      console.log('third');
      playerId = 3;
    }
  }
// set disconnect protocols
if (playerId === 1) {
  presenceRef.onDisconnect().update({
    isPlayerOneConnected: false,
    playerOneChoice: ""
  });
}
if (playerId === 2) {
  presenceRef.onDisconnect().update({
    isPlayerTwoConnected: false,
    playerTwoChoice: ""
  });
}
  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});



// On Click
$("#rock-button").on("click", function(event) {
  event.preventDefault();
  if (playerId === 1) {
    playerOneChoice = "rock";
    database.ref().update({
      playerOneChoice: playerOneChoice,
    });
  }
  else if (playerId === 2) {
    playerTwoChoice = "rock";
    database.ref().update({
      playerTwoChoice: playerTwoChoice,
    });
  }
});

$("#paper-button").on("click", function(event) {
  event.preventDefault();
  if (playerId === 1) {
    playerOneChoice = "paper";
    database.ref().update({
      playerOneChoice: playerOneChoice,
    });
  }
  else if (playerId === 2) {
    playerTwoChoice = "paper";
    database.ref().update({
      playerTwoChoice: playerTwoChoice,
    });
  }
});

$("#scissors-button").on("click", function(event) {
  event.preventDefault();
  if (playerId === 1) {
    playerOneChoice = "scissors";
    database.ref().update({
      playerOneChoice: playerOneChoice,
    });
  }
  else if (playerId === 2) {
    playerTwoChoice = "scissors";
    database.ref().update({
      playerTwoChoice: playerTwoChoice,
    });
  }
});

$('#submit-button').on("click", function (event) {
  event.preventDefault();
  chatMessage = $('#message-input').val().trim();
  database.ref().update({
    chatMessage: chatMessage,
  });
})

database.ref("chatMessage").on('value', function(snap) {
  $('.chat-area').prepend(`<div class="chat-message">Player ${playerId}: ${snap.val()}</div>`);
})