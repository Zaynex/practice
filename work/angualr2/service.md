angular的数据一般都是在service下的。这和redux的 store不大相同。
service 方法也是通过 constructor 依赖注入，所以在定义service的方法时注意要加上
`@Injectable()`