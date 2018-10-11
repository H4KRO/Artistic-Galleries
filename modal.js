var speed = 1000;
var isPlaying = false;
var modalOpen = false;

function updateSpeed(){
	document.getElementById("slideshowSpeed").innerText = speed/1000 + "s";
}

function increaseSpeed(){
	speed = speed + 500;
	updateSpeed();
}

function decreaseSpeed(){
	if(speed > 1000){
		speed = speed - 500;
		updateSpeed();
	}
}

function slideshow(){
	if(isPlaying){
		setTimeout(function(){
			if(isPlaying){
				nextImage();
				slideshow();
			}
		}, speed);
	}
}

function startPlaying(){
	if(isPlaying == false){
		isPlaying = true;
		slideshow();
	}
}

function stopPlaying(){
	isPlaying = false;
}

function openModal(imageToLoad){
	var modal = document.getElementById("modal");
	modal.style.display = "block";
	modal.style.animationName = "modalIn";
	modal.style.animationDuration = "1s";

	document.body.style.overflow = "hidden";

	openImage(parseInt(imageToLoad.getAttribute("imageId")));

	modalOpen = true;
	slideshow();
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
			document.getElementById("modalImageName").innerText = images[i].getAttribute("name");
			document.getElementById("modalImageDesc").innerText = images[i].getAttribute("desc");
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
	updateSpeed();
	var images = document.getElementsByClassName("modalImage");
	for(var i = 0; i < images.length; i++){
		images[i].setAttribute("imageId", i);
		images[i].onclick = function(){
			openModal(this);
		}
	}

}

document.onkeydown = function(e) {
	//alert(e.keyCode);
    switch (e.keyCode) {
    	case 27:
    		closeModal();
    		break;
    	case 32:
    		if(!isPlaying){
    			startPlaying();
    		}else{
    			stopPlaying();
    		}
    		break;
        case 37:
            previousImage();
            break;
        case 39:
            nextImage();
            break;
        case 107:
            decreaseSpeed();
            break;
        case 109:
            increaseSpeed();
            break;
    }
};

window.onload = function(){
	modalInit();
}