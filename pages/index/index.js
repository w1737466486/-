const app = getApp()
import comm from './../../utils/comm.js'
import Promisify from './../../utils/util.js'
Page({
  /**
   *                             _ooOoo_
   *                            o8888888o
   *                            88" . "88
   *                            (| -_- |)
   *                            O\  =  /O
   *                         ____/`---'\____
   *                       .'  \\|     |//  `.
   *                      /  \\|||  :  |||//  \
   *                     /  _||||| -:- |||||-  \
   *                     |   | \\\  -  /// |   |
   *                     | \_|  ''\---/''  |   |
   *                     \  .-\__  `-`  ___/-. /
   *                   ___`. .'  /--.--\  `. . __
   *                ."" '<  `.___\_<|>_/___.'  >'"".
   *               | | :  `- \`.;`\ _ /`;.`/ - ` : | |
   *               \  \ `-.   \_ __\ /__ _/   .-` /  /
   *          ======`-.____`-.___\_____/___.-`____.-'======
   *                             `=---='
   *          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
   *                     佛祖保佑        永无BUG
  */
  /**
 * ┌───┐   ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┐
 * │Esc│   │ F1│ F2│ F3│ F4│ │ F5│ F6│ F7│ F8│ │ F9│F10│F11│F12│ │P/S│S L│P/B│  ┌┐    ┌┐    ┌┐
 * └───┘   └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┘  └┘    └┘    └┘
 * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐ ┌───┬───┬───┐ ┌───┬───┬───┬───┐
 * │~ `│! 1│@ 2│# 3│$ 4│% 5│^ 6│& 7│* 8│( 9│) 0│_ -│+ =│ BacSp │ │Ins│Hom│PUp│ │N L│ / │ * │ - │
 * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤ ├───┼───┼───┤ ├───┼───┼───┼───┤
 * │ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{ [│} ]│ | \ │ │Del│End│PDn│ │ 7 │ 8 │ 9 │   │
 * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤ └───┴───┴───┘ ├───┼───┼───┤ + │
 * │ Caps │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  │               │ 4 │ 5 │ 6 │   │
 * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤     ┌───┐     ├───┼───┼───┼───┤
 * │ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│  Shift   │     │ ↑ │     │ 1 │ 2 │ 3 │   │
 * ├─────┬──┴─┬─┴──┬┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤ ┌───┼───┼───┐ ├───┴───┼───┤ E││
 * │ Ctrl│    │Alt │         Space         │ Alt│    │    │Ctrl│ │ ← │ ↓ │ → │ │   0   │ . │←─┘│
 * └─────┴────┴────┴───────────────────────┴────┴────┴────┴────┘ └───┴───┴───┘ └───────┴───┴───┘
 */
  /**
   * 页面的初始数据
   */
  
  data: {
    data_token: '',//存储用户token
    index: wx.getStorageSync('index'),//是否显示授权框
    showVideo: true,//控制播放键的放大缩小
    showBox: false,//控制宣传视频的显示隐藏
    showCode:false,//控制手机号绑定页面
    has_mobile:true,//判断是否绑定过手机，默认绑定过
    isbuy:false,//是否购买过
    phone:'',//input输入的phone
    phone_code:'',//input输入的验证码
    get_code:true,//控制验证码文字描述与倒计时切换
    codenum:'',//验证码倒计时数字
    nullHouse: true,//控制自定义模态框显示&隐藏
    toastmsg:'',//自定义模态框展示的消息
    typeId:'',//判断订单类型，单人购 0  团购 1
    order_no:'',//订单号
    commodity_id:'',//商品id
    price:'',//单人购显示价格
    invite:'邀请好友参团',
    groupbuy:'立即开团',
    alonebuy:'￥199单独购',
    group_buy_step1:false,
    group_buy_step2:false,
    group_buy_step3:false,
    group_buy_step4:false,//团购进度
    number_one:'../../img/mr_head.png',//团长头像
    number_two: '../../img/mr_head.png',//成员A头像
    number_three: '../../img/mr_head.png',//成员B头像
    name_one:'第1人',//
    name_two:'第2人',//
    name_three:'第3人',//成员微信名
    hour:'00',
    min:'00',
    sec:'00',//团购倒计时
    groupshow:true,//显示成团状态还是倒计时
    group_status:'',//成团状态
    order:'',
    loadingHidden:false,//控制loading
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  getUserInfo: function () {
    wx.login({
      success: (res) => {
        console.log(res)
        if (res.code) {
          wx.getUserInfo({
            withCredentials: true,
            success: (res_user) => {
              console.log(res_user)
              console.log(wx.getStorageSync('index'))
              if (!wx.getStorageSync('index')) {
                console.log(wx.getStorageSync('index'))
                wx.setStorageSync('index', true)
                this.setData({
                  index: true
                })
                wx.redirectTo({
                  url: 'index',
                })
              }
            },
            fail: (res) => {
              console.log(res)
              console.log(this.data.userInfo)
              if (wx.getStorageSync('userInfo')) {
                // wx.redirectTo({
                //   url: 'index',
                // })
              }
            }
          })
        }
      }
    })
  },
  /**
   * 
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (options.order_no){
      that.setData({
        order_no: options.order_no,
        order: options.order_no,
      })
    }
    showView: (options.showView == "true" ? true : false);
    isSearch: (options.isSearch == "true" ? true : false);
    wx.showShareMenu({
      withShareTicket: true
    });
    /** 判断场景值，1044 为转发场景，包含shareTicket 参数 */
    if (options.scene == 1044) {
      wx.getShareInfo({
        shareTicket: options.shareTicket,
        success:  (res) =>{
          console.log(res)
          var encryptedData = res.encryptedData;
          var iv = res.iv;
        }
      })
    }
    console.log(wx.getStorageSync('index'))
    if (wx.getStorageSync('index')==='') {
      wx.setStorageSync('index', false)
      wx.redirectTo({
        url: 'index',
      })
    }
    wx.login({
        success: (res) =>{
          console.log(res)
          if (res.code) {
            wx.getUserInfo({
              withCredentials: true,
              success: (res_user) => {
                console.log(res_user)
                console.log(wx.getStorageSync('index'))
                if (!wx.getStorageSync('index')){
                  wx.setStorageSync('index', true)
                  console.log(wx.getStorageSync('index'))
                  wx.redirectTo({
                    url: 'index',
                  })
                }
                this.setData({
                  index: true
                })
                wx.request({
                  url: 'https://api.speaka.live/api/user/register',
                  data: {
                    source:'mp',
                    register_method: 'mp_openid',
                    register_val: res.code,
                    iv: res_user.iv,
                    encryptedData: res_user.encryptedData
                  },
                  method: 'post',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success:  (res) =>{
                    console.log(res.data)
                    that.setData({
                      data_token: 'Bearer ' + res.data.data.accessToken,
                      userInfo: res_user.userInfo
                    })
                    //判断是否绑定手机号
                    if (res.data.data.is_mobile == 1) {
                      that.setData({
                        has_mobile: true
                      })
                    } else {
                      that.setData({
                        has_mobile: false
                      })
                    }
                    wx.setStorageSync('encryptedData', res_user.encryptedData)
                    wx.setStorageSync('iv', res_user.iv)
                    wx.setStorageSync('token', 'Bearer ' + res.data.data.accessToken)
                    wx.setStorageSync('u_id', res.data.data.u_id_for_shared)
                    wx.setStorageSync('userInfo', res_user.userInfo)
                    console.log(that.data.data_token)
                    console.log(wx.getStorageSync('userInfo'))
                    //执行判断是否绑定手机号，是否购买过该商品
                    that.run();
                    //部分页面数据加载完成，隐藏loading
                    that.setData({
                      loadingHidden:true
                    })
                  }
                });
              },
              fail:(res)=>{
                console.log(res)
                console.log(this.data.userInfo)
                console.log(!wx.getStorageSync('index'))
                // if (!wx.getStorageSync('index')) {
                //   wx.setStorageSync('index', true)
                //   console.log(!wx.getStorageSync('index'))
                //   wx.redirectTo({
                //     url: 'index',
                //   })
                // }
              }
            })
          }
        }
      }),
      setInterval(function() {
        that.setData({
          showVideo: !that.data.showVideo
        })
      }, 500);
   
  },
  run:function(){
    var that=this;
    wx.request({
      url: 'https://api.speaka.live/api/comm_mp',
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:  (res) =>{
        console.log(res.data)
        if(res.data.code==200){
          that.setData({
            commodity_id:res.data.data
          })
          //判断用户是否购买过商品
          wx.request({
            url: 'https://api.speaka.live/api/commoditybuy/' + that.data.commodity_id,
            //url: 'https://api.speaka.live/api/commoditybuy/244',
            data: {
              token: wx.getStorageSync('token')
            },
            method: 'get',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success:  (res) => {
              console.log(res.data)
              if(res.data.code==405||res.data.code==403||res.data.code==404){
                that.setData({
                  order_no: res.data.order_no,
                  order: res.data.order_no,
                  isbuy:true
                })
              } 
              console.log(that.data.order_no + '----' + res.data.order_no)
              that.setData({
                alonebuy: '￥'+res.data.price/100+'单人购'
              })
              //购买过该商品，渲染成团
              if(that.data.order_no){
                that.groupinfo()
              }  
            }
          });
        }
      }
    });
  },
  //团购者信息
  groupinfo:function(){
   var that=this;
    wx.request({
      url: 'https://api.speaka.live/api/order_group/'+that.data.order_no,
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success:  (res) => {
        console.log(res.data)
        if (res.data.type_id == 0) {
          that.setData({
            invite:'邀请好友购买'
          })
        }
        if (res.data.type_id == 1) {
          //渲染成员信息
          if (res.data.group.length > 0) {
            for(var i=0;i<res.data.group.length;i++){
              if (res.data.group[i].user_info.head_wx == null && res.data.group[i].user_info.head != '') {
                //选择head头像
                if(i==0){
                  that.setData({
                    number_one: 'https://s.speaka.live/' + res.data.group[i].user_info.head,
                    name_one: res.data.group[i].user_info.nickname
                  })
                } else if (i == 1) {
                  that.setData({
                    number_two: 'https://s.speaka.live/' + res.data.group[i].user_info.head,
                    name_two: res.data.group[i].user_info.nickname
                  })
                } else if (i == 2) {
                  that.setData({
                    number_three: 'https://s.speaka.live/' + res.data.group[i].user_info.head,
                    name_three: res.data.group[i].user_info.nickname
                  })
                }
              } else if (res.data.group[i].user_info.head_wx != null) {
                //选择微信头像
                if (i == 0) {
                  that.setData({
                    number_one: res.data.group[i].user_info.head_wx,
                    name_one: res.data.group[i].user_info.nickname
                  })
                } else if (i == 1) {
                  that.setData({
                    number_two: res.data.group[i].user_info.head_wx,
                    name_two: res.data.group[i].user_info.nickname
                  })
                } else if (i == 2) {
                  that.setData({
                    number_three: res.data.group[i].user_info.head_wx,
                    name_three: res.data.group[i].user_info.nickname
                  })
                }
              } else {
                //head和微信头像都为null，给默认头像
                if (i == 0) {
                  that.setData({
                    number_one: res.data.group[i].user_info.head_wx,
                    name_one: res.data.group[i].user_info.nickname
                  })
                } else if (i == 1) {
                  that.setData({
                    number_two: res.data.group[i].user_info.head_wx,
                    name_two: res.data.group[i].user_info.nickname
                  })
                } else if (i == 2) {
                  that.setData({
                    number_three: '../img/mr_head.png',
                    name_three: res.data.group[i].user_info.nickname
                  })
                }
              }
            }
          }
          //成团倒计时
          var curr_time = comm.getNowFormatDate();
          var last_time = res.data.limit_at;
          curr_time = curr_time.substr(0, 4) + '/' + curr_time.substr(5, 2) + '/' + curr_time.substr(8, 2) + ' ' + curr_time.substr(11);
          last_time = last_time.substr(0, 4) + '/' + last_time.substr(5, 2) + '/' + last_time.substr(8, 2) + ' ' + last_time.substr(11);
          curr_time = new Date(curr_time).valueOf();
          last_time = new Date(last_time).valueOf();
          //剩余总时间
          var remain_time = last_time / 1000 - curr_time / 1000;
          //剩余时
          var remain_hours = Math.floor(remain_time / 3600);
          //剩余分
          var remain_min = Math.floor((remain_time - remain_hours * 3600) / 60);
          //剩余秒
          var remain_sec = Math.floor(remain_time - remain_hours * 3600 - remain_min * 60);
          console.log(remain_hours + '----' + remain_min + '---------' + remain_sec)
          that.setData({
            hour: remain_hours,
            min: remain_min,
            sec: remain_sec
          })
          //活动进程
          //已购买商品邀请参团
          if (remain_time > 0 && res.data.group.length < 3 && that.data.isbuy == true) {
            that.setData({
              group_buy_step3:true
            })
          }
          //未购买商品参团支付
          if (remain_time > 0 && res.data.group.length < 3 && that.data.isbuy == false) {
            that.setData({
              groupbuy:'立即参团',
              group_buy_step2: true
            })
          }
          //团购完成
          if (remain_time > 0 && res.data.group.length >= 3 && that.data.isbuy == true) {
            that.setData({
              group_buy_step4: true
            })
          }
          if (remain_time > 0 && res.data.group.length >= 3) {
            that.setData({
              groupshow: false,
              group_status: '该拼团已完成！',
              hour: '00',
              min: '00',
              sec: '00',//团购倒计时
              groupbuy: '该团人数已满！去开团',
              typeId :1,
              order_no :''
            })
          } else if (remain_time <= 0 && res.data.group.length < 3) {
            that.setData({
              group_status: '该拼团已结束',
              hour: '00',
              min: '00',
              sec: '00',//团购倒计时
              typeId :1,
              order_no :''
            })
          } else if (remain_time <= 0) {
            that.setData({
              group_status: '该拼团已结束',
              hour: '00',
              min: '00',
              sec: '00',//团购倒计时
              typeId: 1,
              order_no: ''
            })
          }
          if (remain_time > 0 && res.data.group.length < 3) {
            that.setData({
              group_status: '该拼团已结束',
              typeId: 1,
            })
          }
          //设置定时器
          setInterval(function () {
            var curr_time = comm.getNowFormatDate();
            var last_time = res.data.limit_at;
            curr_time = curr_time.substr(0, 4) + '/' + curr_time.substr(5, 2) + '/' + curr_time.substr(8, 2) + ' ' + curr_time.substr(11);
            last_time = last_time.substr(0, 4) + '/' + last_time.substr(5, 2) + '/' + last_time.substr(8, 2) + ' ' + last_time.substr(11);
            curr_time = new Date(curr_time).valueOf();
            last_time = new Date(last_time).valueOf();
            //剩余总时间
            var remain_time = last_time / 1000 - curr_time / 1000;
            //剩余时
            var remain_hours = Math.floor(remain_time / 3600);
            //剩余分
            var remain_min = Math.floor((remain_time - remain_hours * 3600) / 60);
            //剩余秒
            var remain_sec = Math.floor(remain_time - remain_hours * 3600 - remain_min * 60);
            that.setData({
              hour: remain_hours,
              min: remain_min,
              sec: remain_sec
            })
            if (remain_time > 0 && res.data.group.length >= 3) {
              that.setData({
                groupshow:false,
                group_status:'已成团',
                hour: '00',
                min: '00',
                sec: '00',//团购倒计时
              })
            } else if (remain_time <= 0 && res.data.group.length < 3) {
              that.setData({
                groupshow:false,
                group_status:'该拼团已结束',
                hour: '00',
                min: '00',
                sec: '00',//团购倒计时
              })
            } else if (remain_time <= 0) {
              that.setData({
                groupshow:false,
                group_status:'该拼团已结束',
                hour: '00',
                min: '00',
                sec: '00',//团购倒计时
              })
            }

          }, 1000);
        }
      }
    });
  },
  // 播放视频
  playVideo: function() {
    var that = this;
    that.setData({
      showBox: !that.data.showBox
    })
    that.videoContext.play();

  },
  // 关闭视频
  stopVideo: function() {
    var that = this;
    that.setData({
      showBox: !that.data.showBox
    })
    that.videoContext.pause();
  },
  //获取手机号
  getphone:function(e){
    var that=this;
    console.log(e.detail.value)
    that.setData({
      phone: e.detail.value
    })
  },
  //获取验证码
  getcode:function(e){
    var that=this;
    console.log(e.detail.value)
    that.setData({
      phone_code: e.detail.value
    })
  },
  //发送验证码
  getcodeBtn:function(){
    var that=this;
    var i=60;
    wx.request({
      url: 'https://api.speaka.live/api/sms',
      data: {
        mobile: that.data.phone,
      },
      method: 'get',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "Authorization": that.data.data_token
      },
      success:  (res) => {
        console.log(res.data)
        if(res.data.status==1){
          var stopTime = setInterval(function () {
            i--;
            that.setData({
              get_code: false,
              codenum: i + 's'
            })
            if (i == 0) {
              clearInterval(stopTime)
              that.setData({
                get_code: true
              })
            }
          }, 1000)
          that.setData({
            nullHouse: false, //弹窗显示
            toastmsg: res.data.info
          })
          setTimeout(function () {
            that.setData({
              nullHouse: true, //弹窗显示
            })
          }, 1000)
        }
        if (res.data.status == 0) {
          that.setData({
            nullHouse: false, //弹窗显示
            toastmsg:res.data.info
          })
          setTimeout(function () {
            that.setData({
              nullHouse: true, //弹窗显示
            })
           }, 1000)
        }
      }
    });
  },
  //关闭手机验证界面
  closeCode:function(){
    var that=this;
    that.setData({
      showCode:false,
      phone:'',
      phone_code:''
    })
  },
  //验证手机号和验证码
  submitBtn:function(){
    var that=this;
    console.log(that.data.phone+'----'+that.data.phone_code)
    wx.request({
      url: 'https://api.speaka.live/api/user/setMobile',
      data: {
        mobile: that.data.phone,
        verifyCode:that.data.phone_code
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "Authorization": that.data.data_token
      },
      success:  (res) => {
        console.log(res.data);
        if (res.data.code == 10000){
          that.setData({
            has_mobile: true, 
            showCode: false,
          })
          that.pay(1, that.data.order_no, that.data.commodity_id);
        }else{
          that.setData({
            nullHouse: false, //弹窗显示
            toastmsg: res.data.msg
          })
          setTimeout(function () {
            that.setData({
              nullHouse: true, //弹窗显示
            })
          }, 1000)
        }
      }
    });
  },
  //购买
  alone_buy:function(){
    var that=this;
    console.log(that.data.order_no)
    if(that.data.has_mobile){
      //支付
      that.pay(0, that.data.order_no, that.data.commodity_id)
    }else{
      //绑定手机
      that.setData({
        showCode:true,
        typeId:0
      })
    }
  },
  group_buy: function () {
    var that = this;
    if (that.data.has_mobile) {
      //支付
      that.pay(1, that.data.order_no,that.data.commodity_id)
    } else {
      //绑定手机
      that.setData({
        showCode: true,
        typeId: 1
      })
    }
  },
  //支付
  pay: function (typeId, order_no,commodity_id){
    var _this=this;
    wx.request({
      url: 'https://api.speaka.live/api/order/insertOrder',
      data: {
        commodity_id: commodity_id,
        type_id: typeId,
        pay_type: 0,
        from_type: 3,
        order_no: order_no,
        location: 'https://h5.speaka.live'
      },
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        "Authorization": _this.data.data_token
      },
      success:  (res) => {
        console.log(res.data);
        if(res.data.code==200){
          console.log(res.data.data.pay_config)
          wx.requestPayment({
            'timeStamp': res.data.data.pay_config.timestamp,
            'nonceStr': res.data.data.pay_config.nonceStr,
            'package': res.data.data.pay_config.package,
            'signType': 'MD5',
            'paySign': res.data.data.pay_config.paySign,
            'success': function (_res) {
              console.log(_res)
              console.log(res.data.data.prepay_id)
              wx.request({
                url: 'https://api.speaka.live/api/order/formId',
                data: {
                  form_id: res.data.data.prepay_id
                },
                method: 'post',
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                  "Authorization": _this.data.data_token
                },
                success: (res) => {
                  console.log(res.data);
                }
              });
              _this.setData({
                nullHouse: false, //弹窗显示
                toastmsg: '购买成功！'
              })
              setTimeout(function () {
                _this.setData({
                  nullHouse: true, //弹窗显示
                })
              }, 1500)
              wx.redirectTo({
                url: 'index',
              })
            },
            'fail': function (_res) {
              console.log(res.data.prepay_id)
              _this.setData({
                nullHouse: false, //弹窗显示
                toastmsg: '购买失败！'
              })
              setTimeout(function () {
                _this.setData({
                  nullHouse: true, //弹窗显示
                })
              }, 1500)
            }
          })
        } else if(res.data.code==201){
          console.log(res.data)
          _this.setData({
            nullHouse: false, //弹窗显示
            toastmsg: res.data.msg
          })
          setTimeout(function () {
            _this.setData({
              nullHouse: true, //弹窗显示
            })
            wx.redirectTo({
              url: 'index',
            })
          }, 1500)
          
        }else{
          _this.setData({
            nullHouse: false, //弹窗显示
            toastmsg: res.data.msg
          })
          setTimeout(function () {
            _this.setData({
              nullHouse: true, //弹窗显示
            })
          }, 1500)
        }
      }
    });
  },
  toSpeaka:function(e){
     console.log(e)
     var url=e.currentTarget.dataset.url;
     console.log(url)
     if(url=="pages/toSpeaka/toSpeaka"){
       wx.navigateTo({
         url: "../toSpeaka/toSpeaka"
       })
     }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.videoContext = wx.createVideoContext('myVideo');
    console.log(this.data)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading()
    setTimeout(function () {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    }, 1000)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // wx.showLoading({
    //   title: '已经到底啦！',
    // })
    // setTimeout(function(){
    //   wx.hideLoading();
    // },500)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    console.log(that.data)
    return {
      title: 'speaka 趣味英语课堂',
      path: '/pages/index/index?order_no=' + that.data.order,
      //path: '/pages/index/index?order_no=12345678',
      success: function (res) {
        console.log(res.shareTickets)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})