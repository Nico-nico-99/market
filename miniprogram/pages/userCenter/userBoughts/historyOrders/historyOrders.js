// miniprogram/pages/userCenter/userBoughts/historyOrders/historyOrders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //商品id
    id: "",

    //商品列表
    goodsList: [
      {
        "cmId": 1,
            "name": "作业",
            "classify": 5,
            "details": "太多了辣",
            "price": 9.9,
            "userId": 1,
            "address": 1,
            "pictureUrls": [
                "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605706438112&di=a012f1730bf8bc206d09a6599ac71bb9&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171028%2F802a1fecb96d4238a559a4a2f34b94f4.jpeg"
            ],
            "date": "2020-11-10 00:59:59",
            "isNew": 1,
            "state": 0
      },
    ],

    //订单列表
    reserveTime: "2020-11-11 11:30:00",
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
    })

    for(item in options.goodsList){
      if(item.cmId == id){
        that.data.goodsList.push(item)
      }
    }
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