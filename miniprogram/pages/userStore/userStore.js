// pages/userStore/userStore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 卖家id
    sellerId: -1,
    // 卖家商品列表
    commodityList: [],
    // 筛选类型及下标
    address: ['全部', '大学城', '五山', '国际', '其他'],
    new:['全部', '非全新', '全新'],
    address_index: "0",
    new_index: "0",
  },

  // 发货地选择器改变事件
  addressPickerChange: function(e) {
    console.log('发货地picker发生选择改变，携带值为', e.detail.value)
    this.setData({
      address_index: e.detail.value
    })
  },

  // 新旧程度选择器改变事件
  newPickerChange: function(e) {
    console.log('新旧程度picker发生选择改变，携带值为', e.detail.value)
    this.setData({
      new_index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sellerId = options.sellerId
    this.setData({
      sellerId: sellerId
    })
    console.log("此页面的卖家Id为" + sellerId)
    this.getSellerCommodityList()
  },

  /* 获取卖家商品列表 */
  getSellerCommodityList() {
    var that = this;
    wx.request({
      url: 'http://maggiemarket.design:8080/api/myStore/getMyGoods',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data:{
        userId: this.data.sellerId
      },
      //请求后台数据成功
      success: function (res) {
        console.log("商品详情请求成功" + res)
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
    this.onLoad()

    wx.hideNavigationBarLoading() //完成停止加载
    wx.stopPullDownRefresh() //停止下拉刷新
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