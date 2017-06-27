在淘宝的官网上有dns-prefetch`
```
<link rel="dns-prefetch" href="//g.alicdn.com" />
<link rel="dns-prefetch" href="//img.alicdn.com" />
<link rel="dns-prefetch" href="//tce.alicdn.com" />
<link rel="dns-prefetch" href="//gm.mmstat.com" />
<link ref="dns-prefetch" href="//tce.taobao.com" />
<link rel="dns-prefetch" href="//log.mmstat.com" />
<link rel="dns-prefetch" href="//tui.taobao.com" />
<link rel="dns-prefetch" href="//ald.taobao.com" />
<link rel="dns-prefetch" href="//gw.alicdn.com" />
<link rel="dns-prefetch" href="//atanx.alicdn.com"/>
<link rel="dns-prefetch" href="//dfhs.tanx.com"/>
<link rel="dns-prefetch" href="//ecpm.tanx.com" />
<link rel="dns-prefetch" href="//res.mmstat.com" />
<link rel="dns-prefetch" href="//log.mmstat.com" />
```

它能告诉浏览器去主动进行DNS域名解析，其范围包括文档的所有连接，无论是图片，css还是js文件。
因为预解析会在后台执行，所以DNS很可能在链接对应的东西之前就已经解析完毕。这能够减少用户点击链接时产生的时延。

一般在前端优化中与DNS有关的两点：1、减少请求次数，2、提前对DNS预获取。DNS作为互联网的基础协议，其解析速度很容易被网站优化人员SEO人员忽视，其典型的一次dns-prefetch解析需要“20-120ms",减少DNS解析时间和次数是一个不错的优化方式。

### 正确使用的方式
- 对静态资源域名做手动dns prefetching。 
- 对js里会发起的跳转、请求做手动dns prefetching。 
- 不用对超链接做手动dns prefetching，因为chrome会自动做dns prefetching。
- 对重定向跳转的新域名做手动dns prefetching，比如：页面上有个A域名的链接，但访问A会重定向到B域名的链接，这么在当前页对B域名做手动dns prefetching是有意义的。

## File Prefetching
所谓 File Prefetching 就是在一个页面加载成功后，默默去预加载后续可能会被访问到的页面的资源。 

1. http://delai.me/code/dns-prefetching/
2. http://delai.me/code/file-frefetching/
3. https://developer.mozilla.org/zh-CN/docs/Controlling_DNS_prefetching
4. http://blog.sina.com.cn/s/blog_bf9440220102wwgo.html
5. http://www.phpied.com/preload-cssjavascript-without-execution/