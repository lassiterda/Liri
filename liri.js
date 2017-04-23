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
        appLog([e]);
      }
      else if (objBody.Response === "False") {
        movieThis("Mr Nobody");
      }
      else {
        let arrResults = [
          "Title: " +  objBody.Title,
          "Year: " + objBody.Year,
          "Rating (IMDB): " + objBody.imdbRating,
          "Country: " + objBody.Country,
          "Laguage: " + objBody.Language,
          "Plot: " + objBody.Plot,
          "Actors: " + objBody.Actors,
          "Rotten Tomatoes Rating: " + objBody.tomatoRating,
          "Rotten Tomatoes URL: " + objBody.tomatoURL
        ]

        appLog(arrResults);
        arrResults.forEach(function(ele) {
          console.log(ele)
        })

      }
    });

  }
  //function to search Spotify for a specific song and display basic info to the console.
  var spotifyThisSong = function(str) {
    spotify.search({ type: 'track', query: str }, function(e, response) {
      if (e) {
        console.log(e);
        appLog([e]);
      }
      else {
        let firstResult = response.tracks.items[0];
        let arrResults = [
          "",
          firstResult.artists[0].name,
          firstResult.name,
          firstResult.preview_url,
          firstResult.album.name
        ];
        appLog(arrResults);
        arrResults.forEach(function(ele) {
          console.log(ele)
        });
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

        tweets.forEach(function(ele) {
          let arrResults = [
            "",
            ele.text,
            ele.created_at,
            "-----------"
          ]
          appLog(arrResults);
          arrResults.forEach(function(ele) {
            console.log(ele);
          })
        })
    });
  };
  //function to log results of functions to the console, takes an array of strings.
  var appLog = function(arr) {
    let args = "";
    for(i = 2; i < process.argv.length; i++) {
      args += process.argv[i] + " "
    }
    fs.appendFileSync("./log.txt","\r\n" + args + "\r\n")
    arr.forEach(function(ele) {
      fs.appendFileSync("./log.txt", ele + "\r\n")
    })
    fs.appendFileSync("./log.txt", "-----------\r\n")
  }

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
