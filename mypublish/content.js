// pages/mypublish/content.js
const db = wx.cloud.database(); 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    keyword:'',
    TabCur:0,
    tabNav: ['我的出售', '求购信息']
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this=this;
      db.collection('publishBook')
      .aggregate()
      .sample({
        size:20
      }).end().then(res=>{
        console.log(res.list[0].content);
        console.log(res.list);
        _this.setData({
          ne:res.list
        })
      })
      db.collection('needsBook').get({
        success(res){
            console.log(res.data)
            _this.setData({
              needs:res.data
            })
        }
      })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  jumpTobook: function (options) {
    wx.navigateTo({
      url: 'book/book',
    })
  },
  
  
  

})