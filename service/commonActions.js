/**
 * @desc 文件说明：全局性接口集合，整个项目通用，应由项目负责人修改
 * @external httpRequest 引入请求模块
 * @exports object 导出请求接口集合
 */
import { httpRequest } from '../api/http';

/**
 * @desc 全局模块请求集合
 * @func getOpenId 用户登录态信息接口
 */
export default {
    /**
     * @desc 请求接口参数说明
	 * @param  	{Object} 	options 			请求参数，设置默认值空对象
     * @prop  	{String} 	options.url  		请求地址，必填
     * @prop  	{String} 	options.data  		请求数据，选填
     * @prop  	{String} 	options.header  	请求头设置，选填
     * @prop  	{String} 	options.method  	请求方法类型，必须大写，选填，默认值GET
     * @prop  	{Func} 		options.success 	请求成功回调，选填
     * @prop  	{Func} 		options.fail  		请求失败回调，选填
     * @prop  	{Func} 		options.complete  	请求完成回调，选填
     * @return 	{}
     */

	/**
	 * 使用ES5语法
	 */
 	getOpenId: function (options) {
 		httpRequest(Object.assign({ url: '/api/mini/get-openid' }, options));
 	},

    /**
     * 使用ES6语法
     */
	getOpenId: options => httpRequest({
		url: '/api/mini/get-openid',
		...options
	}),

}
