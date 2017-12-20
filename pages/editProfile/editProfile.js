// pages/editProfile/editProfile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input_value: null,
    disabled: true,
    loading: false
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

  usernameinput: function (e) {
    var input_value = e.detail.value
    if (input_value) {
      this.setData({
        input_value: input_value,
        disabled: false
      })
    } else {
      this.setData({
        input_value: input_value,
        disabled: true
      })
    }
  },

  button: function (e) {
    var that = this
    this.setData({
      loading: true
    })
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/user/profileedit',
      method: 'POST',
      data: {
        uid: wx.getStorageSync('token').uid,
        token: wx.getStorageSync('token').token,
        category: 2,
        content: this.data.input_value
      },
      success: function (res) {
        if (res.data.ret == 0) {
          wx.showToast({
            title: '修改成功',
            icon: 'success'
          })
          wx.navigateBack()
        } else if (res.data.ret == -3) {
          wx.showToast({
            title: '用户名已存在',
            icon: 'loading'
          })
        } else {
          wx.showToast({
            title: '位置错误',
            icon: 'loading'
          })
        }
        that.setData({
          loading: false
        })
      }
    })
  }
})