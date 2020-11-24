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
        img_src: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=656939494,2395229563&fm=26&gp=0.jpg",
      },
      {
        img_id: 3,
        img_src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&   sec=1601404782400&di=47f1cb31a08bffa14c3862d28be96890&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180520%2F326eae8b6b8c4b189c10e15e7fc5f41b.jpeg",
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
    this.getCommodityList()
  },

  getCommodityList() {
    var that = this;
    wx.request({
      url: 'http://maggiemarket.design:8080/api/home/recommend',
      header: {
        'content-type': 'application/json'
      },
      //请求后台数据成功
      success: function (res) {
        console.log("推荐商品列表请求成功")
        console.log(res)
        
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