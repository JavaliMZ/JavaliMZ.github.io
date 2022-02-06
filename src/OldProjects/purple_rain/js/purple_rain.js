class Gota {
	constructor() {
		this.x = random(-width / 10, width)
		this.y = random(0, -height)
		this.z_aux = random(0, 100)
		if (this.z_aux < 70) {
			this.z = random(0, 5)
		} else {
			this.z = random(0, 20)
		}

		this.speed = map(this.z, 0, 20, 5, 25)
		this.transparencia = map(this.z, 0, 20, random(0.2, 0.4), random(0.8, 1))
		this.color = color(`rgba(255, 20, 147, ${this.transparencia})`)
		this.inclinacao = map(this.transparencia, 0, 1, random(0.6, 0.8), random(0, 0.1))
		print(this.inclinacao)
		this.stroke_size = map(this.z, 0, 20, 1, 5)
	}
}

class Chuva {
	constructor(num_de_gotas) {
		this.gotas = []
		let gota
		for (let index = 0; index < num_de_gotas; index++) {
			gota = new Gota()
			this.gotas.push(gota)
		}

		this.show = function () {
			for (let index = 0; index < this.gotas.length; index++) {
				stroke(this.gotas[index].color)
				strokeWeight(this.gotas[index].stroke_size)
				line(
					this.gotas[index].x,
					this.gotas[index].y,
					this.gotas[index].x,
					this.gotas[index].y + this.gotas[index].z
				)
			}
		}

		this.update = function () {
			for (let index = 0; index < this.gotas.length; index++) {
				this.gotas[index].x += this.gotas[index].inclinacao
				this.gotas[index].y += this.gotas[index].speed
				if (this.gotas[index].y > height + (height * 5) / 100) {
					this.gotas[index] = new Gota()
				}
			}
		}
	}
}
