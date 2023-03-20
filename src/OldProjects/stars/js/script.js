function setup() {
	createCanvas(400, 400)
	estrelas = []
	for (let i = 1; i <= 600; i++) {
		estrelas.push(new Estrela())
	}
}

function draw() {
	background(0)
	translate(width / 2, height / 2)
	fill(159)
	line(50, 50, 250, 250)
	for (let i in estrelas) {
		estrelas[i].estrela_update()
		estrelas[i].pintar_estrela()
	}
}
