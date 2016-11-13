var H5ComponentBar_v=function(n,t){var i=new H5ComponentBar(n,t),e=100/t.data.length>>0;return i.find(".line").width(e+"%"),$.each(i.find(".rate"),function(){var n=$(this).css("width");$(this).height(n).width(e+"%")}),$.each(i.find(".per"),function(){$(this).appendTo($(this).prev())}),i};
//# sourceMappingURL=H5ComponentBar_v.js.map
