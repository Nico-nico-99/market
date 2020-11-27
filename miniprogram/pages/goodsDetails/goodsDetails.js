// pages/goodsDetails/goodsDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户id
    userId : -1,
    // 商品id
    id: -1,
    // 商品详情信息
    commodity: {},
    // 商品图片列表
    urlList: [],
    // 商品联系方式
    contactInfo: "",  
    // 商品收藏状态
    collected: true,
    // 商品预订状态
    reserved: false,
    // 商品轮播图信息
    urlList:[]
  },

  /**
   * 轮播图的点击预览大图
   */
  handlePreviewImage: function(e){
    var urls = new Array();
    for (var i = 0; i < this.data.urlList.length; i++) {
      urls[i] = this.data.urlList[i].urlSrc;
    }
    const current = e.currentTarget.dataset.url
    console.log(current)

    wx.previewImage({
      urls: urls,
      current: current
    })
  },

  /* 举报按钮事件 */
  accuse: function(e){
    console.log("举报该商品，商品id为：" + this.data.id)
    if(this.data.userId == -1){
      console.log("未登录")
      wx.showModal({
        title: '提示',
        content: '当前处于未登录状态，无法进行举报。',
        confirmColor: '#27aff6',
        showCancel: false,
      })
    }
    else{
      wx.request({
        url: 'http://maggiemarket.design:8080/api/commodity/accuse',
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data:{
          cmId: this.data.id,
          userId: this.data.userId
        },
        //请求后台数据成功
        success: function (res) {
          console.log("举报商品请求" + res.data.errorCode)
        }
      })
    }
  },

  /* 收藏按钮事件 */
  collect: function(e){
    console.log("收藏该商品，商品id为：" + this.data.id)
    var that = this;
    if(this.data.userId == -1){
      console.log("未登录")
      wx.showModal({
        title: '提示',
        content: '当前处于未登录状态，无法进行收藏。',
        confirmColor: '#27aff6',
        showCancel: false,
      })
    }
    else{
      wx.request({
        url: 'http://maggiemarket.design:8080/api/commodity/collection',
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data:{
          cmId: this.data.id,
          userId: this.data.userId,
        },
        //请求后台数据成功
        success: function (res) {
          console.log("收藏商品请求" + res.data.errorCode)
          that.setData({
            collected: true
          })
        }
      })
    }
  },
  collectCancel: function(e){
    console.log("取消收藏该商品，商品id为：" + this.data.id)
    var that = this;
    wx.request({
      url: 'http://maggiemarket.design:8080/api/commodity/collectionCancel',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data:{
        cmId: this.data.id,
        userId: this.data.userId,
      },
      //请求后台数据成功
      success: function (res) {
        console.log("取消收藏商品请求" + res.data.errorCode)
        that.setData({
          collected: false
        })
      }
    })
  },

  /* 预订按钮事件 */
  reserve: function(e){
    console.log("预订该商品，商品id为：" + this.data.id)
    var that = this;
    if(this.data.userId == -1){
      console.log("未登录")
      wx.showModal({
        title: '提示',
        content: '当前处于未登录状态，无法进行预订。',
        confirmColor: '#27aff6',
        showCancel: false,
      })
    }
    else if(this.data.commodity.state == "4"){
      wx.showModal({
        title: '提示',
        content: '当前商品已被预订，无法再进行预订。',
        confirmColor: '#27aff6',
        showCancel: false,
      })
    }
    else if(this.data.commodity.state == "5"){
      wx.showModal({
        title: '提示',
        content: '当前商品已被购买，无法进行预订。',
        confirmColor: '#27aff6',
        showCancel: false,
      }) 
    }
    else {
      wx.showLoading({
        title: '预订中',
      })
            wx.request({
              url: 'http://maggiemarket.design:8080/api/commodity/reserve',
              header: {
                'content-type': 'application/json'
              },
              method: 'POST',
              data:{
                cmId: this.data.id,
                userId: this.data.userId
              },
              //请求后台数据成功
              success: function (res) {
                wx.hideLoading()
                console.log("预订商品请求" + res.data.errorCode)
                that.setData({
                  reserved: true,
                })

                wx.showModal({
                  title: '提示',
                  content: '预订成功，请尽快联系卖家沟通取货时间。',
                  confirmColor: '#27aff6',
                  showCancel: false,
                }) 
              }
            })
    }
    
  },
  reserveCancel: function(e){
    console.log("取消预订该商品，商品id为：" + this.data.id)
    var that = this;
    wx.request({
      url: 'http://maggiemarket.design:8080/api/commodity/reserveCancel',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data:{
        cmId: this.data.id,
        userId: this.data.userId
      },
      //请求后台数据成功
      success: function (res) {
        console.log("取消预订商品请求" + res.data.errorCode)
        that.setData({
          reserved: false
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var app = getApp();
    var isLogin =  app.globalData.hasUserInfo;
    if(isLogin == true){
      var userId = app.globalData.userId;
    }
    else{
      userId = -1;
    }
    this.setData({
      id: id,
      userId: userId
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
    this.getCommodityDetail()
  },
  /* 获取商品详情 */
  getCommodityDetail() {
    var that = this;
    console.log("请求商品详情，cmId：" + this.data.id)
    console.log("请求商品详情，userId：" + this.data.userId)  
    wx.request({
      url: 'http://maggiemarket.design:8080/api/commodity/information',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data:{
        cmId: this.data.id,
        userId: this.data.userId
      },
      success: function (res) {
        if(res.data.errorCode == 0){
          //请求后台数据成功
          console.log("商品详情请求成功" + res)
          that.setData({
            commodity: res.data.commodityInfo,
            urlList: res.data.urlList,
            contactInfo: res.data.contactInfo,
            collected: res.data.collected
          })
          if(res.data.commodityInfo.state == 4){
            that.setData({
              reserved: true
            })          
          }
        }
      }
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