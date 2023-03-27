class Cell {
	constructor(x, y, size) {
		this.x    = x
		this.y    = y
		this.size = size

		this.existing_walls = {
			top  : true,
			right: true,
			bot  : true,
			left : true,
		}
		this.walls_line = {
			top: {
				x1: this.x * this.size,
				y1: this.y * this.size,
				x2: this.x * this.size + this.size,
				y2: this.y * this.size,
			},
			right: {
				x1: this.x * this.size + this.size,
				y1: this.y * this.size,
				x2: this.x * this.size + this.size,
				y2: this.y * this.size + this.size,
			},
			bot: {
				x1: this.x * this.size + this.size,
				y1: this.y * this.size + this.size,
				x2: this.x * this.size,
				y2: this.y * this.size + this.size,
			},
			left: {
				x1: this.x * this.size,
				y1: this.y * this.size + this.size,
				x2: this.x * this.size,
				y2: this.y * this.size,
			},
		}
		this.visited = false
		this.current = false
	}

	show = function () {
		let x = this.x * this.size
		let y = this.y * this.size
		let w = this.size

		if (this.visited && !this.current) {
			noStroke()
			fill(255, 0, 255, 50)
			rect(x, y, w, w)
		}

		if (this.current) {
			noStroke()
			fill(255, 200, 255)
			rect(x, y, w, w)
			this.current = false
		}

		for (let wall in this.existing_walls) {
			if (this.existing_walls[wall]) {
				stroke(0)
				line(
					this.walls_line[wall].x1,
					this.walls_line[wall].y1,
					this.walls_line[wall].x2,
					this.walls_line[wall].y2
				)
			}
		}
	}
}
