---
layout: post
date: 2017-08-18 21:30
title: 写个爬虫对付三基三严
categories: computer
---

刚开始学python，于是想搞搞之前一直想搞的事情，比如把医院每年都折磨人的三基三严考试题目爬下来以后随手复习。今天终于搞定了，于是想总结一下。

### 需要掌握的必要技能

1. 对chrome开发工具要有一个比较完整的了解，这就需要有一定的计算机网络基础知识，起码知道什么是请求和应答？http协议，tcp/ip是什么？
2. 对python有入门的了解就可以了，元素、列表、字典，还有一些常用的包和函数，懂得字符串如何处理。

### 具体步骤

#### 分析网站

首先放上我要爬取的网址： http://medu2011.com:8083/zsy/

在爬取网页时，摆在初学者面前的一道槛就是“对需要登录的网站怎么爬取？”，尤其是”还需要验证码登录”。我查了很多相关的文章：
> [如何用 Python 爬取需要登录的网站？](https://juejin.im/entry/566fdee660b2d0be157516c8)
> [小试牛刀：使用Python模拟登录知乎](http://www.csuldw.com/2016/11/05/2016-11-05-simulate-zhihu-login/index.html)

这是我刚开始的思路，以为在访问‘登陆后可以请求到的数据’时，直接在post请求中发送包含用户名和密码的数据包就可以了，结果不行。原因不是太清楚，网上说服务器会认请求包的头文件，但是我设置了仍然不可以，我后来觉得是cookie（网页缓存）的原因。

后来改变了思路，用上面第二条知乎的方法，用抓包软件抓取登录的那个包（这个包在chrome开发工具中是找不到的），然后模拟登录，进一步请求其他数据。结果还是不行，可能是三基三严这个网站和知乎网还是有一些不同，但是这个不同要怎么修改已经超过我的能力范围了。

最后我是直接引用手动登录后的cookie进行模拟登录，最终成功。参考教材如下：
> [Python使用requests库模拟登陆网站的方式--以豆瓣为例](http://blog.csdn.net/u011659379/article/details/48133121)

登录后我直接进到我需要爬取内容的试题网页：

![network](http://ocmk8pdgu.bkt.clouddn.com/c18e8531fffdc6ec47aa3d9f87882df6.png)

在network选项卡（用于显示请求包，类似于抓包）下面的XHR（异步请求数据）数据包中可以看到一条包含correct answer和题目（显示在后面）的json数据。因为这个是练习版本，不知道到时考试时是直接发送过来验证后给出分数还是把考生提供的答案去服务器验证结果，如果是前者，直接在考试时就能取得答案，如果是后者，就没办法取到答案。

那我们就知道了，这个数据包就是我们需要爬取的内容。我们看一下它的头文件。
![header](http://ocmk8pdgu.bkt.clouddn.com/d78c44b0e0f2d075f5b08ca41d089619.png)

这里面有几个重要的信息：

1. 这条json数据包是get请求，这条get请求里面有一个参数是2118
2. 目前浏览器的cookie信息为 Cookie:JSESSIONID=54D0E95264C9E700C4B515DF61DFB574
3. 请求的头信息如图中所示

首先是第一条信息，这个2118到底是什么？我查看了之前网页的代码

![shiti](http://ocmk8pdgu.bkt.clouddn.com/4c167e340444b9bef6f6aa29208cb11b.png)

原来是试题的代码，可见这几个试题的代码是连着的，这样正好，便于后面写个循环把所有试题都爬下来

第二、三条信息在下面的爬虫代码中再做进一步说明。现在可以上爬虫了。

#### 代码展示

``` python
# -*- coding: UTF-8 -*-

import sys
reload(sys)
sys.setdefaultencoding('utf8')

import json
import requests #需要下载
import cookielib

#首先将cookie文件保存：cookie文件可以理解为远端服务器对请求的计算机的辨认，如果是已经登录的用户，远端计算机会保存该cookie，并且会跟请求数据中的cookie匹配
zsy_cookie={'JSESSIONID':'54D0E95264C9E700C4B515DF61DFB574'}
s = requests.Session() # request.Session是requests模块中的一个类，在同一系列请求中保证服务器对其的识别
#headers是请求的头文件，这个数据尽量全，以保证服务器对该请求辨识为浏览器的请求而不是机器请求，尤其是User-Agent这一条
headers = {
    'Accept':'*/*',
    'Accept-Encoding':'gzip, deflate',
    'Accept-Language':'zh-CN,zh;q=0.8',
    'Connection':'keep-alive',
    'Host':'medu2011.com:8083',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36',
    'Referer':'http://medu2011.com:8083/zsy/pages/common/model_test.jsp?planlevelid=2118',
    'X-Requested-With':'XMLHttpRequest'
}
#在这里定义一个函数，通过list中的dict的某键值定位该dict的索引，用于后面数据的提取
def find_dict(lst, key, value):
    for i, d in enumerate(lst):
        if d.get(key) == value:
            return i
    raise ValueError('no dict with the key and value combination found')
#写一个循环，请求每个试题，并且保存成不同的文件
for x in xrange(2099,2119):
    file_name = './anes'+str(x)+'.txt'
    url = r'http://medu2011.com:8083/zsy/paper/createPaperByPlanLevelId.do?planLevelId='+str(x)
    req = s.get(url, headers = headers, cookies = zsy_cookie)
    html = json.loads(req.content)
    #html输出为前面提到的包含正确答案和题目的字典，我在文末添加了该文件字段的截图
    #后面为对html这个json文件的处理，保存为各自的文件。这个处理的基础是对html的解读
    corr_an = html["correctAnswer"]
    quests = json.loads(html["data"])
    questions = quests['ques']
    # print type(questions)

    for a in corr_an:
        select = a["text"]
        qid = a["question_id"]
        num = find_dict(questions, "id", qid)
        quest_text = questions[num]["text"]
        anss = questions[num]["anss"]
        num2 = find_dict(anss, "orderby", select)
        ans = anss[num2]["text"]
        text = str(qid)+'.'+' '+quest_text+'\t'+ans+'\n'
        with open(file_name, "a+") as f:
            f.write(text)
```

最后得到了以试题编号命名的文档，如下图

![anes](http://ocmk8pdgu.bkt.clouddn.com/da87c4e6bd39dbcc3499d30b60de9edd.png)

### 写在最后

通过这个小项目，主要有以下几点感触：
1. 解决了去登陆内容的爬取，虽然需要首先手动登录获取cookie
2. 有几个牛逼的包没有仔细去研究，比如requests，目前初级阶段基本就是拿来就用，以后争取能深入了解
3. 本代码展示是最基本的按逻辑逐条，上文中引用的第二篇文章是面向对象的编程，将代码封装在一个类里面，这种思路应该学习

### 最后的附件

下面是以上代码中html输出的文档截图

![json](http://ocmk8pdgu.bkt.clouddn.com/bd270824174b1eee7c6fd5747e367aa9.png)
