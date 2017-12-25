<template>
  <div class="activity-addbtn box" @click="onChangeBg(index)" :class="{active:indexActive==index}">
    <span class="left">{{itemData.plateName}}--{{itemData.keyValue}}</span>
    <span class="right">
			<i class="iconfont icon-tuodong"></i>
			<el-popover
			  ref="popover"
			  placement="bottom"
			  width="160"
			  offset="80"
			  v-model="visible">
			  <span>确定删除？</span>
	      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
	      <el-button type="primary" size="mini" @click="delSingle(index)">确定</el-button>
			</el-popover>
			<i class="iconfont icon-lajitong" v-popover:popover></i>
	   </span>
  </div>
</template>

<script>
  export default {
    props: {
      itemData: {
        type: Object
      },
      index: {
      	type: Number,
      	default: 0
      },
      indexActive: {
      	type: Number,
      	default: 0
      }
    },
    data() {
      return {
        visible: false       
      }
    },
    methods: {
      //选中效果
      onChangeBg(index) {
      	//子组件通过$emit来触发事件，将参数传递出去
        this.$emit('changeBg',index,this.itemData)
      },
      //删除
      delSingle(index) {
      	this.visible = false
        this.$emit('delete', index)
      }
    }
  }
</script>

<style scoped="scoped">
</style>