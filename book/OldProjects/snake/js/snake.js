class Snake {
	constructor(x, y, size) {
		var branco = color(255, 255, 255)
		var roxo = color(204, 0, 255)
		this.x = x
		this.y = y
		this.pos = [this.x, this.y]
		this.body = [[this.x, this.y]]
		this.size = size
		this.color = branco
		this.direction = [0, 1]
		this.is_changing_direction = false
		this.is_alive = true
		this.controle = 0
		this.digestao = false
		this.digestao_count = 0
		this.transparente = false

		this.death = function () {
			let x_actual = this.body[this.body.length - 1][0]
			let y_actual = this.body[this.body.length - 1][1]

			if (
				x_actual < 0 ||
				x_actual >= width / this.size ||
				y_actual < 0 ||
				y_actual >= height / this.size
			) {
				return true
			}

			for (let i = 0; i < this.body.length - 2; i++) {
				let x_old = this.body[i][0]
				let y_old = this.body[i][1]

				if (x_old == x_actual && y_old == y_actual) {
					return true
				}
			}
		}

		this.show = function () {
			fill(this.color)
			for (let i = 0; i < this.body.length; i++) {
				rect(this.body[i][0] * this.size, this.body[i][1] * this.size, this.size, this.size)
			}
		}

		this.move_up = function () {
			if (this.direction[0] != 0 && this.direction[1] != 1 && !this.is_changing_direction) {
				// if (this.direction != [0, 1]) {
				this.direction = [0, -1]
				this.is_changing_direction = true
			}
		}

		this.move_down = function () {
			if (this.direction[0] != 0 && this.direction[1] != -1 && !this.is_changing_direction) {
				this.direction = [0, 1]
				this.is_changing_direction = true
			}
		}

		this.move_right = function () {
			if (this.direction[0] != -1 && this.direction[1] != 0 && !this.is_changing_direction) {
				this.direction = [1, 0]
				this.is_changing_direction = true
			}
		}

		this.move_left = function () {
			if (this.direction[0] != 1 && this.direction[1] != 0 && !this.is_changing_direction) {
				this.direction = [-1, 0]
				this.is_changing_direction = true
			}
		}

		this.is_moving = function () {
			let next_x = this.direction[0] + this.body[this.body.length - 1][0]
			let next_y = this.direction[1] + this.body[this.body.length - 1][1]

			let next_pos = [next_x, next_y]
			this.body.push(next_pos)
			this.is_changing_direction = false
			this.death()
		}

		this.eat = function (food_object, food_pos_array, food_tipo) {
			let food_x = food_pos_array[0]
			let food_y = food_pos_array[1]
			if (
				food_x == this.body[this.body.length - 1][0] &&
				food_y == this.body[this.body.length - 1][1]
			) {
				if (food_tipo == 1) {
					food_object.create_new_food()
				} else if (food_tipo == 3) {
					this.color = (0, 0, 0)
					this.transparente = true
					food_object.create_new_food()
				} else if (food_tipo == 2) {
					this.digestao = true
					this.color = roxo
					food_object.create_new_food()
				}
			} else {
				if (this.digestao && this.digestao_count < 8) {
					this.digestao_count++
					frameRate(5)
				} else if (this.transparente && this.digestao_count < 5) {
					this.digestao_count++
				} else {
					this.digestao = false
					this.transparente = false
					this.digestao_count = 0
					this.color = branco
					this.body.shift()
				}
			}
		}
	}
}
