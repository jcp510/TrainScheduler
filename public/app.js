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
    var firstTrainTime = moment($("#first-train-time-input").val().trim(), "HH:mm").format("LLL");
    var trainFreq = $("#frequency-input").val().trim();
    
    // Next arrival = 
    // (min now - min 1st arrival) -> (% modulus that number by 15 min interval) -> (15 min interval - modulus)
    var currentTime = moment();
    
    // Difference between now and arrival time of first train.
    var diffInTime = moment().diff(moment(firstTrainTime), "minutes");
    
    // Calculate Minutes Away.
    // Remainder of diffInTime / trainFreq, to find minutes away.
    var tRemainder = diffInTime % trainFreq;
    
    // Is outputting static minutes, no seconds.
    // trainFreq - tRemainder needs to be an ISO string
    var minutesAway = trainFreq - tRemainder;

    // Calculate Next Arrival.  Should be every 15 min from first train arrival.
    // Should be current time + minutes away.
    // Is outputting current time.
    var nextArrival = moment().add(minutesAway, "minutes");

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
    console.log("name: " + newTrain.name);
    console.log("destination: " + newTrain.destination);
    console.log("first train time: " + newTrain.start);
    console.log("frequency in minutes: " + newTrain.frequency);

    alert("Train successfully added");

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(moment(nextArrival).format("LT")),
      $("<td>").text(moment(minutesAway).format("mm:ss"))
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);

    // Clear all input boxes.
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
  });


});