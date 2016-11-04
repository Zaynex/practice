/* 垂直柱图组件对象 */

var H5ComponentBar_v = function(name, cfg){
  var component = new H5ComponentBar(name, cfg);
  //保留整数右移
  //这里是按照总长度为100px进行平分
  var width = (100/cfg.data.length) >> 0;
  component.find('.line').width(width + "%");

  $.each(component.find('.rate'), function(){
    var w = $(this).css('width');
    console.log($(this));
    console.log(w);
    $(this).height(w).width(width + "%");
  });

  //添加per
  $.each( component.find('.per'),function(){
    $(this).appendTo( $(this).prev() ) ;
  });

  return component;

};