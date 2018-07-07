//INSERT FIRE BASE CONFIG
// Initialize Firebase
$(document).ready(function () {


    var config = {
        apiKey: "AIzaSyBGBDsBkDyZ5Z7UZ8bE_jDoLZXlB62lfWQ",
        authDomain: "train-1cad2.firebaseapp.com",
        databaseURL: "https://train-1cad2.firebaseio.com",
        projectId: "train-1cad2",
        storageBucket: "train-1cad2.appspot.com",
        messagingSenderId: "59702564129"
    };
    firebase.initializeApp(config);

    //..

    var database = firebase.database();

    var name = "";
    var destination = "";
    var firstTrain = "";
    var frequency = 0;

    var timeStart = $("#start-date").val();

    var minFormat = moment(timeStart, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var timeToArrival = moment().diff(moment(minFormat), "minutes");
    var timeRemaining = timeToArrival % frequency;
    var minAway = frequency - timeRemaining;

    var nextTrain = moment().add(minAway, "minutes");
    var nextTrainFromat = moment(nextTrain).format("hh:mm");


    $("#addTrain").on("click", function (event) {
        event.preventDefault();

        name = $("#name").val().trim();
        destination = $("#dest").val().trim();
        firstTrain = $("#firstTrain").val().trim();
        frequency = $("#frequency").val().trim();

        database.ref().push({
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dataAdded: firebase.database.ServerValue.TIMESTAMP

        });

    });

    database.ref().on("child_added", function (childSnapshot) {

        console.log("Name: " + childSnapshot.val().name);
        console.log("Destination: " + childSnapshot.val().destination);
        console.log("Time: " + childSnapshot.val().timeRemaining);
        console.log("Frequency: " + childSnapshot.val().frequency);
        console.log("Minutes Away: " + childSnapshot.val().firstTrain);

        $("#tbody").append("<tr><td><span class='train-name'</td></tr>" + childSnapshot.val().name +
            " <tr><td><span class='train-destination'</td></tr> " + childSnapshot.val().destination +
            "<tr><td><span class='train-original'</td></tr>" + childSnapshot.val().firstTrain +
            "<tr><td><span class='train-frequency'</td></tr>" + childSnapshot.val().frequency + "")
    });

});
