import qiniu from './js/qiniu.js'
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        region: { // 上传的地区
            type: 'String',
            value: 'ECN'
        },
        count: { // 一次性上传图片数
            type: Number,
            value: 9
        },
        sizeType: {// original 原图，compressed 压缩图，默认二者都有
            type: Array,
            value: ["original", "compressed"]
        },
        sourceType: { // 上传图片的类型 album 从相册选图，camera 使用相机，默认二者都有
            type: Array,
            value: ["album", "camera"]
        },
        src: { // 上传的七牛云的token链接地址
            type: String,
            value: 'https://guarder-v1-dev.peilian.com/guarder/v1/qiniu/getQiNiuToken'
        },
        domainUrl: { // 图片链接域名
            type: String,
            value: 'http://test001.pnlyy.com/'
        },
        isPreview: { // 是否可预览
            type: Boolean,
            value: true
        },
        maxCount: { // 总共可上传的图片数
            type: Number,
            value: 0
        },
        header: { // 头部添加
            type: Object,
            value: {}
        },
        isCustom: { //是否自定义样式
            type: Boolean,
            value: false
        },
        isShow: {
            type: Boolean,
            value: true
        }
    },
    data: {
        uploaderImgs: [],
        isClick: true
    },
    methods: {
        uploaderAdd(){
            if(this.data.isClick) {
                this.setData({
                    isClick: false
                })
                let count = this.properties.count;
                let maxCount = this.properties.maxCount;
                let sizeType = this.properties.sizeType;
                let sourceType = this.properties.sourceType;
                let src = this.properties.src;
                let domainUrl = this.properties.domainUrl;
                let uploaderImgs = this.data.uploaderImgs;
                let header = {"content-type": "application/json", ...this.properties.header};
                wx.request({
                    url: src,
                    method: 'post',
                    dataType: 'json',
                    header: header,
                    success: res => {
                        let qiniuToken = res.data.data.token;
                        let options = {
                            region: this.properties.region, // 华东区'ECN'
                            uptoken: qiniuToken, // 由其他程序生成七牛 uptoken
                            // uptokenURL: src, // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "[yourTokenString]"}
                            domainUrl: domainUrl,
                        }
                        if(maxCount && maxCount > count){
                            count = (maxCount - count < count) ? count : (maxCount - count)
                        }
                       
                        wx.chooseImage({
                            count: count,
                            sizeType: sizeType,
                            sourceType: sourceType,
                            success: (res) => {
                                let path = res.tempFilePaths;
                                Promise.resolve(qiniu(path, options)).then((data) => {
                                    uploaderImgs = [...uploaderImgs, ...data];
                                    if(maxCount) {
                                        uploaderImgs = uploaderImgs.slice(0, maxCount);
                                        if(maxCount <= uploaderImgs.length){
                                            this.setData({
                                                isShow: false
                                            })
                                        }
                                        
                                    }
                                    this.setData({
                                        uploaderImgs: uploaderImgs
                                    })
                                    this.triggerEvent('uploaderUrls', data)
                                })
                            },
                            complete: () => {
                                this.setData({
                                    isClick: true
                                })
                            } 
                        })
                    },
                })
            } 
        },
        previewImg(e) {
            if(this.properties.isPreview){
                let current = e.currentTarget.dataset.current;
                let uploaderImgs = this.data.uploaderImgs;
                let urls = [];
                uploaderImgs.map(v => {
                    urls.push(v.imageURL)
                })
                wx.previewImage({
                    current: current,
                    urls: urls
                })
            }
        }
    }
})