# Also-Mobile 
 "version": "1.0.0"
 Based on the mobile terminal also platform。

#### 安装

````
npm install
````

#### dev

````
npm run dev
````

#### build

````
npm run build
````

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
	console.log("callBack")
}, 'className')

// tab
global.tab(function (index) {
	console.log(index)
})

// msg
global.msg({
	icon: 'warn/success',
	title: 'title',
	desc: 'desc',
	btns:[{
		text: 'Confirm',
		style: 'primary',
		callBack: function() {
			console.log('Confirm')
		}
	},{
		text: 'Cancel',
		style: 'default',
		callBack: function() {
			console.log('Cancel')
		}
	}]
})
```
