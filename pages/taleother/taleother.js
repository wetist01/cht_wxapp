// taleother.js

//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null,
    options: null,
    tips: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    })
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.onload(options.tips)
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
    this.onload()
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
  getTaleList: function (url, data, tips) {
    var that = this
    wx.request({
      url: url,
      method: 'POST',
      data: data,
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
            tips: tips
          })
        }
        wx.hideLoading()
      },
      fail: function (res) {
        that.setData({
          list: null,
          tips: tips
        })
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

  onload: function (tips) {
    wx.showLoading({
      title: '正在加载'
    })
    var options = this.data.options
    var that = this
    if (options.type == 1) {
      var url = 'https://api.chuanhuatong.cc/index/tale/mytalelist'
      app.getLocationInfo(function (userLocation) {
        var data = {
          longitude: userLocation.longitude,
          latitude: userLocation.latitude,
          uid: wx.getStorageSync('token').uid,
          token: wx.getStorageSync('token').token,
        }
        that.getTaleList(url, data, tips)
      })
    } else if (options.type == 2) {
      var url = 'https://api.chuanhuatong.cc/index/collect/collectlist'
      var data = {
        uid: wx.getStorageSync('token').uid,
        token: wx.getStorageSync('token').token
      }
      that.getTaleList(url, data, tips)
    } else if (options.type == 3) {
      var url = 'https://api.chuanhuatong.cc/index/csm/csmtalelist'
      var csm_id = options.csm_id
      app.getLocationInfo(function (userLocation) {
        var data = {
          csm_id: csm_id,
          longitude: userLocation.longitude,
          latitude: userLocation.latitude,
          version: wx.getStorageSync('version')
        }
        that.getTaleList(url, data, tips)
      })
    }
  }
})