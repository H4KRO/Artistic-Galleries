var modal;
var modalOpen;
var images;
var currentImageId;
var modalImage;
var imageName;
var imageDesc;
var slideshowSpeed;
var speed = 1000;
var isPlaying = false;
var modalOpen = false;

function updateSpeed(){
	slideshowSpeed.innerText = speed/1000 + "s";
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

function nextImage(){
	if(currentId == images.length - 1) openImage(0);
	else openImage(currentId + 1);
}

function previousImage(){
	if(currentId == 0) openImage(images.length - 1);
	else openImage(currentId - 1); 
}

function loadImage(image){
	modalImage.src = image.src;
	imageName.innerText = image.getAttribute("name");
	imageDesc.innerText = image.getAttribute("desc");
}

function openImage(imageId){
	currentId = imageId;
	loadImage(images[imageId]);
}

function openModal(imageToLoad){
	modal.style.display = "block";
	modal.style.animationName = "modalIn";
	modal.style.animationDuration = "1s";

	document.body.style.overflow = "hidden";

	currentImageId = parseInt(imageToLoad.getAttribute("imageId"));
	openImage(currentImageId);

	modalOpen = true;
}

function closeModal(){
	modal.style.animationName = "modalOut";
	modal.style.animationDuration = ".5s";
	setTimeout(function(){
		modal.style.display = "none";
        document.body.style.overflow = "auto";
	}, 500);
}

document.onkeydown = function(e) {
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

function modalInit(){
	modal = document.getElementById("modal");
	images = document.getElementsByClassName("modalImage");
	slideshowSpeed = document.getElementById("slideshowSpeed");

	for(var i = 0; i < images.length; i++){
		images[i].setAttribute("imageId", i);
		images[i].onclick = function(){openModal(this);}
	}

	modalImage = document.getElementById("modalImageToDisplay");
	imageName = document.getElementById("modalImageName");
	imageDesc = document.getElementById("modalImageDesc");

}



window.onload = function(){
	modalInit();
}

