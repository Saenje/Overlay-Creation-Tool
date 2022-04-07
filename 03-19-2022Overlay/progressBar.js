const bar = new Object();

bar.rotation = 90;
bar.gap = 56;
bar.width = 96;
bar.height = 96;
bar.followMultiplier = 1;
bar.subMultiplier = 1;
bar.cheerMultiplier = 1;
bar.follows = 4;
bar.subs = 0;
bar.cheers = 380;
bar.range = 360-bar.gap;
bar.increment = bar.range / 100;
bar.start = bar.gap / 2 + bar.rotation;
bar.end = bar.gap / 2+ bar.rotation + bar.range;
bar.followWeight = 4*bar.followMultiplier;
bar.subWeight = 10*bar.subMultiplier;
bar.cheerWeight = 0.02*bar.cheerMultiplier;
bar.multiplier = [(bar.follows * bar.followWeight) + (bar.subs * bar.subWeight) + (bar.cheers * bar.cheerWeight)] * bar.increment;
bar.current = bar.start + bar.multiplier;
bar.percentage = Math.floor((bar.multiplier / bar.increment)*100);
bar.thickness = 2 + (bar.multiplier * 2 / bar.range);
bar.frame = 1 + (bar.multiplier * 2 / bar.range);
bar.red = 0 + (bar.multiplier * 80 / bar.range);
bar.green = 120 + (bar.multiplier * 175 / bar.range);
bar.blue = 120 + (bar.multiplier * 175 / bar.range);
bar.color = `${bar.red}, ${bar.green}, ${bar.blue}`;

console.log(bar)

const ring = function(sketch){
	let x = window.innerWidth;
	let y = window.innerHeight;

	//Progress canvas
	sketch.setup = function(){
		sketch.angleMode(sketch.DEGREES);
		sketch.createCanvas(x, y);
	}

	//Progress element	
	sketch.draw = function(){
		sketch.stroke(192, 192, 192, 192);
		sketch.strokeWeight(bar.frame);
		sketch.noFill();
		sketch.arc(x/2, y/2, bar.width, bar.height, bar.start, bar.end);
		sketch.stroke(bar.red, bar.green, bar.blue);
		sketch.strokeWeight(bar.thickness);
		sketch.noFill();
		sketch.arc(x/2, y/2, bar.width, bar.height, bar.start, bar.current);
		sketch.noLoop();
	}
}

let progress = new p5(ring);

let incrementRates = [1, 20, 50, 80, 100]


bar.maximum = 10000
bar.change = 7000

bar.display = (bar.percentage/100).toFixed(2)
bar.update = $('#percentage').text(bar.display)

function increment(){
	let value = +bar.update.text()*100;
	console.log(value);
	if (value < bar.maximum){
		value += bar.change/100;
		display = (value/100).toFixed(2);
		bar.update.text(display);
	} else {
		bar.update.text((bar.maximum/100).toFixed(2))
	}
	setTimeout(increment, bar.maximum/1000)
}


increment();







	
