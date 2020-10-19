// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图对象列表
    swiperList:[
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
        img_src:"http://img.dahepiao.com/uploads/allimg/191204/104Z4GB-0.jpg",
      }
    ],

    // 推荐商品列表
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