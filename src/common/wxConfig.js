import wx from 'weixin-js-sdk'
// import { loadScript, GetQueryString } from 'common/js/util'
// import { shareConfig } from 'api/request'

//分享信息配置
const shareConfigCon = {
  ShareUrl: "http://game.flyh5.cn/resources/game/wechat/dxl/cmkj_search/index.html",
  Title: '网晨平头哥管理系统',
  Desc: "模块化定制 用心打造服务",
  ShareImage: "http://game.flyh5.cn/resources/game/wechat/dxl/cmkj_search/img/icons/favicon-16x16.png"
}
console.log("【分享配置信息】")
console.log(shareConfigCon)
console.log(window.location)
// shareConfig().then(res => {
//   if (res.error == 200) {
//     shareConfigCon.Title = res.data.share_title
//     shareConfigCon.Desc = res.data.share_desc
//     shareConfigCon.ShareImage = res.data.share_img
//     wxConfigInit()
//   } else {
//     wxConfigInit()
//   }
// }).catch(err => {
//   console.log(err)
  wxConfigInit()
// })
//分享信息方法
function wxConfigInit() {
  console.log('【wx】')
  console.log(wx)
  //加载配置微信jssdk参数标签     提示：这个链接和分享链接都要跟当前域名一样 
  loadScript("https://game.flyh5.cn/game/twolevel_autho/share.php?auth_appid=wx7c3ed56f7f792d84&type=js&isonlyopenid=true", () => {    
    //配置微信jssdk   
    wxConfig()           
  })
}
function loadScript(src, callback) {
  var s = document.createElement("script")
  s.async = false
  s.src = src
  var evtName = null
  var evtListener = null
  function logic() {
    s.parentNode.removeChild(s)
    s.removeEventListener(evtName, evtListener, false)
    callback && callback()
  }
  if (!-[1,]) {
    evtName = "readystatechange"
    evtListener = function () {
      (this.readyState == "loaded" || this.readyState == "complete") && logic()
    }
  } else {
    evtName = "load"
    evtListener = logic
  }
  s.addEventListener(evtName, evtListener, false)
  document.body.appendChild(s)
}
function wxConfig(configData, openJssdkDebug) {
  let _self = this
  console.log("【微信jssdk注册参数】")
  console.log(wx_config)
  wx.config({
    debug: window.openJssdkDebug,
    appId: wx_config["appId"],
    timestamp: wx_config["timestamp"],
    nonceStr: wx_config["nonceStr"],
    signature: wx_config["signature"],
    jsApiList: [
    'checkJsApi', 'onMenuShareTimeline', 'updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'translateVoice', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice','onVoicePlayEnd', 'pauseVoice', 'stopVoice', 'uploadVoice', 'downloadVoice', 'chooseImage', 'getLocalImgData', 'previewImage', 'uploadImage', 'downloadImage', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'closeWindow', 'scanQRCode', 'chooseWXPay', 'openProductSpecificView', 'addCard', 'chooseCard', 'openCard'
    ]
  })
  wx.ready(function () {
    // wx.checkJsApi({
    //     jsApiList: ["chooseWXPay"],
    //     success: function (res) {
    //       console.log('【是否支付chooseWXPay】', res)
    //         if (res.checkResult.chooseWXPay) {
    //             console.log("wx.checkJsApi success");
    //             window.wxConfigReady = true;
    //             document.dispatchEvent(new Event("wxConfigReady"));
    //         }
    //         console.log("wx.checkJsApi result:", res.checkResult);
    //     },
    //     fail: function (res) {
    //         console.log("wx.checkJsApi fail:", res);
    //     }
    // });
    console.log("【wx.ready OK】")  
    shareConfigure()
  })
  wx.error(function (res) {
    console.log("wx.config error:", res);
    wxConfig();
  })
}
function shareConfigure() {
	console.log("aaaaaaaaaaa")
  // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
  wx.updateAppMessageShareData({ 
    title: shareConfigCon.Title, // 分享标题
    desc: shareConfigCon.Desc, // 分享描述
    link: shareConfigCon.ShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: shareConfigCon.ShareImage, // 分享图标
    success: function () {
      // 设置成功
      console.log('【分享配置OK1111】')
    }
  })
  // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
  wx.updateTimelineShareData({ 
    title: shareConfigCon.Title, // 分享标题
    link: shareConfigCon.ShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: shareConfigCon.ShareImage, // 分享图标
    success: function () {
      // 设置成功
      console.log('【分享配置OK2222】')
    }
  })
  //2.1监听“分享到朋友”按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareAppMessage({
    title: shareConfigCon.Title, // 分享标题
    desc: shareConfigCon.Desc, // 分享描述
    link: shareConfigCon.ShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: shareConfigCon.ShareImage, // 分享图标
    success: function(res) {
      console.log('【分享配置OK3333】')
    },
    cancel: function(res) {},
    fail: function(res) {}
  });
    
  // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
  wx.onMenuShareTimeline({
    title: shareConfigCon.Title, // 分享标题
    desc: shareConfigCon.Desc, // 分享描述
    link: shareConfigCon.ShareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: shareConfigCon.ShareImage, // 分享图标
    success: function(res) {
      console.log('【分享配置OK4444】') 
    },
    cancel: function(res) {},
    fail: function(res) {}
  });
}