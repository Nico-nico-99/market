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

    //schoolPicker
    schoolArray: ['请选择学校', '广东工业大学', '广东外语外贸大学', '广东药科大学', '广州大学', '广州美术学院', '广州中医药大学', '华南理工大学', '华南农业大学', '华南师范大学', '暨南大学', '星海音乐学院', '中山大学', '其他'],
    schoolIndex: 0,
    school: '',

    //gradePicker
    gradeArray: ['请选择年级', '2017', '2018', '2019', '2020', '其他'],
    gradeIndex: 0,
    grade: '',

    //contact
    contactInput: "请输入联系方式",

    //address
    addressInput: "请输入收货地址",

    //edit
    editButtontext: "修改资料",
    finish: false,
    change: false,
  },

  /**
   * 学校选择器
   */
  bindSchoolPickerChange: function(e) {
    console.log('schoolPicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      schoolIndex: e.detail.value,
    })
  },

  /**
   * 年级选择器
   */
  bindGradePickerChange: function(e) {
    console.log('gradePicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      gradeIndex: e.detail.value,
    })
  },

  /**
  * contact
  */
  bindContactInput: function(e){
    this.setData({
      contactInput: e.detail.value
    })
  },

  /**
  * address
  */
  bindAddressInput: function(e){
    this.setData({
      addressInput: e.detail.value
    })
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
    console.log("完成修改")
    this.setData({
     change: false,
   })

    wx.showToast({
      title: '修改成功',
      icon: 'none'
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