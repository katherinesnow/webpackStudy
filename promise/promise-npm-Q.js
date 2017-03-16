var fs = require("fs"),
    Q = require('q');

// 不适用Promise 读取文件内容
// fs.readFile("file.txt",function (err,data) {
// 	if (!err) {
// 		console.log(data.toString());
// 	} else {
// 		console.log(err);
// 	}
// });


/***********************************************************************************************************
/**
 * Q.defer() 返回一个deferred对象包含：
 * promise [property]
 * resolve(value) method 成功
 * reject(reason) method 失败
 * notify(value) method  进程通知 for progress notification 多用于回调
 * makeNodeResolver() method
 */

/**
 * [pReadFile Promise 方法读取文件]
 * 说明：Q.defer().promise 才是 "我们常见的 promise". Q.Promise/promise 只是一个 promise 的构建函数
 * Q.defer().promise返回的promise 是不带和控制状态相关的方法/属性的.如果直接输出Q.promise会发现它是有resolve/reject的
 * @param  {[type]} file [description]
 * @return {[type]}      [description]
 */
function pReadFile(file) {
	var defer = Q.defer();
	setTimeout(function () {
		fs.readFile(file, function (err,data) {
			if (!err) {
				defer.resolve({"a":1});
			} else {
				defer.reject(err);
			}

			console.log("defer returned.");
		})
	},1000);

	console.log("异步执行");

	return defer.promise;
}

// pReadFile("file.txt").then(console.log,console.error);// 两种写法均可.
// 
pReadFile("file.txt").then(function (value) {
	console.log(value,"读取的文档内容");
});

// console.log(pReadFile("file.txt").get("a"));
// 
// Q promise API简单翻译: http://www.cnblogs.com/dunken/p/4621321.html

/***********************************************************************************************************

/**
 * Q(value) 用法:用法整理类似原生的Promise.resolve()
 * If value is a Q promise, returns the promise. // 类似于Promise.resolve()中 "参数是一个Promise实例"的用法
 * If value is a promise from another library it is coerced into a Q promise (where possible).
 * If value is not a promise, returns a promise that is fulfilled with value.类似于Promise.resolve()中 "不是Promise对象的用法"的用法
 */

var p = Q.defer();
console.log(Q(p.promise),'传入一个Promise对象');// {state:pending}
console.log(Q("hello"),"不是一个promise对象");// {state:'fulfilled',value:'hello'}


//Q.reject(reason); // 类似于原生的Promise.reject()


/***********************************************************************************************************
/**
 * State Inspection Methods
 * 1. promise.isFulfilled()
 * 2. promise.isRejected()
 * 3. promise.isPending()
 * 4. promise.inspect()
 */

console.log(Q("hello").isFulfilled(),"fullfilled?");// true


// ES6Promise 原生比使用Q更加简单直接???
// 原生ES6 Promise
console.log("start");
var delay1 =  new Promise(function (resolve,reject) {
    setTimeout( () => resolve("abc") ,2000)
});

delay1.then(function (item) {
    return  new Promise(function (resolve,reject) {
        console.log("delay1" + item);
        setTimeout( () => resolve("def") ,2000);
    });
}).then(function (item) {
    console.log("delay2"+item);
});

console.log("end");


//Q 写法
console.log("start");
var deferred = Q.defer();
setTimeout( () => deferred.resolve("abc"), 2000);
var delay = deferred.promise;

delay.then(function (val) {
    var deferred = Q.defer();
    console.log("delay1"+val);
    setTimeout(function () {
        deferred.resolve("def");
    },2000)
    return deferred.promise;
}).then(function (val) {
    console.log("delay2"+val);
});

console.log("end");




