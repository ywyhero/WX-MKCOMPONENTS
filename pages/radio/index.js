Page({
    /**
     * questions: 单选问题
     * isCancle: 是否取消已选择功能(默认开启)
     * color: 单选背景色(默认橘红色)
     */
    data: {
        questions: [
            {
                "questionId":1,
                "questionStr":"对上传曲目的练习要求？",
                "answers":[
                    {"answerId":1,"answerStr":"把所有曲目过一遍","hasCheck":0},
                    {"answerId":2,"answerStr":"精练曲目，抓细节错误反复练习","hasCheck":0}
                ]
            },
            {
                "questionId":3,
                "questionStr":"本次曲目是否需要参加考级、比赛？",
                "answers":[
                    {"answerId":5,"answerStr":"需要","hasCheck":0},
                    {"answerId":6,"answerStr":"不需要","hasCheck":0}
                ]
            },
            {
                "questionId":4,
                "questionStr":"关于本次课后总结？",
                "answers":[
                    {"answerId":7,"answerStr":"填写陪练单即可","hasCheck":0},
                    {"answerId":8,"answerStr":"需要和家长进行交流","hasCheck":0}
                ]
            }
        ], 
        isCancle: true,
        color: '#FD5E02',
        descData: [{
            parameter: 'questions',
            type: 'Array',
            require: '是',
            instruction: '单选问题',
        }, {
            parameter: 'isCancle',
            type: 'Boolean',
            require: '否',
            instruction: '是否能取消',
        }, {
            parameter: 'color',
            type: 'String',
            require: '否',
            instruction: '单选背景色',
        }],
        answers: []
    },
    radioChange(e){
        this.setData({
            answers: e.detail
        })
    }
})