/* 基本图文组件对象 */

// 作用——输出DOM,内容，可以是图片或者是文字
// 当前页面载入和移除

var H5ComponentBase = function(name, cfg) {
    cfg = cfg || {};
    var id = ("h5_c" + Math.random()).replace('.', '_');
    var cls = ' h5_component_'+cfg.type; 
    var component = $('<div class="h5_component '+cls+' h5_component_name_'+name+'" id="'+id+'">');


    cfg.text && component.text(cfg.text);
    cfg.width && component.width(cfg.width / 2);
    cfg.height && component.height(cfg.height / 2);
    cfg.css && component.css(cfg.css);

    cfg.bg && component.css('backgroundImage', 'url(' + cfg.bg + ')');

    if (cfg.center === true) {
        component.css({
            marginLeft: (cfg.width / 4 * -1) + "px",
            left: '50%'
        });
    }

    //----以上是自定义的参数


    component.on('onLoad', function() {
        component.addClass(cls + '_load').removeClass(cls + '_leave');
        cfg.animateIn && component.animate( cfg.animateIn);
        return false;
    });
    component.on('onLeave', function() {
    	component.addClass(cls + '_leave').removeClass(cls +　'_load');
        cfg.animateOut && component.animate(cfg.animateOut);
        return false;
    });
    //返回的是DOM元素
    return component;
}
