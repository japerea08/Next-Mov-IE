// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
	//All the seeting for the authenticcation method go here
	signInOptions: [
		{
			provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
			requireDisplayName: true
		}
	],
	callbacks: {
		signInSuccess: function (currentUser, credential, redirectUrl) {
			return true;
		},
		uiShown: function () {
			document.getElementById('loader').style.display = 'none';
		}
	},
	signInFlow: 'popup',
	signInSuccessUrl: 'results.html'
}

ui.start('#firebaseui-auth-container', uiConfig);


// Get the currently signed -in user

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
		console.log(user);
		sessionStorage.setItem("currentUser", user.uid);
	} else {
		// No user is signed in.
		ui.start('#firebaseui-auth-container', uiConfig);
	}
});

// .Kb.uid