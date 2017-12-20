// csm.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCsmList()
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

  getCsmList: function () {
    var that = this
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/csm/csmlist',
      method: 'POST',
      data: {},
      success: function (res) {
        console.log(res.data)
        if (res.data.ret == 0) {
          that.setData({
            list: res.data.data
          })
        }
      }
    })
  },

  csminfo: function (e) {
    var csm_id = e.currentTarget.dataset.csmid
    var csm_name = e.currentTarget.dataset.csmname
    wx.navigateTo({
      url: '../../pages/taleother/taleother?title=' + csm_name + '&csm_id=' + csm_id + '&type=3' + '&tips=' + '还没有内容哦！'
    })
  }
})