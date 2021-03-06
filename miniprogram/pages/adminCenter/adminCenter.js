// miniprogram/pages/adminCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //当前选项卡内容
    currentTabIndex:0,

    //被举报列表
    accusedList: [],
    //待审核列表
    waitingList: [],
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
    })
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

    var that = this;
    
    //获取待审核商品列表
    wx.request({
      method: "GET",
      url: 'http://maggiemarket.design:8080/api/admin/waiting',//获取待审核商品列表
      data: {
      },
      header: {
        'content-type': 'application/json'//要根据后端信息进行修改
      },
      success: function (res) {
        console.log('---------------------------------------------------------------------')
        console.log(res)
        
        if(res.data.errorCode != 1){
          console.log('成功从后端获取待审核商品列表');
          console.log('---------------------------------------------------------------------')
  
          that.setData({
            waitingList: res.data.commodityList,
          })
  
          console.log(that.data.waitingList)  
        }
        else{
          console.log("获取待审核商品列表失败！");
          console.log('---------------------------------------------------------------------')
        }
      },
      fail: function(error){
        console.log('---------------------------------------------------------------------')
        console.log("获取待审核商品列表失败: ");
        console.log(error)
        console.log('---------------------------------------------------------------------')
      },
    })

    //获取被举报商品列表
    wx.request({
      method: "GET",
      url: 'http://maggiemarket.design:8080/api/admin/accused',//获取被举报商品列表
      data: {
      },
      header: {
        'content-type': 'application/json'//要根据后端信息进行修改
      },
      success: function (res) {
        console.log('---------------------------------------------------------------------')
        console.log(res)
        
        if(res.data.errorCode != 1){
          console.log('成功从后端获取被举报商品列表');
          console.log('---------------------------------------------------------------------')
  
          that.setData({
            accusedList: res.data.commodityList,
          })
  
          console.log(that.data.accusedList)  
        }
        else{
          console.log("获取被举报商品列表失败！");
          console.log('---------------------------------------------------------------------')  
        }
      },
      fail: function(error){
        console.log('---------------------------------------------------------------------')
        console.log("获取被举报商品列表失败: ");
        console.log(error)
        console.log('---------------------------------------------------------------------')
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
    //重新获取列表
    this.onShow()

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