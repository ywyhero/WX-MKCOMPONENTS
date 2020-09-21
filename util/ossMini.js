function ossMini (tempFilePaths = [], options) {
    let uploadtempFiles = []
    tempFilePaths.forEach((item) => {
        uploadtempFiles.push(uploadFile(item, options))
    })
    return Promise.all(uploadtempFiles)
}
function uploadFile (filePath, options = {}) {
    const key = 'miniapp/' + generateUUID() + '-' + new Date().getTime() + '.jpg'
    return new Promise(function (resolve, reject) {
        wx.uploadFile({
            url: options.ossUrl, //仅为示例，非真实的接口地址
            filePath: filePath,
            name: 'file',
            formData: {
                'key': key,
                'OSSAccessKeyId': options.accessId,
                'policy': options.policy,
                'Signature': options.Signature,
                'success_action_status': '200',
            },
            success: function (res) {
                // 返回此格式的数据，是为了与七牛云保持一致
                if (res.statusCode === 200) {
                    resolve({
                        hash: '',
                        imageURL: `${options.ossUrl}/${key}`,
                        key: key
                    })
                } else {
                    reject(res)
                }
            },
            fail: function (err) {
                reject(err)
            }
        })
    })
}
// UUID in js 生成UUID
function generateUUID () {
    let d = new Date().getTime()
    let uuid = 'xxxy-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 8) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16)
    })
    return uuid
}
module.exports = ossMini
