/* 散点图表组件对象 */

var H5ComponentPoint = function(name, cfg){
  var component = new H5ComponentBase(name, cfg);
  var base = cfg.data[0][1];
  //尝试用文档碎片，但后来发现jQuery是对象，不是Node节点，所以不能使用之前的文档操作了
  $.each(cfg.data, function(idx, item){
    var point = $('<div class="point point_'+ idx +'"></div>');
    var name = $('<div class="name">'+ item[0] +'</div>');
    var rate = $('<div class="per">'+ ((item[1]/1)*100>>0) +'%</div>');
    var per = (item[1]/base)*100>>0 + "%";

    point.width(per).height(per);
    if(item[2]){
      point.css('background-color', item[2]);
    }
    if(item[3]!= void 0 && item[4] != void 0){
      point.css('left',item[3]).css('top',item[4]);
    }
    name.append(rate);
    point.append(name);
    component.append(point);
    point.css('transition','all 1s '+idx*.5+'s');
  });

    component.find('.point').on('click',function(){

      component.find('.point').removeClass('point_focus');
      $(this).addClass('point_focus');
        return false;
    }).eq(0).addClass('point_focus');

  return component;

};