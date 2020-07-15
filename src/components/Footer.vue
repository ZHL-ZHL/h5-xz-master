<template>
  <div class="xz-footer">
    <router-link tag="div" :to="{name:'main'}" :class="{on}"  class="icon ">
      <i class="icon-main"></i>
      <div class="txt">每日运势</div>
    </router-link>
    <router-link tag="div" :to="{name:'message'}"  class="icon ">
      <i class="icon-release"></i>
      <div class="txt">塔罗屋</div>
    </router-link>
    <router-link :to="{name:'my'}" tag="div"  :class="{my}"  class="icon ">
      <i class="icon-my"></i>
      <div class="txt">我的</div>
    </router-link>
  </div>
</template>

<script>
export default {
  props:['on','my'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
.xz-footer{
  position: fixed;
  width: 100vw;
  height: 110px;
  padding: 10px 0;
  bottom: 0;
  display: flex;
  background: #3B1A62;
  z-index: 10;
  .icon{
    flex:1;
    text-align: center;
    .txt{font-size:20px;color:#CA92FB;line-height: 28px;}
    i{
      display: block;
      width: 33vw;
      height: 54px;
    }
    .icon-main {background: url('../assets/img/icon-main.png') no-repeat;background-size: contain;background-position: center;}
    .icon-release {background: url('../assets/img/icon-release.png') no-repeat;background-size: contain;background-position: center}
    .icon-my {background: url('../assets/img/icon-my.png') no-repeat;background-size: contain;background-position: center}
    &.on{
      .icon-main {background: url('../assets/img/icon-main-on.png') no-repeat;background-size: contain;background-position: center}
      .icon-release {background: url('../assets/img/icon-release-on.png') no-repeat;background-size: contain;background-position: center}
      .icon-my {background: url('../assets/img/icon-my-on.png') no-repeat;background-size: contain;background-position: center}
    }   
    &.my{ 
      .icon-my {background: url('../assets/img/icon-my-on.png') no-repeat;background-size: contain;background-position: center}
    }   
  }
  
}
</style>
