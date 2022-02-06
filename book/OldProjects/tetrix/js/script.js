let botoes_img = {}
let cubo_cores_img = []
let cubos_fixos = []
let cubo_morto,
	figura_se_movendo,
	figura_preview,
	grid,
	speed_game,
	speed_memoria,
	buttom_start,
	buttom_pause,
	game_is_running,
	controlo_da_speed_dos_lados,
	game_over_estado,
	game_over_imagem,
	level,
	pontos

function preload() {
	game_is_running = false
	speed_game = 25
	controlo_da_speed_dos_lados = 2
	level = 1
	pontos = 0

	load_all_images()
}

function setup() {
	createCanvas(500, 550)
	grid = new Grid(20, 10, 25)
	figura_preview = new Figura(cubo_cores_img)
	figura_se_movendo = {...figura_preview}
	figura_preview = criar_objecto_figura_nova()

	buttom_start = new Buttom(330, 400, 'start', 'on')
	buttom_pause = new Buttom(330, 430, 'pause', 'off')
}

function draw() {
	background(0, 9, 18)
	buttom_start.show()
	buttom_pause.show()

	show_cubos()
	
	grid.show()

	if (game_is_running) {
		level_up_speed()

		controlo_dos_lados(controlo_da_speed_dos_lados)

		if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW)) {
			controlo_da_speed_dos_lados++
		} else {
			controlo_da_speed_dos_lados = 2
		}


		if (frameCount % speed_game == 0) {
			pontos++
			figura_cai_1_linha(figura_se_movendo, cubos_fixos, grid)
			cubos_fixos = cubos_fixos.filter(elemento => elemento)
		}
	}

	level_show()
	pontos_show()

	if (game_over_estado) {
		image(game_over_imagem, 0, 0, width, height)
	}
}

function mouseClicked() {
	if (buttom_start.is_clicked() && buttom_start.light == 'on') {
		buttom_start.alterar_estado()
		buttom_pause.alterar_estado()
		game_is_running = true
	}

	if (buttom_pause.is_clicked() && buttom_pause.light == 'on') {
		buttom_pause.alterar_estado()
		buttom_start.alterar_estado()
		game_is_running = false
	}

	if (game_over_estado) {
		if (mouseX > 130 && mouseX < 368 && mouseY > 330 && mouseY < 392) {
			new_game()
		}
	}
}

function keyPressed() {
	if (keyCode === DOWN_ARROW) {
		speed_memoria = speed_game
		speed_game = 1
	}

	if (keyCode === UP_ARROW) {
		girar_figura(figura_se_movendo, grid)
	}
}

function keyReleased() {
	if (keyCode === DOWN_ARROW) {
		speed_game = speed_memoria
	}
}
