<template>
  <div>
    <div class="activity-container">
			<a href="http://haiqihuocang.cn/iwantcdm/xindex.php?m=muban&act=index#"><div class="back" style="border-radius:5px;width: 100px;height: 25px;line-height: 25px;color: #fff;background: #0190FE;text-align: center;margin-bottom: 15px;">返回活动列表</div></a>
      <div class="activity-box clearfix">
        <div class="from-group">
          <label for="">活动名称</label>
          <input type="text" placeholder="请输入活动名称" v-model="name" />
        </div>
        <div class="from-group">
          <label for="">活动说明</label>
          <input type="text" placeholder="请输入活动说明" v-model="desc_text" />
        </div>
        <!--<button type="button" class="btn">保存</button>-->
      </div>

      <div class="activity-box clearfix">
        <el-date-picker
        	placeholder="开始时间-结束时间"
        	id="activity-box"
        	v-model="activityTime"
        	type="datetimerange"
        	align="left"
        	class="picker-date">
        </el-date-picker>
      </div>

    </div>
		
    <div class="activity-block">
      <el-row :gutter="20" style="margin: 0;">

        <el-col :span="4">
          <div class="grid-content bg-purple">
            <div class="activity-titletop">
              <i class="iconfont icon-xiangzuo"></i>
              <span>活动页管理</span>
            </div>

            <div class="activity-component">


              <VActivity
              	v-for="(item,index) in list"
              	:itemData="item"
              	:index="index"
              	:indexActive="indexActive"
              	v-on:changeBg="changeBg"
              	v-on:delete="deleteList"
              	v-dragging="{item: item, list: list, group: 'item'}"
              	:key="item.keyValue"
              >
              </VActivity>

              <!--添加组件-->
              <div>

                <div class="activity-addbtn" id="addComponent" @click="isShow = !isShow">
                  <i class="left iconfont icon-tianjia"></i>
                  <span>添加组件</span>
                </div>

                <transition name="fade">
                  <div class="activity-cbox clearfix" v-show="isShow">
                    <ul>
                      <li @click="clickKey(item,index)" v-for="(item,index) in list1" :class="{cbox:cbox == index}">
                        <i class="iconfont" :class="getClassObj(index)"></i>
                        <div>{{item.plateName}}</div>
                      </li>
                    </ul>
                  </div>
                </transition>

                <div class="text-right set-bg">
                	设置背景
                	<el-upload
                		style="margin-top: -20px;opacity: 0;height: 30px;"
									  class="avatar-uploader"
									  action="http://test.haiqihuocang.com/api/index.php?m=home&act=getImage2"
									  :show-file-list="false"
									  :on-success="handleAvatarSuccess"
									  :before-upload="beforeAvatarUpload">
									  <img v-if="imageUrl" :src="imageUrl" class="avatar">
									  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
									  
									</el-upload>
                </div>

              </div>

            </div>
            <div class="activity-sure" @click="createActivity">
              <span>确认生成活动</span>
            </div>

          </div>
        </el-col>

        <el-col :span="4">
          <component
            v-if="currentCom"
          	:is="currentCom"
          	v-on:changeData="changeData"
          	:currentComData="currentComData" 
          	:goodsList="goodsList"
          	:total="total"
          	v-on:getActivityList="getActivityList"
          >
          </component>
          <!--<component v-bind:is="XXX"></componment>来引用，XXX处为你所需要的标签</strong>  -->
        </el-col>

        <el-col :span="6" :offset="2">
          <div class="grid-content" style="width: 375px;">
            <VShow 
            	:list="list"
            	:imageurl="imageurl"
            ></VShow>
          </div>
        </el-col>

      </el-row>
    </div>
		
		<div class="mask" v-show="show_mask" @click="not_show">
			<div class="alert">
				<p style="font-size: 25px;text-align: center;margin-top: 50px;">请选择保存方式</p>
				<div class="sure_save" @click="sure_save">保存为新活动</div>
				<div class="sure_change" @click="sure_change">修改当前活动</div>
			</div>
		</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import VActivity from './ComponentBtn/Index'
  import VBanner from './Banner/Index'
  import VSingle from './Single/Index'
  import VDouble from './Double/Index'
  import VShow from './Show/Index'
  import { postActivityList ,getActivityList,changeinfo,clearcookie } from '@/api/activity'

  export default {
    components: {
      VActivity,
      VBanner,
      VSingle,
      VDouble,
      VShow
    },
    created(){
    	this.getActivityList();
    	function getCookie(name)
			{
			  var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			  if(arr=document.cookie.match(reg))
			  return unescape(arr[2]);
			  else
			  return null;
			}
			let muban_id={
				muban_id:getCookie("muban_id")
			}
			if (getCookie("muban_id")!=null) {
				changeinfo(muban_id).then(res=>{
					console.log(res);	
					this.imageurl=res.templateInfo.image;
					this.name=res.templateInfo.name;
					this.desc_text=res.templateInfo.desc_text;//描述
					let start=res.templateInfo.date_start.split(" ")[0].split("-").join(",")+","+res.templateInfo.date_start.split(" ")[1].split(":").join(",");
					let end=res.templateInfo.date_end.split(" ")[0].split("-").join(",")+","+res.templateInfo.date_start.split(" ")[1].split(":").join(",");
					for (var i = 0; i < start.split(",").length; i++) {
						String(Number(start.split(",")[1])-1);
						if (start.split(",")[3].length==2) {
							var  four=start.split(",")[3].substring(1)
						}
						if (start.split(",")[4].length==2) {
							var  five=start.split(",")[4].substring(1)
						}
						if (start.split(",")[5].length==2) {
							var  six=start.split(",")[5].substring(1)
						}
					}	
					for (var j = 0; j < end.split(",").length; j++) {
						String(Number(end.split(",")[1])-1);
						if (end.split(",")[3].length==2) {
							var  aa=end.split(",")[3].substring(1)
						}
						if (end.split(",")[4].length==2) {
							var  bb=end.split(",")[4].substring(1)
						}
						if (end.split(",")[5].length==2) {
							var  cc=end.split(",")[5].substring(1)
						}
					}		
					this.activityTime=[new Date(start.split(",")[0],start.split(",")[1]-1,start.split(",")[2],four,five,six),new Date(end.split(",")[0],end.split(",")[1]-1,end.split(",")[2],aa,bb,cc)];
					var keyValue=0;
					for (var i = 0; i < res.data.length; i++) {
						switch(res.data[i].actype)
						{
						case "0":
							console.log(res.data[i].son);
							this.list.push({
								category_id:res.data[i].category_id, 
								bannerItems:res.data[i].son,
								bannernum:0,
								keyValue:keyValue,
								plateName:"图片板块",
								type:0
							});
							for (var j = 0; j < res.data[i].son.length; j++) {
								res.data[i].son[j].bannername="轮播Banner";
							}
							keyValue++;
						  break;
						case "1":
							this.list.push(
								{	
									category_id:res.data[i].category_id, 
									buymore:res.data[i].buymore,
									freight_id:res.data[i].freight_id,
									keyValue:keyValue,
									name:res.data[i].name,
									name_two:res.data[i].name_two,
									plateName:"单列商品",
									rule_id:res.data[i].rule_id,
									selected:res.data[i].son,
									type:1
								}
							);
							keyValue++;
						  break;
						case "2":
							this.list.push(
								{
									category_id:res.data[i].category_id, 
									buymore:res.data[i].buymore,
									freight_id:res.data[i].freight_id,
									keyValue:keyValue,
									name:res.data[i].name,
									name_two:res.data[i].name_two,
									plateName:"双列商品",
									rule_id:res.data[i].rule_id,
									selected:res.data[i].son,
									type:2
								}
							);
							keyValue++;
						  break;
						default:
						}
					}					
				})
			}
    },
    data() {
      return {
      	imageUrl:"",
      	show_mask:0,
      	name:'',//模板名称
      	desc_text:'',//模板描述
        currentCom: '', //存储组件  图片板块 单列商品 双列商品
        currentComData: {}, //存储数据
        activityTime: [], //活动时间
        isShow: false, //添加组件的组件是否显示
        list: [], //添加组件列表
        list1: [{
            'plateName': '图片板块',
            'type': 0
          },
          {
            'plateName': '单列商品',
            'type': 1
          },
          {
            'plateName': '双列商品',
            'type': 2
          }
        ], //添加组件的组件
        indexActive: 0, //添加组件的选中样式
        cbox: 0, //添加组件下的组件的选中样式,
        activityName: '', //活动名称
        activityDescription: '', //活动说明
        goodsList: [], //商品列表
        total:0,//总页数
        page: 1,
        muban_id:-1,
        imageurl:""
      }
    },
    methods: {
    	handleAvatarSuccess(res, file) {
    		console.log(res);
        this.imageurl = res.data[0];
//      console.log(imageurl);
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
    	not_show(){
    		this.show_mask=0;
    	},
    	changeData(data){
      	console.log(data)
        this.list[this.indexActive] = data
     },
      //获取活动列表
	  	getActivityList(page,selected,pname,categoryid){
	  		page == undefined?page = 1:undefined;
	  		let params = {
	  			"page": page,
	  			"pname":pname,
					"category_id":categoryid
	  		};
	  		getActivityList(params).then(res=>{
	  			this.goodsList = res.data
	  			this.total=Number(res.total);
	  			//选中商品替代新的商品
	  			if (this.currentComData["selected"].length>0) {
						for (var i = 0; i < res.data.length; i++) {
								for (var j = 0; j < this.currentComData["selected"].length; j++) {
									if (res.data[i].product_id==this.currentComData["selected"][j].product_id) {
										this.goodsList[i]=this.currentComData["selected"][j];
									}
								}
						}	  				
	  			}
	  		})
	  	},
      //添加组件 把整个数组传过来了
      clickKey(itemData, i) {
//      console.log(itemData)
				this.currentCom = ''
        this.cbox = i;
        let currentCom = '';
				let maxKeyValue = _.max(_.map(this.list, function(chr) {
					 return chr.keyValue;
				}));   
				if (this.list.length >0) {
					itemData["keyValue"] = maxKeyValue+1;
				}else{
					itemData["keyValue"]=0;
				}
        switch(itemData.type) {
          case 0:
//          this.currentCom = 'VBanner'
            itemData.bannernum=0;
            itemData['bannerItems']=[];
            break;
          case 1:
//          this.currentCom = 'VSingle'
            itemData["freight_id"] = '' //运费
            itemData["rule_id"] = '' //规则
            itemData["buymore"] = '' //是否单品购买
            itemData["selected"]=[]//已选择的商品
            itemData["name"]=""
            itemData["name_two"]=""
            break;
          case 2:
//          this.currentCom = 'VDouble'
            itemData["freight_id"] = '' //运费
            itemData["rule_id"] = '' //规则
            itemData["buymore"] = '' //是否单品购买
            itemData["selected"]=[]//已选择的商品
            itemData["name"]=""
            itemData["name_two"]=""
            break;
        }
        this.currentComData = _.cloneDeep(itemData)
        this.list.push(_.cloneDeep(itemData))
//      console.log(this.list);
        this.indexActive = this.list.length-1 //点击谁显示谁
        this.$forceUpdate()
//      console.log(_.cloneDeep(itemData))
      },
      //图标
      getClassObj(index) {
        return {
          'icon-banner': index == 0,
          'icon-danliebaobeimokuai': index == 1,
          'icon-shuangliebaobei': index == 2
        }
      },
      //选中  添加组件的选中样式
      changeBg(index, itemData) {
        //  		console.log(index)
        //  		console.log(itemData);
        this.indexActive = index;
        this.currentComData = itemData;
        let currentCom = '';
        switch(itemData.type) { //type: 1 2 3
          case 0:
            currentCom = 'VBanner'
            break;
          case 1:
            currentCom = 'VSingle'
            break;
          case 2:
            currentCom = 'VDouble'
            break;
        }
        this.currentCom = currentCom;
      },
      //添加组件  确定删除
      deleteList(index) {
        this.list.splice(index, 1)
        this.currentCom = '';
      },
			setCookie(cname, cvalue, exdays){
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        console.info(cname + "=" + cvalue + "; " + expires);
        document.cookie = cname + "=" + cvalue + "; " + expires;
        console.info(document.cookie);
    	},
    	//获取cookie
	    getCookie(cname){
	        var name = cname + "=";
	        var ca = document.cookie.split(';');
	        for (var i = 0; i < ca.length; i++) {
	            var c = ca[i];
	            while (c.charAt(0) == ' ') c = c.substring(1);
	            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
	        }
	        return "";
	    },
    	//清除cookie
	    clearCookie(cname){
	      this.setCookie(cname, "", 0);
	    },
      //存为新的活动
      sure_save(){
//    	this.clearCookie("muban_id");
//    	this.createActivity();
				let clear={
					"muban_id":0
				}
				clearcookie(clear).then(res=>{
					console.log(res);
					this.createActivity();
		  	})
      },
      //修改活动
      sure_change(){
//				this.clearCookie("muban_id");
//    		this.createActivity(1);
					this.muban_id=this.getCookie("muban_id");
					let clear={
						"muban_id":0
					}
					clearcookie(clear).then(res=>{
	//					console.log(res);
						this.createActivity(1);
			  	})
      },
      //确定生成活动
      createActivity(change) {
      	if (this.getCookie("muban_id")!="") {
      		this.show_mask=1;
      	}else{
	      	//templateInfo
	      	let templateInfo={};
	      	let activityInfo=[];
	      	templateInfo.name=this.name;//活动名称
	      	templateInfo.desc_text=this.desc_text;//描述
	      	if (change==1) {
	      		templateInfo.muban_id=this.muban_id;//描述
	      	}
	      	let start = new Date(this.activityTime[0]);
					let date_start=start.getFullYear() + '-' + (start.getMonth() + 1) + '-' + start.getDate() + ' ' + start.getHours() + ':' + start.getMinutes() + ':' + start.getSeconds();
					let end=new Date(this.activityTime[1]);
					let date_end=end.getFullYear() + '-' + (end.getMonth() + 1) + '-' + end.getDate() + ' ' + end.getHours() + ':' + end.getMinutes() + ':' + end.getSeconds(); 
	      	templateInfo.date_start=date_start;//开始时间
	      	templateInfo.date_end=date_end;//结束时间
	      	templateInfo.image=this.imageurl;//背景图片
//	      	console.log(templateInfo);
//	      	console.log(this.list);
	      	//activityInfo
	      	for (var i = 0; i < this.list.length; i++) {
		        switch(this.list[i].type)
						{
							case 0:
								let banner={};//banner
								banner.actype=this.list[i].type;//类型
								let activityImage=[];//图片
								let banner_url=[];//链接
								for (var j = 0; j < this.list[i].bannerItems.length; j++) {
									activityImage.push(this.list[i].bannerItems[j].activityImage);
								}//图片处理
								for (var k = 0; k < this.list[i].bannerItems.length; k++) {
									banner_url.push(this.list[i].bannerItems[k].banner_url);
								}//链接处理
								banner.activityImage=activityImage.join(",");
								
								banner.banner_url=banner_url.join(";");
								if (change==1&&this.list[i].category_id) {//修改
									banner.category_id=this.list[i].category_id;
								}
								activityInfo.push(banner);
//								console.log(banner);
								break;
							case 1:
								let  single={};//single
								single.actype=this.list[i].type;
								single.freight_id=this.list[i].freight_id;
								single.buymore=this.list[i].buymore;
								single.rule_id=this.list[i].rule_id;
								single.name=this.list[i].name;
								single.name_two=this.list[i].name_two;
								for (var j = 0; j < this.list[i].selected.length; j++) {
									this.list[i].selected[j].activity_price=this.list[i].selected[j].price;
								}
								single.productInfo=this.list[i].selected;
								if (change==1&&this.list[i].category_id) {
									single.category_id=this.list[i].category_id;//修改
								}
								activityInfo.push(single);
//								console.log(single);
							  break;
							case 2:
								let  Double={};//double
								Double.actype=this.list[i].type;
								Double.freight_id=this.list[i].freight_id;
								Double.buymore=this.list[i].buymore;
								Double.rule_id=this.list[i].rule_id;
								Double.name=this.list[i].name;
								Double.name_two=this.list[i].name_two;
								for (var j = 0; j < this.list[i].selected.length; j++) {
									this.list[i].selected[j].activity_price=this.list[i].selected[j].price;
								}
								Double.productInfo=this.list[i].selected;
								if (change==1&&this.list[i].category_id) {
									Double.category_id=this.list[i].category_id;//修改
								}
								activityInfo.push(Double);
//								console.log(Double);
							  break;
							default:
						}
	      	}
					console.log(activityInfo);
					console.log(templateInfo);
					let create={};
					create.activityInfo=activityInfo;
					create.templateInfo=templateInfo;
					let str=JSON.stringify(create);
					let xiaochu=JSON.parse(str.replace('&',''));
					console.log(xiaochu);
					//生成活动
					postActivityList(xiaochu).then(res=>{
						console.log(res.data);
						history.back();
		  		})	
      }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .grid-content {
    min-width: 180px;
  }
.mask{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.6);
	z-index: 999;
}
.mask .alert{
	width: 20%;
	height: 200px;
	background: #fff;
	border-radius: 15px;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
}
.mask .alert div{
	width: 150px;
	background: rgb(1, 144, 254);
	color: rgb(255, 255, 255);
	text-align: center;
	line-height: 40px;
	border-radius: 5px;
	float: left;
	margin-left: 25px;
	cursor: pointer;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>









