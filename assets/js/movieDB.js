//ajax for the ombd
var apiKey = "api_key=b92306e1f36bdf25d4bbdf45b0e344e8";

var posterURL = "http://image.tmdb.org/t/p/w185/";
var discover = "/discover/movie?sort_by=popularity.desc";

var queryURL = "https://api.themoviedb.org/3/movie/76341?api_key=" + apiKey;

var genreReturn = "https://api.themoviedb.org/3/genre/movie/list?api_key=b92306e1f36bdf25d4bbdf45b0e344e8&language=en-US";

var genreArray;

//hashMap for genres using the name of the genre as the unique key
var genreMap = {};

//array that will hold all the movie objects
var movieArray = [];

//movie object constructor
function Movie(title, id, year, poster, description, cast, showtimes){
	this.title = title; //string that will hold title of movie
	this.id = id;
	this.year = year; //year the movie was made
	this.poster = poster; //url for the poster
	this.description = description; //description of the moview
	this.cast = cast; //an array of the cast members
	this.showtimes = showtimes; //showtime object
}


//function get the 19 genres and makes them into a HashMap
function getGenres() {
	$.ajax({
	  url: genreReturn,
	  method: "GET"
	}).then(function(response) {

	  console.log(response);

	  genreArray = response.genres;

	  console.log("array: " + genreArray);
	  //making the map
	  genreArray.forEach(function(genre){
	  	genreMap[genre.name] = genre.id;

	  });

	  console.log("map: " + JSON.stringify(genreMap));
	  console.log(genreMap.Action);	
		populateCheckList(genreMap);
	});
}

//function that returns a list of movies based off genres, function gets Movie Title, Year, Poster, Description 
function getMovies(genreId){
	genreId = genreId;

	var movieSearch = "https://api.themoviedb.org/3/discover/movie?with_genres="+genreId+"&primary_release_date.lte=2018-3-20&primary_release_date.gte=2018-2-1&page=1&include_video=true&include_adult=false&sort_by=popularity.desc&region=us&language=en-US&"+apiKey;
	
	$.ajax({
	  url: movieSearch,
	  method: "GET"
	}).then(function(response) {
	  console.log("Inside getMovies: " + response);
	  //get the name of the movie
	  var movieNameArray = response.results;
	  //console.log(movieNameArray);
	  for(var i = 0; i < movieNameArray.length; i++){
	  	//console.log("Title: " + movieNameArray[i].title + " (" + movieNameArray[i].release_date+")");
	  	var title = movieNameArray[i].title;
	  	var id = movieNameArray[i].id;
	  	var year = movieNameArray[i].release_date;
	  	//console.log("Overview: " + movieNameArray[i].overview);
	  	var description  = movieNameArray[i].overview;
	  	//console.log("Poster Path: " + posterURL + movieNameArray[i].poster_path);
	  	var poster = posterURL + movieNameArray[i].poster_path;
	  	//console.log("------------------------------------------------");
	  	//create the movie object
	  	var movie = new Movie(title, id, year, poster, description);
	  	//push the movie objects into an array
	  	movieArray.push(movie);
	  }	
	  

	  //to get the showtimes
	  getShowtimes();
	  movieArray.sort(compare);
	});

}

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const movieA = a.title.toUpperCase();
  const movieB = b.title.toUpperCase();

  let comparison = 0;
  if (movieA > movieB) {
    comparison = 1;
  } else if (movieA < movieB) {
    comparison = -1;
  }
  return comparison;

}
