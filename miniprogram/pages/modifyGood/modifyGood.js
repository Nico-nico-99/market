// miniprogram/pages/modifyGood/modifyGood.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  //  good:{
  //  }
   //用来保存修改后商品信息的变量
    name: " ",
    details: " ",
    price: 0,
    is_new: 0,
    classify: 0,
    address: 0,
    imgs: [],//图片在本地的路径
    imgsUrl: [],//用于在图片上传是暂时保存图片在服务器上的路径
    items: [
      { name: 'True', value: 1 },
      { name: 'False', value: 0, checked: 'true' },
    ],
    selectArrayClassify: [
      {
      index: 1,
      text: "电子产品"
    }, {
      index: 2,
      text: "讲座票"
    }, {
      index: 3,
      text: "校园网"
    }, {
      index: 4,
      text: "日用品"
    }, {
        index: 5,
        text: "书籍"
    },{
        index: 6,
        text: "文具"
    },{
        index: 7,
        text: "美妆"
    },{
        index: 8,
        text: "零食"
    },{
        index: 9,
        text: "其他"
    }
    ],
    selectArrayAddress: [{
      index: 1,
      text: "大学城"
    }, {
      index: 2,
      text: "五山"
    }, {
      index: 3,
      text: "国际"
    },{
      index: 4,
      text: "其他"
    }],
    //原商品信息
    goodBefore:{
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
        "name": "线性代数",
        "price": 25.00,
        "address": 1,
        "is_new": 1,
        "classify": 1,
        "contact_information": "12345678912",
        "details": "线性代数是数学的一个分支，它的研究对象是向量，向量空间（或称线性空间），线性变换和有限维的线性方程组。向量空间是现代数学的一个重要课题；因而，线性代数被广泛地应用于抽象代数和泛函分析中；通过解析几何，线性代数得以被具体表示。线性代数的理论已被泛化为算子理论。由于科学研究中的非线性模型通常可以被近似为线性模型，使得线性代数被广泛地应用于自然科学和社会科学中。"
      },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从上个页面传递过来的参数，得到商品基本信息
    // var good = JSON.parse(decodeURIComponent(options.good))
    // //console.log(good)
    // this.setData({
    //   goodBefore:good
    // })
    
  },

  comNameInput: function (e) {
    var nametmp = e.detail.value;
    this.setData({
      name: nametmp
    })
  },

  comDetail: function (e) {
    this.setData({
      details: e.detail.value
    })
  },

  comPriceInput: function (e) {
    this.setData({
      price: e.detail.value
    })
  },

  radioChange: function (e) {//是否全新函数
    this.setData({
      is_new: e.detail.value
    })
  },


  selectType: function (e) {//分类下拉框函数
    this.setData({
      classify: e.detail.index
    })
  },

  selectAddress: function (e) {//分类下拉框函数
    this.setData({
      address: e.detail.index
    })
  },


  chooseImg: function (e) {//选择图片上传
    var that = this;
    var imgs = this.data.imgs;//当前已经选择的图片数组
    if (imgs.length >= 9) {//如果当前图片数组已经等于三，就不能再选择
      wx.showModal({
        title: '提示',
        content: '最多只能上传九张图片',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return false;
    }
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;//用户这次选择的图片
        var imgs = that.data.imgs;//用户在触发该函数前已经选好的图片
        if (tempFilePaths.length + imgs.length > 9) {//如果当前选择的和之前选择的图片相加大于三个
          wx.showModal({
            title: '提示',
            content: '最多只能上传九张图片',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
          return false;
        } else {
          for (var i = 0; i < tempFilePaths.length; i++) {
            imgs.push(tempFilePaths[i]);
            //逐个将单张图片上传到服务器，服务器逐个返回图片路径，
            //将返回的路径储存在imgsUrl: []中
            wx.uploadFile({
              url: 'https://www.easy-mock.com/mock/5f897f414dc90c6644515063/example/uploadImg',//
              filePath: tempFilePaths[i],
              name: 'Img',
              header: {
                'Content-Type': 'multipart/form-data'
              },
              formData: {
                'user': 'user'
              },
              success: function (res) {//在这里获取图片在服务器上的url，进一步给数组imgsURL赋值，代码待补充
                console.log(res) //接口返回网络路径
                /**
                 * 待补充
                 * 
                 * 
                 * 
                 */
              },
              fail: function (res) {
                console.log(res);
              }
            })
          }
        }
        //  console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });

  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var imgsUrl = this.data.imgsUrl;
    var index = e.currentTarget.dataset.index;
    //console.log(e)
    imgs.splice(index, 1);
    imgsUrl.splice(index, 1);
    //待补充，在这里要发送http请求，在服务器上删除对应的图片

    this.setData({
      imgs: imgs,
      imgsUrl: imgsUrl
    });
  },
  // 预览图片

  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    console.log(index)
    //所有图片
    var imgs = this.data.imgs;
    if (index <= imgs.length - 1) {
      wx.previewImage({
        //当前显示图片
        current: imgs[index],
        //所有图片
        urls: imgs
      })
    } else {
      console.log("图片不存在")
    }
  },

  modify: function (e) {//点击发布商品按钮
    //在这里带上商品id未参数，请求修改商品信息
    wx.request({
      url: "https://www.easy-mock.com/mock/5f897f414dc90c6644515063/example/uploadImg",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      data: {
        name: this.data.name,
        details: this.data.details,
        price: this.data.price,
        is_new: this.data.is_new,
        classify: this.data.classify,
        address: this.data.address,
        imgsUrl: this.data.imgsUrl
      },
      complete: function (res) {
        console.log(res.data)
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
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