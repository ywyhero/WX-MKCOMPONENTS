/**
 * @desc 文件说明：用户系统信息
 * @external apiRoot                接口域名地址
 * @func httpRequest                小程序http请求方法
 * @exports httpRequest             导出小程序http请求方法
 */

import { apiRoot } from '../config/config';

/**
 * @desc 小程序请求模块
 * @param  {String} url                 这里传入的是接口路径, 必填
 * @param  {Func}   success             请求成功回调，选填
 * @param  {Func}   fail                请求失败回调，选填
 * @param  {Func}   complete            请求完成回调，选填
 * @param  {Object} options             包含其他参数属性的对象，选填
 * @prop   {String} options.method      请求类型，必须大写，选填，默认为GET
 * @prop   {String} options.dataType    接受参数类型，选填，默认为json
 * @prop   {Object} options.header      请求头设置，选填，默认为application/x-www-form-urlencoded
 * @return {}
 */
export const httpRequest = ({ url, success = f => f, fail = f => f, complete = f => f, ...options }) => {
    // ...loading开启
    wx.request({
        url: `${apiRoot}${url}`,
        method: 'GET',
        dataType: 'json',
        header: {'Content-Type': 'application/x-www-form-urlencoded'},
        success: res => {
            // ...loading关闭
            // 这里会先对微信服务返回数据做处理，通过statusCode做分支处理
            if (res.statusCode === 200) {
                // 这里才对业务服务返回数据处理
                const { code, data, msg } = res.data;
                if (code === 200) {
                    success(data);
                } else {
                    fail(msg);
                }
                console.log('请求成功');
                // 调用组件提示请求成功
            } else {
                // 调用组件提示请求失败
                fail(res);
            }

        },
        fail: error => {
            // ...loading关闭
            // 调用组件提示请求失败
            fail(error);
            console.log('请求失败');
        },
        complete: () => complete(),
        ...options,
     })
}
