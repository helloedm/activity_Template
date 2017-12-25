<template>
  <div class="grid-content bg-purple">
    <div class="activity-titletop">
      <i class="iconfont icon-xiangzuo"></i>
      <span>双列商品设置</span>
    </div>

    <div class="activity-component">
      <span class="font-gray single-title">内容</span>

      <div class="single-box">
        <div class="single-top clearfix" @click="bottomShow = !bottomShow">
          <div class="left banner-left">
					  <i class="iconfont icon-triangle-right"></i>
						<span>双列商品</span>
          </div>
          <span class="right">
      	<i class="iconfont icon-tuodong" style="font-size: 10px;" ></i>
      </span>
        </div>
        <transition name="fade">
          <div class="single-bottom" v-if="bottomShow">
            <div>
              <label class="single-label single-label1">主标题</label>
              <el-input v-model="currentComData.name" placeholder="主标题" v-on:input="changeData"></el-input>
            </div>

            <div>
              <label class="single-label">描述</label>
              <el-input v-model="currentComData.name_two" placeholder="描述" v-on:input="changeData"></el-input>
            </div>

            <div>
              <label class="single-label">规则设置</label>
              <el-select v-model="currentComData.rule_id" placeholder="请选择"  @change="changeData(currentComData)">
                <el-option v-for="item in rule_id" :key="item.rule_id" :label="item.rule_content" :value="item.rule_id">
                </el-option>
              </el-select>
            </div>

            <div>
              <label class="single-label">运费方案选择</label>
              <el-select v-model="currentComData.freight_id" placeholder="请选择" @change="changeData(currentComData)">
                <el-option v-for="item in freight_id" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div>
              <label class="single-label">单品购买限制</label>
              <el-select v-model="currentComData.buymore" placeholder="请选择" @change="changeData(currentComData)">
                <el-option v-for="item in buymore" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>

						<div style="margin:15px 0;font-size: 12px;">
							<div>已选商品({{currentComData.selected.length}})</div>
							<div class="yixuan-sp">
								<ul class="clearfix">
									<li
										v-for="(item,index) in currentComData.selected"
										class="goods_prev"
									>
										<img :src="item.image">
										<div class="introduce">
											<p>ID:{{item.product_id}}</p>
											<div>{{item.pname}}</div>
											<p>活动价:{{item.price}}</p>
										</div>
									</li>
								</ul>
							</div>
						</div>

          </div>
        </transition>
      </div>

      <div class="single-box" @click="centerDialogVisible">
        <div class="single-top add-banner">
          <i class="iconfont icon-tianjia"></i>
          <span>添加商品</span>
        </div>
      </div>

			<el-dialog
			  title="商品集商品选择"
			  :visible.sync="show_goods"
			  width="80%"
			  top="30px"
			  center>
			  <div class="sp-box">
			  	<div class="spbox-top">
			  		<el-input v-model="goodsName" placeholder="搜索商品名／商品ID" class="sp-input"></el-input>
			  		<el-select v-model="goodsType" placeholder="请选择" class="sp-input">
					    <el-option
					      v-for="item in categoryList"
					      :key="item.value"
					      :label="item.name"
					      :value="item.category_id">
					    </el-option>
					  </el-select>
					  <el-button type="primary" size="small" class="spbox-search" @click="search">搜索</el-button>
			  	</div>

			  	<div class="sp-table">
				    <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
				    	<tr>
				    		<th>商品图</th>
				    		<th>ID</th>
				    		<th>商品名</th>
				    		<th>所属分类</th>
				    		<th>所属品牌</th>
				    		<th>操作</th>
				    	</tr>
				    	<tr v-for="(item,index) in goodsList">
				    		<td><img :src="item.image" class="sp-image"/></td>
				    		<td>{{item.product_id}}</td>
				    		<td style="max-width: 150px;">{{item.pname}}</td>
				    		<td>{{item.cname}}</td>
				    		<td>{{item.mname}}</td>
				    		<td>
				    			<span class="sp-activity" @click="select_activityproducts(index)" v-if="item.in_activity==0">选为活动商品</span>
				    			<span class="qx-activity" @click="noselect(index,item.product_id)" v-else>取消已选择</span>
				    		</td>
				    	</tr>
				    	<tr>
				    		<td colspan="6">
				    			<div class="block">
								    <el-pagination
								      @current-change="handleCurrentChange"
								      :current-page.sync="currentPage"
								      :page-size="5"
								      layout="prev, pager, next, jumper"
								      :total="total">
								    </el-pagination>
								    <!--current-change当前页数改变时会触发-->
								  </div>
				    		</td>
				    	</tr>
				    </table>
			  	</div>

			    <div class="sp-table" style="padding: 0 20px;font-size: 12px;">
			    	<p>已选商品 </p>
			    	<div class="yixuan-spbox">
			    		<ul>
			    			<li class="clearfix" v-for="(item,index) in currentComData.selected" @click="passindex(index)">
			    				<el-upload
			    					:index="index"
			    					style="width: 94px;height:94px;float: left;"
									  class="avatar-uploader"
									  action="http://test.haiqihuocang.com/api/index.php?m=home&act=getImage2"
									  :show-file-list="false"
									  :on-success="handleAvatarSuccess"
									  :before-upload="beforeAvatarUpload">
									  <img v-if="item.image" :src="item.image" class="avatar">
									  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
									</el-upload>
			    				<div class="right">
			    					<div class="yixuan-group">
			    						<label for="">排序</label>
			    						<el-input v-model="item.sort_order" type="number"></el-input>
			    					</div>
			    					<div class="yixuan-group">
			    						<label for="">商品名</label>
			    						<el-input v-model="item.pname"></el-input>
			    					</div>
			    					<div class="yixuan-group">
			    						<label for="">描述</label>
			    						<el-input v-model="item.product_desc"></el-input>
			    					</div>
			    					<div class="yixuan-group">
			    						<label for="">活动价</label>
			    						<el-input v-model="item.price" type="number"></el-input>
			    					</div>
			    				</div>
			    			</li>
			    		</ul>
			    	</div>
			    	<div class="text-center" style="margin-bottom: 15px;">
			    		<el-button type="primary" @click="sure_add">确认添加商品</el-button>
			    	</div>
			    </div>

			  </div>
			  <!--<span slot="footer" class="dialog-footer">
			    <el-button @click="centerDialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
			  </span>-->
			</el-dialog>

    </div>
  </div>
</template>
<script>
	import { getruleList,categoryList,getActivityList } from '@/api/activity'
  export default {
  	props: {
  		currentComData: {
  			type: Object,
  			default: function(){
  				return {
  				}
  			}
  		},
  		goodsList: {
  			type: Array
  		},
  		total:{
  			type:Number
  		}
  	},
    data() {
      return {
      	index:-1,
        singleItems: [], //存储数据的
        input: '',
        imageUrl: '',
        bottomShow: true, //切换滑块
        rule_id: [],//规则plateName
        freight_id: [{
          value: '1',
          label: '包邮'
        }, {
          value: '2',
          label: '满80包邮'
        }],//运费
        buymore: [{
          value: '0',
          label: '多品购买'
        }, {
          value: '1',
          label: '单品购买'
        }], //是否单品购买
        categoryList:[
        	
        ],
        value: '',
        show_goods: false, //弹窗
        currentPage: 1, //分页 当前页数
        goodsName: '',//商品名称
        goodsType: '',//商品类别
        selected_products:[],//已选商品
        imageUrl: ''
      }
    },
    created(){
    	this.getruleList();
			categoryList().then(res=>{
				console.log(res);
				for (var i = 0; i < res.data.length; i++) {
						this.categoryList.push(
							{category_id:res.data[i].category_id,name:res.data[i].name}
						)
				}
				console.log(this.categoryList);
			})
    },
    updated(){
    	this.selected_products=this.currentComData.selected;
    },
    methods: {
    	getruleList(){
	  		getruleList().then(res=>{
	  			console.log(res.data);
	  			this.rule_id=res.data;
	  		})
	  	},
    	passindex(index){
    		this.index=index;
    	},
    	handleAvatarSuccess(res, file) {
    		this.currentComData.selected[this.index]['image']=res.data[0];
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
    	centerDialogVisible(){
    		let params = {
	  			"page": 1,
	  		};
	  		getActivityList(params).then(res=>{
	  			this.goodsList = res.data;
	  			this.total=Number(res.total);
	  		})
    		this.show_goods = true;
    		console.log(this.currentComData["selected"]);
    		for (var i = 0; i < this.goodsList.length; i++) {
    			this.goodsList[i].in_activity=0;
    		}
    		for (var i = 0; i < this.goodsList.length; i++) {
							for (var j = 0; j < this.currentComData["selected"].length; j++) {
								if (this.goodsList[i].product_id==this.currentComData["selected"][j].product_id) {
									this.goodsList[i].in_activity=1;
								}
							}
				}   
    	},
    	changeData(){
    		//cloneDeep递归深拷贝
   			this.$emit('changeData', this.currentComData)
			},
			//currentChange当前页数改变时会触发
			handleCurrentChange(val) {
				this.$emit('getActivityList',val,_.uniq(this.currentComData["selected"]),this.goodsName,this.goodsType);
			},
			//搜索
			search(){
				let and=this.goodsName.replace('&','');
				let pname={
					"page":1,
					"pname":and,
					"category_id":this.goodsType
				}
				console.log(this.goodsName);
				getActivityList(pname).then(res=>{
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
			//选中的商品
			select_activityproducts(index){
				this.goodsList[index].in_activity=1;
				this.currentComData["selected"].push(this.goodsList[index]);
				this.changeData();
			},
			//取消选中
			noselect(index,productsid){
				this.goodsList[index].in_activity=0;
				//传入对应的ID，在当前列表下将其删除
				for (var i = 0; i < this.currentComData["selected"].length; i++) {
					if (this.currentComData["selected"][i].product_id==productsid) {
						this.currentComData["selected"].splice(i, 1);
					}
				}
				this.changeData();
			},
			sure_add(){
				this.show_goods = false;
				this.changeData();
			}
		}
}
</script>
<style scoped="scoped">
.sp-box{background: #F7F7F7;padding:15px 20px;min-width: 950px;}
.sp-input{width: 192px;}
.sp-table table tr th{line-height: 40px;}
.sp-table table tr{text-align: center;}
.sp-table table tr td{border-top: 1px solid #E2E2E2;}
.sp-image{vertical-align: middle; width: 40px;height: 40px;margin: 10px auto;}
.sp-activity{color: #5DAFFF;cursor: pointer;}
.qx-activity{color:#FF6C6C;}
.block{text-align: right;padding-right: 10px;margin: 10px 0;}
.yixuan-spbox{margin-bottom: 10px;height: 265px;overflow-y: scroll;}
.yixuan-spbox ul li{width: 275px;box-shadow:0px 0px 4px 1px #ECECEC;height: 120px;padding: 10px;margin:0 0 8px 8px;border-radius: 3px;}
.yixuan-spbox ul li:nth-child(3n-2){margin-left: 0;}
.yixuan-spbox ul li img{width: 94px;height: 94px;vertical-align: middle;}
.yixuan-group{margin-top: 6px;}
.yixuan-group label{width: 36px;display: inline-block;}
.yixuan-sp{width: 165px;margin: 10px auto 0 auto;}
.yixuan-sp ul{width: 100%;}
.yixuan-sp ul li{width: 30%;float: left;margin:0 5px 3px 0;position: relative;}
.yixuan-sp ul li img{width: 45px;height: 45px;border: 1px solid #E9E9E9;}
.yixuan-sp ul li:hover .introduce{
	display: block;
}
.introduce{
	z-index: 99;
	width: 145px;
	height: 75px;
	box-shadow: 0 0 7px 0 rgba(0,0,0,0.10);
	border-radius: 7px;
	position: absolute;
	top: 0;
	left: 0;
	background: #fff;
	word-break: break-all;
	padding-left: 10px;
	padding-right: 10px;
	display: none;
}
.introduce p{
	-webkit-margin-before: 0;
  -webkit-margin-after: 0;
}
.introduce p:nth-child(1){
	margin-top: 5px;
}
.introduce div{
	width: 100%;
	margin-top: 5px;
	overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.introduce p:nth-child(3){
	margin-top: 5px;
	color: red;
}
::-webkit-scrollbar  
{  
  width: 0;  
  height: 0;  
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
        width: 100%;
    height: 94px;
}
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 94px;
    height: 94px;
    line-height: 94px;
    text-align: center;
  }
  .avatar {
    width: 94px;
    height: 94px;
    display: block;
  }
</style>