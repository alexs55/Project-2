// Get references to page elements
var $userName = $("#userName");
var $subject = $("#subject");
var $userPost = $("#userPost");
var $submitBtn = $("#submit");
//we might not need line 7
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var post = {
  // subject: $("#subject").val().trim(),
  post: "I am waiting for true love and my bus.",
  latitude: 30.287648,
  longitude: -97.727912
};

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

API.getPosts(post).then(function(response) {
  console.log(response);
});

// refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  //grab user's input value & store it in a variable in an object format
  //change example to user
  var post = {
    name: $userName.val().trim(),
    subject: $subject.val().trim(),
    inputText: $userPost.val().trim()
  };

  if (!(example.name && example.subject && example.inputText)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.createPost(post).then(function() {
    refreshExamples();
  });
  //clear input fields
  $userName.val("");
  $subject.val("");
  $userPost.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

var userLocation = {};
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    console.log(userLocation);
  } else {
    console.log("Your browser does not support Geolocation");
  }
}
function showPosition(position) {
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

  //    starting directions services
  var postArray = [];

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: userLocation.userLatitude, lng: userLocation.userLongitude },
    zoom: 18
  });

  var postDisplay = new google.maps.InfoWindow();

  //    updates the content of the map
  infoWindow = new google.maps.InfoWindow();

  // structure of the db
  var result = {
    post: [
      {
        body: {
          title: "the master",
          text: "my name is alex"
        },
        latitude: 30.38727219999997,
        longitude: -97.726508
      },
      {
        body: {
          title: "the master",
          text: "my name is alex"
        },
        latitude: 30.267153,
        longitude: -97.743057
      },
      {
        body: {
          title: "the master",
          text: "my name is alex"
        },
        latitude: 30.387272199999995,
        longitude: -95.726508
      },
      {
        body: {
          title: "the master",
          text: "my name is alex"
        },
        latitude: 30.387272199999994,
        longitude: -94.726508
      },
      {
        body: {
          title: "the master",
          text: "my name is alex"
        },
        latitude: 30.387272199999993,
        longitude: -97.726508
      }
    ]
  };

  showSteps(result, postArray, postDisplay, map);
  function showSteps(result, postArray, postDisplay, map) {
    // For each step, place a marker, and add the text to the marker's infowindow.
    // Also attach the marker to an array so we can keep track of it and remove it
    // when calculating new routes.

    // this will be the template fo google maps API to render the table parameters
    var listPost = result.post;

    console.log(listPost[0].body);
    for (var i = 0; i < listPost.length; i++) {
      myLatlng = new google.maps.LatLng(
        listPost[i].latitude,
        listPost[i].longitude
      );
      var post = (postArray[i] = postArray[i] || new google.maps.Marker());
      post.setMap(map);
      console.log("hey");
      post.setPosition(myLatlng);
      attachInstructionText(
        postDisplay,
        post,
        listPost[i].body.title,
        listPost[i].body.text,
        map
      );
      //   body meant to be the post object that includes the name and the text
    }
  }

  function attachInstructionText(postDisplay, post, title, text, map) {
    console.log("hello");

    google.maps.event.addListener(post, "click", function() {
      // Open an info window when the marker is clicked on, containing the text
      // of the step.
      postDisplay.setContent(
        "<h1>" + title + "</h1>" + "<br>" + "<p>" + text + "</p>"
      );
      postDisplay.open(map, post);
    });
  }
}

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
