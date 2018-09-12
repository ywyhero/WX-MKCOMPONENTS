Component({
    properties: {
        focus: {
            type: Boolean,
            value: false
        },
        placeholderVal: {
            type: String,
            value: '搜索本书乐谱名'
        },
        maxlength: {
            type: Number,
            value: 20
        }
    },
    data: {
        value: '',
        isShowClear: false,
        isShowCancle: false
    },
    methods: {
        bindinput(e){
            let value = e.detail.value;
            let isShowClear = false
            if(value) {
                isShowClear = true
            }
            this.setData({
                value: value,
                isShowClear: isShowClear
            })
        },
        bindfocus(){
            this.setData({
                isShowCancle: true
            })
        },
        clearInput() {
            this.setData({
                value: '',
                isShowClear: false
            })
        },
        _searchCancle(){
            this.setData({
                value: '',
                isShowClear: false,
                isShowCancle: false
            })
            this.triggerEvent('searchCancle')
        },
        _confirmEvent(e){
            let value = e.detail.value
            this.triggerEvent('confirmEvent', {value: value})
        }
    }
    
})