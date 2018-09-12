/**
 * @desc 文件说明：业务模块中请求接口集合，根据开发者负责的业务各自独立
 * @external httpRequest 引入请求模块
 * @exports object 导出请求接口集合
 */
import { httpRequest } from '../api/http';

/**
 * @desc ***业务模块请求集合
 * @func getCourseList 课程请求列表接口
 */
export default {
    /**
     * 课程请求列表接口
     * @param  	{Object} 	options 			请求参数，设置默认值空对象
     * @prop  	{String} 	options.url  		请求地址，必填
     * @prop  	{String} 	options.data  		请求数据，选填
     * @prop  	{String} 	options.header  	请求头设置，选填
     * @prop  	{String} 	options.method  	请求类型，必须大写，选填
     * @prop  	{Func} 		options.success 	请求成功回调，必填
     * @prop  	{Func} 		options.fail  		请求失败回调，必填
     * @prop  	{Func} 		options.complete  	请求完成回调，选填
     * @return 	{}
     */

	/**
	 * 使用ES6调用
	 */
	getCourseList: options => httpRequest({
		url: '/api/mini/get-course-lit',
		method: 'POST',
		...options
	}),

	/**
	 * 使用ES5调用
	 */
	getCourseList: function (options) {
		httpRequest(Object.assign({
			url: '/api/mini/get-course-lit',
			method: 'POST',
		}, options));
	}
}
