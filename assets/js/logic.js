var userGenres = [];
getGenres();

var genresChoises = [];

$("body").on("click", ".thumbnail",function(){
	$('#detail').modal({
	 keyboard: false
	})

	//attach the title to the modal
	//get the info from localListTimes
	$("#title").text($(this).attr("title"));
	$("#cast").text($(this).attr("cast"))
	getTrailerKey($(this).attr("id"));
})

$("#submit-button").on("click",function(event){
	event.preventDefault();
	//getting zipcode
	zipCode = $("#searchBox").val();
	
	//This method reset the array userGenras to [] and 
	//populate it again with the values of the cheched boxes.
	userGenres = getPref();

	//DO NOT DELETE, YOU NEED TO PASS THE GENRE AS A NUMBER
	for(var i = 0; i < userGenres.length; i++){
		userGenres[i] = genreMap[userGenres[i]];
	} 
	
	//joining for the pipe operator
	genre = userGenres.join("|");
	console.log("what:" + genre);	
	
	//This method gets the array of preferences and the uid that is currently
	//saved in the sessioStorage and update the information in firebase
	updateUserSetting(sessionStorage.currentUser, userGenres, zipCode);

	//This methos is to populate the list of movies.
	getMovies(genre);
	
});

//needs array from showtimes for the cast or, combine the info...
function renderPoster(array){
	var movieContainer = $("#displayResults");
	for(var i=0; i < array.length; i++) {
		var thumbnail = $("<div>");
		var image = $("<img>");
		image.attr("src", array[i].poster);
		image.attr("class", "thumbnail")
		image.attr("id", array[i].id);
		image.attr("title", array[i].title);
		image.attr("cast", array[i].cast);
		thumbnail.append(image);
		movieContainer.append(thumbnail);	
	}
};
