class Grid {
	constructor(linhas, colunas, size) {
		this.linhas = linhas + 2
		this.colunas = colunas
		this.size = size
		this.grid = grid(this.linhas, this.colunas)

		this.show = function () {
			fill(0, 8, 19)
			noStroke()
			rect(0, 0, width, size)
			stroke(8, 70, 107)
			let size_linha = this.linhas - 2
			let size_coluna = this.colunas
			for (let y = 1; y < size_linha + 2; y++) {
				for (let x = 1; x < size_coluna + 2; x++) {
					let x1 = x * this.size
					let y1 = this.size
					let x2 = x * this.size
					let y2 = this.size * size_linha + this.size
					line(x1, y1, x2, y2)

					let x3 = this.size
					let y3 = y * this.size
					let x4 = this.size * size_coluna + this.size
					let y4 = y * this.size
					line(x3, y3, x4, y4)
				}
			}
		}

		function grid(linhas, colunas) {
			let grid = []
			for (let i = 0; i < linhas; i++) {
				let linha = []
				for (let j = 0; j < colunas; j++) {
					linha.push(0)
				}
				grid.push(linha)
			}
			return grid
		}
	}
}
