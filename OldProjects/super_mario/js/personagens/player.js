class Player extends Personagens {
	/**
	 * @param {Number} [x] Posição X em pixel
	 * @param {Number} [y] Posição Y em pixel
	 * @param {World} world Mundo/Nível onde o player interaje
	 */
	constructor(x, y, world) {
		super(x, y, world)

		this.altura_actual = 34
		this.altura_pequeno = 34
		this.altura_grande = 68
		this.largura = this.altura_pequeno

		this.is_moving = false
		this.is_not_moving = true
		this.jumping = false
		this.mini_jump_of_dead = false

		this.max_speed_x = 6
		this.max_speed_y = 10

		this.list_img_pequeno_a_correr = [2, 4, 5, 4]
		this.list_img_pequeno_saltando = [6]
		this.list_img_pequeno_parado = [0]
		this.list_img_pequeno_dead = [1]

		this.list_img_grande_a_correr = [3, 4, 5, 4]
		this.list_img_grande_saltando = [6]
		this.list_img_grande_parado = [1]
		this.list_img_grande_baixado = [0]

		this.pequeno = true
		this.grande = false

		this.invulneravel = false
	}

	preload_player() {
		this.img_pequeno = loadImage('js/img/marioSmall.png')
		this.img_grande = loadImage('js/img/marioBig.png')
	}

	setup_player() {
		this.player_pequeno_sprite_correndo = this.sprite_pequeno_correndo()
		this.player_pequeno_sprite_saltando = this.sprite_pequeno_saltando()
		this.player_pequeno_sprite_parado = this.sprite_pequeno_parado()
		this.player_pequeno_sprite_dead = this.sprite_pequeno_dead()

		this.player_pequeno_sprite_correndo.create_individual_sprites()
		this.player_pequeno_sprite_saltando.create_individual_sprites()
		this.player_pequeno_sprite_parado.create_individual_sprites()
		this.player_pequeno_sprite_dead.create_individual_sprites()

		this.player_grande_sprite_correndo = this.sprite_grande_correndo()
		this.player_grande_sprite_saltando = this.sprite_grande_saltando()
		this.player_grande_sprite_parado = this.sprite_grande_parado()
		this.player_grande_sprite_baixado = this.sprite_grande_baixado()

		this.player_grande_sprite_correndo.create_individual_sprites()
		this.player_grande_sprite_saltando.create_individual_sprites()
		this.player_grande_sprite_parado.create_individual_sprites()
		this.player_grande_sprite_baixado.create_individual_sprites()
	}

	draw_player() {
		if (this.is_moving) this.draw_moving()
		else if (this.is_not_moving) this.draw_not_moving()

		if (this.is_alive) this.move()
		else {
			this.draw_dead()
			this.dead()
		}
	}

	draw_moving() {
		if (this.pequeno) this.draw_moving_pequeno()
		else if (this.grande) this.draw_moving_grande()
	}

	draw_moving_grande() {
		if (this.speed_actual_y == 0) this.draw_moving_correndo(this.player_grande_sprite_correndo)
		else this.draw_moving_caindo(this.player_grande_sprite_saltando)
	}

	draw_moving_pequeno() {
		if (this.speed_actual_y == 0) this.draw_moving_correndo(this.player_pequeno_sprite_correndo)
		else this.draw_moving_caindo(this.player_pequeno_sprite_saltando)
	}

	draw_moving_caindo(sprite) {
		if (this.speed_actual_x >= 0) {
			sprite.show(this.x, this.y)
			sprite.animate()
		} else {
			scale(-1, 1)
			sprite.show(-this.x - this.largura, this.y)
			sprite.animate()
			scale(-1, 1)
		}
	}

	draw_moving_correndo(sprite) {
		if (this.speed_actual_x >= 0) {
			sprite.show(this.x, this.y)
			sprite.animate()
		} else {
			scale(-1, 1)
			sprite.show(-this.x - this.largura, this.y)
			sprite.animate()
			scale(-1, 1)
		}
	}

	draw_not_moving() {
		if (this.pequeno) this.player_pequeno_sprite_parado.show(this.x, this.y)
		else if (this.grande) this.player_grande_sprite_parado.show(this.x, this.y)
	}

	draw_dead() {
		this.player_pequeno_sprite_dead.show(this.x, this.y)
	}

	sprite_pequeno_correndo = () =>
		new Sprite(this.img_pequeno, 0.3, this.altura_pequeno, this.largura, this.list_img_pequeno_a_correr)
	sprite_pequeno_saltando = () =>
		new Sprite(this.img_pequeno, 0, this.altura_pequeno, this.largura, this.list_img_pequeno_saltando)
	sprite_pequeno_parado = () =>
		new Sprite(this.img_pequeno, 0, this.altura_pequeno, this.largura, this.list_img_pequeno_parado)
	sprite_pequeno_dead = () =>
		new Sprite(this.img_pequeno, 0, this.altura_pequeno, this.largura, this.list_img_pequeno_dead)
	sprite_grande_correndo = () =>
		new Sprite(this.img_grande, 0.3, this.altura_grande, this.largura, this.list_img_grande_a_correr)
	sprite_grande_saltando = () =>
		new Sprite(this.img_grande, 0.3, this.altura_grande, this.largura, this.list_img_grande_saltando)
	sprite_grande_parado = () =>
		new Sprite(this.img_grande, 0.3, this.altura_grande, this.largura, this.list_img_grande_parado)
	sprite_grande_baixado = () =>
		new Sprite(this.img_grande, 0.3, this.altura_grande, this.largura, this.list_img_grande_baixado)

	move() {
		this.actualizar_dados_para_collisions()
		this.check_collision(this.player_collision_rect, this.world_collision_rects)
		this.collision_priority(this.player_collision_rect, this.world_collision_rects)
		this.gravity()
		this.cabecada()
		this.keyboard_controller()
	}

	actualizar_dados_para_collisions() {
		this.world_collision_rects = this.create_world_virtual_rect_solid_for_collision_test()
		this.player_collision_rect = this.create_player_virtual_rect()
	}

	keyboard_controller() {
		if (keyIsDown(RIGHT_ARROW) && !this.collision_right) {
			this.move_to_right()
		} else if (keyIsDown(LEFT_ARROW) && !this.collision_left) {
			this.move_to_left()
		} else {
			this.dont_move()
		}
	}

	move_to_right() {
		if (this.collision_right) {
			this.speed_actual_x = 0
		} else {
			this.limitar_X_ao_world()
			this.is_moving_estado(true)
			this.acelerar(1)
		}
	}

	move_to_left() {
		if (this.collision_left) {
			this.speed_actual_x = 0
		} else {
			this.limitar_X_ao_world()
			this.is_moving_estado(true)
			this.acelerar(-1)
		}
	}

	/**
	 * @param {number} direccao 1 para Direita; -1 para Esquerda
	 */
	acelerar(direccao) {
		if (this.speed_actual_x * direccao < this.max_speed_x) {
			this.speed_actual_x += 2 * direccao
		}
		this.x += this.speed_actual_x
	}

	is_moving_estado(boolean) {
		this.is_moving = boolean
		this.is_not_moving = !boolean
	}

	jump() {
		if (this.collision_bot) {
			this.y -= 20
			this.speed_actual_y = -18
		}
	}

	mini_jump() {
		this.y -= 10
		this.speed_actual_y = -8
	}

	maxi_jump() {
		this.y -= 23
		this.speed_actual_y = -21
	}

	dont_move() {
		if (this.speed_actual_x != 0) this.zerar_X_gradualmente()
		if (this.speed_actual_y != 0) this.is_moving_estado(true)
		else this.is_moving_estado(false)
	}

	zerar_X_gradualmente() {
		if (this.speed_actual_x < 0) this.speed_actual_x++
		if (this.speed_actual_x > 0) this.speed_actual_x--
	}

	limitar_X_ao_world() {
		if (this.x < 20) {
			this.x = 20
			this.speed_actual_x = 0
		}
		if (this.x > 7960) {
			this.x = 7960
			this.speed_actual_x = 0
		}
	}

	hitted_by_enemy() {
		if (!this.invulneravel) {
			if (this.pequeno) this.dead()
			else if (this.grande) this.minguar()
		}
	}

	dead() {
		this.is_moving_estado(false)
		this.is_alive = false
		if (!this.mini_jump_of_dead) {
			this.mini_jump()
		}
		this.mini_jump_of_dead = true
		this.max_speed_y = 5
		this.speed_actual_y += 0.5
		this.y += this.speed_actual_y
	}

	crescer() {
		this.altura_actual = this.altura_grande
		this.is_grande_estado(true)
	}

	is_grande_estado(boolean) {
		this.grande = boolean
		this.pequeno = !boolean
	}

	minguar() {
		this.altura_actual = this.altura_pequeno
		this.is_grande_estado(false)
		this.mini_invulnerabilidade()
	}

	mini_invulnerabilidade() {
		this.invulneravel = true
		setTimeout(() => (this.invulneravel = false), 1000)
	}
}
