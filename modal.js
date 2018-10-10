function openModal(imgsrc){
	var modal = document.getElementById("modal");
	modal.style.display = "block";
	modal.style.animationName = "modalIn";
	modal.style.animationDuration = "1s";
	document.getElementById("modalImageToDisplay").src = imgsrc;
	alert(i);
}

function closeModal(){
	var modal = document.getElementById("modal");
	modal.style.animationName = "modalOut";
	modal.style.animationDuration = "1s";
	setTimeout(function(){
		modal.style.display = "none";
	}, 1000);
}

function modalInit(){
	var images = document.getElementsByClassName("modalImage");
	for(var i = 0; i < images.length; i++){
		images[i].setAttribute("imageId", i);
		images[i].onclick = function(){
			openModal(this.src);
		}
	}
}

window.onload = function(){
	modalInit();
}