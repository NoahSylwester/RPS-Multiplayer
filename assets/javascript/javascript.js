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
var playerOneWins = 0;
var playerTwoWins = 0;
var chatMessage = "";
var waitingEllipsis; // animates ellipsis when waiting for other player


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
      $('#player-designation').text('You are Player 1');
      playerId = 1;
      isPlayerOneConnected = true;
      database.ref().update({
        isPlayerOneConnected: isPlayerOneConnected
      })
    }
    else if (!isPlayerTwoConnected) {
      $('#player-designation').text('You are Player 2');
      playerId = 2;
      isPlayerTwoConnected = true;
      database.ref().update({
        isPlayerTwoConnected: isPlayerTwoConnected
      })
    }
    else {
      $('#player-designation').text('You are a spectator');
      playerId = 3;
    }
  }
// set disconnect protocols
if (playerId === 1) {
  presenceRef.onDisconnect().update({
    isPlayerOneConnected: false,
    playerOneChoice: "",
    playerOneWins: 0,
    playerTwoWins: 0
  });
}
if (playerId === 2) {
  presenceRef.onDisconnect().update({
    isPlayerTwoConnected: false,
    playerTwoChoice: "",
    playerOneWins: 0,
    playerTwoWins: 0
  });
}
  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

// On Click buttons
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

database.ref().on('value', function(snap) {
  if (snap.val().playerOneChoice === "" && snap.val().playerTwoChoice !== "") {
    $('.game-area').text("Waiting for player 1");
    clearInterval(waitingEllipsis);
    waitingEllipsis = setInterval(function() {
      $('.game-area').text($('.game-area').text() + ".");
      if ($('.game-area').text() === "Waiting for player 1....") {
        $('.game-area').text("Waiting for player 1");
      }
      }, 800);
    }
  else if (snap.val().playerOneChoice !== "" && snap.val().playerTwoChoice === "") {
    $('.game-area').text("Waiting for player 2");
    clearInterval(waitingEllipsis);
    waitingEllipsis = setInterval(function() {
      $('.game-area').text($('.game-area').text() + ".");
      if ($('.game-area').text() === "Waiting for player 2....") {
        $('.game-area').text("Waiting for player 2");
      }
      }, 800);
    }
  else if (snap.val().playerOneChoice !== "" && snap.val().playerTwoChoice !== "") {
    clearInterval(waitingEllipsis); // stop waiting text
    // compare choices
    switch (snap.val().playerOneChoice + snap.val().playerTwoChoice) {
      case "rockpaper":
        $('.game-area').html(`
        <img src="./assets/images/drawisland (3).png">
        <p class="result">Player 2 wins!</p>
        <img src="./assets/images/drawisland (1).png">
      `);
        break;
      case "rockscissors":
        $('.game-area').html(`
        <img src="./assets/images/drawisland (3).png">
        <p class="result">Player 1 wins!</p>
        <img src="./assets/images/drawisland (2).png">
      `);
        break;
      case "paperrock":
        $('.game-area').html(`
        <img src="./assets/images/drawisland (1).png">
        <p class="result">Player 1 wins!</p>
        <img src="./assets/images/drawisland (3).png">
      `);
        break;
      case "paperscissors":
        $('.game-area').html(`
        <img src="./assets/images/drawisland (1).png">
        <p class="result">Player 2 wins!</p>
        <img src="./assets/images/drawisland (2).png">
      `);
        break;
      case "scissorsrock":
        $('.game-area').html(`
        <img src="./assets/images/drawisland (2).png">
        <p class="result">Player 2 wins!</p>
        <img src="./assets/images/drawisland (3).png">
      `);
        break;
      case "scissorspaper":
        $('.game-area').html(`
        <img src="./assets/images/drawisland (2).png">
        <p class="result">Player 1 wins!</p>
        <img src="./assets/images/drawisland (1).png">
      `);
        break;
      case "rockrock":
        $('.game-area').html(`
        <img src="./assets/images/drawisland (3).png">
        <p class="result">It's a tie.</p>
        <img src="./assets/images/drawisland (3).png">
      `);
        break;
      case "paperpaper":
        $('.game-area').html(`
        <img src="./assets/images/drawisland (1).png">
        <p class="result">It's a tie.</p>
        <img src="./assets/images/drawisland (1).png">
      `);
        break;
      case "scissorsscissors":
        $('.game-area').html(`
        <img src="./assets/images/drawisland (2).png">
        <p class="result">It's a tie.</p>
        <img src="./assets/images/drawisland (2).png">
      `);
        break;
    }
  if ($('.result').text() === "Player 1 wins!") {
    playerOneWins += 1;
  }
  else if ($('.result').text() === "Player 2 wins!") {
    playerTwoWins += 1;
  }
  
    $('#scoreboard').html(`Player 1 wins: ${playerOneWins}<br />Player 2 wins: ${playerTwoWins}`)
    database.ref().update({
      playerOneChoice: "",
      playerTwoChoice: ""
    });
  };
});

$('#submit-button').on("click", function (event) {
  event.preventDefault();
  if ($('#message-input').val().trim() !== "") {
    chatMessage = $('#message-input').val().trim();
    if (playerId !== 3) {
      database.ref().update({
        chatMessage: `<div class="chat-message${playerId}">Player ${playerId}: ` + chatMessage + `</div>`,
      });
    }
    else {
      database.ref().update({
        chatMessage: `<div class="chat-message${playerId}">Spectator: ` + chatMessage + `</div>`,
      });
    }
  }
  $('#message-input').val("");
})

database.ref("chatMessage").on('value', function(snap) {
  if (playerId !== 0){
  $('.chat-area').prepend(snap.val());
  };
})

database.ref("isPlayerOneConnected").on("value", function(snap) {
  $('#scoreboard').html(`Player 1 wins: 0<br />Player 2 wins: 0`);
})

database.ref("isPlayerTwoConnected").on("value", function(snap) {
  $('#scoreboard').html(`Player 1 wins: 0<br />Player 2 wins: 0`);
})