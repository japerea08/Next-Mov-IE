var userGenres = [];
getGenres();

var genres = "";

$("#submit-button").on("click",function(event){
	event.preventDefault();
	console.log("click");
	

	if($("#Action").is(":checked")){
		userGenres.push(genreMap["Action"]);
	}
	if($("#Adventure").is(":checked")){
		userGenres.push(genreMap["Adventure"]);
	}
	if($("#Animation").is(":checked")){
		userGenres.push(genreMap["Animation"]);
	}
	if($("#Comedy").is(":checked")){
		userGenres.push(genreMap["Comedy"]);
	}
	if($("#Crime").is(":checked")){
		userGenres.push(genreMap["Crime"]);
	}
	if($("#Documentery").is(":checked")){
		userGenres.push(genreMap["Documentery"]);
	}
	if($("#Drama").is(":checked")){
		userGenres.push(genreMap["Drama"]);
	}
	if($("#Family").is(":checked")){
		userGenres.push(genreMap["Family"]);
	}
	if($("#Fantasy").is(":checked")){
		userGenres.push(genreMap["Fantasy"]);
	}
	if($("#History").is(":checked")){
		userGenres.push(genreMap["History"]);
	}
	if($("#Horror").is(":checked")){
		userGenres.push(genreMap["Horror"]);
	}
	if($("#Music").is(":checked")){
		userGenres.push(genreMap["Music"]);
	}
	if($("#Mystery").is(":checked")){
		userGenres.push(genreMap["Mystery"]);
	}
	if($("#Romance").is(":checked")){
		userGenres.push(genreMap["Romance"]);
	}
	if($("#Science-Fiction").is(":checked")){
		userGenres.push(genreMap["Science-Fiction"]);
	}
	if($("#Thriller").is(":checked")){
		userGenres.push(genreMap["Thriller"]);
	}
	if($("#War").is(":checked")){
		userGenres.push(genreMap["War"]);
	}
	if($("#Western").is(":checked")){
		userGenres.push(genreMap["Western"]);
	}



	for (var i =0; i < userGenres.length; i++) {
		//make strng for genre
		genre = userGenres[i];

	}
	

	getMovies(genre);
});

function renderPoster(array){
	var movieContainer = $("#displayResults");
	for(var i=0; i < array.length; i++) {
		var thumbnail = $("<div>");
		var image = $("<img>");
		image.attr("src", array[i].poster);
		image.attr("class", "thumbnail")
		thumbnail.append(image);
		movieContainer.append(thumbnail);	
	}
};




