// components/dialog/dialog.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            value: ''
        },
        content: {
            type: String,
            value: ''
        },
        cancleText: {
            type: String,
            value: '取消'
        },
        confirmText: {
            type: String,
            value: '确定'
        },
        cancleShow: {
            type: Boolean,
            value: true
        },
        isNavigate: {
            type: Boolean,
            value: false
        },
        extraData: {
            type: Object,
            value: {}
        },
        target: {
            type: String,
            value: 'miniProgram'
        },
        openType: {
            type: String,
            value: 'navigate'
        },
        appId: {
            type: String,
            value: ''
        },
        path: {
            type: String,
            value: ''
        },
        version: {
            type: String,
            value: 'develop'
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        isShow: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showDialog(){
            this.setData({
                isShow: true
            })
        },
        hideDialog(){
            this.setData({
                isShow: false
            })
        },
        _confirmEvent(){
            this.triggerEvent('confirmEvent')
        },
        _cancleEvent(){
            this.triggerEvent('cancleEvent')
        },
        _successEvent() {
            this.triggerEvent('successEvent')
        },
        _failEvent() {
            this.triggerEvent('failEvent')
        }
    }
})
