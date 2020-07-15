<template>
  <div class="hello">
    <Header></Header>
    <div class="main">
      <div class="rotate-section">
        <div class="text-box"></div>
        <div class="rotate-img"></div>
      </div>
      <div class="star-cards">
        <div
          v-for="(item,index) in cards"
          :key="index"
          :class="{on:activeIndex==index}"
          @click="activeIndex=index;id=item.id"
          class="card-item"
        >
          <div class="card-des"  @click="toDetail(activeIndex,item.id)">
            <div class="star-name">{{item.name}}</div>
          </div> 
        </div>
      </div> 
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
// import Card from "./CardRecords";
export default {
  data() {
    return {
      id: null,
      pageIndex: 1,
      pageSize: 100,
      cards: [],
      activeIndex: null,  
    };
  },
  methods: {
    async fetch() {
      // alert(1111)
      const res = await this.$http.get("card/category/page", {
        params: {
          page_index: this.pageIndex,
          page_size: this.pageSize,
          parent_id: 0,
          type: 1
        }
      });   
      // alert(JSON.stringify(res))
      if (res.code == 200) { 
        this.cards = res.data.result;
      }
    }, 
    toDetail(index, id) {
       this.$router.push({ name: "mianSecond", params: { id } });
    }
  },
  async created() { 
    
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
      rgba(217, 80, 255, 0.09) 0%,
      rgba(212, 75, 250, 0.5) 100%
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
      height:90px;
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
