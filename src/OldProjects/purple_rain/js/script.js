let chuva

function setup() {
	createCanvas(500, 500)
	chuva = new Chuva(1000)
}

function draw() {
	background(0)
	chuva.update()
	chuva.show()
}
