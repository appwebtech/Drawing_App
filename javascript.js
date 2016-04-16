/*
   Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
   
   The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
   
   Joseph M Mwania CEO the appwebtech 
    

*/

$(function(){

	var canvas =document.getElementById("paint");
	var context = canvas.getContext('2d');
	
//painting erasing variables. 


//declare variables
var paint = false;  // we r NOT painting/erasing
var paint_erase = "paint";  // painting or erasing
var canvas = document.getElementById("paint"); // get canvas content
var ctx = canvas.getContext("2d"); // to get 2d context
var container = $("#container"); //get container
var mouse = {x: 0, y: 0}; //mouse default co-ordinates

//on load saved work from local storage
if(localStorage.getItem("imgCanvas") != null);{
	var img = new Image();
	img.onload = function(){
		ctx.drawImage(img, 0, 0);
	}
	img.src = localStorage.getItem("imgCanvas");
};

//setting drawing parameters
ctx.lineWidth = 3;
ctx.lineJoin = "round";
ctx.lineCap = "round";

//clicking inside container
container.mousedown(function(e){
	paint = true;
	ctx.beginPath();
	mouse.x = e.pageX - this.offsetLeft;
	mouse.y = e.pageY - this.offsetTop;
	ctx.moveTo(mouse.x, mouse.y);
});
//move the mouse while holding mouse key
container.mousemove(function(e){
	mouse.x = e.pageX - this.offsetLeft;
	mouse.y = e.pageY - this.offsetTop;
	if(paint == true){
		if(paint_erase == "paint"){
			//get color input
			ctx.strokeStyle = $("#paintColor").val();
		}else{
			//white color
			ctx.strokeStyle = "white";
		}
		ctx.lineTo(mouse.x, mouse.y);
		ctx.stroke();
	}
});
//mouse up: we are not painting nor erasing.
container.mouseup(function(){
	paint = false;
});

//if we leave container we are not painting or erasing. 
container.mouseleave(function(){
	paint = false;
});
//reset button
$("#reset").click(function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	paint_erase = "paint";
	$("#erase").removeClass("eraseMode");
});

//click on save button
$("#save").click(function(){
	if(typeof(localStorage) != null){
	localStorage.setItem("imgCanvas", canvas.toDataURL());
		
}else{
	window.alert("Your browser doesn't support local storage");
}
});
//erasing
$("#erase").click(function(){
	if(paint_erase == "paint"){
		paint_erase = "erase";
	}else{
		paint_erase = "paint";
	}
	$(this).toggleClass("eraseMode");
});
//change color input
	$("#paintColor").change(function(){
		$("#circle").css("background-color",
		$(this).val());
	});
//change lineWidth using slider
$("#slider").slider({
		min: 3,
		max: 30,
		slide: function(event, ui){
			$("#circle").height(ui.value);
			$("#circle").width(ui.value);
			ctx.lineWidth = ui.value;
		}
	});
	});