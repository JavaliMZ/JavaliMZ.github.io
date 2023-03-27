let grid = []
let stack = []
let size_of_cells, linhas, colunas, current_cell

function setup() {
	createCanvas(500, 500)
	size_of_cells = 20
	linhas = floor(width / size_of_cells)
	colunas = floor(height / size_of_cells)
	for (let j = 0; j < linhas; j++) {
		for (let i = 0; i < colunas; i++) {
			let cell = new Cell(i, j, size_of_cells)
			grid.push(cell)
		}
	}
	current_cell = grid[0]
}

function draw() {
	background(150)

	for (cell in grid) {
		grid[cell].show()
	}

	current_cell.visited = true
	current_cell.current = true

	let next = check_neigbors(grid, colunas, current_cell)

	if (next) {
		stack.push(current_cell)

		remove_wall(current_cell, next)

		current_cell = next

	} else if (stack.length > 0) {
		current_cell = stack.pop()
	}
}
