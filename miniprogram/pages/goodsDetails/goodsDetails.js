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
    commodity:{},
    urlList:[]
  },

  /* 举报按钮事件 */
  accuse: function(e){
    console.log("举报该商品，商品id为：" + this.data.id)
    var that = this;
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
  },

  /* 收藏按钮事件 */
  collect: function(e){
    console.log("收藏该商品，商品id为：" + this.data.id)
    var that = this;
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
  },
  recollect: function(e){
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
        console.log("预订商品请求" + res.data.errorCode)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id
    var app = getApp();
    var userId = app.globalData.userId;
    this.setData({
      id: id,
      userId: userId
    })
    console.log("userId" + userId)
    this.getCommodityDetail()
  },

  /* 获取商品详情 */
  getCommodityDetail() {
    var that = this;
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
      //请求后台数据成功
      success: function (res) {
        console.log("商品详情请求成功" + res)
        that.setData({
          commodity: res.data.commodityInfo,
          urlList: res.data.urlList,
          contactInfo: res.data.contactInfo,
          collected: res.data.collected
        })
      }
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

  }
})