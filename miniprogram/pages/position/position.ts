// pages/position/position.ts

Page({
  /**
   * 页面的初始数据
   */
  data: {
    cities: [{ name: '定位', id: '' }],
    historyCities: ['北京市', '广州市', '深圳市', '上海市', '南京市'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    wx.request({
      url: "https://geoapi.qweather.com/v2/city/top?number=8&range=cn&key=83b135e514964d09b907c1ec3a48bb24",
      success: (res: any) => {
        // let cities = res.data.topCityList.map((item: any) => {
        //   return item.name
        // })
        this.setData({
          cities: [...this.data.cities, ...res.data.topCityList]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 返回上一级
  _backBeforePage: function () {
    wx.navigateBack()
  },

  // 点击热门城市 / 定位
  _selectHotCity: function (e: any) {
    // 获取页面栈，调用上级页面方法
    const pages = getCurrentPages();
    const beforePage = pages[pages.length - 2];
    // 获取参数
    let value = e.currentTarget.dataset
    let {index, cityId} = value
    if (index == 0) {
      this._backBeforePage()
      beforePage._getFuzzyLocation()
    } else {
      this._backBeforePage()
      beforePage._getCityInfoById(cityId)
    }
  }

  
});