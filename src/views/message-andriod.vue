<template>
  <div class="hello">
    <Header></Header>
    <div class="main">
      <!-- <div class="top"></div> -->
      <div class="bottom">
        
      </div>
      
      
    </div>
    <div class="msg-container">
        <div class="msg-list list1">
          <div v-for="(item,index) in msgs" :key="index" class="item">{{item.content}}</div>
        </div>
        <div class="msg-list list2">
          <div v-for="i in 10" :key="i" class="item">近期能否升值加薪2</div>
        </div>
        <div class="msg-list list3">
          <div v-for="i in 10" :key="i" class="item">近期能否升值加薪3</div>
        </div>
        <div class="msg-box">
          <input class="msg-text" type="text" v-model="content" @focus="adjust" placeholder="请诚心输入你的留言"><span @click="sendMsg">确认</span>
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
      pageIndex:1,
      pageSize:100,
      content:'',
      msgs:[],
    };
  },
  components: {
    Header,
    Footer
  },
  mounted(){
    this.getMsgList();
    // window.scrollBy(0, 20 )
    
    // window.scrollBy(0, 0 )
    // document.body.srollTop = 9200;
    // alert(document.body.srollTop)
  },
  methods:{
    adjust(){  //防止页面收缩出现黑边
      // setTimeout(()=>{
      //   window.scrollBy(0, -200 )
      // },10) 
    },
    async sendMsg(){
        const res = await this.$http.post("message/create",{content:this.content});
        console.log(res.data)
        if(res.code==200){
          this.content=''
          // this.cards=res.data.result
        }
    },
    async getMsgList(){
        const res = await this.$http.get("message/page",{params:{page_index:this.pageIndex,page_size:this.pageSize}});
        console.log(res.data)
        if(res.code==200){
          this.msgs=res.data.result
          this.msgs =[ ...this.msgs,...this.msgs,...this.msgs,...this.msgs,...this.msgs,...this.msgs,]
          // this.cards=res.data.result
        }
    },
  },
};
</script>

<style  lang="scss"  scoped>
.main {
  background: #270e3b;
  // height: 100vh;
  height: calc(100vh - 110px );
  position: relative;
}
  .top{
    height: 90vw;
    width: 90vw;
    margin-left: 5vw;
    margin-bottom: 34px;
     background: url('../assets/img/nw.png') no-repeat;
     background-size: contain;
     background-position: center;
  }
  @keyframes rowup {
    0% {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(-3000px, 0, 0);
    }
  }
  .msg-container{
    width: 100vw;
    padding-top: 30px;
    position: absolute;
    bottom:110px;
    .msg-list{
      height: 58px;
      width: 10000px;
      padding-left: 30px;
      margin-bottom: 30px;
      animation: 30s rowup linear infinite normal;
      &.list2{animation: 40s rowup linear infinite normal;}
      &.list2{animation: 50s rowup linear infinite normal;}
      .item{
        display: inline-block;
        padding: 9px 44px;
        background:rgba(62,34,103,1);
        font-size: 28px;
        line-height: 40px;
        color: #AF90E1;
        margin: 0 35px 0px 0;
        border-radius: 29px;
      }
    }
  }
  .msg-box{
    padding: 30px;
    display: flex;
    // position: absolute;
    // bottom: 0;
    width: 100vw;
    background: #502E7F;
    input{
      display: block;
      line-height: 80px;
      height: 80px;
      vertical-align: top;
      border:none;
      font-size: 36px;
      padding-left: 20px;
      flex: 1;
    }
    span{
      display: inline-block;
      height: 80px;
      width: 136px;
      font-size: 36px;
      border-radius: 6px;
      color: #fefefe;
      line-height: 80px;
      text-align: center;
      vertical-align: top;
      background: #51247B;
    }
  }
// }
</style>
