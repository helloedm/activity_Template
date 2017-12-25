<template>
  <div class="grid-content bg-purple">
    <div class="activity-titletop">
      <i class="iconfont icon-xiangzuo"></i>
      <span>图片模板设置</span>
    </div>

    <div class="activity-component">
      <span class="font-gray single-title">内容</span>

			<div class="single-box" 
				v-for="(itemData,index) in currentComData.bannerItems"
				v-dragging="{item: itemData, list: currentComData.bannerItems, group: 'itemData'}"
        :key="itemData.bannername"
				>
		    <div class="single-top clearfix" @click="toggle(index)">
		      <span class="left banner-left">
				<i class="iconfont icon-triangle-right"></i>
				<span>{{itemData.bannername}}</span>
			 </span>
		      <span class="right">
		      	<i class="iconfont icon-tuodong" style="font-size: 10px;"></i>
		      </span>
		    </div>
		    <div v-if="bannerShow === index">
				    <div class="single-bottom">
				      <span>图片</span>
				      <el-upload 
				      	class="avatar-uploader" 
				      	action="http://test.haiqihuocang.com/api/index.php?m=home&act=getImage2" 
				      	:show-file-list="false" 
				      	:on-success="handleAvatarSuccess" 
				      	:before-upload="beforeAvatarUpload">
				        <img v-if="itemData.activityImage" :src="itemData.activityImage" class="avatar">
				        <div v-show="!itemData.activityImage" class="photo-show">
				          <div>
				            <i class="iconfont icon-tupian tupian-icon"></i>
				            <span class="photo-uoload">上传图片</span>
				            <div class="font-gray photo-info">最佳像素750*360像素</div>
				            <div class="font-gray photo-info">图片不匹配时，将被压缩或拉伸以铺满整个画面</div>
				          </div>
				        </div>	
				      </el-upload>
				      <span class="single-link">链接</span>
				      <el-input v-model="itemData.banner_url" placeholder="请输入内容" v-on:input="save_url(index)"></el-input>
				      <div class="single-delete" @click="deleteBanner(index)">
				        <i class="iconfont icon-lajitong"></i>
				        <span>删除</span>
				      </div>
				      <!--<div class="single-delete" @click="saveBanner(index)">
				        <span>保存</span>
				      </div>-->
				    </div>
				</div>  
		  </div>
      <div class="single-box" @click="addBanner">
        <div class="single-top add-banner">
          <i class="iconfont icon-tianjia"></i>
          <span>添加轮播</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "banner",
  	props: {
  		currentComData: {
  			type: Object,
  			default: function(){
  				return {
  				}
  			}
  		}
  	},
  	created(){
  		this.bannerShow = -99
  	},
    data() {
      return {
        bannerItems: [], //banner轮播 {"title": '1'}
				imageUrl: '',
				bannerShow: -1,//切换滑块
				about_img:-1
      }
    },
    methods: {
    	//保存链接
    	save_url(index){
    		//cloneDeep递归深拷贝
   			this.$emit('changeData',this.currentComData);
			},
      //添加Banner轮播
      addBanner() {
      	this.currentComData.bannernum++;
        this.currentComData.bannerItems.push({
        	bannername:"轮播Banner",/*+this.currentComData.bannernum*/
        	activityImage:'',//banner图片
        	banner_url:'',//banner链接
        });
        console.log(this.currentComData.bannerItems);
        this.$emit('changeData',this.currentComData);
        this.$forceUpdate();
      },
      //删除Banner轮播
      deleteBanner(index) {
				this.about_img=index;
        this.currentComData.bannerItems.splice(this.about_img,1);
        this.$emit('changeData',this.currentComData);
      },
       //图片上传
		  handleAvatarSuccess(res, file) {
		  	this.currentComData.bannerItems[this.about_img].activityImage=res.data[0];
		    this.$emit('changeData',this.currentComData);
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
		  //显示
		  toggle(index){
		  	this.about_img=index;
				if(this.bannerShow === index){
					this.bannerShow = -1
				}else{
					this.bannerShow = index
				}
			}
    }
  }
</script>

<style scoped="scoped">
.single-box{background: white;border: 1px solid #E6EBF1;border-top: none;}
.activity-component >.single-box:nth-child(2){border-top: 1px solid #E6EBF1 !important;}
.single-top{width: 100%;padding: 0 12px 0 15px;color: #303030;line-height: 50px;}
.single-link{padding: 15px 0 10px 0;display: block;}
.el-input input{border: 1px solid rgb(230, 235, 241);}
.single-delete{padding: 15px 0 5px 0;color: #005FFF;cursor: pointer;}
.single-bottom{border-top: 1px solid #E1E8F0;padding: 15px 20px;}
.add-banner{text-align: left;color: #83C9FF;cursor: pointer;}
.single-top .icon-tianjia{padding:0 12px 0 24px;vertical-align: middle;}
.single-title{padding-bottom: 15px;display: block;}
.el-upload{position: relative; border: 1px solid #DBE5EF !important;margin-top: 10px;border-radius: 3px;background: #f5f5f5;width: 100%;height: 180px;}
.el-upload img{width: 188px;height: 155px;}
.photo-uoload{background: #67B1FF;padding: 5px 16px;display: block;width: 100px;border-radius: 3px;color: white;margin: 20px auto 10px auto;}
.photo-info{font-size: 10px;line-height: 15px;}
.photo-show{padding: 24px 10px 10px 10px;}
.tupian-icon{font-size: 28px !important;color: #C0C4CA;}
.banner-left{cursor: pointer;}
.singleActive{display: none;}
.single-label1{padding-top: 0 !important;}
.single-label{padding: 15px 0 10px 0;display: inline-block;font-size: 12px;}
.single-bottom input{font-size: 12px;}
.set-bg{color: #5DAFFF ;font-size: 10px;cursor: pointer;}
</style>