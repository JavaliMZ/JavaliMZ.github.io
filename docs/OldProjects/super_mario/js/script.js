let player, world, enemies, mushroom
let ambiente_de_teste = false

function preload() {
	criar_todos_os_objectos_do_jogo()

	player.preload_player()
	world.preload_world()
	for (let mushroom of world.mushrooms) {
		mushroom.preload_mushroom()
	}

	for (let enemy of enemies) {
		enemy.preload_enemy()
	}
}

function setup() {
	createCanvas(800, 640)
	world.setup_world()
	player.setup_player()
	for (let mushroom of world.mushrooms) {
		mushroom.setup_mushroom()
	}

	for (let enemy of enemies) {
		enemy.setup_enemy()
	}
}

function draw() {
	// a função draw() é o loop do canvas padrão para o P5.js
	camera_following_player()
	background(107, 132, 255)

	world.draw_world()
	player.draw_player()

	for (let mushroom of world.mushrooms) {
		mushroom.draw_mushroom()
	}

	for (let enemy of enemies) {
		enemy.draw_enemy()
	}

	check_collision_player_vs_enemies()
	check_collision_between_enemies()
	check_collision_player_vs_mushrooms()
	delete_enemy_dead()
	debug_cube_player_draw()
	debug_info()
}

function criar_todos_os_objectos_do_jogo() {
	world = new World()
	world.add_mushroom(840, 400)
	world.add_mushroom(3120, 400)
	world.add_mushroom(4360, 240)
	player = new Player(200, 200, world)
	enemies = []
	enemies.push(
		new Gomba(725, 500, world, player),
		new Gomba(1650, 500, world, player),
		new Gomba(2000, 500, world, player),
		new Gomba(2080, 500, world, player),
		new Gomba(3125, 50, world, player),
		new Gomba(3225, 50, world, player),
		new Gomba(3850, 500, world, player),
		new Gomba(3950, 500, world, player),
		new Gomba(4900, 500, world, player),
		new Gomba(5000, 500, world, player),
		new Gomba(5100, 500, world, player),
		new Gomba(5200, 500, world, player),
		new Gomba(7000, 500, world, player),
		new Gomba(7100, 500, world, player)
	)
}

function camera_following_player() {
	if (player.x > 250) {
		translate(-player.x + 250, 0)
	}
}

function keyPressed() {
	if (keyCode === UP_ARROW && player.is_alive) {
		player.jump()
	}
}

function delete_enemy_dead() {
	for (let i = 0; i < enemies.length; i++) {
		if (!enemies[i].is_gonna_be_deleted) {
			if (!enemies[i].is_alive) {
				enemies[i].is_gonna_be_deleted = true
				setTimeout(delete_after_timing, 1000, enemies, i)
			}
		}
	}
}

function delete_after_timing(object_array, indice) {
	object_array.splice(indice, 1)
}

function check_collision_player_vs_mushrooms() {
	let player_box = player.collision_box

	for (let mushroom of world.mushrooms) {
		if (mushroom.is_alive) {
			let var_mushroom = mushroom.collision_box

			let check_x =
				(player_box.x1 > var_mushroom.x1 && player_box.x1 < var_mushroom.x2) ||
				(player_box.x2 > var_mushroom.x1 && player_box.x2 < var_mushroom.x2) ||
				(player_box.mid_x > var_mushroom.x1 && player_box.mid_x < var_mushroom.x2)
			let check_y =
				(player_box.y1 > var_mushroom.y1 && player_box.y1 < var_mushroom.y2) ||
				(player_box.y2 > var_mushroom.y1 && player_box.y2 < var_mushroom.y2) ||
				(player_box.mid_y > var_mushroom.y1 && player_box.mid_y < var_mushroom.y2)

			let check_top__ = player_box.y1 > var_mushroom.y1 && player_box.y1 < var_mushroom.y2 && check_x
			let check_bot__ = player_box.y2 > var_mushroom.y1 && player_box.y2 < var_mushroom.y2 && check_x
			let check_right = player_box.x2 > var_mushroom.x1 && player_box.x2 < var_mushroom.x2 && check_y
			let check_left_ = player_box.x1 > var_mushroom.x1 && player_box.x1 < var_mushroom.x2 && check_y

			if (check_bot__ || check_top__ || check_right || check_left_) {
				player.crescer()
				mushroom.dead()
			}
		}
	}
}

function check_collision_player_vs_enemies() {
	let player_box = player.collision_box

	for (let enemy of enemies) {
		if (enemy.near_player && enemy.is_alive) {
			let enemy_box = enemy.collision_box

			let check_x =
				(player_box.x1 > enemy_box.x1 && player_box.x1 < enemy_box.x2) ||
				(player_box.x2 > enemy_box.x1 && player_box.x2 < enemy_box.x2) ||
				(player_box.mid_x > enemy_box.x1 && player_box.mid_x < enemy_box.x2)
			let check_y =
				(player_box.y1 > enemy_box.y1 && player_box.y1 < enemy_box.y2) ||
				(player_box.y2 > enemy_box.y1 && player_box.y2 < enemy_box.y2) ||
				(player_box.mid_y > enemy_box.y1 && player_box.mid_y < enemy_box.y2)

			let check_top__ = player_box.y1 - 1 > enemy_box.y1 && player_box.y1 - 1 < enemy_box.y2 && check_x
			let check_bot__ = player_box.y2 + 1 > enemy_box.y1 && player_box.y2 + 1 < enemy_box.y2 && check_x
			let check_right = player_box.x2 + 1 > enemy_box.x1 && player_box.x2 + 1 < enemy_box.x2 && check_y
			let check_left_ = player_box.x1 - 1 > enemy_box.x1 && player_box.x1 - 1 < enemy_box.x2 && check_y

			if (check_bot__ && enemy.is_alive) {
				enemy.dead()
				if (keyIsDown(UP_ARROW)) {
					player.maxi_jump()
				} else {
					player.mini_jump()
				}
			} else {
				if (enemy.is_alive) {
					if (check_top__ || check_right || check_left_) player.hitted_by_enemy()
				}
			}
		}
	}
}

function check_collision_between_enemies() {
	for (let i = 0; i < enemies.length; i++) {
		for (let j = 0; j < enemies.length; j++) {
			if (i != j && enemies[i].is_alive && enemies[j].is_alive && enemies[i].near_player && enemies[j].near_player) {
				let enemy_A = enemies[i].collision_box
				let enemy_B = enemies[j].collision_box

				let check_x =
					(enemy_A.x1 >= enemy_B.x1 && enemy_A.x1 <= enemy_B.x2) ||
					(enemy_A.x2 >= enemy_B.x1 && enemy_A.x2 <= enemy_B.x2)
				let check_y =
					(enemy_A.y1 >= enemy_B.y1 && enemy_A.y1 <= enemy_B.y2) ||
					(enemy_A.y2 >= enemy_B.y1 && enemy_A.y2 <= enemy_B.y2)

				let check_top__ = enemy_A.y1 >= enemy_B.y1 && enemy_A.y1 <= enemy_B.y2 && check_x
				let check_bot__ = enemy_A.y2 >= enemy_B.y1 && enemy_A.y2 <= enemy_B.y2 && check_x
				let check_right = enemy_A.x2 >= enemy_B.x1 && enemy_A.x2 <= enemy_B.x2 && check_y
				let check_left_ = enemy_A.x1 >= enemy_B.x1 && enemy_A.x1 <= enemy_B.x2 && check_y

				if (check_right || check_top__ || check_bot__ || check_left_) {
					if (enemies[i].x < enemies[j].x) {
						enemies[i].x -= 2
						enemies[j].x += 2
					} else {
						enemies[i].x += 2
						enemies[j].x -= 2
					}
					enemies[i].speed_actual_x *= -1
				}
			}
		}
	}
}

// -------------- //
// DEBBUG SECTION //
// -------------- //

function debug_info() {
	if (ambiente_de_teste) {
		fill(0, 0, 0)
		rect(player.x - 120, 5, 200, 210)
		noStroke()
		fill(255, 255, 2555)
		text('player.x = ' + player.x, player.x - 100, 20)
		text('player.y = ' + player.y, player.x - 100, 40)
		text('player.speed.x = ' + player.speed_actual_x, player.x - 100, 60)
		text('player.speed.y = ' + player.speed_actual_y, player.x - 100, 80)
		text('collision bot = ' + player.collision_bot, player.x - 100, 100)
		text('collision top = ' + player.collision_top, player.x - 100, 120)
		text('collision right = ' + player.collision_right, player.x - 100, 140)
		text('collision letf = ' + player.collision_left, player.x - 100, 160)
		text('mouseX = ' + mouseX, player.x - 100, 180)
		text('mouseY = ' + mouseY, player.x - 100, 200)
	}
}

function debug_cube_player_draw() {
	if (ambiente_de_teste) {
		noFill()
		stroke(255, 0, 255)
		rect(
			player.collision_box.x1,
			player.collision_box.y1,
			player.collision_box.x2 - player.collision_box.x1,
			player.collision_box.y2 - player.collision_box.y1
		)
	}
}
