Page({
    onLoad() {
        this.audio = this.selectComponent('#mkAudio')
    },
    /**
     * 
     * @param {音频名称}                 name 
     * @param {音频页图片}               poster 
     * @param {音频作者}                 author 
     * @param {音频地址 }                src 
     * @param {是否使用拖拽}             isSpeed 
     * @param {音频进度条颜色(默认橘红色)} activeColor 
     * @param {音频拖拽按钮颜色(默认白色)} blockColor 
     * @param {音频总时长(如果没有可不传)} total 
     * @param {是否自定义样式}           isCustom 
     * @param {快进/后退的秒数}          seconds 
     * @param {播放状态}                status 
     * 
     */
    data: {
        name: '车尼尔599 No.01',
        poster: 'http://book.static.pnlyy.com/book_cover/86_1436537889.jpg!200',
        author: '车尼尔',
        src: 'http://book.audio.pnlyy.com/course_music/2096_1436541375.mp3',
        isSpeed: false,
        activeColor: '#FD5E02',
        total: "00:00",
        blockColor: '#fff',
        descData: [{
            parameter: 'name',
            type: 'String',
            require: '否',
            instruction: '音频名称',
        }, {
            parameter: 'poster',
            type: 'String',
            require: '否',
            instruction: '音频页图片',
        }, {
            parameter: 'author',
            type: 'String',
            require: '否',
            instruction: '音频作者',
        }, {
            parameter: 'src',
            type: 'String',
            require: '是',
            instruction: '音频地址',
        }, {
            parameter: 'isSpeed',
            type: 'Boolean',
            require: '否',
            instruction: '是否用拖拽',
        }, {
            parameter: 'activeColor',
            type: 'String',
            require: '否',
            instruction: '进度条颜色',
        }, {
            parameter: 'blockColor',
            type: 'String',
            require: '否',
            instruction: '拖拽点颜色',
        }, {
            parameter: 'total',
            type: 'String',
            require: '否',
            instruction: '音频总时长',
        }, {
            parameter: 'isCustom',
            type: 'Boolean',
            require: '否',
            instruction: '是否自定义样式',
        }, {
            parameter: 'status',
            type: 'Boolean',
            require: '否',
            instruction: '播放状态',
        }, {
            parameter: 'seconds',
            type: 'Number',
            require: '否',
            instruction: '快进/后退秒数',
        }]
    },
    forward(){
        this.audio.forward()
    },
    back(){
        this.audio.back()
    },
})