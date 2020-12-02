// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图对象列表
    swiperList: [
      {
        img_id: 1,
        img_src: "http://119.29.33.219:8081/picture/images/pic1.png",
      },
      {
        img_id: 2,
        img_src: "http://119.29.33.219:8081/picture/images/pic4.png",
      },
      {
        img_id: 3,
        img_src: "http://119.29.33.219:8081/picture/images/pic2.jpg",
      },
      {
        img_id: 4,
        img_src: "http://119.29.33.219:8081/picture/images/pic3.jpg",
      }
    ],
    // 商品分类筛选标记
    classify_index: 0,
    // 推荐商品列表、
    commodityList: [],
  },

    /**
   * 轮播图的点击预览大图
   */
  handlePreviewImage: function(e){
    var urls = new Array();
    for (var i = 0; i < this.data.swiperList.length; i++) {
      urls[i] = this.data.swiperList[i].img_src;
    }
    const current = e.currentTarget.dataset.url
    console.log(current)

    wx.previewImage({
      urls: urls,
      current: current
    })
  },

  // 分类icon事件
  classify: function(e){
    var classify = e.currentTarget.dataset.classify;
    this.setData({
      classify_index: classify,
    })
    console.log(`筛选商品分类为${classify}`)
  },

  // 跳转至商品详情页面事件
  toDetails: function(e){
    var id = e.currentTarget.dataset.cmid;
    console.log("前往商品详情" + "商品id为" + id)
    wx.navigateTo({
      url: '../../pages/goodsDetails/goodsDetails?id=' + id,
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
    this.getCommodityList()
  },
  getCommodityList() {
    var that = this;
    wx.request({
      url: 'http://maggiemarket.design:8080/api/home/recommend',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        //请求后台数据成功
        if(res.data.errorCode == 0){
          console.log("推荐商品列表请求成功" + res)        
          that.setData({
            commodityList: res.data.commodityList
          })
        }
      }
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