require("dotenv").config();
var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var userInput = process.argv.slice(3).join("+");
var axios = require("axios");

if (command === "concert-this") {
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"

    // if (err) {
    //     return console.log("Error occurred: " + err);
    // }
    console.log(queryURL);
    axios.get(queryURL).then(
        function (response) {
            // console.log(response[0].lineup);
            // for-loop here to get through all the options
            console.log(response[0].venue.name);
            console.log(response[0].lineup[0]);
        }
    )
} else if (command === 'spotify-this-song') {

    if (userInput === ""){
        userInput = 'The Sign';
        spotify.search({ type: 'track', query: userInput, limit: 10 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var songInfo = data.tracks.items;
            console.log(songInfo);
            console.log("Artist(s): " + songInfo[0].artists[0].name);
            console.log("Song Name: " + songInfo[0].name);
            console.log("Preview Link: " + songInfo[0].preview_url);
            console.log("Album: " + songInfo[0].album.name);
        });
    } else {
        spotify.search({ type: 'track', query: userInput}, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var songInfo = data.tracks.items;
            console.log("Artist(s): " + songInfo[0].artists[0].name);
            console.log("Song Name: " + songInfo[0].name);
            console.log("Preview Link: " + songInfo[0].preview_url);
            console.log("Album: " + songInfo[0].album.name);
        });
    }
    
} else if (command === 'movie-this'){
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";

    if (userInput === ""){
        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy").then(movieInfo);
    } else {
        axios.get(movieQueryUrl).then(movieInfo);
    }
    
};

var movieInfo = function(response){
    console.log("Movie Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
    console.log("Produced in: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
}

// else if (command === 'do-what-it-says'){

// }
