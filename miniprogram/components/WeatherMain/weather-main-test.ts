// components/WeatherMain/weather-main.ts

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    latitude: { // 纬度
      type: Number
    },
    longitude: { // 经度
      type: Number
    },
  },

  // 监听经纬度是否发生变化，生命周期执行顺序问题，所以使用监听器
  observers: {
    'latitude, longitude': function (val1, val2) {
      // 判断，因为数据不发生变化的初始时，也会触发监听器（没有vue做得好）
      if (val1 == 0 || val2 == 0) {
        return
      } else {
        this._getWeatherInfoByLocation()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    locationInfo: {},
  },

  // 生命周期函数
  lifetimes: {
    created: function () {

    },
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    ready: function () {

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 进入到选择城市的页面
    _intoPosition: function () {
      wx.navigateTo({
        url: '/pages/position/position'
      })
    },

    // 通过经纬度获取当前城市的天气
    _getWeatherInfoByLocation: function () {
      wx.request({
        url: `https://geoapi.qweather.com/v2/city/lookup?location=${this.properties.longitude},${this.properties.latitude}&key=83b135e514964d09b907c1ec3a48bb24`,
        header: {
          'content-type': 'application/json'
        },
        success: (res: any) => {
          console.log('通过经纬度获取的天气信息', res.data)
          this.setData({
            locationInfo: res.data.location[0]
          })
        }
      })
    }
  }
})
