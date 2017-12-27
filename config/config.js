// 获取所有页面 生成多页面的集合
// var fs= require('fs');
// const getFileNameList = path => {
// 	let fileList = [];
// 	let dirList = fs.readdirSync(path);
// 		dirList.forEach(item => {
// 			if (item.indexOf('html') > -1) {
// 				fileList.push(item.split('.')[0]);
// 			}
// 		});
// 		return fileList;
// 	};
// let HTMLDirs = getFileNameList('./src/html');

// module.exports = {
// 	HTMLDirs:[
// 		'alert',
// 		'login',
// 		'register',
// 		'find',
// 		'assessResult'
// 	],
// 	cssPublicPath:"../",
// 	imgOutputPath:"img/",
// 	cssOutputPath:"./css/styles.css",
// 	devServerOutputPath:"../dist",

// }
module.exports = {
	// HTMLDirs:[
	// 	'alert',
	// 	'login',
	// 	'register',
	// 	'find',
	// 	'assessResult'
	// ],
	cssPublicPath:"../",
	imgOutputPath:"static/img/",
	cssOutputPath:"./static/css/styles.css",
	devServerOutputPath:"../dist",

}