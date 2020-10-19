// pages/userCenter/userCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: {},
    showModal: false,
  },

  /**
   * 弹窗确定是否授权
   */
  //弹窗
  mpDialog: function(e){
    this.setData({
      showModal: true,
    })
  },
  //准备授权
  onComplete: function (e) {
    //关闭弹窗
    this.setData({
      showModal: false,
    })

    if (e.detail.confirm) {
      //看授权功能能否使用
      if(!wx.canIUse('button.open-type.getUserInfo')){
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
      else{
        //授权
        console.log("允许授权")
        this.setData({
          userInfo: e.detail.userInfo,//获取用户信息
          hasUserInfo: true,//表示已获取用户信息  
        })

        /*
        //获取临时凭证以得到openid
        wx.login({
          success (res) {
            if (res.code) {
              //发起网络请求
              wx.request({
                url: 'https://test.com/onLogin',//服务器接口地址
                data: {
                  code: res.code
                }
              })
              console.log(code)
            } 
            else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        })
        */
      }
    }
    else {
      console.log("拒绝授权")
      wx.showToast({
        title: '您拒绝了授权',
        icon: 'none'
      })
    }
  },

  /**
   * 前往我的收藏
   */
  toFavors: function(e){
    console.log("前往我的收藏")
    wx.navigateTo({
      url: '../../pages/userCenter/userFavors/userFavors',
    })
    console.log("----------------------------------我的收藏----------------------------------")
  },

  /**
   * 前往我预订的
   */
  toBookings: function(e){
    console.log("前往我预订的")
    wx.navigateTo({
      url: '../../pages/userCenter/userBookings/userBookings',
    })
    console.log("----------------------------------我预订的----------------------------------")
  },

  /**
   * 前往我买到的
   */
  toBoughts: function(e){
    console.log("前往我买到的")
    wx.navigateTo({
      url: '../../pages/userCenter/userBoughts/userBoughts',
    })
    console.log("----------------------------------我买到的----------------------------------")
  },

  /**
   * 前往个人信息
   */
  toUserInfo: function(e){
    console.log("前往个人信息")
    wx.navigateTo({
      url: '../../pages/userCenter/userInfo/userInfo',
    })
    console.log("----------------------------------个人信息---------------------------------")
  },


  /**
   * 退出登录
   */
  logout: function(e){
    console.log("退出登录")
    wx.showLoading({
      title: '退出登录中',
    })
    
    /*
    //成功退出登陆后
    wx.hideLoading()
    */
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

  }
})