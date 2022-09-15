// pages/index01/index01.ts
Page({

  data: {
    cityInfo: {}, // 定位 / 所选城市的信息
    weatherInfo: {}, // 天气信息
    airInfo: {}, // 空气质量信息
    futureWeatherInfo: [], // 未来天气信息
    useLocation: true // 是否使用定位
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this._getFuzzyLocation();
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

  // 获取模糊定位
  _getFuzzyLocation: function () {
    wx.getFuzzyLocation({
      type: 'wgs84',
      success: (res: any) => {
        this._getCityInfoByLocation(res.latitude, res.longitude)
      }
    })
  },

  // 通过经纬度获取当前城市的信息
  _getCityInfoByLocation: function (latitude: number, longitude: number) {
    wx.request({
      url: `https://geoapi.qweather.com/v2/city/lookup?location=${longitude},${latitude}&key=83b135e514964d09b907c1ec3a48bb24`,
      header: {
        'content-type': 'application/json'
      },
      success: (res: any) => {
        this.setData({
          cityInfo: res.data.location[0],
          useLocation: true,
        })
        this._getCityWeatherById(res.data.location[0].id)
        this._getAirQualityById(res.data.location[0].id)
        this._getFutureWeatherInfoById(res.data.location[0].id)
      }
    })
  },

  // 通过城市id获取城市信息
  _getCityInfoById(cityId: string) {
    wx.request({
      url: `https://geoapi.qweather.com/v2/city/lookup?location=${cityId}&key=83b135e514964d09b907c1ec3a48bb24`,
      header: {
        'content-type': 'application/json'
      },
      success: (res: any) => {
        this.setData({
          cityInfo: res.data.location[0],
          useLocation: false,
        })
        this._getCityWeatherById(res.data.location[0].id)
        this._getAirQualityById(res.data.location[0].id)
        this._getFutureWeatherInfoById(res.data.location[0].id)
      }
    })
  },

  // 通过城市id获取城市天气
  _getCityWeatherById: function (cityId: string) {
    wx.request({
      url: `https://devapi.qweather.com/v7/weather/now?location=${cityId}&key=83b135e514964d09b907c1ec3a48bb24`,
      header: {
        'content-type': 'application/json'
      },
      success: (res: any) => {
        this.setData({
          weatherInfo: res.data.now,
        })
      }
    })
  },

  // 通过城市id获取空气质量
  _getAirQualityById: function (cityId: string) {
    wx.request({
      url: `https://devapi.qweather.com/v7/air/now?location=${cityId}&key=83b135e514964d09b907c1ec3a48bb24`,
      header: {
        'content-type': 'application/json'
      },
      success: (res: any) => {
        let a: any = {}
        for (const key in res.data.now) {
          if (key == "category") {
            a[key] = res.data.now[key].slice(0,2)
          } else {
            a[key] = res.data.now[key]
          }
        }
        this.setData({
          airInfo: a,
        })
      }
    })
  },

  // 通过城市id获取未来天气信息
  _getFutureWeatherInfoById: function (cityId: string) {
    wx.request({
      url: `https://devapi.qweather.com/v7/weather/3d?location=${cityId}&key=83b135e514964d09b907c1ec3a48bb24`,
      header: {
        'content-type': 'application/json'
      },
      success: (res: any) => {
        this.setData({
          futureWeatherInfo: res.data.daily,
        })
      }
    })
  }
})