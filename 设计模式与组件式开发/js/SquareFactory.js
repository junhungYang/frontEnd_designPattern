function SquareFactory() {

}
SquareFactory.create = function(type,x,y,color) {
    if(typeof SquareFactory.prototype[type] == undefined) {
        throw 'no this type'
    }
    if(SquareFactory.prototype[type].prototype.__proto__ !== SquareFactory.prototype) {
        // 通过继承可以使用工厂里的公共方法
        SquareFactory.prototype[type].prototype = new SquareFactory()
    }
    return new SquareFactory.prototype[type](x,y,color)
}


// 包装出厂  渲染至页面
SquareFactory.prototype.init = function(square,color,strategyMessage) {
    square.viewContent.style.position = 'absolute'
    square.viewContent.style.width = square.width + 'px'
    square.viewContent.style.height = square.height + 'px'
    square.viewContent.style.left = square.x * SQUAREWIDTH + 'px'
    square.viewContent.style.top = square.y * SQUAREWIDTH + "px";
    square.viewContent.style.backgroundColor = color
    square.touch = function() {
        // 根据所return出来的信息作出相对应的处理
        return strategyMessage;
    }
}


// 不同子类的生产流水线
SquareFactory.prototype.Floor = function(x,y,color) {
    let floor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH)
    this.init(floor, color, STRATEGYMESSAGEENUM.MOVE)
    return floor
}
SquareFactory.prototype.Stone = function (x,y,color) {
    let stone = new Stone(x, y, SQUAREWIDTH, SQUAREWIDTH)
    this.init(stone, color, STRATEGYMESSAGEENUM.DIE);
    return stone
}
SquareFactory.prototype.Food = function(x,y,color) {
    let food = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH)
    if(food.viewContent.style.left) {
        food.upDate(x, y)
    }else {
        this.init(food, color, STRATEGYMESSAGEENUM.EAT);
    }
    return food
};
SquareFactory.prototype.SnakeHead = function (x,y,color) {
    let snakeHead = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH)
    this.init(snakeHead, color, STRATEGYMESSAGEENUM.DIE);
    return snakeHead
 };
SquareFactory.prototype.SnakeBody = function(x,y,color) {
    let snakeBody = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH)
    this.init(snakeBody, color, STRATEGYMESSAGEENUM.DIE);
    return snakeBody
};
var squareFactory = new SquareFactory()