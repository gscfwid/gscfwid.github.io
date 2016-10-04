---
layout: post
title: Clinic Databases Exploring (1)
data: 2016-10-04 20:10
categories: research
---
近些时间在网上看到了不少“secondary analysis”，利用之前临床试验的原始数据进行再次分析，可以是多个临床试验之间的交叉比较，这种文章可以发到5分以上。下面是一篇代表作：

[The association between fluid balanceand mortality in patients with ARDS wasmodified by serum potassium levels: aretrospective study](https://www.dropbox.com/s/to9wlevowj8t8js/The%20association%20between%20fluid%20balance%20and%20mortality%20in%20patients%20with%20ARDS%20was%20modified%20by%20serum%20potassium%20levels_a%20retrospective%20study.pdf?dl=0)

这文章里面提到一个数据库：biolincc数据库。

这是一个什么样的数据库呢？

它是在NHLBI旗下的一个数据库，而NHLBI又是NHI的一个附属机构。这些机构的目的是为了解决人类的健康，在这个基础上建立了非常多的计划，著名的TCGA也在其中。通过下图可以有个很好的了解。

![databases](http://ocmk8pdgu.bkt.clouddn.com/70a3ec35134291b2c3e7933a12b43f28.png)

Biolincc数据库大多是临床研究的原始数据，当初我在探索的时候，以为数据在[clinictrials.gov](https://clinicaltrials.gov/)那里。结果转了很久还没有搞清楚（这里再强调一次，英文对于技术开发太重要了）。后来才发现，clinictrials那里最多只有结果数据，而没有原始数据。结果数据就是各组人数，卡方检验用到的参数，p值这些。对meta分析多数有用，尤其是原文中缺乏的一些数据。而对于所谓的二次分析，需要用到raw data，则毫无帮助。这里就需要用到biolincc这个数据库。

由于clinictrials是美国的一个临床随机对照试验注册机构，该机构有一部分临床试验是由nih，就是美国国国立卫生研究院发起和资助的，这一部分结果的raw data，大多都储存在biolincc这个数据库中。

通过谷歌之后发现，不论是国内还是国外的“科普blog”或者“丁香园论坛”，都没有相关的教程。因此只能自己来探索（这是最花时间的过程，而再次需要强调的是，英文太重要了）

以下是用到的资料：

[Headbook of biolincc](https://www.dropbox.com/s/twrxsyqp0sxmzq2/The_Biolincc_Handbook.pdf?dl=0)

![headbook](http://ocmk8pdgu.bkt.clouddn.com/b027a172ea09583470dc558e0378beea.png)

[Biolincc官网](biolincc.nhlbi.nih.gov)上需注册
![guanwang](http://ocmk8pdgu.bkt.clouddn.com/6f224192ff46e1e5ae2c1eef3a700349.png)

申请数据需要描述自己课题的思路，有了protocol才能得到数据，因此，我们需要先阅读文章的原文，从原文中找到突破点，然后简单写个protocol再继续往下走。

我之前看到一篇文章：[Acute and late urinary toxicity following radiation in men with an intactprostate gland or after a radical prostatectomy: A secondary analysis ofRTOG 94-08 and 96-01](https://www.dropbox.com/s/6clt0xl7ny68s9f/mak2016.pdf?dl=0)

该文利用了两个临床随机试验的单独臂来做比较，思路真是大胆创新，给我很大的启发。例如同样是关于糖尿病，文章A是关于α和β的比较，文章B是关于γ和δ的比较，那α和γ我就可以通过下载文章A和文章B的数据来完成分析。

后面探索的路未完待续。。。
