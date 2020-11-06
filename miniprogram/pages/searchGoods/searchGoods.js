// miniprogram/pages/searchGoods/searchGoods.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {value: 'goods', name: '商品', checked: 'true'},
      {value: 'shops', name: '店铺'},
    ],
    searchType: ['商品', '用户'],
    searchType_index: 0,
    sortType:['价格最低', '时间最新'],
    sortType_index: 0,
    address: ['全部', '大学城', '五山', '国际', '其他'],
    new:['非全新', '全新','全部'],
    address_index: 0,
    new_index: 2,

    // 商品列表
    goods: [
      {
        "cm_id": 25,
        "picture_url1": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603098830639&di=b44a9d7c9a96fa8446df941aeeea0fba&imgtype=0&src=http%3A%2F%2Fimg.book118.com%2Fsr1%2FM00%2F29%2F3D%2FwKh2AlvnQSiIR2BKABBsKNt0issAAQZFwBMTpgAEGxA391.png",
        "name": "全新",
        "price": 25,
        "address": 1,
        "is_new": 1
      },
      {
        "cm_id": 26,
        "picture_url1": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603099709041&di=cbfa63df06fb032abf3fb9074f180000&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F02%2F20180702073005_nqjxx.jpg",
        "name": "非全新",
        "price": 25,
        "address": 2,
        "is_new": 0
      }
    ],
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

  // 搜索按钮表单提交事件
  formSubmit(e) {
    if(e.detail.value.searchInput!=""){
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
      this.getGoodsList()
    }
  },

  // 发货地选择器改变事件
  addressPickerChange: function(e) {
    console.log('发货地picker发生选择改变，携带值为', e.detail.value)
    this.setData({
      address_index: e.detail.value
    })
  },

  // 新旧程度选择器改变事件
  newPickerChange: function(e) {
    console.log('新旧程度picker发生选择改变，携带值为', e.detail.value)
    this.setData({
      new_index: e.detail.value
    })
  },

  //跳转至商品详情页面事件
  toDetails: function(e){
    var id = e.currentTarget.dataset.cmid;
    console.log("前往商品详情" + "商品id为" + id)
    wx.navigateTo({
      url: '../../pages/goodsDetails/goodsDetails',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 访问模拟接口获取数据
    // this.getGoodsList()
  },

  getGoodsList() {
    var that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5f966cd934c55d14fda96d74/home/searchGood',
      header: {
        'content-type': 'application/json'
      },
      //请求后台数据成功
      success: function (res) {
        console.log(res)
        that.setData({
          goods: res.data.goodsList
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