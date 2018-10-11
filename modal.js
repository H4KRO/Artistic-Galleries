function openModal(imageToLoad){
	var modal = document.getElementById("modal");
	modal.style.display = "block";
	modal.style.animationName = "modalIn";
	modal.style.animationDuration = "1s";

	document.body.style.overflow = "hidden";
/*
	var imageToDisplay = document.getElementById("modalImageToDisplay");
	imageToDisplay.src = imageToLoad.src;
	imageToDisplay.setAttribute("imageId", imageToLoad.getAttribute("imageId"));

	var pagination = document.getElementById("pagination");
	pagination.innerText = (parseInt(imageToLoad.getAttribute("imageId"))+1) + "/" + (document.getElementsByClassName("modalImageToDisplay").length+2);
	*/

	openImage(parseInt(imageToLoad.getAttribute("imageId")));
}

function getCurrentId(){
	return parseInt(document.getElementById("modalImageToDisplay").getAttribute("imageId"));
}

function getNbOfImages(){
	return parseInt(document.getElementsByClassName("modalImage").length);
}

function nextImage(){
	if(getCurrentId() == getNbOfImages()-1){
		openImage(0);
	}else{
		openImage(getCurrentId()+1);	
	}

}

function previousImage(){
	if(getCurrentId() == 0){
		openImage(getNbOfImages() - 1);
	}else{
		openImage(getCurrentId() - 1)
	}
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

    pagination.innerText = (newId+1) + "/" + getNbOfImages();
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

document.onkeydown = function(e) {
    switch (e.keyCode) {
    	case 27:
    		closeModal();
    		break;
        case 37:
            previousImage();
            break;
        case 39:
            nextImage();
            break;
    }
};

window.onload = function(){
	modalInit();
}