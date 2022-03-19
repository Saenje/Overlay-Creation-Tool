const 	subMultiplier = 1,
		bitMultiplier = 1,
		rotation = 90,
		gap = 20,
		range = 360-gap,
		increment = range/100,
		subWeight = 10*subMultiplier, 
		bitWeight = 0.02*bitMultiplier,
		progressBounds = {
			start: gap/2+rotation,
			end: gap/2+rotation+range
		};


let 	subQuantity = 2,
		bitQuantity = 500,
		supportMultiplier = [(subWeight*subQuantity)+(bitWeight*bitQuantity)]*increment,
		percentage = progressBounds.start+supportMultiplier,
		barThickness = 2 + (supportMultiplier * 2 / range),
		trackThickness = 1 + (supportMultiplier * 2 / range);
		barRed = 0 + (supportMultiplier * 40 / range);
		barGreen = 120 + (supportMultiplier * 175 / range);
		barBlue = 120 + (supportMultiplier * 175 / range);
		barRGB = `${barRed}, ${barGreen}, ${barBlue}`;

console.log(`Bar Increment/%: ${increment},
Support Multiplier: ${supportMultiplier},
Bar Range: ${range},
Bar RGB: ${barRGB}`);

//Progress bar canvas
function setup() {
    		angleMode(DEGREES);
			let canvas = createCanvas(128, 128);
			let x = 4+(windowWidth - width) / 2;
			let y = 6+(windowHeight - height) / 2;
			canvas.position(x, y);
}

//Progress bar element		
function draw() {
			stroke(128, 128, 128, 50);
			strokeWeight(trackThickness);
			noFill();
			arc(64, 64, 96, 96, progressBounds.start, progressBounds.end);
		
			stroke(barRed, barGreen, barBlue);
			strokeWeight(barThickness);
			noFill();
			arc(64, 64, 96, 96, progressBounds.start, percentage);
			noLoop();
}

// //Frame for supporter text used in alert.
// const alertFrame = document.getElementById('frame');
// const ctx = alertFrame.getContext('2d');
// alertFrame.width = window.innerWidth;
// alertFrame.height = window.innerHeight;
// let particleArray = [];

// //Blade path for cutting supporter text.
// let blade = {
// 	x: null,
// 	y: null,
// 	radius: 50
// }

// window.addEventListener('mousemove', function(event){
// 	blade.x = event.x;
// 	blade.y = event.y;
// 	console.log(blade.x, blade.y)
// });

// ctx.fillStyle = 'white';
// ctx.font = '30px Verdana';
// ctx.fillText('A', 0, 40);








	
