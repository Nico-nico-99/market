// miniprogram/pages/userCenter/userBoughts/userBoughts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //搜索栏
    searchInput: '',

    //预订商品列表
    goodsList: [
      {
        "cm_id": 25,
        "name": "线性代数",
        "picture_url1": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603098830639&di=b44a9d7c9a96fa8446df941aeeea0fba&imgtype=0&src=http%3A%2F%2Fimg.book118.com%2Fsr1%2FM00%2F29%2F3D%2FwKh2AlvnQSiIR2BKABBsKNt0issAAQZFwBMTpgAEGxA391.png",
        "price": 25.50,
        "address": 1,
        "is_new": 0,
        "classify": 0
      },
      {
        "cm_id": 26,
        "name": "喵喵喵",
        "picture_url1": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603099709041&di=cbfa63df06fb032abf3fb9074f180000&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F02%2F20180702073005_nqjxx.jpg",
        "price": 25.00,
        "address": 2,
        "is_new": 0,
        "classify": 1
      },
      {
        "cm_id": 27,
        "name": "作业爆炸多",
        "picture_url1": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1313956600,1942141254&fm=26&gp=0.jpg",
        "price": 25.00,
        "address": 3,
        "is_new": 1,
        "classify": 2
      }
    ],
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
      url: 'http://xx.com/api/userCenter/userBoughts.html',//获取商品列表
      data: {
        userId: userId,
      },
      header: {
        'content-type': 'application/json'//要根据后端信息进行修改
      },
      success: function (res) {
        console.log('成功从后端获取购买记录商品列表');
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