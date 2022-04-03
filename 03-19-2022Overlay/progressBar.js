const 	followMultiplier = 1,
		subMultiplier = 1,
		bitMultiplier = 1,
		rotation = 90,
		gap = 56,
		range = 360-gap,
		increment = range / 100,
		followWeight = 1 * followMultiplier,
		subWeight = 10 * subMultiplier, 
		bitWeight = 0.02 * bitMultiplier,
		progressBounds = {
			start: gap / 2 + rotation,
			end: gap / 2+ rotation + range
		};

let 	subQuantity = 1,
		bitQuantity = 500,
		supportMultiplier = [(subWeight * subQuantity) + (bitWeight * bitQuantity)] * increment,
		currentProgress = progressBounds.start + supportMultiplier,
		percentage = supportMultiplier / increment;
		roundedPercentage = percentage.toFixed(2);
		barThickness = 2 + (supportMultiplier * 2 / range),
		trackThickness = 1 + (supportMultiplier * 2 / range);
		barRed = 0 + (supportMultiplier * 80 / range);
		barGreen = 120 + (supportMultiplier * 175 / range);
		barBlue = 120 + (supportMultiplier * 175 / range);
		barRGB = `${barRed}, ${barGreen}, ${barBlue}`;

function randomColor() {
	let r = null;
	let g = parseInt(Math.random()*256)+192;
	let b = parseInt(Math.random()*256)+192;
	if (g > 240){
		if (b > 240){
			r = 192;
		}
	} else {
		r = 0;
	}
	let colorOpacity = (parseInt(Math.random()*256)+128)/255;
	return `rgba(${r}, ${g}, ${b}, ${colorOpacity})`
}

console.log(`Bar Increment: ${increment},
Percentage Completed: ${percentage},
Support Multiplier: ${supportMultiplier},
Bar Range: ${range},
Bar RGB: ${barRGB}`);

//Progress bar canvas
document.querySelector('#defaultAnimation').getBoundingClientRect().left // X
document.querySelector('#defaultAnimation').getBoundingClientRect().top // X
let barRect = defaultAnimation.getBoundingClientRect();
let barWidth = 128;
let barHeight = 128;

function setup() {
    		angleMode(DEGREES);
			let canvas = createCanvas(barWidth, barHeight);
			let x = (windowWidth - width) / 2;
			let y = (windowHeight - height) / 2;
			canvas.position(x, y);
}

//Progress bar element		
function draw() {
			stroke(180, 180, 180, 80);
			strokeWeight(trackThickness);
			noFill();
			arc(barWidth/2, barHeight/2, 96, 96, progressBounds.start, progressBounds.end);
			stroke(barRed, barGreen, barBlue);
			strokeWeight(barThickness);
			noFill();
			arc(barWidth/2, barHeight/2, 96, 96, progressBounds.start, currentProgress);
			noLoop();
}







	
