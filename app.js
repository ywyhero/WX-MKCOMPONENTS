// import { authenticate, getUserInfo } from './util/system';
App({
    onLaunch: function () {
        console.group('App Launch');
        // 调用接口获取登录凭证（code）进而换取用户登录态信息，并通过回调处理这些数据
        // authenticate({
        //     success: res => console.log(`openid: ${res.openid}`),
        //     fail: error => console.log(`认证失败：${error}`)
        // });
        // // 获取用户信息
        // getUserInfo({
        //     withCredentials: !!1,
        //     success: res => console.log(res),
        //     fail: error => console.log(error)
        // })
    },
    onShow: function () {
        console.log('App Show')
    },
    onHide: function () {
        console.log('App Hide')
    },
    onError: function (error) {
        console.log(error);
    }
})
