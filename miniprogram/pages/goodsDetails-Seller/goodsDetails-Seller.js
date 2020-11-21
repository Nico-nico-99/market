// pages/goodsDetails/goodsDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cmId: -1,//商品id
    picture_url_List: [],//urlId: 0  urlSrc:.....
    commodityInfo:{},
    contactInfo:""

  },

  /* 修改商品按钮事件 */
  modify: function (e) {
    var commodityInfo = JSON.stringify(this.data.commodityInfo);//将对象信息变成字符串传递
    //跳转到商品修改页面，直接将请求到的商品信息传递到下一个页面
    wx.navigateTo({
      //encodeURIComponent避免参数被url截断，在接收方要decode
      url: '../modifyGood/modifyGood?good=' + encodeURIComponent(commodityInfo)//给商品详情页传递商品id
    })
    
  },

  /* 下架按钮事件 */
  reject: function (e) {
    //var that=this
    var cmIdNum = parseInt(this.data.cmId)
    //console.log(typeof (this.data.cmId))
    console.log("下架该商品，商品id为：" + this.data.cmId)
    wx.request({
      url: 'http://maggiemarket.design:8080/api/myStore/withdraw',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        cmId: cmIdNum,
        userId: 1
      },
      //请求后台数据成功
      success: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//在这里根据id请求相关数据用于展示，并赋值id到页面的变量id
    var id = options.cmId
    console.log(id)
    this.setData({
      cmId: id
    })
    //请求详情数据
    this.getCertainComInfo()
  },

  getCertainComInfo:function(){
    var that=this
    wx.request({
      url: 'http://maggiemarket.design:8080/api/commodity/information',
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      data: {
        cmId: this.data.cmId,
        userId:1
      },
      //请求后台数据成功
      success: function (res) {
        that.setData({
          picture_url_List:res.data.urlList,
          commodityInfo: res.data.commodityInfo,
          contactInfo: res.data.contactInfo
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