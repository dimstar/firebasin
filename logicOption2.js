// Initialize Firebase (YOUR OWN APP)
var config = {
    apiKey: "AIzaSyA8Lr6SlKPYJXAsCHPGVDnUYTqCJXSzOWg",
    authDomain: "carbon-pride-193720.firebaseapp.com",
    databaseURL: "https://carbon-pride-193720.firebaseio.com",
    projectId: "carbon-pride-193720",
    storageBucket: "",
    messagingSenderId: "455517147886"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // Set Initial Counter
  var initialValue = 100;
  
  var clickCounter = initialValue;
  
  var users = [];
  
  var crud_counter = function(value){
    database.ref('counter/main' ).set({
      count: value
    });
    return value;
  }
  
  // --------------------------------------------------------------
  
  // At the initial load, get a snapshot of the current data.
  database.ref().on('value', function(snapshot){
    console.log(snapshot.val());
  
    userWrapper = snapshot.val();
    
    $(document.body).append("<br><br>");
  
    userWrapper.users.forEach(element => {
        var userLine = JSON.stringify(element);
        $(document.body).append(userLine);
    });
  },
  function(errorObj){
    console.log(errorObj);
  })
  
  // Print the initial data to the console.
  
  
  // Change the html to reflect the initial value.
  
  
  // Change the clickCounter to match the data in the database
  $("#click-button").on("click", function(event){
    
  
    // Log the value of the clickCounter
    console.log(clickCounter);
  
  // Change the HTML Value
    $("#click-value").text(clickCounter);
  
    // Reduce the clickCounter by 1
    clickCounter--
  
    // Alert User and reset the counter
    if( clickCounter === 0){
      alert("End of the line partner");
    }
  
  
    // Save new value to Firebase
    crud_counter(clickCounter);
  
    // Log the value of clickCounter
  
  
  });
  $("#click-value").text(clickCounter);
  
  // If any errors are experienced, log them to console.
  
  // --------------------------------------------------------------
  
  // Whenever a user clicks the click button
  $("#click-button").on("click", function() {
  
    // Reduce the clickCounter by 1
  
  
    // Alert User and reset the counter
  
    // Save new value to Firebase
  
  
    // Log the value of clickCounter
  
  
  });
  
  // Whenever a user clicks the restart button
  $("#restart-button").on("click", function() {
  
    // Set the clickCounter back to initialValue
    initialValue = 100;
  
  
    // Save new value to Firebase
    clickCounter = crud_counter(initialValue);
  
    // Log the value of clickCounter
    console.log(clickCounter)
  
    // Change the HTML Values
    $("#click-value").text(clickCounter);
  });
  