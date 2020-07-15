<template>
  <div class="hello">
    <Header></Header>
    <div v-if="!isFinished" class="main">
      <div class="rotate-section">
        <div class="text-box"></div>
        <div class="rotate-img"></div>
      </div>
      <div class="star-cards">
        <div
          v-for="(item,index) in cards"
          :key="index"
          :class="{on:activeIndex==index}"
          @click="activeIndex=index"
          class="card-item"
        >
          <div class="card-icon">
            <img :src="item.icon" alt />
          </div>
          <div class="card-des">
            <div class="star-name">{{item.title}}</div>
          </div>
          <div class="card-button" v-show="activeIndex == index">
            <div class="button-icon"  @click="toDetail(index,item.id)"></div>
            <!-- <div class="button-txt">做测试</div> -->
          </div>
        </div>
      </div>
    </div>
    <Card v-else></Card>
    <Footer></Footer>
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
      pageSize: 100,
      cards: [],
      activeIndex: null,
      isFinished: false
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("card/page", {
        params: { page_index: this.pageIndex, page_size: this.pageSize }
      });
      console.log(res.data);
      if (res.code == 200) {
        this.cards = res.data.result;
      }
    },
    async getUserInfo() {
      let res = await this.$http.get("auth/info");
    },
    toDetail(index, id) {
      if (this.activeIndex == index) {
        this.$router.push({ name: "detail", params: { id } });
      }
    }
  },
  created() {
    let t = localStorage.getItem("savetime");
    alert('t:'+t)
    if (t) {
      new Date().toDateString() == new Date(t).toDateString();
      if (new Date().toDateString() == new Date(t * 1).toDateString()) {
        alert('今日已测试')
        this.isFinished = true;
      } else {
        alert('今日未测试')
      }
    }
  },
  mounted() {
    this.fetch();
    // this.getUserInfo();
  },
  components: {
    Header,
    Footer,
    Card
  }
};
</script>

<style  lang="scss"  scoped>
.main {
  background: #270e3b;

  background: url("../assets/img/BG.jpg") no-repeat;
}
.rotate-section {
  height: 545px;
  padding: 40px 0;
  position: relative;
  // background: #270E3B;
  .text-box {
    position: absolute;
    top: 134px;
    left: 106px;
    width: 520px;
    height: 244px;
    background: url("../assets/img/main-title.png") no-repeat;
    background-size: contain;
  }
  .rotate-img {
    position: absolute;
    top: 40px;
    left: 142px;
    width: 465px;
    height: 465px;
    background: url("../assets/img/xinpan.png") no-repeat;
    background-size: contain;
    animation: circle 24s infinite linear;
  }
  @keyframes circle {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-360deg);
    }
  }
}

.star-cards {
  padding: 0 30px;
  height: calc(100vh - 110px - 545px);
  overflow-y: scroll;
  // background: #270E3B;
  .card-item {
    padding: 32px;
    display: flex;
    background: linear-gradient(
      360deg,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
    border-radius: 16px;
    opacity: 0.8;
    margin-bottom: 30px;
    &.on {
      background: linear-gradient(
        360deg,
        rgba(217, 80, 255, 0.09) 0%,
        rgba(212, 75, 250, 0.5) 100%
      );
    }
    .card-icon {
      height: 180px;
      width: 180px;
      border-radius: 16px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 16px;
      }
    }
    .card-des {
      flex: 1;
      height: 180px;
      margin-left: 32px;
      .star-name {
        font-size: 36px;
        line-height: 50px;
        margin-top: 10px;
        color: #fff;
      }
      .star-des {
        font-size: 28px;
        line-height: 40px;
        margin-top: 0px;
        color: #9452a3;
      }
      .star-date {
        font-size: 28px;
        line-height: 40px;
        margin-top: 25px;
        color: #fcdfc9;
      }
    }
    .card-button {
      margin-top: 65px;
      .button-icon {
        width: 48px;
        height: 48px;
        margin: 0px 16px 10px;
        background: url("../assets/img/card-btn.jpg") no-repeat;
        background-size: contain;
      }
      .button-txt {
        font-size: 26px;
        line-height: 38px;
        color: #d27ae7;
      }
    }
  }
}
</style>
