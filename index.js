/// modules
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
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
}

function checkUsername(username){
	if (!fs.existsSync(usersPath)){
		console.error(".json doesn't exist");
		return false;
	}

      let data = fs.readFileSync(usersPath);
      let ob = JSON.parse(data);
     
      for (i in ob) {
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
	 
		for (i in ob) {
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
  let data = fs.readFileSync(usersPath);

  // Parse the JSON data into a JavaScript object
  let users = JSON.parse(data);

  // Add the new user data to the JavaScript object
  users.push({ "username": username, "parola": password });

  // Write the updated JavaScript object back to the JSON file
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2)); /// write readable

  console.log("User added successfully.");
  return true;
}

app.listen(5000);
console.log("connection succsessful!");


/// for session to remember loggedIn.
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// for parsing application/json in POST requests.
app.use(bodyParser.json()) 

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
		req.session.loggedIn = true;
		res.sendFile('resources/form.html', { root: '.','loggedIn': true });
	}
	catch (error) {
    console.error('Error parsing JSON:', error);
		res.status(400).send({ message: "internal server error"});
		return;
  }
	
	
});

app.get("/signup",function(req,res){
	if(!req.session.loggedIn){
		res.sendFile('resources/404.html', { root: '.' });
		return;}
	res.sendFile('resources/about.html', { root: '.' });
});

app.post("/about",function(req,res){

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
	}
	catch (error) {
    console.error('Error parsing JSON:', error);
		res.status(400).send({ message: "internal server error"});
		return;
  }
	req.session.loggedIn = true;
	res.sendFile('resources/about.html', { root: '.' });
	 
});


app.get("/about",function(req,res){
	if(!req.session.loggedIn){
		res.sendFile('resources/404.html', { root: '.' });
		return;}
	res.sendFile('resources/about.html', { root: '.' });
});

app.get("/",function(req,res){
	res.sendFile('resources/form.html', { root: '.' });
	req.session.loggedIn = false;
});

///The 404 Route (ALWAYS Keep this as the last route)
app.get('*', (req, res) => {
 res.status(404);
  res.sendFile('resources/404.html', { root: '.' });

});