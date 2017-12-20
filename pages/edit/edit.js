// pages/edit/edit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img_head: null,
    user_name: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userinfo()
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

  userinfo: function () {
    var that = this
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/user/user_index_init',
      method: 'POST',
      data: {
        uid: wx.getStorageSync('token').uid,
        token: wx.getStorageSync('token').token
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.ret == 0) {
          that.setData({
            user_name: res.data.data.user_name,
            img_head: res.data.data.img_head
          })
        }
      }
    })
  },

  changeAvatar: function (e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var outthis = that
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://api.chuanhuatong.cc/index/user/upload_img_head',
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            uid: wx.getStorageSync('token').uid,
            token: wx.getStorageSync('token').token
          },
          success: function (res) {
            var res_data = JSON.parse(res.data)
            if (res_data.ret == 0) {
              wx.showToast({
                title: '修改成功',
                icon: 'success'
              })
              outthis.setData({
                img_head: res_data.data.head_url
              })
            } else {
              wx.showToast({
                title: '修改失败',
                icon: 'loading'
              })
            }
          }
        })
      },
    })
  },

  changeUserName: function (e) {
    wx.navigateTo({
      url: '../../pages/editProfile/editProfile'
    })
  }
})