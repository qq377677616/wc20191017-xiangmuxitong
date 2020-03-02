<template>
	<div id="execute" class="page-show">
		<div class="wc-page-top">
			<div class="top-name">
				<div class="top-close iconfont icon-Group-" @click="toLogin"><span>退出登录</span></div>
				<div class="top-title">网晨平头哥管理系统-执行端</div>
				<div class="project-num">
					<i class="el-icon-user-solid"></i>
					<span v-html="projectList.length"></span>
					<i class="el-icon-s-tools" @click="toMember"></i>
				</div>
			</div>
		</div>
		<div class="wc-page-content">
			<div class="search-content">
				<el-input @click.native="inputClick($event)" placeholder="请输入项目名" v-model="p_search" @blur="scrollChange" clearable>
				</el-input>
				<el-button class="search" @click.native="proSearch">搜索</el-button>
			</div>
			<div class="search-content">
				<el-input placeholder="请输入姓名" v-model="search" @blur="scrollChange" clearable>
				</el-input>
				<el-button class="search" @click.native="Search">搜索</el-button>
			</div>
			<div class="statistics">
				<div class="statistics_right">
					<div class='price_num'>价位:</div>
					<div class="statistics_box" v-for="(statistItem, statistIndex) in colorList" :key="statistIndex">
						<div :class="[{'icon-money':true}]" :style="{backgroundColor : statistItem.color }"></div>
						<span v-html="statistItem.priceList[0].title"></span>
					</div>
				</div>
			</div>
			<div class="statistics">
				<div class="output" @click="toSearch()">项目消化情况</div>
				<div class="statistics_right">
					<div class='price_num'>项目价格统计:</div>
					<div class="statistics_box" v-for="(statistItem, statistIndex) in colorList" :key="statistIndex">
						<div :class="[{'icon-money':true}]" :style="{backgroundColor : statistItem.color }"></div>
						<span v-html="statistItem.num"></span>
					</div>
				</div>
			</div>
			<div class="statistics">
				<div class="output" @click="toFx()">添加项目分析</div>
			</div>
			<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
				<van-list v-model="loadingcontent" :finished="finished" @load="onLoad">
					<!-- 加载的内容-->
					<div class="project-card-box" v-for="(projectItem,projectIndex) in projectList" :key="projectIndex">
						<div :class="['project-card',{'over-header-light':projectItem.is_type == 2,'emergent':projectItem.hasOver,'overTime':projectItem.overTime}]"
						 @click.stop="showProject(projectItem.id,$event,projectIndex,projectItem.checked,projectItem.is_type)">
							<div class="card-top">
								<div :class="[{'icon-dot':true}]" :style="{backgroundColor : colorSelect(projectItem.price)}"></div>
								<div class="card-top-left" v-html="projectItem.pro_name">
								</div>
								<div class="card-top-right">
									<span class="card-left-type">销售:</span><span v-html="projectItem.sale_name"></span>
									<span class="card-right-type">策划:</span><span v-html="projectItem.plan_name"></span>
								</div>
							</div>
							<div class="card-bottom">
								<div class="card-bottom-left">
									<span class="setting-time-title">立项时间:</span><span class="setting-time" v-html="projectItem.lix_time"></span>
								</div>
								<div class="card-bottom-right">
									<span class="up-time-title">上线时间:</span><span class="up-time" v-html="projectItem.shangx_time">s</span>
								</div>
								<div class="schedule" @click.stop="toSchedule(projectItem.id)">查看排期</div>
							</div>
						</div>
						<div :class="{'type-wrapper':true,'showframe':projectItem.checked}" v-show="projectItem.checked">
							<div class="type-wrapper-list-details">
								<div class="type-wrapper-container" v-for="(projectDetailsItem,projectDetailsIndex) in projectItem.ext" :key="projectDetailsIndex"
								 v-show="projectItem.ext.length != 0">
									<div class="container_center">
										<div class="type-info-title">
											<div class="type-info-name">
												<span v-html="projectDetailsItem.zx_name"></span><span v-html="projectDetailsItem.design"></span>
											</div>
											<div class="type-info-time" v-show="!projectDetailsItem.isCS">
												<span v-html="projectDetailsItem.creat_time ? projectDetailsItem.creat_time : ''"></span>
											</div>
										</div>
										<el-input @click.native="inputClick($event)" v-if="!projectDetailsItem.isCS" class="type-info-details" type="textarea"
										 autosize placeholder="项目进度描述" v-model="projectDetailsItem.centen_log" @input="projectMonitor(projectIndex,projectDetailsIndex)"
										 @blur="scrollChange" :disabled="!projectDetailsItem.canChange">
										</el-input>
										<div :class="['opertation',{'cp-icon-box':projectDetailsItem.isCS}]">
											<!-- 										<div class="block" v-show="!projectDetailsItem.isCS">
												<van-slider v-model="projectDetailsItem.detail.speed" :step="5" bar-height="5px" @drag-end="slideChange(projectDetailsIndex)"
												 :disabled="!projectDetailsItem.canChange" />
												<span class="slider-val">{{projectDetailsItem.detail.speed + "%"}}</span>
											</div> -->
											<div class="block" v-show="!projectDetailsItem.isCS">
												<el-slider v-model="projectDetailsItem.speed" :step="5" height="5px" @change="slideChange(projectDetailsIndex)"
												 :disabled="!projectDetailsItem.canChange"></el-slider>
												<span class="slider-val">{{projectDetailsItem.speed + "%"}}</span>
											</div>
											<div :class="{'cp-icon': projectDetailsItem.isCS}">
												<!-- <van-icon name="delete" color="red" size="20px" @click.native="deletePerson(projectDetailsItem.id,projectItem.id)" /> -->

												<div class="icon-wrap"><i class="el-icon-delete c_danger" @click="deletePerson(projectDetailsItem.log_id,projectItem.id,projectDetailsIndex)"></i></div>
											</div>
										</div>
									</div>
									<div class="data_center">
										<table>
											<tr>
												<td :class="{'data_active' : dataItem.hasCard}" v-for="dataItem,dataIndex in projectDetailsItem.daysList">
													<span>{{dataItem.name}}</span>
													<i class="data_select el-icon-check" v-if="dataItem.hasCard"></i>
												</td>
											</tr>
										</table>
										<el-button type="primary" class="add_card" @click.native="addCard(projectDetailsItem.log_id,projectItem.id,projectDetailsIndex)"
										 v-if="projectDetailsItem.canChange" :disabled="projectDetailsItem.hasCard">打卡</el-button>
									</div>
								</div>
								<div class="update-container">
									<div class="add-person">
										<div class='add_left'>
											<div class="icon-wrap"><i class="el-icon-circle-plus c_info" @click="showPopup(projectIndex,projectItem.id)"></i></div>
											<!-- 											<van-icon name="add" color="#189df1" size="20px"  /> -->
											<span>增加执行人员</span>
										</div>
										<div class='add_right'>

											<div class="icon-wrap"><i class="el-icon-circle-plus c_info" @click="showAddress(projectIndex,projectItem.id,projectItem)"></i></div>
											<!-- <van-icon name="add" color="#189df1" size="20px" @click.native="showAddress(projectIndex,projectItem.id,projectItem)" /> -->
											<span>项目地址</span>
										</div>
										<div class="overhead">
											<el-button type="primary" class="btn-overhead" @click.native="overHead(projectIndex,projectItem.id)" v-show="personType == 2"
											 :disabled="projectItem.is_type == 2">置顶</el-button>
											<el-button type="primary" class="btn-overhead" @click.native="canceloverHead(projectIndex,projectItem.id)"
											 v-show="personType == 2" :disabled="projectItem.is_type != 2">取消置顶</el-button>
										</div>
									</div>
									<div class="rate-box" v-if="projectItem.ext.length != 0">
										<div class="rote-box-title">
											<span class="rate-title">总进度:</span>
											<el-slider v-model="projectItem.mainValue" :step="5" disabled></el-slider>
											<!--                                            <Slider v-model="mainValue" disabled></Slider>-->
											<div class="main-vate">{{projectItem.mainValue + "%"}}</div>
										</div>
										<el-button type="primary" class="update-rate" @click.native="updateForm(projectIndex,projectItem.id)"
										 :disabled="!canChange">更新</el-button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="nomore" v-if="!canInit">无更多数据...</div>
					<Footer v-if="!canInit"></Footer>
				</van-list>
			</van-pull-refresh>
		</div>
		<el-dialog :visible.sync="dialogFormVisible" :append-to-body='true'>
			<el-form ref="form" label-width="80px">
				<el-form-item label="执行部门">
					<el-select v-model="personInfo.branch" placeholder="请选择" @change="changePlot(personInfo.branch)">
						<el-option v-for="item in branchList" :key="item.id" :value="item.design">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="执行人员">
					<el-select v-model="personInfo.plot" placeholder="请选择" :disabled="plotList ==''">
						<el-option v-for="item in plotList" :key="item" :value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="addPerson">确定添加</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog :visible.sync="addressVisible" :append-to-body='true' class="address_box">
			<div class="type_box">
				<div class="type_center">
					<div :class="['address_str',{'type_active':showAddressIndex == 1}]" @click="changeShowAddress(1)">地址</div>
					<div :class="['address_img',{'type_active':showAddressIndex == 2}]" @click="changeShowAddress(2)">太阳码</div>
				</div>
			</div>
			<el-form ref="form" label-width="80px" v-if="showAddressIndex == 1">
				<el-form-item label="项目地址" v-if="now_img == null || now_img == ''">
					<el-input @click.native="inputClick($event)" v-model="address" placeholder="项目地址(可不填写)" type="text">

					</el-input>
				</el-form-item>
				<el-form-item v-if="now_img == null || now_img == ''">
					<el-button type="primary" @click.native="addAddress">提交</el-button>
				</el-form-item>
			</el-form>
			<el-form ref="form" class='sun_img_box' label-width="80px" v-else>
				<!-- 				<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
				 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload> -->
				<div class='sun_img' v-if="oldAddress == null || oldAddress == ''">
					<el-image :src="imageUrl" v-if="imageUrl" fit="cover">

					</el-image>
					<input type="file" class="upload" @change="addImg($event)" ref="inputer">
				</div>

				<div class='file_del' v-if="oldAddress == null || oldAddress == ''" @click='delImg'>
					<i data-v-0f33e3cb="" class="el-icon-delete c_danger"></i>
				</div>
			</el-form>

		</el-dialog>
		<div class="nodata" v-show="projectList == ''">暂无数据</div>
		<van-loading v-show="loading" class="loading" />
	</div>
</template>
<script>
	import qs from 'qs'
	export default {
		name: "administration",
		data() {
			return {
				initial_sun: require('../assets/sun_bg.png'),
				showAddressIndex: 1,
				imageUrl: '',
				typeList: ['行政', '商务', '执行'],
				search: '',
				p_search: '',
				show: false,
				colorList: [{
					color: 'green',
					num: 0,
					priceList: [{
						title: '0-3W'
					}, {
						title: '0-5W'
					}]
				}, {
					color: '#45e5d9',
					num: 0,
					priceList: [{
						title: '3-5W'
					}]
				}, {
					color: 'blue',
					num: 0,
					priceList: [{
						title: '5-10W'
					}, {
						title: '3-8W'
					}, ]
				}, {
					color: 'orange',
					num: 0,
					priceList: [{
						title: '10-15W'
					}, {
						title: '8-15W'
					}]
				}, {
					color: 'red',
					num: 0,
					priceList: [{
						title: '15W以上'
					}]
				}],
				branchList: [{
						id: 2,
						design: '产品'
					}, {
						id: 5,
						design: '设计'
					}, {
						id: 6,
						design: '前端'
					}, {
						id: 7,
						design: '后端'
					},
					{
						id: 9,
						design: '测试'
					}
				],
				plotList: [],
				personInfo: {
					branch: '',
					plot: '',
					branchId: ''
				},
				showPlot: false,
				showBranch: false,
				mainValue: 0,
				showIndex: null,
				groupIndex: 0,
				personIndex: 0,
				dialogTableVisible: false,
				dialogFormVisible: false,
				addressVisible: false,
				addressTableVisible: false,
				projectList: [],
				projectDetailsList: [],
				personList: [],
				nowDetailId: 0,
				pId: 0,
				uid: 0,
				nowprojectIndex: 0,
				loading: false,
				oldDetailsList: [],
				addDetailsList: [],
				deviceList: [], //用于存放加载的数据
				totalPage: 0,
				pageNumber: 0,
				loadingcontent: false, //控制上拉加载的加载动画
				finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
				isLoading: false, //控制下拉刷新的加载动画
				canChange: false,
				isType: 0,
				page: 1,
				canInit: true,
				personType: 0,
				dataNum: 0,
				address: '',
				oldAddress: '',
				now_img: ''
			}
		},
		components: {
			Footer: () => import('components/footer.vue'),
		},
		computed: {
			colorSelect(money) {
				return (money) => {
					let color = ''
					if (money == '0-3W' || money == '0-5W') {
						color = 'green'
					} else if (money == '3-5W') {
						color = '#45e5d9'
					} else if (money == '3-8W' || money == '5-10W') {
						color = 'blue'
					} else if (money == '8-15W' || money == '10-15W') {
						color = 'orange'
					} else if (money == '15W以上') {
						color = 'red'
					}
					return color
				}
			}
		},
		mounted() {
			let type = localStorage.getItem('type');
			setTimeout(() => {
				if (type == 1) {
					MtaH5.clickStat("xz")
				} else if (type == 2) {
					MtaH5.clickStat("cp")
				} else if (type == 3) {
					MtaH5.clickStat("sw")
				} else if (type == 4) {
					MtaH5.clickStat("ch")
				} else if (type == 5) {
					MtaH5.clickStat("sj")
				} else if (type == 6 || type == 7) {
					MtaH5.clickStat("js")
				} else if (type == 8) {
					MtaH5.clickStat("zjb")
				}
			}, 1500)
		},
		methods: {
			// 打卡
			addCard(uid, proid, index) {
				let _this = this;
				_this.log_id = uid;
				// _this.texId = uid;
				_this.extIndex = index;
				let formData = new FormData();
				formData.append('un_id', this.uid);
				formData.append('uid', uid);
				formData.append('proid', proid)
				const loading = _this.openLoading();
				_this.$axios({
					url: '/getAddpunch',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: formData
				}).then((res) => {
					if (res.data.errcode == 0) {
						setTimeout(() => {
							loading.close();
							setTimeout(() => {
								_this.$toast({
									message: '打卡成功!',
									duration: 1000
								});
								let id = _this.nowDetailId;
								let projectList = this.projectList
								let pIndex = 0
								for(let prop in projectList){
									if(projectList[prop].id == id){
										pIndex = prop;
										projectList[prop].ext[index].daysList.forEach((dayItem,index)=>{
											if (dayItem.name == this.nowDays) {
												dayItem.hasCard = true;
											}
										})				
										projectList[prop].ext[index].hasCard = true
										break;
									}
								}								
								this.$set(this.projectList[pIndex],pIndex,projectList[pIndex]);
							}, 500)
						}, 500)
					} else {
						setTimeout(() => {
							loading.close();
							_this.addressVisible = false
							setTimeout(() => {
								_this.$toast({
									message: "" + res.data.msg + "!",
									duration: 1000
								});
							}, 500)
						}, 500)
					}
				}).catch((error) => {
					console.log(error)
					setTimeout(() => {
						// this.loading = false;
						loading.close();
						_this.addressVisible = false
						setTimeout(() => {
							_this.$toast({
								message: "请求失败!",
								duration: 1000
							})
						}, 500)
					}, 500)
				})
			},
			toFx() {
				let _this = this;
				_this.$router.replace({
					name: 'analyse'
				})
			},
			inputClick(e) {
				e.target.focus();
				// e.currentTarget.focus();
			},
			toMember() {
				let _this = this;
				_this.$router.replace({
					name: 'member'
				})
			},
			changeShowAddress(num) {
				this.showAddressIndex = num;
			},
			delImg() {
				let _this = this;
				const loading = _this.openLoading();
				let params = new FormData();
				params.append('id', _this.nowDetailId);
				params.append('xmimg', '');
				_this.$axios({
					url: '/gettymDel',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					if (res.data.errcode == 0) {
						setTimeout(() => {
							loading.close();
							setTimeout(() => {
								_this.$toast({
									message: '删除成功!',
									duration: 1000
								});
								// _this.imageUrl = ''
								// this.findList();
								let id = _this.nowDetailId;
								// this.findDetails(this.nowDetailId)		
								// this.findList();
								_this.projectList.forEach((item, index) => {
									// item.checked = false;
									if (item.id == id) {
										// item.checked = !checked;
										item.xmimg = _this.initial_sun;
									}
								})
								_this.imageUrl = _this.initial_sun;
								_this.now_img = ''
							}, 500)
						}, 500)
					} else {
						setTimeout(() => {
							loading.close();
							_this.addressVisible = false
							setTimeout(() => {
								_this.$toast({
									message: "" + res.data.msg + "!",
									duration: 1000
								});
							}, 500)
						}, 500)
					}
				}).catch(() => {
					setTimeout(() => {
						// this.loading = false;
						loading.close();
						_this.addressVisible = false
						setTimeout(() => {
							_this.$toast({
								message: "请求失败!",
								duration: 1000
							})
						}, 500)
					}, 500)
				})
			},
			uploadFile(file) {
				let _this = this;
				const loading = this.openLoading('上传中');
				let params = new FormData();
				params.append('id', _this.nowDetailId);
				params.append('xmimg', file);
				_this.$axios({
					url: '/getZximgurl',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					if (res.data.errcode == 0) {
						setTimeout(() => {
							loading.close();
							setTimeout(() => {

								_this.$toast({
									message: '添加成功!',
									duration: 1000
								});
								this.imageUrl = res.data.data.xmimg
								let id = this.nowDetailId;
								// this.findDetails(this.nowDetailId)
								this.projectList.forEach((item, index) => {
									// item.checked = false;
									if (item.id == id) {
										// item.checked = !checked;
										item.xmimg = res.data.data.xmimg ? res.data.data.xmimg : this.initial_sun
									}
								})
								// // this.findDetails(this.nowDetailId);
								this.now_img = this.imageUrl
							}, 500)
						}, 500)
					} else {
						setTimeout(() => {
							loading.close();
							_this.addressVisible = false
							setTimeout(() => {
								_this.$toast({
									message: "" + res.data.msg + "!",
									duration: 1000
								});
							}, 500)
						}, 500)
					}
				}).catch(() => {
					setTimeout(() => {
						// this.loading = false;
						loading.close();
						_this.addressVisible = false
						setTimeout(() => {
							this.$toast({
								message: "请求失败!",
								duration: 1000
							})
						}, 500)
					}, 500)
				})

			},

			addImg(event) {
				let _this = this;
				let inputDOM = this.$refs.inputer;
				// 通过DOM取文件数据
				this.fil = inputDOM.files;
				let size = Math.floor(this.fil[0].size / 1024);
				if (size > 5 * 1024 * 1024) {
					alert('请选择5M以内的图片！');
					return false
				}
				//调用上传图片的接口;
				// _this.memberUpdate.update_img = ;
				// this.member.infoImg = _this.memberUpdate.update_img
				this.uploadFile(this.fil[0]);
			},
			getObjectURL(file) {
				var url = null;
				if (window.createObjectURL != undefined) { // basic
					url = window.createObjectURL(file);
				} else if (window.URL != undefined) { // mozilla(firefox)
					url = window.URL.createObjectURL(file);
				} else if (window.webkitURL != undefined) { // webkit or chrome
					url = window.webkitURL.createObjectURL(file);
				}
				return url;
			},
			toSearch(id) {
				// localStorage.setItem('xms_id',id)
				this.$router.replace({
					name: 'member_table'
				})
			},
			addAddress() {
				// if (this.address == '' || this.address == null) {
				// 	this.$toast({
				// 		message: '项目地址不能为空！',
				// 		duration: 1000
				// 	});
				// 	return;
				// }
				// if (this.address == this.oldAddress) {
				// 	this.$toast({
				// 		message: '您未修改！',
				// 		duration: 1000
				// 	});
				// 	return;
				// }
				let data = {
					xm_url: '',
				}
				let id = this.nowDetailId;
				data.xm_url = this.address;
				var params = new URLSearchParams();
				params.append("id", this.nowDetailId);
				params.append("xm_url", data.xm_url);
				let _this = this;
				// _this.loading = true;
				const loading = this.openLoading();
				_this.$axios({
					url: '/getZxurlup',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					if (res.data.errcode == 0) {

						setTimeout(() => {
							// _this.loading = false
							loading.close();
							setTimeout(() => {
								_this.$toast({
									message: '添加成功!',
									duration: 1000
								});
								// this.findList();
								this.oldAddress = this.address;
								this.projectList.forEach((item, index) => {
									// item.checked = false;
									if (item.id == this.nowDetailId) {
										// item.checked = !checked;
										item.xm_url = data.xm_url;
									}
								})

								// this.findDetails(this.nowDetailId);

							}, 500)
						}, 500)
					} else {
						setTimeout(() => {
							// _this.loading = false
							loading.close();
							setTimeout(() => {
								_this.$toast({
									message: "" + res.data.msg + "!",
									duration: 1000
								});
							}, 500)
						}, 500)
					}
				}).catch(() => {
					setTimeout(() => {
						// this.loading = false;
						loading.close();
						setTimeout(() => {
							this.$toast({
								message: "请求失败!",
								duration: 1000
							})
						}, 500)
					}, 500)
				})
				_this.addressVisible = false
			},
			toSchedule(id) {
				localStorage.setItem('xms_id', id)
				this.$router.replace({
					name: 'scheduling'
				})
			},
			proSearch() {
				let _this = this;
				let search = _this.p_search
				let data = {
					keywords: search
				}
				if (search == '') {
					this.$toast({
						message: "请输入项目名!",
						duration: 1000
					})
					return;
				}
				// _this.loading = true;
				const loading = this.openLoading();
				_this.$axios({
					url: '/getSearchxm',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: qs.stringify(data)
				}).then((res) => {
					if (res.data.errcode == 0) {
						setTimeout(() => {
							if (res.data.data.length > 0) {
								res.data.data.forEach((item) => {
									item.checked = false;
								})

								let colorList = this.colorList
								colorList.forEach((item) => {
									item.num = 0
								})
								res.data.data.forEach((item) => {
									colorList.forEach((cItem) => {
										let mount = cItem.priceList.some((priceItem) => {
											return priceItem.title == item.price
										})
										if (mount) {
											cItem.num++;
										}
									})
								})
								res.data.data.forEach((item) => {
									let time = this.DateMinus(this.DayChange(new Date()), item.shangx_time)
									if (time <= 2) {
										item.hasOver = true
										item.overTime = false
										if (time < 0) {
											item.overTime = true
											item.hasOver = false
										}
									} else {
										item.hasOver = false
										item.overTime = false
									}
								})
								// _this.isLoading = false;
								// _this.loading = false;
								loading.close();


								//详情数据开始
								let isType = this.isType
								let personType = this.personType
								let personList = this.personList
								let u_id = this.uid
								res.data.data.forEach((listItem) => {
									let speed = 0;
									let num = 0;
									//判断是否为产品
									listItem.ext.forEach((item) => {
										if (item.design == '产品') {
											item.isCh = true
										} else {
											item.isCh = false
										}
									})

									//判断是否为产品、测试
									listItem.ext.forEach((item) => {
										if (item.design == '产品' || item.design == '测试') {
											item.isCS = true
										} else {
											item.isCS = false
										}
									})


									listItem.ext.forEach((dataItem) => {
										let id = 0
										personList.forEach((item) => {
											if (item.user_name == dataItem.zx_name) {
												id = item.id
												dataItem.user_id = item.id
											}
										})
										if (u_id == id) {
											dataItem.canChange = true
										} else {
											dataItem.canChange = false
										}

										//添加是否可改
										let canChange = listItem.ext.some((dataItem) => {
											return u_id == dataItem.user_id
										})
										console.log(canChange)
										listItem.canChange = canChange;
										this.canChange = canChange;
										//详情数据处理
										listItem.ext.forEach((item) => {
											if (item.speed == '' || item.speed == null) {
												item.speed = 0;
												if (item.design != '产品' && item.design != '测试') {
													num++;
												}
											} else {
												if (!item.isCS) {
													speed += parseInt(item.speed)
													num++;
												}
												item.speed = parseInt(item.speed)
											}
										})

										if (speed == 0 || num == 0) {
											listItem.mainValue = 0
										} else {
											listItem.mainValue = parseInt(speed / num)
										}

									})
								})
								//详情数据结尾


								// console.warn(JSON.stringify(_this.daysList), '???2')
								// console.warn(JSON.stringify(res.data.data), '???1')
								// // 打卡数据								
								// res.data.data.forEach((listItem) => {
								// 	if (listItem.ext.length > 0) {
								// 		listItem.ext.forEach((extItem) => {
								// 			let hasCard = false;

								// 			let daysList = _this.daysList;
								// 			daysList.forEach((dayItem) => {
								// 				if (extItem.tex.length > 0) {
								// 					extItem.tex.forEach((item, index) => {
								// 						console.log(item)
								// 						item.day = item.punchtime ? item.punchtime.split('-')[2] : '';
								// 						console.log(dayItem.name, item.day)
								// 						hasCard = dayItem.name == item.day;
								// 					})
								// 				}
								// 				console.log(hasCard)
								// 				dayItem.hasCard = hasCard;
								// 			})
								// 			console.log(daysList)
								// 			extItem.daysList = daysList

								// 			// extItem.hasCard = hasCard;  //项目记录当天是否打卡
								// 			// extItem
								// 		})
								// 	}
								// })
								//打卡
								console.log(JSON.stringify(res.data.data))
								let allData = res.data.data; //总数据
								let date = this.daysList; // 每阶段天数
								allData.forEach((allItem, allIndex) => {
									allItem.ext && allItem.ext.forEach((extItem, extIndex) => {
										//初始化每一项daysList（必须有值）
										extItem.daysList = date.map((daysItem, daysIndex) => {
											return {
												name: daysItem.name,
												hasCard: false,
											}
										})
										extItem.hasCard = false;
										//初始化结束
										extItem.tex && extItem.tex.forEach((texItem, textIndex) => {
											let punchtime = texItem.punchtime.split('-');
											let temp = punchtime[punchtime.length - 1].toString();
											temp = temp.replace(/\b(0+)/gi,"");
											extItem.daysList.findIndex((dateItem, dateIndex) => {
												if (dateItem.name == temp) {
													//匹配到了
													dateItem.hasCard = true
												}
											})
										})
										for (var i = 0; i < extItem.daysList.length; i++) {
											if(extItem.daysList[i].hasCard){
												console.log(extItem.daysList[i].name,this.nowDays)
												if (extItem.daysList[i].name == this.nowDays) {
													extItem.hasCard = true;
												}else {
													extItem.hasCard = false;
												}
											}
										}
									})	
								})
								// 打卡

								if (this.page == 0) {
									this.projectList = allData
								} else {
									allData.forEach((item) => {
										this.projectList.push(item)
									})
									if (allData.length < 8) {
										this.isLoading = false;
									}
								}



								_this.finished = true
								_this.canInit = false
								_this.projectList = allData
							} else {
								// _this.isLoading = false;
								// _this.loading = false;
								loading.close();
								_this.finished = true
								_this.canInit = false
								_this.$toast({
									message: "暂无相关内容!",
									duration: 1000
								})
							}
						}, 1000)
					} else {
						loading.close();
						_this.finished = true
						_this.canInit = false
						this.$toast({
							message: "" + res.data.msg + "!",
							duration: 1000
						})
					}
				}).catch(() => {

				})
			},
			Search() {
				let _this = this;
				let search = _this.search
				let data = {
					keywords: search
				}
				if (search == '') {
					this.$toast({
						message: "请输入关键字!",
						duration: 1000
					})
					return;
				}
				// _this.loading = true;
				const loading = this.openLoading();
				_this.$axios({
					url: '/getSearchprozx',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: qs.stringify(data)
				}).then((res) => {
					if (res.data.errcode == 0) {
						setTimeout(() => {
							if (res.data.data.length > 0) {
								res.data.data.forEach((item) => {
									item.checked = false;
								})

								let colorList = this.colorList
								colorList.forEach((item) => {
									item.num = 0
								})
								res.data.data.forEach((item) => {
									colorList.forEach((cItem) => {
										let mount = cItem.priceList.some((priceItem) => {
											return priceItem.title == item.price
										})
										if (mount) {
											cItem.num++;
										}
									})
								})
								res.data.data.forEach((item) => {
									let time = this.DateMinus(this.DayChange(new Date()), item.shangx_time)
									if (time <= 2) {
										item.hasOver = true
										item.overTime = false
										if (time < 0) {
											item.overTime = true
											item.hasOver = false
										}
									} else {
										item.hasOver = false
										item.overTime = false
									}
								})
								// _this.isLoading = false;
								// _this.loading = false;
								loading.close();



								//详情数据开始
								let isType = this.isType
								let personType = this.personType
								let personList = this.personList
								let u_id = this.uid
								res.data.data.forEach((listItem) => {
									let speed = 0;
									let num = 0;
									//判断是否为产品
									listItem.ext.forEach((item) => {
										if (item.design == '产品') {
											item.isCh = true
										} else {
											item.isCh = false
										}
									})

									//判断是否为产品、测试
									listItem.ext.forEach((item) => {
										if (item.design == '产品' || item.design == '测试') {
											item.isCS = true
										} else {
											item.isCS = false
										}
									})

									listItem.ext.forEach((dataItem) => {
										let id = 0
										personList.forEach((item) => {
											if (item.user_name == dataItem.zx_name) {
												id = item.id
												dataItem.user_id = item.id
											}
										})
										if (u_id == id) {
											dataItem.canChange = true
										} else {
											dataItem.canChange = false
										}

										//添加是否可改
										let canChange = listItem.ext.some((dataItem) => {
											return u_id == dataItem.user_id
										})
										listItem.canChange = canChange;
										this.canChange = canChange;
										//详情数据处理
										listItem.ext.forEach((item) => {
											if (item.speed == '' || item.speed == null) {
												item.speed = 0;
												if (item.design != '产品' && item.design != '测试') {
													num++;
												}
											} else {
												if (!item.isCS) {
													speed += parseInt(item.speed)
													num++;
												}
												item.speed = parseInt(item.speed)
											}
										})



										if (speed == 0 || num == 0) {
											listItem.mainValue = 0
										} else {
											listItem.mainValue = parseInt(speed / num)
										}

									})
								})
								// res.data.data.forEach((listItem)=>{
								// 	if(listItem.ext.length > 0){
								// 		listItem.ext.forEach((extItem)=>{
								// 			console.log(extItem.tex)
								// 			if(extItem.tex.length>0){
								// 				extItem.tex.forEach((item)=>{
								// 					if(item.punchtime){
								// 						extItem.day = item.punchtime.split('-')[2]
								// 					}													
								// 				})
								// 			}
								// 		})
								// 	}
								// })
								//详情数据结尾

								//打卡
								console.log(JSON.stringify(res.data.data))
								let allData = res.data.data; //总数据
								let date = this.daysList; // 每阶段天数
								allData.forEach((allItem, allIndex) => {
									allItem.ext && allItem.ext.forEach((extItem, extIndex) => {
										//初始化每一项daysList（必须有值）
										extItem.daysList = date.map((daysItem, daysIndex) => {
											return {
												name: daysItem.name,
												hasCard: false,
											}
										})
										extItem.hasCard = false;
										//初始化结束
										extItem.tex && extItem.tex.forEach((texItem, textIndex) => {
											let punchtime = texItem.punchtime.split('-');
											let temp = punchtime[punchtime.length - 1].toString();
											temp = temp.replace(/\b(0+)/gi,"");
											extItem.daysList.findIndex((dateItem, dateIndex) => {
												if (dateItem.name == temp) {
													//匹配到了
													dateItem.hasCard = true
												}
											})
										})
										for (var i = 0; i < extItem.daysList.length; i++) {
											if(extItem.daysList[i].hasCard){
												console.log(extItem.daysList[i].name,this.nowDays)
												if (extItem.daysList[i].name == this.nowDays) {
													extItem.hasCard = true;
												}else {
													extItem.hasCard = false;
												}
											}
										}
									})	
								})
								// 打卡

								if (this.page == 0) {
									this.projectList = allData
								} else {
									allData.forEach((item) => {
										this.projectList.push(item)
									})
									if (allData.length < 8) {
										this.isLoading = false;
									}
								}

								_this.finished = true
								_this.canInit = false
								_this.projectList = allData
							} else {
								// _this.isLoading = false;
								// _this.loading = false;							
								loading.close();
								_this.finished = true
								_this.canInit = false
								_this.$toast({
									message: "暂无相关内容!",
									duration: 1000
								})
							}
						}, 1000)
					} else {
						loading.close();
						_this.finished = true
						_this.canInit = false
						this.$toast({
							message: "" + res.data.msg + "!",
							duration: 1000
						})
					}
				}).catch(() => {

				})
			},
			DateMinus(date1, date2) {
				var sdate = new Date(date1);
				var now = new Date(date2);
				var days = now.getTime() - sdate.getTime();
				var day = parseInt(days / (1000 * 60 * 60 * 24));
				return day;
			},
			init() {
				let self = this;
				self.findList()
				// self.findDetails(this.nowDetailId)
				self.isLoading = false; //关闭下拉刷新效果
				self.$toast({
					message: '刷新成功！',
					duration: 1000
				})
			},
			//下拉刷新
			onLoad() { //上拉加载
				let self = this;
				if (this.canInit) {
					setTimeout(() => {
						if (this.projectList.length <= 8) {
							this.finished = false;
						} else {
							if (this.dataNum.length - this.projectList.length <= 8) {
								this.finished = true;
							}
						}

						this.findListOne()
						this.page = this.page + 1
						this.loadingcontent = false;
					}, 500);
				}
			},
			onRefresh() {
				//下拉刷新
				this.canInit = false
				setTimeout(() => {
					this.finished = false;
					this.isLoading = false;
					// this.findList()
				}, 500);
			},
			scrollChange() {
				let Index = document.getElementById('index')
				Index.scrollIntoView()
			},
			projectMonitor(index, projectindex) {
				let _this = this;
				_this.canChange = true;
				// _this.projectList[index].ext[projectindex].hasChange = true;

				// _this.projectList[_this.nowDetailId].ext[projectindex].hasChange = true;
				// _this.projectDetailsList[projectindex].hasChange = true;
			},
			slideChange(projectindex) {
				let _this = this;

				_this.projectList.forEach((listItem) => {
					let value = 0,
						num = 0;
					listItem.ext.forEach((item) => {
						item.hasChange = true;
					})

					for (const item of listItem.ext) {
						if (!item.isCS) {
							value += parseInt(item.speed)
							num++;
						}
					}
					listItem.mainValue = parseInt(value / num)
				})
				_this.canChange = true;
				// // _this.projectDetailsList[projectindex].hasChange = true;


				// _this.mainValue = 
			},
			showPopup(index, id) {

				this.nowprojectIndex = index
				this.nowDetailId = id
				this.personInfo.branch = ''
				this.personInfo.plot = ''
				this.plotList = []
				this.dialogFormVisible = true
				this.dialogTableVisible = true
			},
			showAddress(index, id, projectList) {
				this.nowprojectIndex = index
				this.nowDetailId = id
				this.oldAddress = projectList.xm_url == '' || projectList.xm_url == null ? '' : projectList.xm_url;
				this.address = projectList.xm_url == '' || projectList.xm_url == null ? '' : projectList.xm_url;
				this.imageUrl = projectList.xmimg == '' || projectList.xmimg == null ? this.initial_sun : projectList.xmimg;
				this.now_img = projectList.xmimg;
				this.addressVisible = true;
				this.addressTableVisible = true;
			},
			ChangePlot(value) {
				this.personInfo.plot = value;
				this.showPlot = false;
			},
			ChangeBranch(value) {
				this.personInfo.branch = value;
				this.showBranch = false;
			},
			hideModal() {
				this.show = false;
				this.personInfo.plot = '';
				this.personInfo.branch = '';
				this.plotList = [];
			},
			deletePerson(id, pid, deleteIndex) {
				// this.projectDetailsList =
				// return;
				this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = new URLSearchParams();
					params.append("id", id);
					// this.loading = true;
					var loading = this.openLoading();
					this.$axios({
						url: '/getdelzx',
						method: 'post',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data: params
					}).then((res) => {
						if (res.data.errcode == 0) {
							setTimeout(() => {
								// this.loading = false;

								loading.close();

								setTimeout(() => {
									this.$toast({
										message: '删除成功!',
										duration: 1000
									});
									let u_id = this.uid
									let projectList = this.projectList;
									projectList.forEach((listItem, listindex) => {
										if (listItem.id == this.nowDetailId) {
											listItem.ext.splice(deleteIndex, 1);
											let canChange = listItem.ext.some((dataItem) => {
												return u_id == dataItem.user_id
											})
											listItem.canChange = canChange;
											this.canChange = canChange;
										}
									})
									// this.findList();
									// this.findDetails(pid);
								}, 500)

							}, 500)
						} else {
							setTimeout(() => {
								// this.loading = false;
								loading.close();
								setTimeout(() => {
									this.$toast({
										message: '删除失败！',
										duration: 1000
									});
									// this.findList();
									// this.findDetails(pid);
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
			canceloverHead(index, id) {
				this.$confirm('确定取消顶置?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = new URLSearchParams();
					params.append("id", id);
					let _this = this;
					// _this.loading = true;
					const loading = this.openLoading();
					_this.$axios({
						url: '/getRoofcan',
						method: 'post',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data: params
					}).then((res) => {
						if (res.data.errcode == 0) {
							setTimeout(() => {
								setTimeout(() => {
									// _this.loading = false;
									loading.close();
									_this.$toast({
										message: "取消成功!",
										duration: 1000
									});
									let zdObj = {}
									this.projectList.forEach((item, index) => {
										if (item.id == id) {
											zdObj = item;
											item.is_type = 1;
											this.projectList.splice(index, 1)
										}
									})
									this.projectList.push(zdObj);
									// _this.findList()
									// _this.findDetails(id);
								}, 500)
							}, 500)
						} else {
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
						}
					}).catch(() => {
						setTimeout(() => {
							// this.loading = false;
							loading.close();
							setTimeout(() => {
								this.$toast({
									message: "请求失败!",
									duration: 1000
								})
							}, 500)
						}, 500)
					})
				}).catch(() => {

				})
			},
			overHead(index, id) {
				this.$confirm('确定置顶?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					var params = new URLSearchParams();
					params.append("id", id);
					let _this = this;
					// _this.loading = true;
					const loading = this.openLoading();
					_this.$axios({
						url: '/getRoof',
						method: 'post',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data: params
					}).then((res) => {
						if (res.data.errcode == 0) {
							setTimeout(() => {
								setTimeout(() => {
									// _this.loading = false;
									loading.close();
									_this.$toast({
										message: "置顶成功!",
										duration: 1000
									});
									let zdObj = {}
									this.projectList.forEach((item, index) => {
										if (item.id == id) {
											zdObj = item;
											item.is_type = 2;
											this.projectList.splice(index, 1)
										}
									})
									this.projectList.unshift(zdObj);
									// _this.findList()
									// _this.findDetails(id);
								}, 500)
							}, 500)
						} else {
							setTimeout(() => {
								setTimeout(() => {
									// _this.loading = true;
									loading.close();
									_this.$toast({
										message: "" + res.data.msg + "!",
										duration: 1000
									});
									_this.findList()
								}, 500)
							}, 500)
						}
					}).catch(() => {
						setTimeout(() => {
							// this.loading = false;
							loading.close();
							setTimeout(() => {
								this.$toast({
									message: "请求失败!",
									duration: 1000
								})
							}, 500)
						}, 500)
					})
				}).catch(() => {

				});

			},
			listenChange() {},
			addPerson() {
				if (this.personInfo.branch == '') {
					this.$toast({
						message: '名字不能为空！',
						duration: 1000
					});
					return;
				}
				if (this.personInfo.plot == '') {
					this.$toast({
						message: '职位不能为空！',
						duration: 1000
					});
					return;
				}
				let data = {
					name: '',
					post: '',
					bm_type: '',
					user_phone: ''
				}
				data.name = this.personInfo.plot
				data.post = this.personInfo.branch
				var params = new URLSearchParams();
				params.append("xm_id", this.nowDetailId);
				params.append("zx_name", data.name);
				params.append("design", data.post);
				let _this = this;
				// _this.loading = true;
				const loading = this.openLoading();
				_this.$axios({
					url: '/getProadd',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					if (res.data.errcode == 0) {

						setTimeout(() => {
							// _this.loading = false
							loading.close();
							setTimeout(() => {
								let data = {

								}
								// _this.projectList.forEach((item) => {
								// 	if (item.hasChange) {
								// 		let obj = {}
								// 		obj.creat_time = _this.Change((new Date()))
								// 		obj.log_id = item.id
								// 		obj.xmlog_id = projectListNow.id
								// 		if (item.detail == '' || item.detail == null) {
								// 			obj.centen_log = ''
								// 			obj.speed = 0
								// 		}
								// 		obj.count_speed = _this.mainValue
								// 		data.push(obj)
								// 	}
								// })
								// _this.findList();
								let mIndex = 0;
								_this.addFind(this.nowDetailId);
							}, 500)
						}, 500)
					} else {
						setTimeout(() => {
							// _this.loading = false
							loading.close();
							setTimeout(() => {
								_this.$toast({
									message: "" + res.data.msg + "!",
									duration: 1000
								});
							}, 500)
						}, 500)
					}
				}).catch(() => {
					setTimeout(() => {
						// this.loading = false;
						loading.close();
						setTimeout(() => {
							this.$toast({
								message: "请求失败!",
								duration: 1000
							})
						}, 500)
					}, 500)
				})
				_this.dialogFormVisible = false
				_this.dialogTableVisible = false
			},
			Change(d) {
				var date = d;
				var seperator1 = "-";
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				var Hours = date.getHours();
				var Minutes = date.getMinutes();
				var Seconds = date.getSeconds();

				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				if (Hours >= 0 && Hours <= 9) {
					Hours = "0" + Hours;
				}
				if (Minutes >= 0 && Minutes <= 9) {
					Minutes = "0" + Minutes;
				}
				if (Seconds >= 0 && Seconds <= 9) {
					Seconds = "0" + Seconds;
				}
				var data = ''
				data =
					date.getFullYear() +
					seperator1 +
					month +
					seperator1 +
					strDate + ' ' + Hours + ":" + Minutes + ":" + Seconds
				return data;
			},
			DayChange(d) {
				var date = d;
				var seperator1 = "-";
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var data = ''
				data =
					date.getFullYear() +
					seperator1 +
					month +
					seperator1 +
					strDate
				return data;
			},
			updateForm(index, id) {
				if (this.canChange == false) {
					this.$toast({
						message: '您目前没有参与该项目！',
						duration: 1000
					})
					return;
				}
				let _this = this;
				_this.$confirm('确定更新?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data = []
					let projectListNow = _this.projectList[index]
					_this.projectList.forEach((listItem) => {
						if (listItem.id == _this.nowDetailId) {
							listItem.ext.forEach((item) => {
								if (item.canChange) {
									if (data.length == 0) {
										let obj = {}
										obj.creat_time = _this.Change((new Date()))
										obj.log_id = item.log_id;
										obj.xmlog_id = projectListNow.id
										obj.centen_log = item.centen_log ? item.centen_log : ''
										obj.speed = parseInt(item.speed) ? parseInt(item.speed) : 0
										obj.count_speed = listItem.mainValue;
										data.push(obj)
									}
								}
							})
						}
					})
					console.log(data)
					_this.update(data, id)
				}).catch(() => {

				});
			},
			addFind(id) {
				let _this = this;
				this.projectDetailsList = [];
				var params = new URLSearchParams();
				params.append("xm_id", id);
				this.$axios({
					url: '/getProdetails2',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					if (res.data.errcode == 0) {
						if (res.data.data) {
							let speed = 0;
							let num = 0;
							_this.projectDetailsList = res.data.data
							// this.oldDetailsList = res.data.data

							let dataArr = []
							let projectListNow = _this.projectList[_this.nowprojectIndex];

							let data = {};
							let project = _this.projectDetailsList[_this.projectDetailsList.length - 1]
							let newObj = {};
							let subData = '';
							newObj.creat_time = _this.Change((new Date()));
							newObj.log_id = project.id;
							newObj.xmlog_id = project.xm_id;
							newObj.centen_log = '';
							newObj.speed = 0;
							newObj.count_speed = 0;
							dataArr.push(newObj);
							let newData = Object.assign({}, newObj);
							let user_id = ''
							this.personList.forEach((item) => {
								if (project.zx_name == item.username) {
									user_id = item.id;
								}
							})
							newData.zx_name = project.zx_name;
							newData.zx_type = project.zx_type;
							newData.design = project.design;
							newData.id = project.id;
							newData.xm_id = project.xm_id;
							newData.user_id = user_id;
							// return;
							this.addUpdate(newData, dataArr, this.nowDetailId)
						}
					} else {
						this.projectDetailsList = [];
						this.mainValue = 0
					}
				}).catch(() => {

				})
			},
			addUpdate(newData, data, id) {
				let _this = this;
				// _this.loading = true;
				const loading = this.openLoading();
				_this.$axios({
					url: '/getSpeed2',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: qs.stringify(data)
				}).then((res) => {
					if (res.data.errcode == 0) {
						setTimeout(() => {
							// _this.loading = false;
							_this.$toast({
								message: '添加成功!',
								duration: 1000
							});
							loading.close();
							let u_id = this.uid
							this.projectList.forEach((listItem) => {
								let speed = 0;
								let num = 0;
								if (listItem.id == this.nowDetailId) {
									listItem.ext.push(newData);
									listItem.ext.forEach((dataItem) => {
										let id = 0
										this.personList.forEach((item) => {
											if (item.user_name == dataItem.zx_name) {
												id = item.id
												dataItem.user_id = item.id
											}
										})
										if (u_id == id) {
											dataItem.canChange = true
										} else {
											dataItem.canChange = false
										}

										//添加是否可改
										let canChange = listItem.ext.some((dataItem) => {
											return u_id == dataItem.user_id
										})
										listItem.canChange = canChange;
										this.canChange = canChange;
										//详情数据处理
										listItem.ext.forEach((item) => {
											if (item.speed == '' || item.speed == null) {
												item.speed = 0;
												if (item.design != '产品' && item.design != '测试') {
													num++;
												}
											} else {
												if (!item.isCS) {
													speed += parseInt(item.speed)
													num++;
												}
												item.speed = parseInt(item.speed)
											}
										})

										if (speed == 0 || num == 0) {
											listItem.mainValue = 0
										} else {
											listItem.mainValue = parseInt(speed / num)
										}

									})
								}
							})

							//打卡
							let allData = this.projectList; //总数据
							let date = this.daysList; // 每阶段天数
							allData.forEach((allItem, allIndex) => {
								allItem.ext && allItem.ext.forEach((extItem, extIndex) => {
									//初始化每一项daysList（必须有值）
									extItem.daysList = date.map((daysItem, daysIndex) => {
										return {
											name: daysItem.name,
											hasCard: false,
										}
									})
									extItem.hasCard = false;
									if(this.log_id == extItem.log_id){									
										extItem.tex && extItem.tex.forEach((texItem, textIndex) => {
											let punchtime = texItem.punchtime.split('-');
											let temp = punchtime[punchtime.length - 1];
											let result = extItem.daysList.findIndex((dateItem, dateIndex) => {
												if (extItem.daysList[i].name == this.nowDays) {
													if (dateItem.name == temp) {
														//匹配到了
														dateItem.hasCard = true
														return true;
													} else {
														//未匹配到
														dateItem.hasCard = false;
														return false;
													}
												}else {
													//未匹配到
													dateItem.hasCard = false;
													return false;
												}
											})
										})
										for (var i = 0; i < extItem.daysList.length; i++) {
											console.log(extItem.daysList[i].name, this.nowDays)
											if (extItem.daysList[i].hasCard) {
												if (extItem.daysList[i].name == this.nowDays) {
													extItem.hasCard = true;
													break;
												}
											}
										}
									}
								})
							})
							// console.log(res.data.data, '??')
							this.projectList = allData
							// 打卡
							// this.findList();
						}, 500)
					} else {
						loading.close();
						_this.$toast({
							message: res.data.msg,
							duration: 1000
						});
					}
				}).catch(() => {
					loading.close();
					_this.$toast({
						message: '请求失败!',
						duration: 1000
					});
				})
			},
			update(data, id) {
				let _this = this;
				// _this.loading = true;
				const loading = this.openLoading();
				_this.$axios({
					url: '/getSpeed2',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: qs.stringify(data)
				}).then((res) => {
					if (res.data.errcode == 0) {
						setTimeout(() => {
							// _this.loading = false;
							loading.close();
							setTimeout(() => {
								_this.$toast({
									message: '更新成功!',
									duration: 1000
								});
								// this.findList();
								// this.findDetails(id)
							}, 500)
						}, 500)
					} else {
						setTimeout(() => {
							// _this.loading = false;
							loading.close();
							setTimeout(() => {
								_this.$toast({
									message: "" + res.data.msg + "!",
									duration: 1000
								});
							}, 500)
						}, 500)
					}
				}).catch(() => {
					setTimeout(() => {
						// _this.loading = false;
						loading.close();
						setTimeout(() => {
							_this.$toast({
								message: "请求失败!",
								duration: 1000
							});
						}, 500)
					}, 500)
				})
			},
			showProject(index, e, pIndex, checked, type) {
				// e.preventDefault()
				this.isType = type
				this.nowDetailId = index
				let id = index
				// this.findDetails(id)
				this.projectList.forEach((item, index) => {
					item.checked = false;
					if (item.id == id) {
						item.checked = !checked;
					}
				})
			},
			toLogin() {
				localStorage.removeItem('role')
				this.$router.replace({
					path: '/login'
				})
			},
			findList() {
				let _this = this;
				_this.$axios({
					url: '/getProlist',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data) {
						res.data.data.forEach((item) => {
							item.checked = false;
						})
						this.dataNum = res.data.data.length
						this.finished = true
						this.canInit = false
						let colorList = this.colorList
						colorList.forEach((item) => {
							item.num = 0
						})
						res.data.data.forEach((item) => {
							colorList.forEach((cItem) => {
								let mount = cItem.priceList.some((priceItem) => {
									return priceItem.title == item.price
								})
								if (mount) {
									cItem.num++;
								}
							})
						})
						this.colorList = colorList
						res.data.data.forEach((item) => {
							let time = this.DateMinus(this.DayChange(new Date()), item.shangx_time)
							if (time <= 2) {
								item.hasOver = true
								item.overTime = false
								if (time < 0) {
									item.overTime = true
									item.hasOver = false
								}
							} else {
								item.hasOver = false
								item.overTime = false
							}
						})


						//详情数据开始
						let isType = this.isType
						let personType = this.personType
						let personList = this.personList
						let u_id = this.uid
						res.data.data.forEach((listItem) => {
							let speed = 0;
							let num = 0;
							//判断是否为产品
							listItem.ext.forEach((item) => {
								if (item.design == '产品') {
									item.isCh = true
								} else {
									item.isCh = false
								}
							})

							//判断是否为产品、测试
							listItem.ext.forEach((item) => {
								if (item.design == '产品' || item.design == '测试') {
									item.isCS = true
								} else {
									item.isCS = false
								}
							})

							listItem.ext.forEach((dataItem) => {
								let id = 0
								personList.forEach((item) => {
									if (item.user_name == dataItem.zx_name) {
										id = item.id
										dataItem.user_id = item.id
									}
								})
								if (u_id == id) {
									dataItem.canChange = true
								} else {
									dataItem.canChange = false
								}

								//添加是否可改
								let canChange = listItem.ext.some((dataItem) => {
									return u_id == dataItem.user_id
								})
								listItem.canChange = canChange;
								this.canChange = canChange;
								//详情数据处理
								listItem.ext.forEach((item) => {
									if (item.speed == '' || item.speed == null) {
										item.speed = 0;
										if (item.design != '产品' && item.design != '测试') {
											num++;
										}
									} else {
										if (!item.isCS) {
											speed += parseInt(item.speed)
											num++;
										}
										item.speed = parseInt(item.speed)
									}
								})

								if (speed == 0 || num == 0) {
									listItem.mainValue = 0
								} else {
									listItem.mainValue = parseInt(speed / num)
								}

							})
						})
						//详情数据结尾
						if (this.page == 0) {
							this.projectList = res.data.data
						} else {
							res.data.data.forEach((item) => {
								this.projectList.push(item)
							})
							if (res.data.data.length < 8) {
								this.isLoading = false;
							}
						}


						// _this.projectList = res.data.data
					}
				}).catch(() => {

				})
			},
			findListOne() {
				let data = {
					page: this.page
				}
				this.$axios({
					url: '/getxslist2',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: qs.stringify(data),
				}).then((res) => {
					if (res.data) {
						if (res.data.errcode == 0) {
							res.data.data.forEach((item) => {
								item.checked = false;
							})
							let colorList = this.colorList
							res.data.data.forEach((item) => {
								colorList.forEach((cItem) => {
									let mount = cItem.priceList.some((priceItem) => {
										return priceItem.title == item.price
									})
									if (mount) {
										cItem.num++;
									}
								})
							})
							this.colorList = colorList
							res.data.data.forEach((item) => {
								res.data.data.forEach((item) => {
									let time = this.DateMinus(this.DayChange(new Date()), item.shangx_time)
									if (time <= 2) {
										item.hasOver = true
										item.overTime = false
										if (time < 0) {
											item.overTime = true
											item.hasOver = false
										}
									} else {
										item.hasOver = false
										item.overTime = false
									}
								})
							})


							//详情数据开始
							let isType = this.isType
							let personType = this.personType
							let personList = this.personList
							let u_id = this.uid
							res.data.data.forEach((listItem) => {
								let speed = 0;
								let num = 0;
								//判断是否为产品
								listItem.ext.forEach((item) => {
									if (item.design == '产品') {
										item.isCh = true
									} else {
										item.isCh = false
									}
								})

								//判断是否为产品、测试
								listItem.ext.forEach((item) => {
									if (item.design == '产品' || item.design == '测试') {
										item.isCS = true
									} else {
										item.isCS = false
									}
								})

								listItem.ext.forEach((dataItem) => {
									let id = 0
									personList.forEach((item) => {
										if (item.user_name == dataItem.zx_name) {
											id = item.id
											dataItem.user_id = item.id
										}
									})
									if (u_id == id) {
										dataItem.canChange = true
									} else {
										dataItem.canChange = false
									}

									//添加是否可改
									let canChange = listItem.ext.some((dataItem) => {
										return u_id == dataItem.user_id
									})
									listItem.canChange = canChange;
									this.canChange = canChange;
									//详情数据处理
									listItem.ext.forEach((item) => {
										if (item.speed == '' || item.speed == null) {
											item.speed = 0;
											if (item.design != '产品' && item.design != '测试') {
												num++;
											}
										} else {
											if (!item.isCS) {
												speed += parseInt(item.speed)
												num++;
											}
											item.speed = parseInt(item.speed)
										}
									})

									if (speed == 0 || num == 0) {
										listItem.mainValue = 0
									} else {
										listItem.mainValue = parseInt(speed / num)
									}

								})
							})
							//详情数据结尾

							//打卡
							console.log(JSON.stringify(res.data.data))
							let allData = res.data.data; //总数据
							let date = this.daysList; // 每阶段天数
							allData.forEach((allItem, allIndex) => {
								allItem.ext && allItem.ext.forEach((extItem, extIndex) => {
									//初始化每一项daysList（必须有值）
									extItem.daysList = date.map((daysItem, daysIndex) => {
										return {
											name: daysItem.name,
											hasCard: false,
										}
									})
									extItem.hasCard = false;
									//初始化结束
									extItem.tex && extItem.tex.forEach((texItem, textIndex) => {
										let punchtime = texItem.punchtime.split('-');
										let temp = punchtime[punchtime.length - 1].toString();
										temp = temp.replace(/\b(0+)/gi,"");
										extItem.daysList.findIndex((dateItem, dateIndex) => {
											if (dateItem.name == temp) {
												//匹配到了
												dateItem.hasCard = true
											}
										})
									})
									for (var i = 0; i < extItem.daysList.length; i++) {
										if(extItem.daysList[i].hasCard){
											console.log(extItem.daysList[i].name,this.nowDays)
											if (extItem.daysList[i].name == this.nowDays) {
												extItem.hasCard = true;
											}else {
												extItem.hasCard = false;
											}
										}
									}
								})	
							})
							// 打卡


							if (this.page == 0) {
								this.projectList = allData
							} else {
								allData.forEach((item) => {
									this.projectList.push(item)
								})
								if (allData.length < 8) {
									this.isLoading = false;
								}
							}
						} else {
							this.finished = true;
							this.canInit = false;
						}
					} else {
						this.finished = true;
						this.canInit = false;
					}
				}).catch((reason) => {
					console.warn('1111', reason)
				})
			},
			findDetails(id) {
				this.projectDetailsList = [];
				var params = new URLSearchParams();
				params.append("xm_id", id);
				this.$axios({
					url: '/getProdetails2',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					if (res.data.errcode == 0) {
						if (res.data.data) {
							let speed = 0;
							let num = 0;
							let isType = this.isType
							let personType = this.personType
							res.data.data.forEach((item) => {
								if (item.design == '产品') {
									item.isCh = true
								} else {
									item.isCh = false
								}
							})

							res.data.data.forEach((item) => {
								if (item.design == '产品' || item.design == '测试') {
									item.isCS = true
								} else {
									item.isCS = false
								}
							})
							let personList = this.personList
							let u_id = this.uid
							res.data.data.forEach((dataItem) => {
								let id = 0
								personList.forEach((item) => {
									if (item.user_name == dataItem.zx_name) {
										id = item.id
										dataItem.user_id = item.id
									}
								})
								if (u_id == id) {
									dataItem.canChange = true
								} else {
									dataItem.canChange = false
								}
							})
							let canChange = res.data.data.some((dataItem) => {
								return u_id == dataItem.user_id
							})
							this.canChange = canChange
							res.data.data.forEach((dataItem) => {
								if (dataItem.detail == '' || dataItem.detail == null) {
									let data = {
										centen_log: '',
										count_speed: 0,
										creat_time: dataItem.creat_time
									}
									dataItem.detail = data
								}
							})
							res.data.data.forEach((item) => {
								if (item.detail.speed == '' || item.detail.speed == null) {
									item.detail.speed = 0;
									if (item.design != '产品' && item.design != '测试') {
										num++;
									}
								} else {
									if (!item.isCS) {
										speed += parseInt(item.detail.speed)
										num++;
									}
									item.detail.speed = parseInt(item.detail.speed)
								}
							})

							this.projectDetailsList = res.data.data
							this.oldDetailsList = res.data.data
							this.address = res.data.data ? res.data.data[0].xm_url : '';
							// if (speed == 0 || num == 0) {
							// 	this.mainValue = 0
							// } else {
							// 	this.mainValue = parseInt(speed / num)
							// }
						}
					} else {
						this.projectDetailsList = [];
						this.mainValue = 0
					}
				}).catch(() => {

				})
			},
			findPerson() {
				this.$axios({
					url: '/getnamelist',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data) {
						this.personList = res.data.data
					}
				}).catch(() => {

				})
			},
			changePlot(name) {
				let personList = this.personList
				let plotList = []
				let Index = 0
				this.branchList.forEach((item) => {
					if (item.design == name) {
						Index = item.id
					}
				})
				personList.forEach((item) => {
					if (item.bm_type == Index) {
						plotList.push(item.user_name)
					}
				})
				this.plotList = plotList
				this.personInfo.plot = plotList[0];
			},
			uncompileStr(code) {
				code = unescape(code);
				var c = String.fromCharCode(code.charCodeAt(0) - code.length);
				for (var i = 1; i < code.length; i++) {
					c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
				}
				return c;
			},
			getDays() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var d = new Date(year, month, 0);
				return d.getDate();
			}
		},

		created() {
			let _this = this;

			var nowDay = new Date().getDate();
			// var nowDay = '18'
			let daysIndex = new Date().getDate() % 10 == 0 ? parseInt(new Date().getDate() / 10) : parseInt(new Date().getDate() /
				10) + 1;
			// let daysIndex = 3;
			let days = _this.getDays();
			let daysList = [];
			for (var i = 1; i <= days; i++) {
				if (daysIndex == 1) {
					if (i <= 10) {
						daysList.push({
							name: i
						});
					}
				} else if (daysIndex == 2) {
					if (i > 10 && i <= 20) {
						daysList.push({
							name: i
						});
					}
				} else if (daysIndex == 3) {
					if (i > 20) {
						daysList.push({
							name: i
						});
					}
				}
			}
			_this.nowDays = nowDay;
			_this.daysList = daysList;
			// let dayList = dayLength
			let role = localStorage.getItem('role')
			// _this.loading = true;
			const loading = this.openLoading();
			_this.findPerson();
			loading.close();
			// _this.loading = false;
			let id = localStorage.getItem('id', )
			let uid = _this.uncompileStr(id).split('&&')[1]
			_this.uid = uid
			_this.personType = localStorage.getItem('type')
			window.addEventListener('beforeunload', e => {
				sessionStorage.removeItem('lastShowIndex')
			});
		},
		destroyed() {
			sessionStorage.removeItem('lastShowIndex')
		}
	}
</script>

<style scoped lang="less">
	.type {
		display: flex;
		padding: 10px 10px;
		letter-spacing: 1px;
		font-size: 14px;

		>div:nth-child(1) {
			width: 45%;

			>span:nth-child(1) {
				margin-right: 10px;
				letter-spacing: 2px;
				color: #b1b1b1;
			}
		}

		>div:nth-child(1) .type>div:nth-child(2) {
			width: 70%;
		}
	}

	.type-wrapper {
		background-color: #fff;
		margin: 10px 15px;
		border-radius: 5px;
	}

	.rate {
		margin: 15px 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;

		>div {
			margin-right: 20px;
		}
	}

	.rate .type-kind {
		margin-top: 5px;
		font-size: 14px;

		span {
			letter-spacing: 1px;
		}
	}

	.rate-val {
		font-size: 14px;

		span:nth-child(1) {
			margin-right: 10px;
			letter-spacing: 1px;
		}
	}

	.rate-info {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-right: 15px;
		padding-bottom: 15px;

		.van-button {
			margin-left: 10px;
			height: 25px;
			line-height: 24px;
			letter-spacing: 1px;
		}

		.van-button--disabled {
			opacity: 1;
		}
	}

	.submit-box {
		display: block;
		margin: 10px 25px;
		box-sizing: border-box;
	}

	.add-submit {
		font-size: 14px;
		letter-spacing: 1px;
		width: 100%;
		border-radius: 5px;
	}

	.main-popup {
		width: 80%;
		border-radius: 5px;
		background: transparent;
	}

	.modal-form {
		position: relative;
		background: #ffffff;
		border-radius: 5px;
	}

	.main-popup .van-cell-group {
		border-radius: 5px;
		padding: 20px 20px;
	}

	.time-picker {
		position: fixed;
		bottom: 0px;
		width: 100%;
		z-index: 9999;
	}

	.modal-form .van-cell {
		padding: 20px 20px;
	}

	.van-cell:nth-child(1),
	.van-cell:last-child {
		margin: 0px 0px;
	}

	.van-popup {
		overflow: initial;
	}

	.close-popup {
		color: #fff;
		font-size: 30px;
		position: absolute;
		bottom: -45px;
		left: 50%;
		z-index: 99999;
		transform: translate(-50%);
	}

	.van-submit-box {
		display: flex;
		margin-top: 20px;
		padding: 0 45px;
		justify-content: center;
	}

	.van-submit {
		display: block;
		width: 100%;
		height: 35px;
		font-size: 16px;
	}

	.icon-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		position: absolute;
	}

	.green {
		background: green;
	}

	.blue {
		background: blue
	}

	.red {
		background: red;
	}

	.orange {
		background: orange;
	}

	.card-top {
		position: relative;
	}

	.card-top-left {
		padding-left: 15px;
	}

	.info {
		width: 70%;

		>span:nth-child(1) {
			color: #b1b1b1;
		}

		>span:nth-child(2) {
			color: #089ddf;
			margin-left: 10px;
			letter-spacing: 0;
		}
	}

	.appraise-container {
		padding: 10px 10px;
		color: #666;
		letter-spacing: 1px;
		font-size: 16px;
	}

	/**/
	.type-info-name>span:nth-child(1) {
		color: #000;
		font-size: 15px;
	}

	.type-info-name>span:nth-child(2) {
		color: #089ddf;
		border: 1px solid #089ddf;
		font-size: 12px;
		margin-left: 2px;
		display: inline-block;
		transform: scale(0.8);
		transform-origin: left;
	}

	.type-info-time {
		color: #b1b1b1;
		font-size: 13px;
	}

	.type-wrapper-container {
		display: flex;
		flex-direction: column;
		padding: 0px 5px 20px;
		position: relative;
	}

	.type-wrapper-container:nth-child(1) {
		display: flex;
		padding: 20px 5px 20px;
		padding-top: 0;
	}

	.container_center {
		width: 100%;
		display: flex;
	}

	.container_center>div:nth-child(1) {
		width: 30%;
	}

	.container_center>div:nth-child(2) {
		width: 40%;
		margin-right: 10px;
	}

	.container_center>div:nth-child(3) {
		width: 30%;
	}


	// .type-wrapper-container>div:nth-child(1) {
	// 	width: 30%;
	// }

	// .type-wrapper-container>div:nth-child(2) {
	// 	width: 40%;
	// 	margin-right: 10px;
	// }

	// .type-wrapper-container>div:nth-child(3) {
	// 	width: 30%;
	// }

	.type-info-details {
		font-size: 12px;
		letter-spacing: 1px;
		border: 1px solid #f5f5f5;
		background-color: #f5f5f5;
		border-radius: 5px;
		color: #666;
		text-align: justify;
	}

	.type-info-name {
		margin-top: 5px;
	}

	.opertation {
		display: flex;
		justify-content: flex-end;
	}

	.opertation>div:nth-child(1) {
		width: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.opertation .block {
		flex-direction: initial !important;
	}

	.slider-val {
		position: absolute;
		font-size: 12px;
		left: 50%;
		transform: translateX(-50%);
		top: 30px
	}

	.sign-finished {
		display: flex;
		justify-content: center;
	}

	.add-person {
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
	}

	.add-person>div {
		display: flex;
		align-items: center;
	}

	.add-person span {
		margin-left: 10px;
		font-size: 14px;
	}

	.type-wrapper-list-details {
		padding: 20px 10px
	}

	/*.update-container {*/
	/*    padding:0 10px 20px;*/
	/*}*/
	.rate-box {
		margin: 15px 0 0px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.van-icon-add {
		font-size: 18px !important;
	}

	.van-icon-add:before {
		font-size: 18px !important;
	}

	.rate-box>div:nth-child(1) {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		position: relative;
	}

	.rate-box>div span {
		position: relative;
		font-size: 14px;
		margin-right: 10px;
		letter-spacing: 1px;
	}

	.rote-box-title span {
		top: 0;
	}

	.rate-main-val {
		width: 30%;
	}

	.rate-box>div .slider-main-val {
		margin-right: 0 !important;
		margin-left: 15px;
		letter-spacing: 0 !important;
		font-size: 12px;
	}

	.update-rate {
		padding: 0 25px;
		height: 30px;
		line-height: 29px;
	}

	.add_card {
		padding: 0 10px;
		height: 25px;
		line-height: 24px;
		font-size:12px;
	}

	.van-slider--disabled {
		opacity: 1;
	}

	.type-info-details .van-cell {
		background: #f5f5f5;
		padding: 0;
	}

	.show-animate {
		height: 0;
		-webkit-transition: height 1s;
		-moz-transition: height 1s;
		-o-transition: height 1s;

		&.active {
			height: 600px;
		}
	}

	.rote-box-title .van-slider {
		width: 50px;
		margin-right: 5px;
	}

	.main-vate {
		width: 40px;
		letter-spacing: 0;
		margin: 0 20px 0 10px;
		font-size: 12px;
		position: relative;
		left: 10px;
		text-align: center;
	}

	.rate-title {
		font-size: 14px;
	}

	.cp-icon-box {
		position: absolute;
		right: 0;
		margin-right: 5px !important;
	}

	.overhead {
		position: absolute;
		right: 0;
		width: 50%;
		font-size: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.overhead span {
		background: #000;
	}

	.btn-overhead {
		padding: 0 15px;
		height: 25px;
	}

	.opertation .ivu-slider .ivu-slider-stop:nth-child(1) {
		left: 2% !important;
	}

	.card-bottom {
		position: relative;
	}

	.schedule {
		position: absolute;
		right: 10px;
		bottom: 10px;
		color: #2db7f5;
		cursor: pointer;
	}

	.statistics {
		display: flex;
		justify-content: space-between;
		margin-top: 15px;
	}

	.statistics_right {
		display: flex;
	}

	.output {
		padding: 5px 10px;
		background: #409EFF;
		border-radius: 5px;
		color: #fff;
		cursor: pointer;
		// font-size: 12px;
	}

	.price_num {
		font-size: 12px;
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

	.type_box {
		display: flex;
		justify-content: center;
		margin-bottom: 10px;
	}

	.type_active {
		background: #089ddf;
		color: #fff;
	}

	.type_center {
		display: flex;
		justify-content: center;


		overflow: hidden;
		cursor: pointer;
	}

	.type_center>div:nth-child(1) {
		padding: 5px 10px;
		border: 1px solid #089ddf;
		border-radius: 10px 0 0 10px;
	}

	.type_center>div:nth-child(2) {
		padding: 5px 10px;
		border: 1px solid #089ddf;
		border-radius: 0 10px 10px 0;
	}

	.avatar-uploader {
		display: flex;
		justify-content: center;
		position: relative;
	}

	.sun_img_box {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100px;
		margin: 30px auto 0;
	}

	.sun_img {
		width: 100px;
		height: 100px;
		position: relative;
	}

	.sun_img .el-image {
		width: 100%;
	}

	.file_del {
		text-align: center;
		margin-top: 20px;
	}

	.file_del>i {
		font-size: 26px;
	}

	.sun_img_box .upload {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		opacity: 0;
	}

	.van-list {
		padding-bottom: 40px;
		min-height: 65vh;
	}

	.data_center {
		margin: 10px 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	table tr td {
		padding: 3px;
		border: 1px solid #eee;
		position: relative;
		font-size:12px;
	}

	.data_select {
		position: absolute;
		left: 50%;
		bottom: 0px;
		transform: translateX(-50%);
		color: #fff;
	}

	.data_active {
		background: rgba(64, 158, 225, 0.5);
	}
</style>
<style>
	#execute>>>.ivu-slider-stop {
		left: 2% !important;
	}
</style>
