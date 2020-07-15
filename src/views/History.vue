<template>
  <div class="hello">
    <Header></Header>
    <div class="main">
      <div class="list">
        <div class="item">
          <div class="button">查看报告</div>
          <div class="title">疫情期间心理健康自评量表</div>
          <div class="date">完成时间：2020年3月18日 18:1</div>
          <div class="number">
            订单编号：
            <span>645866922020031</span>
            <i>复制</i>
          </div>
        </div>
        <div class="item">
          <div class="button">查看报告</div>
          <div class="title">疫情期间心理健康自评量表</div>
          <div class="date">完成时间：2020年3月18日 18:1</div>
          <div class="number">
            订单编号：
            <span>645866922020031</span>
            <i>复制</i>
          </div>
        </div>
        <div class="bottom-line">
          <div class="left"></div>
          <div class="center">我是有底线的</div>
          <div class="right"></div>
        </div>
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
      info: {}
    };
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      let info = localStorage.getItem("info");
      info = JSON.parse(info);
      this.info = info;
      console.log(this.info);
      // 这里可能需要判断info是否info是否存在
    }
  }
};
</script>

<style  lang="scss"  scoped>
.main {
  background: #270e3b;
  height: calc(100vh - 110px);
  // padding-top: 80px;
  // background: url('../assets/img/icon-star.png') no-repeat;

  .list {
    border-top: 1px solid rgb(81, 51, 115);
    
    .item {
      position: relative;
      height: 240px;
      margin-bottom: 30px;
      padding: 30px;
      background: #3b1a62;
      .title {
        font-size: 28px;
        line-height: 28px;
        color: #fff;
      }
      .date {
        font-size: 26px;
        line-height: 26px;
        color: #ab76dc;
        margin: 53px 0 16px;
      }
      .number {
        font-size: 24px;
        line-height: 24px;
        color: #ab76dc;
        span {
          color: #ddd;
        }
        i {
          color: #ddd;
          font-style: normal;
          border: 1px solid #ddd;
          margin-left: 15px;
          padding: 4px 14px;
          display: inline-block;
        }
      }
      .button {
        color: #ab76dc;
        font-size: 24px;
        width: 152px;
        height: 52px;
        line-height: 46px;
        text-align: center;
        border: 3px solid #ab76dc;
        // background:rgba(252,223,201,1);
        border-radius: 26px;
        position: absolute;
        top: 70px;
        right: 30px;
      }
    }
    .bottom-line {
      height: 33px;
      padding: 0 30px;
      display: flex;
      .left,
      .right {
        border-bottom: 1px solid #999;
        width: 250px;
        height: 16px;
        flex: 1;
      }
      .center {
        margin: 0 25px;
        font-size: 24px;
        color: #999;
      }
    }
  }
}
</style>
