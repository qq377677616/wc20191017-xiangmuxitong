<template>
  <div id="app">
    <Main></Main>
	<!-- <memberTable></memberTable> -->
<!--    <Scheduling></Scheduling>-->
<!--      <Schedule></Schedule>-->
   <!-- <outSchedule></outSchedule> -->
  </div>
</template>
<script>
  import Main from 'views/index.vue'
  import Scheduling from 'views/scheduling.vue'
  import outSchedule from 'views/outSchedule.vue'
  import Schedule from 'views/schedule.vue'
  import memberTable from 'views/member_table.vue'
  export default {
    components :{
      Main,
      Scheduling,
      Schedule,
      outSchedule,
	  memberTable
    }
  }
</script>
<style lang="less">
  #app {
    height:100%;
    background-color:#f5f5f5;
  }
  .project-card {
    margin: 15px 15px;
    border-radius: 5px;
    background: #fff;
    font-size:14px;
  }
  .card-top {
    font-size:16px;
    display: flex;
    justify-content: space-between;
    padding:15px 10px;
    align-items: center;
  }
  .card-top-left {
    color:#000;
  }
  .card-top-right {
    color:#636363;
  }
  .card-bottom {
    color:#b1b1b1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding:0px 10px 10px;
    align-items: flex-start;
  }
  .card-bottom-left {
    margin-bottom:10px;
  }
  .card-top-right {
    font-size: 16px;
  }
  .card-left-type,.card-right-type {
    letter-spacing: 1px;
  }
  .card-top-right span:nth-child(2) {
    margin-right:10px;
  }
  .up-time-title,.setting-time-title {
    letter-spacing: 1px;
  }
</style>
