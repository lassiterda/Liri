//require for fs
const fs = require('fs');
const request = require('request');
const Twitter = require('twitter');
const spotify = require('spotify');
const keys = require('./keys');

  //function to consume the OMDB API and output movie information to the console
  var  movieThis = function(str) {

    request("http://www.omdbapi.com/?t=" + str + "&plot=short&tomatoes=true", function(e, r, body) {

      let objBody = JSON.parse(body);

      if(e) {
        console.log(e);
      }
      else if (objBody.Response === "False") {
        movieThis("Mr Nobody");
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
        console.log("body")
      }
    });

  }
  //function to search Spotify for a specific song and display basic info to the console.
  var spotifyThisSong = function(str) {
    spotify.search({ type: 'track', query: str }, function(e, response) {
      if (e) {
        console.log(e);
      }
      else {
        let firstResult = response.tracks.items[0];

        console.log("")
        console.log(firstResult.artists[0].name);
        console.log(firstResult.name);
        console.log(firstResult.preview_url);
        console.log(firstResult.album.name);
      }
    });
  };
  //function to grab the most recent 20 tweets from a user and disdply them to the console.
  var myTweets = function() {
    let client = new Twitter(keys.twitterKeys)
    let params = {screen_name: "lassiter_da",
                  count: "20",
                  };

    client.get("/statuses/user_timeline", params, function(e, tweets, resp) {
        console.log("");
        tweets.forEach(function(ele) {
          console.log(ele.text)
          console.log(ele.created_at);
          console.log("-----------")
          console.log("");
        })
    });
  };

//switch case to determine output
function caseSwitch(command, term) {

  switch (command) {
    case "my-tweets":
      myTweets();
    break;

    case "spotify-this-song":
      spotifyThisSong(term);
    break;

    case "movie-this":
      movieThis(term)
    break;

    case "do-what-it-says":
      fs.readFile("./random.txt", function(err,  txt) {
        let arrCommands = txt.toString().split(",")
        caseSwitch(arrCommands[0], arrCommands[1]);
      });
    break;

    default:
      console.log("I'm sorry, I'm afraid I can't to that.")
    break;
  }
}

caseSwitch(process.argv[2], process.argv[3]);
