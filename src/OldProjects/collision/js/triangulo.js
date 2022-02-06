class Triangulo {
	constructor(x, y, tamanho) {
		this.center = createVector(x, y)
		this.color = color(240, 20, 150)
		this.vertices = {
			ponto_A: createVector(x, y - tamanho / 2),
			ponto_B: createVector(x + tamanho / 2, y + tamanho / 2),
			ponto_C: createVector(x - tamanho / 2, y + tamanho / 2),
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

	show = function () {
		for (let i in this.vertices) {
			fill(this.color)
			stroke(this.color)
			ellipse(this.vertices[i].x, this.vertices[i].y, 5)
			triangle(
				this.vertices['ponto_A'].x,
				this.vertices['ponto_A'].y,
				this.vertices['ponto_B'].x,
				this.vertices['ponto_B'].y,
				this.vertices['ponto_C'].x,
				this.vertices['ponto_C'].y
			)
		}
	}

	change_color(R, G, B) {
		this.color = (R, G, B)
	}
}
