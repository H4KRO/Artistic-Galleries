function openModal(imageToLoad){
	var modal = document.getElementById("modal");
	modal.style.display = "block";
	modal.style.animationName = "modalIn";
	modal.style.animationDuration = "1s";

	document.body.style.overflow = "hidden";

	var imageToDisplay = document.getElementById("modalImageToDisplay");
	imageToDisplay.src = imageToLoad.src;
	imageToDisplay.setAttribute("imageId", imageToLoad.getAttribute("imageId"));
}

function nextImage(){
	var currentId = document.getElementById("modalImageToDisplay").getAttribute("imageId");
	var nbOfImages = document.getElementsByClassName("modalImage").length;
	var nextId = 0;
	if(currentId + 1 < nbOfImages){
		nextId++;
	}
	openImage(nextId);
}

function previousImage(){
	var currentId = document.getElementById("modalImageToDisplay").getAttribute("imageId");
	var nbOfImages = document.getElementsByClassName("modalImage").length;
	var previousId = nbOfImages-1;
	if(currentId - 1 >= 0){
		previousId = previousId - 1;
	}
	openImage(previousId);
}

function openImage(newId){
	var imageToDisplay = document.getElementById("modalImageToDisplay");

	var images = document.getElementsByClassName("modalImage");
	for(var i = 0; i < images.length; i++){
		if(i == newId){
			imageToDisplay.src = images[i].src;
			imageToDisplay.setAttribute("imageId", newId);
		}
	}
	
}

function closeModal(){
	var modal = document.getElementById("modal");
	modal.style.animationName = "modalOut";
	modal.style.animationDuration = ".5s";
	setTimeout(function(){
		modal.style.display = "none";
        document.body.style.overflow = "auto";
	}, 500);


}

function modalInit(){
	var images = document.getElementsByClassName("modalImage");
	for(var i = 0; i < images.length; i++){
		images[i].setAttribute("imageId", i);
		images[i].onclick = function(){
			openModal(this);
		}
	}
}

window.onload = function(){
	modalInit();
}