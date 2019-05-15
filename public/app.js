$(document).ready(function() {

  // Initialize Firebase.
  var config = {
    apiKey: "AIzaSyACBhEF9b-ulQqr5E3MrGOnY3iNu1pSkJQ",
    authDomain: "farley-foo.firebaseapp.com",
    databaseURL: "https://farley-foo.firebaseio.com",
    projectId: "farley-foo",
    storageBucket: "farley-foo.appspot.com",
    messagingSenderId: "808010250885",
    appId: "1:808010250885:web:9dc25da2104964fc"
  };
  firebase.initializeApp(config);

  var database = firebase.firestore();

  // Button for adding trains.
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    // Capture user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var firstTrainTime = moment($("#first-train-time-input").val().trim(), "MM/DD/YYYY").format("X");
    var trainFreq = $("#frequency-input").val().trim();

    // Create object for holding train data.
    var newTrain = {
      name: trainName,
      destination: trainDest,
      start: firstTrainTime,
      frequency: trainFreq
    };

    // Upload train data to database.
    database.collection('trains').add(newTrain);

    // Log to console.
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      // $("<td>").text(nextArrival),
      // $("<td>").text(minAway)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);

    // Clear all input boxes.
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
  });

    // Calculate Next Arrival.

    // Calculate Minutes Away.
});