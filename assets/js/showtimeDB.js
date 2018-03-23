var showTimeApi = "6uzdzbe7uny7nc23edk38r4d";
//theater object to help build movie objects

var theaterMap = {};
var showtimeArray = [];



//showtime objects constructor
function Showtimes(title, cast, theater){
	this.title = title;
	this.cast = cast;
	//it will be a theater object that is passed in
	this.theater = theater;
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

	var zipCode = "33176";
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
		  	//get the title of the movie
		  	if(typeof response[j].title != "undefined"){
		  		console.log("----------------------------------")
		  		console.log("Title: " + response[j].title);
		  		var title = response[j].title;


		  	}
		  	if(typeof response[j].topCast != "undefined"){
		  		//get the case of the movie
		  		/*for(var k = 0; k < response[j].topCast.length; k++){
		  			console.log("Cast: " + response[j].topCast[k]);
		  			var cast = push(response[j].topCast[k]);

		  		}*/
		  		console.log("Cast as an array: " + response[j].topCast);
		  		var cast = response[j].topCast;
		  	}

			//get the theater which is contained in an array of showtime
			for(var i = 0; i < response[j].showtimes.length; i++){
				if(typeof response[j].showtimes[i].theatre.name != "undefined"){
					console.log("Theater: " + response[j].showtimes[i].theatre.name);
				}
				if(typeof response[j].showtimes[i].dateTime != "undefined"){
					console.log("Times: " + response[j].showtimes[i].dateTime);
				}

				var showtimesArray = response[j].showtimes;
				showtimesArray.forEach(function(object){
					theaterMap[object.theatre.name] += object.dateTime +", ";
	  		
	  			});

			}
			//add the map to the movie object
	  			showtimeArray.push(new Showtimes(title, cast, theaterMap));
	  }	
	});
}
