// Get references to page elements
var $userName = $("#userName");
var $subject = $("#subject");
var $userPost = $("#userPost");
var $submitBtn = $("#submit");

var API = {
  createPost: function(post) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/posts",
      data: JSON.stringify(post)
    });
  },
  getPosts: function() {
    return $.ajax({
      url: "api/posts",
      type: "GET"
    });
  }
  // deleteExample: function(id) {
  //   return $.ajax({
  //     url: "api/examples/" + id,
  //     type: "DELETE"
  //   });
  // }
};

/* ==============REVIEW THIS CODE/ DELETE IF NOT NEEDED ==================
refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};
 ================================================================== */

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  //grab user's input value & store it in a variable in an object format
  var post = {
    name: $userName.val().trim(),
    subject: $subject.val().trim(),
    post: $userPost.val().trim(),
    latitude: userLocation.userLatitude,
    longitude: userLocation.userLongitude
  };

  if (!(post.name && post.subject && post.post)) {
    alert("You must enter your name, subject and post!");
    return;
  }
  API.getPosts(post).then(function(response) {
    console.log("API.getPost(line 101): " + response);
    // Reload the page to get the updated list
    location.reload();
  });

  API.createPost(post).then(function() {
    // refreshExamples();
    console.log(post);
  });
  //clear input fields
  $userName.val("");
  $subject.val("");
  $userPost.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     // refreshExamples();
//   });
// };

// ==================== GOOGLE MAPS API ==============
var userLocation = {};
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    console.log(userLocation);
  } else {
    console.log("Your browser does not support Geolocation");
  }
}
//this is the call back function from line 131 that will be called
//if we are able to successfully get the current location
//this callback function takes in a parameter which is a position object
function showPosition(position) {
  //position object has two properties:timestamp & coordinates
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  userLocation.userLatitude = latitude;
  userLocation.userLongitude = longitude;

  if (userLocation.userLatitude === latitude) {
    googleApiCall();
  }
}
getLocation();
function googleApiCall() {
  console.log("making api call");
  var url =
    "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
  var apiKey = "AIzaSyCUM6ziq10bpobC1rqrO3O9LGJwgzUTJEA";
  var combinedLocation =
    userLocation.userLatitude + "," + userLocation.userLongitude;

  console.log("Returned Lat and Long is " + combinedLocation);
  $.ajax(url, {
    data: {
      key: apiKey,
      location: combinedLocation,
      radius: 10000
      // 'keyword': userSelection.subCategorySelection,
      // 'name': userSelection.typeSelection,
      // 'opennow': true,
      // 'rankby': 'distance',
    }
  }).then(function(response) {
    console.log("API call received");
    console.log(JSON.parse(JSON.stringify(response)));
    googleMap();
  });
}

function googleMap() {
  var map;

  //starting directions services
  var postArray = [];

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: userLocation.userLatitude, lng: userLocation.userLongitude },
    zoom: 18
  });

  var postDisplay = new google.maps.InfoWindow();

  //    updates the content of the map
  infoWindow = new google.maps.InfoWindow();

  // var result = post: [];
  var apiResults = [];
  API.getPosts().then(function(response) {
    console.log(response);
    response.forEach(function(post) {
      console.log("in loop");
      var pst = {
        name: post.name,
        subject: post.subject,
        text: post.post,
        latitude: post.latitude,
        longitude: post.longitude
      };
      apiResults.push(pst);
    });

    console.log("RESULT:::", apiResults);
    showSteps(apiResults, postArray, postDisplay, map);
  });

  // structure of the db
  // var result = {
  //   post: [
  //     {
  //       body: {
  //         title: "the master",
  //         text: "my name is alex"
  //       },
  //       latitude: 30.38727219999997,
  //       longitude: -97.726508
  //     },
  //     {
  //       body: {
  //         title: "the master",
  //         text: "my name is alex"
  //       },
  //       latitude: 30.267153,
  //       longitude: -97.743057
  //     },
  //     {
  //       body: {
  //         title: "the master",
  //         text: "my name is alex"
  //       },
  //       latitude: 30.387272199999995,
  //       longitude: -95.726508
  //     },
  //     {
  //       body: {
  //         title: "the master",
  //         text: "my name is alex"
  //       },
  //       latitude: 30.387272199999994,
  //       longitude: -94.726508
  //     },
  //     {
  //       body: {
  //         title: "the master",
  //         text: "my name is alex"
  //       },
  //       latitude: 30.387272199999993,
  //       longitude: -97.726508
  //     }
  //   ]
  // };

  // showSteps(apiResults, postArray, postDisplay, map);
  console.log("apiResults lenth", apiResults.length);
  function showSteps(result, postArray, postDisplay, map) {
    console.log("Map result", result);
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.

    // this will be the template fo google maps API to render the table parameters
    // console.log(result);

    // console.log(listPost[0].body);
    console.log("length", result.length);
    console.log("BEFORE LOOP ");
    for (var i = 0; i < result.length; i++) {
      console.log("MAP LOOP " + i);
      myLatlng = new google.maps.LatLng(
        result[i].latitude,
        result[i].longitude
      );
      var post = (postArray[i] = postArray[i] || new google.maps.Marker());
      post.setMap(map);
      console.log("hey");
      console.log(myLatlng);
      post.setPosition(myLatlng);
      attachInstructionText(
        postDisplay,
        post,
        result[i].name,
        result[i].subject,
        result[i].text,
        map
      );
      //   body meant to be the post object that includes the name and the text
    }
  }

  function attachInstructionText(postDisplay, post, name, subject, text, map) {
    console.log("hello");

    google.maps.event.addListener(post, "click", function() {
      // Open an info window when the marker is clicked on, containing the text
      // of the step.
      postDisplay.setContent(
        //html to be inserted in the marker's pop-up box
        "<h3>" +
          name +
          "</h3>" +
          "<br>" +
          "<p>" +
          subject +
          "</p>" +
          "<br>" +
          "<p>" +
          text +
          "</p>"
      );
      postDisplay.open(map, post);
    });
  }
}

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
