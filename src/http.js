import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  
  baseURL: 'https://www.morninghappy.cn/mh-mall-web-api/'
  // baseURL: 'http://111.231.196.47:8089/mh-mall-web-api/'//process.env.VUE_APP_API_URL || '/admin/api',
  // baseURL: 'http://localhost:3000/admin/api'
})
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (localStorage.getItem('token')) {
    // config.headers.Authorization = 'Bearer ' + localStorage.token
    config.headers.token =  localStorage.getItem('token')
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
http.interceptors.response.use(res => {
  // if(res.code==200){   有些报错外面的http状态码仍然是200，code是500，所以，这种情况不会进入到第二个函数err里面
    return res.data
  // }
}, err => {
  // console.log(err)
  if (err.response.data.code == '401') {
    // Vue.prototype.$alert('身份信息无效或已过期，请重新登录', {
    //   confirmButtonText: '确定',
    //   callback: action => {
      console.log(router)
      var reg = new RegExp("(^|&)" + 'code' + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg);
      if(r&&r[2]){
        // alert('存在code')
        return
      }

      
    //   var Days = 30; 
    // var exp = new Date(); 
    // exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    // document.cookie = 'url' + "="+ escape (location.href) + ";expires=" + exp.toGMTString(); 
      localStorage.setItem('url',location.href)
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") {
        router.push('/wlogin')
      } else {
        router.push('/login')
      }
        // Vue.prototype.$message({
        //   type: 'error',
        //   message: '身份信息无效或已过期，请重新登录'
        // });
    //   }
    // });
    // Vue.prototype.$message({
    //   type: 'error',
    //   message: '身份信息过期或无效，请重新登录'
    // })
    return Promise.reject(err)
  }
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.msg
    })
    
    if (err.response.status === 401) {
      router.push('/login')
    }
  }
  
  return Promise.reject(err)
})

export default http