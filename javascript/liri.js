//requirements
require("dotenv").config();
const axios = require("axios");
const spotify = require("node-spotify-api")
const moment = require("moment")
const keys = require("./keys.js");
const newSpotify = new spotify(keys.spotify)
const fs = require("fs")

//capture input
var args = process.argv
var commandInput = args[2]
var stuffInput = args[3] //slice?


//console.log(commandInput + "  " + stuffInput)


//takes in the input and runs the appropriate function
liri()
function liri () {
    switch(commandInput) {
        default:
            console.log("Spelling error on command")
            break;

        case "spotify-this-song":
            //console.log("works")
            spotifySong(stuffInput)
            break

        case "song":
            //console.log("works")
            spotifySong(stuffInput)
            break

        case "concert-this":
            concert(stuffInput)
            break

        case "concert":
        concert(stuffInput)
            break
        
        case "movie-this":
            movie(stuffInput)
            break

        case "movie":
            movie(stuffInput)
        break    
        
        case "do-what-it-says":
            doIt()
            break

        case "doit":
            doIt()
            break
    }
}

//FUNCTIONS


// takes song input then renders information about it
function spotifySong(stuffInput) {
    newSpotify.search({ type: 'track', query: `${stuffInput}` }, function(err, data) {
        if (err) {
          return console.log('Error:' + err);
        }
          console.log("-----------------------Song information------------------------")
          console.log(`Artist: ${data.tracks.items[0].artists[0].name}`); //TODO: Check line break look
          console.log(`Song Name: ${data.tracks.items[0].name}`);
          console.log(`URL: ${data.tracks.items[0].external_urls.spotify}`);
          console.log(`Album: ${data.tracks.items[0].album.name}`);
      });
    }

//Searches Bands in Town Artist Events API for an artist then renders the venue name, location, and time of the event.

function concert(stuffInput) {

    var concertURL = "https://rest.bandsintown.com/artists/" + stuffInput + "/events?app_id=codingbootcamp"
        axios
            .get(concertURL)
            .then(function (response) {
                console.log(`Venue Name: ${response.data[0].venue.name}`)
                console.log(`Venue Location: ${response.data[0].venue.city}, ${response.data[0].venue.region}`)
                console.log("Data: " + moment(response.data[0].datetime).format('L'))
            })
            .catch(function(err) {
                console.log("Error:" + err);
              })
    }


//Uses axios to query OMBD API for movie data, then renders data
function movie(stuffInput) {
    queryUrl = "http://www.omdbapi.com/?t=" + stuffInput + "&y=&plot=short&apikey=trilogy"
    axios
        .get(queryUrl)
        .then(function (response) {
            console.log("---------------Movie information-----------")
            console.log(`Movie Title: ${response.data.Title}`)
            console.log(`Release year: ${response.data.Year}`)
            console.log(`IMDB Rating: ${response.data.imbdRating}`)
            console.log(`Rotton Tomatoes Rating: ${response.data.Ratings[1].Value}`)
            console.log(`Origin Country: ${response.data.Country}`)
            console.log(`Language: ${response.data.Language}`)
            console.log(`Plot: ${response.data.Plot}`)
            console.log(`Cast: ${response.data.Actors}`)
        })
        .catch(function(err) {
            console.log("Error:" + err)
        })
}

//read the text file then run liri based on the contents. Assumes the format of:   command,stuffinput and that there is only one line in at a time
function doIt() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
          console.log(error);
        }  
    var textData = data.split(",")
        commandInput = textData[0]
        stuffInput = textData[1]
        liri(commandInput, stuffInput)
    })
}