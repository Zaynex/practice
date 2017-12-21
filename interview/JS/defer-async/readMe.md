
### 测试环境
- system:windows7 
- chrome 58.0.3029.81 (64-bit)

### 结论
defer 和 async 都属于异步加载，但是 defer 脚本会优先于 async 执行。
当然如果defer中也存在异步的话，就不一定了。