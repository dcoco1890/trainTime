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

function updateTable(value) {
  var n = value.trainName;
  var d = value.destination;
  var f = value.frequent;
  var t = value.time;


  var start = moment(t, "HH:mm").subtract(1, "years");
  console.log('start :', start);
  
  var diffTime = moment().diff(moment(start), "minutes");

  // calculating the remainder and minutes till arrival
  let rem = diffTime % f;
  let minsT = f - rem;

  console.log('minsT :', minsT);

  var next = moment().add(minsT, "minutes");

  if (n === undefined || n === "" || d === undefined || d === "") {
    // dont add to table if name or dest is blank
  }
  else {
    var x = $('<tr>');
    x.html(`<td>${n}</td> <td>${d}</td> <td>${f}</td> <td>${moment(next).format("hh:mm")}</td> <td>${minsT}</td>`);
    $('#start').append(x);
  }
}




database.ref().on("child_added", function (snap) {
  var x = snap.val();
  updateTable(x);
}, function (error) {
  console.log('error.code :', error.code);
});


$('#submit').on("click", grab);


function grab(e) {

  e.preventDefault();
  data.trainName = $('#name').val().trim();
  data.destination = $('#dest').val().trim();
  data.frequent = $('#freq').val().trim();
  data.time = $('#time').val().trim();

  database.ref().push(data);

}