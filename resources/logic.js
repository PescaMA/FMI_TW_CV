window.onload = function(){
	
	const formElem = document.getElementById('formElem');
	const labels = document.getElementsByTagName('label');

    /// add hover event listener to increase
		for(const element of labels){
				element.addEventListener("mouseover",function(e){
					this.parentElement.className = "increase";
				});
				element.parentElement.addEventListener("mouseleave",function(e){
					this.className = "";
				});
		}
		
		// Load the form data from localStorage
    for (const element of formElem.elements) {
        if (element.name && element.name !="password") {
            const storedValue = localStorage.getItem(element.name);
            if (storedValue) {
                element.value = storedValue; // This also updates the actual HTML input element
            }
        }
    }
		
		/// check if can log in
		if(localStorage.getItem("loggedIn")){
			if(localStorage.getItem("password") == 20367736)
				console.log("LOGGED IN!");
		}

	
  formElem.onsubmit = async (e) => {
    e.preventDefault();
		
		const formData = new FormData(e.currentTarget);
		let msg = validateForm();
		if(msg){
			alert(msg);
			return;
		}
		
		for (const [key, value] of formData) {
			if(key == "password") /// don't store password in plain text!
				localStorage.setItem(key,value.hash());
			else
				localStorage.setItem(key,value);
			
			localStorage.setItem("loggedIn",true);
		}
  };
}

function validateForm(){
	let name = document.getElementById("name");
	let pass = document.getElementById("pass");
	if(!RegExp(/^[a-zA-Z]+$/).test(name.value)){
		return `name ${name.value} must contain only letters! `;
	}
	if(!RegExp(/^.{2,16}$/).test(name.value)){
		return `name ${name.value} must be between 2 and 16 characters! `;
	}
	
	
	if(!RegExp(/[a-zA-Z]/).test(pass.value)){
		return `password must contain at least 1 letter! `;
	}
	if(!RegExp(/[0-9]/).test(pass.value)){
		return `password must contain at least 1 number! `;
	}
	if(!RegExp(/^.{1,32}$/).test(pass.value)){
		return `password must be between 1 and 32 characters! `;
	}
	
	return "";
}

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