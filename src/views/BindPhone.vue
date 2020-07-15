<template>
  <div class="page-login">
    <router-link tag="div" :to="{name:'main'}" class="back"></router-link>
    <div class="container">
      <div class="title">
        绑定手机号
      </div>
      <div class="input-box">
        <input class="username" type="tel" v-model="mobile" placeholder="手机号" />
        <span v-show="mobile" @click="mobile=''" class="close"></span>
      </div>
      <div class="input-box">
        <input class="password" type="number" v-model="code" placeholder="验证码" />
        <span v-show="code" @click="code=''" class="close"></span>
        <div class="send-code"><span @click="getValidCode" v-show="isShow" class="send">发送验证码</span>  <span v-show="!isShow" class="time">{{time}}s</span></div>
      </div>
    </div>
    <div @click="bind" class="login">
      绑定
    </div>

    <!-- <div class="wechat-login">
      <div class="line"></div>
      <div class="text">其它登录</div>
      <div class="line"></div>
    </div>
    <div @click="wechateLogin"  class="wechat-icon">
      
    </div> -->
    
      
  </div>
</template>

<script>
import md5 from 'js-md5';
import axios from 'axios'

export default {
  props:{
    openid:'',
  },
  data() {
    return {
      mobile: '',
      code: '',
      res:'',
      time:60,
      isShow:true,
      timer:null,
      code:''
    };
  },
  updated(){
    // alert('update'+location.href)
  },
  mounted(){
    // alert('mounted'+location.href)
    
  },
  async created(){
    let code = this.getUrlParam('code')
    if(code){
      let openid = await this.getOpenid(code)
      // alert(`openid: ${openid}`)
       let res = await this.wLongin(openid);
       
    }
  },

  methods: {
    async bind(code){
      if(!/^\d{11}$/.test(this.mobile)){
        this.$dialog.alert({
          message: '请输入正确的手机号',
        }).then(() => {
              
          // on close
        })
        return false
      }
      // alert(this.openid)
      const res = await this.$http.post(`auth/wx/bind_phone`,{
        "code": this.code,
        "mobile": this.mobile,
        "openid": this.openid
      });
      // alert(res.msg)
      if(res.code==200){
        let res = await this.$http.post(`auth/wx/login/${this.openid}`);
        // alert(res.code)
        // alert(res.msg)
        if(res.code == 200){
          localStorage.setItem('token',res.data.token)
          let url = localStorage.getItem('url');
          if(url){
            window.location.href = localStorage.getItem('url');
          }else{
            this.$router.push({name:'main'})
          }
        }else{
          alert(res.msg)
        }
        
      }
      // alert(res.data.open_id)
      // return res.data.open_id
    },
    
    
   
    async getValidCode(){
      if(!/^\d{11}$/.test(this.mobile)){
        this.$dialog.alert({
          message: '请输入正确的手机号',
        }).then(() => {
              
          // on close
        })
        return false
      }
      const res = await this.$http.get(`sms/send/${this.mobile}/3`);
      if( res.code == 200 ){
        this.isShow = false;
        this.timer = setInterval(() => {
          this.$nextTick(()=>{
            this.time--;
          })
          
          if(this.time<=0){
            this.isShow = true
            clearInterval(this.timer)
            this.timer = null;
            this.time=60;
          }
        }, 1000);
      }

    },
    // async login() {
    //   let pwd = md5(this.password);
    //   const res = await this.$http.post("auth/login", {
    //     username: this.username,
    //     password: pwd
    //   });
    //   // sessionStorage.token = res.data.token

    //   if (res.code == 200) {
    //     // this.$message({
    //     //   type: "success",
    //     //   message: "登录成功"
    //     // });
    //     localStorage.setItem("token", res.data.token);
    //     localStorage.setItem("name", this.username);
    //     let userInfo = await this.$http.get("auth/info")
    //     localStorage.setItem('info',JSON.stringify(userInfo.data))
    //     this.$router.push("/");
    //   } else {
    //     // this.$message({
    //     //   type: "error",
    //     //   message: res.data.msg
    //     // });
    //   }
    //   // this.$router.push('/auth/login')
    // }
  }
};
</script>

<style lang="scss" scoped>
.page-login{
  height: 100vh;
  width: 101vw; //这个地方如果不设置101vw,右上位置的背景图片会有一个小小的白色间隙
  background: url('../assets/img/login-2x.png') no-repeat;
  background-size: cover;
  position: relative;
  padding: 40px 60px 0;
  .back{
    width:72px;
    height:67px;
    background: url('../assets/img/return.png') no-repeat;
    background-size: cover;
    position: absolute;
    top:40px;
    left: 0px;
  }
  .container{
    // width: 630px;
    .title{
      font-size: 60px;
      // margin: 0 auto;
      text-align: center;
      line-height: 67px;
      height: 67px;
      color: #fff;
      margin-bottom: 122px;
    }
    .input-box{
      width: 100%;
      position: relative;
      margin-bottom: 88px;
      input{
        width: 100%;
        border: none;background: transparent;color:#fff;font-size: 28px;line-height: 3em;
        border-bottom: 1px solid #4F19A2;
      }
      .close{
        width:40px;
        height:40px;
        background: url('../assets/img/close.png') no-repeat;
        background-size: contain;
        border-radius:50%;
        position: absolute;
        right: 0px;
        bottom:28px;
      }
      .send-code{
        color: #A19AB9;
        font-size: 28px;
        position: absolute;
        right: 100px;
        bottom: 28px;
      }
    }
  }
  .login{
    width:690px;
    height:96px;
    margin:0 -30px;
    background:linear-gradient(90deg,rgba(72,197,255,1),rgba(144,77,255,1));
    border-radius:0px 48px 48px 72px;
    font-size:36px;
    // font-family:PingFang SC;
    // font-weight:bold;
    color:rgba(255,255,255,1);
    line-height:96px;
    text-align: center;
  }
  .wechat-login{
    position: relative;
    margin:125px 100px 0;
    display: flex;
    .text{
      color:#9C8DBE;
      font-size: 26px;
      width: 170px;
      // flex: 1;
      text-align: center;
      // z-index: 100;
    }
    .line{
      width:145px;
      height:3px;
      background:rgba(79,25,162,1);
      margin-top: 11px;
    }
   
  }
   .wechat-icon{
      height: 60px;
      width: 60px;
      margin-left: 285px;
      margin-top: 50px;
      background: url('../assets/img/wechat.png') no-repeat;
      background-size: contain;
    }
}
</style>