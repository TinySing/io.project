<template>
  <div class="hello">
    <h1>哈哈哈哈哈哈哈哈哈哈</h1>
  </div>
</template>

<script>
export default {
  name: 'hello-world',
  props: {
    msg: {
      type: String,
      default: '11121'
    },
  },
  watch:{
    msg:{
      handler(val){
        console.log(val)
      },
      immediate:true

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  padding: 0;
  list-style-type: none;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
