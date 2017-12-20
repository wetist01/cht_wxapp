// comment.js

//获取应用实例
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    taleinfo: null,
    commentinfo: null,
    placeholder: "点击输入评论",
    buttonDisable: true,
    commented_uid: 0,
    input_value: '',
    comment_id: '',
    focus: false,
    likenum: 0,
    collecticon: '../../images/icon/star2.png',
    formid: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var tale_id = options.tale_id
    this.setData({
      commented_uid: options.uid
    })
    app.getLocationInfo(function (userLocation) {
      that.getTaleInfo(tale_id, userLocation.longitude, userLocation.latitude)
      that.getComment(tale_id, userLocation.longitude, userLocation.latitude)
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

  getTaleInfo: function (tale_id, longitude, latitude) {
    var that = this
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/tale/taleinfo',
      method: 'POST',
      data: {
        tale_id: tale_id,
        longitude: longitude,
        latitude: latitude
      },
      success: function (res) {
        console.log(res)
        if (res.data.ret == 0) {
          var taleinfo = res.data.data
        } else {
          var taleinfo = null
        }
        that.setData({
          taleinfo: taleinfo,
          likenum: taleinfo.like_num
        })
      }
    })
  },

  getComment: function (tale_id, longitude, latitude) {
    var that = this
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/comment/commentlist',
      method: 'POST',
      data: {
        tale_id: tale_id,
        longitude: longitude,
        latitude: latitude
      },
      success: function (res) {
        console.log(res)
        if (res.data.ret == 0) {
          var commentinfo = res.data.data
        } else {
          var commentinfo = null
        }
        that.setData({
          commentinfo: commentinfo
        })
      }
    })
  },

  commentInputEvent: function (e) {
    var input_value = e.detail.value
    this.setData({
      input_value: input_value
    })
    if (input_value) {
      this.setData({
        buttonDisable: false
      })
    } else {
      this.setData({
        buttonDisable: true
      })
    }
  },

  createComment: function (is_anon) {
    var that = this
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/comment/createcomment',
      method: 'POST',
      data: {
        uid: wx.getStorageSync('token').uid,
        token: wx.getStorageSync('token').token,
        tale_id: this.data.taleinfo.tale_id,
        content: this.data.input_value,
        comment_id: this.data.comment_id,
        commented_uid: this.data.commented_uid,
        longitude: app.globalData.userLocation.longitude,
        latitude: app.globalData.userLocation.latitude,
        is_anon: is_anon
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.ret == 0) {
          wx.showToast({
            title: '评论成功',
            icon: 'success'
          })
          that.noticeComment()
          app.getLocationInfo(function (userLocation) {
            that.getTaleInfo(that.data.taleinfo.tale_id, userLocation.longitude, userLocation.latitude)
            that.getComment(that.data.taleinfo.tale_id, userLocation.longitude, userLocation.latitude)
          })
          that.clearInput()
        } else {
          wx.showToast({
            title: '出错啦，请稍后重试',
            icon: 'loading'
          })
          that.clearInput()
        }
      }
    })
  },

  reply: function (e) {
    var comment_id = e.currentTarget.dataset.commentid
    var user_name = e.currentTarget.dataset.username
    this.setData({
      comment_id: comment_id,
      placeholder: '回复 ' + user_name + ':',
      focus: true
    })
  },

  clearInput: function () {
    this.setData({
      input_value: '',
      placeholder: '点击输入评论',
      comment_id: '',
      buttonDisable: true,
      focus: false
    })
  },

  inputBlur: function (e) {
    if (this.data.input_value == '') {
      this.clearInput()
    }
  },

  addlike: function (e) {
    var that = this
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/like/createlike',
      method: 'POST',
      data: {
        uid: wx.getStorageSync('token').uid,
        token: wx.getStorageSync('token').token,
        tale_id: this.data.taleinfo.tale_id,
        liked_uid: this.data.taleinfo.uid
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.ret == 0) {
          wx.showToast({
            title: '点赞成功',
            icon: 'success'
          })
          that.setData({
            likenum: res.data.data.like_num
          })
        } else {
          wx.showToast({
            title: '已经点过赞了哦',
            icon: 'loading'
          })
        }
      }
    })
  },

  addcollect: function (e) {
    var that = this
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/collect/createcollect',
      method: 'POST',
      data: {
        uid: wx.getStorageSync('token').uid,
        token: wx.getStorageSync('token').token,
        tale_id: this.data.taleinfo.tale_id
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.ret == 0) {
          wx.showToast({
            title: '收藏成功',
            icon: 'success'
          })
          that.setData({
            collecticon: '../../images/icon/star.png'
          })
        } else {
          wx.showToast({
            title: '你已经收藏过了',
            icon: 'loading'
          })
          that.setData({
            collecticon: '../../images/icon/star.png'
          })
        }
      }
    })
  },

  noticesubmit: function (e) {
    var that = this
    this.setData({
      formid: e.detail.formId
    })
    wx.showActionSheet({
      itemList: ['正常评论', '匿名评论'],
      success: function (res) {
        var is_anon = res.tapIndex
        if (is_anon >= 0) {
          that.createComment(is_anon)
        }
      }
    })
  },

  //给评论者发模板消息
  noticeComment: function () {
    var that = this
    //发送给评论者
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/notice/noticecomment',
      method: 'POST',
      data: {
        uid: wx.getStorageSync('token').uid,
        token: wx.getStorageSync('token').token,
        form_id: this.data.formid,
        content: this.data.input_value,
        tale_uid:this.data.commented_uid,
        comment_id:this.data.comment_id
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },

  report: function (e) {
    var that = this
    wx.showActionSheet({
      itemList: ['广告', '低俗色情', '违法犯罪', '与事实不符', '就是想举报'],
      success: function (res) {
        console.log(res.tapIndex)
        var tapIndex = res.tapIndex
        if (tapIndex >= 0) {
          wx.request({
            url: 'https://api.chuanhuatong.cc/index/report/createreport',
            method: 'POST',
            data: {
              uid: wx.getStorageSync('token').uid,
              token: wx.getStorageSync('token').token,
              tale_id: that.data.taleinfo.tale_id,
              description: tapIndex
            },
            success: function (res) {
              console.log(res.data)
              if (res.data.ret == -4) {
                wx.showToast({
                  title: '勿重复举报'
                })
              } else {
                wx.showToast({
                  title: '举报成功'
                })
              }
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  }
})