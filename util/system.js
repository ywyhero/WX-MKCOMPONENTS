/**
 * @desc 文件说明：系统信息及方法封装集合
 * @external   util工具方法
 * @external   commonActions 全局性请求接口
 * @member  {Object}    SYSTEM_INFO                     系统信息对象
 * @prop    {String}    SYSTEM_INFO.BRAND               手机品牌
 * @prop    {String}    SYSTEM_INFO.MODEL               手机型号
 * @prop    {String}    SYSTEM_INFO.PR                  设备像素比
 * @prop    {String}    SYSTEM_INFO.SCREEN_WIDTH        屏幕宽度
 * @prop    {String}    SYSTEM_INFO.SCREEN_HEIGHT       屏幕高度
 * @prop    {String}    SYSTEM_INFO.WINDOW_WIDTH        可使用窗口宽度
 * @prop    {String}    SYSTEM_INFO.WINDOW_HEIGHT       可使用窗口高度
 * @prop    {String}    SYSTEM_INFO.LANG                微信设置的语言
 * @prop    {String}    SYSTEM_INFO.VERSION             微信版本号
 * @prop    {String}    SYSTEM_INFO.SYSTEM              操作系统版本
 * @prop    {String}    SYSTEM_INFO.PLATFORM            客户端平台
 * @prop    {String}    SYSTEM_INFO.FONT                用户字体大小
 * @prop    {String}    SYSTEM_INFO.SDK                 客户端基础库版本
 * @func    {Func}      getSystemInfo                   获取系统信息方法
 * @func    {Func}      setStorageSync                  同步往本地存储数据方法
 * @func    {Func}      getStorageSync                  同步获取本地数据方法
 * @func    {Func}      removeStorageSync               同步从本地缓存中移除数据方法
 * @func    {Func}      clearStorageSync                同步清理本地数据方法
 * @func    {Func}      authenticate                    获取登录凭证进而换取用户登录态信息方法
 * @func    {Func}      getUserInfo                     获取用户信息方法
 * @func    {Func}      checkSession                    检测当前用户登录态是否有效方法
 * @exports {Object}    SYSTEM_INFO                     导出系统信息对象
 * @exports {Func}      getSystemInfo                   导出获取系统信息方法，开发者可自己调用，用于重新获取系统信息
 * @exports {Func}      getNetwork                      导出获取网络类型方法
 * @exports {Func}      getLocation                     导出获取当前的地理位置、速度方法
 * @exports {Func}      setStorageSync                  导出同步往本地存储数据方法
 * @exports {Func}      getStorageSync                  导出同步获取本地数据方法
 * @exports {Func}      removeStorageSync               导出同步从本地缓存中移除数据方法
 * @exports {Func}      clearStorageSync                导出同步清理本地数据方法
 * @exports {Func}      authenticate                    导出获取登录凭证进而换取用户登录态信息方法
 * @exports {Func}      getUserInfo                     导出获取用户信息方法
 * @exports {Func}      checkSession                    导出检测当前用户登录态是否有效方法
 */

import { isString, isObject, isFunc } from './util';
import commonActions from '../service/commonActions';

let SYSTEM_INFO = {};

/**
 * 清空系统信息
 */
const resetSystemInfo = () => SYSTEM_INFO = {}

/**
 * 获取系统信息
 */
const getSystemInfo = () => {
    try {
        let res = wx.getSystemInfoSync();
        SYSTEM_INFO.BRAND           = res.brand;
        SYSTEM_INFO.MODEL           = res.model;
        SYSTEM_INFO.PR              = res.pixelRatio;
        SYSTEM_INFO.SCREEN_WIDTH    = res.screenWidth;
        SYSTEM_INFO.SCREEN_HEIGHT   = res.screenHeight;
        SYSTEM_INFO.WINDOW_WIDTH    = res.windowWidth;
        SYSTEM_INFO.WINDOW_HEIGHT   = res.windowHeight;
        SYSTEM_INFO.LANG            = res.language;
        SYSTEM_INFO.VERSION         = res.version;
        SYSTEM_INFO.SYSTEM          = res.system;
        SYSTEM_INFO.PLATFORM        = res.platform;
        SYSTEM_INFO.FONT            = res.fontSizeSetting;
        SYSTEM_INFO.SDK             = res.SDKVersion;
        SYSTEM_INFO.ERROR           = !1;
    } catch (error) {
        // 获取失败，可以设置一个ERROR常量，开发者通过此属性来处理失败情况
        resetSystemInfo();
        SYSTEM_INFO.ERROR           = !!1;
    }
}

// 默认执行一次，初始化信息
getSystemInfo();

/**
 * 获取用户设备网络类型，开发者可根据网络情况做不同处理；
 * @desc 该方法接受两个参数，一个成功回调，参数为networkType；一个失败回调，参数为error对象
 * @param  {Func}   success     成功回调
 * @param  {Func}   fail        失败回调
 * @return {}
 */
const getNetwork = ({ success = f => f, fail = f => f }) => {
    wx.getNetworkType({
        success: res => success(res.networkType),
        fail: error => fail(error)
    })
}

/**
 * 获取当前的地理位置、速度
 * @desc 该方法接受两个参数，一个成功回调，参数是返回的location对象；一个失败回调，参数为error对象
 * @param  {Func}   success     成功回调
 * @param  {Func}   fail        失败回调
 * @return {}
 */
const getLocation = ({ success = f => f, fail = f => f }) => {
    wx.getLocation({
        success: res => success(res),
        fail: error => fail(error)
    })
}

/**
 * 同步的将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容。如数据类型不符，则不存储，并给出相应处理或提示
 * @param {String}          key     数据键值
 * @param {String|Object}   data    数据值
 */
const setStorageSync = (key, data) => {
    if ( isString(key) && ( isString(data) || isObject(data) ) ) {
        try {
            wx.setStorageSync(key, data);
        } catch (error) {
            console.error('本地数据存储失败!');
        }
    } else {
        // 不符合规范的处理
        console.warn('参数类型不符合!');
    }
}

/**
 * 从本地缓存中同步获取指定 key 对应的内容
 * @param  {String} key     数据键值
 * @return {String|Object}  返回对应key的数据，如key不符合规范，则返回null
 */
const getStorageSync = key => isString(key) ? wx.getStorageSync(key) : null;

/**
 * 同步从本地缓存中移除指定 key。如数据类型不符，则移除，并给出相应处理或提示
 * @param {String} key  数据键值
 */
const removeStorageSync = key => {
    if ( isString(key) ) {
        try {
            wx.removeStorageSync(key);
        } catch (error) {
            console.error('本地数据移除失败!');
        }
    } else {
        // 不符合规范的处理
        console.warn('参数类型不符合!');
    }
}

/**
 * 同步清理本地数据缓存。
 */
const clearStorageSync = () => {
    try {
        wx.clearStorageSync();
    } catch (error) {
        // 此处失败处理
        console.error('本地数据移除失败!');
    }
}

/**
 * 调用接口获取登录凭证（code）进而换取用户登录态信息，包括用户的唯一标识（openid） 及本次登录的 会话密钥（session_key）等。
 * @param  {Func}   success     成功回调，参数为登录态信息（{openid，session_key，unionid}）
 * @param  {Func}   fail        失败回调
 * @param  {Func}   complete    请求结束回调
 * @return {}
 */
const authenticate = ({ success = f => f, fail = f => f, complete = f => f }) => {
    wx.login({
        success: res => {
            if (res.code) {
                // 发起网络请求
                commonActions.getOpenId({
                    data: { code: res.code },
                    success: res => {
                        if (res.statusCode === 200) {
                            success(res.data);
                        } else {
                            fail(res.errMsg);
                        }
                    },
                    fail: error => fail(error),
                    complete: () => complete()
                });
            } else {
                fail(res.errMsg);
                console.warn('获取用户登录态失败！' + res.errMsg)
            }
        }
    });
}

/**
 * 获取用户信息，withCredentials 为 true 时需要先调用 wx.login 接口。
 * @param   {Func}      success     成功回调
 * @param   {Func}      fail        失败回调，这里可以再次请求认证
 * @param   {Func}      complete    请求结束回调，选填
 * @param   {Object}    options     请求方法里其他参数集合
 * @prop    {Boolean}   options.withCredentials     是否带上登录态信息
 * @prop    {String}    options.lang        指定返回用户信息的语言
 * @return  {}
 */
const getUserInfo = ({ success = f => f, fail = f => f, complete = f => f, ...options }) => {
    wx.getUserInfo({
        success: res => success(res),
        fail: error => fail(error),
        complete: () => complete(),
        ...options
    });
}

/**
 * 检测当前用户登录态是否有效。登录态过期后开发者可以再获取新的用户登录态。
 * @param   {Func}      success     成功回调
 * @param   {Func}      fail        失败回调，这里可以再次请求认证
 * @param   {Func}      complete    请求结束回调，选填
 * @return  {}
 */
const checkSession = ({ success = f => f, fail = f => f, complete = f => f }) => {
    wx.checkSession({
        success: () => success(),
        fail: () => fail(),
        complete: () => complete()
    });
}

export {
    SYSTEM_INFO, getSystemInfo,
    getNetwork, getLocation,
    setStorageSync, getStorageSync, removeStorageSync, clearStorageSync,
    authenticate, getUserInfo, checkSession,
};
