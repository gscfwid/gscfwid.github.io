---
layout: post
date: 2016-10-09 16:20
title: 规培应对计划
categories: 工作
---
今天记录一下对于规培轮科应对策略。中国文书工作的特色：多、杂、重复、没用。从我的研究生轮科本就看出来了，同一个东西要找不知道多少个人来签字，关键是最后检查的时候，某些部门还是草草了事。好像他们的目的就是要浪费你时间。所以我觉得有必要制定一个方案，利于后来的人。本手册只用于麻醉科住培，其他科室希望有心人看到我的github，然后模仿或自创一套应对系统。

### 住培要求解读

阅读住培要求后，总结如下：

1. 培训需要注意两大块内容：考核和培训资料提交；
2. 考核包括出科考核、年度考核和结业考核。都分为 **综合评价、专业理论、专业英语、病历书写和临床诊疗能力考核** 几大类（麻醉科不需要大病历的书写），详情可[点击此查看](https://www.dropbox.com/s/vzsjt0ww7jas9dy/201604%E5%8F%B7%EF%BC%88%E4%BD%8F%E9%99%A2%E5%8C%BB%E5%B8%88%E8%A7%84%E8%8C%83%E5%8C%96%E5%9F%B9%E8%AE%AD%E8%80%83%E6%A0%B8%E7%AE%A1%E7%90%86.doc?dl=0)；
3. 除了专业理论需要去[中山一网站](zsy.http://medu2011.com/)做题然后去继教科考试以外（第三页），其余均在科内的考核小组进行；
4. 培训资料需要每次出科提交，[点击查看住培本](https://www.dropbox.com/s/v5mydimb9szejhg/19-%E9%BA%BB%E9%86%89%E7%A7%91.docx?dl=0), *每次打印的部分暂未知，以后再补*；
5. [出科考核](http://www.gzsums.net/dangjian_4888.aspx)上交资料包括：
  - 轮科个人总结
  - 出科考核评分表
  - 病例考核评分表（麻醉科不需要）
  - 技能操作考核评分表（暂时找不到）
  - 英语专业文献及手写翻译件
6. 个人总结和轮科要求的时间不一样，按轮科要求来写。

### 住培本考察

住培本的要求部分有以下内容，可对应住培要求解读部分看：

1. 轮转科室登记表，无需签字；
2. 轮转科室（专业和非专业）和时间（需签名，我实在不明白1和2写一样的东西有什么好处）；
3. 麻醉技能登记数量和病人信息（包括日期、姓名、病历号、主要诊断、手术名称、麻醉方式）（这个良心，完全可以在排班上找到）；
4. 技能包括 **全身麻醉、椎管内麻醉、局部神经阻滞、监测下麻醉管理）**，另外还有 **抢救，病例讨论**；
5. 麻醉亚专业病例完成也有要求，详细看住培本，这里抢救和病例讨论需要再填一次，fuck；
6. 特殊操作也要记录（如动静脉穿刺），fuck，还需要带教老师签字；
7. 非麻醉科室再来相同的过程；
8. 教学任务——担任助教。

### 应对策略

#### 1. 写一个脚本便于将排班计划导入住培本（初期计划用R语言实现半自动，后期用python实现全自动）。

目前已基本实现初期计划。先将用到的教程罗列在此：

>- 首先是导入excel的方法：[R语言如何导入Excel的数据](https://www.zhihu.com/question/20950125),选择用了一种简单的方法：[readxl](https://github.com/hadley/readxl);
>- 然后是循环语句合并文件：[R语言读取文件夹下文件并进行合并数据生成总数据文件](http://blog.sina.com.cn/s/blog_46d621c00101l66x.html);
>- 最后是[R语言取子集的几种方法](http://www.ats.ucla.edu/stat/r/faq/subset_R.htm) 。

具体思路：循环读取文件--->合并表格--->筛选子集。

前提条件：将所有文件以一个文件夹的形式放在工作目录；如D\为工作目录，D\test文件夹下有以下文件

![files](http://ocmk8pdgu.bkt.clouddn.com/1f62a109833d5d5ab5017022e21aa8af.png)

每个文件打开是这样的：

![filess](http://ocmk8pdgu.bkt.clouddn.com/8b7b7ff1c01240f23bbe30ad11827a47.png)

逐行在R语言下运行以下代码：

```R
install.packages("readxl") ##安装readxl包
setwd("D:/") ##设定工作目录
a = list.files("test") ##读取文件夹（文件夹test里面包含所有需要合并的excel表
dir = paste("./test/",a,sep="") ##建立路径索引
n = length(dir)
libary(readxl)
merge.data = read_excel(dir[1]) ##读取第一个文件
merge.data = merge.data[,1:12] ##有的excel会把表格后面的备注读取，所以这里取前12行主要内容
names(merge.data) = c(1:12) ##统一所有文件的colnames(这里由于readxl没有header的相关参数，所以需要这么做，以后这里是需要改进的地方)
for(i in 2:n){ ##建立循环
  new.data = read_excel(dir[i])
  new.data = new.data[,1:12]
  names(new.data) = c(1:12) ##以上三部同merge.data
  merge.data = rbind(merge.data,new.data)
}
gao.data = merge.data[which(merge.data$`11`=="（高）"),] ##筛选我自己的rows
write.table(gao.data,"gao.txt",sep = "\t") ##导出txt，然后用excel读取，完成
```
最后我得到的文件（gao.txt)：

![final](http://ocmk8pdgu.bkt.clouddn.com/8fc09b886e95bcf54789c2540510db46.png)

#### 2. 关键几个操作需要特殊记录（在排班表上看不出来，可以利用手术方式筛选的有：动静脉穿刺，血液回收，经鼻插管）：

>- 喉罩
>- 抢救
>- 病例讨论（可以通过保存群里的图片，利用ORC软件来读取文字）

（待续。。。）
