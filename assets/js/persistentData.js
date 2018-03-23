//Data persistency

//This method will receive a user id, a list of genres and a zip code
//and it will update the information for that use in the database
function updateUserSetting(uid, pref, zip){
  var user = {
    favorites: favorites,
    zip: zip
  };
  database.ref('users/' + uid).set(user);
}

$(document).ready(function() {
  
	
})