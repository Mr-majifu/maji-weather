// components/WeatherMain/weather-main.ts

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cityInfo: {
      type: Object
    },
    weatherInfo: {
      type: Object
    },
    airInfo: {
      type: Object
    },
    useLocation: {
      type: Boolean,
      value: true
    },
  },

  // 数据监听
  observers: {
    'airInfo': function () {
      if (parseInt(this.properties.airInfo.aqi) <= 50) {
        this.setData({
          airQualityColor: "background-color: rgb(58, 184, 121);"
        })
      } else if(parseInt(this.properties.airInfo.aqi) <= 100) {
        this.setData({
          airQualityColor: "background-color: rgb(224, 204, 19);"
        })
      } else if(parseInt(this.properties.airInfo.aqi) <= 150) {
        this.setData({
          airQualityColor: "background-color: orange;"
        })
      } else if(parseInt(this.properties.airInfo.aqi) <= 200) {
        this.setData({
          airQualityColor: "background-color: red;"
        })
      } else if(parseInt(this.properties.airInfo.aqi) <= 300) {
        this.setData({
          airQualityColor: "background-color: perpul;"
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    airQualityColor: "background-color: rgb(58, 184, 121);"
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
  }
})
