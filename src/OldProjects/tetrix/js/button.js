class Buttom {
	constructor(x, y, tipo = 'start', light = 'on', images_list = botoes_img) {
		this.x      = x
		this.y      = y
		this.x2     = this.x + 110
		this.y2     = this.y + 27
		this.images = images_list
		this.tipo   = tipo
		this.light  = light

		this.show = function () {
			let image_name = `buttom_${this.tipo}_light_${this.light}`
			image(this.images[image_name], this.x, this.y)
		}

		this.alterar_estado = function () {
			if (this.light == 'on') {
				this.light = 'off'
			} else {
				this.light = 'on'
			}
		}

		this.is_clicked = function () {
			if (mouseX > this.x && mouseX < this.x2) {
				if (mouseY > this.y && mouseY < this.y2) {
					return true
				}
			} else {
				return false
			}
		}
	}
}
