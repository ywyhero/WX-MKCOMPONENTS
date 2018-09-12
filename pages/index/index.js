/**
 * @desc 本目录为demo
 */


Page({
    data: {
        lists: [{
            id: 0,
            value: "toast"
        },{
            id: 1,
            value: "dialog"
        },{
            id: 2,
            value: "search"
        },{
            id: 3,
            value: "audio"
        },{
            id: 4,
            value: "radio"
        },{
            id: 5,
            value: "uploader"
        }]
    },
    toDetail(e){
        let id = Number(e.currentTarget.dataset.id);
        switch (id) {
            case 0: 
                wx.navigateTo({
                    url: '/pages/toast/index'
                })
                break;
            case 1: 
            wx.navigateTo({
                url: '/pages/dialog/index'
            })
            break;
            case 2: 
                wx.navigateTo({
                    url: '/pages/search/index'
                })
                break;
            case 3: 
                wx.navigateTo({
                    url: '/pages/audio/index'
                })
                break;
            case 4: 
                wx.navigateTo({
                    url: '/pages/radio/index'
                })
                break;
            case 5: 
                wx.navigateTo({
                    url: '/pages/uploader/index'
                })
                break;
        }
    },
    
})
