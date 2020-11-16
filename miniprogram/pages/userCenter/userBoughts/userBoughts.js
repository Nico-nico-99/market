// miniprogram/pages/userCenter/userBoughts/userBoughts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //搜索栏
    searchInput: '',

    //预订商品列表
    goodsList: [],
  },

  /**
   * 获取输入框内容
   */
  bindSearchInput: function (e) {
    this.searchInput = e.detail.value
  },

  /**
   * 购买记录搜索
   */
  gotoSearch: function(e){
    console.log("购买记录搜索: ", this.searchInput)
  },
  
  /**
   * 进入商品详情页
  */
  toDetails: function(e){
    console.log("前往商品详情" + "商品id为" + id)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../goodsDetails/goodsDetails?id=' + id//给商品详情页传递商品id,
    })
    console.log("----------------------------------商品详情----------------------------------")  
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

    var app = getApp();
    var userId = app.globalData.userId;
    var that = this;
    
    wx.request({
      method: "POST",
      url: 'http://maggiemarket.design:8080/api/userCenter/userBoughts',//获取商品列表
      data: {
        userId: userId,
      },
      header: {
        'content-type': 'application/json'//要根据后端信息进行修改
      },
      success: function (res) {
        console.log('成功从后端获取购买记录商品列表');
        console.log(res)

        that.setData({
          goodsList: res.data.goodsList,
        })
      },
      fail: function(error){
        console.log("获取购买记录商品列表失败！");
      },
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