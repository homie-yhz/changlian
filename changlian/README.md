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
2.发送充值数据的时候，
	1）卡片信息 发送ID? 充值金额 展示什么？ 
	充值金额 只展示卡片的充值金额 并不展示 赠送金额  也就是不想加
	卡片信息 只发送卡片ID即可
3.充值页面  赠送金额 到期日期  排版 需要调整。
