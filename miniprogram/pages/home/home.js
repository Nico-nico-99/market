// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图对象列表
    swiperList: [
      {
        img_id: 1,
        img_src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&   sec=1601404782400&di=47f1cb31a08bffa14c3862d28be96890&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180520%2F326eae8b6b8c4b189c10e15e7fc5f41b.jpeg",
      },
      {
        img_id: 2,
        img_src: "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=656939494,2395229563&fm=26&gp=0.jpg",
      },
      {
        img_id: 3,
        img_src: "http://img.dahepiao.com/uploads/allimg/191204/104Z4GB-0.jpg",
      }
    ],
    // 商品分类筛选标记
    classify_index: 0,
    // 推荐商品列表
    goods: [
      {
        "cm_id": 25,
        "picture_url1": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603098830639&di=b44a9d7c9a96fa8446df941aeeea0fba&imgtype=0&src=http%3A%2F%2Fimg.book118.com%2Fsr1%2FM00%2F29%2F3D%2FwKh2AlvnQSiIR2BKABBsKNt0issAAQZFwBMTpgAEGxA391.png",
        "name": "全新-电子产品",
        "price": 25,
        "address": 1,
        "is_new": 1,
        "classify": 1
      },
      {
        "cm_id": 26,
        "picture_url1": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603099709041&di=cbfa63df06fb032abf3fb9074f180000&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201807%2F02%2F20180702073005_nqjxx.jpg",
        "name": "非全新-讲座票",
        "price": 25,
        "address": 2,
        "is_new": 0,
        "classify": 2
      }
    ],
  },

  /* 分类icon事件*/
  classifyAll: function(e){
    this.setData({
      classify_index: 0,
    })
    console.log("筛选商品分类为全部，筛选标识为" + this.data.classify_index)
  },
  classify1: function(e){
    this.setData({
      classify_index: 1,
    })
    console.log("筛选商品分类为电子产品，筛选标识为" + this.data.classify_index)
  },
  classify2: function(e){
    this.setData({
      classify_index: 2,
    })
    console.log("筛选商品分类为讲座票" + "筛选标识为" + this.data.classify_index)
  },
  classify3: function(e){
    this.setData({
      classify_index: 3,
    })
    console.log("筛选商品分类为校园网" + "筛选标识为" + this.data.classify_index)
  },
  classify4: function(e){
    this.setData({
      classify_index: 4,
    })
    console.log("筛选商品分类为日用品" + "筛选标识为" + this.data.classify_index)
  },
  classify5: function(e){
    this.setData({
      classify_index: 5,
    })
    console.log("筛选商品分类为书籍" + "筛选标识为" + this.data.classify_index)
  },
  classify6: function(e){
    this.setData({
      classify_index: 6,
    })
    console.log("筛选商品分类为文具" + "筛选标识为" + this.data.classify_index)
  },
  classify7: function(e){
    this.setData({
      classify_index: 7,
    })
    console.log("筛选商品分类为美妆" + "筛选标识为" + this.data.classify_index)
  },
  classify8: function(e){
    this.setData({
      classify_index: 8,
    })
    console.log("筛选商品分类为零食" + "筛选标识为" + this.data.classify_index)
  },
  classify9: function(e){
    this.setData({
      classify_index: 9,
    })
    console.log("筛选商品分类为其他" + "筛选标识为" + this.data.classify_index)
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getGoodsList()
  },

  getGoodsList() {
    var that = this;
    wx.request({
      url: 'https://www.easy-mock.com/mock/5f897f414dc90c6644515063/example/getGood',
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