Component({
    properties: {
        questions: {
            type: Array,
            value: []
        },
        color: {
            type: String,
            value: '#FD5E02'
        },
        isCancle: {
            type: Boolean,
            value: true
        }
    },
    data: {
        radios: []
    },
    attached(){
        let questions = this.properties.questions;
        let radios = [];
        questions.forEach( v => {
            v.answers.forEach(t => {
                if(t.hasCheck === 1) {
                    radios.push(`${v.questionId}-${t.answerId}`)
                }
            })
        })
        this.setData({
            questions: questions,
            radios: radios
        });
    },
    methods: {
        cancleRadio(e){
            if(this.properties.isCancle){
                let answerId = e.currentTarget.dataset.answerid;
                let hasCheck = e.currentTarget.dataset.hascheck;
                let questionId = e.currentTarget.dataset.questionid;
                let qIndex = e.currentTarget.dataset.questionindex;
                let questions = this.data.questions;
                if(questions[qIndex].answers.every(v =>  v.hasCheck === 0))  return;
                if(hasCheck == 1) {
                    let radio = `${questionId}-${answerId}`;
                    let radios = this.data.radios;
                    if(radios.includes(radio)){
                        let index = radios.findIndex(v => {return v === radio})
                        let questionIndex = questions.findIndex(v => {return v.questionId === questionId})
                        questions[questionIndex].answers.map(v => {
                            if(v.answerId === answerId) {
                                v.hasCheck = 0;
                            }
                            return v
                        })
                        radios.splice(index, 1);
                        this.setData({
                            questions: questions,
                            radios: radios
                        })
                        this.triggerEvent('radioChange', radios)
                    }
                }
            }
        },
        radioChange(e){
            let radios = this.data.radios;
            let currentIndex = Number(e.currentTarget.dataset.questionid);
            let questions = this.data.questions;
            let answerId = Number(e.detail.value);
            questions.map(v => {
                if(v.questionId === currentIndex){
                    v.answers.map(t => {
                        if(answerId === t.answerId){
                            t["hasCheck"] = 1;
                        } else {
                            t.hasCheck = 0;
                        }
                        return t
                    })
                }
                return v
            });
            let isIn = false;
            for(let i = 0, len = questions.length; i < len; i++ ){
                if(currentIndex == questions[i].questionId) {
                    let id = questions[i].questionId
                    if(radios.length > 0) {
                        for(let [index,item] of radios.entries()){
                            if(item.includes(`${currentIndex}-`)){
                                radios.splice(index, 1, id + '-' + answerId)
                                isIn = true;
                            } 
                        }
                        if(!isIn){
                            radios.push(id + '-' + answerId)
                        }
                    } else {
                        radios.push(id + '-' + answerId)
                    }    
                }
            }
           
            for(let i = 0, len = radios.length; i < len; i++){
                for(let j = 0, jlen = radios.length - i - 1; j < jlen; j++){
                    let id = radios[j].split('-')[0];
                    let vId = radios[j + 1].split('-')[0];
                    if(id > vId){
                        let temp = radios[j];
                        radios[j] = radios[j + 1];
                        radios[j + 1] = temp;
                    }
                }
            }
            this.setData({
                questions: questions,
                radios: radios
            })
            this.triggerEvent('radioChange', radios)
        }
    }
})