一般在开发过程中总是会遇到包出错的问题。有些是因为原来的包已经升级了不向后兼容。所以书写规范的`package.json`中的`dependencies`就显得尤为重要了。

## --save 与 --save-dev
首先先区分下`devDependenices`和`dependencies`的区别。
`dependencies`表示的是项目开发时所依赖的包，比如常用的一些函数库如`underscore`,`lodash`等等。
`devDependenices`表示的而是项目启动时所依赖的包。比如`webpack`还有webpack中你用使用的各种`loaders`。
前者是投入生产时必须使用的，后者是在构建打包你的代码时所采用的一些辅助工具。

## 正确识别所依赖的包的版本
在`devDependenices`或者`dependencies`的选项下，一般会看到如下方式：
```
"dependencies": {
    "react": "~15.1.0",
    "react-dom": "~0.14.3",
    "react-redux": "^4.4.0",
    "react-router": "^2.0.0",
    "redux": "^3.3.1",
    "redux-logger": "^2.5.2",
    "redux-thunk": "^1.0.3"
  },
  "devDependencies": {
    "autoprefixer": "^6.3.6",
    "babel": "^6.5.2",
    "babel-cli": "^6.5.1",
    "babel-code-frame": "^6.3.13",
    "babel-core": "^6.5.2",
    "babel-loader": "^6.2.3",
    "babel-preset-es2015": "^6.5.0",
    "babel-preset-react": "^6.5.0",
    "babel-preset-stage-0": "^6.5.0",
    "css-loader": "^0.23.1",
    "es6-promise": "^3.1.2",
    "image-webpack-loader": "^1.6.3",
    "stats-webpack-plugin": "^0.4.2",
    "style-loader": "^0.13.0",
    "url-loader": "^0.5.7",
    "webpack": "^1.12.9",
    "webpack-hot-middleware": "^2.6.0"
  },
```
我们以`webpack:^1.12.9`为例：
数字`1`表示大版本，数字`12`表示小版本，一般最后一个`.`的数字表示的是bugfix之类的。通常小版本会兼容原来的API,但大版本更新变动会比较大，不过这个得看当时设计模块的作者了。有时候就是因为包更新了之后接口并没有向后兼容，导致开发过程中产生了一些问题。

我们会看到包的版本号前面有
`^``~`，其实还有`latest`。这个我们就需要认真的看一下。
`^`表示安装`1.^`的最新版本，不低于`1.12.9`这个版本，但是不改变大版本号，也就是不会升到`2.0`。（当然， 现在webpack已经出2.0了）
`~`在`"react": "~15.1.0"`表示安装