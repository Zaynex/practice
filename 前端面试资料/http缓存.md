首次发送请求时。
相应首部返回
cache-control: max-age=212121323
etag:'djkjxjsdshdjklwejkl2'
expires: Mon, 24 Nov 2017 23:12:11 GMT
last-modified: Thu, 26 Nov 2017 08:10:10 GMT

etag: 后端产生的令牌。

通用首部字段(请求报文和响应报文都能用上的字段)
Cache-Control: 控制缓存行为

请求首部字段
If-Match: ETag是否一致
If-None-Match: ETag是否不一致
If-Modified-Since: 比较资源最后更新的时间是否一致
If-Unmodified-Since： 比较资源最后更新的时间是否不一致
比如：
If-Modified-Since: Thu, 31 Mar 2016 07:07:52 GMT
该请求首部告诉服务器如果客户端传来的最后修改时间与服务器上的一致，则直接回送304和响应报头即可。
当前各浏览器均是使用的该请求首部来向服务器传递保存的 Last-Modified 值。


相应首部字段(response header)
ETag: 资源匹配的信息

为了解决Last-Modified可能存在的不准确的问题，Http1.1还推出了 ETag 实体首部字段。
服务器会通过某种算法，给资源计算得出一个唯一标志符（比如md5标志），在把资源响应给客户端的时候，会在实体首部加上“ETag: 唯一标识符”一起返回给客户端。

客户端会保留该 ETag 字段，并在下一次请求时将其一并带过去给服务器。服务器只需要比较客户端传来的ETag跟自己服务器上该资源的ETag是否一致，就能很好地判断资源相对客户端而言是否被修改过了。



实体首部字段(reponse header)
Expires: 过期时间
Last-Modified: 资源最后一次修改时间
服务器将资源传递给客户端时，会将资源最后更改的时间以“Last-Modified: GMT”的形式加在实体首部上一起返回给客户端。
客户端会为资源标记上该信息，下次再次请求时，会把该信息附带在请求报文中一并带给服务器去做检查，若传递的时间值与服务器上该资源最终修改时间是一致的，则说明该资源没有被修改过，直接返回304状态码即可。

大多数浏览器在点击刷新按钮或按F5时会自行加上“Cache-Control:max-age=0”请求字段
所以一般刷新多指的是选中url地址栏并按回车键（这样不会被强行加上Cache-Control）。

由于Expires是相对服务器而言，无法保证和客户端时间统一。http1.1新增了 Cache-Control 来定义缓存过期时间。Expires 和 Cache-Control，会以 Cache-Control 为准。

Cache-Control请求首部可以设置的字段有
- no-cache: 在获得缓存资源前先向服务器进行验证
- no-store: 不缓存
- max-age: 告知服务器，客户端期望接受不超过多少持续时间的资源
- 等等

相应首部可以设置的字段有
- private: 报文中的相应仅开放给部分用户做缓存使用，其他用户则不能缓存这些数据
- public: 任何情况下都可以缓存该资源
- max-age: 告知客户端该资源在多少时间内是有效缓存的，无需再次加载
- 等等
