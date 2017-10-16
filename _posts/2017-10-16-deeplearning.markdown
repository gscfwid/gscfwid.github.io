---
layout: post
date: 2017-10-16 20:00
title: 初识Keras（最简单的深度学习框架）
categories: computer research 教程 工作
---
之前看了很多深度学习的文章和教程，但总有绕树三匝何枝可依之感。现在学习技术，光说不练我觉得是禁忌，虽然平时嘴上将军总是常见。

* TOC
{:toc}

## 写在前面

Keras是一个简单易用的深度学习框架，体现在代码简单易懂，并且有比较完善的文档系统支持，网上有牛人将文档翻译成中文（[文档地址](https://keras-cn.readthedocs.io/en/latest/)，更促进了其在国内的传播。

虽然Keras是最简单的框架，但我强烈建议在学习使用前，要看看神经网络方面的资料。推荐[吴恩达的深度学习教程](http://mooc.study.163.com/learn/deeplearning_ai-2001281002?tid=2001392029#/learn/announce)，四周课时，其实压缩在四天就可以看完，目的只是有个印象，否则在Keras设置参数的时候只能照着教程做，做完最后仍然一脸懵逼。当然，首先接触了Keras再去学习课程也是可以的，可以做到有的放矢。

![](https://camo.githubusercontent.com/9aec8e8c19197ad70d9a6f489faa117e2c0f1981/68747470733a2f2f6f6f6f2e306f302e6f6f6f2f323031352f31312f32322f353635323836313637323236352e706e67
    )
最后，抛出几个深度学习中的概念，在后文中可能会用到。
- Layer是指神经网络的层数，包括输入层、隐层、输出层，所谓深度是指隐层大于1层即为深度，而不是所谓的深不见底，目测有一百万层的深度；
- Dense描述的是全连接层，传统的经典的神经网络是每个层的每个节点和前一层的每个节点都连接；
- Sequential模型是指每层按顺序连接，也属于传统的经典的神经网络；
- 激活函数，一个神经元是由线性部分和非线性部分构成，线性部分指的是一个多重线性运算，总结起来是W*X+B（W、X、B均为矩阵），而非线性部分扮演者过滤器的作用，线性运算的结果超过阈值后才会激活连接，因此激活函数是一个非线性的函数，常见的激活函数有隐层的"ReLu"和输出层的“Sigmoid”函数，这两个函数大家可以搜索一下具体是什么；
- 损失函数和学习率，损失函数是指真实的结果和每次计算得到的结果之间的差异，从而告诉下一次迭代中W（权重，上一条的线性运算中的参数）是应该增加还是减少，而学习率则告诉了增加和减少的幅度是多少；

## 学习的材料和思路

关于机器学习、神经网络，网上有大量的练习数据集，包括著名的鸢尾花数据集和图片识别的mnist数据集。但我还是选择的mimic数据库的数据，这样更加能体现技术为实用的原则。

mimic收集了美国某医疗中心的重症病人的住院数据。其中某个评分标准可以用于预测病人的转归，这个评分标准是人为制定的运算，将一些与影响病情的因素按某个公式叠加。在这里我想检测一下，同样是相同的指标，人为得出的结果和深度学习预测的结果哪个更好。

## 学习过程和结果

### 装载所需模块

```python
from __future__ import print_function #使用后，print变为一个函数
import pandas as pd #用来处理数据
import keras
from keras.models import Sequential #导入序贯模型（上面介绍过）
from keras.layers import Dense, Dropout #Dropout用来防止过拟合
from sklearn.cross_validation import train_test_split #用来对数据分组
```

### 读取数据，预处理

如果数据如以下形式可以直接继续之后的运算，如果不满足，可使用pandas、numpy等模块进行转换。本数据最后一列为类别标记，是一个二分类变量（0 vs 1）。

``` python
data = pd.read_csv('sofa_score_items.csv',sep = '|')
data.head()
```

<div>
<style>
    .dataframe thead tr:only-child th {
        text-align: right;
    }

    .dataframe thead th {
        text-align: left;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>icustay_id</th>
      <th>meanbp_min</th>
      <th>norepinephrine</th>
      <th>epinephrine</th>
      <th>dopamine</th>
      <th>dobutamine</th>
      <th>creatinine_max</th>
      <th>bilirubin_max</th>
      <th>platelet_min</th>
      <th>pao2fio2_vent_min</th>
      <th>urineoutput</th>
      <th>mingcs</th>
      <th>expire</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>200014</td>
      <td>52.0</td>
      <td>0.000000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.6</td>
      <td>0.3</td>
      <td>120</td>
      <td>342.857143</td>
      <td>664.0</td>
      <td>14</td>
      <td>0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>200028</td>
      <td>47.0</td>
      <td>0.250220</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.1</td>
      <td>0.8</td>
      <td>83</td>
      <td>99.000000</td>
      <td>1273.0</td>
      <td>15</td>
      <td>0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>200065</td>
      <td>60.0</td>
      <td>0.200000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>3.1</td>
      <td>1.3</td>
      <td>22</td>
      <td>98.000000</td>
      <td>252.0</td>
      <td>15</td>
      <td>0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>200075</td>
      <td>49.0</td>
      <td>0.269512</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.9</td>
      <td>4.9</td>
      <td>131</td>
      <td>285.000000</td>
      <td>2005.0</td>
      <td>14</td>
      <td>0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>200087</td>
      <td>51.0</td>
      <td>0.100088</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.8</td>
      <td>0.7</td>
      <td>152</td>
      <td>114.285714</td>
      <td>2780.0</td>
      <td>15</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
</div>

然后再将数据分为训练集和验证集，这里用到一个机器学习模块sklearn中的函数，非常方便，一条代码搞定，突出一个标准化编程。

```python
x,y = data.iloc[:,1:12].values,data.iloc[:,12].values #首先将数据分为特征向量和类别标签（x和y）
x_train,x_test,y_train,y_test = train_test_split(x,y,test_size = 0.2, random_state = 1) #再将x,y各分为训练集和验证集，同一条记录要吗在训练，要吗在验证集，并且是完全随机分配
```

### 训练数据

```python
batch_size = 128 #每个批次128个样本
num_classes = 2 #代表分类标签为二分类
epochs = 20 #迭代20轮
y_train = keras.utils.to_categorical(y_train, num_classes)
y_test = keras.utils.to_categorical(y_test, num_classes)
model = Sequential()
#将隐层一层一层迭代上去，本例使用了2个隐层，每个隐层5个节点
model.add(Dense(5, activation='relu', input_shape=(11,)))
model.add(Dropout(0.2))
model.add(Dense(5, activation='relu'))
model.add(Dropout(0.2))
model.add(Dense(num_classes, activation='sigmoid'))

#编译模型的过程
model.compile(loss='binary_crossentropy', #选择损失函数
              optimizer='rmsprop', #选择优化器
              metrics=['accuracy']) #选择判断结果的方法
history = model.fit(x_train, y_train,
                    batch_size=batch_size,
                    epochs=epochs,
                    verbose=1,
                    validation_data=(x_test, y_test))
score = model.evaluate(x_test, y_test, verbose=0)
#最后打印出模型最终得分
print('Test loss:', score[0])
print('Test accuracy:', score[1])
```

_________________________________________________________________
Train on 6304 samples, validate on 1577 samples
Epoch 1/20
6304/6304 [==============================] - 8s - loss: 5.0757 - acc: 0.5163 - val_loss: 3.5927 - val_acc: 0.5691
Epoch 2/20
6304/6304 [==============================] - 8s - loss: 2.2663 - acc: 0.6322 - val_loss: 1.1542 - val_acc: 0.7295
Epoch 3/20
6304/6304 [==============================] - 8s - loss: 1.2169 - acc: 0.7252 - val_loss: 0.6846 - val_acc: 0.7384
Epoch 4/20
6304/6304 [==============================] - 8s - loss: 0.9064 - acc: 0.7326 - val_loss: 0.5913 - val_acc: 0.7387
Epoch 5/20
6304/6304 [==============================] - 8s - loss: 0.7367 - acc: 0.7363 - val_loss: 0.5843 - val_acc: 0.7384
Epoch 6/20
6304/6304 [==============================] - 8s - loss: 0.6127 - acc: 0.7427 - val_loss: 0.5739 - val_acc: 0.7391
Epoch 7/20
6304/6304 [==============================] - 8s - loss: 0.5882 - acc: 0.7419 - val_loss: 0.5713 - val_acc: 0.7387
Epoch 8/20
6304/6304 [==============================] - 8s - loss: 0.5845 - acc: 0.7426 - val_loss: 0.5731 - val_acc: 0.7387
Epoch 9/20
6304/6304 [==============================] - 8s - loss: 0.5825 - acc: 0.7431 - val_loss: 0.5552 - val_acc: 0.7387
Epoch 10/20
6304/6304 [==============================] - 8s - loss: 0.5807 - acc: 0.7425 - val_loss: 0.5601 - val_acc: 0.7387
Epoch 11/20
6304/6304 [==============================] - 8s - loss: 0.5774 - acc: 0.7427 - val_loss: 0.5626 - val_acc: 0.7387
Epoch 12/20
6304/6304 [==============================] - 8s - loss: 0.5729 - acc: 0.7425 - val_loss: 0.5552 - val_acc: 0.7387
Epoch 13/20
6304/6304 [==============================] - 8s - loss: 0.5735 - acc: 0.7429 - val_loss: 0.5592 - val_acc: 0.7387
Epoch 14/20
6304/6304 [==============================] - 9s - loss: 0.5728 - acc: 0.7428 - val_loss: 0.5589 - val_acc: 0.7387
Epoch 15/20
6304/6304 [==============================] - 9s - loss: 0.5730 - acc: 0.7427 - val_loss: 0.5675 - val_acc: 0.7387
Epoch 16/20
6304/6304 [==============================] - 8s - loss: 0.5692 - acc: 0.7427 - val_loss: 0.5610 - val_acc: 0.7387
Epoch 17/20
6304/6304 [==============================] - 8s - loss: 0.5696 - acc: 0.7428 - val_loss: 0.5595 - val_acc: 0.7387
Epoch 18/20
6304/6304 [==============================] - 8s - loss: 0.5710 - acc: 0.7425 - val_loss: 0.5599 - val_acc: 0.7387
Epoch 19/20
6304/6304 [==============================] - 9s - loss: 0.5700 - acc: 0.7425 - val_loss: 0.5579 - val_acc: 0.7387
Epoch 20/20
6304/6304 [==============================] - 8s - loss: 0.5682 - acc: 0.7426 - val_loss: 0.5585 - val_acc: 0.7387
Test loss: 0.558473258133
Test accuracy: 0.738744451604

### 判断学习结果

- 预测准确率的上升

```python
import matplotlib.pyplot as plt
plt.figure(1)
plt.plot(history.history['acc'])
plt.plot(history.history['val_acc'])
plt.title('Model Accuracy')
plt.ylabel('accuracy')
plt.xlabel('epoch')
plt.legend(['train', 'validation'], loc='upper left')
plt.show()
```
![accuracy](http://ocmk8pdgu.bkt.clouddn.com/45fea01631d2d5848c3764012fcb22f0.png)

- 损失函数的递减

```python
plt.figure(2)
plt.plot(history.history['loss'])
plt.plot(history.history['val_loss'])
plt.title('Model Loss')
plt.ylabel('loss')
plt.xlabel('epoch')
plt.legend(['train', 'validation'], loc='upper left')
plt.show()
```

![loss](http://ocmk8pdgu.bkt.clouddn.com/dc1b23fd4c112c1ec87563e7657784b5.png)

- 神经网络ROC曲线

```python
from sklearn import metrics
import numpy as np
import matplotlib.pyplot as plt
y_score = model.predict_proba(x_test)
preds = y_score[:,1]
fpr, tpr, threshold = metrics.roc_curve(y_test, preds)
roc_auc = metrics.auc(fpr, tpr)

plt.title('Receiver Operating Characteristic')
plt.plot(fpr, tpr, 'b', label = 'AUC = %0.2f' % roc_auc)
plt.legend(loc = 'lower right')
plt.plot([0, 1], [0, 1],'r--')
plt.xlim([0, 1])
plt.ylim([0, 1])
plt.ylabel('True Positive Rate')
plt.xlabel('False Positive Rate')
plt.show()
# fpr, tpr, thresholds = metrics.roc_curve(y_test, y_score, pos_label=0)
# plt.plot(fpr,tpr)
# plt.show()
```

![roc1](http://ocmk8pdgu.bkt.clouddn.com/a98c4f952bc14a280eaef1061b0ca7c1.png)

- 人为评分标准的ROC

![roc2](http://ocmk8pdgu.bkt.clouddn.com/1dcacd156a68a5dd2f567d8b2632f838.png)

## 总结

1. 随着迭代次数的增加，准确率迅速上升并维持在一个平衡水平，损失函数呈相反的收敛形态，说明本次的学习过程，参数选择是比较合理的；
2. 使用相同的输入指标，人为评分标准的计算可以近似于深度学习达到的预测值，可见这个评分标准的科学性，可同样说明了深度学习的无脑最优化（双隐层经典全连接层神经网络就可以轻松超越国际大会制定的评分标准计算公式）；
3. 本评分系统使用的指标具有局限性，这也是为什么准确率只能维持在0.738，而AUC维持在0.67-0.69的主要原因，如果增加指标，人为计算的成本必然增加，而深度学习在处理大数据方面的优势就会体现出来，期待更加深入的探索。
