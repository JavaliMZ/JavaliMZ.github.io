class Personagens {
	/**
	 * @param {Number} [x] Posição X em pixel
	 * @param {Number} [y] Posição Y em pixel
	 * @param {World} world Mundo/Nível onde o player interaje
	 */
	constructor(x, y, world) {
		this.x = x
		this.y = y
		this.world = world
		this.world_tamanho = this.world.tamanho

		this.altura_actual = 34
		this.altura_pequeno = 34
		this.altura_grande = 68
		this.largura = 34

		this.collision_top = false
		this.collision_bot = false
		this.collision_right = false
		this.collision_left = false

		this.speed_actual_x = 0
		this.speed_actual_y = 0
		this.max_speed_x = 1
		this.max_speed_y = 10

		this.is_alive = true
	}

	cabecada() {
		if (this.collision_top) {
			world.animar_se_cabecada(this)
			this.speed_actual_y = 0
			this.speed_actual_x /= 2
		}
	}

	gravity() {
		if (this.collision_bot) {
			this.speed_actual_y = 0
		} else {
			let sujeito_a_aceleracao = !this.collision_bot && this.speed_actual_y < this.max_speed_y
			if (sujeito_a_aceleracao) this.speed_actual_y += 1
		}
		this.y += this.speed_actual_y
	}

	check_collision(player, world) {
		let collision_top = false
		let collision_bot = false
		let collision_rit = false
		let collision_lft = false

		let p_top = player.y1
		let p_bot = player.y2
		let p_lft = player.x1
		let p_rit = player.x2
		let p_m_x = player.mid_x
		let p_m_y = player.mid_y

		for (let w of world) {
			let w_top = w.y1
			let w_bot = w.y2
			let w_lft = w.x1
			let w_rit = w.x2

			let check_x =
				(p_lft > w_lft && p_lft < w_rit) || (p_rit > w_lft && p_rit < w_rit) || (p_m_x > w_lft && p_m_x < w_rit)
			let check_y =
				(p_top > w_top && p_top < w_bot) || (p_bot > w_top && p_bot < w_bot) || (p_m_y > w_top && p_m_y < w_bot)

			let top = p_top - 0.01 > w_top && p_top - 0.01 < w_bot && check_x
			let bot = p_bot + 0.01 > w_top && p_bot + 0.01 < w_bot && check_x
			let rit = p_rit + 0.01 > w_lft && p_rit + 0.01 < w_rit && check_y
			let lft = p_lft - 0.01 > w_lft && p_lft - 0.01 < w_rit && check_y

			collision_bot = this.ajustar_collision_se_em_salto(collision_bot)

			if (top) collision_top = true
			if (bot) collision_bot = true
			if (rit) collision_rit = true
			if (lft) collision_lft = true
		}

		if (collision_top) this.collision_top = true
		else this.collision_top = false

		if (collision_bot) this.collision_bot = true
		else this.collision_bot = false

		if (collision_rit) this.collision_right = true
		else this.collision_right = false

		if (collision_lft) this.collision_left = true
		else this.collision_left = false
	}

	ajustar_collision_se_em_salto(collision_bot) {
		if (this.speed_actual_y < 0) return false
		else return collision_bot
	}

	collision_priority(player, world) {
		let bot = this.collision_bot
		let top = this.collision_top
		let right = this.collision_right
		let left = this.collision_left

		if (bot && top) {
			if (right) this.adjust_collision_right()
			else if (left) this.adjust_collision_left()
		} else if (right && left) {
			if (bot) this.adjust_collision_bot()
			else if (top) this.adjust_collision_top()
		} else if (top) this.adjust_collision_top()
		else if (bot) this.adjust_collision_bot()
		else if (right) this.adjust_collision_right()
		else if (left) this.adjust_collision_left()

		this.check_collision(player, world)
	}

	adjust_collision_bot() {
		this.y = floor((this.y + this.altura_actual) / this.world_tamanho) * this.world_tamanho - this.altura_actual
	}

	adjust_collision_top() {
		this.y = floor(this.y / this.world_tamanho + 1) * this.world_tamanho
	}

	adjust_collision_right() {
		this.x = floor((this.x + this.largura) / this.world_tamanho) * this.world_tamanho - this.largura
	}
	adjust_collision_left() {
		this.x = floor(this.x / this.world_tamanho + 1) * this.world_tamanho
	}

	create_player_virtual_rect() {
		let rect = {}
		rect.x1 = this.x
		rect.y1 = this.y
		rect.x2 = this.x + this.largura
		rect.y2 = this.y + this.altura_actual
		rect.mid_y = this.y + this.altura_actual / 2
		rect.mid_x = this.x + this.largura / 2
		this.collision_box = rect
		return rect
	}

	create_world_virtual_rect_solid_for_collision_test() {
		let virtual_rects = []
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 2; j++) {
				let x_aux = floor(this.x / this.world.tamanho + i) * this.world.tamanho
				let y_aux = floor(this.y / this.world.tamanho + j) * this.world.tamanho
				let piece_name = `[${x_aux}, ${y_aux}]`
				let rect_aux = {}
				if (this.world.data[piece_name]) {
					if (this.world.data[piece_name].solid) {
						rect_aux.x1 = this.world.data[piece_name].x
						rect_aux.y1 = this.world.data[piece_name].y
						rect_aux.x2 = this.world.data[piece_name].x + this.world.tamanho
						rect_aux.y2 = this.world.data[piece_name].y + this.world.tamanho
						virtual_rects.push(rect_aux)
					}
				}

				if (ambiente_de_teste) {
					if (this.world.data[piece_name]) {
						if (this.world.data[piece_name].solid) {
							fill(0, 102, 153)
						} else {
							noFill()
						}
						stroke(255, 0, 255)
						rect(
							this.world.data[piece_name].x,
							this.world.data[piece_name].y,
							this.world.tamanho,
							this.world.tamanho
						)
					}
				}
			}
		}
		return virtual_rects
	}
}
