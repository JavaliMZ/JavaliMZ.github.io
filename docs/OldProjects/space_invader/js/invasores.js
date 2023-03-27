class Enemy_Tiro {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.r = 2.5
		this.vertices = null
		this.lados = null
	}

	show = function () {
		this.dados_para_collision()
		noStroke()
		fill(255, 255, 0)
		ellipse(this.x, this.y, this.r * 2)
	}

	update = function () {
		this.y += 5
	}

	dados_para_collision = function () {
		this.vertices = {
			ponto_A: createVector(this.x - this.r - 0.5, this.y + this.r - 0.5),
			ponto_B: createVector(this.x + this.r - 0.5, this.y + this.r - 0.5),
			ponto_C: createVector(this.x + this.r - 0.5, this.y - this.r - 0.5),
			ponto_D: createVector(this.x - this.r - 0.5, this.y - this.r - 0.5),
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
			lado_CD: createVector(
				this.vertices['ponto_D'].x - this.vertices['ponto_C'].x,
				this.vertices['ponto_D'].y - this.vertices['ponto_C'].y
			),
			lado_DA: createVector(
				this.vertices['ponto_A'].x - this.vertices['ponto_D'].x,
				this.vertices['ponto_A'].y - this.vertices['ponto_D'].y
			),
		}
	}
}

class Invasor {
	constructor(x, y) {
		this.x = x
		this.y = y
		this.r = 15
		this.move_speed = 1
		this.dir = [1, 0]
	}

	show = function () {
		fill(240, 50, 120)
		ellipse(this.x, this.y, this.r * 2)
	}

	update = function () {
		this.x += this.dir[0] * this.move_speed
		this.y += this.dir[1] * this.move_speed
	}
}
