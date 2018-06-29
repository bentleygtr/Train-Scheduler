$(document).ready(function () {




  //firebase linking

  var config = {
    apiKey: "AIzaSyDmIFt3F1UQmQ5x4zdJ06QE9qD2eimtCMs",
    authDomain: "train-app-a24af.firebaseapp.com",
    databaseURL: "https://train-app-a24af.firebaseio.com",
    projectId: "train-app-a24af",
    storageBucket: "train-app-a24af.appspot.com",
    messagingSenderId: "419254355608"
  };
  firebase.initializeApp(config);
  

  var database = firebase.database();

  $("#submit").on("click", function(event) {
      event.preventDefault();
      var name = $("#nameInput").val().trim();
      var dest = $("#destInput").val().trim();
      var time = $("#timeInput").val().trim();
      var freq = $("#freqInput").val().trim();

     database.ref().push({
         name: name,
         dest: dest,
         time: time,
         freq: freq,
         timeAdded: firebase.database.ServerValue.TIMESTAMP
     });
     $("input").val();
     return false;
  });

  database.ref().on("child_added", function(snapshot){
      var name = snapshot.val().name;
      var dest = snapshot.val().dest;
      var time = snapshot.val().time;
      var freq = snapshot.val().freq;

      console.log("Name: " + name);
      console.log("Destination: " + dest);
      console.log("Time " + time);
      console.log("Frequency: " + freq);


      var freq = parseInt(freq);
	//CURRENT TIME
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment().format('HH:mm'));
	//FIRST TIME: PUSHED BACK ONE YEAR TO COME BEFORE CURRENT TIME
	// var dConverted = moment(time,'hh:mm').subtract(1, 'years');
	var dConverted = moment(childSnapshot.val().time, 'HH:mm').subtract(1, 'years');
	console.log("DATE CONVERTED: " + dConverted);
	var trainTime = moment(dConverted).format('HH:mm');
	console.log("TRAIN TIME : " + trainTime);
	
	//DIFFERENCE B/T THE TIMES 
	var tConverted = moment(trainTime, 'HH:mm').subtract(1, 'years');
	var tDifference = moment().diff(moment(tConverted), 'minutes');
	console.log("DIFFERENCE IN TIME: " + tDifference);
	//REMAINDER 
	var tRemainder = tDifference % freq;
	console.log("TIME REMAINING: " + tRemainder);
	//MINUTES UNTIL NEXT TRAIN
	var minsAway = freq - tRemainder;
	console.log("MINUTES UNTIL NEXT TRAIN: " + minsAway);
	//NEXT TRAIN
	var nextTrain = moment().add(minsAway, 'minutes');
	console.log("ARRIVAL TIME: " + moment(nextTrain).format('HH:mm A'));
	

 //TABLE DATA=====================================================
 //APPEND TO DISPLAY IN TRAIN TABLE
$('#currentTime').text(currentTime);
$('#trainTable').append(
		"<tr><td id='nameDisplay'>" + childSnapshot.val().name +
		"</td><td id='destDisplay'>" + childSnapshot.val().dest +
		"</td><td id='freqDisplay'>" + childSnapshot.val().freq +
		"</td><td id='nextDisplay'>" + moment(nextTrain).format("HH:mm") +
		"</td><td id='awayDisplay'>" + minsAway  + ' minutes until arrival' + "</td></tr>");
 },

function(errorObject){
    console.log("Read failed: " + errorObject.code)
});

  })
