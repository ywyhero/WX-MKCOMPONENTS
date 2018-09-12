Page({
    onLoad(){
        this.dialog = this.selectComponent('#mkDialog');
    },
    data: {
        title: '提示',
        content: '我是一个toast \n 我是一个换行',
        descData: [
            {
                parameter: 'title',
                type: 'String',
                require: '是',
                instruction: '标题',
            },
            {
                parameter: 'content',
                type: 'String',
                require: '是',
                instruction: '内容',
            }, {
                parameter: 'cancleText',
                type: 'String',
                require: '否',
                instruction: '取消文案',
            }, {
                parameter: 'confirmText',
                type: 'String',
                require: '否',
                instruction: '确定文案',
            }, {
                parameter: 'cancleShow',
                type: 'String',
                require: '否',
                instruction: '取消显示隐藏',
            }
        ]
    },
    show(){
        this.dialog.showDialog()
    },
    confirmEvent(){
        this.dialog.hideDialog()
    },
    cancleEvent(){
        this.dialog.hideDialog()
    }
})