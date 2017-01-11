---
layout: post
date: 2017-01-11 23:30
title: 等高图在数据挖掘中的应用
categeries: research
---
老规矩，先将范文贴出来：[https://www.dropbox.com/s/as9udtdm0vhnc92/akin.pdf?dl=0]
![title](http://ocmk8pdgu.bkt.clouddn.com/e56348530f105c39c608afd0a7f8deec.png)

### 概括

- AKIN（Acute Kidney Injury Network）是指急性肾损伤的一个诊断网络：利用尿量和血肌酐的综合，将急性肾损伤分为1、2、3三个等级

![AKIN](http://ocmk8pdgu.bkt.clouddn.com/300e416d5c9b3bd27567b1a36eae56c9.png)

- 本文旨在分析AKIN内的几个指标的关系以及和死亡率之间的关系

- 本文的难点是等高图的绘制，在将数据分析的结果带入等高图的过程，体现了一种以数据流为形式的处理。这种处理才是数据挖掘的精髓，后面将详细将这个过程

- 本文对某个变量的多次测量值的处理为：二分类变量——只要最高值在某个范围窗口内，就将该变量编码为1

### 方法

- 数据库提取将是一个难点，涉及到日期的计算（ICU停留超过24h的才纳入）以及如何将诊断标准翻译为SQL语言？

- **亮点**：作者将测量值的连续变量分为多个二分类变量，可看下图：

![creatine](http://ocmk8pdgu.bkt.clouddn.com/0f30ba823e1c1e75367bc5ccfdc48676.png)

图中观察时间是7天，血肌酐的绝对值是0.1-1.0之间，如果按照每天每0.1来分，将是7×10=70个方程，然后看文中的描述：

![wenzhong1](http://ocmk8pdgu.bkt.clouddn.com/b5ceb8019ee372d45a97db80b8ae097b.png)

跟文中描述的是一样的。这些方程都是一个逻辑回归模型，包括的混杂变量包括

![hunza](http://ocmk8pdgu.bkt.clouddn.com/5f4f8fedbec17efca1aa25c2b92b7bec.png)

所有的混杂变量均取中位数，则可以算出一个调整后的死亡率（adjusted mortality）。将70个调整后的死亡率带入等高图那个矩阵中，死亡率用颜色的热度来表示，利用R语言的ggplot包就可绘制出：[教程入口](https://www.r-statistics.com/2016/07/using-2d-contour-plots-within-ggplot2-to-visualize-relationships-between-three-variables/)

### 对结果的解释

选一个最难的图1234：

![jieshi](http://ocmk8pdgu.bkt.clouddn.com/d86e59e99df190d8bbab81bdd4a0b4a9.png)

该图中，当血肌酐的升高不超过200%时，死亡率随着血肌酐的增高增高，但是不随观察时间（我认为应该理解为持续时间）的增加而升高；而血肌酐的升高超过200%时，死亡率不仅随着血肌酐升高而升高，还随着观察时间的增加而升高。

### 总结

- 本文在方法学上目测没有什么问题，发在了ICM，比较好的杂志了
- 在临床意义方面，只是阐明了AKIN的变量之间的关系。但是，往往paper的临床意义是最后才考虑的东西
