// miniprogram/pages/searchGoods/searchGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: ['全部', '大学城', '五山', '国际', '其他'],
    new:['非全新','全新'],
    address_index: 0,
    new_index: 0,

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