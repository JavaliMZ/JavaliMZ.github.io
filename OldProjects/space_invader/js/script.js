let ship
let disparos = []
let invasores = []
let enemy_disparos = []
let tiro_de_ensaio

function setup() {
	createCanvas(1100, 500)
	ship = new SpaceShip()
	for (let i = 0; i < 12; i++) {
		for (let j = 0; j < 5; j++) {
			invasores.push(new Invasor(i * 60 + 80, j * 40 + 20))
		}
	}
}

function draw() {
	background(51)
	ship.show()
	ship.move()
	ship.shoot()

	for (let i = 0; i < invasores.length; i++) {
		invasores[i].show()
	}

	tratar_move_invasores()
	tratar_disparos()
	tratar_enemy_disparos()
}

// ******* //
// funções //
// ******* //

function tratar_disparos() {
	for (disparo in enemy_disparos) {
		if (SAT_collision(ship, enemy_disparos[disparo])) {
			game_over()
		}
	}

	// Criar o primeiro tiro
	if (ship.shoot() != undefined && disparos.length <= 0) {
		disparos.push(new Tiro(ship.shoot()))
	}

	// Cria os tiros seguintes, se a distancia do tiro anterior...
	// ... for maior que 30 pixeis, para criar espaços entre os tiros
	if (ship.shoot() != undefined && disparos.length > 0 && ship.y - disparos[disparos.length - 1].y > 30) {
		disparos.push(new Tiro(ship.shoot()))
	}

	// Desenhar os tiros no ecrã, e actualiza os dados X e Y de cada tiro
	for (let i = 0; i < disparos.length; i++) {
		disparos[i].show()
		disparos[i].update()

		// (Aproveitando o loop para cada tiro)...
		// ... Remover os tiros que já não estão visiveis no ecrã
		if (disparos[i].y < -10) {
			disparos.splice(i, 1)
		}
	}

	// Calcular as distâncias entre cada tiro e cada alvo,...
	// ... para ver se houve colisão. Com o resultado,...
	// ... elimina-se o evasor alvejado, bem como o próprio tiro!

	eliminar_objectos_colididos()
}

function eliminar_objectos_colididos() {
	for (let i = 0; i < disparos.length; i++) {
		for (let j = 0; j < invasores.length; j++) {
			let distance_x = disparos[i].x - invasores[j].x
			let distance_y = disparos[i].y - invasores[j].y
			let distance = sqrt(distance_x ** 2 + distance_y ** 2)
			if (distance <= disparos[i].r + invasores[j].r) {
				invasores.splice(j, 1)
				disparos.splice(i, 1)
				eliminar_objectos_colididos()
				break
			}
		}
	}
}

function tratar_move_invasores() {
	let x_limit_left = width - (width * 95) / 100
	let x_limit_right = width - (width - (width * 95) / 100)
	for (let i = 0; i < invasores.length; i++) {
		if (invasores[i].x < x_limit_left) {
			invasores[i].y += 20
			invasores[i].dir = [1, 0]
		} else if (invasores[i].x > x_limit_right) {
			invasores[i].y += 20
			invasores[i].dir = [-1, 0]
		}
		invasores[i].update()
	}
}

function tratar_enemy_disparos() {
	for (let i = 0; i < invasores.length; i++) {
		if (random(0, 500) < 4) {
			enemy_disparos.push(new Enemy_Tiro(invasores[i].x, invasores[i].y))
		}
	}

	for (let i = 0; i < enemy_disparos.length; i++) {
		enemy_disparos[i].show()
		enemy_disparos[i].update()

		if (enemy_disparos[i].y > height + 50) {
			enemy_disparos.splice(i, 1)
		}
	}
}

function game_over() {
	frameRate(0.00005)
}
