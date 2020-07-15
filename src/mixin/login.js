let login = {
  async created() {
    let code = this.getUrlParam('code') 
    if (code) {
      let openid = await this.getOpenid(code)
      // alert(`openid: ${openid}`)
      let res = await this.wLongin(openid)
    } else {
      // this.wechateLogin()
    }
  },
  methods: {
    getUrlParam(name) {//封装方法
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    },
    async getOpenid(code) { 
      const res = await this.$http.get(`auth/wx/openid/${code}`); 
      // alert(res.data.open_id)
      return res.data.open_id
    },
    async wLongin(openid) { 
      let res = await this.$http.post(`auth/wx/login/${openid}`);  
      if (res.code == 40008) {
        this.$router.push({ name: 'bindPhone', params: { openid } })
      } else if (res.code == 200) {  
        localStorage.setItem('token', res.data.token)

        let res2 = await this.$http.get(`auth/info`) 
        if (res2.code == 200) {
          localStorage.setItem('nickname', res2.data.nickname)
          localStorage.setItem('gender', res2.data.gender) 
          localStorage.setItem('avatar', res2.data.avatar)
          localStorage.setItem('level', res2.data.level)
        }
        let url = this.getCookie('url')
        // alert('url2:'+url) 
        if (url) {
          window.location.href = localStorage.getItem('url')
        } else {
          setTimeout(() => {
            this.$router.push({ name: "main" }),
              location.reload()
          }, 500);
          // window.location.href = window.location.origin + '/#/mian'
        } 

      } else {
        alert(res.msg)
      }

    },
    getUrlParam(name) {//封装方法
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    },
    getRequest() {
      // if (getRequest.code) {
      //   this.code = getRequest.code;
      // } else {
      var pageUrl = window.location.href
        .replace(/[/]/g, "%2f")
        .replace(/[:]/g, "%3a")
        .replace(/[#]/g, "%23")
        .replace(/[&]/g, "%26")
        .replace(/[=]/g, "%3d");
      let reurl = 'https://www.morninghappy.cn/mh-mall-web-api/auth/wx/receive_code';
      reurl = location.href
      reurl = localStorage.getItem('url')//'https://www.morninghappy.cn/xz/index.html#/wlogin'
      // alert(reurl)
      // reurl= encodeURI(reurl)
      reurl = encodeURIComponent(reurl)
      // reurl = reurl.replace(/[/]/g, "%2f")
      // .replace(/[:]/g, "%3a")
      // .replace(/[#]/g, "%23")
      // .replace(/[&]/g, "%26")
      // .replace(/[=]/g, "%3d");
      console.log(reurl)
      let url1 = this.getCookie('url')
      // alert('url1:'+url1)
      // alert('url3:'+localStorage.getItem('url'))
      var url =
        `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb3f4414e7bfb9c9e&redirect_uri=${reurl}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`;
      // alert(url)
      window.location.href = url;
      return url;
      // }
    },
    async wechateLogin() {
      //  alert(333333)
      let url = this.getRequest();
      console.log(url)

      // alert(url)
      // var iframe = document.getElementById('iframe');
      // console.log(iframe.contentWindow.document)
      // iframe.contentWindow.location=url;
      // this.getContent()

      // alert( iframe.contentWindow )
      // alert( iframe.contentWindow.document.getElementById('iToolCode').innerHTML )
      // console.log(iframe)

      // window.location.href = url;
      // alert(url)
      //  axios.get(url).then(r=>{
      //    alert(r)
      //  },e=>{
      //    alert(e)
      //  })
      // alert(res)
      // console.log(res)

      // fetch(url, {
      //     method: 'GET'
      // })
      // .then((res)=>{
      //   return res.json();
      // })
      // .then((res)=>{
      //   alert(res) // res是最终的结果
      // }).catch(r=>alert(r))

      // alert( JSON.stringify(res) )
      // alert( res.data.openid )
    },
  }
}

export default login