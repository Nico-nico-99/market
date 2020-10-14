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
    ]
  },
  /**
   * 组件的方法列表
   */
  methods: {
  // radio改变触发事件
  radioChange(e) {
    console.log('搜索类型radio发生change事件，携带value值为：', e.detail.value)
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value
    }
    this.setData({
      items
    })
  }
  }
})
