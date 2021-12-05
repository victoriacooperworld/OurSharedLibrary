// pages/Home/Home.js
const app = getApp()
const db = wx.cloud.database({});
Page({
  data: {
    cardCur: 0,
    PageCur: 'Home',
    swiperList: [{ //轮播图图片列表
      id: 0,
      type: 'image',
      url: 'http://i1.fuimg.com/722480/70d4384332f566c5.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'http://i1.fuimg.com/722480/7abbe65bcd1aaddc.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'http://i1.fuimg.com/722480/fdb4a1aeea8473de.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'http://i1.fuimg.com/722480/13c7cf539ec0387a.jpg'
    }],
  },
  onLoad() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
  },
  //获取输入框内容
  INput(event ) {
    console.log('关键字', event.detail.value)
    this.setData({
      keyword: event.detail.value
    })
  },
  //通过类别按钮查询
  search :function (e){
    //查询
    var that=this
    var viewId = e.target.id;
    console.log("获取类别成功", viewId)
   db.collection('publishBook').where({	 	//collectionName 表示欲模糊查询数据所在collection的名
      type:db.RegExp({								//columnName表示欲模糊查询数据所在列的名
        regexp:viewId,
        options:'i'
      })
    }).get({
      success(res){
        console.log("获取数据成功", res.data)
        if(typeof(res.data[0])=="undefined"){
          wx.showModal({
            title: '查询失败',
            content:'未找到该关键词相关的书籍',
            success: function (res) {
             if (res.confirm) {//这里是点击了确定以后
               console.log('用户点击确定')
             } else {//这里是点击了取消以后
               console.log('用户点击取消')
             }
           }
           }) 
        }else{
          that.setData({
            ne:res.data
          })
          let str = JSON.stringify(res.data);
            wx.navigateTo({
              url: 'search/search?data='+str
            })
        }
      }
    })
    },
  //通过关键字查询 点击搜索触发
  jumptosearch: function (options) {
    var _this=this;
    const _=db.command
    let e=this.data.keyword
    app.globalData.KEYWORD=this.data.keyword
   db.collection('publishBook').where(_.or({	 	//collectionName 表示欲模糊查询数据所在collection的名
      name:db.RegExp({								//columnName表示欲模糊查询数据所在列的名
        regexp:e,
        options:'i'
      })
    },{
      author:db.RegExp({								//columnName表示欲模糊查询数据所在列的名
        regexp:e,
        options:'i'
      })
    },{
      type:db.RegExp({								//columnName表示欲模糊查询数据所在列的名
        regexp:e,
        options:'i'
      })
    }
    )).get({
      success(res){
        console.log("获取数据成功", res.data)
        if(typeof(res.data[0])=="undefined"){
          wx.showModal({
            title: '查询失败',
            content:'未找到该关键词相关的书籍',
            success: function (res) {
             if (res.confirm) {//这里是点击了确定以后
               console.log('用户点击确定')
             } else {//这里是点击了取消以后
               console.log('用户点击取消')
             }
           }
           }) 
        }else{
          _this.setData({
            ne:res.data,
          })
          let str = JSON.stringify(res.data);
            wx.navigateTo({
              url: 'search/search?data='+str
            })
        }
      }
    })    
  },
  jumpTouser:function (options) {
    wx.navigateTo({
      url: 'userbook/userbook',
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})
