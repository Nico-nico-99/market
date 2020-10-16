// components/searchBox/searchBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [
      {value: 'goods', name: '商品', checked: 'true'},
      {value: 'shops', name: '店铺'},
    ],
    type: ['商品', '用户'],
    index: 0,
  },
  /**
   * 组件的方法列表
   */
  methods: {
  // 类型选择器改变事件
  typePickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  // 搜索按钮表单提交事件
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },

  }
})
