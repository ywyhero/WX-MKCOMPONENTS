let backgroundAudio = null;
let currentTime = 0;
let totalTime = 0;
let percent = 0;
let currentSeconds = '00:00';
let total = '00:00';
let status = true
let bindStatus = true
let backgroundClose = false
let timer = null
let navigateBack = false
let isSame = false
let isMediaError = false
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    title: {
      type: String,
      value: ''
    },
    coverImgUrl: {
      type: String,
      value: ''
    },
    audioUrl: {
      type: String,
      value: '',
      observer(newVal, oldVal) {
        if (newVal !== oldVal && newVal !== '' && oldVal !== '') {
          clearInterval(timer)
          isSame = false
          this.audioInit()
        }
      }
    }
  },
  attached() {
    if (!backgroundAudio) {
      this.audioInit()
    } else {
      wx.getBackgroundAudioPlayerState({
        success: res => {
          let dataUrl = res.dataUrl;
          if (dataUrl !== this.properties.audioUrl) {
            this.audioInit()
            isSame = false
          } else {
            isSame = true
            if (status) {
              this.setInterEvent()
            } else {
              this.pauseAudio()
              navigateBack = true
            }
          }
        }
      })
    }
  },
  detached() {
    clearInterval(timer)
  },
  pageLifetimes: {
    show() {
      // 微信列表头部关闭后的事件
      if (backgroundClose) {
        this.audioInit()
      }
    }
  },
  methods: {
    addSeconds() {
      currentTime = Math.floor(currentTime + 1);
      if (currentTime >= totalTime) {
        clearInterval(timer)
        this.loopPlay()
        return
      }
      currentSeconds = this.format(currentTime)
      percent = Math.round(currentTime) / Math.round(totalTime) * 100;
      this.triggerEvent('audioData', {
        isLoading: false,
        currentSeconds,
        total,
        status,
        percent,
        change: 10
      })
    },
    setInterEvent() {
      this.addSeconds()
      clearInterval(timer)
      // 页面重新进入后不会自动更新数据
      timer = setInterval(() => {
        if (status) {
          this.addSeconds()
        } 
      }, 1000)
    },
    format(time) {
      let min, sec;
      let currentTime = Math.round(time)
      let currentSecond = Math.round(time - Math.floor(time / 60) * 60);
      min = this.padStartZero(Math.floor(currentTime / 60));
      sec = this.padStartZero(currentSecond === 60 ? 0 : currentSecond);
      return min + ':' + sec;
    },
    padStartZero(num) {
      if (num < 10) {
        num = '0' + num
      }
      return num;
    },
    audioInit(currentTime = 0) {
      backgroundAudio = wx.getBackgroundAudioManager();
      backgroundAudio.title = this.properties.title;
      backgroundAudio.coverImgUrl = this.properties.coverImgUrl;
      backgroundAudio.src = this.properties.audioUrl;
      backgroundAudio.startTime = currentTime;
      isMediaError = false
      this.audioWaiting()
      this.audioCanPlay()
      this.audioPause()
      this.audioStop()
      backgroundAudio.onPrev(() => {
        this.prePlay()
      })
      backgroundAudio.onNext(() => {
        this.loopPlay()
      })
      backgroundAudio.onError(() => {
        isMediaError = true
        this.triggerEvent('audioError')
      })
      this.audioPlay()
      this.audioEnded()
    },
    audioWaiting() {
      backgroundAudio.onWaiting(() => {
        this.triggerEvent('audioData', {
          isLoading: true,
          currentSeconds,
          total,
          status,
          percent,
          change: 1
        })
      })
    },
    audioCanPlay() {
      backgroundAudio.onCanplay(() => {
        this.triggerEvent('audioData', {
          isLoading: false,
          currentSeconds,
          total,
          status,
          percent,
          change: 2
        })
      })
    },
    audioPause() {
      backgroundAudio.onPause(() => {
        status = false;
        this.triggerEvent('audioData', {
          isLoading: false,
          currentSeconds,
          total,
          status,
          percent,
          change: 3
        })
      })
    },
    audioStop() {
      backgroundAudio.onStop(() => {
        backgroundClose = true;
        status = false
        this.triggerEvent('audioData', {
          isLoading: false,
          currentSeconds,
          total,
          status,
          percent,
          change: 4
        })
      })
    },
    audioEnded() {
      backgroundAudio.onEnded(() => {
        currentSeconds = total;
        percent = 100
        this.triggerEvent('audioData', {
          isLoading: true,
          status,
          total,
          currentSeconds,
          percent,
          change: 5
        })
        this.loopPlay()
      })

    },
    audioPlay() {
      backgroundAudio.onPlay(() => {
        //当微信上面关闭音频后，进入页面后页面是暂停状态
        if (backgroundClose) {
          backgroundAudio.pause()
          backgroundClose = false
        }
        status = true;
        backgroundAudio.onTimeUpdate(() => {
          totalTime = backgroundAudio.duration;
          currentTime = Math.floor(backgroundAudio.currentTime);
          total = this.format(totalTime)
          currentSeconds = this.format(currentTime)
          percent = Math.round(currentTime) / Math.round(totalTime) * 100;
          if(!isSame) {
            this.triggerEvent('audioData', {
              isLoading: false,
              currentSeconds,
              total,
              status,
              percent,
              change: 6
            })
          }
          
        })
      })
    },
    bindChanging(e) {
      percent = e.detail.value;
      currentTime = totalTime * percent / 100;
      currentSeconds = this.format(totalTime * percent / 100);
      this.triggerEvent('audioData', {
        isLoading: false,
        status,
        total,
        currentSeconds,
        percent
      })
    },
    bindChange(e) {
      percent = e.detail.value;
      currentTime = totalTime * percent / 100;
      currentSeconds = this.format(currentTime);
      backgroundAudio.seek(currentTime);
      backgroundAudio.startTime = currentTime;
      if (status) {
        backgroundAudio.play()
      }
      this.triggerEvent('audioData', {
        isLoading: false,
        status,
        total,
        currentSeconds,
        percent,
        change: 7
      })

    },
    prePlay() {
      this.triggerEvent('prePlay')
    },
    loopPlay() {
      !isMediaError && this.triggerEvent('loopPlay')
    },
    pauseAudio() {
      status = false;
      clearInterval(timer)
      backgroundAudio.pause();
      this.triggerEvent('audioData', {
        isLoading: false,
        currentSeconds,
        total,
        status,
        percent,
        change: 8
      })
    },
    playAudio() {
      status = true;
      if(!isSame) {
        this.triggerEvent('audioData', {
          isLoading: false,
          currentSeconds,
          total,
          status,
          percent,
          change: 9
        })
      } else {
        this.setInterEvent()
      }
      backgroundAudio.play();
      // 当暂停音频后，重新进入页面，初始化音频不然数据更新不了
      if (navigateBack) {
        navigateBack = false
        this.audioInit(currentTime)
      }
    }
  }

})