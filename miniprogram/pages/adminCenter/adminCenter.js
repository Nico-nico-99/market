// miniprogram/pages/adminCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前选项卡内容
    currentTabIndex:0,

    //收藏商品列表
    goodsList: [],
  },

  /**
   * 选项卡选择
   */
  onTabsItemTap:function(event){
    let index=event.currentTarget.dataset.index;
    this.setData({
      currentTabIndex:index
    })
  },

  // 跳转至商品详情页面事件
  toDetails: function(e){
    var id = e.currentTarget.dataset.cmid;
    console.log("前往商品详情" + "商品id为" + id)
    wx.navigateTo({
      url: '../../pages/goodsDetails-Admin/goodsDetails-Admin?id=' + id,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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