var templateFunc = {
  payment: function (event) {
    console.log("用户付款");
  },
  cancelOrder: function(event) {
    console.log("用户取消订单");
  }
}
//导出，供外部使用
export default templateFunc