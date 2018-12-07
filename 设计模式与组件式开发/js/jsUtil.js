var tool = {
    // 操作类继承关系,实现公共方法继承
    inherit(target,origin) {
        // 把Square原型上的touch方法继承过来
        // 这里不应该target.prototype = new origin() 的原因在于 orgin内的x,y,width,height是应该作为最后生成的方块的私有属性，
        // 而假如它是方块的原型上的属性的话，虽然在代码逻辑上没有太大的问题，但不符合我们的本意以及日常生活的逻辑，会显得不太合适
        function temp() {}
        temp.prototype = origin ? origin.prototype : {}
        target.prototype = new temp()
        target.prototype.constructor = target
    },
    // 实现实例的专属属性
    extends(origin) {
        let result = function() {
            // 在函数体内借用Square内的属性实现私有化属性的继承
            // 传入的this为 new result时的this,即等同于在Square内操作result的this, 使result的this具备了 x,y,width,height等属性
            origin.apply(this,arguments)
        }
        this.inherit(result,origin)
        return result
    },
    // 创建单例
    single(origin) {
        // (多次new也是同一个)
        let singleResult = (function() {
            let instance;
            return function() {
                if(typeof instance === 'object') {
                    return instance
                }
                origin && origin.apply(this,arguments)
                instance = this
            }
        })()
        this.inherit(singleResult,origin)
        return singleResult
    },
    throttle: function(fn) {
        let timer = null
        return function (e) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(e)
            }, 100);
        }
    }
}

