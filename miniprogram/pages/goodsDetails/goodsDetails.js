// pages/goodsDetails/goodsDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "id": -1,
    "good":{
      "cm_id": 25,
      "picture_url_List": [{
        "pic_id": 1,
        "pic_url": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603098830639&di=b44a9d7c9a96fa8446df941aeeea0fba&imgtype=0&src=http%3A%2F%2Fimg.book118.com%2Fsr1%2FM00%2F29%2F3D%2FwKh2AlvnQSiIR2BKABBsKNt0issAAQZFwBMTpgAEGxA391.png",
      },
      {
        "pic_id": 2,
        "pic_url": "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=656939494,2395229563&fm=26&gp=0.jpg",
      },
      {
        "pic_id": 3,
        "pic_url": "http://img.dahepiao.com/uploads/allimg/191204/104Z4GB-0.jpg",
      }
    ],
      "pictureUrls": [
        "https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=false&word=%E5%A6%AE%E5%8F%AF&step_word=&hs=2&pn=1&spn=0&di=92730&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=1361732430%2C212114839&os=206663853%2C4243924515&simid=4137785648%2C696703788&adpicid=0&lpn=0&ln=30&fr=&fmq=1605023633041_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=star&bdtype=0&oriquery=&objurl=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201604%2F28%2F20160428231658_c8QST.jpeg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B17tpwg2_z%26e3Bv54AzdH3Fks52AzdH3F%3Ft1%3Dcm00c0c9c&gsm=2&rpstart=0&rpnum=0&islist=&querylist=&force=undefined",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605033741380&di=2496711efe5e9aeebe46107f09b519d7&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2F1db758ee3d6d55fb57da4c466b224f4a20a4dd56.jpg",
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2151637998,88685684&fm=26&gp=0.jpg"
      ],
      "name": "线性代数",
      "price": 25.00,
      "address": 1,
      "is_new": 1,
      "classify": 1,
      "contact_information":"12345678912",
      "details":"线性代数是数学的一个分支，它的研究对象是向量，向量空间（或称线性空间），线性变换和有限维的线性方程组。向量空间是现代数学的一个重要课题；因而，线性代数被广泛地应用于抽象代数和泛函分析中；通过解析几何，线性代数得以被具体表示。线性代数的理论已被泛化为算子理论。由于科学研究中的非线性模型通常可以被近似为线性模型，使得线性代数被广泛地应用于自然科学和社会科学中。"
    },
  },

  /* 收藏按钮事件 */
  collect: function(e){
    console.log("收藏该商品，商品id为：" + this.data.id)
  },

  /* 预订按钮事件 */
  reserve: function(e){
    console.log("预订该商品，商品id为：" + this.data.good.cm_id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id

    this.setData({
      id: id
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