function get_index(x, y, size) {
	if (x < 0 || y < 0 || x > size - 1 || y > size - 1) {
		return undefined
	}
	return x + floor(y * size)
}

function check_neigbors(grid_list, size, current_cell) {
	let neigbors = {
		top  : grid_list[get_index(current_cell.x, current_cell.y - 1, size)],
		right: grid_list[get_index(current_cell.x + 1, current_cell.y, size)],
		bot  : grid_list[get_index(current_cell.x, current_cell.y + 1, size)],
		left : grid_list[get_index(current_cell.x - 1, current_cell.y, size)],
	}

	for (neigbor in neigbors) {
		if (neigbors[neigbor] == undefined || neigbors[neigbor].visited == true) {
			delete neigbors[neigbor]
		}
	}

	let list_of_keys_neigbors = Object.keys(neigbors)
	let random_key_neigors = random(list_of_keys_neigbors)

	return neigbors[random_key_neigors]
}

function remove_wall(current_cell, next_cell) {
	direction = [next_cell.x - current_cell.x, next_cell.y - current_cell.y]

	if (direction[0] == 0 && direction[1] == -1) {
		current_cell.existing_walls['top'] = false
		next_cell.existing_walls   ['bot'] = false

	} else if (direction[0] == 1 && direction[1] == 0) {
		current_cell.existing_walls['right'] = false
		next_cell.existing_walls   ['left']  = false

	} else if (direction[0] == 0 && direction[1] == 1) {
		current_cell.existing_walls['bot'] = false
		next_cell.existing_walls   ['top'] = false

	} else if (direction[0] == -1 && direction[1] == 0) {
		current_cell.existing_walls['left']  = false
		next_cell.existing_walls   ['right'] = false
	}
}
