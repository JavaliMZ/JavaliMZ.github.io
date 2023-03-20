var caixas = []
var angle_rotation = 0
var step = 1
var step_control = -1

function setup() {
	canvas = createCanvas(500, 500, WEBGL)
	normalMaterial()
	var box = new MengerSponge(0, 0, 0, 200)
	caixas.push(box)
	print(caixas)
}

function mouseClicked() {
	if (caixas.length < 8001) {
		let lista_aux = []
		for (let i = 0; i < caixas.length; i++) {
			var a = caixas[i]
			var new_boxes = a.dividir()
			lista_aux = lista_aux.concat(new_boxes)
		}
		caixas = lista_aux
	} else {
		caixas = []
		caixas.push(new MengerSponge(0, 0, 0, 200))
		print(caixas)
	}
}

function draw() {
	background(51)
	pointLight(255, 255, 255, -150, -250, 510)
	noStroke(255)
	fill(255, 0, 220)
	rotateX(angle_rotation)
	rotateY(angle_rotation * 0.5)
	rotateZ(angle_rotation * 0.1)

	for (var i = 0; i < caixas.length; i++) {
		caixas[i].show()
	}

	angle_rotation += 0.01
}
