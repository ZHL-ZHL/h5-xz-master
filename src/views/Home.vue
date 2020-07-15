<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 :class="['myh2']">Essential Links</h2>
   
    <h2 style="font-size:2rem;">Ecosystem</h2>
   
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
h1, h2 {
  font-weight: normal;
}
.myh2{
  font-size: 1rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
