## 微信组件库

### Audio音频组件
**支持音频自定义样式、播放、暂停、快进等功能**
 - name -- 音频名称
 - poster -- 音频页图片
 - author -- 音频作者
 - src -- 音频链接地址
 - isSpeed -- 是否需要快进
 - activeColor -- 进度条颜色
 - blockColor -- 快进拖拽点颜色
 - total -- 音频总时长
 - isCustom -- 是否需要自定义样式
 - status -- 播放状态
 - secondes -- 需要快进/后退的秒数

### Uploader上传组件
**目前只支持小程序上传图片到七牛云的项目**
 - src -- 获取七牛云token的链接（后端给出）
 - region -- 图片上传的地区
 - header -- 调用接口时的header属性
 - domainUrl -- 七牛云显示图片的域名
 - header -- 调用接口时的header属性
 - sizeType -- 图片类型
 - sourceType -- 图片来源
 - isCustom -- 是否需要自定义样式
 - count -- 一次性可选择的图片数
 - maxCount -- 可上传的最大图片数
 - isPreview -- 是否可预览
 - isShow -- 上传的按钮是否显示
**注：如传maxCount，maxCount必须大于count**
 
### Toast组件
**目前只支持换行，不支持换图**
 - content -- 内容
 - duration -- 显示时常（默认1.5秒）
 
### search组件
**搜索组件，支持搜索，取消，清空**
 - focus -- 获取焦点
 - placeholderVal -- 占位文案
 - maxLength -- 最大输入长度，设置为 -1 的时候不限制最大长度
 - searchCancle -- 取消事件回调
 - confirmEvent -- 点击完成按钮时触发，event.detail = {value: value}
 
### Dialog组件
**目前支持换行及在dialog内容里自定义样式**
 - title -- 标题
 - content -- 内容
 - cancleText -- 可自定义取消文案
 - confirmText -- 可自定义确定文案
 - cancleShow -- 是否显示取消按钮
 - confirmEvent -- 确定事件回调
 - cancleEvent -- 取消事件回调
**注：dialog内容里自定义样式需要加<view slot="content-description"></view>**


