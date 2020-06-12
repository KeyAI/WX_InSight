// pages/camera/camera.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading_hidden: true,
    photo_img_hidden: true, //展示照片的view是否隐藏
    photo_img:'', //存放照片路径的
    baiduToken: null,
    landmark: '', //地标识别结果 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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

  // buttonclick(){
  //   var that = this;
  //   if (!that.baiduToken) {
  //     that.getBaiduTaken();
  //   }
  //   wx.chooseImage({
  //     count: 1,
  //     success: function (res) {
  //       // 无论用户是从相册选择还是直接用相机拍摄，路径都是在这里面
  //       var filePath = res.tempFilePaths[0];
  //       //将刚才选的照片/拍的 放到下面view视图中
  //       that.setData({
  //         loading_hidden: false,
  //         photo_img: filePath, //把照片路径存到变量中，
  //         photo_img_hidden: false //让展示照片的view显示
  //       });
  //       // 这个是使用微信接口保存文件到数据库
  //       // wx.uploadFile({
  //       //   url: "",
  //       //   filePath: filePath,
  //       //   name: 'file',
  //       //   success: function (res) {

  //       //   }
  //       // })
  //     },
  //     fail: function (error) {
  //       console.error("调用本地相册文件时出错")
  //       console.warn(error)
  //     },
  //     complete: function () {

  //     }
  //   });
  // },
  buttonclick() {
    var that = this;

    //复位
    that.setData({
      photo_img: ''
    })

    // //首先授权相机的使用
    // that.checkAuth().then(res => {
    //   console.log(res);
    // })

    //获取BaiduToken
    if (!that.baiduToken) {
      that.getBaiduTaken();
    }

    that.getImage().then(res => {
      var filePath = res.tempFilePaths[0];
      // console.log("图片地址", filePath)

      //将刚才选的照片/拍的 放到下面view视图中
      that.setData({
        loading_hidden: false,
        photo_img: filePath, //把照片路径存到变量中，
        photo_img_hidden: false //让展示照片的view显示
      });

      wx.getFileSystemManager().readFile({
        filePath: filePath,
        encoding: "base64",
        success: res => {
          console.log("读取图片数据", res.data)
          //识别图片
          that.scanImageInfo(res.data).then(res => {
            console.log("地标识别结果", res)

            that.setData({
              landmark: res.data.result.landmark
            })

            if ( !that.data.landmark ) {
              wx.showToast({
                title: '很遗憾我还不认识这个景点，换张图片试试吧',
              })
            }
          })

          that.setData({
            loading_hidden: true,
          });
        },
        fail: res => {
          console.log(" 读取图片数据fail ", res)
        }
      })
    })
  },
  //获取百度token
  getBaiduTaken: function () {
    const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=0B3plIhAdfjkvHNSbvceB0pR&client_secret=cPbXl33kjSDGVMBXKxpLpAOX3b069G6j&`;

    var that = this;
    wx.request({
      url: tokenUrl,
      method: 'POST',
      dataType: "json",
      header: {
        'content-type': 'application/json; charset=UTF-8'
      },
      success: function (res) {
        console.log("【getBaiduTaken提示pass】", res);
        that.setData({
          baiduToken: res.data.access_token
        })
      },
      fail: function (res) {
        console.log("【getBaiduTaken提示fail】", res);
      }
    })
  },
  //获取本地图片
  getImage: function () {
    var that = this;
    // 选择图片
    return new Promise(function (resolve, reject) {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: resolve,
        fail: reject
      })

    })
  },
  //识别图片
  scanImageInfo: function (imageData) {
    var that = this;
    const baiduApiUrl = `https://aip.baidubce.com/rest/2.0/image-classify/v1/landmark?access_token=${that.data.baiduToken}`;

    //显示加载界面
    wx.showLoading({
      title: '加载中',
    });

    return new Promise(function (resolve, reject) {
      wx.request({
        url: baiduApiUrl,
        data: {
          image: imageData
        },
        method: 'POST',
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: resolve,
        fail: reject,
        complete: res => {
          //隐藏加载界面
          wx.hideLoading()
        }
      })
    })
  },
})