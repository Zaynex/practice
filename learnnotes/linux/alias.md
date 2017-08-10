zsh 可以记录你经常使用的目录。
不过 zsh 并不存在于自己的 shell 中。
可以使用 `alias` 采用别名的方式修改指令。

```
type zsh // zsh is not command

alias zsh='cd /usr;'
```

注意结构
```
alias name='string'
```

如果不使用它
```
unalias zsh
```

但保存的shell 指令都是临时的。还需要保存到文件中，每次登陆系统时，这些文件会建立系统环境。
