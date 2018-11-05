const Base64 = require('./js/base64.js')
Component({
    properties: {
        zoneCode: {
            type: String,
            value: '+86',
            observer(newVal, oldVal, changedPath) {
                if (newVal !== '+86') {
                    this.setData({
                        maxLength: '4-16'
                    })
                } else {
                    this.setData({
                        maxLength: 11
                    })
                }
            }
        },
        codeUrl: {
            type: String,
            value: 'https://mini-api-qa.peilian.com/guarder/v2/register/getSmsCode'
        },
        loginUrl: {
            type: String,
            value: 'https://mini-api-qa.peilian.com/guarder/v2/register/register'
        },
        unionId: {
            type: String,
            value: "oask9tzMUcHYWw1HftlHKiDVL31E"
        },
        channelId: {
            type: String,
            value: ""
        },
        openId: {
            type: String,
            value: "o5D3E5JmAhm9z68gn6v3wAcbaL_w"
        },
        srcType: {
            type: String,
            value: ""
        },
        srcUserId: {
            type: String,
            value: ""
        }
    },
    data: {
        maxLength: 11,
        selectColor: '#FD5E02',
        noSelectColor: '#9b9b9b',
        isChecked: true,
        codeVal: '获取验证码',
        seconds: 60,
        isLoading: false,
        isTelephoneShow: false,
        isCodeShow: false,
        isNameShow: false,
        telephoneVal: '',
        codeValue: '',
        nameVal: '',
        nameShow: false,
        isCanClick: false
    },
    methods: {
        toTelephone() {
            wx.makePhoneCall({
                phoneNumber: '400-6060-854'
            })
        },
        checkEvent() {
            this.setData({
                isChecked: !this.data.isChecked
            })
        },
        inputEvent(e) {
            let value = e.detail.value;
            let isTelephoneShow = false;
            let isCanClick = false;
            if (value.length > 0) {
                isTelephoneShow = true
                if (this.properties.zoneCode !== '+86' && value.length > 16) {
                    value = value.substr(0, 16)
                }
                if (this.properties.zoneCode === '+86' && value.length > 11) {
                    value = value.substr(0, 11)
                }
                if (this.data.codeValue !== '' && this.data.nameShow) {
                    if (this.data.nameVal !== '') {
                        isCanClick = true
                    }
                } else if (this.data.codeValue !== '' && !this.data.nameShow) {
                    isCanClick = true
                } else {
                    isCanClick = false
                }

            } else {
                isTelephoneShow = false
            }
            this.setData({
                isCanClick,
                isTelephoneShow,
                telephoneVal: value
            })
        },
        codeInputEvent(e) {
            let value = e.detail.value;
            let isCodeShow = false;
            let isCanClick = false;
            if (value.length > 0) {
                isCodeShow = true
                if (this.data.telephoneVal !== '' && this.data.nameShow) {
                    if (this.data.nameVal !== '') {
                        isCanClick = true
                    }
                } else if (this.data.telephoneVal !== '' && !this.data.nameShow) {
                    isCanClick = true
                } else {
                    isCanClick = false
                }

            } else {
                isCodeShow = false
            }
            this.setData({
                isCanClick,
                isCodeShow,
                codeValue: value
            })
        },
        nameInputEvent(e) {
            let value = e.detail.value;
            let reg = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
            if (reg.test(value)) {
                wx.showToast({
                    title: "昵称暂不支持表情",
                    icon: "none"
                })
                this.setData({
                    nameVal: '',
                    isNameShow: false
                })
                return
            }
            let isNameShow = false;
            let isCanClick = false;
            if (value.length > 0) {
                isNameShow = true
                if (this.data.telephoneVal !== '' && this.data.codeValue !== '') {
                    isCanClick = true
                } else {
                    isCanClick = false
                }
            } else {
                isNameShow = false
            }
            this.setData({
                isNameShow,
                nameVal: value
            })
        },
        clearTelephoneEvent() {
            this.setData({
                telephoneVal: '',
                isTelephoneShow: false,
                isCanClick: false
            })
        },
        clearCodeEvent() {
            this.setData({
                codeValue: '',
                isCodeShow: false,
                isCanClick: false
            })
        },
        clearNameEvent() {
            this.setData({
                nameVal: '',
                isNameShow: false,
                isCanClick: false
            })
        },
        getCodeEvent() {
            if (this.data.telephoneVal === '') {
                wx.showToast({
                    title: '手机号码不能为空',
                    icon: 'none'
                })
                return
            }
            if (this.properties.zoneCode !== '+86' && (this.data.telephoneVal.length < 4 || this.data.telephoneVal.length > 16)) {
                wx.showToast({
                    title: `请输入4-16位手机号`,
                    icon: 'none'
                })
                return
            } else if (this.properties.zoneCode === '+86' && this.data.telephoneVal.length < 11) {
                wx.showToast({
                    title: `请输入11位手机号`,
                    icon: 'none'
                })
                return
            }
            if (this.data.isLoading) {
                return
            }
            let codeVal = `${this.data.seconds}s重新获取`;
            this.setData({
                isLoading: true
            })
            let timer = setInterval(() => {
                let seconds = this.data.seconds - 1;
                if (seconds === 0) {
                    codeVal = '获取验证码'
                    clearInterval(timer)
                    this.setData({
                        isLoading: false,
                        seconds: 60,
                        codeVal
                    })
                } else {
                    codeVal = `${seconds}s重新获取`
                    this.setData({
                        codeVal,
                        seconds
                    })
                }

            }, 1000)
            let url = this.properties.codeUrl;
            let timestamp = new Date().getTime();
            let ticket = Base64.encode('vippeilian_' + timestamp)  //加密
            wx.request({
                url: url,
                method: "POST",
                data: {
                    "areaCode": `${this.properties.zoneCode}`,
                    "mobile": this.data.telephoneVal,
                    "ticket": ticket,
                    "unionId": this.properties.unionId
                },
                success: res => {
                    const { code, data, msg } = res.data;
                    if (code === 200) {
                        wx.showToast({
                            title: data.msg,
                            icon: "none"
                        })
                        const regStatus = data.regStatus;
                        let nameShow = false
                        if (regStatus === 0) {
                            nameShow = true
                        }
                        this.setData({
                            nameShow
                        })
                    } else {
                        wx.showToast({
                            title: msg,
                            icon: "none"
                        })
                    }
                }
            })
        },
        loginEvent() {
            if (!this.data.isChecked) {
                wx.showToast({
                    title: "请同意VIP陪练服务协议",
                    icon: "none"
                })
            }
            if (this.data.telephoneVal === '' || this.data.codeValue === '' || this.data.nameVal === '') {
                return
            }
            let url = this.properties.loginUrl;
            wx.request({
                url: url,
                method: 'POST',
                data: {
                    area: `${this.properties.zoneCode}`,
                    channelId: this.properties.channelId,
                    code: "1",
                    name: this.data.nameVal,
                    openId: this.properties.openId,
                    phone: this.data.telephoneVal,
                    srcType: this.properties.srcType,
                    srcUserId: this.properties.srcUserId,
                    unionId: this.properties.unionId
                },
                success: res => {
                    const { code, data, msg } = res.data;
                    if (code === 200) {
                        this.triggerEvent('onLoginEvent', { isLogin: true })
                    } else {
                        this.triggerEvent('onLoginEvent', { isLogin: false,  data: res.data})
                    }
                },
                fail: error => {
                    wx.showModel({
                        title: '',
                        content: error.msg || '网络不稳，请重试。',
                        showCancel: false
                    })
                }
            })
        }
    }
})