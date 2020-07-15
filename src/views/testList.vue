<template>
  <div class="hello">
    <Header></Header>
    <!-- <div class="main">
      <div class="rotate-section">
        <div class="text-box"></div>
        <div class="rotate-img"></div>
      </div>
      <div class="list">
        <div
          tag="div"
          v-for="(item,index) in cards"
          :key="index"
          :class="{on:activeIndex==index}"
          @click="activeIndex=index"
          class="item"
        >  
          <div class="text" @click="toDetail(item.id)">{{item.title}}</div>
          <span @click="toDetail(item.id)" class="iconfont icon-arr-right"></span> 
          
        </div> 
      </div> 
    </div>-->
    <div class="main">
      <div class="list">
        <div class="item" v-for="(item,index) in cards" :key="index">
          <div class="button" @click="toDetail(item.card_id)">查看报告</div>
          <div class="title">{{item.level2_category_name}}</div>
          <div class="date">完成时间：{{formatDate(item.create_at)}}</div>
          <!-- <div class="number">
            订单编号：
            <span>645866922020031</span>
            <i>复制</i>
          </div>-->
        </div>
        <div class="bottom-line">
          <div class="left"></div>
          <div class="center">我是有底线的</div>
          <div class="right"></div>
        </div>
      </div>
    </div>
    <!-- <Card v-else></Card> -->
    <Footer  :my="true"></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "./CardRecords";
export default {
  data() {
    return {
      pageIndex: 1,
      pageSize: 1000,
      cards: [],
      activeIndex: null
    };
  },
  methods: {
    formatDate(datetime) {
      var date = new Date(datetime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var year = date.getFullYear(),
        month = ("0" + (date.getMonth() + 1)).slice(-2),
        sdate = ("0" + date.getDate()).slice(-2),
        hour = ("0" + date.getHours()).slice(-2),
        minute = ("0" + date.getMinutes()).slice(-2),
        second = ("0" + date.getSeconds()).slice(-2);
      // 拼接
      var result =
        year +
        "-" +
        month +
        "-" +
        sdate +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;
      // 返回
      return result;
    },
    async fetch() {
      const res = await this.$http.get("card/record/page", {
        params: { page_index: this.pageIndex, page_size: this.pageSize }
      });
      this.pageLoaded = true;
      if (res.code == 200) {
        this.cards = res.data.result;
      }
    },
    toDetail(id) {
      this.$router.push({
        name: "CardRecordsItem",
        params: { type: "norandom", id: id}
      });
    }
  },
  mounted() {
    this.fetch();
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style  lang="scss"  scoped>
// .main {
//   background: #270e3b;
//   height: 100vh;
//   background: url("../assets/img/BG.jpg") no-repeat;
// }
// .rotate-section {
//   height: 545px;
//   padding: 40px 0;
//   position: relative;
//   // background: #270E3B;
//   .text-box {
//     position: absolute;
//     top: 134px;
//     left: 106px;
//     width: 520px;
//     height: 244px;
//     background: url("../assets/img/main-title.png") no-repeat;
//     background-size: contain;
//   }
//   .rotate-img {
//     position: absolute;
//     top: 40px;
//     left: 142px;
//     width: 465px;
//     height: 465px;
//     background: url("../assets/img/xinpan.png") no-repeat;
//     background-size: contain;
//     animation: circle 24s infinite linear;
//   }
//   @keyframes circle {
//     0% {
//       transform: rotate(0deg);
//     }
//     100% {
//       transform: rotate(-360deg);
//     }
//   }
// }

// .list {
//   .item {
//     background: #2e1148;
//     display: flex;
//     padding: 35px 30px;
//     line-height: normal;
//     border-bottom: 1px solid #321a4c;
//     &:last-child {
//       border: none;
//     }
//     i {
//       display: inline-block;
//       color: #f7c770;
//       font-size: 34px;
//       line-height: 34px;
//       vertical-align: top;
//       width: 60px;
//       // margin-right: 20px;
//       &.icon-lishi {
//         font-size: 44px;
//         line-height: 44px;
//         // margin-right: 8px;
//       }
//       // width: 35px;
//     }
//     .text {
//       font-size: 34px;
//       line-height: 34px;
//       color: #fff;
//       flex: 1;
//     }
//     span {
//       font-size: 34px;
//       color: #bda6da;
//     }
//   }
// }

.main {
  background: #270e3b;
  height: calc(100vh - 110px);
  overflow-y: auto;
  // padding-top: 80px;
  // background: url('../assets/img/icon-star.png') no-repeat;

  .list {
    padding:40px 0px;
    border-top: 1px solid rgb(81, 51, 115);
    .item {
      position: relative;
      height: 150px;
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
