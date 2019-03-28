// code to read and set enviornment variables
require("dotenv").config();
// required to use to node-spotify-api
var Spotify = require('node-spotify-api');
// required to use moment node package
var moment = require('moment');
moment().format();
// code to import key.js file and stores my Spotify credentials
var keys = require("./keys.js");
// code to read the random.txt file
var fs = require("fs");

// global variables ====================================================
var spotify = new Spotify(keys.spotify);
var command = process.argv[2];
var userInput = process.argv.slice(3).join("+");
var axios = require("axios");

// main program ========================================================
// determines what will happen if the user types concert-this, spotify-this-song, movie-this, or do-what-it-says 
if (command === "concert-this") {
    var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"

    axios.get(queryURL).then(
        function (response) {
            for (var i = 0; i < response.data.length; i++){
                console.log(response.data[i].lineup[0]);
                console.log(response.data[i].venue.name);
                console.log(response.data[i].venue.city + ", " + response.data[i].venue.region);
                console.log(moment(response.data[i].datetime).format("MM-DD-YYYY") + "\n");
            }
        }
    ).catch(function(error){
        return console.log("Error occurred: " + error);
    })

} else if (command === "spotify-this-song") {
    spotifySong(userInput);

} else if (command === "movie-this"){
    var movieQueryUrl = "http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy";
    
    if (userInput === ""){
        axios.get("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy").then(movieInfo);
    } else {
        axios.get(movieQueryUrl).then(movieInfo);
    }
    
} else if (command === "do-what-it-says"){
    fs.readFile("random.txt", "utf8", function(error, data){
        if(error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr[1]);
        
        spotifySong(dataArr[1]);
    });
};

// global functions =====================================================

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


// function movieInfo (response){
//     console.log("Movie Title: " + response.data.Title);
//     console.log("Release Year: " + response.data.Year);
//     console.log("IMDB Rating: " + response.data.imdbRating);
//     console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
//     console.log("Produced in: " + response.data.Country);
//     console.log("Language: " + response.data.Language);
//     console.log("Plot: " + response.data.Plot);
//     console.log("Actors: " + response.data.Actors);
// }

function spotifySong(songName){
    if (songName === ""){
        songName = 'The Sign';
        spotify.search({ type: 'track', query: songName, limit: 10 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var songInfo = data.tracks.items;
            
            console.log("Artist(s): " + songInfo[0].artists[0].name);
            console.log("Song Name: " + songInfo[0].name);
            console.log("Preview Link: " + songInfo[0].preview_url);
            console.log("Album: " + songInfo[0].album.name);
        });
    } else {
        spotify.search({ type: 'track', query: songName}, function (err, data) {
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
}



