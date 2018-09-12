/**
 * @desc 本文件为全局配置管理，统一导出
 * @external    projectConf                     引入项目自定义配置
 * @external    envConf                         引入项目环境变量配置，如本地环境，测试环境，预发布环境等
 * @const       {Object}    env                 定义项目环境变量
 * @exports     {String}    apiRoot             导出请求域名
 * @exports     {String}    assetsDirectory     导出静态资源目录
 */
import * as projectConf from './project.conf';
import envConf from './env.conf';

const env = envConf[projectConf.ENV];
// 请求域名
const apiRoot = env.apiRoot;
// 静态资源目录
const assetsDirectory = `${env.assetsRoot}${env.assetsSubDirectory}`;

export {
    apiRoot,
    assetsDirectory,
}
