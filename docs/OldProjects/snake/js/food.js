class Food {
	constructor(x, y, size, snake_body_array) {
		this.x = x
		this.y = y
		this.pos = [this.x, this.y]
		this.size = size
		this.tipo = 1

		this.show = function () {
			if (this.tipo == 1) {
				fill(255, 0, 0)
			}
			if (this.tipo == 2) {
				fill(204, 0, 255)
			}
			if (this.tipo == 3) {
				fill(42, 191, 36)
			}
			rect(this.pos[0] * this.size, this.pos[1] * this.size, size, size)
		}

		this.create_new_food = function () {
			let r = parseInt(random(1, 100))
			print(r)
			if (r < 70) {
				this.tipo = 1
			} else if (r < 90) {
				this.tipo = 2
			} else {
				this.tipo = 3
			}

			let new_food_x = parseInt(random(0, width / size))
			let new_food_y = parseInt(random(0, width / size))
			let new_food_pos = [new_food_x, new_food_y]
			for (const i in snake_body_array) {
				print(snake_body_array[i])
				aux = snake_body_array[i].toString()
				aux_2 = new_food_pos.toString()
				if (aux == aux_2) {
					this.create_new_food()
				}
			}
			this.pos = new_food_pos
		}
	}
}
