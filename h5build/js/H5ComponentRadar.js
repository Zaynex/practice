var H5ComponentRadar=function(t,a){var e=new H5ComponentBase(t,a),o=a.width,n=a.height,i=document.createElement("canvas"),s=i.getContext("2d");i.width=s.width=o,i.height=s.height=n,e.append(i);var c=o/2;s.beginPath(),s.arc(c,c,5,0,2*Math.PI),s.stroke();for(var r=a.data.length,h=!1,f=10;f>0;f--){s.beginPath();for(var l=0;l<r;l++){var d=2*Math.PI/360*(360/r)*l,v=c+Math.sin(d)*c*(f/10),M=c+Math.cos(d)*c*(f/10);s.lineTo(v,M)}s.closePath(),s.fillStyle=(h=!h)?"#99c0ff":"#f1f9ff",s.fill()}for(var l=0;l<r;l++){var d=2*Math.PI/360*(360/r)*l,v=c+Math.sin(d)*c,M=c+Math.cos(d)*c;s.moveTo(c,c),s.lineTo(v,M);var g=$('<div class="text">');g.text(a.data[l][0]),v>o/2?g.css("left",v/2+5):g.css("right",(o-v)/2+5),M>n/2?g.css("top",M/2+5):g.css("bottom",(n-M)/2+5),a.data[l][2]&&g.css("color",a.data[l][2]),g.css("opacity",0),g.css("transition","all .5s "+.1*l+"s"),e.append(g)}s.strokeStyle="#e0e0e0",s.stroke();var i=document.createElement("canvas"),s=i.getContext("2d");i.width=s.width=o,i.height=s.height=n,e.append(i);var u=function(t){t<=1&&e.find(".text").css("opacity",0),t>=1&&e.find(".text").css("opacity",1),s.clearRect(0,0,o,n);for(var i=0;i<r;i++){var h=2*Math.PI/360*(360/r)*i,f=a.data[i][1]*t,l=c+Math.sin(h)*c*f,d=c+Math.cos(h)*c*f;s.lineTo(l,d)}s.stroke(),s.fillStyle="#ff7676";for(var i=0;i<r;i++){var h=2*Math.PI/360*(360/r)*i,f=a.data[i][1]*t,l=c+Math.sin(h)*c*f,d=c+Math.cos(h)*c*f;s.beginPath(),s.arc(l,d,5,0,2*Math.PI),s.fill(),s.closePath()}};return e.on("onLoad",function(){for(l=0;l<100;l++)!function(t){setTimeout(function(){u(t/100+.1),console.log(t)},10*t+500)}(l)}),e.on("onLeave",function(){for(l=0;l<100;l++)!function(t){setTimeout(function(){u(1-t/100)},10*t)}(l)}),e};
//# sourceMappingURL=H5ComponentRadar.js.map