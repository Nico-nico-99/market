// pages/userCenter/userCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    userImageUrl: "",

    showModal: false,

    isAdmin: 0,

    hasUserInfo: false,
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
    var that = this
    var app = getApp()

    //关闭弹窗
    this.setData({
      showModal: false,
    })

    if (e.detail.confirm) {
      //看授权功能能否使用
      if(!wx.canIUse('button.open-type.getUserInfo')){
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
          showCancel: false,
        })
      }
      else{
        wx.showLoading({
          title: '登录中',
        })

        //获取临时凭证，以得到openid获取用户信息
        wx.login({
          success: function (res) {
            var code = res.code;//发送给服务器的code
            console.log("code: " + code)
            console.log("res.code: " + res.code)

            var appid = "wxc4eb5a19612df490";//appid
            var secret = "82e99a80db3f4558f68881626417ad75";//app secret

            if(!app.globalData.hasUserInfo){
              if (code) {
                wx.request({
                  method: "POST",
                  url: 'http://maggiemarket.design:8080/api/userCenter/getUserInfo',//获取openid //要根据后端信息进行修改
                  data: {
                    appid: appid,
                    secret: secret,
                    code: code,
                  },
                  header: {
                    'content-type': 'application/json'//要根据后端信息进行修改
                  },
                  success: function (res) {
                    console.log(res)

                    wx.hideLoading();
                    console.log('成功从后端获取到用户信息');

                    /*
                    //授权
                    console.log("允许授权")
                    app.globalData.hasUserInfo = true,//表示已获取用户信息  
                    that.setData({
                      nickName: res.data.nickName,
                      userImageUrl: res.data.userImageUrl,
                    })

                    var app = getApp();
                    app.globalData.userId = res.data.userId;
                    */
                  },
                  fail: function(error){
                    wx.hideLoading();
                    console.log("获取用户登录态失败！");
                  },
                })
              }
              else {
                wx.hideLoading();
                console.log("用户登陆失败");
              }
            }
          },
          fail: function (error) {
            wx.hideLoading();
            console.log('login failed ' + error);
          }
        })        
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
    if(!getApp().globalData.hasUserInfo){
      console.log('当前未登录，无法进入我的收藏')
      wx.showModal({
        title: '提示',
        content: '当前处于未登录状态，无法进入我的收藏页面。',
        showCancel: false,
      })
    }
    else{
      console.log("前往我的收藏")
      wx.navigateTo({
        url: '../../pages/userCenter/userFavors/userFavors',
      })
      console.log("----------------------------------我的收藏----------------------------------")  
    }
  },

  /**
   * 前往我预订的
   */
  toBookings: function(e){
    if(!getApp().globalData.hasUserInfo){
      console.log('当前未登录，无法进入我预订的')
      wx.showModal({
        title: '提示',
        content: '当前处于未登录状态，无法进入我预订的页面。',
        showCancel: false,
      })
    }
    else{
      console.log("前往我预订的")
      wx.navigateTo({
        url: '../../pages/userCenter/userBookings/userBookings',
      })
      console.log("----------------------------------我预订的----------------------------------")
    }
  },

  /**
   * 前往我买到的
   */
  toBoughts: function(e){
    if(!getApp().globalData.hasUserInfo){
      console.log('当前未登录，无法进入我买到的')
      wx.showModal({
        title: '提示',
        content: '当前处于未登录状态，无法进入我买到的页面。',
        showCancel: false,
      })
    }
    else{
      console.log("前往我买到的")
      wx.navigateTo({
        url: '../../pages/userCenter/userBoughts/userBoughts',
      })
      console.log("----------------------------------我买到的----------------------------------")
    }
  },

  /**
   * 前往个人信息
   */
  toUserInfo: function(e){
    if(!getApp().globalData.hasUserInfo){
      console.log('当前未登录，无法进入个人信息')
      wx.showModal({
        title: '提示',
        content: '当前处于未登录状态，无法进入个人信息页面。',
        showCancel: false,
      })
    }
    else{
      console.log("前往个人信息")
      wx.navigateTo({
        url: '../../pages/userCenter/userInfo/userInfo',
      })
      console.log("----------------------------------个人信息---------------------------------")
    }
  },


  /**
   * 前往管理员端
   * 注：后端连接成功后，请将参数isAdmin删除。isAdmin仅供调试。
   */
  toAdmin: function(e){
    if(!getApp().globalData.hasUserInfo){
      console.log('当前未登录，无法进入管理员端')
      wx.showModal({
        title: '提示',
        content: '当前处于未登录状态，无法进入管理员端。',
        showCancel: false,
      })
    }
    else{
      wx.showLoading({
        title: '切换至管理员端中',
      })
      // 检测是否具备管理员资格
      var authority = e.currentTarget.dataset.auth
      /*
      wx.request({
        method: "POST",
        url: 'http://xx.com/api/userCenter/getIsAdmin.html',//获取用户id下的管理员权限 //要根据后端信息进行修改
        data: {
          userId: userId,
        },
        header: {
          'content-type': 'application/json'//要根据后端信息进行修改
        },
        success: function (res) {
          wx.hideLoading();
          console.log('成功从后端获取到用户管理员权限');

          authority = res.data.authority;
        },
        fail: function(error){
          wx.hideLoading();
          console.log("获取用户权限失败！");
        },
      })
      */
      if(authority == '1'){
        this.setData({
          isAdmin: authority,
        })
        console.log("前往管理员端")
        wx.navigateTo({
          url: '../../pages/adminCenter/adminCenter',
        })
        console.log("----------------------------------管理员端---------------------------------")  
      }
      else{
        console.log("本帐号非管理员")  
        wx.showModal({
          title: '提示',
          content: '该账号非管理员，无法获取管理员权限。',
          showCancel: false,
        })
      }
    }
  },


  /**
   * 退出登录
   */
  refreshPageData: function(){
    this.setData({
      nickName: "",
      userImageUrl: "",
      isAdmin: 0,
    })

    var app = getApp()
    app.globalData.userId = ""
    app.globalData.userImageUrl = ""
    app.globalData.hasUserInfo = false
  },

  logout: function(e){
    var app = getApp()
    
    if(app.globalData.hasUserInfo){
      console.log("退出登录")
      wx.showLoading({
        title: '退出登录中',
      })
  
      app.globalData.hasUserInfo = false

      if(!app.globalData.hasUserInfo){
        console.log("成功退出登录")

        //成功退出登陆后
        wx.hideLoading()
        this.refreshPageData()
        this.onShow()  
      }
      else{
        console.log("退出登录失败")
      }  
    }
    else{
      console.log('当前未登录，无法退出登录')
      wx.showModal({
        title: '提示',
        content: '当前处于未登录状态，无法退出登录。',
        showCancel: false,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad()")
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
    console.log("onShow()")

    var app = getApp()

    this.setData({
      hasUserInfo: app.globalData.hasUserInfo,
    })
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