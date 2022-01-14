let cam
let astros = []
let imgs = {}
let bg_imagem

function criar_imagens_do_sistema_solar() {
	imgs['sol']      = loadImage('img/sol.jpg')
	imgs['mercurio'] = loadImage('img/mercurio.jpg')
	imgs['venus']    = loadImage('img/venus.jpg')
	imgs['terra']    = loadImage('img/terra.jpg')
	imgs['marte']    = loadImage('img/marte.jpg')
	imgs['jupiter']  = loadImage('img/jupiter.jpg')
	imgs['saturno']  = loadImage('img/saturno.jpg')
	imgs['urano']    = loadImage('img/urano.jpg')
	imgs['neptuno']  = loadImage('img/neptuno.jpg')
	imgs['plutao']   = loadImage('img/plutao.jpg')
	imgs['lua']      = loadImage('img/lua.jpg')
	imgs['lua1']     = loadImage('img/lua1.jpg')
	imgs['lua2']     = loadImage('img/lua2.jpg')
	imgs['lua3']     = loadImage('img/lua3.jpg')
	imgs['lua4']     = loadImage('img/lua4.jpg')
	imgs['lua5']     = loadImage('img/lua5.jpg')
	imgs['lua6']     = loadImage('img/lua6.jpg')
	imgs['lua7']     = loadImage('img/lua7.jpg')
	imgs['lua8']     = loadImage('img/lua8.jpg')
	imgs['lua9']     = loadImage('img/lua9.jpg')
	imgs['lua10']    = loadImage('img/lua10.jpg')
	imgs['lua11']    = loadImage('img/lua11.jpg')
}

function criar_sistema_solar() {
	let sol = new Sun(0, 60, 1, 0, imgs['sol'])

	let mercurio = new Planet(100, 5, 40, 45, sol, imgs['mercurio'])
	let venus    = new Planet(145, 10, 24, 22, sol, imgs['venus'])
	let terra    = new Planet(180, 10.5, 11, 80, sol, imgs['terra'])
	let marte    = new Planet(250, 7, 3.8, 16, sol, imgs['marte'])
	let jupiter  = new Planet(425, 25, 0.01009, 150, sol, imgs['jupiter'])
	let saturno  = new Planet(575, 6, 0.003009, 245, sol, imgs['saturno'])
	let urano    = new Planet(900, 11.5, 0.001509, 135, sol, imgs['urano'])
	let neptuno  = new Planet(1375, 10.2, 0.008009, 468, sol, imgs['neptuno'])
	let plutao   = new Planet(2000, 2.5, 0.1, 0, sol, imgs['plutao'])

	let lua            = new Moon(15, 2.5, 30, 0.95, terra, imgs['lua'])
	let lua_de_marte   = new Moon(15, 2.1, 60, 0.95, marte, imgs[`lua${floor(random(1, 11))}`])
	let lua_de_marte_2 = new Moon(10.5, 2.9, 50, 0.95, marte, imgs[`lua${floor(random(1, 11))}`])

	astros.push(
		sol,
		mercurio,
		venus,
		terra,
		marte,
		jupiter,
		saturno,
		urano,
		neptuno,
		plutao,
		lua,
		lua_de_marte,
		lua_de_marte_2
	)

	for (let i = 0; i < 79; i++) {
		let dist, r, s, a, img
		dist  = random(1.5, 50)
		r     = random(0.25, 2.5)
		s     = random(50, 300)
		a     = random(0, 360)
		img   = imgs[`lua${floor(random(1, 11))}`]
		lua_i = new Moon(dist, r, s, a, jupiter, img)
		astros.push(lua_i)
	}

	for (let i = 0; i < 82; i++) {
		let dist, r, s, a, img
		dist  = random(1.5, 75)
		r     = random(0.25, 2.5)
		s     = random(3, 20)
		a     = random(0, 360)
		img   = imgs[`lua${floor(random(1, 11))}`]
		lua_i = new Moon(dist, r, s, a, saturno, img)
		astros.push(lua_i)
	}

	for (let i = 0; i < 27; i++) {
		let dist, r, s, a, img
		dist  = random(1.5, 100)
		r     = random(0.25, 2.5)
		s     = random(2, 12)
		a     = random(0, 360)
		img   = imgs[`lua${floor(random(1, 11))}`]
		lua_i = new Moon(dist, r, s, a, urano, img)
		astros.push(lua_i)
	}

	for (let i = 0; i < 14; i++) {
		let dist, r, s, a, img
		dist  = random(1.5, 125)
		r     = random(0.25, 2.5)
		s     = random(4, 26)
		a     = random(0, 360)
		img   = imgs[`lua${floor(random(1, 11))}`]
		lua_i = new Moon(dist, r, s, a, neptuno, img)
		astros.push(lua_i)
	}
}

function speed_devagar() {
	for (astro in astros) {
		astros[astro].speed *= 0.75
	}
}

function speed_rapido() {
	for (astro in astros) {
		astros[astro].speed *= 1.5
	}
}

function luzes() {
	pointLight(255, 255, 255, 50, 0, 0)
	pointLight(255, 255, 255, 0, 50, 0)
	pointLight(255, 255, 255, 0, 0, 50)
	pointLight(255, 255, 255, -50, 0, 0)
	pointLight(255, 255, 255, 0, -50, 0)
}

function preload() {
	bg_imagem = loadImage('img/bgimagem.jpg')
	criar_imagens_do_sistema_solar()
	criar_sistema_solar()
}

function setup() {
	createCanvas(windowWidth * 0.9, windowHeight * 0.8, WEBGL)
	cam = createEasyCam({ distance: 1000 })
	cam.distance_max = 1999
}

function draw() {
	background(0)
	noStroke()

	// A próxima esfera é uma bola gigante com textura de estrelas e coisas do espaço ...
	// ... A câmera e os astres todos estam dentro desta esfera. É para dar um fundo ...
	// ... que roda e acompanha a câmera
	
	texture(bg_imagem)
	sphere(2000)

	astros[0].show() // Este astro é o sol. É apresentado... 
	                 // ... sozinho e em primeiro lugar para ...
	                 // ... não ser afectado pelas luzes e... 
						  // ... sombras. Dá impressão que é o Sol ...
						  // ... que ilumina o resto. A seguir, crio ...
						  // ... os pontos de luzes.

	luzes()
	for (let i = 1; i < astros.length; i++) {
		astros[i].show()
	}
}
