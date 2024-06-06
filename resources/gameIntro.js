
window.addEventListener('DOMContentLoaded', function(){

	// Select the body element
	var body = document.body;

	// Apply styles to the body
	body.style.fontFamily = "Arial, sans-serif";
	body.style.lineHeight = "1.6";
	body.style.margin = "20px";
	body.style.backgroundColor = "#f4f4f4";
	body.style.color = "#333";

	// Select all h1 and h2 elements
	var headings = document.querySelectorAll("h1, h2");

	// Apply styles to h1 and h2 elements
	headings.forEach(function(heading) {
			heading.style.color = "#444";
	});

	// Select all p elements
	var paragraphs = document.querySelectorAll("p");

	// Apply styles to p elements
	paragraphs.forEach(function(paragraph) {
			paragraph.style.margin = "10px 0";
	});
	
	let button = document.getElementById("playGame");
	button.addEventListener("mousedown",(e) => window.location.href = "/game.html");
	
});