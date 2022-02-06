class MengerSponge {
	constructor(x, y, z, r) {
		this.pos = createVector(x, y, z)
		this.r = r
		this.lista_de_boxes = []

		this.show = function () {
			push()
			translate(this.pos.x, this.pos.y, this.pos.z)
			box(this.r)
			pop()
		}

		this.dividir = function () {
			var boxes = []
			var b = []
			var new_r = this.r / 3
			var new_x = 0
			var new_y = 0
			var new_z = 0

			for (let x = -1; x <= 1; x++) {
				for (let y = -1; y <= 1; y++) {
					for (let z = -1; z <= 1; z++) {
						if (abs(x) + abs(y) + abs(z) >= 2) {
							new_x = this.pos.x + x * new_r
							new_y = this.pos.y + y * new_r
							new_z = this.pos.z + z * new_r
							var b = new MengerSponge(new_x, new_y, new_z, new_r)
							boxes.push(b)
						}
					}
				}
			}
			return boxes
		}
	}
}
