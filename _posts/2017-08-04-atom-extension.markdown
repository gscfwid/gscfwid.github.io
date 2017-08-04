---
layout: post
date: 2017-08-04 21:48
title: 我使用的几个atom插件
categories: computer
---

Atom是非常好用的一款编辑器，这其中一个很重要的原因就是有大量的插件可供选择。刚开始接触python的时候，编辑器sublime是特别被推荐的，但是我使用的过程中，中文编码总是会出问题，因此考虑用atom代替sublime。出乎我意料的是，这个任务atom完全能胜任，有过之无不及：sublime上绝大多数的插件，同名即可在atom上搜索到，作用也几乎一样。在这篇文章里，我将推荐几个我常用的extension作为交流。

### Auto-runner

顾名思义，它可以让很多语言的脚本运行起来。包括JS、python、Ruby等。在win上的快捷键是Alt+R，在mac上为ctrl+R。

详细的说明文件可访问[此链接](https://atom.io/packages/atom-runner)。

### Autocomplete系列

自动填充。对于像我这种刚开始敲代码的，没有这类插件简直会疯掉。

- [autocomplete-html](https://atom.io/packages/autocomplete-html)
- [autocomplete-css](https://atom.io/packages/autocomplete-css)
- [autocomplete-plus](https://github.com/atom/autocomplete-plus)

### [emmet](https://atom.io/packages/emmet)

这个更强大，完爆autocomplete。输入`！再按 TAB`就能出现以下代码：

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>

</body>
```

是不是很牛逼？

### auto-html-preview

便于检查web代码，按`CTRL-SHIFT-H`即可浏览当前代码的html页面，但偶尔有小小的bug，比如不能输入中文，或者滚动条不见了。无伤大雅。

以上这些插件都跟web开发有关，当然atom不止于此，比如`markdown-preview-enhanced`和`qiniu-uploader`令其成为markdown编辑器，`github-plus`可简化上传或更新代码的过程，都是非常好用的。

atom和sublime的关系可能相当于R、stata、SAS的关系，我还是实用主义，能解决问题的工具才是好工具，如果都能解决问题，那就选择喜欢的工具。
