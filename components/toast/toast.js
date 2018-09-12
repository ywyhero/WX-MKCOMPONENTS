// components/toast/toast.js
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    /**
     * 组件的属性列表
     */
    properties: {
        content: {
            type: String,
            value: ""
        },
        duration: {
            type: Number,
            value: 1500
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
        showToast(){
            this.setData({
                isShow: true
            })
            setTimeout(() => {
                this.setData({
                    isShow: false
                })
            }, this.data.duration)
        }
    }
})
