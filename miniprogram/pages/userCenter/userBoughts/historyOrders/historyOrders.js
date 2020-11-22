// miniprogram/pages/userCenter/userBoughts/historyOrders/historyOrders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //商品id
    id: "",

    //商品详情
    commodityInfo: [],

    //订单列表
    timeOfReserve: "2020-11-11 11:30:00",
    timeOfTransaction: "2020-11-11 14:00:00",
    orderId: 1,
  },

  /**
     * 进入商品详情页
    */
  toDetails: function(e){
    var id = e.currentTarget.dataset.cmid;
    console.log("前往商品详情" + "商品id为" + id)

    wx.navigateTo({
      url: '../../../goodsDetails/goodsDetails?id=' + id//给商品详情页传递商品id,
    })
    console.log("----------------------------------商品详情----------------------------------")  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    that.setData({
      id: options.id,
      timeOfTransaction: options.timeOfTransaction,
      orderId: options.orderId,
      timeOfReserve: options.timeOfReserve,
    })

    console.log("timeOfReserve: " + that.data.timeOfReserve)

    this.getCommodityDetail()
  },

  /**
   * 获取商品详情
   */
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
        userId: getApp().globalData.userId
      },
      //请求后台数据成功
      success: function (res) {
        console.log('---------------------------------------------------------------------')
        console.log("商品详情请求成功")
        console.log(res)
        console.log('---------------------------------------------------------------------')

        that.setData({
          commodityInfo: res.data.commodityInfo,
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