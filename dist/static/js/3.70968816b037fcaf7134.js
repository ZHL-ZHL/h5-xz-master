webpackJsonp([3],{RAoZ:function(e,t){},lmfZ:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),o=a.n(n),r=a("exGp"),i=a.n(r),s=a("bOdI"),c=a.n(s),l=(a("NC6I"),a("mtWM"),a("Fd2+")),u={data:function(){return c()({mobile:"",code:"",res:"",time:60,isShow:!0,timer:null},"code","")},computed:{isweixin:function(){return"micromessenger"==navigator.userAgent.toLowerCase().match(/MicroMessenger/i)}},updated:function(){},mounted:function(){},created:function(){var e=this;return i()(o.a.mark(function t(){var a,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!(a=e.getUrlParam("code"))){t.next=8;break}return t.next=4,e.getOpenid(a);case 4:return n=t.sent,t.next=7,e.wLongin(n);case 7:t.sent;case 8:case"end":return t.stop()}},t,e)}))()},methods:{getOpenid:function(e){var t=this;return i()(o.a.mark(function a(){var n;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.$http.get("auth/wx/openid/"+e);case 2:return n=a.sent,a.abrupt("return",n.data.open_id);case 4:case"end":return a.stop()}},a,t)}))()},wLongin:function(e){var t=this;return i()(o.a.mark(function a(){var n,r;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,t.$http.post("auth/wx/login/"+e);case 2:if(40008!=(n=a.sent).code){a.next=7;break}t.$router.push({name:"bindPhone",params:{openid:e}}),a.next=18;break;case 7:if(200!=n.code){a.next=17;break}return localStorage.setItem("token",n.data.token),a.next=11,t.$http.get("auth/info");case 11:200==(r=a.sent).code&&(localStorage.setItem("nickname",r.data.nickname),localStorage.setItem("gender",r.data.gender),localStorage.setItem("avatar",r.data.avatar),localStorage.setItem("level",r.data.level)),localStorage.getItem("url")?window.location.href=localStorage.getItem("url"):setTimeout(function(){t.$router.push({name:"main"}),location.reload()},500),a.next=18;break;case 17:alert(n.msg);case 18:case"end":return a.stop()}},a,t)}))()},getUrlParam:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),a=window.location.search.substr(1).match(t);return null!=a?unescape(a[2]):null},getRequest:function(){window.location.href.replace(/[/]/g,"%2f").replace(/[:]/g,"%3a").replace(/[#]/g,"%23").replace(/[&]/g,"%26").replace(/[=]/g,"%3d");var e="https://www.morninghappy.cn/mh-mall-web-api/auth/wx/receive_code";e=location.href,e="https://www.morninghappy.cn/xz/index.html#/login",console.log(e),e=encodeURIComponent(e),console.log(e);var t="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb3f4414e7bfb9c9e&redirect_uri="+e+"&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect";return window.location.href=t,t},wechateLogin:function(){var e=this;return i()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.getRequest();case 1:case"end":return t.stop()}},t,e)}))()},getContent:function(){var e=iframe.contentWindow.document.getElementById("iToolCode");if(e){var t=e.innerHTML;t=t.replace(/<span.+?>/g,"").replace(/<\/span>/g,""),t=JSON.parse(t),this.res=t}else setTimeout(this.getContent,200)},login:function(){var e=this;return i()(o.a.mark(function t(){var a,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(/^\d{11}$/.test(e.mobile)){t.next=3;break}return Object(l.a)({className:"no-centent-dialog",message:"手机号码格式错误",confirmButtonText:"关闭",overlayStyle:{"background-color":"rgba(0,0,0,.5)"}}),t.abrupt("return",!1);case 3:return t.next=5,e.$http.post("auth/verification_code/login",{mobile:e.mobile,code:e.code});case 5:if(200!=(a=t.sent).code){t.next=16;break}return localStorage.setItem("token",a.data.token),t.next=10,e.$http.get("auth/info");case 10:200==(n=t.sent).code&&(localStorage.setItem("nickname",n.data.nickname||"手机用户"+n.data.mobile.substr(-4)),localStorage.setItem("gender",n.data.gender),localStorage.setItem("avatar",n.data.avatar),localStorage.setItem("level",n.data.level)),localStorage.getItem("url")?window.location.href=localStorage.getItem("url"):e.$router.push({name:"main"}),t.next=16;break;case 16:case"end":return t.stop()}},t,e)}))()},getValidCode:function(){var e=this;return i()(o.a.mark(function t(){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("sms/send/"+e.mobile+"/4");case 2:200==t.sent.code&&(e.isShow=!1,e.timer=setInterval(function(){e.$nextTick(function(){e.time--}),e.time<=0&&(e.isShow=!0,clearInterval(e.timer),e.timer=null,e.time=60)},1e3));case 4:case"end":return t.stop()}},t,e)}))()}}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"page-login"},[a("router-link",{staticClass:"back",attrs:{tag:"div",to:{name:"main"}}}),e._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"title",on:{click:e.wechateLogin}},[e._v("\n      手机号登录\n    ")]),e._v(" "),a("div",{staticClass:"input-box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.mobile,expression:"mobile"}],staticClass:"username",attrs:{type:"text",placeholder:"手机号"},domProps:{value:e.mobile},on:{input:function(t){t.target.composing||(e.mobile=t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.mobile,expression:"mobile"}],staticClass:"close",on:{click:function(t){e.mobile=""}}})]),e._v(" "),a("div",{staticClass:"input-box"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.code,expression:"code"}],staticClass:"password",attrs:{type:"text",placeholder:"验证码"},domProps:{value:e.code},on:{input:function(t){t.target.composing||(e.code=t.target.value)}}}),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:e.code,expression:"code"}],staticClass:"close",on:{click:function(t){e.code=""}}}),e._v(" "),a("div",{staticClass:"send-code"},[a("span",{directives:[{name:"show",rawName:"v-show",value:e.isShow,expression:"isShow"}],staticClass:"send",on:{click:e.getValidCode}},[e._v("发送验证码")]),e._v(" "),a("span",{directives:[{name:"show",rawName:"v-show",value:!e.isShow,expression:"!isShow"}],staticClass:"time"},[e._v(e._s(e.time)+"s")])])])]),e._v(" "),a("div",{staticClass:"login",on:{click:e.login}},[e._v("\n    同意协议并登陆\n  ")]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.isweixin,expression:"isweixin"}],staticClass:"wechat-login"},[a("div",{staticClass:"line"}),e._v(" "),a("div",{staticClass:"text"},[e._v("其它登录")]),e._v(" "),a("div",{staticClass:"line"})]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.isweixin,expression:"isweixin"}],staticClass:"wechat-icon",on:{click:e.wechateLogin}})],1)},staticRenderFns:[]};var m=a("VU/8")(u,d,!1,function(e){a("RAoZ"),a("xfAZ")},"data-v-333189cf",null);t.default=m.exports},xfAZ:function(e,t){}});
//# sourceMappingURL=3.70968816b037fcaf7134.js.map