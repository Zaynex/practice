/**
 * google 加载图片的方式，
 * 1. 给这张图片固定的宽高和  *背景颜色*
 * 2. 给图片的透明度设置为0
 * 3. 待图片加载完全后给图片透明度设置为1 
 * 不过这种方式的缺点是： google 提供一种计算方式来计算这张图片整体是什么颜色
 */

// 以google 为例，先给图片设定背景颜色以及透明度，然后等待图片加载完全后，将透明度设置为1。

$(function(){
    // 假设 .post 对应的是一个图片渲染的树
    $(".post img").each(function(){
        var el = this;
        var image = new Image();
        image.src = el.src;

        image.onload = function(){
            // .loaded 是给图片的透明度还原为1
            $(el).parent().addClass('loaded')
        }
    })
})


/**
 * 预加载
 */

(function(){
    function isArray(obj){
        return Object.prototype.toString.call(obj) === '[object Array]'
    }

    var loader = function(imglist, callback, timeout) {
        timeout = timeout || 5000;
        imglist = isArray(imglist) && imglist || [];
        callback = typeof(callback) === 'function' && callback;


        total = imglist.length,
        loaded = 0,
        images = [],
        _on = function(){
            loaded < total && (++loaded, callback && callback(loaded / total))
        }
        if(!total) {
            callback && callback(1)
        }

        for(var i = 0; i < total; i++) {
            images[i] = new Image();
            images[i].onload = images[i].onerror = _on;
            images[i].src = imglist[i]
        }
        /**
        * 如果timeout * total时间范围内，仍有图片未加载出来（判断条件是loaded < total），通知外部环境所有图片均已加载
        * 目的是避免用户等待时间过长
        */
        setTimeout(function(){
            loaded < total && (loaded = total, callback && callback(loaded / total))
        }, timeout * total)
    }
    return {
        imgLoader: loader
    }
})();

imgLoader(['http://img4.imgtn.bdimg.com/it/u=1266193587,714570883&fm=11&gp=0.jpg','http://img4.imgtn.bdimg.com/it/u=1266193587,714570883&fm=11&gp=0.jpg','http://img4.imgtn.bdimg.com/it/u=1266193587,714570883&fm=11&gp=0.jpg'], function (progress){
console.log(progress);
})