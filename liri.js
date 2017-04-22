
//require for request
const request = require('request');
//require for keys
const keys = require('./keys');
//base64 encoded twitter auth str;
const strTwitterAuth = Buffer.from(keys.twitterKeys.consumer_key + ":" + keys.twitterKeys.consumer_secret).toString('base64')

var  movieThis = function(str) {

  request("http://www.omdbapi.com/?t=" + str + "&plot=short&tomatoes=true", function(e, r, body) {
    
    let objBody = JSON.parse(body);
    
    if(e) {
      console.log(e);
    }
    else if (objBody.Response === "False") {
      movieThis("Mr. Nobody");
    }
    else { 
      console.log("Title: " +  objBody.Title)
      console.log("year: " + objBody.Year)
      console.log("Rating (IMDB): " + objBody.imdbRating)
      console.log("Country: " + objBody.Country)
      console.log("Laguage: " + objBody.Language)
      console.log("Plot: " + objBody.Plot)
      console.log("Actors: " + objBody.Actors)
      console.log("Rotten Tomatoes Rating: " + objBody.tomatoRating)
      console.log("Rotten Tomatoes URL: " + objBody.tomatoURL)
    }
  });
  
}


switch (process.argv[2]) {
  case "my-tweets":

    break;
  case "spotify-this-song":

    break;
  case "movie-this":
    movieThis(process.argv[3])
    break;
  case "do-what-it-says":

    break;
  default:
    console.log("I'm sorry, I'm afraid I can't to that.")
}
