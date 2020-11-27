// miniprogram/pages/searchGoods/searchGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 筛选排序用
    items: [
      {value: 'goods', name: '商品', checked: 'true'},
      {value: 'shops', name: '店铺'},
    ],

    // 搜索类型及下标
    searchType: ['商品', '用户'],
    searchType_index: "0",
    
    // 排序类型及下标
    sortType:['价格最低', '价格最高', '时间最新', '时间最久'],
    sortType_index: "0",

    // 筛选类型及下标
    address: ['全部', '大学城', '五山', '国际', '其他'],
    new:['非全新', '全新', '全部'],   // 商品isNew属性【"0-非全新"，"1-全新"】
    address_index: "0",
    new_index: "2",

    // 用户上次输入内容
    user_input: "",

    // 商品列表
    commodityList: [],

    // 用户列表
    userList: [],
  },
  // 搜索类型选择器改变事件
  typePickerChange: function(e) {
    console.log('搜索类型picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      searchType_index: e.detail.value
    })
  },

  // 排序类型选择器改变事件
  sortPickerChange: function(e) {
    console.log('排序类型picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sortType_index: e.detail.value
    })
  },

  // 筛选类型选择器改变事件
  // 发货地
  addressPickerChange: function(e) {
    console.log('发货地picker发生选择改变，携带值为', e.detail.value)
    this.setData({
      address_index: e.detail.value
    })
  },

  // 新旧程度
  newPickerChange: function(e) {
    console.log('新旧程度picker发生选择改变，携带值为', e.detail.value)
    this.setData({
      new_index: e.detail.value
    })
  },

  // 点击搜索按钮表单提交事件
  formSubmit(e) {
    var input = e.detail.value.searchInput;
    if(input != ""){
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      var that = this;
      var type = this.data.searchType_index;
      wx.request({
        url: 'http://maggiemarket.design:8080/api/home/search',
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: e.detail.value,
        success: function (res) {
          //请求后台数据成功
          if(res.data.errorCode == 0){
            console.log("搜索请求" + res)
            // 搜索商品
            if(type == "0"){
              that.setData({
                commodityList: res.data.commodityList,
              })
            }
            // 搜索卖家
            else{
              that.setData({
                userList: res.data.userList,
              })       
            }
          }
        }
      })
    }
  },
  // 输入框回车提交表单函数
  gotoSearch: function(e) {
    var searchInput = e.detail.value
    if(searchInput != ""){
      console.log('搜索：', searchInput)
      var that = this;
      var type = this.data.searchType_index;

      wx.request({
        url: 'http://maggiemarket.design:8080/api/home/search',
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        data: {
          searchInput: searchInput,
          searchType: that.data.searchType_index,
          sortType: that.data.sortType_index,
        },
        success: function (res) {
          //请求后台数据成功
          if(res.data.errorCode == 0){
            console.log("搜索请求" + res)

            if(type == "0"){
              that.setData({
                commodityList: res.data.commodityList
              })
            }
            else{
              that.setData({
                userList: res.data.userList
              })       
            }
          }
        }
      })
    }
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

  // 跳转至用户详情页面事件
  toUserStore: function(e){
    var sellerId = e.currentTarget.dataset.userid;
    console.log("前往用户详情" + "用户id为" + sellerId)
    wx.navigateTo({
      url: '../../pages/userStore/userStore?sellerId=' + sellerId,
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