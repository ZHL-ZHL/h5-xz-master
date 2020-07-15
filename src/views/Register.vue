<template>
  <div class="login-box">
    <input class="username" type="text" v-model="username" placeholder="请输入用户名" />

    <input class="password" type="text" v-model="password" placeholder="请输入密码" />
    <input class="password" type="text" v-model="repassword" placeholder="再次输入密码" />
    <input class="password" type="text" v-model="mobile" placeholder="请输入手机号" /><button @click="sendRegValid">发送验证码</button>
    <input class="password" type="text" v-model="code" placeholder="验证码" />

    <button @click="register">登录</button>
  </div>
</template>

<script>
import md5 from 'js-md5';

export default {
  data() {
    return {
      username: "小名2",
      password: "111111",
      repassword: "111111",
      mobile:'',
      code:'',

    };
  },
  
  methods: {
    async register() {
      let pwd = md5(this.password);
      const res = await this.$http.post("auth/register", {
        username: this.username,
        password: pwd,
        mobile:this.mobile,
        code:this.code
      });
      // sessionStorage.token = res.data.token

      if (res.code == 200) {
        // this.$message({
        //   type: "success",
        //   message: "登录成功"
        // });
       console.log('成功')
      } else {
       console.log('失败')

        // this.$message({
        //   type: "error",
        //   message: res.data.msg
        // });
      }
      // this.$router.push('/auth/login')
    },
    async sendRegValid(){
      const res = await this.$http.get(`sms/send/${this.mobile}/1`);
      if(res.msg='Success'){
        
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.login-box{
    width: 100vw;
    padding: 40px;
    input{display: block;width: 100%;height: 60px;}
    .username{
        
    }
}
</style>