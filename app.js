//app.js
App({
  onLaunch: function () {
    this.show()
    this.userLogin()
    wx.setStorage({
      key: 'version',
      data: '1.0.2.0',
    })
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  getLocationInfo: function (cb) {
    var that = this
    if (this.globalData.userLocation) {
      typeof cb == "function" && cb(this.globalData.userLocation)
    } else {
      wx.showLoading({
        title: '正在定位'
      })
      //调用定位接口
      wx.getLocation({
        success: function (res) {
          wx.hideLoading()
          that.globalData.userLocation = res
          typeof cb == "function" && cb(that.globalData.userLocation)
        },
      })
    }
  },

  userLogin: function () {
    wx.login({
      success: function (res) {
        var code = res.code
        wx.request({
          url: 'https://api.chuanhuatong.cc/index/user/wxapplogin',
          method: 'POST',
          data: {
            code: code
          },
          success: function (res) {
            if (res.data.ret == 0) {
              wx.setStorage({
                key: 'token',
                data: {
                  uid: res.data.data.uid,
                  token: res.data.data.token
                }
              })
            }
          }
        })
      }
    })
  },

  show: function () {
    var that = this
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/index/show',
      method: 'POST',
      data: {
        version: '1.0.2.0'
      },
      success: function (res) {
        if (res.data == 2) {
          wx.setStorage({
            key: 'show',
            data: 2
          })
        }
      }
    })
  },

  globalData: {
    userInfo: null,
    userLocation: null
  }
})
