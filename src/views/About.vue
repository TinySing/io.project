<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-view />
  </div>
</template>
<script>
  export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  data() {
    return {};
  },
  mounted() {
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
