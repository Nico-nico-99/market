// miniprogram/pages/myStore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: []

  },

  to_addGood: function () {//跳转到发布商品页面
    wx.navigateTo({
      url: '../addGood/addGood',
    })
  },

  toDetailsTap: function (e) {//点击某个商品框，实现页面跳转，到商品详情页
    wx.navigateTo({
      url: '../goodsDetails-Seller/goodsDetails-Seller?cmId=' + e.currentTarget.dataset.id//给商品详情页传递商品id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGoodsList()
  },

  getGoodsList() {
    var that = this;
    wx.request({
      url: 'http://maggiemarket.design:8080/api/myStore/getMyGoods',
      header: {
        'content-type': 'application/json'
      },
      //请求后台数据成功
      success: function (res) {
        console.log(res)
        that.setData({
          //goods: res.data.goodsList
          goods:[{
            cm_id:12,
            pic:"../../images/showExample/书包.jpg",
            name:"书包",
            price:55,
            address:2
          },{
              cm_id: 13,
              pic: "../../images/showExample/表情.jpg",
              name: "线性代数课本",
              price: 15,
              address: 2
            }, {
              cm_id: 19,
              pic: "../../images/showExample/表情.jpg",
              name: "线性代数课本",
              price: 6,
              address: 2
            },
             {
              cm_id: 14,
              pic: "../../images/showExample/计网课本.jpg",
              name: "计网课本",
              price: 15,
              address: 2
            },
            {
              cm_id: 15,
              pic: "../../images/showExample/表情.jpg",
              name: "线性代数课本",
              price: 6,
              address: 2
            }

          ]
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