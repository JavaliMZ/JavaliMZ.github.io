class Mushroom extends Objectos {
	constructor(x, y, world) {
		super(x, y, world)

		this.list_img_unique = [11]
		this.index = 0
		this.altura = 40
		this.largura = 40
		this.apareceu = false
		this.is_alive = false
		this.x_nascimento = this.x
		this.y_nascimento = this.y
	}

	preload_mushroom() {
		this.img = loadImage('js/img/mapa.png')
	}
	setup_mushroom() {
		this.sprite = this.sprite_mushroom()
		this.sprite.create_individual_sprites()
	}
	draw_mushroom() {
		if (this.is_alive) {
			this.sprite.show(this.x, this.y, this.index)
		} else if (this.apareceu) {
			this.sprite.show(this.x, this.y, this.index)
			this.world.world_sprite.show(this.x_nascimento, this.y_nascimento, 20)
		}
		this.move()
	}
	move() {
		if (this.is_alive) {
			this.x += this.speed_actual_x
			if (this.collision_top) {
				this.x -= 2
				this.speed_actual_x *= -1
			}
		}

		if (this.apareceu) {
			this.y += this.speed_actual_y
		}

		if (this.is_moving) {
			this.world_collision_rects = this.create_world_virtual_rect_solid_for_collision_test()
			this.object_collision_rect = this.create_object_virtual_rect()
			this.check_collision(this.object_collision_rect, this.world_collision_rects)
			this.collision_priority(this.object_collision_rect, this.world_collision_rects)
			this.gravity()
		}
	}

	sprite_mushroom = () => new Sprite(this.img, 0, this.largura, this.altura, this.list_img_unique)

	aparecer() {
		this.apareceu = true
		this.speed_actual_y = -1
		setTimeout(() => this.start_moving(), 700)
	}

	start_moving() {
		this.apareceu = false
		this.is_moving = true
		this.is_alive = true
		this.speed_actual_y = 0
		this.speed_actual_x = 2
	}

	dead() {
		let name = this.name
		for (let mushroom of this.world.mushrooms) {
			if (mushroom.name == name) {
				this.is_alive = false
			}
		}

	}
}
