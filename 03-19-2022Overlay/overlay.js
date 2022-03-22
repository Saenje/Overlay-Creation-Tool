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


let 	subQuantity = 3,
		bitQuantity = 364,
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

console.log(`Bar Increment: ${increment},
Percentage Completed: ${percentage},
Support Multiplier: ${supportMultiplier},
Bar Range: ${range},
Bar RGB: ${barRGB}`);

//Progress bar canvas
document.querySelector('#defaultAnimation').getBoundingClientRect().left // X
document.querySelector('#defaultAnimation').getBoundingClientRect().top // X
let barRect = defaultAnimation.getBoundingClientRect();
console.log(barRect)
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

const progressPercentage = document.getElementById('progressPercentage');
progressPercentage.innerHTML = `${roundedPercentage}`;

//Frame for supporter text used in alert.
const canvas = document.getElementById('particleCanvas');
const particleCanvas = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = -30;
let adjustY = 360;

//Blade path for cutting through supporter text.
const blade = {
	x: null,
	y: null,
	radius: 12
}

window.addEventListener('mousemove', function(position){
	blade.x = position.x;
	blade.y = position.y;
console.log(blade.x, blade.y)
})

particleCanvas.fillStyle = 'green';
particleCanvas.font = '48px Tahoma';
particleCanvas.fillText('Alert Username', 30, 72, 2560);
// particleCanvas.strokeStyle = 'white';
// particleCanvas.strokeRect(0, 0, 400, 400)
const textCoordinates = particleCanvas.getImageData(0, 0, 2160, 2160);

class Particle {
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.size = 3;
		this.color = 'cyan';
		//saving position for particles to return to
		this.baseColor = this.color;
		this.baseX = this.x;
		this.baseY = this.y;
		this.denisty = (Math.random() * 80) + 1;
		
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
			this.color = 'rgb(128, 0, 0)';
			this.size = Math.random() * 2;
			this.x -= directionX;
			this.y -= directionY;
		} else {
			if (this.x !== this.baseX){
				let dx = this.x - this.baseX;
				this.x += dx/160;
				this.size = Math.random() * 3;
				if (dx < 1){
					this.size = Math.random() * 3;
				}
			}
			if (this.y !== this.baseY){
				let dy = this.y - this.baseY;
				this.y += dy/160;
				this.size = Math.random() * 3;
				if (dy < 1){
					this.size = Math.random() * 3;
				}
			}
		}
		if (distance < blade.radius + 8){
			this.size = Math.random() * 2;
			this.color = 'rgb(128, 0, 0)';
		}
	}
}

function initialize() {
	particleArray = [];
	for (let y = 0, y2 = textCoordinates.height; y < y2; y++){
		for (let x = 0, x2 = textCoordinates.width; x < x2; x++){
			if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x + 4) + 3] > 208){
				let positionX = x + adjustX;
				let positionY = y + adjustY;
				particleArray.push(new Particle(positionX * 0.45, positionY * 1.8));
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







	
