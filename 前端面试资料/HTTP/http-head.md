## 首部字段
### 通用首部字段
- Cache-Control: 控制缓存的行为
- Pragma: 设置 `no-cache` 时表示禁用缓存

### 请求首部字段
- If-Match: 比较 `ETag` 是否一致
- If-None-Match: 比较 `ETag` 是否不一致
- If-Modified-Since: 比较资源最后更新的时间是否一致
- If-Unmodified-Since: 比较资源最后更新的时间是否不一致

### 响应首部字段
- ETag: 资源匹配信息

### 实体首部字段
- Expires: 表明实体主体过期的时间(HTTP/1.0)
- Last-Modified: 资源最后一次修改的时间 (在 response 中也存在)

## 各字段详解
### Expires
启动缓存以及定义缓存时间
```
expires:Wed, 13 Sep 2017 06:13:50 GMT
```
表示在2017年10月13日6点13分50秒之后过期。如果没过这个时间点，则不返回请求主体内容。直接在缓存中读取。

### Cache-Control
由于 Expires 是相对于服务器而言的，无法保证客户端和服务器时间的统一的问题，在 HTTP1.1中增加了 Cache-Control 中
定义了缓存过期时间。如果同时设置了 Expires 和 Cache-Control，则以 Cache-Control 为准。
作为请求首部时，其提供的可选项有：
- no-cache: 告知（代理）服务器不直接使用缓存，要求向原服务器发送请求
- no-store: 所有内容不会被保存到缓存或 Internet 临时文件中
- max-age=delta-seconds： 告知服务器希望收到一个接受时间不大于 delta-seconds 的资源
- max-stale: 告知服务器，客户端意愿接受一个超过缓存时间的资源，若有定义，则表示接受超过多少时间返回，如果没有则表示任意超出时间

作为响应请求首部时，提供的可选项有：
- public: 表明任何情况下都可以缓存该资源
- private: 表明报文中部分仅开发给某些用户做缓存使用
- no-cache: 不直接使用缓存，要求向服务器发起（新鲜度）校验
- no-store: 所有的内容都不会被保存到缓存或 Internet 中
- max-age=delta-seconds: 告知客户端资源在 delta-seconds 是新鲜的，无需向服务器发起请求
- s-maxage=delta-seconds: 同max-age，但仅用于共享缓存
