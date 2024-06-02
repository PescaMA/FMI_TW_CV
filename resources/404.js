window.onload = function() {
	
	const body = document.body;
	body.style.backgroundImage="url('d0971f47-7ed6-42fe-b4f2-2922ea91eb27.jpg')";
	
  const videos = document.getElementsByTagName("video");
  for (let v of videos) {
    v.style.position = "fixed"; 
    v.style.top = "0";
    v.style.left = "0";
    v.style.width = "100vw";
    v.style.height = "100vh";
    v.style.objectFit = "fit";
    v.style.zIndex = "-1"; // Ensure the video is behind other elements
  }
	
	document.onclick = function(){
		window.location.href = "/";
	};
};