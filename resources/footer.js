/* jshint esversion: 6 */

window.addEventListener('DOMContentLoaded', function(){
	let nameDiv = document.getElementById('login');
	
	if(!nameDiv) 
		return;
	
	nameDiv.style.fontSize = "2vw";
	nameDiv.style.background = "#ffb3c0";
	nameDiv.style.marginLeft = "auto";
	nameDiv.style.fontWeight = "bold";
	nameDiv.style.textDecoration = "underline";
	
	if(!localStorage.getItem('loggedIn')){
		nameDiv.innerHTML = "Not logged in";
	}
	else{
		
		nameDiv.innerHTML = "Username: " +localStorage.getItem("user_name");
	
		let signOut = document.createElement("button");
		signOut.innerHTML = "Sign out";
		
		nameDiv.appendChild(signOut);
		
		signOut.addEventListener("click", (event) => {
		localStorage.removeItem("loggedIn");
		 window.location.href = "/";
	});
	}
});