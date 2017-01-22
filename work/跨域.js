同源策略： 协议，主机以及端口号
脚本只能读取和所属文档来源相同的窗口和文档的属性。

为了支持多个子域名相同的站点，可以使用domain属性。
domain存放的是载入文档的服	务器主机名。
比如 a.example.com
	 b.example.com 

设定字符串 example.com 
如果两个窗口包含的脚本把domain设置成了相同的值，两个窗口就不再受同源策略的限制，它们可以相互读取对方的属性。

CORS
cross-origin-resource-sharing
	
请求头： Origin:
服务端设置响应 Access-Control-Allow-Origin
根据通配符来匹配所有的源并允许由任何地址请求文件。


跨文档消息(cross-document messaging)
允许一个文档的脚本传递文本消息到另外一个文档的脚本，而不管脚本的来源是否相同。
调用Window.postMessage()方法，异步传递消息事件到窗口的文档里。



GET和POST区别
GET用于常规请求，适用于当URL完全制定请求资源，当请求对服务器没有任何副作用以及当服务器的相应是可缓存时。

POST主要用于表单，它在请求主题中包含额外数据（表单数据）并且这些表达数据常存储到服务器上的数据库中（副作用）
相同的URL重复的POST请求从服务器得到的响应可能不同。
GET请求没有主体，所以send应该传递nul或者忽略参数，但是POST通常拥有主体，同时它应该匹配使用setRequestHeader()指定的 Content-Type 头。

