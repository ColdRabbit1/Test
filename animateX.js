// 缓动动画原理：
//      1. 让盒子每次变化的距离逐渐变小
//      2. 核心算法：step = （目标位置 - 原始位置） / 10
//      3. 到达指定位置，关闭计时器
//  注意：一定要给盒子加一个定位
// 封装一个动画函数 传递两个参数 obj目标盒子  target目标位置
function animate(obj,target,callback) {
    // 调用函数先清除计时器，这样不会出现多次点击按钮重复设置计时器的问题
    clearInterval(obj.t1);
    //使用obj.t1写法，解决了内存浪费问题，同时也解决了定时器名字有歧义的问题（因为obj是一个对象，div和span是它的一个属性，在给定时器命名时，div.t1和span.t1就有了不同的名字）
    // 舍弃了var t1 = setInterval(); 这种写法，因为每次调用该函数时var都会开辟一个新内存空间，造成浪费
    obj.t1 = setInterval(function () {
        // 求出步长 step
        var step = (target - obj.offsetLeft) / 10;
        // Math.ceil() 向上取整，避免盒子前进时出现到不了目标位置的情况；Math.floor()向下取整，避免后退时出现到不了目标位置的情况
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target){
            clearInterval(obj.t1);
            // 定时器关闭后，调用回调函数
            if(callback){
                callback();
            }
        }else {
            obj.style.left = obj.offsetLeft + step + 'px';
        }
    }, 15);
}