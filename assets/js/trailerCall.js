var trailerKey = "https://www.youtube.com/embed/";
//var movieId = "284054";
//function that will be called when the modal is called
function getTrailerKey(movieId){
	var trailerUrl = "https://api.themoviedb.org/3/movie/"+movieId+"/videos?"+apiKey+"&language=en-US";
	//var trailerUrl = "https://api.themoviedb.org/3/movie/284054/videos?api_key=b92306e1f36bdf25d4bbdf45b0e344e8&language=en-US";
	$.ajax({
	  url: trailerUrl,
	  method: "GET"
	}).then(function(response){
		console.log(response.results);
		for(var i = 0; i < response.results.length; i++){
			if(response.results[i].name == "Official Trailer"){
				trailerKey += response.results[i].key;
			}
		}
		console.log("Trailer Key is: " + trailerKey);
		buildIFrame(trailerKey);
	});

};

function buildIFrame(key){
	console.log(key);
	var frame = $("#frame");
	frame.attr("src", key);
}