// pages/goodsDetails/goodsDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "id": -1,
    "good":{
      "cmId": 2,
      "name": "非全新-校园网",
      "details": "不知道给你说啥，买它！",
      "price": 25,
      "userId": 1,
      "address": 1,
      "pictureUrls":[
        "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2148463798,4021744086&fm=26&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1545201677,662987570&fm=26&gp=0.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3629566549,2332772027&fm=26&gp=0.jpg"
      ],
      "date": "2020-11-11 00:59:59",
      "isNew": 0,
      "state": 0,
      "classify": 3,
      "contactInformation": 123456789,
      "urlList":[
        {
          "urlSrc":  "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2148463798,4021744086&fm=26&gp=0.jpg",
          "urlId": 0
        },
        {
          "urlSrc": "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1545201677,662987570&fm=26&gp=0.jpg",
          "urlId": 1
        },
        {
          "urlSrc":  "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3629566549,2332772027&fm=26&gp=0.jpg",
          "urlId": 2
        }
      ]
    },
  },

  /* 审核通过按钮事件 */
  approve: function(e){
    console.log("审核通过该商品，商品id为：" + this.data.id)
  },

  /* 下架按钮事件 */
  reject: function(e){
    console.log("下架该商品，商品id为：" + this.data.id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id

    this.setData({
      id: id
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