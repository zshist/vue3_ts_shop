<template lang='pug'>
my-echarts(:options='options')
</template>

<script setup lang='ts'>
import MyEcharts from '../../components/MyEcharts.vue'
import { ref } from 'vue'
import { reqReports } from '../../api/index'
import _ from 'lodash'
const options = ref({  
  title: {
    text: '用户来源'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#E9EEF3'
      }
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      boundaryGap: false
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ]
})
const initReport = async () => {
  const result = await reqReports()
  options.value = _.merge(result.data, options.value)
  console.log(options.value)
}
initReport()
</script>

<style lang='less'>

</style>