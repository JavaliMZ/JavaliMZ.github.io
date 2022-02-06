function load_all_images() {
	cubo_morto = loadImage('img/cubo_cinza_escuro.jpg')

	game_over_imagem = loadImage('img/game_over_img.jpg')

	cubo_cores_img.push(loadImage('img/cubo_amarelo.jpg'))
	cubo_cores_img.push(loadImage('img/cubo_azul_claro.jpg'))
	cubo_cores_img.push(loadImage('img/cubo_azul_escuro.jpg'))
	cubo_cores_img.push(loadImage('img/cubo_laranja.jpg'))
	cubo_cores_img.push(loadImage('img/cubo_roxo.jpg'))
	cubo_cores_img.push(loadImage('img/cubo_verde.jpg'))
	cubo_cores_img.push(loadImage('img/cubo_vermelho.jpg'))

	botoes_img['buttom_pause_light_on'] = loadImage('img/botao_pause_light.jpg')
	botoes_img['buttom_pause_light_off'] = loadImage('img/botao_pause_offlight.jpg')
	botoes_img['buttom_start_light_on'] = loadImage('img/botao_start_light.jpg')
	botoes_img['buttom_start_light_off'] = loadImage('img/botao_start_offlight.jpg')
}

function criar_objecto_figura_nova() {
	figura_se_movendo = { ...figura_preview }
	return new Figura(cubo_cores_img)
}

function figura_cai_1_linha(figura, cubos_fixos, grid) {
	let movimento_valido = true

	for (let cubo in figura.cubos) {
		let next_x = figura.cubos[cubo].x
		let next_y = figura.cubos[cubo].y + 1

		if (next_y >= grid.linhas || grid.grid[next_y][next_x] >= 1) {
			movimento_valido = false
		}
	}

	if (movimento_valido) {
		for (let cubo in figura.cubos) {
			figura.cubos[cubo].y++
		}
	}

	if (!movimento_valido) {
		for (let cubo in figura.cubos) {
			if (figura.cubos[cubo].y <= 0) {
				game_over()
			}
		}
		fixar_cubos(figura, cubos_fixos, grid)
		figura_preview = criar_objecto_figura_nova()
	}
}

function fixar_cubos(figura, cubos_fixos, grid) {
	pontos += 20
	for (let cubo in figura.cubos) {
		cubos_fixos.push(figura.cubos[cubo])
		let x = figura.cubos[cubo].x
		let y = figura.cubos[cubo].y

		grid.grid[y][x] = 1
	}
	verificar_se_linha_completa(cubos_fixos, grid)
}

function figura_vai_para_o_lado(figura, grid, direccao) {
	let movimento_valido = true

	for (let cubo in figura.cubos) {
		let next_x = figura.cubos[cubo].x + direccao
		let next_y = figura.cubos[cubo].y

		if (next_x < 0 || next_x >= grid.colunas || grid.grid[next_y][next_x] >= 1) {
			movimento_valido = false
		}
	}

	if (movimento_valido) {
		for (let cubo in figura.cubos) {
			figura.cubos[cubo].x += direccao
		}
	}
}

function controlo_dos_lados(controlo_da_speed_dos_lados) {
	if (
		(controlo_da_speed_dos_lados % 3 == 0 && controlo_da_speed_dos_lados < 4) ||
		(controlo_da_speed_dos_lados % 3 == 0 && controlo_da_speed_dos_lados > 10)
	) {
		if (keyIsDown(LEFT_ARROW)) {
			figura_vai_para_o_lado(figura_se_movendo, grid, -1)
		}

		if (keyIsDown(RIGHT_ARROW)) {
			figura_vai_para_o_lado(figura_se_movendo, grid, 1)
		}
	}
	controlo_da_speed_dos_lados++
}

function try_girar_figura(figura, grid, desvio = 0) {
	let movimento_valido = true

	if (figura.patern != 4) {
		let centro_x = figura.cubos[1].x + desvio
		let centro_y = figura.cubos[1].y

		for (let cubo in figura.cubos) {
			let x = figura.cubos[cubo].y - centro_y
			let y = figura.cubos[cubo].x + desvio - centro_x
			let next_x = centro_x - x
			let next_y = centro_y + y

			if (
				next_x < 0 ||
				next_x >= grid.colunas ||
				next_y >= grid.linhas ||
				grid.grid[next_y][next_x] >= 1
			) {
				movimento_valido = false
			}
		}
	}
	return movimento_valido
}

function girar_figura(figura, grid) {
	if (try_girar_figura(figura, grid)) {
		if (figura.patern != 4) {
			let centro_x = figura.cubos[1].x
			let centro_y = figura.cubos[1].y

			for (let cubo in figura.cubos) {
				let x = figura.cubos[cubo].y - centro_y
				let y = figura.cubos[cubo].x - centro_x
				figura.cubos[cubo].x = centro_x - x
				figura.cubos[cubo].y = centro_y + y
			}
		}
	} else if (try_girar_figura(figura, grid, +1)) {
		if (figura.patern != 4) {
			let centro_x = figura.cubos[1].x + 1
			let centro_y = figura.cubos[1].y

			for (let cubo in figura.cubos) {
				let x = figura.cubos[cubo].y - centro_y
				let y = figura.cubos[cubo].x + 1 - centro_x
				figura.cubos[cubo].x = centro_x - x
				figura.cubos[cubo].y = centro_y + y
			}
		}
	} else if (try_girar_figura(figura, grid, -1)) {
		if (figura.patern != 4) {
			let centro_x = figura.cubos[1].x - 1
			let centro_y = figura.cubos[1].y

			for (let cubo in figura.cubos) {
				let x = figura.cubos[cubo].y - centro_y
				let y = figura.cubos[cubo].x - 1 - centro_x
				figura.cubos[cubo].x = centro_x - x
				figura.cubos[cubo].y = centro_y + y
			}
		}
	}
}

function verificar_se_linha_completa(cubos_fixos, grid) {
	let bonus = 1
	for (let linha in grid.grid) {
		let soma = 0
		for (let coluna in grid.grid[linha]) {
			soma += grid.grid[linha][coluna]
		}
		if (soma == 10) {
			bonus++
			eliminar_linha(cubos_fixos, grid, linha)
			bonus = bonus*2
			pontos += bonus * 10
			print(bonus * 10)
		}
	}
}

function eliminar_linha(cubos_fixos, grid, linha) {
	for (let cubo in cubos_fixos) {
		if (cubos_fixos[cubo].y == linha) {
			cubos_fixos[cubo].cor = cubo_morto
			delete cubos_fixos[cubo]
		}
	}

	for (let cubo in cubos_fixos) {
		if (cubos_fixos[cubo].y < linha) {
			cubos_fixos[cubo].y++
		}
	}
	grid.grid.splice(linha, 1)
	grid.grid.splice(0, 0, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
}

function game_over() {
	game_over_estado = true
	game_is_running = false
}

function new_game() {
	game_is_running = true
	game_over_estado = false
	speed_game = 25
	controlo_da_speed_dos_lados = 2
	cubos_fixos = []
	grid = new Grid(20, 10, 25)
	figura_preview = criar_objecto_figura_nova()
	buttom_start = new Buttom(330, 400, 'start', 'off')
	buttom_pause = new Buttom(330, 430, 'pause', 'on')
}

function level_show() {
	fill(8, 70, 107)
	stroke(8, 70, 107)
	textSize(32)
	text(`LEVEL: ${level}`, 320, 100)
}

function pontos_show() {
	fill(8, 70, 107)
	stroke(8, 70, 107)
	textSize(20)
	text(`PONTOS: ${pontos}`, 320, 50)
}

function level_up_speed() {
	if (frameCount % 500 == 0) {
		if (speed_game > 2) {
			level++
			speed_game--
		}
	}
}


function show_cubos() {
	for (let cubo in figura_preview.cubos) {
		figura_preview.cubos[cubo].show_preview()
	}

	for (let cubo in figura_se_movendo.cubos) {
		figura_se_movendo.cubos[cubo].show()
	}

	for (let cubo in cubos_fixos) {
		cubos_fixos[cubo].show()
	}
}
