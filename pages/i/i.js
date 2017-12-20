// i.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    userInfoApi: null,
    show: 1,
    commenthide: true,
    likehide: true,
    commentednum: 0,
    likednum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.commentednum()
    this.likednum()
    this.getmsg()
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
      that.userInfoApi()
    })
    if (wx.getStorageSync('show') == 2) {
      this.setData({
        show: 2
      })
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

  userInfoApi: function () {
    var that = this
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/user/user_index_init',
      method: 'POST',
      data: {
        uid: wx.getStorageSync('token').uid,
        token: wx.getStorageSync('token').token
      },
      success: function (res) {

        if (res.data.ret == 0) {
          wx.setStorage({
            key: 'userinfoapi',
            data: res.data.data
          })
          if (res.data.data.img_head) {
            that.setData({
              userInfoApi: res.data.data
            })
          } else {
            that.changeAvatar()
            that.userInfoApi()
          }
        }
      }
    })
  },

  changeAvatar: function () {
    var that = this
    console.log(this.data)
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/user/profileedit',
      method: 'POST',
      data: {
        uid: wx.getStorageSync('token').uid,
        token: wx.getStorageSync('token').token,
        category: 1,
        content: this.data.userInfo.avatarUrl
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },

  calling: function (e) {
    wx.makePhoneCall({
      phoneNumber: '15651079118',
    })
  },

  getmsg: function () {
    var that = this
    setTimeout(function () {
      that.commentednum()
      that.likednum()
      that.getmsg()
    }, 30000)
  },

  commentednum: function () {
    var that = this
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/comment/commentedunreadnum',
      method: 'POST',
      data: {
        uid: wx.getStorageSync('token').uid
      },
      success: function (res) {
        if (res.data.ret == 0) {
          var commentednum = res.data.data.commented_num
          if (commentednum == 0) {
            that.setData({
              commentednum: commentednum,
              commenthide: true
            })
          } else {
            that.setData({
              commentednum: commentednum,
              commenthide: false
            })
          }
        }
      }
    })
  },

  likednum: function () {
    var that = this
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/like/likednum',
      method: 'POST',
      data: {
        uid: wx.getStorageSync('token').uid
      },
      success: function (res) {
        if (res.data.ret == 0) {
          var likednum = res.data.data.liked_num
          if (likednum == 0) {
            that.setData({
              likednum: likednum,
              likehide: true
            })
          } else {
            that.setData({
              likednum: likednum,
              likehide: false
            })
          }
        }
      }
    })
  },

  editProfile: function (e) {
    wx.navigateTo({
      url: '../../pages/edit/edit',
    })
  },

  myTale: function (e) {
    wx.navigateTo({
      url: '../../pages/taleother/taleother?title=' + '我的发布' + '&type=1' + '&tips=' + '你还没有发布任何内容哦!'
    })
  },

  myCollect: function (e) {
    wx.navigateTo({
      url: '../../pages/taleother/taleother?title=' + '我的收藏' + '&type=2' + '&tips=' + '你还没有收藏任何内容哦!'
    })
  },

  myComment: function (e) {
    wx.navigateTo({
      url: '../../pages/table/table?title=' + '我的评论' + '&type=1' + '&tips=' + '你还没有发表任何评论哦'
    })
  },

  commentedList: function (e) {
    wx.navigateTo({
      url: '../../pages/table/table?title=' + '评论我的' + '&type=2' + '&tips=' + '还没收到评论'
    })
  },

  likedList: function (e) {
    wx.navigateTo({
      url: '../../pages/table/table?title=' + '赞我的' + '&type=3' + '&tips=' + '还没人给你赞哦'
    })
  }
})