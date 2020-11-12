// miniprogram/pages/userCenter/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户头像
    userImageUrl: '../../../images/userImage.png',//未登录的话默认使用这个图片

    //用户昵称
    userName: 'Aurora',

    //gradePicker
    gradeArray: ['请选择年级', '2017', '2018', '2019', '2020', '其他'],
    gradeIndex: 0,

    //contact
    contactInput: "",

    //address
    addressInput: "",

    //edit
    editButtontext: "修改资料",
    finish: false,
    change: false,
  },

  /**
   * 年级选择器
   */
  bindGradePickerChange: function(e) {
    this.setData({
      gradeIndex: e.detail.value
    })
    this.gradeIndex = e.detail.value

    console.log('gradePicker发送选择改变，携带值为', this.gradeIndex)
  },

  /**
  * contact
  */
  bindContactInput: function(e){
    this.setData({
      contactInput: e.detail.value
    })
    this.contactInput = e.detail.value
   
    //console.log('contact', this.contactInput)
  },

  /**
  * address
  */
  bindAddressInput: function(e){
    this.setData({
      addressInput: e.detail.value
    })
    this.addressInput = e.detail.value

    //console.log('address', this.addressInput)
  },

  /**
   * edit
   */
  gotoEdit: function(e){
    console.log("进入修改")
    this.setData({
      change: true,
    })
  },
  editFinish: function(e){    
    //判断是否已将信息填满：undefined|为空|全为空格
    if(this.gradeIndex != undefined && this.gradeIndex != 0 &&
       this.contactInput != undefined && this.contactInput != "" && this.contactInput.split(' ').join('').length != 0 &&
       this.addressInput != undefined && this.addressInput != "" && this.addressInput.split(' ').join('').length != 0)
    {
      /*
      //传递信息给后端进行数据修改
      wx.request({
        method: "POST",
        url: 'http://xx.com/api/userCenter/userInfo/infoUpdate.html',
        data: {
          gradeIndex: this.gradeIndex,
          contactInfo: this.contactInput,
          addressInfo: this.addressInput,
        },
        header: {
          'content-type': 'application/json'//要根据后端信息进行修改
        },
        success: function (res) {
          console.log('成功传递修改信息给后端');

          console.log("完成修改")
          this.setData({
            change: false,
          })
      
          console.log("grade: ", this.gradeIndex)
          console.log("contact: ", this.contactInput)
          console.log("address: ", this.addressInput)    

          this.onShow()
          wx.showToast({
            title: '修改成功',
            icon: 'none'
          })
        },
        fail: function(error){
          console.log("传递修改信息失败！");

          wx.showToast({
            title: '修改失败，请重新修改',
            icon: 'none'
          })
        },
      })
      */

      //调试用
      console.log("完成修改")
      this.setData({
        change: false,
      })
      
      console.log("grade: ", this.gradeIndex)
      console.log("contact: ", this.contactInput)
      console.log("address: ", this.addressInput)    

      this.onShow()
      wx.showToast({
        title: '修改成功',
        icon: 'none'
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '年级/联系方式/收货地址为必填，不可为空，请重新填写。',
        showCancel: false,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("onLoad()")
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
    this.setData({
      change: false,
    })

    /*
    console.log("onShow()")

    var app = getApp()
    var userId = app.globalData.userId
    var that = this

    //获取年级数组
    wx.request({
      method: "POST",
      url: 'http://xx.com/api/userCenter/userInfo/gradeArray.html',//获取用户信息
      header: {
        'content-type': 'application/json'//要根据后端信息进行修改
      },
      success: function (res) {
        console.log('成功从后端获取年级数组');
        that.setData({
          gradeArray: res.data.gradeArray,
        })
      },
      fail: function(error){
        console.log("获取年级数组失败！");
      },
    })
    
    //根据用户id从后端请求用户信息进行加载
    wx.request({
      method: "POST",
      url: 'http://xx.com/api/userCenter/userInfo/userInfo.html',//获取用户信息
      data: {
        userId: userId,
      },
      header: {
        'content-type': 'application/json'//要根据后端信息进行修改
      },
      success: function (res) {
        console.log('成功从后端获取用户信息');
        that.setData({
          userName: res.data.userName,
          userImageUrl: res.data.userImage,
          gradeIndex: res.data.gradeIndex,
          contactInput: res.data.contactInfo,
          addressInput: res.data.addressInfo
        })
      },
      fail: function(error){
        console.log("获取用户信息失败！");
      },
    })
    */
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