<template>
  <div  v-bind:style="{'border': '1px solid #D1D1D1','margin-top':'15px','height':'700px','overflow-y':'auto','background':'url('+imageurl+')','background-size':'contain','background-repeat':'repeat-y'}">
  	<!-- style="border: 1px solid red;"-->
  	<!--banner-->
   <!--<img :src="imageurl" alt="" />-->
   <div v-for="(item,index) in list">
	   	<swiper :options="swiperOption" class="swiper-box" v-show="item.type===0">
	      <swiper-slide class="swiper-item" v-for="(item,index) in item.bannerItems" :key="item.index">
	      	<img :src="item.activityImage" style="width: 100%;">
	      </swiper-slide>
	      <div class="swiper-pagination" slot="pagination"></div>
	    </swiper>
	    
	    <!--<div class="box" v-show="item.type===1">
	    	<div class="single-top">
	    		<div class="line"></div>
	    		<div class="title">热销爆款</div>
	    		<div class="line"></div>
	    	</div>
	    	<div class="single-btm">
	    		<img src="../../../assets/404_images/404.png"/>
	    		<div class="single-description">【护肤效果翻十倍】 A.H.C B5玻尿酸保湿精华液  (50ml)</div>
	    		<div class="single-price">专享价：188RMB</div>
	    		<div class="text-center"><i class="iconfont icon-yinhao-copy-copy"></i></div>
	    		<div class="single-desc">
	    			精华水只知道SK2神仙水？还有性价比更高的精华水。ABC B5玻尿酸保湿精华液 ，特别适合干燥，粗糙皮肤，富含玻尿酸原因，补水出色，敏感肌也可使用哦。
	    		</div>
	    	</div>
	    </div>-->
	    <div class="box" v-show="item.type===1">
	    	<div class="single-top">
		    		<div class="line"></div>
		    		<div class="title">{{item.name}}</div>
		    		<div class="line"></div>
		    </div>	 
	    	<div v-for="(item,index) in item.selected">   	
			    <div class="box_single">
			    	<img :src="item.image" alt="" />
			    	<div class="right">
			    		<div class="des">{{item.product_desc}}</div>
			    		<div class="line"></div>
			    		<div class="name">{{item.pname}}</div>
			    		<p style="-webkit-margin-before: 0em;-webkit-margin-after: 0em;margin-left: 15px;margin-top: 5px;font-size:12px;">
			    			RMB:<span style="color: red;font-size: 14px;">{{item.price}}元</span>
			    		</p>
			    		<div class="buy_now">立即抢购</div>
			    	</div>
			    </div>	   	    		
	    	</div>
	    </div>

	    
			<div class="box" v-show="item.type===2">
	    	<div class="single-top">
	    		<div class="line"></div>
	    		<div class="title">{{item.name}}</div>
	    		<div class="line"></div>
	    	</div>
		    	<div class="double-box">
		    		<ul class="clearfix">
		    			<li v-for="(item,index) in item.selected">
		    				<img :src="item.image"/>
		    				<div class="double-btm">
		    					<p class="double_name">{{item.pname}}</p>
		    					<div class="double-desc">
											{{item.product_desc}}
			    				</div>
			    				<div class="double-price">专享价：{{item.price}}RMB</div>
			    				<div class="buy_now">立即抢购</div>
		    				</div>
		    			</li>
		    		</ul>
		    	</div>	    		
   		</div>
   </div>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.min.css'
  export default {
  	props: {
  		list: {
  			type: Array,
  			default: function(){
  				return {
  					
  				}
  			}
  		},
  		imageurl:""
  	},
    components: { 
      swiper,
      swiperSlide
    },
    updated(){
    	console.log(this.imageurl);
    },
    data() {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          slidesPerView: 1,
          paginationClickable: true,
          spaceBetween: 30,
//        mousewheelControl: true
        }
      }
    },
    methods:{
    	
    },
  }
</script>

<style scoped="scoped">
.double_name{
	overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-weight:bold;
}
.box_single{
	width: 95%;
	margin: 0 auto;
	height: 118px;
	margin-top: 12px;
	background: #fff;
}
.box_single .right{
	float: left;
}
.box_single .right .des{
	  width: 160px;
    font-weight: 600;
    font-size: 14px;
    margin-left: 15px;
    color: rgb(51,51,51);
    height: 33px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
.box_single .right .line{
	  width: 40px;
    height: 2px;
    background: rgb(51, 51, 51);
    margin-left: 15px;
    margin-top:5px;
}
.box_single .right .name{
		width: 156px;
    font-size: 12px;
    margin-left: 15px;
    color: rgb(51,51,51);
    height: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-all;
    margin-top: 12px;
}
.box_single .right .buy_now{
		width: 98px;
    height: 22px;
    background: #FF5454;
    color: #fff;
    line-height: 22px;
    text-align: center;
    margin-left: 15px;
    margin-top: 5px;
    font-size: 12px;
    border-radius: 4px;
}
.box_single img{
	width: 140px;
	height: 100%;
	margin: 0 auto;
	float:left;
}
/*.swiper-box{height: 300px;}*/
.swiper-item img{width: 100%;}
.single-top{display: flex;align-items: center;justify-content: center;font-weight: bold;}
.single-top .title{padding: 0 5px;font-size: 16px;}
.single-top .line{border-bottom: 1px solid #303030;width: 10px;}
.single-btm{padding:0 15px;}
img{width: 100%;}
.single-description{font-size: 16px;color: #1D1D1D;letter-spacing: 3.07px;padding: 14px 0 10px 0;line-height: 20px;font-weight: bold;text-align: center;}
.single-price{text-align: center;font-size: 14px;color: #FF3333;letter-spacing: 3.07px;}
.icon-yinhao-copy-copy{color: #CCCCCC;line-height: 30px;}
.single-desc{color: #CCCCCC;font-size: 12px;line-height: 18px;}
.double-box{padding: 0 15px;}
.double-box ul li{width: 165px;float: left;margin:0 10px 10px 0;border: 1px solid #EAEAEA;background: #f8f8f8;}
.double-box ul li:nth-child(2n){margin-right: 0;}
.double-box ul li img{width: 100%;height: 160px;}
.double-desc{
		font-size: 12px;
		line-height: 15px;
		margin-bottom: 8px;
		overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #B0B0B0;
}
.double-keyword{font-size: 12px;color: #CCCCCC;}
.double-price{
	font-size: 12px;
	color: #FF3333;
	line-height: 30px;
	}
.double-btm{padding: 0 5px;	padding-bottom: 10px;}
.box{margin-top: 20px;}
::-webkit-scrollbar  
{  
  width: 0;  
  height: 0;  
}
.buy_now{
	width: 149px;
	height: 28px;
	margin:0 auto;
	background: #F24E4E;
	border-radius: 4px;
	color: #fff;
	line-height:28px;
	text-align: center;
}
</style>