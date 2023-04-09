class Enemy extends Personagens {
	constructor(x, y, world, player) {
		super(x, y, world)
		this.speed_actual_x = 3
		this.speed_actual_y = 0
		this.max_speed_y = 10
		this.player = player
		this.near_player = false

		this.collision_top = false
		this.collision_bot = false
		this.collision_right = false
		this.collision_left = false
		this.is_gonna_be_deleted = false
	}

	move() {
		if (this.is_alive) {
			this.x += this.speed_actual_x
			if (this.collision_right) {
				this.x -= 2
				this.speed_actual_x *= -1
			}
			if (this.collision_left) {
				this.x += 2
				this.speed_actual_x *= -1
			}
		}
	}

	dead() {
		this.is_alive = false
	}

	enemy_near_player(){
		if (this.x + 300 > this.player.x && this.x - 800 < this.player.x) {
			this.near_player = true
		} else {
			this.near_player = false
		}
	}
}
