// pages/addGood/addGood.js
Page({

  data: {

    name: " ",
    details: " ",
    price: 0,
    is_new: 0,
    classify: 0,
    address: 0,
    picture_url1: "",
    picture_url2: "",
    picture_url3: "",
    imgs: [],
    imgsUrl: [],//用于在图片上传是暂时保存图片在服务器上的路径
    items: [
      { name: 'True', value: 1 },
      { name: 'False', value: 0, checked: 'true' },

    ],
    selectArrayClassify: [],
    selectArrayAddress: []
    //  selectArrayClassify: [{该数组需要是这种类型，index是实际存在数据库里面的值，并且最终会存到classify里面
    //   index: 0,
    //   text: "红色"
    // }, {
    //   index: 1,
    //   text: "紫色"
    // }, {
    //   index: 2,
    //   text: "绿色"
    // }]

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
    if (imgs.length >= 3) {//如果当前图片数组已经等于三，就不能再选择
      wx.showModal({
        title: '提示',
        content: '最多只能上传三张图片',
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
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        if (tempFilePaths.length + imgs.length > 3) {//如果当前选择的和之前选择的图片相加大于三个
          wx.showModal({
            title: '提示',
            content: '最多只能上传三张图片',
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
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    imgsUrl.splice(index, 1);
    this.setData({
      imgs: imgs
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

  upload: function (e) {//点击发布商品按钮
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
        picture_url1: this.data.picture_url1,
        picture_url2: this.data.picture_url2,
        picture_url3: this.data.picture_url3,
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selectArrayClassify: [{
        index: 0,
        text: "红色"
      }, {
        index: 1,
        text: "紫色"
      }, {
        index: 2,
        text: "绿色"
      }]
    })


  },

  getClassificationList() {
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
          selectArrayClassify: ['红色', '绿色', '紫色', '黑色']
        })
      }
    })
  },

  getClassificationList() {
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
          selectArrayClassify: res.data.goodsList
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