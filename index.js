var express = require('express');
const bodyParser = require('body-parser')
var app = express();
var http = require("http");
const path = require('path');
const fs = require('fs');

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

function checkPassword (username, password) {
    if (fs.existsSync("users.json")){
      let data = fs.readFileSync("users.json");
      let ob = JSON.parse(date);
     
      for (i in ob) {
				if (ob[i].username == username)
					if (ob[i].parola == password) 
						return true;
					break;
      }
    }
		return false;
}

app.listen(5000);
console.log("connection succsessful!");


// for parsing application/json in POST requests.
app.use(bodyParser.json()) 

/// give access to every file present in the folder resources.
app.use(express.static(path.join(__dirname, 'resources'))); 

app.post("/about",function(req,res){

	
	let formData = req.body;
	console.log(formData);
	if(!checkPassword(formData.user_name, formData.password)){
		res.status(400).send({ message: 'Invalid credentials' });
		return;
	}
	res.sendFile('resources/about.html', { root: '.' });
});
app.get("/about",function(req,res){
	res.sendFile('resources/about.html', { root: '.' });
});

app.get("/",function(req,res){
	res.sendFile('resources/form.html', { root: '.' });
});



	
/*
// dacă utilizatorul s-a logat, încărcăm pagina
// logout.ejs prin care îi confirmăm loginul
// și afișăm un buton pentru logout
app.get('/logat', function(req, res) {
   res.render('pagini/logout',{'nume':req.session.username});
});

// la vizitarea home, încărcăm pagina de login
app.get('/', function(req, res) {
   res.render('pagini/log');
});

// dacă am dat click pe linkul 'logout',
// scoatem utilizatorul din sesiune și 
// facem redirect către pagina inițială de login
app.get('/logout', function(req, res) {
   req.session.username = false;
   console.log('logged out');
   res.redirect('/');
});
*/