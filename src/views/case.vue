<script src="../common/Blob.js"></script>
<script src="../common/jquery.table2excel.js"></script>
<template>
	<div id="scheduling">
		<div class="wc-page-top">
			<div class="top-name">
				<div class="top-close iconfont icon-zuojiantou" @click="backLast"><span>返回</span></div>
				<div class="top-title">案例分析</div>
			</div>
		</div>
		<div class="table" border="1">
			<div class="search-content">
				<el-input @click.native="inputClick($event)" placeholder="请输入姓名" v-model="search" @blur="scrollChange" clearable>
				</el-input>
				<el-button class="search" @click.native="Search()">搜索</el-button>
				<el-button class="search primary" plain @click.native="addCase">添加案例</el-button>
				<el-button class='btn_table' type='primary' id="excell" @click="method5('dataTable')" plain>导出Excle表格</el-button>
			</div>
			<table class="table2excel" id="dataTable">
				<tr>
					<td style="min-width: 300px;text-align:center;">行业</td>
					<td style="min-width: 300px;text-align:center;">客户名称</td>
					<td style="min-width: 100px;text-align:center;">品牌名称</td>
					<td style="min-width: 100px;text-align:center;">品牌标语</td>
					<td style="min-width: 100px;text-align:center;">品牌价值观</td>
					<td style="min-width: 100px;text-align:center;" v-for="longItem in longer" :key="longItem.id">

						<table>
							<tr>
								<td colspan='6' style="text-align:center;border-bottom:1px solid #000;">行业龙头</td>
							</tr>
							<tr>
								<td style="min-width: 300px;text-align:center;border-right:1px solid #000;">产品名称</td>
								<td style="min-width: 300px;text-align:center;border-right:1px solid #000;">产品价格</td>
								<td style="min-width: 300px;text-align:center;border-right:1px solid #000;">直接竞品</td>
								<td style="min-width: 300px;text-align:center;border-right:1px solid #000;">对比优势</td>
								<td style="min-width: 300px;text-align:center;border-right:1px solid #000;">对比劣势</td>
								<td style='min-width: 300px;text-align:center;'>产品人群定位</td>
							</tr>
						</table>
					</td>
					<td style="min-width: 300px;text-align:center;">优秀案例</td>
					<td style="min-width: 300px;text-align:center;">操作</td>
				</tr>
				<tr v-for="(dataItem,dataIndex) in dataList" :key="dataItem.Id">
					<td style="min-width: 300px;text-align:center;">{{dataItem.trade_name}}</td>
					<td style="min-width: 300px;text-align:center;">{{dataItem.customer_name}}</td>
					<td style="min-width: 300px;text-align:center;">{{dataItem.brand_name}}</td>
					<td style="min-width: 300px;text-align:center;">{{dataItem.brand_slogan}}</td>
					<td style="min-width: 300px;text-align:center;">{{dataItem.brand_value}}</td>

					<td style="min-width: 300px;text-align:center;" v-for="ext in dataItem.ext" :key="ext.id">
						<table>
							<tr>
								<td style="min-width: 300px;text-align:center;border-right:1px solid #000;">{{ext.product_name}}</td>
								<td style="min-width: 300px;text-align:center;border-right:1px solid #000;">{{ext.product_price}}</td>
								<td style="min-width: 300px;text-align:center;border-right:1px solid #000;">{{ext.direct_pro}}</td>
								<td style="min-width: 300px;text-align:center;border-right:1px solid #000;">{{ext.comparative_a}}</td>
								<td style="min-width: 300px;text-align:center;border-right:1px solid #000;">{{ext.comparative_d}}</td>
								<td style="min-width: 300px;text-align:center;">
								<img width="80px" height="80px" class='pro_img' :src="ext.product_p"/>
								</td>
							</tr>
						</table>
					</td>
					<td style="min-width: 100px;text-align:center;" v-for="ext in (longer - dataItem.ext.length)"
					 :key="ext.id">
						<table>
							<tr>
								<td style="min-width: 300px;text-align:center;border-right:1px solid #000;"></td>
								<td style="min-width: 300px;text-align:center;border-right:1px solid #000;"></td>
								<td style="min-width: 300px;text-align:center;border-right:1px solid #000;"></td>
								<td style="min-width: 300px;text-align:center;border-right:1px solid #000;"></td>
								<td style="min-width: 300px;text-align:center;border-right:1px solid #000;"></td>
								<td style='min-width: 300px;text-align:center;'></td>
							</tr>
						</table>
					</td>
					<td style="min-width: 300px;text-align:center;">
						{{dataItem.excellent_case}}
					</td>
					<td style="min-width: 300px;text-align:center;">
						<table>
							<tr>
								<td style='min-width: 300px;text-align:center;'>
									<el-button type="primary" plain style="padding:5px 10px" @click.native="showCase(dataItem.id,dataIndex)">修改</el-button>
									<el-button type="danger" plain style="padding:5px 10px" @click.native="deleteTable(dataItem.id)">删除</el-button>
									<!-- 										<span style="margin-left:20px;background: #ff5500;color:#fff;border-radius: 10px;padding:5px 20prx">修改</span>
										<span style="margin-left:20px;background: #ff5500;color:#fff;border-radius: 10px;padding:5px 20prx">删除</span> -->
								</td>

							</tr>
						</table>
					</td>
				</tr>
				<Footer></Footer>
			</table>

		</div>

		<el-dialog :visible.sync="finishModalShow" :append-to-body='true' class='finish_modal'>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.trade">
					<template slot="prepend">行业:</template>
				</el-input>
			</div>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.custome">
					<template slot="prepend">客户名称:</template>
				</el-input>
			</div>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.brand">
					<template slot="prepend">品牌名称:</template>
				</el-input>
			</div>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.sign">
					<template slot="prepend">品牌标语:</template>
				</el-input>
			</div>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.opinion">
					<template slot="prepend">品牌价值观:</template>
				</el-input>
			</div>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.case">
					<template slot="prepend">优秀案例:</template>
				</el-input>
			</div>

			<div class='input_form'>
				<div class='input_title'>行业龙头: <i class="el-icon-circle-plus c_info" @click="addTrade()"></i></div>
				<div v-for="(listItem,listIndex) in result.list" :key="listIndex">
					<el-input placeholder="请输入内容" v-model="listItem.name">
						<template slot="prepend">产品名称:</template>
					</el-input>
					<el-input placeholder="请输入内容" v-model="listItem.price">
						<template slot="prepend">产品价格:</template>
					</el-input>
					<el-input placeholder="请输入内容" v-model="listItem.competitor">
						<template slot="prepend">直接竞品:</template>
					</el-input>
					<el-input placeholder="请输入内容" v-model="listItem.goodness">
						<template slot="prepend">对比优势:</template>
					</el-input>
					<el-input placeholder="请输入内容" v-model="listItem.lessness">
						<template slot="prepend">对比劣势:</template>
					</el-input>
					<div class='pro_position'>
						<span>产品人群定位</span>
					
					
					
						<div class="member_content member_img">
							<el-image :src="listItem.position" v-if="listItem.position" fit="cover">
					
							</el-image>
							<input type="file" class="upload" @change="inputerFinish($event,listIndex)" ref="inputerFinish">
						</div>
					</div>
				</div>
				<div class="submit_box">
					<el-button type='primary' plain @click.native="addResult()">新增</el-button>
				</div>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="updateModalShow" :append-to-body='true' class='finish_modal'>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.trade">
					<template slot="prepend">行业:</template>
				</el-input>
			</div>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.custome">
					<template slot="prepend">客户名称:</template>
				</el-input>
			</div>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.brand">
					<template slot="prepend">品牌名称:</template>
				</el-input>
			</div>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.sign">
					<template slot="prepend">品牌标语:</template>
				</el-input>
			</div>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.opinion">
					<template slot="prepend">品牌价值观:</template>
				</el-input>
			</div>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.case">
					<template slot="prepend">优秀案例:</template>
				</el-input>
			</div>

			<div class='input_form'>
				<!-- <div class='input_title'>行业龙头: <i class="el-icon-circle-plus c_info" @click="addTrade()"></i></div> -->
				<div v-for="(listItem,listIndex) in result.list" :key="listIndex">
					<el-input placeholder="请输入内容" v-model="listItem.name">
						<template slot="prepend">产品名称:</template>
					</el-input>
					<el-input placeholder="请输入内容" v-model="listItem.price">
						<template slot="prepend">产品价格:</template>
					</el-input>
					<el-input placeholder="请输入内容" v-model="listItem.competitor">
						<template slot="prepend">直接竞品:</template>
					</el-input>
					<el-input placeholder="请输入内容" v-model="listItem.goodness">
						<template slot="prepend">对比优势:</template>
					</el-input>
					<el-input placeholder="请输入内容" v-model="listItem.lessness">
						<template slot="prepend">对比劣势:</template>
					</el-input>
					<div class='pro_position'>
						<span>产品人群定位</span>



						<div class="member_content member_img">
							<el-image :src="listItem.position" v-if="listItem.position" fit="cover">

							</el-image>
							<input type="file" class="upload" @change="inputerUpdate($event,listIndex)" ref="inputerUpdate">
						</div>
					</div>
				</div>
				<div class="submit_box">
					<el-button type='primary' plain @click.native="updateResult()">修改</el-button>
				</div>
			</div>
		</el-dialog>
		<el-dialog :visible.sync="addModalShow" :append-to-body='true' class='opinion_modal'>
			<div class='input_form'>
				<div>行业龙头:</div>
				<div>
					<el-input placeholder="请输入内容" v-model="addOpinion.name">
						<template slot="prepend">产品名称:</template>
					</el-input>
					<el-input placeholder="请输入内容" v-model="addOpinion.price">
						<template slot="prepend">产品价格:</template>
					</el-input>
					<el-input placeholder="请输入内容" v-model="addOpinion.competitor">
						<template slot="prepend">直接竞品:</template>
					</el-input>
					<el-input placeholder="请输入内容" v-model="addOpinion.goodness">
						<template slot="prepend">对比优势:</template>
					</el-input>
					<el-input placeholder="请输入内容" v-model="addOpinion.lessness">
						<template slot="prepend">对比劣势:</template>
					</el-input>
					<!-- 					<el-input placeholder="请输入内容" v-model="addOpinion.position">
						<template slot="prepend">产品人群定位:</template>
					</el-input> -->
					<div class='pro_position'>
						<span>产品人群定位</span>



						<div class="member_content member_img">
							<el-image :src="addOpinion.position" v-if="addOpinion.position" fit="cover">

							</el-image>
							<input type="file" class="upload" @change="inputerAdd($event)" ref="inputerAdd">
						</div>

					</div>
				</div>
				<div class="submit_box">
					<el-button type='primary' plain @click.native="addTradeResult()">添加信息</el-button>
				</div>
			</div>
		</el-dialog>

	</div>
</template>

<script>
	// import '@/common/Blob.js'
	// import '@/common/Export2Excel.js'
	import '@/common/jquery.table2excel.js'
	import qs from 'qs'
	export default {
		name: "scheduling",
		data() {
			return {
				addModalShow: false,
				finishModalShow: false,
				typeList: ['行政', '商务', '执行'],
				search: '',
				p_search: '',
				nowPart: '',
				part: ['设计', '前端', '后端'],
				tableResult: [],
				addOpinion: {
					name: '',
					price: '',
					competitor: '',
					goodness: '',
					lessness: '',
					position: [],
					dialogVisible: false
				},
				result: {
					trade: '',
					custome: '',
					brand: '',
					sign: '',
					opinion: '',
					poster: '',
					case: '',
					list: []
				},
				dataList: [],
				head: '',
				longer: '',
				sale_name: '',
				uid: '',
				updateModalShow: false,
				proId: ''
			}
		},
		components: {
			Footer: () => import('components/footer.vue'),
		},
		mounted() {

		},
		methods: {
			inputerAdd(event){
				let _this = this;
				
				let inputDOM = this.$refs.inputerAdd;
				// 通过DOM取文件数据
				this.fil = inputDOM.files;
				let size = Math.floor(this.fil[0].size / 1024);
				if (size > 5 * 1024 * 1024) {
					alert('请选择5M以内的图片！');
					return false
				}
				//调用上传图片的接口;
				// _this.memberUpdate.update_img = this.getObjectURL(this.fil[0]);
				// this.member.infoImg = _this.memberUpdate.update_img
				this.getUrl(this.fil[0],0,0);
			},
			inputerUpdate(event,index){
				let _this = this;
				
				let inputDOM = _this.$refs.inputerUpdate[index];
				// 通过DOM取文件数据
				_this.fil = inputDOM.files;
				console.log(_this.fil)
				let size = Math.floor(_this.fil[0].size / 1024);
				if (size > 5 * 1024 * 1024) {
					alert('请选择5M以内的图片！');
					return false
				}
				//调用上传图片的接口;
				// _this.memberUpdate.update_img = this.getObjectURL(this.fil[0]);
				// this.member.infoImg = _this.memberUpdate.update_img
				_this.getUrl(_this.fil[0],1,index);
			},
			inputerFinish(event,index){
				let _this = this;
				
				let inputDOM = this.$refs.inputerFinish[index];
				console.log(inputDOM)
				// 通过DOM取文件数据
				console.log(_this.fil)
				this.fil = inputDOM.files;
				let size = Math.floor(this.fil[0].size / 1024);
				if (size > 5 * 1024 * 1024) {
					alert('请选择5M以内的图片！');
					return false
				}
				//调用上传图片的接口;
				// _this.memberUpdate.update_img = this.getObjectURL(this.fil[0]);
				// this.member.infoImg = _this.memberUpdate.update_img
				this.getUrl(this.fil[0],1,index);
			},
			addImg(event,num) {
				let _this = this;
				
				let inputDOM = num == 0 ? this.$refs.inputer : this.$refs.inputer;
				// 通过DOM取文件数据
				this.fil = inputDOM.files;
				let size = Math.floor(this.fil[0].size / 1024);
				if (size > 5 * 1024 * 1024) {
					alert('请选择5M以内的图片！');
					return false
				}
				//调用上传图片的接口;
				// _this.memberUpdate.update_img = this.getObjectURL(this.fil[0]);
				// this.member.infoImg = _this.memberUpdate.update_img
				this.getUrl(this.fil[0]);
			},
			getUrl(file,num,index) {
				let _this = this;
				let formData = new FormData();
				formData.append('caseimg', file);
				const loading = _this.openLoading();
				_this.$axios({
					url: '/getCaseimg',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: formData
				}).then((res) => {
					if (res.data.errcode == 0) {
						setTimeout(() => {
							// this.loading = false;

							loading.close();

							setTimeout(() => {
								if(num == 1){
									_this.result.list[index].position = res.data.msg;
								}else {
									_this.addOpinion.position = res.data.msg;
								}
								// this.findList();
								// this.findDetails(pid);
							}, 500)

						}, 500)
					} else {
						setTimeout(() => {
							// this.loading = false;
							loading.close();
							setTimeout(() => {
								_this.$toast({
									message: res.data.msg + '!',
									duration: 1000
								});

							}, 500)

						}, 500)
					}
				}).catch(() => {
					setTimeout(() => {
						setTimeout(() => {
							// _this.loading = true;
							loading.close();
							_this.$toast({
								message: "" + res.data.msg + "!",
								duration: 1000
							});
						}, 500)
					}, 500)
				})
			},
			checkHead(params) {
				let _this = this;
				const loading = _this.openLoading();
				_this.$axios({
					url: '/getCenterheadimg',
					method: 'post',
					data: params,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data) {
						setTimeout(() => {
							loading.close();
							setTimeout(() => {
								_this.memberUpdate.update_img = res.data.data.headimg ? res.data.data.headimg : require(
									'../assets/head.png')
								_this.member.infoImg = _this.memberUpdate.update_img;
							}, 500)
						}, 500)
					}
				}).catch(() => {
					setTimeout(() => {
						loading.close();
						setTimeout(() => {
							_this.$toast({
								message: '请求失败!',
								duration: 1000
							})
						}, 500)
					}, 500)
				})
			},
			handleOpinionPreview(res, file) {
				this.addOpinion.position = URL.createObjectURL(file.raw);
			},
			handleOpinion(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			Search() {
				let _this = this;
				console.log(this.search)
				if (_this.search == '') {
					_this.$toast({
						message: '请输入关键字！',
						duration: 1000
					})
					return;
				}

				var params = new URLSearchParams();
				params.append('keywords', _this.search);
				const loading = _this.openLoading()
				_this.$axios({
					url: '/getSeacase',
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					if (res.data.data) {
						setTimeout(() => {
							loading.close();
							setTimeout(() => {
								let data = res.data.data ? res.data.data : [];
								let ext = 0;

								res.data.data.forEach((item) => {
									ext = item.ext.length > ext ? item.ext.length : ext;
								})
								this.longer = ext;
								this.dataList = data;

							}, 500)
						}, 500)

					} else {
						setTimeout(() => {
							loading.close();
							_this.$toast({
								message: '暂无相关内容!',
								duration: 1000
							})
						}, 500)
					}
				}).catch(() => {
					setTimeout(() => {
						loading.close();
						setTimeout(() => {
							_this.$toast({
								message: '请求失败!',
								duration: 1000
							})
						}, 500)
					}, 500)
				})
			},
			findResult() {
				this.$axios({
					url: '/getSelcase',
					method: 'GET',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
				}).then((res) => {
					if (res.data) {
						let data = res.data.data ? res.data.data : [];
						let ext = 0;

						res.data.data.forEach((item) => {
							ext = item.ext.length > ext ? item.ext.length : ext;
						})
						this.longer = ext;
						this.dataList = data;

					}
				}).catch(() => {

				})
			},
			beforeRead(file) { //上传之前校验
				// if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
				// 	Toast('只允许上传jpg/png格式的图片！')
				// 	return false
				// }

				// this.addOpinion.position = file.file[0]
				// return true
			},
			afterRead(file) {
				// 此时可以自行将文件上传至服务器

				console.log(file.file);
				this.addOpinion.position = file
				// this.getUrl(file)
			},
			deleteTable(id) {
				let _this = this;
				// console.log(data);
				// return;
				// _this.bm_type = 8;
				if (_this.bm_type != 8) {
					_this.$toast({
						message: '您没有权限！',
						duration: 1000
					})
					return;
				}
				_this.$confirm('是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = new URLSearchParams();
					params.append("id", id);
					// this.loading = true;
					var loading = _this.openLoading();
					let data = {
						id: id,
						bm_type: _this.bm_type
					}
					_this.$axios({
						url: '/getDelcase',
						method: 'post',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data: qs.stringify(data)
					}).then((res) => {
						if (res.data.errcode == 0) {
							setTimeout(() => {
								// this.loading = false;

								loading.close();

								setTimeout(() => {
									_this.$toast({
										message: '删除成功!',
										duration: 1000
									});
									_this.findResult()
									// this.findList();
									// this.findDetails(pid);
								}, 500)

							}, 500)
						} else {
							setTimeout(() => {
								// this.loading = false;
								loading.close();
								setTimeout(() => {
									_this.$toast({
										message: res.data.msg + '!',
										duration: 1000
									});

								}, 500)

							}, 500)
						}
					}).catch(() => {
						setTimeout(() => {
							setTimeout(() => {
								// _this.loading = true;
								loading.close();
								_this.$toast({
									message: "" + res.data.msg + "!",
									duration: 1000
								});
							}, 500)
						}, 500)
					})
				})
			},
			updateResult() {
				let _this = this;
				let result = _this.result;
				
				const loading = _this.openLoading();
				var params = new FormData()
				// var params = new URLSearchParams();
				params.append("uid", _this.uid);
				// params.append("cid", _this.uid);
				params.append("sale_name", _this.sale_name); // 销售姓名
				params.append("customer_name", result.custome); // 客户
				params.append("brand_name", result.brand); // 名称
				params.append("brand_slogan", result.sign); // 标语
				params.append("brand_value", result.opinion); // 价值观				
				params.append("excellent_case", result.case); // 优秀案例
				let newResult = [];
				console.log()
				result.list.forEach((item) => {
					let obj = {}
					obj.product_name = item.name;
					obj.product_price = item.price;
					obj.direct_pro = item.competitor;
					obj.comparative_a = item.goodness;
					obj.comparative_d = item.lessness;
					obj.product_p = item.position;
					obj.cid = item.id;
					obj.caseid = item.caseid;
					newResult.push(obj)
				})
				let obj = {
					id: _this.proId,
					uid: _this.uid,
					sale_name: _this.sale_name,
					trade_name: result.trade,
					customer_name: result.custome,
					brand_name: result.brand,
					brand_slogan: result.sign,
					brand_value: result.opinion,
					excellent_case: result.case,
					industry_leader: newResult
				}
				this.$axios({
					url: '/getUpcase',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: qs.stringify(obj)
				}).then((res) => {
					if (res.data.errcode == '0') {
						setTimeout(() => {
							loading.close();
							setTimeout(() => {
								_this.$toast({
									message: '修改成功！',
									duration: 1000
								});
								_this.updateModalShow = false;
								_this.findResult();
							}, 500)
						}, 500)
					} else {
						setTimeout(() => {
							loading.close();
							setTimeout(() => {
								_this.$toast({
									message: res.data.msg + '!',
									duration: 1000
								});
								_this.updateModalShow = false;
							}, 500)
						}, 500)
					}
				}).catch(() => {
					setTimeout(() => {
						loading.close();
						this.$toast({
							message: '请求失败!',
							duration: 500
						})
					}, 500)
				})
			},
			addResult() {
				let _this = this;
				let result = _this.result;

				const loading = _this.openLoading();
				var params = new FormData()
				// var params = new URLSearchParams();
				params.append("uid", _this.uid);
				params.append("sale_name", _this.sale_name); // 销售姓名
				params.append("customer_name", result.custome); // 客户
				params.append("brand_name", result.brand); // 名称
				params.append("brand_slogan", result.sign); // 标语
				params.append("brand_value", result.opinion); // 价值观				
				params.append("excellent_case", result.case); // 优秀案例
				let newResult = [];
				
				result.list.forEach((item) => {
					let obj = {}
					obj.product_name = item.name;
					obj.product_price = item.price;
					obj.direct_pro = item.competitor;
					obj.comparative_a = item.goodness;
					obj.comparative_d = item.lessness;
					obj.product_p = item.position;
					// obj.product_p = item.url;
					newResult.push(obj)
				})
				let obj = {
					uid: _this.uid,
					sale_name: _this.sale_name,
					trade_name: result.trade,
					customer_name: result.custome,
					brand_name: result.brand,
					brand_slogan: result.sign,
					brand_value: result.opinion,
					excellent_case: result.case,
					industry_leader: newResult
				}
				console.log(obj)
				// return;
				this.$axios({
					url: '/getAddcase',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: qs.stringify(obj)
				}).then((res) => {
					if (res.data.errcode == '0') {
						setTimeout(() => {
							loading.close();
							setTimeout(() => {
								_this.$toast({
									message: '添加成功！',
									duration: 1000
								});
								_this.finishModalShow = false;
								_this.findResult();
							}, 500)
						}, 1000)
					} else {
						setTimeout(() => {
							loading.close();
							setTimeout(() => {
								_this.$toast({
									message: res.data.msg + '！',
									duration: 1000
								});
								_this.finishModalShow = false;
							}, 500)
						}, 1000)
					}
				}).catch(() => {
					setTimeout(() => {
						loading.close();
						this.$toast({
							message: '请求失败!',
							duration: 1000
						})
						_this.finishModalShow = false;
					}, 1000)
				})
			},
			addTrade() {
				this.addModalShow = true;
				this.addOpinion = {
					name: '',
					price: '',
					competitor: '',
					goodness: '',
					lessness: '',
					position: [],
					dialogVisible: false
				}
			},
			getBase64(file) {
				// 转换base64

			},
			addTradeResult() {
				console.log(this.addOpinion)
				console.log(this.result)
				let _this = this;
				const loading = _this.openLoading();
				setTimeout(() => {
					loading.close();
					setTimeout(() => {
						_this.$toast({
							message: '已提交选项！',
							duration: 1000
						})
						this.addModalShow = false;
						this.result.list.push(this.addOpinion)
					}, 500)
				}, 500)
			},
			addCase() {
				this.finishModalShow = true;
				console.log(this.result)
				this.result = {
					trade: '',
					custome: '',
					brand: '',
					sign: '',
					opinion: '',
					case: '',
					list: []
				}
			},
			showCase(id, index) {
				this.proId = id;
				if (this.uid != this.dataList[index].uid) {
					this.$toast({
						message: '您没有权限！',
						duration: 1000
					});
					return;
				}
				let dataObj = this.dataList[index];
				let result = [];
				dataObj.ext.forEach((item) => {
					let obj = {}
					obj.position = item.product_p;
					obj.lessness = item.comparative_d;
					obj.goodness = item.comparative_a;
					obj.competitor = item.direct_pro;
					obj.price = item.product_price;
					obj.name = item.product_name;
					obj.id = item.id;
					obj.caseid = item.caseid;
					result.push(obj)
				})
				this.result = {
					trade: dataObj.trade_name,
					custome: dataObj.customer_name,
					brand: dataObj.brand_name,
					sign: dataObj.brand_slogan,
					opinion: dataObj.brand_value,
					case: dataObj.excellent_case,
					list: result
				}
				console.log(this.result)
				this.updateModalShow = true;
			},
			inputClick(e) {
				e.target.focus();
				// e.currentTarget.focus();
			},
			scrollChange() {
				let Index = document.getElementById('index')
				Index.scrollIntoView()
			},
			uncompileStr(code) {
				code = unescape(code);
				var c = String.fromCharCode(code.charCodeAt(0) - code.length);
				for (var i = 1; i < code.length; i++) {
					c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
				}
				return c;
			},
			getExplorer() {
				var explorer = window.navigator.userAgent;
				//ie  
				if (explorer.indexOf("MSIE") >= 0) {
					return 'ie';
				}
				//firefox  
				else if (explorer.indexOf("Firefox") >= 0) {
					return 'Firefox';
				}
				//Chrome  
				else if (explorer.indexOf("Chrome") >= 0) {
					return 'Chrome';
				}
				//Opera  
				else if (explorer.indexOf("Opera") >= 0) {
					return 'Opera';
				}
				//Safari  
				else if (explorer.indexOf("Safari") >= 0) {
					return 'Safari';
				}
			},
			method5(tableid) {
				if (this.getExplorer() == 'ie') {
					var curTbl = document.getElementById(tableid);
					var oXL = new ActiveXObject("Excel.Application");
					var oWB = oXL.Workbooks.Add();
					var xlsheet = oWB.Worksheets(1);
					var sel = document.body.createTextRange();
					sel.moveToElementText(curTbl);
					sel.select();
					sel.execCommand("Copy");
					xlsheet.Paste();
					oXL.Visible = true;

					try {
						var fname = oXL.Application.GetSaveAsFilename("Excel.xls",
							"Excel Spreadsheets (*.xls), *.xls");
					} catch (e) {
						print("Nested catch caught " + e);
					} finally {
						oWB.SaveAs(fname);
						oWB.Close(savechanges = false);
						oXL.Quit();
						oXL = null;
						this.idTmr = window.setInterval("this.Cleanup();", 1);
					}

				} else {
					this.tableToExcel(tableid)
				}
			},
			tableToExcel: (function() {
				var uri = 'data:application/vnd.ms-excel;base64,',
					template = '<html><head><meta charset="UTF-8"></head><body><table  border="1">{table}</table></body></html>',
					base64 = function(
						s) {
						return window.btoa(unescape(encodeURIComponent(s)))
					},
					format = function(s, c) {
						return s.replace(/{(\w+)}/g, function(m, p) {
							return c[p];
						})
					}
				return function(table, name) {
					if (!table.nodeType)
						table = document.getElementById(table)
					var ctx = {
						worksheet: name || 'Worksheet',
						table: table.innerHTML
					}
					window.location.href = uri + base64(format(template, ctx))
				}
			})(),
			searchResult() {
				if (this.nowPart == '') {
					this.$toast({
						message: '请选择部门！',
						duration: 1000
					});
					return;
				}
				const loading = this.openLoading();
				var params = new URLSearchParams();
				params.append("keywords", this.nowPart);
				this.$axios({
					url: '/getonly',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					if (res.data) {
						setTimeout(() => {
							loading.close();
							setTimeout(() => {
								let nameList = new Array();
								res.data.data.forEach((item) => {
									nameList.push(item.zx_name);
								});
								var obj = {};
								var arr = [];
								for (var i = 0; i < nameList.length; i++) {
									if (!obj[nameList[i]]) {
										obj[nameList[i]] = 1;
										arr.push(nameList[i]);
									}
								}
								let tableResult = new Array();
								arr.forEach((arrItem) => {
									var arrObj = new Object();
									arrObj.name = arrItem;
									tableResult.push(arrObj)
								});
								tableResult.forEach((arrItem) => {
									let dataArr = new Array();
									res.data.data.forEach((item) => {
										if (arrItem.name == item.zx_name) {
											let dataObj = new Object();
											dataObj.pro_name = item.pro_name;
											dataObj.xm_url = item.xm_url;
											dataObj.xmimg = item.xmimg;
											dataObj.count_speed = item.count_speed ? item.count_speed : 0
											dataArr.push(dataObj);
											arrItem.resultList = dataArr;
										}
									});
								});
								this.tableResult = tableResult;
							}, 500)
						}, 1000)
					}
				}).catch(() => {
					setTimeout(() => {
						loading.close();
						this.$toast({
							message: '请求失败!',
							duration: 1000
						})
					}, 1000)
				})
			},
			bubbleSort(arr) {
				var i = arr.length,
					j;
				var tempExchangVal;
				while (i > 0) {
					for (j = 0; j < i - 1; j++) {
						if (arr[j] > arr[j + 1]) {
							tempExchangVal = arr[j];
							arr[j] = arr[j + 1];
							arr[j + 1] = tempExchangVal;
						}
					}
					i--;
				}
				return arr;
			},
			backLast() {
				let _this = this;
				let role = this.role
				if (_this.uncompileStr(role).split('&&')[0] == _this.typeList[0]) {
					_this.$router.replace({
						name: 'administration'
					});
				} else if (_this.uncompileStr(role).split('&&')[0] == _this.typeList[1]) {
					_this.$router.replace({
						name: 'commercial'
					});
				} else if (_this.uncompileStr(role).split('&&')[0] == _this.typeList[2]) {
					_this.$router.replace({
						name: 'execute'
					});
				}
			},
			findPerson() {
				let _this = this;
				_this.$axios({
					url: '/getnamelist',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data) {

						res.data.data.forEach((item) => {
							if (item.id == _this.uid) {
								console.log(item.id, _this.uid, item.user_name)
								_this.sale_name = item.user_name
								// _this.addList(item.id, item.user_name, item.bm_type - 1, item.user_phone);								
							}
						})
						// _this.newPerson = _this.pySort(res.data.data, res.data.data)
					}
				}).catch(() => {

				})
			},
		},
		created() {
			let role = localStorage.getItem('role')
			this.role = role;
			let id = localStorage.getItem('id')
			let uid = this.uncompileStr(id).split('&&')[1]
			this.uid = uid;
			this.bm_type = localStorage.getItem("type");
			this.findPerson();;
			this.findResult();

		}
	}
</script>

<style scoped="scoped">
	.form-box {
		display: flex;
		justify-content: center;
	}

	.el-form-item {
		display: flex;
	}

	.el-form-item>div {
		display: flex;
	}

	tbody tr td:nth-child(1) {
		border: none;
	}

	#scheduling {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
	}

	#scheduling .btn-box {
		display: flex;
		justify-content: center;
		margin: 30px 0;
		/* 		height : 30px;
		line-height : 30px; */
	}

	.btn-outer {
		padding: 10px 40px;
		letter-spacing: 1px;
		display: inline-block;
		background: #2db7f5;
		border-radius: 0.15rem;
		color: #fff;
	}

	#outscheduling td {
		color: #000;
	}

	.table {
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		padding: 0 1rem;
		margin: 0 auto;
		align-items: center;
		min-height: 100vh;
		position: relative;
	}

	#scheduling .el-range-separator {
		width: 10% !important;
	}

	#scheduling .block {
		display: flex;
		justify-content: center;
		align-items: center;
	}


	.drawTable {
		margin-left: 0.25rem;
		padding: 0.1rem 0.5rem;
		background: #2db7f5;
		color: #fff;
		border-radius: 0.2rem;
		cursor: pointer;
	}

	.table table tr td {
		padding: 0 !important;
		position: relative;
	}

	table tr td {
		border: none;
	}

	.table table tr td>div {
		/* padding: 5px 10px !important; */
		position: relative;
		border-bottom: 1px solid #000000;
	}

	.table2excel tr td>div:last-child {
		border-bottom: none;
	}

	.table2excel>tr>td {
		/* padding: 0.1rem 0.3rem; */
		border: 1px solid #000 !important;
		text-align: center;
		white-space: nowrap;
		color: #000;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	/* 	.table2excel >tr:nth-child(1) td table tr:nth-child(1) td:nth-child(1) {
		border-bottom :1px solid #000;
	}
	.table2excel table  >tr >td {
		border-right : 1px solid #000;
	}
	.table2excel table  >tr >td:last-child {
		border-right : none
	} */
	.table2excel table>tr>td {}

	.table table tr .has_content {
		padding: 0;
	}

	.table2excel {
		margin: 40px 0;
		font-size: 12px;
	}

	.table2excel tr td {
		height: 100px;
		/* line-height: 100px; */
	}
	
/* 	.table2excel table tr {
		display: flex;
		align-items: center;
		justify-content: center;
	} */

	/*.table2excel {*/
	/*    max-width: 90%;*/
	/*}*/
	/*thead tr:nth-child(1) {*/
	/*    border-top:2px solid #000;*/
	/*}*/

	.active {
		background: rgba(0, 0, 0, 0.1);
	}

	table tbody tr td.before {
		background: rgba(0, 0, 0, 0.1);
	}

	/*tbody tr:nth-child(2) td:nth-child(3) {*/
	/*    color:red;*/
	/*}*/
	/*tbody tr:nth-child(2) td:nth-child(1) {*/
	/*    border-width: 1px !important;*/
	/*}*/
	.block {
		display: flex;
		justify-content: center;

	}

	.block .el-date-editor {
		max-width: 50%;
	}


	.btn-box {
		margin-top: 0.5rem;
	}

	.el-date-editor .el-range__close-icon {
		display: none;
	}

	.btn-box>div {
		cursor: pointer;
	}

	.table {
		padding-top: 60px;
	}

	.el-picker-panel.el-date-range-picker.el-popper.has-sidebar {
		transform-origin: top center;
	}

	.btn-del {
		background: rgb(248, 200, 173);
	}

	.btn-add {
		margin: 0 0.5rem;
	}

	.operate {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.operate button {
		padding: 5px 10px;
		font-size: 12px
	}

	.finish_modal .el-dialog {
		max-height: 80vh;
		overflow: scroll;
	}

	.opinion_modal .el-dialog {
		max-height: 80vh;
		overflow: scroll;
	}

	.finish_modal .el-input {
		margin-bottom: 10px;
	}

	.input_form>div:nth-child(1) {
		margin-bottom: 20px;
	}

	.opinion_modal .el-input {
		margin-bottom: 10px;
	}

	.submit_box {
		display: flex;
		justify-content: center;
	}

	.submit_box button {
		padding: 10px 25px;
	}

	.input_title {
		display: flex;
		;
		align-items: center;
	}

	.c_info {
		font-size: 24px;
		margin-left: 20px;
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

	.pro_position {
		margin-bottom : 20px;
		display: flex;
	}

	.pro_position span {
		margin-right: 20px;
	}

	.member_img {
		width: 150px;
		height: 150px;
		display: block;
		position: relative;
	}

	.member_img .el-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.member_img .upload {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
