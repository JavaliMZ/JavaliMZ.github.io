function vector_perpendicular(vector) {
	// return normalizar_vector(createVector(-vector.y, vector.x))
	return createVector(-vector.y, vector.x)
}

function ponto_maximo(ponto_max, ponto_projectado) {
	if (ponto_max === null || ponto_projectado > ponto_max) {
		ponto_max = ponto_projectado
	}
	return ponto_max
}

function ponto_minimo(ponto_min, ponto_projectado) {
	if (ponto_min === null || ponto_projectado < ponto_min) {
		ponto_min = ponto_projectado
	}
	return ponto_min
}

function dot_product(vector_A, vector_B) {
	// vector_A = normalizar_vector(vector_A)
	// vector_B = normalizar_vector(vector_B)
	return vector_A.x * vector_B.x + vector_A.y * vector_B.y
}

function normalizar_vector(vector) {
	let x = vector.x
	let y = vector.y
	let c = sqrt(x * x + y * y)

	return createVector(x / c, y / c)
}

// **************** // **************** // **************** // **************** // **************** //
//                             Função principal - Separate Axis Theorem                             //
// **************** // **************** // **************** // **************** // **************** //

function SAT_collision(poligono_A, poligono_B) {
	let lista_vectores_perpendiculares = []
	let ponto_projectado = null
	let ponto_min_poli_A = null
	let ponto_max_poli_A = null
	let ponto_min_poli_B = null
	let ponto_max_poli_B = null

	for (lado in poligono_A.lados) {
		lista_vectores_perpendiculares.push(vector_perpendicular(poligono_A.lados[lado]))
	}

	for (lado in poligono_B.lados) {
		lista_vectores_perpendiculares.push(vector_perpendicular(poligono_B.lados[lado]))
	}

	for (vector in lista_vectores_perpendiculares) {
		ponto_projectado = null
		ponto_min_poli_A = null
		ponto_max_poli_A = null
		ponto_min_poli_B = null
		ponto_max_poli_B = null
		
		for (vertice in poligono_A.vertices) {
			ponto_projectado = dot_product(poligono_A.vertices[vertice], lista_vectores_perpendiculares[vector])
			ponto_max_poli_A = ponto_maximo(ponto_max_poli_A, ponto_projectado)
			ponto_min_poli_A = ponto_minimo(ponto_min_poli_A, ponto_projectado)
		}
		
		for (vertice in poligono_B.vertices) {
			ponto_projectado = dot_product(poligono_B.vertices[vertice], lista_vectores_perpendiculares[vector])
			ponto_max_poli_B = ponto_maximo(ponto_max_poli_B, ponto_projectado)
			ponto_min_poli_B = ponto_minimo(ponto_min_poli_B, ponto_projectado)
		}

		if (
			(ponto_max_poli_A < ponto_min_poli_B && ponto_max_poli_A < ponto_max_poli_B) ||
			(ponto_min_poli_A > ponto_max_poli_B && ponto_min_poli_A > ponto_max_poli_B)
		) {
			return false
		}
	}
	return true
}
