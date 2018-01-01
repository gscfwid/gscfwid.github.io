---
layout: post
date: 2018-01-01 23:00
title: python和R的无缝连接
categories: 教程
---

新年快乐。2018年第一篇。

写博文需要时间和精力，我没时间回忆过往，只喜欢快节奏。因此，凡是在此记录下的东西，一定是百思不得其解的问题，害怕丢失，害怕忘记。

python和R的选择都是老大难的问题了，在此不想过多展开。对于我自己，一个r半路出家+python半路出家的人，对于各自的优缺点，如果用单一的其中一种去完善，学习成本过大。

我喜欢python对自然语言的处理，尤其是未格式化的数据，简直可以到随心所欲的地步。而R语言的各种统计方法，我可以搜到包然后一行代码完成，我不太清楚py可不可以，但如果去另外学习，又是成本。

而唯一我不得不花时间的就是研究怎么让二者对话。在中文世界中找遍了，都没有。

于是开始在英文世界探索，经过大量时间，终于找到最好的办法，在这里分享出来。

## 可重复性分析

这是我在这里首先要说的，可重复性分析，英文叫做’reprodctive analysis' 或者更简单的称为 ‘pipline’。 我觉得是任何一个数据人所必须掌握的技能。

R语言首推Rmarkdown+knitr甚至是新出来的‘notebook’；而python首推‘jupyter notebook’。优势真的不必多说。以上二者均为本教程所必需，大家可以按关键词谷歌教程。

## anaconda

anaconda是python的集成套装，集成了虚拟环境、包管理、jupyter等，可以实现多版本的一键切换，极力推荐。

## python的rpy2模块和魔法命令（从此以下的教程均为配置好以上内容才能实现）

rpy2是python的一个专门为了与R语言通话的包，在安装的过程中，可以看到其实把R的内核也安装了。

``` terminal中
conda install rpy2
```

魔法命令是jupyter的一个非常强大的功能。在这里我们需要的是切换内核，将python内核暂时切换为R语言。当然，首先要安装R语言的内核：

``` terminal中
conda install -c r r-essentials
```
然后在jupyter中，内核为python

``` jupyter
%%R
x <- c(1:5)
x
```

output:[1]1 2 3 4 5

## python与R互相传递变量

以上，环境已经搭配就绪。首先我们将python中的变量传递给R

```
#jupyter中
import rpy2.robjects as robjects
import numpy
import pandas
%load_ext rpy2.ipython
a = [1,2,3]
```

```
#jupyter (next cell)
%%R -i a -o b
b = a+3
a
```
output: [1] 1 2 3

```
#jupyter(third cell)
print b
```
output: [1] 4 5 6

## 传递数据框

在R和python中，我们需要处理大量的数据框格式的数据，我们可以按照以下的方法传递数据框

```
#jupyter中
import rpy2.robjects as robjects
import numpy
import pandas
%load_ext rpy2.ipython
a = pandas.DataFrame({'a':[1,2,3],'b'[4,5,6]})
```

```jupyter(next_cell)
#jupyter(next_cell)
%%R -i a -o b
b <- a
a
```
output: ![output](http://ocmk8pdgu.bkt.clouddn.com/9c9036a1021ca96286674f58151eb154.png)


```
#jupyter(third cell)
c = robjects.pandas2ri.ri2py(b) #这里需要用rpy2中的一个函数转换为pandas的dataframe再进行进一步的分析
```

## 我的习惯用法

- 首先，knitr和jupyter我都会使用；
- 其次，如果是需要用R做点简单的东西，比如ggplot绘一个图，而大部分过程都需要用python来完成，我倾向于在jupyter中使用R的魔法命令
- 如果某个项目既需要使用大量的R代码，同时也需要python完成呢？

### python调取R中的对象：利用魔法命令读取.RData

```
#jupyter中
%%R -o a
load('workdir/.RData')
a = R_obj
```

### R中调取python的对象：利用魔法命令保存.RData

```
#jupyter中
%%R -i python_obj
save.image('workdir/python.RData')
```

然后在Rstudio中load到这个RData，即可提取到数据，特别适合于多个对象的转换，因为保存为csv等格式太麻烦了。

## 参考文献

[Piplining R and Python in Notebooks](http://blog.revolutionanalytics.com/2016/01/pipelining-r-python.html)
