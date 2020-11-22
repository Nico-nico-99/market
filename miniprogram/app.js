//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {
      userId: '',//用户id //测试个人资料请用“1”，测试我的收藏请用“2\3\4”，测试预订的请用“6\7”，测试买到的请用“4\5\6\7”，测试管理员端请用“1\2”
      userImageUrl: '',//用户头像 //测试请用“../../../images/userImage.png”

      hasUserInfo: false,//用户登陆状态，测试登录功能请用“false”，测试其他请用“true”    
      
      themeColor: "#27aff6",//主题色
    }
  }
})
