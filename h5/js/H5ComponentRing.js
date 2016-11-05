//环图，本质上就是在饼图的基础上加一个遮罩层
var H5ComponentRing = function(name, cfg){
  cfg.type = "pie";
  if(cfg.length >1){
    cfg.data = [cfg.data][0];
  }

  var component = new H5ComponentPie(name, cfg);

  var mask = $('<div class="mask">');
  console.log(mask);
  component.addClass("h5_component_ring");
  component.append(mask);
  var text = component.find(".text");

  // component.append(mask);
  text.attr('style', '');
  if(cfg.data[0][2]){
    text.css('color', cfg.data[0][2]);
  }
  mask.append(text);
  return component;
}