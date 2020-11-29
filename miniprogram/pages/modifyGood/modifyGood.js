// miniprogram/pages/modifyGood/modifyGood.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId:-1,
    isModify: 0,
   //用来保存修改后商品信息的变量
    classcifyShow: "选择分类",
    classify: 0,
    addressShow: "选择地址",
    address: 0,
    moneyNum: null,
    name: " ",
    details: " ",
    price: -1,
    is_new: 0,
    imgs: [],//图片在本地的路径
    pictureUrls: [],//用于在图片上传是暂时保存图片在服务器上的路径
    items: [
      { name: 'True', value: 1 ,checked:false},
      { name: 'False', value: 0, checked: true},
    ],

    selectArrayClassify: ["请选择分类", "电子产品", "讲座票", "校园网", "日用品", "书籍", "文具", "美妆", "零食", "其他"],
    selectArrayAddress: ["请选择地址", "大学城", "五山", "国际", "其他"],
    //原商品信息
    goodBefore:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从上个页面传递过来的参数，得到商品基本信息
    var app = getApp()
    var userId = parseInt(app.globalData.userId)
    var that=this;
    var good = JSON.parse(decodeURIComponent(options.good))
    console.log(good)
    console.log(this.data.items[0].checked)
    if(good.isNew==1){//商品全新
    
      this.setData({
        items: [
          { name: 'True', value: 1, checked: true },
          { name: 'False', value: 0, checked: false },
        ],
      })
    
    }

    this.setData({
      goodBefore:good,
      userId: userId,
      
    })
    this.setDataToPage()
  },

  /**
   * 原信息赋值
   */
  setDataToPage:function(){
    this.setData({
      name: this.data.goodBefore.name,
      price: this.data.goodBefore.price,
      details: this.data.goodBefore.details,
      is_new: this.data.goodBefore.isNew,
      

      classify: this.data.goodBefore.classify,
      address: this.data.goodBefore.address,
      classcifyShow: this.data.selectArrayClassify[this.data.goodBefore.classify],
      addressShow: this.data.selectArrayAddress[this.data.goodBefore.address],
      //
      imgs:this.data.goodBefore.pictureUrls,//图片在本地的路径,实际上这里包含了一部分线上的路径
      pictureUrls: this.data.goodBefore.pictureUrls,//用于在图片上传是暂时保存图片在服务器上的路径
    })
    console.log("原商品信息赋值到本地,打印imgs 和pictureUrls ");
    console.log(this.data.imgs);
    console.log(this.data.pictureUrls);
  },

  /**
   * 
   * 商品名称输入
   */
  comNameInput: function (e) {
    var nametmp = e.detail.value;
    this.setData({
      name: nametmp
    })
  },

  /**
   * 
   * 商品详情输入
   */
  comDetail: function (e) {
    this.setData({
      details: e.detail.value
    })
  },

  /**
   * @method: 双向绑定，实时获取输入框值
   * @params: event形参必须有，返回输入框相关对象
   */
  inputedit: function (event) {
    this.setData({
      price: this.money(event.detail.value)  //money匹配金额输入规则，返回输入值
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

  /**
   * 
   * 是否全新显示
   */
  radioChange: function (e) {
    //console.log(e.detail.value)
    this.setData({
      is_new: parseInt(e.detail.value)
    })
  },

  /**
   * 
   * 类别选择器
   */
  bindClassifyPickerChange: function (e) {
    this.setData({
      classify: e.detail.value,
      classcifyShow: this.data.selectArrayClassify[e.detail.value]
    })
    this.classify = e.detail.value
  },

  /**
   * 
   * 年级选择器
   */
  bindAddressPickerChange: function (e) {
    this.setData({
      address: e.detail.value,
      addressShow: this.data.selectArrayAddress[e.detail.value]
    })
    this.address = e.detail.value
  },

  chooseImg: function (e) {//选择图片上传
    var that = this;
    var imgs = that.data.imgs;//当前已经选择的图片数组
    var userId=this.data.userId;
    var pictureUrls = that.data.pictureUrls

    console.log("本页面信息赋值到函数内,打印imgs 和pictureUrls ");
    console.log(imgs);
    console.log(pictureUrls);

    console.log("赋值变量到函数内后,打印全局的imgs 和pictureUrls ");
    console.log(that.data.imgs);
    console.log(that.data.pictureUrls);

    if (imgs.length >= 9) {//如果当前图片数组已经等于9，就不能再选择
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
    
    var leftCount = 9 - imgs.length ;
    var tempFilePaths;//用来保存用户本次选择图片的本地路径
    wx.chooseImage({
      count: leftCount,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log("执行success");
        // tempFilePath可以作为img标签的src属性显示图片
        //在这里先赋值
        tempFilePaths = res.tempFilePaths
      },
      complete:function(){
        console.log("打印tempFilePaths ");
        console.log(tempFilePaths==null);
        
        if (tempFilePaths!=null){
          // console.log("打印tempFilePaths");
          // console.log(tempFilePaths);

          for (var i = 0; i < tempFilePaths.length; i++) {
            // console.log("循环进行一次");
            // console.log("打印数组");
            // console.log(tempFilePaths[i]);
            // console.log("局部变量imgs赋值前");
            // console.log(imgs);
            // console.log("局部变量imgs赋值后");
            imgs.push(tempFilePaths[i]);
            ///console.log(imgs);
            //console.log(imgs.length);
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
                'userId': userId
              },
              success: function (res) {//在这里获取图片在服务器上的url，进一步给数组imgsURL赋值，代码待补充
                //console.log(res) //接口返回网络路径
                console.log(res.data)
                var dataStr = res.data
                var begin = dataStr.indexOf("u") + 6;
                dataStr = dataStr.slice(begin, -2)
                pictureUrls.push(dataStr);
                //console.log("局部变量pictureUrls赋值后");
                //console.log(pictureUrls);
                //console.log(that.data.pictureUrls);
                //赋值到该页面的变量
                
                for (var i = 0; i < pictureUrls.length; i++) {
                  var ifTmp = imgs[i].indexOf("tmp");
                  // console.log("函数内页面变量pictureUrls");
                  // console.log(pictureUrls);
                  // console.log("函数内页面变量imgs");
                  // console.log(imgs);
                  // console.log(ifTmp);
                  if (ifTmp != -1) {
                    //imgs.splice(i, 1);
                    pictureUrls.splice(i, 1);
                  }
                }

                // console.log("页面变量pictureUrls");
                // console.log(pictureUrls);
                // console.log("页面变量imgs");
                // console.log(imgs);

                that.setData({
                  imgs: imgs,
                  pictureUrls: pictureUrls
                });
                // console.log("赋值到页面变量全局变量pictureUrls");
                // console.log(that.data.pictureUrls);
                // console.log("全局变量imgs");
                // console.log(that.data.imgs);
              },
              fail: function (res) {
                console.log(res);
              }
            })
            

          }
        }
        else{
          console.log("用户没有选择图片")
        }
      }  
    })
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

  modify: function (e) {//点击发布商品按钮
    var userId=this.data.userId;
    var that=this;
    //在这里带上商品id未参数，请求修改商品信息
    if (this.data.name == "") {
      wx.showModal({
        title: "温馨提示", // 提示的标题
        content: "商品名不能为空", // 提示的内容
        showCancel: false, // 是否显示取消按钮，默认true
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: '#27aff6',
        success: function (res) {
          //console.log("接口调用成功的回调函数");
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
    if (this.data.classify == 0) {

      wx.showModal({
        title: "温馨提示", // 提示的标题
        content: "请选择商品分类", // 提示的内容
        showCancel: false, // 是否显示取消按钮，默认true
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: '#27aff6',
        success: function (res) {
          //console.log("接口调用成功的回调函数");
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return false;
    } else if (this.data.address == 0) {
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
    } else if (!(this.data.pictureUrls.length > 0)) {

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
    }
   // console.log(this.data)
    wx.showLoading({
      title: '上传中',
    })
    console.log("this.data.is_new" + this.data.is_new),
    wx.request({
      url: "http://maggiemarket.design:8080/api/myStore/modify",
      // header: {
      //   "Content-Type": "application/x-www-form-urlencoded"
      // },
      method: "POST",
      data: {
        cmId: parseInt(this.data.goodBefore.cmId),
        name: this.data.name,
        classify: parseInt(this.data.classify),
        details: this.data.details,
        price: this.data.price,
        userId: userId,
        address: parseInt(this.data.address),
        pictureUrls: this.data.pictureUrls,
        isNew: this.data.is_new
      },
      success: function (res) {
        console.log(res)
        that.data.isModify = 1;
        wx.hideLoading();
        wx.showToast({
          title: '修改成功',
          icon: 'none',
        })

        var timeOut = setTimeout(function () {
          wx.navigateBack({
            delta: 2
          })  
        }, 1000)
      },
      fail: function (res) {
        if (res == null || res.data == null) {
          console.error('网络请求失败');
          return;
        }
        wx.showModal({
          title: "修改失败", // 提示的标题
          content: "请检查网络", // 提示的内容
          showCancel: false, // 是否显示取消按钮，默认true
          confirmText: "确定", // 确认按钮的文字，最多4个字符
          confirmColor: '#27aff6',
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
    //console.log(this.data.isModify);
    //console.log("我卸载啦");
    //删除用户没有发布商品却上传到服务器上的图片
    if (this.data.isModify == 0) {
      
      wx.showModal({
        title: "温馨提示", // 提示的标题
        content: "如果在修改商品中删除了某张图片，放弃修改会导致商品图片显示异常哦", // 提示的内容
        showCancel: false, // 是否显示取消按钮，默认true
        confirmText: "确定", // 确认按钮的文字，最多4个字符
        confirmColor: '#27aff6',
      })
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