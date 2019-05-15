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

  var database = firebase.database();

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
    database.ref().push(newTrain);

    // Log to console.
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    // Clear all input boxes.
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-time-input").val("");
    $("#frequency-input").val("");
  });

  // Create Firebase event for adding train to database and new row to HTML
  // when new train is submitted.
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().start;
    var trainFreq = childSnapshot.val().frequency;

    // Log train info.
    console.log(trainName);
    console.log(trainDest);
    console.log(firstTrainTime);
    console.log(trainFreq);

    // Prettify train start
    var trainStartPretty = moment.unix(firstTrainTime).format("MM/DD/YYYY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(empStart, "X"), "months");
    console.log(empMonths);

    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),
      $("<td>").text(empMonths),
      $("<td>").text(empRate),
      $("<td>").text(empBilled)
    );

    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });

});