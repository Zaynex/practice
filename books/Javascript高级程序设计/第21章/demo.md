# AJAX

## XMLHttpRequest对象 Level1
原生实现方法
```
//ie7+
var xhr = new XMLHttpRequest();

//早期版本
function createXHR() {
	if(typeof XMLHttpRequest != 'undefined') {
		return new XMLHttpRequest();
	}else if (typeof ActiveXObject != 'undefined') {
		if(typeof arguments.callee.activeXString != "string") {
			var versions = ['MSXML2.XMLHttp.6.0','MSXML2.XMLHttp.3.0','MSXML2.XMLHttp'],
			i,len;

			for(i = 0, len = versions.length; i < len; i++) {
				try{
					new ActiveXObject(versions[i]);
					arguments.callee.activeXString = versions[i];
					break;
				} catch(ex) {
					//
				}
			}
		}
		return new ActiveXObject(arguments.callee.activeXString);
	} else {
		throw new Error("No XHR object available.");
	}
}
```
### XHR用法
```
//请求类型（get,post等），请求的URL、是否异步发送请求的布尔值
xhr.open('get','example.php',false)
```
open方法building会真正发送请求，只是启动一个请求以备发送。
只能向一个域中使用相同端口号以及协议的URL发送请求。

#### send
发送特定类型请求
```
xhr.open('get','example.txt',false);
xhr.send(null);
```
send接受参数表示要作为请求主体发送的数据。如果不需要通过请求主体发送数据则必须传入null。
由于这次请求是同步的，JavaScript会等到服务器响应后再继续执行。收到响应的数据会自动填充XHR对象的属性。
- responseText : 作为响应主体被返回的文本
- responseXML : 如果响应内容是"text/xml"或者是"application/xml".该属性保存响应数据的XML DOM文档
- status : 响应的HTTP状态
- statusText : HTTP状态说明

```
xhr.open('get','example.php',false);
xhr.send(null);
if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
	alert(xhr.responseText);
}else {
	alert('Request was unsuccessful:' + xhr.status);
}
```
无论内容类型是什么，响应主体的内容都会保存到responseText属性中，而对于非XML数据而言，responseText属性值为null.

#### 异步发送请求
- 0: 未初始化。未调用open()方法
- 1: 启动。调用open()方法
- 2: 发送。调用send()方法
- 3：接受。收到部分响应数据
- 4：完成，收到全部响应数据，并可以在客户端使用

```
var xhr = createXHR();
xhr.onreadyStatechange = function(){
	if (xhr.readyState == 4) {
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
			alert(xhr.responseText);
		}else{
			alert("Request was unsuccessful:" + xhr.status);
		}
	}
};
xhr.open('get','example.txt','true');
xhr.send(null);
//xhr.abort()取消异步请求。
```
有的代码用this替换了xhr对象，但并不推荐这样使用，原因是`onreadystatechange`事件处理程序的作用域问题。在有的浏览器中会导致函数执行失败，或者导致错误发生。

### HTTP头部信息
- Accept: 浏览器能处理的内容类型
- Accpet-Charset: 浏览器能显示的字符集
- Accpet-Encoding: 浏览器能够处理的压缩编码
- Accpet-Language: 浏览器当前设置的语言
- Connection: 浏览器和服务器之间连接的类型
- Cookie: 当前页面设置的任何Cookie
- Host: 发出请求页面所在的域
- Referer: 发出请求页面的RUI
- User-Agent: 浏览器的用户代理字符串
```
var xhr = createXHR();
xhr.onreadyStatechange = function(){
	if (xhr.readyState == 4) {
		if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
			alert(xhr.responseText);
		}else{
			alert("Request was unsuccessful:" + xhr.status);
		}
	}
};
xhr.open('get','example.txt','true');
xhr.setRequestHeader("Myheader","Myvalue");
xhr.send(null);
```
建议自定义头部字段名称

获取头部信息
```
var myHeader = xhr.getResponseHeader("MyHeader");
var allHeaders = xhr.getAllResponseHeaders();
```

### GET请求
常用于向服务器查询某些数据。可以将查询字符串参数追加到RUL末尾，以便将信息发送给服务器。
查询字符串参数的名称和值都必须使用encodeURIComponent()进行编码，然后才放到URL的末尾。
```javascript
var xhr.open("GET","exmaple.php?name1=value2&name2=value2");
```
可以使用辅助函数向现有的URL的末尾添加查询字符串参数
```javascript
function addURLParam(url, name, value){
	url += (url.indexOf("?")) == -1 ?  "?":"&";
	url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
}
var url = "example.php";
url = addURLParam(url, "name", "Nicholas");
url = addURLParam(url, "book", "Professional JavaScript");

xhr.open("get", url, false);
```

### POST
```
xhr.open("post","example.php", true); 
```
由于服务器对POST和表单请求不会一视同仁，因此服务器必须有程序读取发送过来的原始数据再从中解析出有用的部分。
用XHR模拟表单提交。
将Content-type的头部信息设置为application/x-www-form-urlencoded.
```javascript
function submitData(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4) {
			if(xhr.status === 200) {
				alert(xhr.responseText);
			}else{
				alert("Request was failed" + xhr.status);
			}
		}
	};
	xhr.open("post","example.php", true);
	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	var form = document.getElementById('user-info');
	xhr.send(serialize(form));
}
```

## XMLHttpRequest Level2
XMLHttpRequest是一个浏览器接口，使得Javascript可以进行 HTTP (S) 通信。但是，这个接口一直没有标准化，每家浏览器的实现或多或少有点不同。HTML 5 的概念形成后，W3C 开始考虑标准化这个接口。2008年 2 月，提出了XMLHttpRequest Level 2 草案。
以下是新版本的新增特性：
* 可以设置HTTP（S）请求的时限。
* 可以使用FormData对象管理表单数据。
* 可以上传文件。
* 可以请求不同域名下的数据（跨域请求）。
* 可以获取服务器端的二进制数据。
* 可以获得数据传输的进度信息。

### FormDate
表单数据序列化,表单序列化的好处就是我们不需要再设定请求头部 
```javascript

var data = new FormData();
data.append("name", "Nicholas");
//也可以用表单元素的数据预先向其中添加键值对
var data = new FormData(document.forms[0]);
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4) {
		if(xhr.status === 200) {
			alert(xhr.responseText);
		}else{
			alert("Request was failed" + xhr.status);
		}
	}
};
xhr.open("post","example.php", true);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
var form = document.getElementById('user-info');
xhr.send(new FormData(form));
```

### 超时设定
```javascript
xhr.open("post","example.php", true);
xhr.timeout = 1000;// 1秒
xhr.outimeout = function(){
	alert("requset did not return in a second");
}
xhr.send(null);
var form = document.getElementById('user-info');
xhr.send(new FormData(form));
```
### overrideMimeType()方法
老版本的XMLHttpRequest对象，只能从服务器取回文本数据（否则它的名字就不用XML起首了），新版则可以取回二进制数据。
这里又分成两种做法。较老的做法是改写数据的MIMEType，将服务器返回的二进制数据伪装成文本数据，并且告诉浏览器这是用户自定义的字符集。
下面是一个获取图片文件的代码示例：
```
var xhr = new XMLHttpRequest();
//向 server 端获取一张图片
xhr.open('GET', '/path/to/image.png', true);

// 这行是关键！
//将响应数据按照纯文本格式来解析，字符集替换为用户自己定义的字符集
xhr.overrideMimeType('text/plain; charset=x-user-defined');

xhr.onreadystatechange = function(e) {
  if (this.readyState == 4 && this.status == 200) {
    //通过 responseText 来获取图片文件对应的二进制字符串
    var binStr = this.responseText;
    //然后自己再想方法将逐个字节还原为二进制数据
    for (var i = 0, len = binStr.length; i < len; ++i) {
      var c = binStr.charCodeAt(i);
      //String.fromCharCode(c & 0xff);
      var byte = c & 0xff; 
    }
  }
};

xhr.send();
```

```
xhr.overrideMimeType("text/plain; charset=x-user-defined");
```
然后，用responseText属性接收服务器返回的二进制数据。
```
　　var binStr = xhr.responseText;
```
由于这时，浏览器把它当做文本数据，所以还必须再一个个字节地还原成二进制数据。
```
　　for (var i = 0, len = binStr.length; i < len; ++i) {
　　　　var c = binStr.charCodeAt(i);
　　　　var byte = c & 0xff;
　　}
```
最后一行的位运算"c & 0xff"，表示在每个字符的两个字节之中，只保留后一个字节，将前一个字节扔掉。原因是浏览器解读字符的时候，会把字符自动解读成Unicode的0xF700-0xF7ff区段。

### 进度事件
新版本的XMLHttpRequest对象，传送数据的时候，有一个progress事件，用来返回进度信息。
- load事件：接收到完整的响应数据时触发。
- abort事件：传输被用户终止。
- error事件：传输中出现错误。
- loadstart事件：传输开始。
- loadEnd事件：传输结束，但是不知道成功还是失败。
- progress事件： 在接受响应期间不断触发。
它分成上传和下载两种情况。下载的progress事件属于XMLHttpRequest对象，上传的progress事件属于XMLHttpRequest.upload对象。
我们先定义progress事件的回调函数。
```javascript
xhr.onprogress = updateProgress;
xhr.upload.onprogress = updateProgress;
```
然后，在回调函数里面，使用这个事件的一些属性。
```javascript
　function updateProgress(event) {
　　　　if (event.lengthComputable) {
　　　　　　var percentComplete = event.loaded / event.total;
　　　　}
　　}
```
上面的代码中，event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0。

### 指定响应格式
让我们利用 `XMLHttpRequest` 新增的 `responseType` 和 `response` 属性，告知浏览器我们希望返回什么格式的数据。

- xhr.responseType
在发送请求前，根据您的数据需要，将 xhr.responseType 设置为“text”、“arraybuffer”、“blob”或“document”。请注意，设置（或忽略）xhr.responseType = '' 会默认将响应设为“text”。
- xhr.response
成功发送请求后，xhr 的响应属性会包含 DOMString、ArrayBuffer、Blob 或 Document 形式（具体取决于 responseTyp 的设置）的请求数据。
凭借这个优秀的新属性，我们可以修改上一个示例：以 ArrayBuffer 而非字符串的形式抓取图片。将缓冲区移交给 BlobBuilder API 可创建 Blob：


```
<script src="http://cdn.bootcss.com/jquery/1.11.1/jquery.min.js"></script>
<div id="showImg"></div>
```
```javascript
var xhr = new XMLHttpRequest();
url = "1.jpg";//对应的图片路径
xhr.open('GET', url, true);
//可以将`xhr.responseType`设置为`"blob"`也可以设置为`" arrayBuffer"`
//xhr.responseType = 'arrayBuffer';
xhr.responseType = 'blob';

xhr.onload = function(e) {
  if (this.status == 200) {
    var blob = this.response;
    var img = document.createElement("img");
	img.src = window.URL.createObjectURL(blob);
	img.onload = function(e){
 		window.URL.revokeObjectURL(img.src);   //有问题，将blob加载到img中 由于blob太大 会有性能影响 应该怎么在加载之后 如何
	}
	$("#showImg").html(img); jQuery方法
	//document.getElementById("showImg").appendChild(img); //也可以这么玩，为什么不能直接用innerHTML呢？想想
  }
};

```





http://www.cnblogs.com/aaronjs/p/3279314.html