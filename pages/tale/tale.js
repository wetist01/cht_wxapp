// tale.js

//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null,
    page: 1,
    tips: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    app.getLocationInfo(function (userLocation) {
      that.getTaleList(userLocation.longitude, userLocation.latitude)
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
    var that = this
    app.getLocationInfo(function (userLocation) {
      that.getTaleList(userLocation.longitude, userLocation.latitude)
    })
    wx.stopPullDownRefresh()
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

  /**
   * 获取列表
   */
  getTaleList: function (longitude, latitude) {
    var that = this
    this.showloading()
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/tale/talelist',
      method: 'POST',
      data: {
        longitude: longitude,
        latitude: latitude,
        uid: wx.getStorageSync('token').uid,
        token: wx.getStorageSync('token').token,
        page: this.data.page,
        version: wx.getStorageSync('version')
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.ret == 0) {
          var list = res.data.data
          that.setData({
            list: list,
            tips: null
          })
        } else {
          that.setData({
            list: null,
            tips: 1
          })
        }

        wx.hideLoading()
      }
    })
  },

  createlike: function (event) {
    console.log(event)
    var that = this
    var tale_id = event.currentTarget.dataset.taleid
    var liked_uid = event.currentTarget.dataset.uid
    console.log(tale_id, liked_uid)
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/like/createlike',
      type: 'POST',
      data: {
        uid: 1,
        tale_id: tale_id,
        liked_uid: liked_uid
      },
      success: function (res) {

      }
    })
  },

  taleinfo: function (event) {
    var tale_id = event.currentTarget.dataset.taleid
    var uid = event.currentTarget.dataset.uid
    wx.navigateTo({
      url: '../../pages/comment/comment?tale_id=' + tale_id + '&uid=' + uid,
    })
  },

  showloading: function () {
    wx.showLoading({
      title: '正在加载'
    })
  }
})