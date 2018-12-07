


var snake = new Snake()
snake.head = null
snake.tail = null

var DIRECTIONENUM = {
    LEFT: {
        x: -1,
        y: 0
    },
    RIGHT: {
        x: +1,
        y: 0
    },
    TOP: {
        x: 0,
        y: -1
    },
    DOWN: {
        x: 0,
        y: +1
    }
}

// 用于创建蛇
snake.init = function() {
    // 假如以散列的形式（数组）创建蛇头与多截蛇身那么他们，在数据结构上没有关联的对象实例，
    // 而通过链表结构各链表间的嵌套关系使蛇本身是一个整体，使得组成蛇的每一个部分都与其前一部分和后一部分产生关联

    var snakeHead = SquareFactory.create('SnakeHead',3,1,'red')
    var snakeBody1 = SquareFactory.create('SnakeBody',2,1,'deeppink')
    var snakeBody2 = SquareFactory.create('SnakeBody',1,1,'deeppink')
    
    // 更新head与tail
    this.head = snakeHead
    this.tail = snakeBody2

    // 创建链表(双向)
    snakeHead.next = snakeBody1
    snakeHead.last = null
    snakeBody1.next = snakeBody2
    snakeBody1.last = snakeHead
    snakeBody2.next = null
    snakeBody2.last = snakeBody1

    // 移动方向
    this.direction = DIRECTIONENUM.RIGHT;

    // 将坐标值记录在snake.position内
    for( let i = snake.head ; i ; i = i.next) {
        snake.position[`${i.x}_${i.y}`] = true
    }

    // 展示蛇
    ground.remove(snakeHead.x,snakeHead.y)
    ground.append(snakeHead)
    ground.remove(snakeBody1.x, snakeBody1.y)
    ground.append(snakeBody1)
    ground.remove(snakeBody2.x, snakeBody2.y)
    ground.append(snakeBody2)
    
    

}

// 资源池
snake.strategies = {
    MOVE(square,fromEat) {
        // 假如结果为Move时应该对head的坐标作出改变，同时在head原来的位置添加上snakeBody,同时把tail给截掉
        // 根据这个原理，在蛇要转弯时，可以实现身体的弯折，


        // 新建蛇身
        let newBody = SquareFactory.create('SnakeBody',snake.head.x,snake.head.y,'deeppink')
        newBody.next = snake.head.next
        newBody.next.last = newBody
        newBody.last = null

        ground.remove(snake.head.x, snake.head.y)
        ground.append(newBody)
   
        // 更新蛇头坐标
        snake.head.upDate(square.x, square.y)
        snake.head.next = newBody
        newBody.last = snake.head
        snake.head.last = null

        ground.remove(snake.head.x, snake.head.y)
        ground.append(snake.head)

        if(!fromEat) {
            // 截掉tail,安地板，改变蛇尾
            snake.refreshTailPosititon()
            ground.remove(snake.tail.x, snake.tail.y);
            let newFloor = SquareFactory.create("Floor", snake.tail.x, snake.tail.y, "orange");
            ground.append(newFloor)
            snake.tail = snake.tail.last;
        }
        snake.refreshHeadPosititon();
        
    },
    EAT(square) {
        // 结果为EAT时对head坐标作出改变，同时在head原来的位置添加一截蛇身，无需截掉蛇尾
        this.MOVE(square,true)
        game.score ++
        createFood()
    },
    DIE(square) {
        game.over()
    }
}

//根据蛇的移动方向得出当前会碰到的方块,然后获取该方块的结果 根据该方块的结果作出move或eat或die的行为
snake.move = function() {
     // 要移动至的坐标 this.head.x + this.direction.x   this.head.y + this.direction.y
     //蛇的移动即拆地板安地板的操作  
     var square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x]
     if (typeof square.touch === 'function') {
         this.strategies[square.touch()](square)
     }
}

snake.refreshTailPosititon = function () {
    this.position[`${this.tail.x}_${this.tail.y}`] = false;
}

snake.refreshHeadPosititon = function () {
    this.position[`${this.head.x}_${this.head.y}`] = true;
}

snake.position = {

}