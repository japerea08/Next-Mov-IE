//var showTimeApi = "6uzdzbe7uny7nc23edk38r4d";
var showTimeApi = "4brme8bk3hts4dcngvgyjeyh";
//theater object to help build movie objects

var theaterMap = {};
var showtimeArray = [];
var localMovieArray = [];
var lat = "";
var long = "";
var showtimesArray = [];
var zipCode = "";


//array to store what is playing locally
var localListDisplay = [];
var localListTimes = [];

//function 
function initLocation(zip){
	//ask user current location here
	//this does not ask the user if they are okay giving their current location
	if(navigator.geolocation()){
		navigator.geolocation.getCurrentPosition(function(position){
			lat = position.coords.latitude;
			long = position.coords.longitude;
		});
	}
	else if(zip.length != 0){
		zipCode = zip;
	}
	else{
		//alert, user needs to enter a zipcode
	}
}



//showtime objects constructor
function Showtimes(title, cast, theater){
	this.title = title;
	this.cast = cast;
	//it will be a theater object that is passed in
	this.theater = theater;
};

//theater object
function Theater(name, times){
	this.name = name;
	this.times = times;
};



//function that checks which movies are playing in theaters from gracenote developers
function getShowtimes(){
	//get today's date for the ajax call
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth()+1;
	var year = today.getFullYear();

	

	if(day < 10){
		day = "0" + day;
	}
	if(month < 10){
		month = "0" + month; 
	}
	today = year + "-" + month + "-" + day;

	//zipCode = "33128";
	var showtimeURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate="+today+"&zip="+zipCode+"&api_key="+showTimeApi;

	$.ajax({
	  url: showtimeURL,
	  method: "GET",
	  error: function(err){
	  	console.log(err);
	  }
	}).then(function(response) {
	  console.log(response);
	  console.log("Response size: " +response.length);
	  for(var j = 0; j < response.length; j++){
	  	var theaters = [];
		  	//get the title of the movie
		  	if(typeof response[j].title != "undefined"){
		  		console.log("----------------------------------")
		  		console.log("Title: " + response[j].title);
		  		var title = response[j].title;


		  	}
		  	if(typeof response[j].topCast != "undefined"){
		  		console.log("Cast as an array: " + response[j].topCast);
		  		var cast = response[j].topCast;
		  	}

			//get the theater which is contained in an array of showtime
			for(var i = 0; i < response[j].showtimes.length; i++){
				if(typeof response[j].showtimes[i].theatre.name != "undefined"){
					var theaterName = response[j].showtimes[i].theatre.name; 
					console.log("Theater: " + theaterName);
					if(theaters.length == 0){
						theaters.push(new Theater(theaterName));
					}
					else if(search(theaterName, theaters) == -1){
						theaters.push(new Theater(response[j].showtimes[i].theatre.name));
					}
				}
				if(typeof response[j].showtimes[i].dateTime != "undefined"){
					console.log("Times: " + response[j].showtimes[i].dateTime);
					//response[j].showtimes[0].ticketURI
					//search to add
					var index = search(theaterName, theaters);
					if(index >= 0){
						theaters[index].times += response[j].showtimes[i].dateTime+",";
					}

				}

				showtimesArray = response[j].showtimes;
				
			}
			//add theater to showtime object
	  		showtimeArray.push(new Showtimes(title, cast, theaters));
	  }
	  showtimeArray.sort(compare);
	  localPlayList();	
	});
}

function search(nameKey, array){
	for(var i = 0; i < array.length; i++){
		if(array[i].name === nameKey){
			return i;
		}
	}

	return -1;
}


//function that will combine what is playing locally 
function localPlayList(){
	//check to see if it exist
	//choose the smaller size to dictate
	if(movieArray.length > showtimeArray.length){
		//based off showtime
		for(var i = 0; i < showtimeArray.length; i++){
			for(var j = 0; j < movieArray.length; j++){
				if(showtimeArray[i].title == movieArray[j].title && typeof showtimeArray[i].title != "undefined" && typeof movieArray[j].title != "undefined"){
					localListTimes.push(showtimeArray[i]);
					localListDisplay.push(movieArray[j]);
				}
			}
		}
	}
	else{
		for(var i = 0; i < movieArray.length; i++){
			for(var j = 0; j < showtimeArray.length; j++){
				if(showtimeArray[j].title == movieArray[i].title && typeof showtimeArray[j].title != "undefined" && typeof movieArray[i].title != "undefined"){
					localListTimes.push(showtimeArray[j]);
					localListDisplay.push(movieArray[i]);
				}
			}
		}

	}

	//here make full movie object
	for(var i = 0; i < localListDisplay.length; i++){

		var movie = new Movie(localListDisplay[i].title, localListDisplay[i].id, localListDisplay[i].year, localListDisplay[i].poster, 
			localListDisplay[i].description, localListTimes[i].cast, localListTimes[i].theater);

		//push into a more complete array
		localMovieArray.push(movie);

	}


	renderPoster(localMovieArray);
}
