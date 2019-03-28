# liri-node-app

LIRI is a command line node app that takes in parameters and returns data to the user. The user can ask the program to concert-this, spotify-this-song, movie-this, and do-what-it-says. 

When the user selects concert-this and inputs an artist, the program creates a bandsintown queryURL and uses an axios call to get the most recent concert data for the artist. 

Spotify-this-song coupled with an song title searches the node-spotify-api and returns information about the user's song. If no song is designation, the program will return information about the song "The Sign."

Movie-this added with a movie title will create a queryURL which is then sent through an axios call to the OMDB api and will return movie information. If no movie title is provided, the program will return information about the movie Mr. Nobody.

Do-what-it-says reads the random.txt file and runs a spotify-this-song search on the song "I Want it That Way."

## Usefulness of Project

This app imports/exports credentials from other files and uses axios calls to get data from various sources. 

This app relies on the following npm packages:
* axios
* dotenv
* moment
* node-spotify-api


## Contact Information

The project is maintained by George Arredondo.
