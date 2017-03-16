/*************************************************************/
function async(value) {  
    return new Promise(function(resolve, reject) {  
        var ms = Math.round(Math.random() * 1000);  
        setTimeout(function() {  
            console.log('waiting ' + ms + 'ms');  
            // 等待ms毫秒  
            resolve(value + ms);  
        }, ms);  
    });  
}  
  
// 每次执行随机等待n毫秒，结果统计总毫秒数  
async(0)  
.then(async)  
.then(async)  
.then(async)  
.then(async)  
.then(function(value) {  
    console.log('------total wait:' + value + 'ms');  
});  


/*************************************************************/

function async1(value) {  
    return new Promise(function(resolve, reject) {  
        resolve(value + 1);  
    });  
}  
  
function async2(value) {  
    // return new Promise(function(resolve, reject) {  
    //     resolve(value + 2);  
    // });  
    // 等价与上面写法  
    return Promise.resolve(value + 2);  
}  
  
function async3(value) {  
    return new Promise(function(resolve, reject) {  
        resolve(value + 3);  
    });  
}  

// 求最终输出value的值
async1(100).then(async2).then(async3).then(function(value) {  
    console.log('------' + value);  
});

/*************************************************************/


