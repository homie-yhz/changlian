# changlian

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# typings 扩展包 

问题：
1.需要一个用户定位模块，同样通过二维码扫描然后得到地理位置，发送给后台，后台记录该充电地点的地理坐标，然后发送给服务器，更新地图信息。

2.vue配置 typescript 的简单教程
http://blog.csdn.net/u014633852/article/details/73706459

3.微信调用支付宝支付方式。（网页，客户端。。。）
4.charge 充值页面  赠送的钱如何计算？？
5.每个充电站 不同充电口 固定充电方式了？？快充/慢充
6.充电口状态：占用，非占用，是否可用



1.电话图标没有  
  关闭弹框图标没有
	结算成功
	闪电图标  充电时的状态图标。
	齿轮换成图片
2.发送充值数据的时候，
	1）卡片信息 发送ID? 充值金额 展示什么？ 
	充值金额 只展示卡片的充值金额 并不展示 赠送金额  也就是不想加
	卡片信息 只发送卡片ID即可
3.充值页面  赠送金额 到期日期  排版 需要调整。已调整

4.赠送的余额？？是否放在用户信息里面
5.充电记录 里面包含正在充电的状态以及冲完的状态？？？
6.充电有几种状态？


7.充电页面 头部 ID卡是什么意思？

# 错误信息提示

错误代码编号 | 接口名称 | 描述
-|-|-
101|测试文字|运营商管理平台
102|getMyStationInfo|获取中控信息列表、合作伙伴列表、以及注册成功后的信息回
103|getScanQRCodePage|用户点击主页扫一扫后进入到跳转页面接口
104|saveTerminalInfo|用户扫描端口后 提交信息报错
105|bindStationUrl|用户点击绑定电站按钮后的接口报错
107|getRechargeCard|获取充值卡片信息报错
108|
# 2018 06 21 遇到问题汇总
1.点击充电反应过慢

# 开发过程遇到的问题
1.post接口异常  405 ，解决办法：

已完成：

01 已修改  需要展示 无绑定的页面。
02 已修改
03 已修改
	*04 后台对应  无法重现
05 后台对应  现在复测没有问题  娟姐复测也没有问题
07 无法复现  娟姐复测无法复现
08 杰哥已经改过
09 已修改
10 已修改