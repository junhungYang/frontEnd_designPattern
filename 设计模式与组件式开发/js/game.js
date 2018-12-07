// 掌管玩家对整个游戏的实际操作
var game = new Game();


game.timer = null
game.score = 0
// 做准备工作
game.init = function() {
    ground.init()
    snake.init()
    createFood()

    // 监控事件，控制蛇的移动
    document.onkeydown = tool.throttle(function (e) {
        if (e.which === 37 && snake.direction !== DIRECTIONENUM.RIGHT) {
            "L"
            snake.direction = DIRECTIONENUM.LEFT
        } else if (e.which === 38 && snake.direction !== DIRECTIONENUM.DOWN) {
            "T"
            snake.direction = DIRECTIONENUM.TOP
        } else if (e.which === 39 && snake.direction !== DIRECTIONENUM.LEFT) {
            "R"
            snake.direction = DIRECTIONENUM.RIGHT
        } else if (e.which === 40 && snake.direction !== DIRECTIONENUM.TOP) {
            "D"
            snake.direction = DIRECTIONENUM.DOWN
        }
    })
}


// 真正游戏开始
game.start = function() {
    this.timer = setInterval(function() {
        snake.move()
    },INTERVAL)
}
game.over = function() {
    clearInterval(game.timer);
    alert(game.score)
}

function createFood() {
  
    let x = null
    let y = null
    let flag = true
    while(flag) {
        x = 1 + Math.floor(Math.random() * 13)
        y = 1 + Math.floor(Math.random() * 13)
        snake.position[`${x}_${y}`] ? "" : (flag = false);
    }
    var food = SquareFactory.create('Food',x,y,'green')
    ground.remove(food.x,food.y)
    ground.append(food)
}
