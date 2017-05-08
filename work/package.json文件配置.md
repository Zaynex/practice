一般在开发过程中总是会遇到包出错的问题。有些是因为原来的包已经升级了不向后兼容。所以书写规范的`package.json`中的`dependencies`就显得尤为重要了。

## --save 与 --save-dev
首先先区分下`devDependenices`和`dependencies`的区别。
`dependencies`表示的是项目开发时所依赖的包，比如常用的一些函数库如`underscore`,`lodash`等等。
`devDependenices`表示的而是项目启动时所依赖的包。比如`webpack`还有webpack中你用使用的各种`loaders`。
前者是投入生产时必须使用的，后者是在构建打包你的代码时所采用的一些辅助工具。

### peerDependencies
> 有时，你的项目和所依赖的模块，都会同时依赖另一个模块，但是所依赖的版本不一样。比如，你的项目依赖A模块和B模块的1.0版，而A模块本身又依赖B模块的2.0版。大多数情况下，这不构成问题，B模块的两个版本可以并存，同时运行。但是，有一种情况，会出现问题，就是这种依赖关系将暴露给用户。
> 最典型的场景就是插件，比如A模块是B模块的插件。用户安装的B模块是1.0版本，但是A插件只能和2.0版本的B模块一起使用。这时，用户要是将1.0版本的B的实例传给A，就会出现问题。因此，需要一种机制，在模板安装的时候提醒用户，如果A和B一起安装，那么B必须是2.0模块。

所以，利用 peerDependencies 可以来确定插件的安装依赖版本。
```
{
  "name": "chai-as-promised",
  "peerDependencies": {
    "chai": "1.x"
  }
}
```
比如上面这个`chai-as-promised`这个插件，必须要安装 `chai`的`1.x`版本，安装其他版本都会报错。

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

`~ ` 在 `"react":"~15.1.0"`
表示安装`react`的版本不低于`15.1.0`，但会大于`15.2`这个版本。

`latest`表示始终安装最新版本的包。
不加任何符号表示安装指定版本。

## 解决不同客户端安装依赖版本差异问题
虽然我们写了`package.json`，但依然可能存在不同的开发者依赖不同版本的包，导致有些人能work，有些人就是不work，还要把上百M的包压缩好后，传来传去。

使用`yarn`就可以解决上述问题。当然，它在强大之处不仅于此。
全局安装`yarn`。
```
npm install -g yarn
yarn install
```

在执行 `yarn install` 的时候会读取`package.json`文件，并生成一个 `yarn.lock`文件。这个文件就会确保所有用户安装的依赖是相同的。然后就会安装依赖包了。这个跟`npm install`没区别。

不过使用 `yarn-cli`命令可以同步更新 `yarn.lock`和`package.json`依赖包的版本。
提供的命令常用的如下：
```
yarn add 
yarn remove
yarn init
yarn install
```

https://yarnpkg.com/zh-Hans/docs/dependency-versions
https://www.zhihu.com/question/51502849