<template>
  <div class="hello">
    <Header></Header>
    <div class="main">
      <div class="star-cards">
        <div
          v-for="(item,index) in cards"
          :key="index"
          :class="{on:activeIndex==index}"
          @click="activeIndex=index;rowDetail=item;finished = true"
          class="card-item"
        >
          <div class="card-des">
            <div class="star-name">{{item.name}}</div>
          </div>
        </div>
      </div>
      <!-- is_vip_free 0：免费，1：付费 -->
      <!-- is_paid 0：未购买 1：已购买 -->
      <div v-show="finished">
        <div v-if="rowDetail.is_paid == 1">
          <div @click="toDetail" class="btn-test"></div>
        </div>
        <div v-if="rowDetail.is_paid == 0">
          <div v-show="rowDetail.is_vip_free == 1 || !(level>0)">
            <div v-if="rowDetail.present_price>0" class="pay">
              <div class="btn-test" @click="show=true"></div>
            </div>
            <div v-if="rowDetail.present_price == 0" class="pay-free">
              <div @click="pay_free" class="btn-test"></div>
            </div>
          </div>
          <div v-show="rowDetail.is_vip_free == 0 && level>0" class="pay-free">
            <div @click="vip_pay_free" class="btn-test"></div>
          </div>
        </div>
      </div>
    </div>
    <Footer :on="true"></Footer>
    <div v-html="this.form" class="hidden" />
    <van-popup position="bottom" v-model="show">
      <div class="popup">
        <span @click="show=false" class="cha iconfont icon-cha"></span>
        <div @click="pay_success" class="pop-price">¥ {{rowDetail.present_price | cy}}</div>
        <div @click="ali_pay" v-show="!isweixin" class="item">
          <span class="left">
            <span class="zhifubao"></span>
            <span class="name">支付宝</span>
          </span>
          <span class="arrow iconfont icon-arrowR"></span>
        </div>
        <div @click="weixin_pay" class="item">
          <span class="left">
            <span class="weixin"></span>
            <span class="name">微信</span>
          </span>
          <span class="arrow iconfont icon-arrowR"></span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Header from "../components/Header";
import Footer from "../components/Footer";
export default {
  data() {
    return {
      form: "",
      finished: false,
      // price: 0.0,
      show: false,
      rowDetail: {},
      pageIndex: 1,
      pageSize: 100,
      cards: [],
      activeIndex: null,
      isFinished: false,
      pageLoaded: false
    };
  },
  async created() {
    let payback = this.$route.query.payback;
    if (payback) {
      this.uuid = this.$route.query.uuid;
      this.id = this.$route.query.id;
      this.$router.push({
        name: "CardRecordsItem",
        params: { type: "random", id: this.id }
      });
    }
  },
  computed: {
    level() {
      return localStorage.getItem("level") * 1;
    },
    platform_id() {
      return this.getUrlParam("platform_id");
    },
    isweixin() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    async vip_pay_free() {
      let res = await this.$http.post("order/card_category/paid_user/save", {
        platform_id: this.platform_id,
        ref_ids: [this.rowDetail.id]
      });
      if (res.code == 200) {
        this.$router.push({
          name: "CardRecordsItem",
          params: { type: "random", id: this.rowDetail.id ,isdailyfortune:this.rowDetail.is_daily_fortune}
        });
      }
    },
    async pay_free() {
      let res = await this.$http.post("order/card_category/free/save", {
        platform_id: this.platform_id,
        ref_ids: [this.rowDetail.id]
      });
      if (res.code == 200) {
        this.$router.push({
          name: "CardRecordsItem",
          params: { type: "random", id: this.rowDetail.id,isdailyfortune:this.rowDetail.is_daily_fortune }
        });
      }
    },
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ name: "main" });
      } else {
        this.$router.go(-1);
      }
    },
    getUrlParam(name) {
      //封装方法
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    },
    async fetch() {
      const res = await this.$http.get("card/category/page", {
        params: {
          page_index: this.pageIndex,
          page_size: this.pageSize,
          parent_id: this.$route.params.id,
          type: 2
        }
      });
      this.pageLoaded = true;
      if (res.code == 200) {
        this.cards = res.data.result;
      }
    },
    toDetail() {
      this.$router.push({
        name: "CardRecordsItem",
        params: { type: "random", id: this.rowDetail.id,isdailyfortune:this.rowDetail.is_daily_fortune }
      });
    },
    pay_success(mid) {
      // alert(222);
      // alert(this.rowDetail.id);
      this.$router.push({
        name: "CardRecordsItem",
        params: { type: "random", id: this.rowDetail.id,isdailyfortune:this.rowDetail.is_daily_fortune }
      });
    },
    async ali_pay() {
      this.pop_show = true;
      this.show = false;
      let res = await this.$http.post(`pay/alipay/wappay`, {
        number: 1,
        package_key: "num_1",
        package_type: 2,
        platform_id: this.platform_id,
        ref_ids: [this.rowDetail.id],
        total_fee: 1
      });
      if (res.code == 200) {
        this.uuid = res.data.uuid;
        this.form = res.data.form;
        this.$nextTick(r => {
          document.querySelector("input[type=submit]").click();
        });
      }
      this.check_pay();
    },
    async h5_pay() {
      let res = await this.$http.post(`pay/wxpay/h5_url`, {
        number: 1,
        package_key: "num_1",
        package_type: 2,
        platform_id: this.platform_id,
        ref_ids: [this.rowDetail.id],
        total_fee: 1
      });
      if (res.code == 200) {
        let r = res.data;
        this.uuid = res.data.uuid;
        let back_url = `${location.href}?uuid=${this.uuid}&id=${this.rowDetail.id}&payback=1&isdailyfortune=${this.rowDetail.is_daily_fortune}`;
        let url = `${res.data.url}&redirect_url=${encodeURIComponent(
          back_url
        )}`;
        window.location.replace(url);
      }
    },
    async weixin_pay() {
      if (this.is_weixn()) {
        let res = await this.$http.post(`pay/wxpay/jsapi_prepay`, {
          number: 1,
          package_key: "num_1",
          package_type: 2,
          platform_id: this.platform_id,
          ref_ids: [this.rowDetail.id],
          total_fee: 1
        });
        let r = res.data;
        this.uuid = res.data.uuid;
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          {
            appId: r.app_id, //公众号名称，由商户传入
            timeStamp: r.time_stamp, //时间戳，自1970年以来的秒数
            nonceStr: r.nonce_str, //随机串
            package: r.packages,
            signType: r.sign_type, //微信签名方式：
            paySign: r.pay_sign //微信签名
          },
          function(res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              // alert(this.rowDetail.id);
              this.$router.push({
                name: "CardRecordsItem",
                params: { type: "random", id: this.rowDetail.id ,isdailyfortune:this.rowDetail.is_daily_fortune}
              });
            }
          }
        );
        this.check_pay();
      } else {
        this.h5_pay();
      }

      console.log(res);
    },
    async check_pay() {
      // alert(this.uuid);
      let payRes = await this.$http.get(`order/status/${this.uuid}`);
      // alert(JSON.stringify(payRes));
      if (payRes.code == 200) {
        if (payRes.data.status == 1) {
          let res2 = await this.$http.get(`order/test_question/question`, {
            params: { uuid: this.uuid }
          });
          // alert(1111);
          // alert(JSON.stringify(res2));
          if (res2.code == 200) {
            // alert(3333);
            // this.pay_success();
            this.$router.push({
              name: "CardRecordsItem",
              params: { type: "random", id: this.rowDetail.id,isdailyfortune:this.rowDetail.is_daily_fortune}
            });
          }
        } else {
          setTimeout(() => {
            this.check_pay();
          }, 2000);
        }
      }
    },
    is_weixn() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
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
.main {
  background: #270e3b;
  height: 100vh;
  padding: 0px 50px;
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
.btn-test {
  display: block;
  height: 80px;
  color: #fff;
  width: 100%;

  margin: 0 auto;
  background: url("../assets/img/test-btn.jpg") no-repeat;
  background-size: 100%;
  margin-top: 20px;
  // background: linear-gradient(
  //   360deg,
  //   rgba(52, 0, 66, 0.9) 0%,
  //   rgba(200, 1, 255, 0.2) 100%
  // );
}
.star-cards {
  padding: 120px 0px 0px 0px;
  height: calc(100vh - 290px);
  overflow-y: scroll;
  // background: #270E3B;
  .card-item {
    text-align: center;
    border-radius: 100px;
    padding: 5px;
    border: 2px solid #f9ebb8;
    display: flex;
    justify-content: center;
    align-items: center;

    // background: linear-gradient(
    //   360deg,
    //   rgba(52, 0, 66, 0.9) 0%,
    //   rgba(200, 1, 255, 0.2) 100%
    // );
    // border-radius: 16px;
    // opacity: 0.8;
    margin-bottom: 30px;
    &.on {
      background: rgba(255, 255, 255, 0.2);
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
      // height: 180px;
      // margin-left: 32px;
      .star-name {
        font-size: 36px;
        line-height: 50px;
        // margin-top: 10px;
        color: #fee38b;
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
      // margin-top: 65px;
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

.popup {
  width: 750px;
  height: 480px;
  background: rgba(51, 20, 115, 1);
  padding: 80px 0px 0;
  position: relative;
  .pop-price {
    // height: 257px;
    color: #fff;
    font-size: 72px;
    line-height: 90px;
    padding-bottom: 26px;
    text-align: center;
    border-bottom: 1px solid #4f19a2;
  }
  .item {
    padding: 0 34px;
    border-bottom: 1px solid #4f19a2;
    height: 93px;
    line-height: 93px;
    color: #fff;
    font-size: 32px;
    display: flex;

    .left {
      flex: 1;
      vertical-align: middle;
      .zhifubao {
        display: inline-block;
        width: 34px;
        height: 34px;
        margin-right: 16px;
        background: url("../assets/img/alipay.png") no-repeat;
        background-size: contain;
        vertical-align: middle;
      }
      .weixin {
        display: inline-block;
        width: 34px;
        height: 34px;
        margin-right: 16px;
        background: url("../assets/img/weixin.png") no-repeat;
        background-size: contain;
        vertical-align: middle;
      }
      .name {
        vertical-align: middle;
      }
    }
    .icon-arrowR {
      width: 40px;
      font-size: 40px;
      color: #ada7c1;
    }
  }
  .icon-cha {
    color: #ada7c1;
    font-size: 40px;
    position: absolute;
    top: 32px;
    right: 32px;
  }
}
</style> 
