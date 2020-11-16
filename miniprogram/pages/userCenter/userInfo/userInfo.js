// miniprogram/pages/userCenter/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户头像
    userImageUrl: '',//未登录的话默认使用这个图片

    //用户昵称
    userName: '',

    //gradePicker
    gradeArray: [],
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
    var that = this;
    var gradeIndex = that.data.gradeIndex
    var contactInput = that.data.contactInput
    var addressInput = that.data.addressInput

    //判断是否已将信息填满：undefined|为空|全为空格
    if(gradeIndex != undefined && gradeIndex != 0 &&
       contactInput != undefined && contactInput != "" && contactInput.split(' ').join('').length != 0 &&
       addressInput != undefined && addressInput != "" && addressInput.split(' ').join('').length != 0)
    {
      //传递信息给后端进行数据修改
      wx.request({
        method: "POST",
        url: 'http://maggiemarket.design:8080/api/userCenter/userInfo/infoUpdate',
        data: {
          gradeIndex: gradeIndex,
          contactInfo: contactInput,
          addressInfo: addressInput,
        },
        header: {
          'content-type': 'application/json'//要根据后端信息进行修改
        },
        success: function (res) {
          console.log('成功传递修改信息给后端');
          console.log(res)

          console.log("完成修改")
          that.setData({
            change: false,
          })
      
          that.onShow()
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

    console.log("onShow()")

    var app = getApp()
    var userId = app.globalData.userId
    var userImageUrl = app.globalData.userImageUrl
    var that = this

    //获取年级数组
    wx.request({
      method: "GET",
      url: 'http://maggiemarket.design:8080/api/userCenter/userInfo/gradeArray',//获取年级数组
      header: {
        'content-type': 'application/json'//要根据后端信息进行修改
      },
      success: function (res) {
        console.log('成功从后端获取年级数组');
        console.log(res)

        that.setData({
          gradeArray: res.data.gradeArray,
          'gradeArray[0]': "请选择年级",
        })
      },
      fail: function(error){
        console.log("获取年级数组失败！");
      },
    })
    
    //根据用户id从后端请求用户信息进行加载
    wx.request({
      method: "POST",
      url: 'http://maggiemarket.design:8080/api/userCenter/userInfo/userInfo',//获取用户信息
      data: {
        userId: userId,
      },
      header: {
        'content-type': 'application/json'//要根据后端信息进行修改
      },
      success: function (res) {
        console.log('成功从后端获取用户信息');
        console.log(res)

        that.setData({
          userName: res.data.userName,
          userImageUrl: userImageUrl,
          gradeIndex: res.data.gradeIndex,
          contactInput: res.data.contactInfo,
          addressInput: res.data.addressInfo
        })

        console.log("grade: ", that.data.gradeIndex)
        console.log("contact: ", that.data.contactInput)
        console.log("address: ", that.data.addressInput)    
      },
      fail: function(error){
        console.log("获取用户信息失败！");
      },
    })
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