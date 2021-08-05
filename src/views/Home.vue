<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="msg" />
    <el-button>22</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { treeSelect, queryOrgTree } from '@/api/common';

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  data() {
    return {
      msg:'1'
    };
  },
  mounted() {
    // setInterval(()=>{
    //   this.msg+='1+'
    // },5000)
    // this.getList1();
    // this.test2();
  },
  methods: {
    // getList(){
    //   console.log(2222)
    //   // treeSelect()
    // }
    getList1() {
      treeSelect().then(() => {});
      // console.log(1111111)
      // let a = await treeSelect();
      // console.log(222222222)
    },
    test2() {
      queryOrgTree().then(() => {});
    },
  },
};
</script>
