window.onload = function(){
	
	const formElem = document.getElementById('formElem');

    // Load the form data from localStorage
    for (const element of formElem.elements) {
        if (element.name) {
            const storedValue = localStorage.getItem(element.name);
            if (storedValue) {
                element.value = storedValue; // This updates the actual HTML input element
            }
        }
    }
	
  formElem.onsubmit = async (e) => {
    e.preventDefault();
		
		const formData = new FormData(e.currentTarget);
		
		for (const [key, value] of formData) {
			if(key == "password")
				localStorage.setItem(key,value.hash());
			else
				localStorage.setItem(key,value);
			
			console.log(key, value)
		}
  };
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