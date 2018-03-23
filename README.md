# Next Mov-E

## Project title

NEXT MOV-E

## Group Members

* Madison Morris
* Martha Velez
* Jose Perea
* Nelson Diaz.

## Project Description: 

Interest based movie app that will help people find the best movies for them based on a profile that they fill out. The application will create a list of suggested movies currently playing or coming soon.  The list will include showtimes, trailers, and more.

The application will be displayed on three main pages.
1. The Welcome page (index.html). The loging form is contained into this page. This Page will pop-up a modal to allow users to register in case they don't have an account.
2. The Seach page. This pages will allow the users to see the list of movies that fit their preferences. This windows is split in two sections the one in the left contains the preference and location textboxes where th user is going to enter the information to let the app know what to look for and where. The section to the right contains the list of movies found that match the the user's preferences.
3. The Movie Detail page. This Page will be displayed when the user click on the movie thumbnail. This page will show details and the poster for that movie, and Also the triler that we obtained from YouTube and a display of the list of showtimes for that particular movie in the theaters nearby.

## Languages

* HTML
* CSS
* Javascript

## Framework

* Bootstrap 3.7

## Technologies used

* Geo-Location.
* JQuery.
    + JQuery UI.
* REST API's.
    + Fandango
    + Youtube.
    + Omdb.

## Database

* Firebase

### Database Code Snippet

```
<script src="https://www.gstatic.com/firebasejs/4.11.0/firebase.js"></script>

<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCyNP4-ntc37bN0OtkDNldtNnUoSNSx-S0",
    authDomain: "next-mov-e.firebaseapp.com",
    databaseURL: "https://next-mov-e.firebaseio.com",
    projectId: "next-mov-e",
    storageBucket: "",
    messagingSenderId: "903599019806"
  };
  firebase.initializeApp(config);
</script>
```
