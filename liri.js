var keys = require ("./key.js");
var twitter = require ("twitter");
var spotify = require ("node-spotify-api");
var requestMovie = require ("request");
var twitterKeys = keys.twitterKeys;
var spotifyKeys = keys.spotifyKeys;


var twitterClient = new twitter (twitterKeys);
var spofityClient = new spotify (spotifyKeys);

var params = {screen_name: "LIRI143"};

var request = process.argv[2];
var searchVal = process.argv[3];


console.log("Hello Welcome to LIRI, choose between the following commands:");
console.log("my-tweets [It will display recent tweets]");
console.log("spotify-this-song [It will display information on the search, write the song with - between words]");
console.log("movie-this [It will display information on the search, write the movie with - between words]\n");



if(request == "my-tweets"){
	twitterClient.get("statuses/user_timeline", params, function(error, tweets, response){
			console.log("Your tweets:\n");

		tweets.forEach(function(element) {
			console.log("ON " + element.created_at + " you tweeted:");
			console.log(element.text + "\n");
		});

	});
}

if(request == "spotify-this-song"){

	if(searchVal != null){
	 	spofityClient.search({ type: 'track', query: searchVal, limit: 1}, function(err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);
			}
	 
			console.log("The artist: " + data.tracks.items[0].artists[0].name + "\n");
			console.log("The name of the song: " + data.tracks.items[0].name + "\n");
			console.log("A snippet of the song: " + data.tracks.items[0].external_urls.spotify + "\n");
			console.log("Name of the album: " + data.tracks.items[0].album.name + "\n");
		 
		});
	}
	else{
		spofityClient.search({ type: 'track', query: 'Ace of Base - The Sign', limit: 1}, function(err, data) {
			if (err) {
				return console.log('Error occurred: ' + err);
			}
		 
			console.log("The artist: " + data.tracks.items[0].artists[0].name + "\n");
			console.log("The name of the song: " + data.tracks.items[0].name + "\n");
			console.log("A snippet of the song: " + data.tracks.items[0].external_urls.spotify + "\n");
			console.log("Name of the album: " + data.tracks.items[0].album.name + "\n");
			 
		});
	}

}


if(request == "movie-this"){

	if(searchVal != null){
		var queryURL = "https://www.omdbapi.com/?t=" + searchVal + "&y=&plot=short&apikey=40e9cece";

		requestMovie(queryURL, function(error, response, body){
		
			var result = JSON.parse(body);

			console.log("Movie Title: " + result.Title);
			console.log("Year the movie was released: " + result.Year);
			console.log("IMDB rating: " + result.imdbRating);
			console.log("Rotten Tomatoes rating: " + result.Ratings[1].Value);
			console.log("Country or Countries movie was produced: " + result.Country);
			console.log("Language(s) of the movie: " + result.Language);
			console.log("Plot of the movie: " + result.Plot);
			console.log("Actors: " + result.Actors);


		});
	}else{

	var queryURL = "https://www.omdbapi.com/?t=" + "Mr.Nobody" + "&y=&plot=short&apikey=40e9cece";
	
		requestMovie(queryURL, function(error, response, body){
			
			var result = JSON.parse(body);
	
			console.log("Movie Title: " + result.Title);
			console.log("Year the movie was released: " + result.Year);
			console.log("IMDB rating: " + result.imdbRating);
			console.log("Rotten Tomatoes rating: " + result.Ratings[1].Value);
			console.log("Country or Countries movie was produced: " + result.Country);
			console.log("Language(s) of the movie: " + result.Language);
			console.log("Plot of the movie: " + result.Plot);
			console.log("Actors: " + result.Actors);
	
	
		});

	}

}


