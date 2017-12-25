<template>
  <div class="single-box">
    <div class="single-top clearfix" @click="bottomShow = !bottomShow">
      <span class="left banner-left">
		<i class="iconfont icon-triangle-right"></i>
		<span>轮播Banner</span>
		<!--{{itemData.title}}-->
	 </span>
      <span class="right">
      	<i class="iconfont icon-tuodong" style="font-size: 10px;" ></i>
      </span>
    </div>
    <transition name="fade">
		    <div class="single-bottom" v-show="bottomShow">
		      <span>图片</span>
		      <el-upload class="avatar-uploader" action="http://test.haiqihuocang.com/api/index.php?m=home&act=getImage" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
		        <img v-if="imageUrl" :src="imageUrl" class="avatar">
		        <div v-show="!imageUrl" class="photo-show">
		          <div>
		            <i class="iconfont icon-tupian tupian-icon"></i>
		            <span class="photo-uoload">上传图片</span>
		            <div class="font-gray photo-info">最佳像素750*360像素</div>
		            <div class="font-gray photo-info">图片不匹配时，将被压缩或拉伸以铺满整个画面</div>
		          </div>
		        </div>	
		      </el-upload>
		
		      <span class="single-link">链接</span>
		      <el-input v-model="input" placeholder="请输入内容"></el-input>
		
		      <div class="single-delete" @click="delBanner(index)">
		        <i class="iconfont icon-lajitong"></i>
		        <span>删除</span>
		      </div>
		
		    </div>
		</transition>  
  </div>

</template>

<script>
  export default {
    name: 'Banner-piece',
    props:{
	  index: {
				type: Number,
				default: 0
    	},
      itemData:{
      	type: Object,
      	default: function(){
      		return {
      			title: '',
      			price: '',
      			text: ''
      		}
      	}
      }
    },
    data() {
      return {
      	input: '',
				imageUrl: '',
				bottomShow: false, //切换滑块
      }
    },
    methods: {
      //图片上传
		  handleAvatarSuccess(res, file) {
		    this.imageUrl = URL.createObjectURL(file.raw);
		  },
		  beforeAvatarUpload(file) {
		    const isJPG = file.type === 'image/jpeg'||'image/png'||'image/gif'||'image/jpg'||'mage/bmp'||'image/tga'||'image/tiff';
		    const isLt2M = file.size / 1024 / 1024 < 2;
		    if (!isJPG) {
		      this.$message.error('上传头像图片只能是 JPG 格式!');
		    }
		    if (!isLt2M) {
		      this.$message.error('上传头像图片大小不能超过 2MB!');
		    }
		    return isJPG && isLt2M;
		  },
		  //删除banner
		  delBanner(index){
		  	this.$emit('delBanner',index)
		  },
    }
  }
</script>

<style>
</style>