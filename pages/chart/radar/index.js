Page({
    data: {
        rpx: 0,
        centerPoint: 0,
        mRadius: 0,
        angle: 0,
        count: 5,
        slot: 5,
        data: [{
            name: "射手",
            value: 100
        }, {
            name: "法师",
            value: 80
        }, {
            name: "打野",
            value: 90
        }, {
            name: "坦克",
            value: 70
        }, {
            name: "辅助",
            value: 87
        }]
    },
    onLoad() {
        let rpx = wx.getSystemInfoSync().windowWidth / 375;
        let centerPoint = wx.getSystemInfoSync().windowWidth / 2;
        let mRadius = centerPoint - 60;
        let angle = Math.PI * 2 / this.data.count
        console.log(angle)
        this.setData({
            centerPoint,
            mRadius,
            angle,
            rpx
        })
        this.canvas = wx.createCanvasContext('radar');
    },
    onShow() {
        let slot = this.data.slot;
        let count = this.data.count;
        let centerPoint = this.data.centerPoint;
        let mRadius = this.data.mRadius;
        let angle = this.data.angle;
        let data = this.data.data;
        let rpx = this.data.rpx;
        this.canvas.setLineWidth(2);
        for (let i = 0; i < slot; i++) {
            this.canvas.beginPath();
            let rdius = mRadius / slot * (i + 1)
            //画5条线段
            for (let j = 0; j < count; j++) {
                //坐标
                let x = centerPoint + rdius * Math.cos(angle * j + Math.PI / 3.3);
                let y = centerPoint + rdius * Math.sin(angle * j + Math.PI / 3.3);
                this.canvas.lineTo(x, y);
            }
            this.canvas.closePath()
            this.canvas.stroke()
            this.canvas.beginPath();
            for (let k = 0; k < count; k++) {
                //坐标
                let x = centerPoint + rdius * Math.cos(angle * k + Math.PI / 3.3);
                let y = centerPoint + rdius * Math.sin(angle * k + Math.PI / 3.3);
                this.canvas.moveTo(centerPoint, centerPoint)
                this.canvas.lineTo(x, y);
            }
            this.canvas.closePath()
            this.canvas.stroke()

        }
        this.canvas.font = 'bold 17px cursive'
        for (let i = 0; i < count; i++) {
            let x = parseInt(
                centerPoint + mRadius * Math.cos(angle * i + Math.PI / 3.3)
            );
            let y = parseInt(
                centerPoint + mRadius * Math.sin(angle * i + Math.PI / 3.3)
            );
            let center = parseInt(centerPoint);
            if (x < center && y < center) {
                this.canvas.setTextAlign("left");
                this.canvas.fillText(data[i].name, x - 40 * rpx, y);
            } else if (x - 10 * rpx > center && y < center) {
                this.canvas.setTextAlign("right");
                this.canvas.fillText(data[i].name, x + 40 * rpx, y);
            } else if (y > center) {
                this.canvas.setTextAlign("center");
                this.canvas.fillText(data[i].name, x, y + 20 * rpx);
            } else {
                this.canvas.setTextAlign("center");
                this.canvas.fillText(data[i].name, x, y - 10 * rpx);
            }
        }
        let r = 3; //设置节点小圆点的半径
        for(let i = 0; i < count; i ++){
            let x = centerPoint + mRadius * Math.cos(angle * i + Math.PI / 3.3) * data[i].value / 100;
            let y = centerPoint + mRadius * Math.sin(angle * i + Math.PI / 3.3) * data[i].value / 100;

            this.canvas.beginPath();
            this.canvas.arc(x, y, r, 0, Math.PI * 2);
            this.canvas.fillStyle = 'red';
            this.canvas.fill();
        }
        this.canvas.beginPath();
        for (var i = 0; i < count; i++){
            var x = centerPoint + mRadius * Math.cos(angle * i + Math.PI / 3.3) * data[i].value / 100;
            var y = centerPoint + mRadius * Math.sin(angle * i + Math.PI / 3.3) * data[i].value / 100;

            this.canvas.lineTo(x, y);
        }
        this.canvas.closePath();
        this.canvas.setFillStyle('rgba(0,0,0,.5)')
        this.canvas.fill();
        this.canvas.draw();
    },


})