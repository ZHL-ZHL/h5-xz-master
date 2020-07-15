<template>
  <div class="hello">
    <Header></Header>
    <div class="main">
      <div class="top"></div>
      <div class="bottom"></div>
    </div>
    <div class="msg-container msg-1" v-show="toggle">
      <div class="msg-list list1">
        <div v-for="(item,index) in list1" :key="index" class="item">{{item.content}}</div>
      </div>
      <div class="msg-list list2">
        <div v-for="(item,index) in list2" :key="index" class="item">{{item.content}}</div>
      </div>
      <div class="msg-list list3">
        <div v-for="(item,index) in list3" :key="index" class="item">{{item.content}}</div>
      </div>
      <div class="msg-box">
        <input
          class="msg-text"
          ref="input1"
          type="text"
          v-model="content"
          @click="showmsg2"
          @blur="adjustmsg1"
          placeholder="请诚心输入你的留言"
        />
        <span @click="showmsg3">确认</span>
      </div>
    </div>
    <div class="msg-container msg-2" v-show="!toggle">
      <div class="msg-list list1">
        <div v-for="(item,index) in list1" :key="index" class="item">{{item.content}}</div>
      </div>
      <div class="msg-list list2">
        <div v-for="(item,index) in list2" :key="index" class="item">{{item.content}}</div>
      </div>
      <div class="msg-list list3">
        <div v-for="(item,index) in list3" :key="index" class="item">{{item.content}}</div>
      </div>
      <div class="msg-box">
        <input
          class="msg-text"
          ref="input2"
          type="text"
          v-model="content"
          @focus="toggle=false"
          @blur="adjust"
          placeholder="请诚心输入你的留言"
        />
        <span @click="sendMsg">确认</span>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  data() {
    return {
      toggle: true,
      pageIndex: 1,
      pageSize: 100,
      content: "",
      msgs: [],
      ifSend: false,
      list1: [],
      list2: [],
      list3: []
    };
  },
  beforeRouteEnter(to, from, next) {
    var u = navigator.userAgent;
    if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
      next("messageAndriod");
    } else {
      next();
    }

    // if(this.isAndroid){
    //   this.$router.push('home')
    // }else{
    //   next()
    // }

    // next()
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    this.getMsgList();
    // window.scrollBy(0, 20 )

    // window.scrollBy(0, 0 )
    // document.body.srollTop = 9200;
    // alert(document.body.srollTop)
  },
  methods: {
    // 判断安卓
    isAndroid() {
      var u = navigator.userAgent;
      if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        return true;
      }
      return false;
    },
    // 判断设备为 ios
    isIos() {
      var u = navigator.userAgent;
      if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
        return true;
      }
      return false;
    },
    showmsg2() {
      this.toggle = false;
      // debugger
      setTimeout(() => {
        this.$refs.input2.focus();
        this.toggle = false;
        // window.scrollBy(0, -200 )
      }, 310);
      this.$refs.input2.focus();
      // this.$refs.input2.scrollIntoView()
    },
    showmsg3() {
      if(!this.content){
        return
      }
      this.toggle = false;
      // debugger
      setTimeout(() => {
        this.$refs.input2.focus();
        this.toggle = false;
        // window.scrollBy(0, -200 )
      }, 310);
      this.$refs.input2.focus();
      // this.$refs.input2.scrollIntoView()
    },
    adjust() {
      //防止页面收缩出现黑边
      // this.toggle = true;
      setTimeout(() => {
        window.scrollBy(0, -200);
        // if(document.activeElement)
        // if(!this.ifSend){
        //   this.toggle = true;
        // }
        this.toggle = true;
      }, 1000);
    },
    adjustmsg1() {
      //☆防止页面收缩出现黑边
      // this.toggle = true;
      setTimeout(() => {
        window.scrollBy(0, -200);
        // if(document.activeElement)
        // if(!this.ifSend){
        //   this.toggle = true;
        // }
        //  this.toggle = true;
      }, 10);
    },
    adjust2() {
      //防止页面收缩出现黑边
      setTimeout(() => {
        window.scrollBy(0, -200);
      }, 10);
    },
    async sendMsg() {
      // debugger
      if(!this.content){
        return
      }
      const res = await this.$http.post("message/create", {
        content: this.content
      });
      console.log(res.data);
      if (res.code == 200) {
        this.content = "";
        this.toggle = true;
        this.ifSend = true;
        // this.cards=res.data.result
      }
    },
    async getMsgList() {
      const res = await this.$http.get("message/page", {
        params: { page_index: this.pageIndex, page_size: this.pageSize }
      });
      console.log(res.data);
      if (res.code == 200) {
        this.msgs = res.data.result;
        // this.msgs= [1,2,3,4,5,6]
        let len = Math.floor(this.msgs.length / 3);
        this.list1 = this.msgs.slice(0, len);
        console.log(this.list1);
        // this.list1 = [ ...this.list1,...this.list1,...this.list1,...this.list1,...this.list1,...this.list1,]
        this.list2 = this.msgs.slice(len, len * 2);
        console.log(this.list2);
        // this.list2 = [ ...this.list2,...this.list2,...this.list2,...this.list2,...this.list2,...this.list2,]
        this.list3 = this.msgs.slice(len * 2, len * 3);
        console.log(this.list3);
        // this.list3 = [ ...this.list3,...this.list3,...this.list3,...this.list3,...this.list3,...this.list3,]
        // this.msgs =[ ...this.msgs,...this.msgs,...this.msgs,...this.msgs,...this.msgs,...this.msgs,]
        // this.cards=res.data.result
      }
    }
  }
};
</script>

<style  lang="scss"  scoped>
.main {
  background: #270e3b;
  // height: 100vh;
  height: calc(100vh - 110px);
  position: relative;
  
}
.top {
  height: 90vh;
  width: 100vw;
  background: url("../../static/nw.png") no-repeat;
  // linear-gradient(rgb(48, 22, 88) 0%,rgba(62, 34, 103, 1) 50%,rgb(27, 8, 56) 100%);
  background-size: 100%;
}
// .bottombackground {
//   background: linear-gradient(
//     rgb(48, 22, 88) 0%,
//     rgba(62, 34, 103, 1) 50%,
//     rgb(27, 8, 56) 100%
//   );
//   height: 50px;
// }
@keyframes rowup {
  0% {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-3000px, 0, 0);
  }
}
.msg-container {
  width: 100vw;
  padding-top: 30px;
  position: absolute; 
  // background-image: linear-gradient(to top, rgba(255,0,0,1), rgba(255,0,0,0.2));
  &.msg-1 {
    bottom: 110px;
    overflow: hidden;
  }

  // top:100px;
  &.msg-2 {
    // bottom:110px;
    top: 100px;
    overflow: hidden;
  }
  .msg-list {
    height: 58px;
    width: 10000px;
    padding-left: 30px;
    margin-bottom: 30px;
    animation: 30s rowup linear infinite normal;
    &.list2 {
      animation: 40s rowup linear infinite normal;
    }
    &.list2 {
      animation: 50s rowup linear infinite normal;
    }
    .item {
      display: inline-block;
      padding: 9px 44px;
      background: rgba(62, 34, 103, 1);
      font-size: 28px;
      line-height: 40px;
      color: #af90e1;
      margin: 0 35px 0px 0;
      border-radius: 29px;
    }
  }
}
.msg-box {
  padding: 30px;
  display: flex;
  // position: absolute;
  // bottom: 0;
  width: 100vw;
  background: #502e7f;
  input {
    display: block;
    line-height: 80px;
    height: 80px;
    vertical-align: top;
    border: none;
    font-size: 36px;
    padding-left: 20px;
    flex: 1;
  }
  span {
    display: inline-block;
    height: 80px;
    width: 136px;
    font-size: 36px;
    border-radius: 6px;
    color: #fefefe;
    line-height: 80px;
    text-align: center;
    vertical-align: top;
    background: #51247b;
  }
}
// }
</style>
