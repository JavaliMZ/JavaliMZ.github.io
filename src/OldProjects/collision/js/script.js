let cubo, cubo2, triangulo, triangulo2

function setup() {
	createCanvas(windowWidth *0.9, windowHeight*0.8)
    cubo = new Cubo(width / 2, height / 2, 100)
}

function draw() {
    triangulo = new Triangulo(mouseX, mouseY, 100)
    
	background(51)
    
    if (SAT_collision(cubo, triangulo)){
        cubo.change_color(255, 0, 0)
        triangulo.change_color(255, 0, 0)
    } else {
        cubo.change_color(52, 125, 235)
    }
    
    cubo.show()
    triangulo.show()
    

}


