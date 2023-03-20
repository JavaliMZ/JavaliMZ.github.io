class Sprite {
	/**
	 * @param {any} image_of_animation Recebe um objecto criado a partir da função loadImage() do p5.js
	 * @param {number} speed Velocidade. (convem ser de 0 a 1, na qual 1 corresponde a 100%)
	 * @param {number} pixel_h Largura das partes das imagens
	 * @param {number} pixel_w Laltura das partes das imagens
	 * @param {array} config_indexes Lista de index a ser considerado para a animação
	 */
	constructor(
		image_of_animation,
		speed,
		pixel_h,
		pixel_w,
		config_indexes = undefined
	) {
		this.image_of_animation = image_of_animation
		this.speed              = speed
		this.len_por_linha      = image_of_animation.width / pixel_w
		this.len_por_colunas    = image_of_animation.height / pixel_h
		this.index              = 0
		this.w                  = pixel_w
		this.h                  = pixel_h
		this.config_indexes     = config_indexes
		this.indexes            = this.get_indexes()
	}

	get_indexes() {
		let normal_index = []
		if (this.config_indexes == undefined) {
			for (let j = 0; j < this.len_por_colunas; j++) {
				for (let i = 0; i < this.len_por_linha; i++) {
					let number_of_frame = j * this.len_por_linha + i
					normal_index.push(number_of_frame)
				}
			}
			return normal_index
		}
		return this.config_indexes
	}

	create_individual_sprites() {
		let sprite = []
		let img_individual

		for (let index of this.indexes) {
			let x = (index % this.len_por_linha) * this.w
			let y = Math.floor(index / this.len_por_linha) * this.h
			img_individual = this.image_of_animation.get(x, y, this.w, this.h)
			sprite.push(img_individual)
		}
		this.sprites = sprite
	}

	/**
	 * @param {Number} [x] Posição X
	 * @param {Number} [y] Posição Y
	 * @param {Number} [index] Index - Normalmente null.
	 * 								Se for escolhido um Index,
	 * 								força e fixa a imagem[i]
	 * 								sem mostrar a animação
	 */
	show(x, y, index = null) {
		if (index) {
			image(this.sprites[index - 1], x, y)
		} else {
			let index_actual = Math.floor(this.index % this.indexes.length)
			image(this.sprites[index_actual], x, y)
		}
	}

	animate = () => (this.index += this.speed)
}
