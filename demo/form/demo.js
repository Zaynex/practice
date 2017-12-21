


function showPreview(source) {  
	var showBox = document.getElementById('portrait');
    var file = source.files[0];
    if(!/image\/\w+/.test(file.type)){  
        alert("请确保文件为图像类型");  
        return false;  
    }    
    if(window.FileReader) {  
        var fr = new FileReader();  
        fr.readAsDataURL(file);//读取文件并将文件保存在result属性中
        
        fr.onloadend = function(e) {
	        showBox.innerHTML += '<img src=\"'+ e.target.result +'"/>';
        };   
    }  else {
    	alert("Not supported by your browser!");  
    }
}  	