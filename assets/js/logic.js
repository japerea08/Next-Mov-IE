var userGenres = [];
getGenres();
//Thnis method is automaticali populatin the list of preferences and
function populateCheckList(list) {
	var $checkboxList = $('<div>');

	$.each(list, function(key, value){

		var $checkbox = $('<div class="form-check">');
		var $label = $('<label class="form-check-label">');
		var $cbx = $('<input type="checkbox" class="form-check-input">');
		$cbx.attr('id', key);
		$cbx.attr('value', value);
		$cbx.appendTo($checkbox);
		$label.attr('for', key);
		$label.append(" " + key);
		$label.appendTo($checkbox);
		$checkbox.appendTo($checkboxList);
	});
	/* This code appends the list of checkboxes that 
	was created to the #checkList element in the DOM */
	// $checkboxList.appendTo($('#checkList'));
	$checkboxList.appendTo($('#checkList'));
}

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
	// for(var i = 0; i < userGenres.length; i++){
	// 	userGenres[i] = genreMap[userGenres[i]];
	// }    this is no longer needed because we are getting the numbers directly
	
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
