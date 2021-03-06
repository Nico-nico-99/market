// pages/addGood/addGood.js
Page({

  data: {
    //newCmId:-1,
    isPublish: 0,//判断用户是否发布了一个新的商品，用于辅助图片删除
    classcifyShow: "选择分类",
    addressShow: "选择地址",
    moneyNum: null,
    name: "",
    details: "",
    price: -1,
    is_new: undefined,
    classify: 0,
    address: 0,
    imgs: [],//图片在本地的路径
    pictureUrls: [],//用于在图片上传是暂时保存图片在服务器上的路径

    items: [
      { name: 'True', value: 1 },
      { name: 'False', value: 0},
    ],
    selectArrayClassify: ["请选择分类", "电子产品", "讲座票", "校园网", "日用品", "书籍", "文具", "美妆", "零食", "其他"],
    selectArrayAddress: ["请选择地址", "大学城", "五山", "国际", "其他"]
  },

  /**
   * 
   * 类别选择器
   */
  bindClassifyPickerChange: function (e) {
    var that = this;
    var index = parseInt(e.detail.value)
    this.setData({
      classify: index,
      classcifyShow: that.data.selectArrayClassify[index]
    })

  },

  /**
   * 
   * 地址选择器
   */
  bindAddressPickerChange: function (e) {
    var that = this;
    var index = parseInt(e.detail.value)
    this.setData({
      address: index,
      addressShow: that.data.selectArrayAddress[index]
    })

  },

  /**
   * 
   * 商品名称输入
   */
  comNameInput: function (e) {
    var nametmp = e.detail.value.trim();
    this.setData({
      name: nametmp,
    })
  },

  comDetail: function (e) {
    this.setData({
      details: e.detail.value.trim(),
    })
  },


  /**
   * @method: 双向绑定，实时获取输入框值
   * @params: event形参必须有，返回输入框相关对象
   */
  inputedit: function (event) {
    this.setData({
      price: this.money(event.detail.value),  //money匹配金额输入规则，返回输入值
    });
    return this.data.price
  },
  /**
   * @method: 金额输入限制
   * @params: val接收number值
   */
  money(val) {
    let num = val.toString(); //先转换成字符串类型
    if (num.indexOf('.') == 0) { //第一位就是 .
      num = '0' + num
    }
    num = num.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    num = num.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    num = num.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    num = num.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
    if (num.indexOf(".") < 0 && num != "") {
      num = parseFloat(num);
    }
    return num
  },


  radioChange: function (e) {//是否全新函数
    var num = parseInt(e.detail.value)
    this.setData({
      is_new: num,
    })
   console.log(this.data.is_new)
  },
  chooseImg: function (e) {//选择图片上传
    var that = this;
    var imgs = this.data.imgs;//当前已经选择的图片数组
    var pictureUrls = that.data.pictureUrls
    if (imgs.length >= 9) {//如果当前图片数组已经等于三，就不能再选择
      wx.showModal({
        title: '提示',
        content: '最多只能上传九张图片',
        confirmColor: '#27aff6',
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
            confirmColor: '#27aff6',
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
            // 逐个将单张图片上传到服务器，服务器逐个返回图片路径，
            // 将返回的路径储存在pictureUrls: []中
            wx.uploadFile({
              url: 'http://maggiemarket.design:8080/api/myStore/uploadImg',//
              filePath: tempFilePaths[i],
              name: 'img',
              method: "POST",
              // header: {
              //   'Content-Type': 'multipart/form-data'
              // },
              formData: {
                'userId': 1
              },
              success: function (res) {//在这里获取图片在服务器上的url，进一步给数组imgsURL赋值，代码待补充
                //console.log(res) //接口返回网络路径
                console.log(res.data)
                var dataStr = res.data
                var begin = dataStr.indexOf("u") + 6;
                dataStr = dataStr.slice(begin, -2)
                pictureUrls.push(dataStr);
                console.log(pictureUrls);
                that.setData({
                  imgs: imgs,
                  pictureUrls: pictureUrls
                });
                console.log(that.data.imgs);
                console.log(that.data.pictureUrls);
              },
              fail: function (res) {
                console.log(res);
              }
            })
          }
        }
      }
    });
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var pictureUrls = this.data.pictureUrls;
    var index = e.currentTarget.dataset.index;
    var ImgToDelete = pictureUrls[index];
    //console.log(e)
    imgs.splice(index, 1);
    pictureUrls.splice(index, 1);
    //在这里要发送http请求，在服务器上删除对应的图片
    wx.request({
      url: "http://maggiemarket.design:8080/api/myStore/deleteImgs",
      method: "POST",
      data: {
        url: [ImgToDelete]
      },
      success: function (res) {
        //console.log(res)
      },
      complete: function (res) {
        //console.log(res.data)
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
      }
    })
    this.setData({
      imgs: imgs,
      pictureUrls: pictureUrls
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
    var that = this;
    if (this.data.name == "") {
      wx.showModal({
        title: "温馨提示", // 提示的标题
        content: "商品名不能为空", // 提示的内容
        showCancel: false, // 是否显示取消按钮，默认true
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: '#27aff6', // 确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
        success: function (res) {
          console.log("接口调用成功的回调函数");
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return false;
    } else if (this.data.details == "") {
      wx.showModal({
        title: "温馨提示", // 提示的标题
        content: "商品描述不能为空", // 提示的内容
        showCancel: false, // 是否显示取消按钮，默认true
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: '#27aff6',
        success: function (res) {
          console.log("接口调用成功的回调函数");
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return false;
    } 
    //判断金额填写范围是否合法
    if (this.data.price == -1) {
      wx.showModal({
        title: "温馨提示", // 提示的标题
        content: "请输入商品价格", // 提示的内容
        showCancel: false, // 是否显示取消按钮，默认true
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: '#27aff6',
        success: function (res) {
          console.log("接口调用成功的回调函数");
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return false;
    } else if (this.data.price == 0) {
      wx.showModal({
        title: "温馨提示", // 提示的标题
        content: "请输入大于零的价格", // 提示的内容
        showCancel: false, // 是否显示取消按钮，默认true
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: '#27aff6',
        success: function (res) {
          console.log("接口调用成功的回调函数");
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return false;
    } else if (this.data.price > 50000) {
      wx.showModal({
        title: "温馨提示", // 提示的标题
        content: "请输入小于50000的商品价格", // 提示的内容
        showCancel: false, // 是否显示取消按钮，默认true
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: '#27aff6',
        success: function (res) {
          console.log("接口调用成功的回调函数");
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return false;
    }

    //检验无误后将商品价格转化为字符串
    var priceToFixed = parseFloat(this.data.price).toFixed(2)
    this.setData({
      price: priceToFixed,
    });
    //判断是否输入了完整的信息
    if(this.data.classify==0){

      wx.showModal({
        title: "温馨提示", // 提示的标题
        content: "请选择商品分类", // 提示的内容
        showCancel: false, // 是否显示取消按钮，默认true
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: '#27aff6',
        success: function (res) {
          console.log("接口调用成功的回调函数");
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return false;
    } else if(this.data.address == 0){
      wx.showModal({
        title: "温馨提示", // 提示的标题
        content: "请选择商品发货地址", // 提示的内容
        showCancel: false, // 是否显示取消按钮，默认true
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: '#27aff6',
        success: function (res) {
          console.log("接口调用成功的回调函数");
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return false;
    } else if (!(this.data.pictureUrls.length >0)) {
      
      wx.showModal({
        title: "温馨提示", // 提示的标题
        content: "请选择至少一张图片", // 提示的内容
        showCancel: false, // 是否显示取消按钮，默认true
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: '#27aff6',
        success: function (res) {
          console.log("接口调用成功的回调函数");
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return false;
    } else if(this.data.is_new == undefined){
      wx.showModal({
        title: "温馨提示", // 提示的标题
        content: "请选择商品是否为新", // 提示的内容
        showCancel: false, // 是否显示取消按钮，默认true
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: '#27aff6',
        success: function (res) {
          console.log("接口调用成功的回调函数");
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return false;
    }

    //检查联系方式是否存在
    wx.request({
      method: "POST",
      url: 'http://maggiemarket.design:8080/api/userCenter/userInfo/userInfo',//获取用户信息
      data: {
        userId: getApp().globalData.userId,
      },
      header: {
        'content-type': 'application/json'//要根据后端信息进行修改
      },
      success: function (res) {
        console.log("成功获取卖家联系方式")
        console.log(res)

        if(res.data.contactInfo == undefined || res.data.contactInfo == ""){
          wx.showModal({
            title: '提示',
            content: '您尚未填写联系方式，请前往【个人资料】进行填写。若联系方式为空，商品将无法成功发布。',
            showCancel: false,
            confirmColor: '#27aff6',
            success: function (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../userCenter/userInfo/userInfo',
                })
              }
           },
          })
        }
        else{
          wx.showLoading({
            title: '上传中',
          })
          wx.request({
            url: "http://maggiemarket.design:8080/api/myStore/publish",
            // header: {
            //   "Content-Type": "application/x-www-form-urlencoded"
            // },
            method: "POST",
            data: {
              name: that.data.name,
              classify: that.data.classify,
              details: that.data.details,
              price: that.data.price,
              userId:  parseInt(getApp().globalData.userId),
              address: that.data.address,
              pictureUrls: that.data.pictureUrls,
              isNew: parseInt(that.data.is_new)
            },
            success: function (res) {
              console.log(res)
      
              wx.hideLoading()
              that.data.isPublish = 1;
      
              wx.showToast({
                title: '发布成功',
                icon: 'none',
              })
      
              var timeOut = setTimeout(function () {
                wx.reLaunch({
                  url: '../myStore/myStore',
                })
              }, 1000)
      
            },
            fail: function (res) {
              if (res == null || res == null) {
                console.error('网络请求失败');
                return;
              }
              wx.showModal({
                title: "发布失败", // 提示的标题
                content: "请检查网络", // 提示的内容
                showCancel: false, // 是否显示取消按钮，默认true
                confirmText: "确定", // 确认按钮的文字，最多4个字符
                confirmColor: '#27aff6',
      
              })
            }
          })  
        }
      },
      fail: function(error){
        console.log("获取卖家联系方式失败")
      }
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
    console.log(this.data.isPublish);
    console.log("我卸载啦");
    //删除用户没有发布商品却上传到服务器上的图片
    if (this.data.isPublish == 0) {
      var pictureUrls = this.data.pictureUrls;
      console.log(pictureUrls)
      //在这里要发送http请求，在服务器上删除对应的图片
      wx.request({
        url: "http://maggiemarket.design:8080/api/myStore/deleteImgs",
        method: "POST",
        data: {
          url: pictureUrls
        },
        success: function (res) {
          console.log(res)
        },
      })
    }
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