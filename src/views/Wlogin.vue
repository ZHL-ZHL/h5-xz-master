<template>
  <div></div>
</template>

<script>
import md5 from "js-md5";
import axios from "axios";

export default {
  data() {
    return {
      mobile: "",
      code: "",
      res: "",
      time: 60,
      isShow: true,
      timer: null,
      code: ""
    };
  },
  updated() {
    // alert('update'+location.href)
  },
  mounted() {
    // alert('mounted'+location.href)
  },
  async created() {
    let code = this.getUrlParam("code");
    // alert(code)
    if (code) {
      let openid = await this.getOpenid(code);
      // alert(`openid: ${openid}`)
      let res = await this.wLongin(openid);
    } else {
      this.wechateLogin();
    }
  },
  methods: {
    setCookie(name, value) {
      var Days = 30;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
      document.cookie =
        name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },

    //读取cookies
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },

    //删除cookies
    delCookie(name) {
      var exp = new Date();
      exp.setTime(exp.getTime() - 1);
      var cval = getCookie(name);
      if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    },

    getContent() {
      let ele = iframe.contentWindow.document.getElementById("iToolCode");
      // console.log( iframe.contentWindow.document.getElementById('t').innerHTML )
      if (!ele) {
        // n++;
        setTimeout(this.getContent, 200);
      } else {
        let res = ele.innerHTML;
        res = res.replace(/<span.+?>/g, "").replace(/<\/span>/g, "");
        // alert(res);
        res = JSON.parse(res);
        this.res = res;
        // alert(res.data.open_id);
      }
    },
    async login() {
      if (!/^\d{11}$/.test(this.mobile)) {
        return false;
      }
      const res = await this.$http.post("auth/verification_code/login", {
        mobile: this.mobile,
        code: this.code
      });
      if (res.code == 200) {
        // this.$message({
        //   type: "success",
        //   message: "登录成功"
        // });
        localStorage.setItem("token", res.data.token);
        let res2 = await this.$http.get(`auth/info`);
        if (res2.code == 200) {
          localStorage.setItem(
            "nickname",
            res2.data.nickname || `手机用户${res2.data.mobile.substr(-4)}`
          );
          localStorage.setItem("gender", res2.data.gender);
          localStorage.setItem("avatar", res2.data.avatar);
          localStorage.setItem("level", res2.data.level);
        }
        this.$router.push({ name: 'main' })
      } else {
        // this.$message({
        //   type: "error",
        //   message: res.data.msg
        // });
      }
    },

    async getValidCode() {
      const res = await this.$http.get(`sms/send/${this.mobile}/4`);
      if (res.code == 200) {
        this.isShow = false;
        this.timer = setInterval(() => {
          this.$nextTick(() => {
            this.time--;
          });

          if (this.time <= 0) {
            this.isShow = true;
            clearInterval(this.timer);
            this.timer = null;
            this.time = 60;
          }
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page-login {
  height: 100vh;
  width: 101vw; //这个地方如果不设置101vw,右上位置的背景图片会有一个小小的白色间隙
  background: url("../assets/img/login-2x.png") no-repeat;
  background-size: cover;
  position: relative;
  padding: 40px 60px 0;
  .back {
    width: 72px;
    height: 67px;
    background: url("../assets/img/return.png") no-repeat;
    background-size: cover;
    position: absolute;
    top: 40px;
    left: 0px;
  }
  .container {
    // width: 630px;
    .title {
      font-size: 60px;
      // margin: 0 auto;
      text-align: center;
      color: #fff;
      margin-bottom: 122px;
    }
    .input-box {
      width: 100%;
      position: relative;
      margin-bottom: 88px;
      input {
        width: 100%;
        border: none;
        background: transparent;
        color: #fff;
        font-size: 28px;
        line-height: 3em;
        border-bottom: 1px solid #4f19a2;
      }
      .close {
        width: 40px;
        height: 40px;
        background: url("../assets/img/close.png") no-repeat;
        background-size: contain;
        border-radius: 50%;
        position: absolute;
        right: 0px;
        bottom: 28px;
      }
      .send-code {
        color: #a19ab9;
        font-size: 28px;
        position: absolute;
        right: 68px;
        bottom: 28px;
      }
    }
  }
  .login {
    width: 690px;
    height: 96px;
    margin: 0 -30px;
    background: linear-gradient(
      90deg,
      rgba(72, 197, 255, 1),
      rgba(144, 77, 255, 1)
    );
    border-radius: 0px 48px 48px 72px;
    font-size: 36px;
    // font-family:PingFang SC;
    // font-weight:bold;
    color: rgba(255, 255, 255, 1);
    line-height: 96px;
    text-align: center;
  }
  .wechat-login {
    position: relative;
    margin: 125px 100px 0;
    display: flex;
    .text {
      color: #9c8dbe;
      font-size: 26px;
      width: 170px;
      // flex: 1;
      text-align: center;
      // z-index: 100;
    }
    .line {
      width: 145px;
      height: 3px;
      background: rgba(79, 25, 162, 1);
      margin-top: 11px;
    }
  }
  .wechat-icon {
    height: 60px;
    width: 60px;
    margin-left: 285px;
    margin-top: 50px;
    background: url("../assets/img/wechat.png") no-repeat;
    background-size: contain;
  }
}
</style>