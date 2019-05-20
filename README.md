# liri-node-app

A node application that will fetch and render information about any song, artist, or movie you input. 

## Prerequisites

Node itself and the following modules are **required** to run this application: 
- axios
- dotenv
- moment
- node-spotify-api

To install, run npm install within the liri directory.



You will need to supply your own .env file with your own SPOTIFY SECRET and SPOTIFY ID. You can get your own keys [here](https://developer.spotify.com/dashboard/)

To install, run npm install within the liri directory.

## How to use

Give liri one of these four commands

` spotify-this-song ` or `song`

` concert-this ` or `concert`

` movie-this ` or `movie`

` do-what-it-says ` or `doit`


and a appropriate input. For inputs that require a space, such as searching for the movie "The Incredibles" input with a dash. To search for The Incredibles, the input is 

`node liri.js movie the-incredibles`



## Built With

- axios
- dotenv
- moment
- node-spotify-api
- OMDB API
- Bands In Town API

