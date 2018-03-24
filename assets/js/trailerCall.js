var trailerKey = "";
var count = 0;
//var movieId = "284054";
//function that will be called when the modal is called
function getTrailerKey(movieId){
	trailerKey = "https://www.youtube.com/embed/";
	var trailerUrl = "https://api.themoviedb.org/3/movie/"+movieId+"/videos?"+apiKey+"&language=en-US";
	//var trailerUrl = "https://api.themoviedb.org/3/movie/284054/videos?api_key=b92306e1f36bdf25d4bbdf45b0e344e8&language=en-US";
	$.ajax({
	  url: trailerUrl,
	  method: "GET"
	}).then(function(response){
		console.log(response.results);
		for(var i = 0; i < response.results.length; i++){
			//searching for official trailer
			if(response.results[i].name.indexOf("Official Trailer") >= 0 && count == 0){
				trailerKey += response.results[i].key;
				count++;
			}
		}
		//searching for anythhing
		if(count == 0 && trailerKey == "https://www.youtube.com/embed/"){
			for(var i = 0; i < response.results.length; i++){
				if(response.results[i].name.indexOf("Trailer") >= 0 && count == 0){
					trailerKey += response.results[i].key;
					count++;
				}
			}
		}

		console.log("Trailer Key is: " + trailerKey);
		buildIFrame(trailerKey);
		count = 0;
	});

};

function buildIFrame(key){
	console.log(key);
	var frame = $("#frame");
	frame.attr("src", key);
}