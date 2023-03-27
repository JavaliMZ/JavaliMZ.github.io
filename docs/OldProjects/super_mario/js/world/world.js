class World {
	constructor() {
		this.tamanho = 40
		this.h = 16
		this.w = 212
		this.len = 3392
		this.max_pixel_x = this.w * this.tamanho - this.tamanho
		this.max_pixel_y = this.h * this.tamanho
		this.list_solid_pieces = [13, 14, 15, 16, 19, 20, 21, 22, 23, 24, 27, 28, 40]
		this.mushrooms = []
	}

	preload_world() {
		this.world_json = loadJSON('js/world/mapa.json')
		this.world_img = loadImage('js/img/mapa.png')
	}

	setup_world() {
		this.world_sprite = new Sprite(this.world_img, 0, this.tamanho, this.tamanho)
		this.world_sprite.create_individual_sprites()
		this.data = this.give_coordenate_of_all_pieces_on_data()
		this.complete_collision_data_for_all_pieces()
	}

	draw_world() {
		for (let i = 0; i < this.max_pixel_x; i += this.tamanho) {
			for (let j = 0; j < this.max_pixel_y; j += this.tamanho) {
				let x = this.data[`[${i}, ${j}]`].x
				let x_near_player = x + 300 > player.x && x - 800 < player.x

				if (x_near_player) {
					let piece = this.data[`[${i}, ${j}]`].piece
					let y = this.data[`[${i}, ${j}]`].y
					this.world_sprite.show(x, y, piece)
				}
			}
		}
	}

	give_coordenate_of_all_pieces_on_data() {
		let data = {}
		let x = 0
		let y = 0
		for (let i = 0; i < this.len; i++) {
			data[`[${x}, ${y}]`] = {
				index: i,
				piece: this.world_json[`${i}`],
				x: x,
				y: y,
			}
			if (x < this.max_pixel_x) {
				x += this.tamanho
			} else {
				x = 0
				y += this.tamanho
			}
		}
		return data
	}

	complete_collision_data_for_all_pieces() {
		for (let name in this.data) {
			let list_of_possibility = []
			for (let piece_number of this.list_solid_pieces) {
				list_of_possibility.push(this.data[name].piece == piece_number)
			}

			let piece_solid = list_of_possibility.some((element) => element == true)

			if (piece_solid) {
				this.data[name].solid = true
			} else {
				this.data[name].solid = false
			}
		}
	}
	
	animar_se_cabecada(player) {
		let piece_name = this.get_piece_name_hited(player)

		if (this.data[piece_name].piece == 15) this.jump_animation(this.data[piece_name])
		else if (this.data[piece_name].piece == 14) {
			this.jump_animation(this.data[piece_name])
			setTimeout(() => (this.data[piece_name].piece = 16), 50)
			this.tratar_objecto_escondido(piece_name)
		}
	}
	
	tratar_objecto_escondido(piece_name) {
		if (this.mushrooms.length > 0) {
			for (let mushroom of this.mushrooms) {
				if (mushroom.name === piece_name) {
					mushroom.aparecer()
				}
			}
		}
	}

	jump_animation(piece) {
		piece.y -= 3
		setTimeout(() => (piece.y -= 2), 10)
		setTimeout(() => (piece.y += 2), 30)
		setTimeout(() => (piece.y += 3), 40)
	}

	get_piece_name_hited(player) {
		let x = player.x + player.largura / 2
		let y = player.y

		let piece_x = floor(x / this.tamanho) * this.tamanho
		let piece_y = floor(y / this.tamanho) * this.tamanho

		return `[${piece_x}, ${piece_y}]`
	}

	add_mushroom(x, y) {
		this.mushrooms.push(new Mushroom(x, y, this))
	}
}
