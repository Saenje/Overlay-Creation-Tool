const 	subMultiplier = 1,
		bitMultiplier = 1,
		rotation = 90,
		gap = 56,
		range = 360-gap,
		increment = range / 100,
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
	let r = parseInt(Math.random()*192);
	let g = parseInt(Math.random()*256)+128;
	let b = parseInt(Math.random()*256)+128;
	let colorOpacity = parseInt(Math.random()*256)+128;
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

const testText = document.getElementById('testdiv');
testText.innerHTML = "TEST TEXT";

const progressPercentage = document.getElementById('progressPercentage');
progressPercentage.innerHTML = `${roundedPercentage}`;

//Frame for supporter text used in alert.
const canvas = document.getElementById('particleCanvas');
const particleCanvas = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = 0;
let adjustY = 320;

//Blade path for cutting through supporter text.
const blade = {
	x: null,
	y: null,
	radius: 32
}

let inputFont = new FontFace(
	"Titillium",
	"url(https://fonts.googleapis.com/css2?family=Titillium+Web:wght@600&display=swap)"
  );
let inputText = 'Extremely Long Username';

window.addEventListener('mousemove', function(position){
	blade.x = position.x;
	blade.y = position.y;
// console.log(blade.x, blade.y)
})

particleCanvas.fillStyle = 'green';
particleCanvas.font = '24px Tahoma';
particleCanvas.fillText(inputText, 32, 64);
particleCanvas.strokeStyle = 'white';
particleCanvas.strokeRect(4, 0, canvas.width-16, 96)
const textCoordinates = particleCanvas.getImageData(0, 0, canvas.width*4, 2160);

let canvasCenter = {
	x: window.innerWidth/2,
	y: window.innerHeight/2
}

class Particle {
	constructor(x, y, opacity){
		this.x = x;
		this.y = y;
		this.size = 2;
		this.red = 0;
		this.green = 255;
		this.blue = 255;
		this.opacity = opacity
		this.color = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`;
		//saving position for particles to return to
		this.baseColor = this.color;
		this.baseX = this.x;
		this.baseY = this.y;
		this.baseOpacity = this.opacity
		this.denisty = (Math.random() * 80 + 1);
	}
	draw(){
		particleCanvas.fillStyle = this.color;
		particleCanvas.beginPath();
		particleCanvas.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		particleCanvas.closePath();
		particleCanvas.fill();
	}
	update(){
		let dx = blade.x - this.x;
		let dy = blade.y - this.y;
		let distance = Math.sqrt(dx * dx + dy * dy)
		let forceDirectionX = dx / distance;
		let forceDirectionY = dy / distance;
		let maxDistance = blade.radius;
		let force = (maxDistance - distance) / maxDistance;
		let directionX = forceDirectionX * force * this.denisty;
		let directionY = forceDirectionY * force * this.denisty;
		if (distance < blade.radius){
			this.color = 'white';
			this.size = Math.random() * 3;
			this.x -= directionX;
			this.y -= directionY;
		} else {
			if (this.x !== this.baseX){
				let dx = this.x - this.baseX;
				this.x += dx/120;
				this.size = Math.random() * 4;
				if (dx < 1){
					this.size = Math.random() * 4;

				}
			}
			if (this.y !== this.baseY){
				let dy = this.y - this.baseY;
				this.y += dy/120;
				this.size = Math.random() * 4;
				if (dy < 1){
					this.size = Math.random() * 4;

				}
			}
		}
		if (distance < blade.radius + 1){
			this.size = Math.random() * 2;
			this.color = 'white';
		}
	}
}



function initialize() {
	particleArray = [];
	for (let y = 0, y2 = textCoordinates.height; y < y2; y++){
		for (let x = 0, x2 = textCoordinates.width; x < x2; x++){
			currentDatapoint = (y * 4 * textCoordinates.width) + (x + 4) + 3;
			if (textCoordinates.data[currentDatapoint] > 0){				
				let currentOpacity = textCoordinates.data[currentDatapoint]/255; //127 returns as 0.5
				let positionX = x + adjustX;
				let positionY = y + adjustY;
				particleArray.push(new Particle(positionX * 0.5, positionY * 2.0, currentOpacity));
			}
		}
	}

	// for (let i = 0; i < 400; i++){
	// 	let x = Math.random() * canvas.width/2;
	// 	let y = Math.random() * canvas.height/2;
	// 	particleArray.push(new Particle(x, y));
	// }
}

initialize();
// console.log(particleArray);

function animate(){
	particleCanvas.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < particleArray.length; i++){
		particleArray[i].draw();
		particleArray[i].update();
	}
	requestAnimationFrame(animate);
}

animate();







	
