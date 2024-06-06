/* jshint esversion: 6 */

/// used https://www.site24x7.com/tools/javascript-validator.html for validation of js.

/// modules
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const http = require("http");
const path = require('path');
const fs = require('fs');

/// variables
const usersPath = 'secretResources/users.json';

String.prototype.hash = function() {
    let hash = 0;
    for (let i = 0; i < this.length; i++) {
        let c = this.charCodeAt(i);
				/// random calculations:
				hash = ((hash+ 86 + (c<<13)<<3)-hash);
				hash ^= 5235612; /// also converts to 32-bit integer
    }
    return hash;
};

function checkUsername(username){
	if (!fs.existsSync(usersPath)){
		console.error(".json doesn't exist");
		return false;
	}

      let data = fs.readFileSync(usersPath);
      let ob = JSON.parse(data);
     
      for (let i in ob) {
				if (ob[i].username == username)
					return true;
      }
		
		return false;
}

function checkPassword (username, password) {
    if (!fs.existsSync(usersPath)){
			console.error(".json doesn't exist");
			return false;
		}
		let data = fs.readFileSync(usersPath);
		let ob = JSON.parse(data);
	 
		for (let i in ob) {
			if (ob[i].username == username){
				if (ob[i].parola == password) 
					return true;
				break;
			}
		}
		return false;
}

function addUser(username,password){
	if (!fs.existsSync(usersPath)){
			console.error(".json doesn't exist");
			return false;
		}
		
		// Read the existing JSON data from the file
 /// let data = ;

  // Parse the JSON data into a JavaScript object
  let users = JSON.parse(fs.readFileSync(usersPath));

  // Add the new user data to the JavaScript object
  users.push({ "username": username, "parola": password });

  // Write the updated JavaScript object back to the JSON file
	
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2)); /// write readable

  console.log("User added successfully.");
  return true;
}

function sendLogged(req,res,path,bypass=false){
	/// console.log("in sendLogged: " + session.loggedIn);
	if(session.loggedIn || bypass)	
		res.sendFile(path, { root: '.' });
	else
		res.sendFile('resources/404.html', { root: '.' });
}

app.listen(5000);
console.log("connection succsessful!");


/// for session to remember loggedIn.
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
	loggedIn: false,
}));

// for parsing application/json in POST requests.
app.use(bodyParser.json()) ;

/// give access to every file present in the folder resources.
app.use(express.static(path.join(__dirname, 'resources'))); 


app.post("/signup",function(req,res){
	let formData = req.body;
	/// console.log(formData);
	
	 try {
		if(checkUsername(formData.user_name)){
			res.status(400).send({ message: 'Username already exists!' });
			return;
		}
		addUser(formData.user_name,formData.password);
		session.loggedIn = true;
		
		console.log("ACUMA : " + session.loggedIn);
		
		sendLogged(req,res,'resources/form.html');

	}
	catch (error) {
    console.error('Error parsing JSON:', error);
		res.status(400).send({ message: "internal server error"});
		return;
  }
});



app.get("/signup",function(req,res){
	
	sendLogged(req,res,'resources/form.html');
});

app.post("/login",function(req,res){
	
	let formData = req.body;
	///console.log(formData);
	
	 try {
		if(!checkUsername(formData.user_name)){
			res.status(400).send({ message: 'Username not found!' });
			return;
		}
			
		if(!checkPassword(formData.user_name, formData.password)){
			res.status(400).send({ message: 'Invalid credentials' });
			return;
		}
		
		session.loggedIn = true;
		sendLogged(req,res,'resources/form.html');
		
	}
	catch (error) {
    console.error('Error parsing JSON:', error);
		res.status(400).send({ message: "internal server error"});
		return;
  }
	
});

app.get("/login",function(req,res){
	sendLogged(req,res,'resources/form.html');
	
});

app.post("/about",function(req,res){
	sendLogged(req,res,'resources/about.html');
});
app.get("/about",function(req,res){
	///console.log("ACUMA : " + req.session);
	///console.log("ACUMA : " + req["session"]["loggedIn"]);
	sendLogged(req,res,'resources/about.html');
});

app.post("/gameIntro",function(req,res){
	res.sendFile('resources/gameIntro.html', { root: '.' });
});
app.get("/gameIntro",function(req,res){
	sendLogged(req,res,'resources/gameIntro.html',true);
});

app.post("/game",function(req,res){
	res.sendFile('resources/game.html', { root: '.' });
});
app.get("/game",function(req,res){
	sendLogged(req,res,'resources/game.html',true);
});



app.get("/gameOver",function(req,res){
	res.sendFile('resources/game.html', { root: '.' });
});
app.post("/gameOver",function(req,res){
	res.sendFile('resources/game.html', { root: '.' });
});



app.get("/",function(req,res){
	res.sendFile('resources/form.html', { root: '.' });
	session.loggedIn = false;
});

///The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
 res.status(404);
  res.sendFile('resources/404.html', { root: '.' });

});