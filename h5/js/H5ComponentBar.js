/* 柱图组件对象 */

var H5ComponentBar = function(name, cfg){
  var component = new H5ComponentBase(name, cfg);

  $.each(cfg.data, function(idx, item){
    var line = $('<div class="line"></div>');
    var name = $('<div class="name"></div>');
    var rate = $('<div class="rate"></div>');
    var per = $('<div class="per"></div>');
    
    var width = item[1]*100 + "%";
    var bg = $('<div class="bg"></div>');
    rate.append(bg);

    //如果存在颜色
    if(item[2]){
      bg.css('background-color',item[2]);
    }

    rate.css('width', width);
    name.text(item[0]);
    per.text(width);
    line.append(name).append(rate).append(per);
    component.append(line);

  });

  return component;
}



















// var H5ComponentBar =function ( name, cfg ) {
//   var component =  new H5ComponentBase( name ,cfg );

//   $.each(cfg.data,function(idx,item){

//     var line = $('<div class="line">');
//     var name = $('<div class="name">');
//     var rate = $('<div class="rate">');
//     var per = $('<div class="per">');

//     var width = item[1]*100 + '%';

//     var  bgStyle = '';
//     if( item[2] ){
//       bgStyle = 'style="background-color:'+item[2]+'"';
//     }

//     rate.html( '<div class="bg" '+bgStyle+'></div>' );

//     rate.css('width',width);

//     name.text( item[0]);

//     per.text(width);

//     line.append( name ).append( rate ).append( per );

//     component.append(line);
//   });

//   return component;
// }