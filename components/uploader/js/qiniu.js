const qiniuUploader = require("./qiniuUploader.js");

// 初始化七牛相关参数
function initQiniu(options) {
    // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
    var option = {
        region: options.region, // 华东区'ECN'
        uptoken: options.uptoken, // 由其他程序生成七牛 uptoken
        // uptokenURL: options.uptokenURL, // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "[yourTokenString]"}
        // uptokenFunc: function() {return options.qiniuToken},
        domain: options.domainUrl,
        shouldUseQiniuFileName: false // 如果是 true，则文件 key 由 qiniu 服务器分配 (全局去重)。默认是 false: 即使用微信产生的 filename
    };
    console.log(option)
    qiniuUploader.init(option);
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
function qiniu(filePaths, options) {
    initQiniu(options); 
    wx.showLoading({
        title: '拼命加载中...'
    })
    let imgUrls = [];
    let promiseFuncArr = [];
    for (let filePath of filePaths) {
        // 交给七牛上传
        let promiseTemp = function () {
            return new Promise((resolve) => {
                qiniuUploader.upload(filePath, (res) => {
                    wx.hideLoading();
                    resolve(res)
                }, (error) => {
                    console.error('error: ' + JSON.stringify(error));
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