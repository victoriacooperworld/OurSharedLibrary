//云数据库初始化
const app = getApp()
const db = wx.cloud.database(); 
Page({
  data: {
    keyword:'',
    Keyword:'',
    index:null,
    picker: ['书名', '作者', '类别','全部范围'],
    FLAG:0,
    flag0:0,
    flag1:0,
    flag2:0,
    flag3:0
  },
  onLoad: function(options) {
    let searchShow = JSON.parse(options.data);
    let that = this
    that.setData({
      searchShow: searchShow
    })
   
   // let keyword=app.globalData.KEYWORD
    console.log('KEY&&&&&',keyword)
  },
//获取输入的关键字
Input(event ) {
  console.log('关键字', event.detail.value)
  this.setData({
    keyword: event.detail.value,
    FLAG:1
  })
},
//跳转书籍详情页
gotoresult:function (e) {
   
  var viewId = e.target.id;
  console.log(viewId); //输出点击的view的id，第二种情况就不重复写了
  wx.navigateTo({
    url: '/pages/content/book/book?id='+viewId
  });
},
PickerChange(e) {
  console.log(e);
  this.setData({
    index: e.detail.value
  })
  console.log(e.detail.value)
  var that=this
  const _=db.command
  //console.log('$$$$',this.data.FLAG)
  if(this.data.FLAG==0){
    this.data.Keyword=app.globalData.KEYWORD
  }
  if(this.data.FLAG==1){
    this.data.Keyword=this.data.keyword
  }
  let Keyword=this.data.Keyword
  if(e.detail.value==0){
    this.data.flag0=1
    this.data.flag1=0
    this.data.flag2=0
    this.data.flag3=0
    console.log(Keyword)
    db.collection('publishBook').where({	 	//collectionName 表示欲模糊查询数据所在collection的名
      name:db.RegExp({								//columnName表示欲模糊查询数据所在列的名
        regexp:Keyword,
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
            searchShow:res.data
          })
        }
      }
    })
  }
  if(e.detail.value==1){
    this.data.flag0=0
    this.data.flag1=1
    this.data.flag2=0
    this.data.flag3=0
    console.log(Keyword)
    db.collection('publishBook').where({	 	//collectionName 表示欲模糊查询数据所在collection的名
      author:db.RegExp({								//columnName表示欲模糊查询数据所在列的名
        regexp:Keyword,
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
            searchShow:res.data
          })
        }
      }
    })
  }
  if(e.detail.value==2){
    this.data.flag0=0
    this.data.flag1=0
    this.data.flag2=1
    this.data.flag3=0
    console.log(Keyword)
    db.collection('publishBook').where({	 	//collectionName 表示欲模糊查询数据所在collection的名
      type:db.RegExp({								//columnName表示欲模糊查询数据所在列的名
        regexp:Keyword,
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
            searchShow:res.data
          })
        }
      }
    })
  }
  if(e.detail.value==3){
    this.data.flag0=0
    this.data.flag1=0
    this.data.flag2=0
    this.data.flag3=1
    console.log(Keyword)
    var that=this
    const _=db.command
    let e=this.data.keyword
   db.collection('publishBook').where(_.or({	 	//collectionName 表示欲模糊查询数据所在collection的名
      name:db.RegExp({								//columnName表示欲模糊查询数据所在列的名
        regexp:Keyword,
        options:'i'
      })
    },{
      author:db.RegExp({								//columnName表示欲模糊查询数据所在列的名
        regexp:Keyword,
        options:'i'
      })
    },{
      type:db.RegExp({								//columnName表示欲模糊查询数据所在列的名
        regexp:Keyword,
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
          that.setData({
            searchShow:res.data
          })
        }
      }
    })
  }
},
//点击搜索
sou() {
  //查询
  var that=this
  const _=db.command
  let e=this.data.keyword
  if(this.data.flag0==1){
    db.collection('publishBook').where({	 	//collectionName 表示欲模糊查询数据所在collection的名
      name:db.RegExp({								//columnName表示欲模糊查询数据所在列的名
        regexp:e,
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
            searchShow:res.data
          })
        }
      }
    })
  }
  if(this.data.flag1==1){
    db.collection('publishBook').where({	 	//collectionName 表示欲模糊查询数据所在collection的名
      author:db.RegExp({								//columnName表示欲模糊查询数据所在列的名
        regexp:e,
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
            searchShow:res.data
          })
        }
      }
    })
  }
  if(this.data.flag2==1){
    db.collection('publishBook').where({	 	//collectionName 表示欲模糊查询数据所在collection的名
      type:db.RegExp({								//columnName表示欲模糊查询数据所在列的名
        regexp:e,
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
            searchShow:res.data
          })
        }
      }
    })
  }
  if((this.data.flag0==0)&&(this.data.flag1==0)&&(this.data.flag2==0)&&(this.data.flag3==0)||(this.data.flag3==1)){
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
        that.setData({
          searchShow:res.data
        })
      }
    }
  })
}
  },
})