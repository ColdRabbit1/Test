function animate(obj,target,callback) {
    // 调用函数先清除计时器，这样不会出现多次点击按钮重复设置计时器的问题
    clearInterval(obj.t1);
    //使用obj.t1写法，解决了内存浪费问题，同时也解决了定时器名字有歧义的问题（因为obj是一个对象，div和span是它的一个属性，在给定时器命名时，div.t1和span.t1就有了不同的名字）
    // 舍弃了var t1 = setInterval(); 这种写法，因为每次调用该函数时var都会开辟一个新内存空间，造成浪费
    obj.t1 = setInterval(function () {
        // 求出步长 step
        var step = (target - window.pageYOffset) / 10;
        // Math.ceil() 向上取整，避免盒子前进时出现到不了目标位置的情况；Math.floor()向下取整，避免后退时出现到不了目标位置的情况
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (window.pageYOffset == target){
            clearInterval(obj.t1);
            // 定时器关闭后，调用回调函数
            if(callback){
                callback();
            }
        }else {
            // obj.style.left = window.pageYOffset + step + 'px';
            window.scroll(0,window.pageYOffset + step);
        }
    }, 15);
}