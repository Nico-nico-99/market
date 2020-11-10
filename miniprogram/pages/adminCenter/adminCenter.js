// miniprogram/pages/adminCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前选项卡内容
    currentTabIndex:0,

    //收藏商品列表
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