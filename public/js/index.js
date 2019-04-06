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

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
