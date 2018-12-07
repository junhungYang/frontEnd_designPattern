var ground = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN*SQUAREWIDTH)

// 初识化(使ground具备形态并渲染至页面)  当init触发时应该生成围墙，地板，蛇，食物
ground.init = function () {
    this.viewContent.style.position = 'absolute'
    this.viewContent.style.backgroundColor = '#0ff'
    this.viewContent.style.left = this.x + 'px'
    this.viewContent.style.top = this.y + 'px'
    this.viewContent.style.width = this.width + 'px' 
    this.viewContent.style.height = this.height + 'px'
    document.body.appendChild(this.viewContent)


    // 填充广场 Stone Floor SnakeHead SnakeBody Food
    // 广场的结构应该为一个二维数组，先是多行所组成的数组，然后是多个方块组成的行数组
    this.SquareTable = []
    for (let i = 0; i < YLEN; i++) {
        this.SquareTable[i] = new Array(XLEN)
        for(let j = 0; j < XLEN; j++) {
            if(j == 0 || i == 0 || i == YLEN - 1 || j == XLEN - 1) {
                // 围墙
                var newSquare = SquareFactory.create('Stone',j,i,'black')
            }else {
                // 地板
                var newSquare = SquareFactory.create('Floor',j,i,'orange')
            }
            this.SquareTable[i][j] = newSquare
            this.viewContent.appendChild(newSquare.viewContent)
        }
    }
}

// 蛇的形态事实上即通过拆除某几块地板然后露出底色而成，而蛇的移动即是在不断的拆地板和安地板
ground.remove = function(x, y) {
    this.viewContent.removeChild(this.SquareTable[y][x].viewContent)
    this.SquareTable[y][x] = null
}
ground.append = function(square) {
    // square 为由SquareFactory创建的蛇身或蛇头
    this.SquareTable[square.y][square.x] = square;
    this.viewContent.appendChild(square.viewContent)
}
