var express = require('express');
var app = express();
var http = require("http");
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
		let hashPass = password.hash();
    if (fs.existsSync("users.json")){
      let data = fs.readFileSync("users.json");
      let ob = JSON.parse(date);
     
      for (i in ob) {
				if (ob[i].username == username)
					if (ob[i].parola == hashPass) 
						return true;
					break;
      }
    }
		return false;
}

app.listen(5000);
console.log("connection succsessful!");

app.get("/",function(req,res){
	res.sendFile('resources/form.html', { root: '.' });
});
app.get("/form.css",function(req,res){
	res.sendFile('resources/form.css', { root: '.' });
});
app.get("/logic.js",function(req,res){
	res.sendFile('resources/logic.js', { root: '.' });
});
	
/*
// la completarea formularului de login
// verificăm datele introduse de utilizator
// setăm câmpul de sesiune username 
// și facem redirecturi corespunzătoare
app.post('/login', function(req, res) {
   let form = new formidable.IncomingForm();
   form.parse(req, function(err, fields, files) {
       let user = verifica(fields.username, fields.parola);
       // verificarea datelor de login

      if(user){
        req.session.username = user; 
        // setez userul ca proprietate a sesiunii
        console.log('logged in ' + user);
        res.redirect('/logat'); 
     }
   else
       req.session.username = false;  
   });
});

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