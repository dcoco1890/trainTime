var firebaseConfig = {
  apiKey: "AIzaSyAdP3fqvk2gWk2htYIN9yQL13iYQWriReQ",
  authDomain: "traintime-62eea.firebaseapp.com",
  databaseURL: "https://traintime-62eea.firebaseio.com",
  projectId: "traintime-62eea",
  storageBucket: "traintime-62eea.appspot.com",
  messagingSenderId: "279212392121",
  appId: "1:279212392121:web:69c43097f551c2e2"
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
// var rootRef = firebase.database().ref();


let data = {
  trainName: name,
  destination: dest,
  frequent: freq,
  time: time,
}

function updateTable (value) {
  var n = value.trainName;
  var d = value.destination;
  var f = value.frequent;
  var t = value.time;

  // grabs the hour and the minutes from the time and passes them into the moment function
  var h = t.slice(0,2);  // grabs the first two numbers (08:35) == (08)
  var m = t.slice(-2);    // grabs the last two numbers (08:35) == (35)
  var mins = moment({ hour: h, minute: m });
  var tt = mins.fromNow();
  
  var mintonow = mins.diff(moment(), "minutes");
  console.log('mins.format("X") :', mins.format("X"));
  console.log('mintonow :', mintonow);
  console.log('tt :', tt);
  
 
  
  console.log('n,d,t,f :', n,d,t,f);
  if(n === undefined || n === "" || d === undefined || d === ""){
    // dont add to table if name or dest is blank
  }
  else{
    var x = $('<tr>');
    x.html(`<td>${n}</td> <td>${d}</td> <td>${f}</td> <td>@</td> <td>@</td>`);
    $('#start').append(x);
  }


}

function grab(e) {

  e.preventDefault();

  data.trainName = $('#name').val().trim();
  data.destination = $('#dest').val().trim();
  data.frequent = $('#freq').val().trim();
  data.time = $('#time').val().trim();

  // let 

  // needs code to prevent pushing inaccurate values
  database.ref().push(data);

}

database.ref().on("child_added", function(snap){
  var x = snap.val();
  updateTable(x);
  

}, function(error){
  console.log('error.code :', error.code);
});

$('#submit').on("click", grab);