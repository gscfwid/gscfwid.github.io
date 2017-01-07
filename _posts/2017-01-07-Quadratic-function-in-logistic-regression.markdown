---
layout: post
date: 2017-01-07 21:30
title: 逻辑回归中的二项函数
categeries: research
---
最近阅读ZZH的mimic数据分析文章，看到以下这篇：
![zzh](http://ocmk8pdgu.bkt.clouddn.com/3a7df55b5fe64ae02e0f78f8160261eb.png)
（*dropbox中已收录，oxygentherapy*）

首先简单总结一下本文。

- 本文主要是探索氧分压和死亡的关系，用的是mimic2，使用了icu中诊断为脓毒血症的病人
- 氧分压主要通过动脉血气得到，每个病人平均10多次动脉血氧分压测量，总记录多达将近20万条，作者似乎将这些记录都进行了计算，而非以病人为单位，取某个值或者平均值
- 作者采用了多变量逻辑回归的方法，在此基础上使用了二项式方程，这个内容我之前从来没有接触过。
- 作者还探讨了氧分压和某个分级标准（SAPS-1和SOFA score）之间的混杂关系，通过分组分析，绘制曲线图等探讨
- 作者利用的是stata分析软件

全文思路是比较简单的，发在了sci rep上。但有一个知识点我花了将近一整天的时间搞懂。就是逻辑回归中的二项方程：logit(p) = log(p/(1-p))= β0 + β1×X1 + β2×X2 + β3×X1×X2 + β4×X1^2。

作者在原文中的表格是这样绘制的：

![tab1](http://ocmk8pdgu.bkt.clouddn.com/ef2eafa5093901b1b10b5def142ef1e2.png)

我们可以看到，PaO2×PaO2 的Odds radio是1.000，标准误是0，p小于0.001 。一开始完全看不懂，同样也出现在PaO2 × SAPS-1，p值稍微大一点。

按照以前的逻辑，Odds radio是1的话代表对结果并不产生影响，这与p值产生矛盾，预示着不能按照普通的逻辑来理解。而且作者在原文中，并没有进行解释：

![explanation](http://ocmk8pdgu.bkt.clouddn.com/75c752aecc6d4ecbe3f38c8c6960c3f6.png)

---
**谷歌之后发现，在逻辑回归里面确实有一个概念是用来解释两个相互影响的变量，这种叫做：
Logistic regression with an interaction term of two predictor variables**

![interaction](http://ocmk8pdgu.bkt.clouddn.com/e0e155e42158f439cd19ec2f7101ebd9.png)

出处链接：http://www.ats.ucla.edu/stat/mult_pkg/faq/general/odds_ratio.htm

用我们上面那个公式：logit(p) = log(p/(1-p))= β0 + β1×X1 + β2×X2 + β3×X1×X2 + β4×X1^2，假设X1是一个二分类变量，可以取0或者1。当X1=0时，X2的oddis radio=β2，当X1=1时，X2的Oddis radio=β2+β3，这说明，X2在X1取不同值时，对结果的影响的程度是不同的。这时候，X1×X2的Oddis Radio怎么算呢？其实是exp(β2+β3)/exp(β2)。这就可以解释PaO2 × PaO2的OR=1了。

但我觉得原文的表达还是欠妥当：Te ftted model supported our hypothesis that the eﬀect of PaO2 on mortality risk was in quadratic form(Table 2). The odds ratio for the quadratic term was 1 (p< 0.001)。其实主要是因为p < 0.001，并不是OR=1。

本文还是有很多问题的，比如：
- 作者显然是为了做PaO2而做的，因为虽然作者探索了很多个因素之间的关系（如PaO2× age, and PaO2× SOFA），但二次项只做了PaO2（大家可以再详细读一下，如果我理解错就当没说）
- 与PaO2混杂的因素作者并未全包括进去，其中非常重要的是：是否使用机械通气，吸氧或者空气；吸氧的浓度。这些因素其实可以用另外一个变量代替：氧合指数，但是氧合指数估计早已被研究烂了。
- 以上两点，足以成为本文的死穴，根本无解，这就是我们以后在研究中，一开始就要考虑的东西。临床的指导，对数据挖掘的开展非常重要，否则，再多的数据只是一堆垃圾。
