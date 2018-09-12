/**
 * @desc 文件说明：工具方法集合
 * @func    {Func}      isString                        判断是否为字符串
 * @func    {Func}      isNum                           判断是否为数字
 * @func    {Func}      isArray                         判断是否为数组
 * @func    {Func}      isObject                        判断是否为非null对象
 * @func    {Func}      isFunc                          判断是否为函数
 * @func 	{Func}		array2Object					数组转对象
 * @func	{Func}		object2Array					对象转数组
 * @func 	{Func}		formatTime						时间戳转换
 * @exports {Func}      isString                        导出判断字符串类型方法
 * @exports {Func}      isNum                           导出判断数字类型方法
 * @exports {Func}      isArray                         导出判断数组类型方法
 * @exports {Func}      isObject                        导出判断非null对象方法
 * @exports {Func}      isFunc                          导出判断函数类型方法
 * @exports {Func}		array2Object					导出数组转对象方法
 * @exports {Func}		object2Array					导出对象转数组方法
 * @exports	{Func}		formatTime						导出时间戳转换方法
 */


/**
 * 是否为字符串
 * @param  {String}  str 预期传入字符串
 * @return {Boolean}     返回判断值
 */
export const isString = str => typeof str === 'string';
/**
 * 是否为数字
 * @param  {Number}  num 预期传入数字
 * @return {Boolean}     返回判断值
 */
export const isNum = num => typeof num === 'number';
/**
 * 是否为数组
 * @param  {Array}  ary 预期传入数组
 * @return {Boolean}     返回判断值
 */
export const isArray = ary => Array.isArray(ary);
/**
 * 是否为非NULL对象
 * @param  {Object}  obj 预期传入对象
 * @return {Boolean}     返回判断值
 */
export const isObject = obj => obj && typeof obj === 'object';
/**
 * 是否为函数
 * @param  {Func}  func 预期传入函数
 * @return {Boolean}      返回判断值
 */
export const isFunc = func => typeof func === 'function';

/**
 * @desc 数组转对象，规则如下：
 *       1、如果参数为非数组或空数组，则原值返回；
 *       2、如果参数为有值数组，则按以下方式处理：
 *       	2.1、如果值是基本类型，则以索引为键返回键值对象，例：[1,'a'] => {0: 1, 1: 'a'}
 *       	2.2、如果值是对象，则直接合并，例：[{a: 1, b: [1,2]}] => {a: 1, b: [1,2]}
 *       	2.3、如果值是数组，则递归调用自身，返回值合并，例：[1, 2, [3, [4]]] => {0:1, 1:2, 2: {0: 3, 1: {0: 4}}}
 * @param  {Array}  ary 预计传入数组
 * @return {*}			返回一个转换过的对象，或者其他数据类型
 */
export const array2Object = (ary = []) => {
	return isArray(ary) && ary.length ?
        ary.reduce( ( pre, a, i ) => {
            return { ...pre, ...( isArray(a) ? ( a.length ? { [i]: array2Object(a) } : { [i]: {} } ) : isObject(a) ? a : { [i]: a } ) }
        }, {} ) : ary;
}

console.log( array2Object([ 1, 2, {a: 3, c: [4,5]}] ) );
console.log( array2Object([
    [1,2],
    {k1: 123},
    123, 2332323,
	[],
    [ {a: 2, b: [1,2]}, [], [ 3, [ 4, [ {c: [8]} ]]]]
] ) );

/**
 * @desc 对象转数组，规则如下：
 *       1、如果参数为null或非对象，则原值返回；
 *       2、否则，则按以下方式处理：
 *       	2.1、如果值是基本类型，则以索引和值为键值对返回，例：{0: 1, 1: 'a'} => [{0: 1},{1: 'a'}]
 *       	2.2、如果值是数组，则直接返回，例： {a: 1, b: [1,2]} => [{a: 1}, {b: [1,2]}]
 *       	2.3、如果值是对象，则递归调用自身，按照上面规则返回值，
 *       		例： {a: 1, b: [1,2], c: {d: 3, e: {f: 4}}} => [{a:1}, {b: [1,2]}, {c: [{d: 3}, {e: [{f: 4}]}] }]
 * @param  {Object}  obj 预计传入数组
 * @return {*}			 返回一个转换过的数组，或者其他数据类型
 */
export const object2Array = (obj = {}) => {
	return obj && isObject(obj) ?
		Object.getOwnPropertyNames(obj).reduce( ( pre, prop, i ) => {
			let v = obj[prop];
			v = isObject(v) ? object2Array(v) : v;
			return [...pre, ...[{ [prop]: v }]];
		}, [] ) : obj;
}
console.log( object2Array({a: 1, b: {c: 2, d: { e: [1,2]}}}) )
console.log( object2Array({a: 1, b: [1,2], c: {d: 3, e: {f: 4}}}) )

/**
 * @desc 时间戳转换
 * @param  {Number}  time         	时间戳
 * @param  {Boolean} showTime 		是否显示具体时间
 * @param  {String}  unit       	日期间隔单位，默认不设为中文，即：年月日
 * @return {String}                 日期字符串
 */
export const formatTime = (time = 0, showTime = false, unit = '') => {
    let date = new Date(time);
    let Y = date.getFullYear() + `${unit ? unit : '年'}`;
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + `${unit ? unit : '月'}`;
    let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + `${unit ? '' : '日'}`;
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
	let t = showTime ? ` ${h}${m}${s}` : '';
    return `${Y}${M}${D}${t}`;
}

console.log(formatTime(new Date("1970-01-02").getTime(),!!1))
