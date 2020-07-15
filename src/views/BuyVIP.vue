<template>
  <div class="page-tips">
    <div @click="back" class="back"></div>
    <div class="title">VIP会员套餐</div>
    <!-- <div class="tips-bar"></div> -->
    <div class="vip">
      <div class="vip-list">
        <div v-for="(item,i) in vipList" :key="i">
          <div
            @click="current_index=i;packet_key=item.key;price=item.price/100"
            class="vip-item"
            :class="{on:current_index ==i}"
          >
            ¥{{item.price/100}}/
            <span v-if="item.key=='vip_month'">月</span>
            <span v-if="item.key=='vip_year'">年</span>
            <span v-if="item.key=='vip_life'">永久</span>
          </div>
        </div>
      </div>
      <div @click="show = true" class="buy-button">立即开通</div>
    </div>
    <div class="des">
      <div class="des-title">会员说明:</div>
    </div>
    <div v-html="this.form" class="hidden" />
    <van-popup position="bottom" v-model="show">
      <div class="popup">
        <span @click="show=false" class="cha iconfont icon-cha"></span>
        <div class="pop-price">{{price | cy}}</div>
        <div class="item" @click="ali_pay" v-show="!isweixin">
          <span class="left">
            <!-- <svg t="1589343378771" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2134" width="200" height="200"><path d="M845.87 659.697C991.05 709.256 1024 711.92 1024 711.92V186.187C1024 83.351 940.65 0 837.813 0H186.187C83.351 0 0 83.35 0 186.187v651.64C0 940.65 83.35 1024 186.187 1024h651.64c91.995 0 168.208-66.786 183.282-154.473-28.793-12.258-267.475-114.191-391.8-175.12-88.818 111.406-203.4 178.99-322.335 179.005-201.17 0-269.478-179.456-174.23-297.593 20.766-25.735 56.109-50.341 110.938-64.12 85.745-21.49 222.283 13.387 350.208 56.44a723.576 723.576 0 0 0 56.802-141.462H256.407v-40.75H459.7v-72.96H213.474v-40.749H459.7V168.132s0-17.529 17.438-17.529h99.373v121.615h243.44v40.75H576.498v72.96l198.731 0.015c-19.02 79.405-47.917 152.5-84.148 216.681 60.325 22.242 114.447 43.294 154.79 57.073z" fill="#00A0E9" p-id="2135"></path><path d="M260.819 572.642c-25.209 2.56-72.493 13.914-98.35 37.21-77.537 68.894-31.141 194.846 125.712 194.861 91.166 0 182.287-59.437 253.846-154.563-101.782-50.673-188.024-86.905-281.208-77.508z" fill="#00A0E9" p-id="2136"></path></svg> -->
            <span class="zhifubao"></span>
            <span class="name">支付宝</span>
          </span>
          <span class="arrow iconfont icon-arrowR"></span>
        </div>
        <div class="item" @click="weixin_pay">
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
export default {
  props: {
    id: 0
  },
  data() {
    return {
      vipList: [],
      form: "",
      price: 0.0,
      VIP_price: 99.0,
      res: {},
      index: 1,
      show: false,
      current_index: 0,
      packet_key: ""
    };
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
  async created() {
    let payback = this.$route.query.payback;
    if (payback) {
      this.uuid = this.$route.query.uuid;
      this.id = this.$route.query.id;
      this.$router.push({
        name: "my"
      });
    }
  },
  methods: {
    getUrlParam(name) {
      //封装方法
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return unescape(r[2]);
      return null; //返回参数值
    },
    getVip() {
      this.$http.get(`package/vip`).then(res => {
        this.vipList = res.data;
        this.packet_key = res.data[0].key;
        this.price = res.data[0].price / 100;
      });
    },
    pay_success() {
      this.$http.get(`auth/info`).then(res => {
        if (res.code == 200) {
          localStorage.setItem("nickname", res.data.nickname);
          localStorage.setItem("gender", res.data.gender);
          localStorage.setItem("vip_end_time", res.data.vip_end_time);
          localStorage.setItem("avatar", res.data.avatar);
          localStorage.setItem("level", res.data.level);
        }
        this.$router.push({ name: "my" });
      });
    },
    is_weixn() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ name: "main" });
      } else {
        this.$router.go(-1);
      }
    },
    buyItem() {
      this.price = this.res.present_price;
    },
    async check_pay() {
      let payRes = await this.$http.get(`order/status/${this.uuid}`);
      if (payRes.code == 200) {
        if (payRes.data.status == 1) {
          let res2 = await this.$http.get(`order/test_question/question`, {
            params: { uuid: this.uuid }
          });
          if (res2.code == 200) {
            this.pay_success();
          }
        } else {
          setTimeout(() => {
            this.check_pay();
          }, 2000);
        }
      }
    },
    async ali_pay() {
      this.pop_show = true;
      this.show = false;
      let res = await this.$http.post(`pay/alipay/wappay`, {
        number: 1,
        package_key: this.packet_key,
        package_type: 0,
        platform_id: 0,
        // "ref_ids": [this.id],
        total_fee: 1
      });
      if (res.code == 200) {
        this.form = res.data.form;
        this.uuid = res.data.uuid;
        this.$nextTick(r => {
          document.querySelector("input[type=submit]").click();
        });
      }
      this.check_pay();
    },
    async weixin_pay() {
      if (this.is_weixn()) {
        let res = await this.$http.post(`pay/wxpay/jsapi_prepay`, {
          number: 1,
          package_key: this.packet_key,
          package_type: 0,
          platform_id: 0,
          // "ref_ids": [this.id],
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
            // alert(JSON.stringify(res))
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              // alert('支付回调')
            }
          }
        );
        this.check_pay();
      } else {
        this.h5_pay();
      }
    },

    async h5_pay() {
      let res = await this.$http.post(`pay/wxpay/h5_url`, {
        number: 1,
        package_key: this.packet_key,
        package_type: 0,
        platform_id: this.platform_id,
        // ref_ids: [this.id],
        total_fee: 1
      });
      if (res.code == 200) {
        let r = res.data;
        this.uuid = res.data.uuid;
        // alert('url:'+res.data.url)
        let back_url = `${location.href}?uuid=${this.uuid}&id=${this.id}&payback=1`;
        // alert('back_url:'+back_url)
        let url = `${res.data.url}&redirect_url=${encodeURIComponent(
          back_url
        )}`;
        // alert('url2:'+url)
        window.location.replace(url);
        // window.location.href = url;
      }
    }
  },
  mounted() {
    this.getVip();
  }
};
</script>

<style lang="scss"  scoped>
.vip {
  // margin-bottom: 50px;
  border-bottom: 1px solid #4f19a2;
  .vip-list {
    display: flex;
    justify-content: space-around;
    padding: 30px 20px 50px;
    div.vip-item {
      width: 200px;
      height: 120px;
      text-align: center;
      line-height: 100px;
      font-size: 32px;
      color: #fff;
      background: rgb(30, 21, 70);
      border: 10px solid #6331ca;
      border-radius: 10px;
      // border:10px solid rgb(38,26,88);
      &.on {
        border-color: rgb(255, 228, 126);
      }
    }
  }
  .buy-button {
    background: linear-gradient(90deg, #904dff, #48c5ff);
    padding: 30px 100px;
    border-radius: 55px;
    font-size: 40px;
    line-height: 40px;
    margin: 0 40px;
    text-align: center;
    color: #fff;
    margin-bottom: 50px;
  }
}
.des {
  padding: 20px 40px;
  .des-title {
    line-height: 40px;
    font-size: 28px;
    color: #ccc;
  }
}
.page-tips {
  height: 100vh;

  background: #400e8d;
  background-size: cover;
  position: relative;
  padding: 40px 0 0;
  .back {
    width: 72px;
    height: 68px;
    background: url("../assets/img/return.png") no-repeat;
    background-size: cover;
    position: absolute;
    top: 50px;
    left: 0px;
  }

  .title {
    font-size: 48px;
    color: rgba(255, 255, 255, 1);
    // line-height:44px;
    text-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
    margin: 20px 96px 75px 96px;
    text-align: center;
  }
  .tips-bar {
    position: absolute;
    top: 220px;
    left: 55px;
    width: 640px;
    height: 128px;
    background: url("../assets/img/tips.png") no-repeat;
    background-size: cover;
  }
  .tips-bottom {
    margin-top: 175px;
    height: calc(100vh - 50px - 20px - 48px - 75px - 100px + 300px);
    background: #400e8d;
    border-radius: 53px 53px 0px 0px;
    padding: 180px 26px;
    font-size: 32px;
    color: #fff;
    line-height: 52px;
    .des {
      padding: 0 24px;
      margin-bottom: 130px;
    }
    .go {
      width: 153px;
      height: 153px;
      background: linear-gradient(
        90deg,
        rgba(72, 197, 255, 1),
        rgba(144, 77, 255, 1)
      );
      border-radius: 50%;
      font-size: 40px;
      line-height: 153px;
      text-align: center;
      position: absolute;
      left: 300px;
      bottom: 15vw;
    }
  }
  .price {
    width: 696px;
    height: 96px;
    background: rgba(111, 92, 157, 1);
    border-radius: 13px;
    font-size: 32px;
    line-height: 96px;
    display: flex;
    padding: 0 33px;
    margin-top: 30px;
    .left {
      flex: 1;
      text-align: left;
      line-height: 96px;
    }
    .right {
      width: 200px;
      text-align: right;
      line-height: 96px;
    }

    &.on {
      border: 4px solid rgba(111, 92, 157, 1);
      background: #400e8d;
    }
  }
  .popup {
    width: 750px;
    height: 528px;
    background: rgba(51, 20, 115, 1);
    padding: 140px 0px 0;
    position: relative;
    .pop-price {
      // height: 257px;
      color: #fff;
      font-size: 90px;
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
    // border-radius:13px 13px 0px 0px;
  }
  .pay {
    display: flex;
    height: 106px;
    width: 100vw;
    position: absolute;
    bottom: 0;
    .left {
      flex: 1;
      background: #261a58;
      font-size: 40px;
      color: #fff;
      line-height: 106px;
      padding-left: 30px;
    }
    .right {
      width: 287px;
      line-height: 106px;
      font-size: 40px;
      color: #fff;
      text-align: center;
      background: linear-gradient(
        90deg,
        rgba(72, 197, 255, 1),
        rgba(144, 77, 255, 1)
      );
    }
  }
}
</style>