Etag 一般是 md5的 hash值，由server返回，如果发送请求的 If-None-Match 与 Etag 相同，则说明资源没有被修改，可以继续使用。

304 是协商缓存，依然要发送一次请求来验证资源是否被修改过，如果没有被修改过，只是返回请求头部，不返回主体。
问题：那原来的内容是从哪里返回的？

要减少请求就应该让浏览器强制使用本地缓存 (Cache-Control/expires)
状态码返回 200 (from disk/memory cache)
响应头部中 Cache-Control的设置为 max-age为 2592000
Expires `Sat, 01 Jul 2017 02:07:19 GMT`
Last-Modified: `Thu, 04 May 2017 03:45:02 GMT`
X-Via:`1.1 czdx90:4 (Cdn Cache Server V2.0), 1.1 PSzjhzdx3mx41:6 (Cdn Cache Server V2.0)`

缓存策略
让修改后的文件和文件名相关联，我们就能知道哪些资源已经不是最新的，哪些文件依然可以不需要再从服务器中请求了。
这种方式一般都是通过 `webpack`等构建工具来实现。

一般静态资源和动态资源会分集群部署，静态资源会存在 CDN节点上，网页中引用的资源也会变成相对应的部署路径。
```
<link rel="stylesheet" href="https://shared-https.ydstatic.com/ynote/ydoc/style/4167029a.main.css" type="text/css">
```

### 304是怎么来的
有时候我们的缓存过期了，就需要向服务器发起请求，返回完整的内容。
但如果服务器其实并没有更新过这个资源，如果这个资源数据量很大，客户端要求服务器再把这个东西重新发一遍过来，是否非常浪费带宽和时间呢？
我们来通过这段简单的对话来了解 304
```
C：小服，你几岁了？
S：小客，我18岁了。
=================================
C：小服 ，你几岁了？我猜你18岁了。
S：靠，你知道还问我？（304）
=================================
C：小服 ，你几岁了？我猜你18岁了。
S：小客 ，我19岁了。（200）
```

在 HTTP1.1 中新增了几个首部字段来做这几件事情
- Last-Modified
服务器将资源发送给客户端时，会将资源的最后更改时间以 “Last-Modified: GMT” 的形式在实体首部上一起返回给客户端。

客户端为该资源加上这些信息，下次发送请求时会在请求报文（If-Modified-Since）上带给服务器做检查，如果传递的时间值与服务器上该资源最后的修改时间一致，则说明该资源没有被修改过，直接返回304状态码(NOT Modified)，
内容为空，减少了大量的数据传输量，但其实还是发送了一次请求的。
简单来说，就是先发送一个请求进行资源的新鲜度比对。


但是 Last-Modified 还存在一个问题，就是如果服务器上一个资源被修改了，但其实里面的内容没有发生任何改变，会因为 Last-Modified 时间匹配不对而又返回整个实体给客户端。

### Etag
为了解决 Last-Modified 的这个问题， 服务端通过某种算法，计算出一个资源的唯一标识符，把资源响应给客户端的时候，会给实体首部加上 `Etag:唯一标识符` 一起返回给客户端。
客户端会保留 Etag 并且在下次请求时携带上，服务器判断客户端的 Etag 和 Server端的 Etag 是否一致。如果一致，则直接使用本地的缓存即可。

那么客户端是如何把标记在资源上的 Etag 传递给 Server 呢？请求报文首部两个字段可以设置
- If-None-Match: "AmsZ2sI2Rnj"(唯一标识符），如果匹配到否则直接回送304 和响应报头即可。 当前各浏览器均是使用的该请求首部来向服务器传递保存的 ETag 值。
- If-Match

当然，计算 Etag 也是消耗一定的性能的。

## 结论
1. Expires / Cache-Control
Expires用时刻来标识失效时间，因为会受到时间同步的影响，所以在 HTTP1.1中新增了 Cache-Control 来控制时间间隔（max-age等）。

2. Last-Modified / ETag
二者都是通过某个标识值来请求资源是否过期。如果服务器端的资源没有变化，则自动返回 HTTP 304 （Not Changed）状态码，内容为空，这样就节省了传输数据量。
其中Last-Modified使用文件最后修改作为文件标识值，它无法处理文件一秒内多次修改的情况，而且只要文件修改了哪怕文件实质内容没有修改，也会重新返回资源内容；ETag作为“被请求变量的实体值”，其完全可以解决Last-Modified头部的问题，但是其计算过程需要耗费服务器资源。

3. from-cache / 304
有时候，保存在客户端的资源还没有过期，但是服务器上已经修改过了，这就会存在一个版本不符合的问题。而强制刷新一定会发起HTTP请求并返回资源内容，无论该内容在这段时间内是否被修改过。
而Last-Modified和Etag每次请求资源都会发起请求，哪怕是很久都不会有修改的资源，都至少有一次请求响应的消耗。

对于所有可缓存资源，指定一个Expires或Cache-Control max-age以及一个Last-Modified或ETag至关重要。同时使用前者和后者可以很好的相互适应。
前者不需要每次都发起一次请求来校验资源时效性，后者保证当资源未出现修改的时候不需要重新发送该资源。而在用户的不同刷新页面行为中，二者的结合也能很好的利用HTTP缓存控制特性，无论是在地址栏输入URI然后输入回车进行访问，还是点击刷新按钮，浏览器都能充分利用缓存内容，避免进行不必要的请求与数据传输。

总结下：
- 需要兼容HTTP1.0的时候需要使用Expires，不然可以考虑直接使用Cache-Control
- 需要处理一秒内多次修改的情况，或者其他Last-Modified处理不了的情况，才使用ETag，否则使用Last-Modified。
- 对于所有可缓存资源，需要指定一个Expires或Cache-Control，同时指定Last-Modified或者Etag。
- 可以通过标识文件版本名、加长缓存时间的方式来减少304响应。

reference
1. https://mp.weixin.qq.com/s?src=3&timestamp=1498375738&ver=1&signature=Zp6KbzPgT3IBNvIX8xR5RXHw5EU7pSQsfMFjWz7d1RvSTWq1r5e1tzRCWLx80qlWeDRsK4oyZ3m1UgfJfQtQCteZ1eOtbEmzQeiQS3dJCsiuRExFQVNum60mLUpVkHVAoUudWJXuoV9IxvxTPb3Adj-Ur-vnZ46zxz0Jx*Q1uPs=
2. https://mp.weixin.qq.com/s?src=3&timestamp=1498375663&ver=1&signature=buYoL90ILFP8Po1Qshp3SE09MLc5PK8MZ9Yu6GkRbUYHO7DZfQSjxf9N5CqVViIrGuSCzQDepFFIfreY6uLrwAZNNvUlsyf6XaFfHq8kBFYpdJaWWrpsu4nzkliExz6-eZDKO6OP0TV6cUG6LX8taww3SDubF7VEPDh3PKgKMLM=
3. https://mp.weixin.qq.com/s?src=3&timestamp=1498375663&ver=1&signature=uU8JOuu3EvW4WBCkvgRwIqhC7qx7Rk*CwDLmABy9AmQ*8w6wvy0hxjANGNT84ZOPIM*G9p7VWxn-buP2q9Y9S3fH7muLshMPcRlCOobRs7oiKea6*in*fs*Y4Vc9kPrUDzyKGTtC0qrnkkP-dj-cokq0P5nPr4indNGq*3c5xU8=
4. https://mp.weixin.qq.com/s?src=3&timestamp=1498375663&ver=1&signature=oGbg6VF960VlGJCy7VJFObzC3AKrCe6wLwBd6G5kVCTTr29NCFm70x*hNoq5K5xJAEhuXs2dGRG1hg4KHc9LIMY5xrs1OZUlYt9auR68PhXj2aIKyAFjf*uAqv08rahZMCmasdrakWJbiBmdcMs8woDzcfVdtycyN-QW33FU3y4=   
5. http://www.cnblogs.com/shanyou/archive/2012/05/06/2486134.html