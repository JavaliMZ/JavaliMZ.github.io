class Tiro {
	constructor(array) {
		this.x = array[0]
		this.y = array[1]
		this.r = 2.5
	}

	show = function () {
		noStroke()
		fill(240)
		ellipse(this.x, this.y, this.r * 2)
	}

	update = function () {
		this.y -= 5
	}
}

class SpaceShip {
	constructor() {
		this.x = width / 2
		this.y = (height * 95) / 100
		this.x_limit_left = width - (width * 95) / 100
		this.x_limit_right = width - (width - (width * 95) / 100)
		this.move_speed = 5
		this.vertices = null
		this.lados = null
	}

	show = function () {
		this.dados_para_colission()
		noStroke()
		fill(148, 135, 114)
		triangle(this.x, this.y - 15, this.x - 15, this.y + 15, this.x + 15, this.y + 15)
	}

	move = function () {
		if (keyIsDown(LEFT_ARROW) && this.x > this.x_limit_left) {
			this.x -= this.move_speed
		} else if (keyIsDown(RIGHT_ARROW) && this.x < this.x_limit_right) {
			this.x += this.move_speed
		}
	}

	shoot = function () {
		if (keyIsDown(32)) {
			return [this.x, this.y]
		}
	}

	dados_para_colission = function () {
		this.vertices = {
			ponto_A: createVector(this.x, this.y - 15),
			ponto_B: createVector(this.x - 15, this.y + 15),
			ponto_C: createVector(this.x + 15, this.y + 15),
		}
		this.lados = {
			lado_AB: createVector(
				this.vertices['ponto_B'].x - this.vertices['ponto_A'].x,
				this.vertices['ponto_B'].y - this.vertices['ponto_A'].y
			),
			lado_BC: createVector(
				this.vertices['ponto_C'].x - this.vertices['ponto_B'].x,
				this.vertices['ponto_C'].y - this.vertices['ponto_B'].y
			),
			lado_CA: createVector(
				this.vertices['ponto_A'].x - this.vertices['ponto_C'].x,
				this.vertices['ponto_A'].y - this.vertices['ponto_C'].y
			),
		}
	}
}
