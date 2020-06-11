// pages/footprint/footprint.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sightName: '宽窄巷子',
    distance: '5.6',
    cards: [
      {url: '../../images/BGview.jpeg'},
      {url: '../../images/宽窄巷子2.jpg'},
      {url: '../../images/宽窄巷子3.jpg'}
    ]
  },

  navclick:function(){
    wx.navigateTo({
      url: '../driveRoute/driveRoute',
    })
  },
  naviToWeather: function (e) {
    wx.navigateTo({
      url: '../weather/weather'
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

  },

  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.navigateTo({
      url: '../../pages/details/details',
      success: function (res) {
        wx.hideLoading();
      }
    })
  }
})
