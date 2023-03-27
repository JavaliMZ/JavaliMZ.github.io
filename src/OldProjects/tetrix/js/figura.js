class Figura {
	constructor(lista_de_cores) {
		this.cor = random(lista_de_cores)
		this.patern = floor(random(1, 7))
		this.cubos = create_new_figure(this.patern, this.cor)

		function create_new_figure(tipo, cor) {
			let new_figure = []

			switch (tipo) {
				case 1: // pau a direito
					new_figure.push(new Cubo(3, 0, 25, cor))
					new_figure.push(new Cubo(4, 0, 25, cor))
					new_figure.push(new Cubo(5, 0, 25, cor))
					new_figure.push(new Cubo(6, 0, 25, cor))
					break
				case 2: // L deitado com perna para esquerda
					new_figure.push(new Cubo(3, 0, 25, cor))
					new_figure.push(new Cubo(3, 1, 25, cor))
					new_figure.push(new Cubo(4, 1, 25, cor))
					new_figure.push(new Cubo(5, 1, 25, cor))
					break
				case 3: // L deitado com perna para direita
					new_figure.push(new Cubo(5, 0, 25, cor))
					new_figure.push(new Cubo(5, 1, 25, cor))
					new_figure.push(new Cubo(4, 1, 25, cor))
					new_figure.push(new Cubo(3, 1, 25, cor))
					break
				case 4: // Quadrado
					new_figure.push(new Cubo(4, 0, 25, cor))
					new_figure.push(new Cubo(4, 1, 25, cor))
					new_figure.push(new Cubo(5, 0, 25, cor))
					new_figure.push(new Cubo(5, 1, 25, cor))
					break
				case 5: // Escadinhas para direita
					new_figure.push(new Cubo(3, 1, 25, cor))
					new_figure.push(new Cubo(4, 1, 25, cor))
					new_figure.push(new Cubo(4, 0, 25, cor))
					new_figure.push(new Cubo(5, 0, 25, cor))
					break
				case 6: // Podio
					new_figure.push(new Cubo(3, 1, 25, cor))
					new_figure.push(new Cubo(4, 1, 25, cor))
					new_figure.push(new Cubo(4, 0, 25, cor))
					new_figure.push(new Cubo(5, 1, 25, cor))
					break
				case 7: // Escadinhas para esquerda
					new_figure.push(new Cubo(3, 0, 25, cor))
					new_figure.push(new Cubo(4, 1, 25, cor))
					new_figure.push(new Cubo(4, 0, 25, cor))
					new_figure.push(new Cubo(5, 1, 25, cor))
					break

				default:
					break
			}
			return new_figure
		}
	}
}
