let app = getApp();
Component({
  data: {
    navHeight: 0
  },
  properties: {
    navigationBackgroundStyle: {  // 导航栏背景色
      type: String,
      value: '#fff'
    },
    navigationTitleStyle: {  // 导航栏字体颜色
      type: String,
      value: '#fff'
    },
    navigationBarTitleText: {  //  导航栏文案
      type: String,
      value: '首页'
    },
    isFirst: {  // 是否是首页
      type: Boolean,
      value: false
    },
    isToHome: {  //  是否显示小房子（回首页）
      type: Boolean,
      value: false
    },
    isNavigate: { //  是否是小程序跳转
      type: Boolean,
      value: false
    },
    extraData: {  //  跳转小程序传值
      type: Object,
      value: {}
    }
  },
  attached() {
    let system = wx.getSystemInfoSync();
    let navHeight = system.statusBarHeight + 46;
    this.setData({
      navHeight: navHeight
    })
  },
  methods: {
    toBack() {
      if(ehis.properties.isNavigate) {
        wx.navigateBackMiniProgram({
          extraData: this.properties.extraData
        })
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
     
    },
    toHome() {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  }
})