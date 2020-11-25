// pages/goodsDetails/goodsDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户id
    userId : -1,
    // 商品id
    id: -1,
    // 商品详情信息
    commodity: {},
    // 商品图片列表
    urlList: [],
    // 商品联系方式
    contactInfo: "",  
    // 商品收藏状态
    collected: true,
    // 商品状态
    state: -1,  
    commodity:{},
    urlList:[]
  },

    /**
   * 轮播图的点击预览大图
   */
  handlePreviewImage: function(e){
    var urls = new Array();
    for (var i = 0; i < this.data.urlList.length; i++) {
      urls[i] = this.data.urlList[i].urlSrc;
    }
    const current = e.currentTarget.dataset.url
    console.log(current)

    wx.previewImage({
      urls: urls,
      current: current
    })
  },

  /* 审核通过按钮事件 */
  approve: function(e){
    console.log("审核通过该商品，商品id为：" + this.data.id)
    var that = this;

    wx.showLoading({
      title: '审核中',
    })

    wx.request({
      url: 'http://maggiemarket.design:8080/api/admin/changeState',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data:{
        cmId: this.data.id,
        toState: 2,
      },
      //请求后台数据成功
      success: function (res) {
        console.log(res)
        console.log("审核通过商品请求" + res.data.errorCode)

        wx.hideLoading()
        wx.showToast({
          title: '审核成功',
          icon: 'none'
        })

        //返回主页
        wx.navigateTo({
          url: '../adminCenter/adminCenter',
        })    
      },
      fail: function(error) {
        wx.hideLoading()
        wx.showToast({
          title: '审核失败，请重新审核',
          icon: 'none'
        })
      }
    })
  },

  /* 下架按钮事件 */
  reject: function(e){
    console.log("下架该商品，商品id为：" + this.data.id)
    var that = this;
    wx.showLoading({
      title: '审核中',
    })

    wx.request({
      url: 'http://maggiemarket.design:8080/api/admin/changeState',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data:{
        cmId: this.data.id,
        toState: 3,
      },
      //请求后台数据成功
      success: function (res) {
        console.log(res)
        console.log("审核下架商品请求" + res.data.errorCode)
        wx.hideLoading()
        wx.showToast({
          title: '审核成功',
          icon: 'none'
        })

        //返回主页
        wx.navigateTo({
          url: '../adminCenter/adminCenter',
        })    
      },
      fail: function(error) {
        wx.hideLoading()
        wx.showToast({
          title: '审核失败，请重新审核',
          icon: 'none'
        })
      }
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
    var id = options.id

    this.setData({
      id: id
    })

    this.getCommodityDetail()
  },
  /* 获取商品详情 */
  getCommodityDetail() {
    var that = this;
    wx.request({
      url: 'http://maggiemarket.design:8080/api/commodity/information',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data:{
        cmId: this.data.id,
        userId: this.data.userId
      },
      //请求后台数据成功
      success: function (res) {
        console.log("商品详情请求成功" + res)
        that.setData({
          commodity: res.data.commodityInfo,
          urlList: res.data.urlList,
          contactInfo: res.data.contactInfo,
        })
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