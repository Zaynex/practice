/* 基本图文组件对象 */

// 作用——输出DOM,内容，可以是图片或者是文字
// 当前页面载入和移除

var H5ComponentBase = function(name, cfg) {
    //这里传入的配置项
    cfg = cfg || {};
    var id = ("h5_c" + Math.random()).replace('.', '_');
    var cls = ' h5_component_'+cfg.type; 
    var component = $('<div class="h5_component '+cls+' h5_component_name_'+name+'" id="'+id+'">');


    cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width / 2);
    cfg.height && component.height(cfg.height / 2);
    cfg.css && component.css(cfg.css);

    cfg.bg && component.css('backgroundImage', 'url(' + cfg.bg + ')');
    //直接在这里居中，减去1/4其实是1/2,所有的宽度都* 1/2是因为在iphone下可以显示更精致
    if (cfg.center === true) {
        component.css({
            marginLeft: (cfg.width / 4 * -1) + "px",
            left: '50%'
        });
    }
    //这里是给最后一个点击返回的按钮添加的事件
    if(typeof cfg.onclick == 'function'){
        component.on('click', cfg.onclick);
    }
    //----以上是自定义的参数


    component.on('onLoad', function() {
        setTimeout(function(){
            component.addClass(cls + '_load').removeClass(cls + '_leave');
            cfg.animateIn && component.animate(cfg.animateIn);
        }, cfg.delay || 0);
        return false;
    });
    component.on('onLeave', function() {
        setTimeout(function(){
        	component.addClass(cls + '_leave').removeClass(cls +　'_load');
            cfg.animateOut && component.animate(cfg.animateOut);
        }, cfg.delay || 0);
        return false;
    });
    //返回的是DOM元素
    return component;
}
