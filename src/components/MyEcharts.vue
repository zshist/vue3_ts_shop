<template lang="pug">
div(:id="id" :style="style")
</template>

<script setup lang='ts'>
import { onMounted, defineProps, ref } from 'vue'
import { nanoid } from 'nanoid'
import * as echarts from 'echarts'
const props = defineProps({
  options: {
    type: Object,
    default: null  
  },
  width: {
    type: String,
    default: '600px'
  },
  height: {
    type: String,
    default: '400px'
  }
})
const id = ref(`vue-echarts-${nanoid()}`)
const style = ref({
  height: props.height,
  width: props.width
})
let chart: any = null
const initEcharts = () => {
  if(!chart){
    chart = echarts.init(document.getElementById(id.value)!)
  }else {
    return
  }
  if(!props.options) return
  chart.setOption(props.options)
}
onMounted(() => {
  initEcharts()
})
</script>
<style lang="less" scoped>
</style>