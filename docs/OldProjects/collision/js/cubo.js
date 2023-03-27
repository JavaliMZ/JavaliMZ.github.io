class Cubo {
	constructor(x, y, tamanho) {
		this.center = createVector(x, y)
		this.color = color(52, 125, 235)
		this.vertices = {
			ponto_A: createVector(x - tamanho / 2, y + tamanho / 2),
			ponto_B: createVector(x + tamanho / 2, y + tamanho / 2),
			ponto_C: createVector(x + tamanho / 2, y - tamanho / 2),
			ponto_D: createVector(x - tamanho / 2, y - tamanho / 2),
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

	show = function () {
		fill(this.color)
		stroke(this.color)
		for (let i in this.vertices) {
			ellipse(this.vertices[i].x, this.vertices[i].y, 5)
		}
		quad(
			this.vertices['ponto_A'].x,
			this.vertices['ponto_A'].y,
			this.vertices['ponto_B'].x,
			this.vertices['ponto_B'].y,
			this.vertices['ponto_C'].x,
			this.vertices['ponto_C'].y,
			this.vertices['ponto_D'].x,
			this.vertices['ponto_D'].y
		)
	}

	change_color(R, G, B) {
		this.color = (R, G, B)
	}
}
