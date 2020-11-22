// miniprogram/pages/userCenter/userBookings/userBookings.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //搜索栏
    searchInput: '',

    //预订商品列表
    goodsList: [],
    },

  /**
   * 预订商品搜索
   */
  gotoSearch: function(e){
    this.setData({
      searchInput: e.detail.value
    })

    console.log("预订商品搜索: ", this.data.searchInput)

    var app = getApp()
    var that = this
    var userId = app.globalData.userId

    wx.request({
      method: "POST",
      url: 'http://maggiemarket.design:8080/api/userCenter/userBookings/search',//获取搜索结果
      data: {
        userId: userId,
        search: that.data.searchInput
      },
      header: {
        'content-type': 'application/json'//要根据后端信息进行修改
      },
      success: function (res) {
        console.log('成功从后端获取搜索结果');
        console.log(res)
 
        that.setData({
          goodsList: res.data.commodityList,
        })        
      },
      fail: function(error){
        console.log("获取搜索结果失败！");
      },
    })
  },

  /**
   * 用户确认收货
   */
  payment: function(e){
    console.log("用户确认收货")

    var app = getApp()
    var userId = app.globalData.userId
    var item = e.currentTarget.dataset.item
    var cmId = item.cmId
    var that = this

    console.log(cmId)

    wx.showModal({
      title: '提示',
      content: '您是否确定要确认收货？',
      success: function (res) {
        if (res.confirm) {
          //调用小程序付款接口
          

          //向后端申请付款
          wx.request({
            method: "POST",
            url: 'http://maggiemarket.design:8080/api/userCenter/userBookings/payment',//修改商品属性为“已售出”
            data: {
              userId: userId,
              cmId: cmId,
            },
            header: {
              'content-type': 'application/json'//要根据后端信息进行修改
            },
            success: function (res) {              
              if(res.data.success){
                console.log('---------------------------------------------------------------------')
                console.log('成功确认收货');
                console.log(res)
                console.log('---------------------------------------------------------------------')

                //提示收货成功
                wx.showToast({
                  title: '收货成功',
                  icon: 'none',

                  complete: function(){
                    //返回刷新页面
                    that.onShow()
                  }
                })
              }
              else{
                console.log('---------------------------------------------------------------------')
                console.log("确认收货失败！");
                console.log(res)
                console.log('---------------------------------------------------------------------')

                //提示收货失败
                wx.showToast({
                  title: '收货失败，请重新操作',
                  icon: 'none',        
                  
                  complete: function(){
                    //返回刷新页面
                    that.onShow()
                  }
                })    
              }
            },
            fail: function(error){
              console.log("确认收货失败: " + error);
              //提示收货失败
              wx.showToast({
                title: '收货失败，请重新操作',
                icon: 'none', 
                
                complete: function(){
                  //返回刷新页面
                  that.onShow()
                }
              })    
            },
          })
        }
      }
    })
  },

  /**
   * 用户取消订单
   */
  cancelOrder: function(e){
    console.log("用户取消订单")

    var app = getApp()
    var that = this
    var userId = app.globalData.userId
    var item = e.currentTarget.dataset.item
    var cmId = item.cmId
    console.log(cmId)

    wx.showModal({
      title: '提示',
      content: '取消订单后，该商品将重新进入待售状态。您是否确定要取消该订单？',
      success: function (res) {
        if (res.confirm) {
          //向后端申请取消订单
          wx.request({
            method: "POST",
            url: 'http://maggiemarket.design:8080/api/userCenter/userBookings/cancelOrder',//修改商品属性为“待售”
            data: {
              userId: userId,
              cmId: cmId,
            },
            header: {
              'content-type': 'application/json'//要根据后端信息进行修改
            },
            success: function (res) {
              if(res.data.success){
                console.log('---------------------------------------------------------------------')
                console.log('成功取消订单');
                console.log(res)
                console.log('---------------------------------------------------------------------')

                //提示取消成功
                wx.showToast({
                  title: '订单取消成功',
                  icon: 'none',

                  complete: function(){
                    //返回刷新页面
                    that.onShow()
                  }
                })
              }
              else{
                console.log('---------------------------------------------------------------------')
                console.log("取消订单失败！");
                console.log(res)
                console.log('---------------------------------------------------------------------')

                //提示取消失败
                wx.showToast({
                  title: '订单取消失败，请重新操作',
                  icon: 'none',    
                  
                  complete: function(){
                    //返回刷新页面
                    that.onShow()
                  }
                })    
              }
            },
            fail: function(error){
              console.log("取消订单失败: " + error);
              //提示取消失败
              wx.showToast({
                title: '订单取消失败，请重新操作',
                icon: 'none',        
              
                complete: function(){
                  //返回刷新页面
                  that.onShow()
                }
              })    
            },
          })
        }
      }
    })
  },

  /**
   * 进入商品详情页
  */
  toDetails: function(e){
    var id = e.currentTarget.dataset.id;
    console.log("前往商品详情" + "商品id为" + id)
    
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
      method: "POST",
      url: 'http://maggiemarket.design:8080/api/userCenter/userBookings',//获取商品列表
      data: {
        userId: userId,
      },
      header: {
        'content-type': 'application/json'//要根据后端信息进行修改
      },
      success: function (res) {
        console.log('---------------------------------------------------------------------')
        console.log('成功从后端获取订单商品列表');
        console.log(res)
        console.log('---------------------------------------------------------------------')

        that.setData({
          goodsList: res.data.commodityList,
        })
      },
      fail: function(error){
        console.log("获取订单商品列表失败: " + error);
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
    wx.showNavigationBarLoading() //在标题栏中显示加载

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