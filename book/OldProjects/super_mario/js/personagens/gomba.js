class Gomba extends Enemy {
	constructor(x, y, world, player) {
		super(x, y, world, player)

		this.list_img_andando = [0, 1]
		this.list_img_esmagado = [2]
		this.altura_actual = 38
		this.largura = 38
		
		this.speed_actual_x = 1
	}
	preload_enemy() {
		this.gomba_img = loadImage('js/img/gomba.png')
	}

	setup_enemy() {
		this.gomba_sprite_andando = this.sprite_andando()
		this.gomba_sprite_esmagado = this.sprite_esmagado()
		this.dead_img = this.gomba_sprite_esmagado

		this.gomba_sprite_andando.create_individual_sprites()
		this.gomba_sprite_esmagado.create_individual_sprites()
	}

	draw_enemy() {

		this.enemy_near_player()

		if (this.near_player) {
			if (this.is_alive) {
				this.gomba_sprite_andando.show(this.x, this.y)
				this.gomba_sprite_andando.animate()
			}
			if (!this.is_alive) {
				this.gomba_sprite_esmagado.show(this.x, this.y)
			}

			this.world_collision_rects = this.create_world_virtual_rect_solid_for_collision_test()
			this.gomba_collision_rect = this.create_player_virtual_rect()
			this.check_collision(this.gomba_collision_rect, this.world_collision_rects)
			this.collision_priority(this.gomba_collision_rect, this.world_collision_rects)
			this.gravity()
			this.move()
		}
	}

	sprite_andando = () => new Sprite(this.gomba_img, 0.1, this.altura_actual, this.largura, this.list_img_andando)
	sprite_esmagado = () => new Sprite(this.gomba_img, 0.1, this.altura_actual, this.largura, this.list_img_esmagado)
}
