/* 基本图文组件对象 */
/**
 * 创建一个图文组件
 * @param {string} name 自定义的图文组件名称
 * @param {object} cfg  配置选项
 */
var H5ComponentBase = function(name, cfg){
    var cfg = cfg || {};
    var type = cfg.type || "base";
    var text = cfg.text || "";
    var id = ( 'h5_c_' + Math.random()).replace(".","_");//生成随机ID

    //传入一个统一类型的class 以及命名的class，便于统一调用
    // var cls =" h5_component_name_" + name + " h5_component_" + cfg.type;    
    var cls = " h5_component_" + cfg.type;
    var component = $('<div class="h5_component '+ cls +' h5_component_name_'+ name +'" id="'+ id +'"></div>');//可以直接写在里面，也可以通过$().text实现
   
    component.text(text);
    //这里让width和height减少一半是希望在高清屏下显示更加细腻
    cfg.width  && component.width(cfg.width/2);
    cfg.height && component.height(cfg.height/2);
    cfg.css    && component.css(cfg.css);
    cfg.bg     && component.css('backgroundImage', 'url(' + cfg.bg + ')');
    cfg.center && component.css({
        marginLeft: (cfg.width/4 * -1) + "px",
        left: '50%',
    });


    if(typeof cfg.onclick === 'function'){
        component.on('click', cfg.onclick);
    }

    component.on('onLoad', function(){
         component.addClass(cls + "_load").removeClass(cls + "_leave");
         cfg.animateIn && component.animate(cfg.animateIn);
        return false;
    });

    component.on('onLeave', function(){
        component.addClass(cls+"_leave").removeClass(cls + "_load");
         cfg.animateOut && component.animate(cfg.animateOut);
        return false;
    });

    return component;

};