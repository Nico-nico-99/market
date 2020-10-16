// miniprogram/pages/myStore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods :[]
  
  },
 
  to_addGood: function () {

    wx.navigateTo({
      url: '../addGood/addGood',
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5f897f414dc90c6644515063/example/getGood',
      header: {
        'content-type': 'application/json'
      },
      //请求后台数据成功
      success: function (res) {
        console.log(res)
        //console.log('返回的id' + res.data.message)
        that.setData({
           goods:res.data.goodsList
          //motto: '后台返回code:' + res.data.code + '\n后台返回的message:' + res.data.message
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