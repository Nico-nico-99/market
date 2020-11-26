// pages/goodsDetails/goodsDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cmId: -1,//商品id
    userId:-1,
    picture_url_List: [],//urlId: 0  urlSrc:.....
    commodityInfo:{},
    contactInfo:""

  },

    /**
   * 轮播图的点击预览大图
   */
  handlePreviewImage: function(e){
    var urls = new Array();
    for (var i = 0; i < this.data.picture_url_List.length; i++) {
      urls[i] = this.data.picture_url_List[i].urlSrc;
    }
    const current = e.currentTarget.dataset.url
    console.log(current)

    wx.previewImage({
      urls: urls,
      current: current
    })
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
    var that=this

    if(this.data.commodityInfo.state == "4"){
      wx.showModal({
        title: '提示',
        content: '当前商品已被预订，若需要下架，请尽快联系买家沟通说明。您是否仍要下架？',
        confirmColor: '#27aff6',
        showCancel: false,
        success(res){
          if(res.confirm){
            wx.showLoading({
              title: '下架中',
            })      
            var cmIdNum = parseInt(that.data.cmId)
            //console.log(typeof (this.data.cmId))
            console.log("下架该商品，商品id为：" + that.data.cmId)
            wx.request({
              url: 'http://maggiemarket.design:8080/api/myStore/withdraw',
              header: {
                'content-type': 'application/json'
              },
              method: 'POST',
              data: {
                cmId: cmIdNum,
                userId: that.data.userId
              },
              //请求后台数据成功
              success: function (res) {
                console.log(res)
                wx.hideLoading()
  
                wx.navigateBack({
                  delta: 2
                })
              }
            })  
          }
        }
      }) 
    }
    else{
      wx.showModal({
        title: "温馨提示", // 提示的标题
        content: "您确定要下架该商品吗？", // 提示的内容
        showCancel: true, // 是否显示取消按钮，默认true
        cancelText: "取消", // 取消按钮的文字，最多4个字符
        cancelColor: "#000000", // 取消按钮的文字颜色，必须是16进制格式的颜色字符串
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: '#27aff6',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')

            wx.showLoading({
              title: '下架中',
            })      
            var cmIdNum = parseInt(that.data.cmId)
            //console.log(typeof (this.data.cmId))
            console.log("下架该商品，商品id为：" + that.data.cmId)
            wx.request({
              url: 'http://maggiemarket.design:8080/api/myStore/withdraw',
              header: {
                'content-type': 'application/json'
              },
              method: 'POST',
              data: {
                cmId: cmIdNum,
                userId: that.data.userId
              },
              //请求后台数据成功
              success: function (res) {
                console.log(res)
                wx.hideLoading()

                wx.navigateBack({
                  delta: 2
                })
              }
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {//在这里根据id请求相关数据用于展示，并赋值id到页面的变量id
    var app = getApp()
    var userId = parseInt(app.globalData.userId)
    var id = options.cmId
    console.log(id)
    this.setData({
      cmId: id,
      userId: userId
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
        userId: this.data.userId
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