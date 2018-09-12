Page({
    data: {
        count: 9,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        src: 'https://guarder-v1-dev.peilian.com/guarder/v1/qiniu/getQiNiuToken',
        domainUrl: 'http://test001.pnlyy.com/',
        isPreview: true,
        maxCount:  12,  
        isCustom: false,
        header: {
            "Jwt-Token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlM2ZjNmE1ZGY4ODAwMDAiLCJpc3MiOiJndWFyZGVyLXYxIiwic3ViIjoibWluaV9wcm9nIiwiVXNlcklkIjoxMDk5NTIsInR0bHMiOjg2NDAwLCJVc2VyVHlwZSI6IjEiLCJleHAiOjE1MzM3MTk0NzYsIm5iZiI6MTUzMzYzMzA3Nn0.WPFX3I3Qh9uzJnDv3lNkb2dhpVmOP8HhP6pDDJYkpBU"
        },
        descData: [{
            parameter: 'region',
            type: 'String',
            require: '否',
            instruction: '上传的地区',
        }, {
            parameter: 'count',
            type: 'Number',
            require: '否',
            instruction: '选择图片数',
        }, {
            parameter: 'maxCount',
            type: 'Number',
            require: '否',
            instruction: '最大上传数',
        }, {
            parameter: 'sizeType',
            type: 'String',
            require: '否',
            instruction: '图片类型',
        }, {
            parameter: 'sourceType',
            type: 'String',
            require: '否',
            instruction: '图片来源',
        }, { 
            parameter: 'isCustom',
            type: 'Boolean',
            require: '否',
            instruction: '是否自定义样式',

        }, {
            parameter: 'src',
            type: 'String',
            require: '否',
            instruction: '七牛token链接',
        }, {
            parameter: 'domainUrl',
            type: 'String',
            require: '否',
            instruction: '图片域名',
        }, {
            parameter: 'isPreview',
            type: 'Boolean',
            require: '否',
            instruction: '是否预览',
        }, {
            parameter: 'isShow',
            type: 'Boolean',
            require: '否',
            instruction: '是否显示按钮',
        }, {
            parameter: 'header',
            type: 'Object',
            require: '否',
            instruction: 'header属性',
        }],
        urls: []
    },
    uploaderUrls(e){
        this.setData({
            urls: JSON.stringify(e.detail)
        })
    }
})