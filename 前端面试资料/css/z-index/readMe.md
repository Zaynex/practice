如果 z-index 设置为 auto （默认值）,则该元素为普通元素，里面的元素
那么，哪一方的 z-index 值大，就显示在上方。


如果 z-index 不为 auto，则会创建一个层叠上下文，
下面的元素会覆盖上面的元素。
这就是为什么blue-box 始终会在 dashed-box 的上方的缘故。