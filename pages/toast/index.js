Page({
    onLoad(){
        this.toast = this.selectComponent('#mkToast');
    },
    data: {
        content: '我是一个toast \n 我是一个换行',
        descData: [
            {
                parameter: 'content',
                type: 'String',
                require: '是',
                instruction: '内容',
            }, {
                parameter: 'duration',
                type: 'Number',
                require: '否',
                instruction: '消失时间',
            }
        ]
    },
    show(){
        this.toast.showToast()
    }
})