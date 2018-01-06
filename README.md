# Also-Mobile
 Based on the mobile terminal also platform。

### 注册 & 登录 & 找回
 [login](https://github.com/e6line/also-mobile/blob/master/src/html/login.html) [reg](https://github.com/e6line/also-mobile/blob/master/src/html/register.html) [find](https://github.com/e6line/also-mobile/blob/master/src/html/find.html)

### 训练
 [iep](https://github.com/e6line/also-mobile/blob/master/src/html/iep.html)

### 评估
 [test](https://github.com/e6line/also-mobile/blob/master/src/html/testPro.html)

### 金手册
 [goldManual](https://github.com/e6line/also-mobile/blob/master/src/html/goldManual.html)

### 我(new)
 [me](https://github.com/e6line/also-mobile/blob/master/src/html/me.html)

### 设置(new)
 [userSetting](https://github.com/e6line/also-mobile/blob/master/src/html/userSetting.html)


#### global 

```javascript
// topBar
global.topBar(function () {
	console.log("这里是返回")
}, 'className')

// 选项卡
global.tab(function (index) {
	console.log(index)
})

// msg
global.msg({
	icon: 'warn/success',
	title: '操作成功',
	desc: '这里是文字描述',
	btns:[{
		text: '推荐操作',
		style: 'primary',
		callBack: function() {
			console.log(1)
		}
	},{
		text: '辅助操作',
		style: 'default',
		callBack: function() {
			console.log(2)
		}
	}]
})
```
