// 该文件用于生成一些常量

// 游戏场景  广场 宽度系数和高度系数
var XLEN = 15
var YLEN = 15

// 每个方格的宽度
var SQUAREWIDTH = 20

// 蛇的移动时间间隔
var INTERVAL = 300

// 广场位置
var BASE_X_POINT = 200
var BASE_Y_POINT = 100

// 定义基类(方块)
function Square(x, y, width, height, dom) {
    this.x = x || 0
    this.y = y || 0
    this.width = width || 0
    this.height = height || 0
    this.viewContent = dom || document.createElement('div')
}
Square.prototype.upDate = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * SQUAREWIDTH + 'PX'
    this.viewContent.style.top = y * SQUAREWIDTH + 'PX'
}
// 后期通过不同的子类添加上不同的touch方法(模拟java中的接口思想)
Square.prototype.touch = function() {

}

// 定义子类

var Floor = tool.extends(Square)
var Stone = tool.extends(Square)
var Food = tool.single(Square)
var SnakeHead = tool.single(Square)
var SnakeBody = tool.extends(Square)
var Snake = tool.single(Square)
var Ground = tool.single(Square)
var Game = tool.single();  //游戏进度，难度系数等等的操作类


// 策略模式

var STRATEGYMESSAGEENUM = {
    MOVE: 'MOVE',
    EAT: 'EAT',
    DIE: 'DIE',
}


