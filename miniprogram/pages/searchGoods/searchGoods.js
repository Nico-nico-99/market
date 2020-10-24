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