// new.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 1,
    checked: false,
    anon: 0,
    type: 1,
    img: '',
    hidden: true,
    disabled: true,
    text: '',
    addhidden: false,
    subtracthidden: true,
    input_value: '',
    loading: false,
    gonggao: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onload()
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

  newform: function (e) {
    var formid = e.detail.formId
    if (formid) {
      var form_id = formid
    } else {
      var form_id = 1
    }
    this.talesubmit(form_id)
  },

  addimg: function (e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var outthis = that
        var tempFilePaths = res.tempFilePaths
        that.setData({
          img: tempFilePaths[0],
          hidden: false,
          type: 2,
          addhidden: true,
          subtracthidden: false
        })
      },
    })
  },

  subtractimg: function (e) {
    this.setData({
      img: '',
      hidden: true,
      type: 1,
      addhidden: false,
      subtracthidden: true
    })
  },

  textinput: function (e) {
    var text = e.detail.value
    if (text) {
      this.setData({
        disabled: false,
        text: text,
        input_value: text
      })
    } else {
      this.setData({
        disabled: true,
        text: '',
        input_value: ''
      })
    }
  },

  talesubmit: function (formid) {
    var that = this
    this.setData({
      loading: true
    })
    if (this.data.type == 2) {
      wx.uploadFile({
        url: 'https://api.chuanhuatong.cc/index/tale/upload_img',
        filePath: this.data.img,
        name: 'image',
        formData: {
          uid: wx.getStorageSync('token').uid,
          token: wx.getStorageSync('token').token
        },
        success: function (res) {
          var res_data = JSON.parse(res.data)
          if (res_data.ret == 0) {
            var image_url = res_data.data.image_url
            that.taleSubmit(formid, image_url)
          } else {
            wx.showToast({
              title: '出错啦，稍后重试!',
              icon: 'loading'
            })
            that.setData({
              loading: false
            })
          }
        }
      })
    } else {
      this.taleSubmit(formid)
    }
  },

  taleSubmit: function (formid, img) {
    var that = this
    app.getLocationInfo(function (userLocation) {
      wx.request({
        url: 'https://api.chuanhuatong.cc/index/tale/createtale',
        method: 'POST',
        data: {
          uid: wx.getStorageSync('token').uid,
          token: wx.getStorageSync('token').token,
          longitude: userLocation.longitude,
          latitude: userLocation.latitude,
          description: that.data.text,
          is_anon: that.data.anon,
          type: that.data.type,
          img: img,
          form_id: formid
        },
        success: function (res) {
          if (res.data.ret == 0) {
            wx.showToast({
              title: '发送成功',
              icon: 'success'
            })
            that.setData({
              input_value: '',
              text: '',
              disabled: true
            })
            that.subtractimg()
            wx.reLaunch({
              url: '../../pages/tale/tale',
            })
          } else {
            wx.showToast({
              title: '出错啦，稍后重试！',
              icon: 'loading'
            })
          }
        },
        complete: function () {
          that.setData({
            loading: false
          })
        }
      })
    })
  },

  switchChange: function (e) {
    var value = e.detail.value
    if (value) {
      this.setData({
        anon: 1
      })
    } else {
      this.setData({
        anon: 0
      })
    }
  },

  onload: function () {
    if (wx.getStorageSync('show') == 2) {
      this.setData({
        show: 2
      })
      wx.setNavigationBarTitle({
        title: 'biu一下就发布了'
      })
    } else {
      this.getgonggao()
    }
  },

  getgonggao: function () {
    var that = this
    wx.request({
      url: 'https://api.chuanhuatong.cc/index/index/gonggao',
      method: 'POST',
      data: {},
      success: function (res) {
        that.setData({
          gonggao: res.data
        })
      }
    })
  }

})