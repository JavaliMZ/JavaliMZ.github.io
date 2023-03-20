function grelha(R, G, B, tamanho) {
	for (let x = 0; x <= width; x += tamanho) {
		for (let y = 0; y <= height; y += tamanho) {
			stroke(R, G, B)
			line(x, 0, x, height)
			line(0, y, width, y)
		}
	}
}
