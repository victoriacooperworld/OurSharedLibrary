//app.js
App({
  globalData: {
    userInfo: null,
    nowuseropid:null,
    OPEN_ID:null,
    KEYWORD:null
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      var code=res.code
      console.log(code)
      var appId='wx08ee204eefe07aac'
      var secret='ed04c7c1a430d2c15030e5381cc358be'
      wx.request({
        url:  'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
        data: {},
        header: {
        'content-type': 'json'
      },
      success: res => {
        var openid = res.data.openid //返回openid
        console.log('openid为' + openid);   
        this.globalData.OPEN_ID = openid
        //console.log(this.globalData.OPEN_ID)
        }
      })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.cloud.init({ //初始化云数据库
        env: 'shujuku-2zug5',
        traceUser: true
      })
  }
 
})