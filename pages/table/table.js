// table.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null,
    tips: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    var tips = options.tips
    var type = options.type
    if (type == 1) {
      var url = 'https://api.chuanhuatong.cc/index/comment/mycommentlist'
      var data = {
        uid: wx.getStorageSync('token').uid,
        token: wx.getStorageSync('token').token
      }
      this.getList(url, data, tips)
    } else if (type == 2) {
      var url = 'https://api.chuanhuatong.cc/index/comment/commentedlist'
      var data = {
        uid: wx.getStorageSync('token').uid,
        token: wx.getStorageSync('token').token
      }
      this.getList(url, data, tips)
    } else if (type == 3) {
      var url = 'https://api.chuanhuatong.cc/index/like/likedlist'
      var data = {
        uid: wx.getStorageSync('token').uid,
        token: wx.getStorageSync('token').token
      }
      this.getList(url, data, tips)
    }
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

  getList: function (url, data, tips) {
    var that = this
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      success: function (res) {
        console.log(res.data)
        if (res.data.ret == 0) {
          that.setData({
            list: res.data.data,
            tips: null
          })
        } else {
          that.setData({
            list: null,
            tips: tips
          })
        }
      },
      fail: function (res) {
        that.setData({
          list: null,
          tips: tips
        })
      }
    })
  },

  detail: function (e) {
    var uid = e.currentTarget.dataset.uid
    var tale_id = e.currentTarget.dataset.taleid
    wx.navigateTo({
      url: '../../pages/comment/comment?uid=' + uid + '&tale_id=' + tale_id
    })
  }
})