const qiniuUploader = require("./qiniuUploader.js");
const app = getApp();
import { apiRoot } from "./../config/config.js"
//index.js

// 初始化七牛相关参数
function initQiniu() {
    var options = {
        region: 'ECN', // 华东区
        // uptokenURL: `${apiRoot}/guarder/v1/qiniu/getQiNiuToken`,
        uptoken: app.globalData.qiniuToken,
        domain: app.globalData.qiniuUrl,
        shouldUseQiniuFileName: false
    };
    qiniuUploader.init(options);
}
function sequenceTasks(tasks) {
    //记录返回值
    function recordValue(results, value) {
        results.push(value);
        return results;
    }
    let pushValue = recordValue.bind(null, []);
    let promise = Promise.resolve();
    // 处理tasks数组中的每个函数对象
    for (let i = 0; i < tasks.length; i++){
        let task = tasks[i];
        promise = promise.then(task).then(pushValue);
    }
    return promise;
}
function qiniu(filePaths) {
    initQiniu(); 
    wx.showLoading({
        title: '拼命加载中...',
        mask: true
    })
    let imgUrls = [];
    let promiseFuncArr = [];
    for (let filePath of filePaths) {
        // 交给七牛上传
        let promiseTemp = function () {
            return new Promise((resolve, reject) => {
                qiniuUploader.upload(filePath, (res) => {
                    if (res.error) {
                        reject(res)
                    } else {
                        resolve(res)
                    }
                }, (error) => {
                    reject(error)
                }, null,// 可以使用上述参数，或者使用 null 作为参数占位符
                    (progress) => {
                    }
                );
            })   
        } 
        promiseFuncArr.push(promiseTemp)
    }
    return sequenceTasks(promiseFuncArr)
}

module.exports = qiniu;