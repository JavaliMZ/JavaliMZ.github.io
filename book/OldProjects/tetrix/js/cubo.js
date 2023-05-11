class Cubo {
	constructor(x, y, size, cor) {
		this.x = x
		this.y = y
		this.size = size
		this.cor = cor

		this.show = function (x = this.x, y = this.y, size = this.size, cor = this.cor) {
			let x1 = coord_grid_to_pixel(x, size)
			let y1 = coord_grid_to_pixel(y - 2, size)
			image(cor, x1, y1, size, size)
		}

		this.show_preview = function (x = this.x, y = this.y, size = this.size, cor = this.cor) {
			let x1 = coord_grid_to_pixel(x, size) + 250
			let y1 = coord_grid_to_pixel(y - 2, size) + 300
			image(cor, x1, y1, size, size)
		}

		function coord_grid_to_pixel(x_or_y, size) {
			return x_or_y * size + size
		}
	}
}
