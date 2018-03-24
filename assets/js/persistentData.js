//Data persistency

//defining Database
var database = firebase.database();
//This method will receive a user id, a list of genres and a zip code
//and it will update the information for that use in the database
function updateUserSetting(uid, pref, zip){
  var user = {
    pref: pref,
    zip: zip
  };
  database.ref('users/' + uid).set(user);
}

function getPref(){
  var pref =[];
  $('.form-check-input').each(function (e) {
    if ($(this).is(':checked')){
      var id = $(this).attr('id');
      pref.push(id);
    }
  });
  console.log('The list of preferences is: ' + pref)
  return pref;
}

function retrieveUserData(){
  $('#userFullName').text(sessionStorage.username);
  
  var u = database.ref('users/' + sessionStorage.currentUser);
  return u;
}