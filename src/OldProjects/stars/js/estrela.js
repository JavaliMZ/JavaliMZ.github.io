class Estrela {
	constructor() {
		this.x = random(-width / 2, width / 2)
		this.y = random(-height / 2, height / 2)
		this.tamanho = 1
		this.speed = map(abs(this.x), 0, width / 2, 1.1, 1.05) / 2 + map(abs(this.y), 0, height / 2, 1.1, 1.05) / 2
		this.color = 1
		this.rasto = []
	}

	pintar_estrela() {
		noStroke()
		fill(this.color)
		ellipse(this.x, this.y, this.tamanho * this.speed)
		stroke(this.color)
		if (this.rasto.length > 2) {
			line(this.x, this.y, this.rasto[0][0], this.rasto[0][1])
			console.log(this.x, this.y, this.rasto[0][0], this.rasto[0][1])
		}
	}

	estrela_update() {
		if (
			this.x < -width / 1.7 ||
			this.x > width / 1.7 ||
			this.y < -height / 1.7 ||
			this.y > height / 1.7 ||
			(this.x > -10 && this.x < 10) ||
			(this.y > -10 && this.y < 10)
		) {
			this.x = new Estrela().x
			this.y = new Estrela().y
			this.tamanho = new Estrela().tamanho
			this.speed = new Estrela().speed
			this.color = new Estrela().color
			this.rasto = new Estrela().rasto
		} else {
			if (this.rasto.length > 2) {
				this.rasto.shift()
			}
			this.rasto.push([this.x, this.y])
			this.x *= this.speed
			this.y *= this.speed
			this.tamanho *= this.speed
			this.color = map(this.tamanho, 1, 5, -50, 255)
		}
	}
}
