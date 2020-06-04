// pages/footprint/footprint.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      state: '编辑',
      allSelected: false,
      datas: {
        checked: 'img/checked.png',
        unchecked: 'img/unchecked.png',
        isEdit: false,
        delete_icn: 'img/delete.png',
        selectall_icn: 'img/select_all.png',
        content_list: [
          // 参数说明：img:图片，title:标题，checked：是否选中（编辑模式下）
          { img: '../../images/大雁塔.jpg', title: '大雁塔', checked: false, date: '2018/09/09' },
          { img: '../../images/钟楼.jpg', title: '钟楼', checked: false, date: '2018/09/09' }
        ]
      }

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
  
  deleteSelectedHistory: function() {
    //TO_DO 删除选中的历史记录
  },
  
  choice: function(e) {
    // 单个选中
    let index = e.currentTarget.dataset.index ;
    let temp = 'datas.content_list[' + index +'].checked' ; 
    if (this.checked) {
      this.setData({
        [temp]: false
      })
    } else {
      this.setData({
        [temp]: true
      })
    }
  },
  
  routeTo: function() {
  },

  changeState: function() {
    // 编辑状态切换
    if (this.data.datas.isEdit) {
      var str = 'datas.isEdit';
      this.setData({[str]:false});
      this.setData({
        state: "编辑"
      });
      console.log(this.data.state);
    } else {
      var str = 'datas.isEdit';
      this.setData({[str]:true});
      this.setData({
        state: "取消"
      });
      console.log(this.data.state);
      console.log(this.data.datas.isEdit);
    }
  }
})


  

