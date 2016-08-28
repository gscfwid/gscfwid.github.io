---
layout: post
title: 标书中找芯片经验之谈
date: 2016-08-28 11:00
categories: research
---
*在标书中放一块数据挖掘的芯片，如果支持自己的假说，会有一定的说服力。如何用最快的方法搜索呢？以下我来介绍*

#1. STRING数据库的利用
- 我认为string数据库在这方面要优于david，例如将“ICK”输入STING数据库

![title](https://leanote.com/api/file/getImage?fileId=579d848bab644133ed033c0c)

- 物种选取人后，我们得到了这样的蛋白质关系：

![title](https://leanote.com/api/file/getImage?fileId=579d84e7ab644135ea032f53)

> 这里有几个概念。从下图可以看到，两个蛋白质联系最好的是青色和紫色（已知的结果），来自实验数据，而其他颜色则是预测；最差的是黄色，只是通过文本挖掘的。

![title](https://leanote.com/api/file/getImage?fileId=579d8526ab644135ea032f5c)

- 然后我们将结果导出，一般我会选择这两个，一个图，一个excel

![title](https://leanote.com/api/file/getImage?fileId=579d85d1ab644133ed033c22)

- 我经常会分析一下，比如这样，选取到的基因都成了红色，说明这些基因注释到了cell cycle，然后再保存一份（图即可）。可以看我dropbox里面保存的结果也是这样的。

![title](https://leanote.com/api/file/getImage?fileId=579d8610ab644133ed033c2a)

#2. GEO2R在线分析

- 找一个芯片，如果是GSD，则可以在线分析热图，如果没有，只能用GEO2R。如下图

![title](https://leanote.com/api/file/getImage?fileId=579d8863ab644133ed033c63)

- 如果是GSD，我会先查查目标基因的表达。输入ICK。

![title](https://leanote.com/api/file/getImage?fileId=579d889aab644135ea032fb5)


- 点击图片，发现复发和不复发也没什么区别，估计这芯片不好用。

![title](https://leanote.com/api/file/getImage?fileId=579d88dcab644133ed033c73)
![title](https://leanote.com/api/file/getImage?fileId=579d8918ab644135ea032fc3)

- 但不管了，先演示。用GEO2R分析的话要在GSE界面中

![title](https://leanote.com/api/file/getImage?fileId=579d897aab644133ed033c80)
![title](https://leanote.com/api/file/getImage?fileId=579d8986ab644135ea032fcb)

- 接下来就是分组，自己摸索

![title](https://leanote.com/api/file/getImage?fileId=579d89abab644133ed033c82)

- 点top250，然后保存结果，这就是diff-genes

![title](https://leanote.com/api/file/getImage?fileId=579d8a42ab644133ed033c94)

#3. 本地作图

- 然后就可以ctrl+f查找目的基因了。我一般会用到之前在string上保存的那些基因（要去除重复）。用函数vlookup([教程](http://jingyan.baidu.com/article/73c3ce28db4da4e50243d95c.html))来匹配p-val和logFC，这样就出来结果了，好像都不太理想。

![title](https://leanote.com/api/file/getImage?fileId=579d8b3fab644133ed033caa)

- 下载GEO的矩阵，然后用这些基因去做热图(用pheatmap)([教程](http://blog.qiubio.com:8080/archives/2477))。

---
以上内容都是要找到目标基因，并且目标基因有意义才做，要不然就是无用功。
