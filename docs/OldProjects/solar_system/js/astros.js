class Astro {
	constructor(distance, raio, speed, angle, imagem_objecto) {
		this.distance = distance
		this.speed = speed / 1000
		this.angle_rotation = angle
		this.raio = raio
		this.imagem = imagem_objecto
	}

	update = function () {
		this.angle_rotation += this.speed
		rotate(this.angle_rotation)
	}

	show = function () {
		push()
		this.update()

		translate(this.distance, 0)

		texture(this.imagem)
		sphere(this.raio)
		pop()
	}
}

class Sun extends Astro {
	constructor(distance, raio, speed, angle, imagem_objecto) {
		super(distance, raio, speed, angle, imagem_objecto)
		this.imagem = imagem_objecto
		this.luz_propria = true
	}
}

class Planet extends Astro {
	constructor(distance, raio, speed, angle, filhacao, imagem_objecto) {
		super(distance, raio, speed, angle, imagem_objecto)
		this.imagem = imagem_objecto
		this.filhacao = filhacao
	}
}

class Moon extends Astro {
	constructor(distance, raio, speed, angle, filhacao, imagem_objecto) {
		super(distance, raio, speed, angle, filhacao, imagem_objecto)
		this.imagem = imagem_objecto
		this.filhacao = filhacao
	}

	update = function () {
		this.angle_rotation += this.speed
		rotate(this.angle_rotation)
	}

	show = function () {
		push()

		this.filhacao.update()
		translate(this.filhacao.distance, 0)

		this.update()
		translate(this.distance, 0)
		texture(this.imagem)
		sphere(this.raio)
		pop()
	}
}
