let innerAudioContexts = [];
Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        name: { // 音频名称
            type: String,  
            value: ''
        },
        poster: {// 音频页图片
            type: String,
            value: ''
        },
        author: { // 音频作者
            type: String,
            value: ''
        },
        src: { // 音频地址
            type: String,
            value: ''
        },
        isSpeed: { // 是否使用拖拽加速
            type: Boolean,
            value: false
        },
        activeColor: { // 音频进度条颜色
            type: String,
            value: '#FD5E02'
        },
        total: { // 音频总时长
            type: String,
            value: "00:00"
        },
        blockColor: { // 音频拖拽按钮背景颜色
            type: String,
            value: '#fff'
        },
        seconds: { 
            type: Number,
            value: 5
        },
        isCustom: {
            type: Boolean,
            value: false
        },
        status: { // 播放状态
            type: Boolean,
            value: false
        }
    },
    data: {
        time: '00:00',
        count: 1,
        percent: 0,
        totalTime: 0,
        isDrag: false,
        isFast: true,
        isLoading: false
    },
    attached(){
        this.audioInit(); // 初始化
        innerAudioContexts.push(this.innerAudioContext)
    },
    detached(){
        if(this.innerAudioContext){
            this.innerAudioContext.destroy();
        }
    },
    methods: {
        format(time) {
            let min, sec;
            let currentTime = Math.round(time)
            let currentSecond = Math.round(time - Math.floor(time / 60) * 60);
            min = this.padStartZero(Math.floor(currentTime / 60));
            sec = this.padStartZero(currentSecond === 60 ? 0 : currentSecond);
            return min + ':' +sec;
        },
        padStartZero(num) {
            if(num < 10) {
                num = '0' + num
            } 
            return num;
        },
        audioInit(){
            if(this.innerAudioContext){
                this.innerAudioContext.destroy();
            }
            this.innerAudioContext = wx.createInnerAudioContext();
            console.log(this.properties.src)
            this.innerAudioContext.src = this.properties.src;
            console.log(this.innerAudioContext.offCanplay)
            this.innerAudioContext.offCanplay();
            this.innerAudioContext.offEnded();
            this.innerAudioContext.offError();

            this.innerAudioContext.onWaiting(() => {
                this.setData({
                    isLoading: true
                })
                this.triggerEvent('audioObj', {
                    isLoading: true,
                    total: this.data.total,
                    time: this.data.currentTime,
                    percent:  this.data.percent,
                })
            })
            this.innerAudioContext.onCanplay(() => {
                this.setData({
                    isLoading: false
                })
                this.triggerEvent('audioObj', {
                    isLoading: false,
                    total: this.data.total,
                    time: this.data.time,
                    percent:  this.data.percent,
                })
            })
            this.audioPlay();
            this.innerAudioContext.onEnded(() => {
                let total = this.data.total;
                let currentTime = this.data.time;
                if( total !== currentTime) {
                    currentTime = total
                }
                this.innerAudioContext.destroy();
                this.audioInit();
                this.setData({
                    time: currentTime,
                    status: false
                })
                this.triggerEvent('audioObj', {
                    isLoading: false,
                    total: this.data.total,
                    time: currentTime,
                    percent:  this.data.percent,
                    isEnd: true
                })
            })
            this.innerAudioContext.onError((res) => {
                console.log(res.errMsg)
                console.log(res.errCode)
            })
        },
        audioPlay(){
            this.innerAudioContext.offPlay();
            this.innerAudioContext.offTimeUpdate();
            this.innerAudioContext.onPlay(() => {
                this.setData({
                    isLoading: false
                })
                this.innerAudioContext.onTimeUpdate(() => {
                    let total = this.innerAudioContext.duration;
                    let currentTime = null;
                    currentTime = this.innerAudioContext.currentTime;
                    let percent = Math.round(currentTime) / Math.round(total) * 100;
                    total = this.format(total);
                    currentTime = this.format(currentTime);
                    this.setData({
                        totalTime: this.innerAudioContext.duration,
                        total: total,
                        time: currentTime,
                        percent: Math.round(percent),
                    })
                    this.triggerEvent('audioObj', {
                        isLoading: false,
                        total: total,
                        time: currentTime,
                        percent: Math.round(percent),
                    })
                })
            })
        },
        
        seekTime(totalTime, time, percent){
            let currentTime = this.format(time);
            percent =  Math.round(time) / Math.round(totalTime) * 100;
            this.innerAudioContext.pause();
            this.innerAudioContext.seek(time); 
            setTimeout(() => {    //onSeeked事件  安卓会有问题
                let status = false;
                if(this.data.status) {
                    this.innerAudioContext.play();
                    this.audioPlay()
                    status = true;
                }
                this.setData({
                    status: status,
                    percent: percent,
                    time: currentTime
                })
                this.triggerEvent('audioObj', {
                    isLoading: false,
                    total: this.data.total,
                    time: currentTime,
                    percent:  percent,
                })
                setTimeout(() => {
                    this.setData({
                        isFast: true
                    })
                }, 1000)
            },500)
        },
        forward(){
            let totalTime = this.data.totalTime;
            let seconds = this.properties.seconds;
            if(totalTime && this.data.isFast) {
                this.setData({
                    isFast: false
                })
                let percent = this.data.percent;
                let time = Math.round(totalTime * percent / 100) + seconds  > totalTime ? totalTime :  Math.round(totalTime * percent / 100) + seconds;
                this.seekTime(totalTime, time, percent)
            }
            
        },
        back(){
            let totalTime = this.data.totalTime;
            let seconds = this.properties.seconds;
            if(totalTime && this.data.isFast) {
                this.setData({
                    isFast: false
                })
                let percent = this.data.percent;
                let time = Math.round(totalTime * percent / 100) -  seconds < 0 ? 0 :  Math.round(totalTime * percent / 100) - seconds;
                this.seekTime(totalTime, time, percent)
            }
        },
        bindchanging(e){
            let percent = e.detail.value;
            this.innerAudioContext.pause();
            let currentTime = this.format(this.data.totalTime * percent / 100)
            this.setData({
                percent: percent,
                status: false,
                time: currentTime
            })
            this.triggerEvent('audioObj', {
                isLoading: false,
                total: this.data.total,
                time: currentTime,
                percent:  percent,
            })
        },
        bindchange(e){
            let percent, currentTime;
            if(!this.data.totalTime) {
                percent = 0;
                currentTime = this.format(this.data.totalTime * percent / 100)
                this.setData({
                    percent: percent
                })
                this.triggerEvent('audioObj', {
                    isLoading: false,
                    total: this.data.total,
                    time: currentTime,
                    percent:  percent,
                    hasNoTotalTime: true
                })
                return
            };
            percent = e.detail.value;
            let time = Math.round(this.data.totalTime * percent / 100);
            currentTime = this.format(this.data.totalTime * percent / 100)
            this.innerAudioContext.pause();
            this.innerAudioContext.seek(time);
           
            setTimeout(() => {    //onSeeked事件  安卓会有问题
                // innerAudioContexts.forEach(v => {
                //     v.pause();
                // })
                let status = false;
                if(this.data.status) {
                    this.innerAudioContext.play();
                    this.audioPlay()
                    status = true;
                }
                this.setData({
                    status: status,
                    percent: percent,
                    time: currentTime
                })
                this.triggerEvent('audioObj', {
                    isLoading: false,
                    total: this.data.total,
                    time: currentTime,
                    percent:  percent,
                })
            }, 500)
        },
        playClick(){
            this.innerAudioContext.play();
        },
        pauseClick(){
            this.innerAudioContext.pause();
        },
        play(){
            innerAudioContexts.forEach(v => {
                v.pause();
            })
            this.setData({
                status: !this.data.status
            })
            if(this.data.status){
                this.playClick();
                
            } else {
                this.pauseClick();
            }
            this.triggerEvent('audioObj', {
                isLoading: false,
                total: this.data.total,
                time: this.data.time,
                percent:  this.data.percent,
            })
        }
    }
})