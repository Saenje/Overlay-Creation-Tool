const 	subMultiplier = 1,
		bitMultiplier = 1,
		rotation = 90,
		gap = 56,
		range = 360-gap,
		increment = range/100,
		subWeight = 10*subMultiplier, 
		bitWeight = 0.02*bitMultiplier,
		progressBounds = {
			start: gap/2+rotation,
			end: gap/2+rotation+range
		};


let 	subQuantity = 9,
		bitQuantity = 500,
		supportMultiplier = [(subWeight*subQuantity)+(bitWeight*bitQuantity)]*increment,
		currentProgress = progressBounds.start+supportMultiplier,
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
			stroke(128, 128, 128, 50);
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

//Blade path for cutting through supporter text.
let blade = {
	x: null,
	y: null,
}

window.addEventListener('mousemove', function(position){
	blade.x = position.x
	blade.y = position.y
console.log(blade.x, blade.y)
})

particleCanvas.fillStyle = 'Green';
particleCanvas.font = '30px Tahoma';
particleCanvas.fillText('Alert Username', 222, 680, 1920);
const textData = particleCanvas.getImageData(0, 0, 100, 100)



// window.addEventListener('mousemove', function(position){
// 	blade.x = position.x;
// 	blade.y = position.y;
// 	blade.radius = 150;
// 	// console.log(blade.x, blade.y)
// });

// particleCanvas.fillStyle = 'Green';
// particleCanvas.font = '30px Tahoma';
// particleCanvas.fillText('Alert Username', 0, 30);
// const data = particleCanvas.getImageData(0, 0, 100, 100);

// class Particle {
// 	constructor(x, y){
// 		this.x = x;
// 		this.y = y;
// 		this.size = 3;
// 		this.baseX = this.x;
// 		this.baseY = this.y;
// 		this.density = (Math.random() * 30) + 1;
// 	}
// 	draw(){
// 		particleCanvas.fillStyle = 'cyan';
// 		particleCanvas.beginPath();
// 		particleCanvas.arc(this.x, this.y, this.size, 0, Math.PI *2);
// 		particleCanvas.closePath();
// 		particleCanvas.fill();
// 	}
// 	update(){
// 		let dx = blade.x - this.x;
// 		let dy = blade.y - this.y;
// 		let distance = Math.sqrt(dx * dx + dy * dy);
// 		let forceDirectionX = dx / distance;
// 		let forceDirectionY = dy / distance;
// 		let maxDistance = blade.radius;
// 		let force = (maxDistance - distance) / maxDistance;
// 		let directionX = forceDirectionX * force * this.density;
// 		let directionY = forceDirectionY * force * this.density;

// 		if (distance < blade.radius){
// 			this.x -= directionX;
// 			this.y -= directionY;
// 		} else {
// 			this.size = 3;
// 		}
// 	}
// }

// function initialize() {
// 	particleArray = [];
// 	for (let i = 0; i < 1000; i++){
// 		let x = Math.random() * canvas.width;
// 		let y = Math.random() * canvas.height;
// 		particleArray.push(new Particle(x, y));
// 	}

// }

// initialize();
// console.log(particleArray);

// function animate(){
// 	particleCanvas.clearRect(0, 0, canvas.width, canvas.height);
// 	for (let i = 0; i < particleArray.length; i++){
// 		particleArray[i].draw();
// 		particleArray[i].update();
// 	}
// 	requestAnimationFrame(animate);
// }
// animate();







	
