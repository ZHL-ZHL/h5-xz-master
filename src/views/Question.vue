<template>
  <div class="hello">
    <Header></Header>
    <div class="main">
      
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  data() {
    return {};
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style  lang="scss"  scoped>
.main {
  background: #270e3b;
  height: 100vh;
  padding-top: 80px;
  .my {
    text-align: center;
    .avatar {
      display: inline-block;
      width: 186px;
      height: 186px;
      margin: 0 0 30px;
      background: chartreuse;
    }
    .name {
      height: 50px;
      span {
        font-size: 36px;
        line-height: 50px;
        color: #fff;
      }
    }
    .level {
      margin: 25px 0 115px 0;
      span {
        font-size: 22px;
        color: #3c1d63;
        padding: 8px 30px;

        border-radius: 19px;
        &.level-4 {
          background: linear-gradient(
            90deg,
            rgba(255, 224, 158, 1) 0%,
            rgba(245, 193, 100, 1) 100%
          );
        }
        &.level-3 {
          background:linear-gradient(90deg,rgba(225,228,229,1) 0%,rgba(170,176,181,1) 100%);
        }
        &.level-2 {
          background:linear-gradient(90deg,rgba(255,220,188,1) 0%,rgba(255,195,142,1) 100%);
        }
        &.level-1 {
          background:rgba(174,123,238,1);
          color: #fff;
        }
      }
    }
  }
  .list {
    .item {
      background: #2e1148;
      display: flex;
      padding: 35px 30px;
      .icon {
        color: #f7c770;
        width: 35px;
      }
      .text {
        font-size: 34px;
        color: #fff;
        flex: 1;
      }
      .arrow {
        font-size: 34px;
        color: #fff;
      }
    }
  }
}
</style>
