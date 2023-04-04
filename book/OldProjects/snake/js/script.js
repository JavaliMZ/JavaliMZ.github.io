var size = 25
var snake = 0
var food

function setup() {
    createCanvas(500, 500)
    snake = new Snake(4, 4, size)
    food = new Food(8, 8, size)
}

function draw() {
    frameRate(10)
    background(0)
    grelha(30, 30, 30, size)
    food.show(snake.body)
    if (!snake.death()) {
        snake.is_moving()
        snake.show()
        snake.eat(food, food.pos, food.tipo)
    } else {
        snake = new Snake(4, 4, size)
    }
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        snake.move_up()
    } else if (keyCode === DOWN_ARROW) {
        snake.move_down()
    } else if (keyCode === LEFT_ARROW) {
        snake.move_left()
    } else if (keyCode === RIGHT_ARROW) {
        snake.move_right()
    }
}
