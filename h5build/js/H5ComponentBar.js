var H5ComponentBar=function(a,n){var d=new H5ComponentBase(a,n);return $.each(n.data,function(a,n){var e=$('<div class="line"></div>'),s=$('<div class="name"></div>'),i=$('<div class="rate"></div>'),p=$('<div class="per"></div>'),t=100*n[1]+"%",v=$('<div class="bg"></div>');i.append(v),"string"==typeof n[2]&&v.css("background-color",n[2]),i.css("width",t),s.text(n[0]),p.text(t),e.append(s).append(i).append(p),d.append(e)}),d};
//# sourceMappingURL=H5ComponentBar.js.map
