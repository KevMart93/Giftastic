// Creating the initial array of entertainment options
var entertainment = ['Breaking Bad', 'Ozark', 'The Big Lebowski', 'Star Wars', 'Superbad', 'Anchorman'];

// Begin the function for displaying the Gifs
function displayGif() {

// Empty the target div 
$("#mediaView").empty();

// create variables to store the value of the button click and to assign the api url
    var gif = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=MA98X9RqsuovmtVj3HlFT4HiPZtP5ehD&limit=10";

// call AJAX to query the giphy api and run the following function when data is returned
$.ajax({
    url: queryURL,
    method: "GET"
}).done(function (response) {

    // create a results variable and store results of query to it
    var results = response.data;

    // create a for loop to create gifs
    for (var i = 0; i < results.length; i++) {

        // create an empty gif div variable
        var gifDiv = $("<div class='gifDiv'>");

        // create a variable for storing the rating
        var rating = results[i].rating;

        // Create a <p> tag to display rating text
        var p = $("<p>").text("Rating: " + rating);

        // variable to show/store all of the image properties
        var image = $("<img>");

        image.attr("src", results[i].images.fixed_height_still.url);
        image.attr("data-still", results[i].images.fixed_height_still.url);
        image.attr("data-animate", results[i].images.fixed_height.url);
        image.attr("data-state", "still");
        image.attr("class", "gif");

        // add the image with its rating and meta data to the individual gif div so its ready to be added to the 10 gif div that will be added all at once
        gifDiv.prepend(p);
        gifDiv.prepend(image);

        // add the individual gif divs to the main div so all 10 display at once when prompted
        $("#mediaView").prepend(gifDiv);
        };
    });
};


// create a function to animate the gifs when clicked and to stop them when clicked again
function changeGif() {
    
    //  create a variable for tracking the state of the gif
    var state = $(this).attr('data-state');

    // if the gif is paused, this function will run to animate it
    if (state === "still") {

        // apply the animation properties if true
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "animate")
    
    } else {

        // apply static properties if the above is false
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still")
    
    };
};

// create a function to create new buttons for each media item that I put in the array 
function createButton() {

    // clear out previous buttons before adding new buttons 
    $("#buttonsView").empty();

    // for loop to run through intial array that I created
    for (var i = 0; i < entertainment.length; i++) {

        // now it is time to create dynamic buttons for each entry in the array

        // create a variable for designing our dynamic buttons
        var butt = $("<button>");
        // adding classes to the buttons
        butt.addClass("btn btn-dark mediaButton");
        // add data attribute
        butt.attr("data-name", entertainment[i]);
        // add the text to be displayed on the button
        butt.text(entertainment[i]);
        // add the entire button to the div for buttons
        $("#buttonsView").append(a);
    };
};

// new function to add new buttons based on the user's searches to the list of buttons already created
$("#addMedia").on("click", function (event) {
    event.preventDefault();

    // variable to grab the user input from the textbox
    var newEntry = $("#mediaInput").val().trim();

    // add this new variable to the media array
    entertainment.push(newEntry);

    // repopulate the media array
    createButton();

    $("#mediaInput").val('');
});

$(document).on("click", ".mediaButton", displayGif);
$(document).on("click", ".gif", changeGif);
createButton();




