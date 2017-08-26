- head -n 5: 输出文档的前五行
- tail -n 5: 输出文档的后五行


实时查看文件的进展（比如 日志)
```
tail -f /var/log/messages
```

- tee: 从 stdin 读取数据，并同时输出到Stdout和文件

echo 输出表达式
```
echo $((5-2))
```
每次都需要 `$(())` 包裹

## 创建一系列目录或列表
```
mkdir {2016..2017}-{1..9} {2016..2017}-{10..12}
```
创建`2016-01 - 2016-12 ~ 2017.01 - 2017.12`的目录

