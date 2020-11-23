// miniprogram/pages/myStore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodityList: [],
    hasUserInfo:false
  },

  to_addGood: function () {//跳转到发布商品页面
    wx.navigateTo({
      url: '../addGood/addGood',
    })
  },

  toDetailsTap: function (e) {//点击某个商品框，实现页面跳转，到商品详情页
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '../goodsDetails-Seller/goodsDetails-Seller?cmId=' + e.currentTarget.dataset.id//给商品详情页传递商品id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp()
    var hasUserInfo = app.globalData.hasUserInfo
    console.log(hasUserInfo)
    this.setData({
      hasUserInfo: hasUserInfo
    })
    if (this.data.hasUserInfo){
    this.getGoodsList()
    }
  },

  getGoodsList() {
    var app = getApp()
    var userId = app.globalData.userId
    var that = this;
    wx.request({
      url: 'http://maggiemarket.design:8080/api/myStore/getMyGoods',
      header: {
        'content-type': 'application/json'
      },
      method:'POST',
      data:{
        userId: userId
      },
      //请求后台数据成功
      success: function (res) {
        console.log(res)
        that.setData({
          commodityList: res.data.commodityList
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
    var app = getApp()
    var hasUserInfo = app.globalData.hasUserInfo
    console.log(hasUserInfo)
    this.setData({
      hasUserInfo: hasUserInfo
    })
    if (this.data.hasUserInfo) {
      this.getGoodsList()
    }
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
    //重新获取列表
    var app = getApp()
    var hasUserInfo = app.globalData.hasUserInfo
    console.log(hasUserInfo)
    this.setData({
      hasUserInfo: hasUserInfo
    })
    if (this.data.hasUserInfo) {
      this.getGoodsList()
    }
    
    wx.hideNavigationBarLoading()//完成停止加载
    wx.stopPullDownRefresh()//停止下拉刷新
    

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