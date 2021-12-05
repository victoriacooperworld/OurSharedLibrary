// pages/content/book/book.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    InputBottom: 0,
    is_shoucang:0,
    goods_info: { goods_id: 1, goods_title: "商品标题1", goods_price: '100', goods_yunfei: 0, goods_kucun: 100, goods_xiaoliang: 1, content:'商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情商品介绍详情'},
    goods_img: [
      {'img': 'http://m.qpic.cn/psc?/V11GK7bN0OlUZJ/F1H7YF3BXM1Q*sygiHZL4aLtRMDr2LXOa7X2cgaJvIZ0.yQdZIu8eS4VKZ3yaGR4mvSa4ZPJ*YfT2*een66cy*ZsjFCTZggIrPXU5Yh6FZo!/b&bo=OAQ4BAAAAAARJxA!&rf=viewer_4'},
      {'img': 'http://m.qpic.cn/psc?/V11GK7bN0OlUZJ/F1H7YF3BXM1Q*sygiHZL4aLtRMDr2LXOa7X2cgaJvIZ0.yQdZIu8eS4VKZ3yaGR4mvSa4ZPJ*YfT2*een66cy*ZsjFCTZggIrPXU5Yh6FZo!/b&bo=OAQ4BAAAAAARJxA!&rf=viewer_4' },
      {'img': 'http://m.qpic.cn/psc?/V11GK7bN0OlUZJ/F1H7YF3BXM1Q*sygiHZL4aLtRMDr2LXOa7X2cgaJvIZ0.yQdZIu8eS4VKZ3yaGR4mvSa4ZPJ*YfT2*een66cy*ZsjFCTZggIrPXU5Yh6FZo!/b&bo=OAQ4BAAAAAARJxA!&rf=viewer_4' },
      {'img': 'http://m.qpic.cn/psc?/V11GK7bN0OlUZJ/F1H7YF3BXM1Q*sygiHZL4aLtRMDr2LXOa7X2cgaJvIZ0.yQdZIu8eS4VKZ3yaGR4mvSa4ZPJ*YfT2*een66cy*ZsjFCTZggIrPXU5Yh6FZo!/b&bo=OAQ4BAAAAAARJxA!&rf=viewer_4' },
      ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    pjDataList: [{ headpic: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', author: '张三', add_time: '2018-06-01', content:'好评好评，真实太好了!'},
      { headpic: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', author: '张三', add_time: '2018-06-01', content: '好评好评，真实太好了!' }
    ],//评价数据 示例 数据从数据库中读取
  },
  InputFocus(e) {
    this.setData({
      InputBottom: e.detail.height
    })
  },
  InputBlur(e) {
    this.setData({
      InputBottom: 0
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    var href = this.data.imghref;
    var goodsimg = this.data.goods_img;
    var imglist = [];
    for (var i = 0; i < goodsimg.length; i++) {
      imglist[i] = href + goodsimg[i].img
    }
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: imglist// 需要预览的图片http链接列表  
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  BackToCon: function (options) {
    wx.switchTab({
      url: '../content',
    })
  }
})