<template>
	<div id="commercial" class="page-show">
		<div class="wc-page-top">
			<div class="top-name">
				<div class="top-close iconfont icon-Group-" @click="toLogin"><span>退出登录</span></div>
				<div class="top-title">网晨平头哥管理系统-商务端</div>
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
				<el-input @click.native="inputClick($event)" placeholder="请输入姓名" v-model="search" @blur="scrollChange" clearable>
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
				<el-button type='primary' plain class="output" @click.native="toSearch()">项目消化情况</el-button>
				<div class="statistics_right">
					<div class='price_num'>项目价格统计:</div>
					<div class="statistics_box" v-for="(statistItem, statistIndex) in colorList" :key="statistIndex">
						<div :class="[{'icon-money':true}]" :style="{backgroundColor : statistItem.color }"></div>
						<span v-html="statistItem.num"></span>
					</div>
				</div>
			</div>
			<div class="statistics">
				<el-button type='primary' plain class="output" @click.native="toAl()">行业分析</el-button>
				<el-button type='primary' plain class="output" @click.native="toFx()">案例大全</el-button>
			</div>
			<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
				<van-list v-model="loadingcontent" :finished="finished" @load="onLoad">
					<!-- 加载的内容-->
					<div class="project-card-box" v-for="(projectItem,projectIndex) in projectList" :key="projectIndex">
						<div :class="['project-card',{'over-header-light':projectItem.is_type == 2,'emergent':projectItem.hasOver,'overTime':projectItem.overTime   }]"
						 @click="showProject(projectItem.id,$event,projectIndex,projectItem.checked)">
							<div class="card-top">
								<div :class="[{'icon-dot':true}]" :style="{backgroundColor : colorSelect(projectItem.price)}"></div>
								<div class="card-top-left" v-html="projectItem.pro_name">
								</div>
								<div class="card-top-count_speedright">
									<span class="card-left-type">销售:</span><span class="card-type-name" v-show="projectItem.sale_name" v-html="projectItem.sale_name"></span>
									<span class="card-right-type">策划:</span><span class="card-type-name" v-show="projectItem.plan_name" v-html="projectItem.plan_name"></span>
								</div>
							</div>
							<div class="card-bottom">
								<div class="">
									<div class="card-bottom-left">
										<span class="setting-time-title">立项时间:</span><span class="setting-time" v-html="projectItem.lix_time"></span>
									</div>
									<div class="card-bottom-right">
										<span class="up-time-title">上线时间:</span><span class="up-time" v-html="projectItem.shangx_time"></span>
									</div>
								</div>
								<div class="small-rate">
									<div class="rate-container" v-if="projectList !=''">
										<div class="rate" v-if="projectList !=''">
											<div v-show="projectItem.sjScore">
												<el-progress type="circle" :percentage="projectItem.sjScore" :color="rateColor[0]" :stroke-width="10"></el-progress>
												<div class="type-kind"><span>设计</span></div>
											</div>
											<div v-show="projectItem.qdScore">
												<el-progress type="circle" :percentage="projectItem.qdScore" :color="rateColor[1]" :stroke-width="10"></el-progress>
												<div class="type-kind"><span></span>前端</div>
											</div>
											<div v-show="projectItem.hdScore">
												<el-progress type="circle" :percentage="projectItem.hdScore" :color="rateColor[2]" :stroke-width="10"></el-progress>
												<div class="type-kind"><span>后端</span></div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class='operate'>
								<div class="schedule" @click.stop="showMoney(projectItem.id,projectItem.finance,projectItem.sale_name)">财务进度</div>
								<div class="schedule" @click.stop="toSchedule(projectItem.id)">查看排期</div>
							</div>
							<div class='operate' v-if="projectItem.user_id == uid">
								<div class="schedule" @click.stop="deleteProject(projectItem.id,projectItem.user_id,projectIndex)">删除项目（谨慎删除）</div>
							</div>
						</div>
						<div :class="{'type-wrapper':true,'showframe':projectItem.checked}" v-show="projectItem.checked">
							<div class="type-wrapper-list-details">
								<div class="container_center">
									<div class="type-wrapper-container" v-if="projectDetailsList !=''">
										<div class="type" v-for="(projectDetailsItem,projectDetailsIndex) in projectDetailsList" :key="projectDetailsIndex">
											<div>
												<span v-html='projectDetailsItem.design + ":"'></span><span v-html="projectDetailsItem.zx_name"></span>
												<div class="type-time" v-show="!projectDetailsItem.isCS">
													<span v-html="projectDetailsItem.creat_time"></span><br>
													<span v-html="projectDetailsItem.speed + '%'"></span>
												</div>
											</div>
											<div class="info" v-show="!projectDetailsItem.isCS">
												<span v-html="projectDetailsItem.centen_log"></span>
											</div>
										</div>

									</div>
									<div class="rate-container" v-if="projectDetailsList !=''">
										<div class="rate" v-if="projectDetailsList !=''">
											<!--                                <div v-for="(projectDetailsItem,projectDetailsIndex) in projectDetailsList" :key="projectDetailsIndex" v-show="!projectDetailsItem.isCS">-->
											<!--                                    <el-progress type="circle" :percentage="parseInt(projectDetailsItem.speed)" :color="rateColor[projectDetailsIndex]" :stroke-width="10"></el-progress>-->
											<!--                                    <div class="type-kind"><span v-html="projectDetailsItem.design"></span></div>-->
											<!--                                </div>-->
											<div v-show="sjProject.num != 0">
												<el-progress type="circle" :percentage="parseInt(sjProject.score)" :color="rateColor[0]" :stroke-width="10"></el-progress>
												<div class="type-kind"><span>设计</span></div>
											</div>
											<div v-show="qdProject.num != 0">
												<el-progress type="circle" :percentage="parseInt(qdProject.score)" :color="rateColor[1]" :stroke-width="10"></el-progress>
												<div class="type-kind"><span></span>前端</div>
											</div>
											<div v-show="hdProject.num != 0">
												<el-progress type="circle" :percentage="parseInt(hdProject.score)" :color="rateColor[2]" :stroke-width="10"></el-progress>
												<div class="type-kind"><span>后端</span></div>
											</div>
										</div>
										<div class="rate-info" v-if="projectDetailsList !=''">
											<div class="rate-val"><span>总进度:</span><span v-text='mainValue +"%"'></span></div>
											<van-button type="info" @click.native="showfinishModal(projectItem.id,projectItem.user_id)" v-if="mainValue == 100">完成</van-button>
											<!-- <van-button type="info" @click.native="showfinishModal(projectItem.id,projectItem.user_id)">完成</van-button> -->
										</div>
									</div>

								</div>




							</div>
						</div>
					</div>
					<div class="nomore" v-if="!canInit">无更多数据...</div>
				</van-list>
			</van-pull-refresh>
		</div>
		<div class="submit-box">
			<el-button type="primary" class="add-submit" @click.native="showPopup">增加项目</el-button>
		</div>

		<el-dialog :visible.sync="finishModalShow" :append-to-body='true' class='finish_modal'>
			<el-form ref="form" label-width="80px">
				<div class='person_info' v-for="(projectDetailsItem,projectDetailsIndex) in projectDetailsList" :key="projectDetailsIndex">
					<div class='zn_name'>
						<div>{{projectDetailsItem.zx_name}}：</div>
					</div>
					<div class='kh_assess'>
						<label for="">客户满意度评价</label>
						<van-dropdown-menu class="van_select">
							<van-dropdown-item ref="item" v-model="projectDetailsItem.kh_value" :options="projectScore.kh.list" />
						</van-dropdown-menu>
					</div>
				</div>
				<div>
					<div class='pro_deliver'>完结时间:</div>
					<el-form-item class="finishi-time">
						<el-col :span="24">
							<el-date-picker type="date" :editable="false" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="finishTime"
							 style="width: 100%;"></el-date-picker>
						</el-col>
					</el-form-item>
				</div>
				<div>
					<div class='pro_deliver'>项目总评:</div>
					<el-input @click.native="inputClick($event)" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="详细描述问题..."
					 v-model="projectFinish.info_details" @blur="scrollChange">
					</el-input>
				</div>

				<el-form-item class='primary_box'>
					<el-button type="primary" @click.native="scoreSubmit">提交</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>



		<el-dialog :visible.sync="dialogFormVisible" :append-to-body='true'>
			<el-form ref="form" label-width="80px">
				<el-form-item label="项目名">
					<el-input @click.native="inputClick($event)" v-model="projectInfo.name" @blur="scrollChange"></el-input>
				</el-form-item>
				<el-form-item label="立项时间">
					<el-col :span="24">
						<el-date-picker type="date" :editable="false" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="projectInfo.lxtime"
						 style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="上线时间">
					<el-col :span="24">
						<el-date-picker type="date" :editable="false" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="projectInfo.sxtime"
						 style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="销售">
					<el-select v-model="projectInfo.seller" placeholder="请选择">
						<el-option v-for="item in SellerList" :key="item" :value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="策划">
					<el-select v-model="projectInfo.plot" placeholder="请选择">
						<el-option v-for="item in PlanList" :key="item" :value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="价格区间">
					<el-select v-model="projectInfo.money" placeholder="请选择">
						<el-option v-for="item in MoneyList" :key="item" :value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="btn-item">
					<el-button type="primary" class="" @click.native="AddFrom">确定添加</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<el-dialog :visible.sync="moneyVisible" :append-to-body='true'>
			<el-form ref="form" label-width="80px">
				<el-form-item label="财务进度">
					<el-input @click.native="inputClick($event)" v-model.number="finance" maxlength='3' min='0' max='100'
					 @keyup.native="loadNumber($event)" placeholder="财务进度" type="text">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-if="showSubmit" @click.native="updateMoney(showSubmit)">提交</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<div class="nodata" v-show="projectList == ''">暂无数据</div>
		<van-loading v-show="loading" class="loading" />
		<Footer v-if="!canInit"></Footer>
	</div>
</template>
<script>
	import qs from 'qs'
	export default {
		name: "commercial",
		data() {
			return {
				workerList: [],
				showSubmit: false,
				nowXms_id: '',
				moneyVisible: false,
				finance: '',
				typeList: ['行政', '商务', '执行'],
				search: '',
				p_search: '',
				color1: '#45e5d9',
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
				rateColor: ['#FFEC8B', '#7EC0EE', '#76EEC6', '#66CDAA'],
				show: false,
				SellerList: [],
				PlanList: [],
				MoneyList: ['0-3W', '3-5W', '5-10W', '10-15W', '15W以上'],
				projectInfo: {
					name: '',
					lxtime: new Date(),
					sxtime: new Date(),
					seller: '',
					plot: '',
					money: ''
				},
				projectScore: {
					getscore: '',
					score: {
						value: 0,
						list: []
					},
					kh: {
						value: '特别优秀,受到客户的认可',
						list: [{
							text: '特别优秀,受到客户的认可',
							value: '特别优秀,受到客户的认可'
						}, {
							text: '无工作纰漏,工作效率和配合度良好',
							value: '无工作纰漏,工作效率和配合度良好'
						}, {
							text: '有工作纰漏,或工作效率和态度不佳',
							value: '有工作纰漏,或工作效率和态度不佳'
						}, {
							text: '重大纰漏,受到客户不满和投诉',
							value: '重大纰漏,受到客户不满和投诉'
						}, {
							text: '项目黄单,尾款无法收回',
							value: '项目黄单,尾款无法收回'
						}]
					}
				},
				projectFinish: {
					cp_name: '',
					cp_show: false,
					cp_pf: '',
					sj_name: '',
					sj_pf: '',
					sj_show: false,
					qd_name: '',
					qd_pf: '',
					qd_show: false,
					hd_name: '',
					hd_pf: '',
					hd_show: false,
					info_details: '',
					cs_name: '',
					cs_pf: '',
					cs_show: false
				},
				dialogTableVisible: false,
				dialogFormVisible: false,
				finishModalShow: false,
				showIndex: null,
				projectList: [],
				projectDetailsList: [],
				projectId: 0,
				uid: '',
				user: '',
				loading: false,
				nowIndex: 0,
				nowprojectIndex: 0,
				sjProject: {
					score: '',
					nameList: [],
					num: 0
				},
				cpProject: {
					score: '',
					nameList: [],
					num: 0
				},
				qdProject: {
					score: '',
					nameList: [],
					num: 0
				},
				hdProject: {
					score: '',
					nameList: [],
					num: 0
				},
				csProject: {
					score: '',
					nameList: [],
					num: 0
				},
				mainValue: 0,
				deviceList: [], //用于存放加载的数据
				totalPage: 0,
				pageNumber: 0,
				loadingcontent: false, //控制上拉加载的加载动画
				finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
				isLoading: false, //控制下拉刷新的加载动画
				page: 1,
				canInit: true,
				ext: {
					sjProject: {
						score: '',
						nameList: [],
						num: 0
					},
					cpProject: {
						score: '',
						nameList: [],
						num: 0
					},
					qdProject: {
						score: '',
						nameList: [],
						num: 0
					},
					hdProject: {
						score: '',
						nameList: [],
						num: 0
					},
					csProject: {
						score: '',
						nameList: [],
						num: 0
					}
				},
				dataNum: 0,
				workList: [{
						text: '全部商品',
						value: 0
					},
					{
						text: '新款商品',
						value: 1
					},
					{
						text: '活动商品',
						value: 2
					}
				],
				finishTime: ''
			}
		},
		components: {
			Footer: () => import('components/footer.vue'),
		},
		computed: {
			text(Rate) {
				return (Rate) => {
					return Rate.toFixed(0) + '%'
				}
			},
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
			},
			selectFinance(val) {
				return (val) => {
					let value = '';
					if (!/(^0$)|(^100$)|(^\d{1,2}$)/.test(val)) {
						value = '';
					} else {
						value = val;
					}
					return value;
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
			deleteProject(id, user_id, deleteIndex) {
				let _this = this;
				console.log(user_id, this.uid)
				let pass = user_id == this.uid
				if (!pass) {
					this.$toast({
						message: '您不是当前项目的商务',
						duration: 1000
					})
					return;
				}
				this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then((res) => {
					console.log(res)
					var params = new URLSearchParams();
					params.append("id", id);
					// this.loading = true;
					var loading = this.openLoading();
					this.$axios({
						url: '/getBusdelpro',
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
										if (listItem.id == id) {
											projectList.splice(deleteIndex, 1)
										}
									})
									this.projectList = projectList
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
			toAl() {
				let _this = this;
				_this.$router.replace({
					name: 'case'
				})
			},
			toFx() {
				let _this = this;
				_this.$router.replace({
					name: 'analyse'
				})
			},
			toMember() {
				let _this = this;
				_this.$router.replace({
					name: 'member'
				})
			},
			inputClick(e) {
				e.target.focus();
				// e.currentTarget.focus();
			},
			loadNumber: function(event) {
				if (this.finance != '') {
					if (this.finance >= 100) {
						this.finance = 100
					} else if (this.finance <= 0) {
						this.finance = 0
					}
				}
			},
			toSchedule(id) {
				localStorage.setItem('xms_id', id)
				this.$router.replace({
					name: 'scheduling'
				})
			},
			showMoney(id, finance, name) {
				this.nowXms_id = id;
				this.moneyVisible = true;
				this.finance = finance;
				if (this.SellerList[0] == name) {
					this.showSubmit = true;
				} else {
					this.showSubmit = false;
				}

			},
			updateMoney(pass) {
				let id = this.nowXms_id
				if (!pass) {
					this.$toast({
						message: '你不是该项目商务,不能随意修改此进度！',
						duration: 1000
					});
					return;
				}
				if (this.finance == '' || this.finance == '' && this.finance != 0) {
					this.$toast({
						message: '进度不能为空！',
						duration: 1000
					});
					return;
				}
				let data = {
					finance: ''
				}
				data.finance = this.finance;
				var params = new URLSearchParams();
				params.append("finance", this.finance);
				params.append("id", id);
				params.append("user_id", this.uid);
				let _this = this;
				// _this.loading = true;
				const loading = this.openLoading();
				_this.$axios({
					url: '/getswfine',
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
									message: '操作成功!',
									duration: 1000
								});
								this.findList();
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
				_this.moneyVisible = false
			},
			toSearch(id) {
				// localStorage.setItem('xms_id',id)
				this.$router.replace({
					name: 'member_table'
				})
			},
			proSearch() {
				let _this = this;
				let search = _this.p_search
				let data = {
					keywords: search
				}
				if (search == '') {
					_this.$toast({
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
								_this.finished = true
								_this.canInit = false
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
									let sjList = [],
										qdList = [],
										hdList = []
									item.ext.forEach((extItem) => {
										if (extItem.design == '设计') {
											if (extItem.speed == '' || extItem.speed == null) {
												extItem.speed = 0
											} else {
												extItem.speed = parseInt(extItem.speed)
											}
											sjList.push(extItem.speed)
										} else if (extItem.design == '前端') {
											if (extItem.speed == '' || extItem.speed == null) {
												extItem.speed = 0
											} else {
												extItem.speed = parseInt(extItem.speed)
											}
											qdList.push(extItem.speed)
										} else if (extItem.design == '后端') {
											if (extItem.speed == '' || extItem.speed == null) {
												extItem.speed = 0
											} else {
												extItem.speed = parseInt(extItem.speed)
											}
											hdList.push(extItem.speed)
										}
									})
									let sj = 0,
										qd = 0,
										hd = 0
									if (sjList.length == 0) {
										sj = 0
									} else {
										for (var i = 0; i < sjList.length; i++) {
											sj += sjList[i]
										}
									}

									if (qdList.length == 0) {
										qd = 0
									} else {
										for (var i = 0; i < qdList.length; i++) {
											qd += qdList[i]
										}
									}

									if (hdList.length == 0) {
										hd = 0
									} else {
										for (var i = 0; i < hdList.length; i++) {
											hd += hdList[i]
										}
									}

									if (sj == 0) {
										item.sjScore = 0
									} else {
										item.sjScore = parseInt(sj / sjList.length)
									}

									if (qd == 0) {
										item.qdScore = 0
									} else {
										item.qdScore = parseInt(qd / qdList.length)
									}

									if (hd == 0) {
										item.hdScore = 0
									} else {
										item.hdScore = parseInt(hd / hdList.length)
									}
								})
								res.data.data.forEach((item) => {
									res.data.data.forEach((item) => {
										let time = _this.DateMinus(_this.DayChange(new Date()), item.shangx_time)
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
								// _this.isLoading = false;
								// _this.loading = false;
								loading.close();
								this.projectList = res.data.data
							} else {
								// _this.isLoading = false;
								// _this.loading = false;
								loading.close();
								_this.$toast({
									message: "暂无相关内容!",
									duration: 1000
								})
							}
						}, 1000)
					} else {
						loading.close();
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
					_this.$toast({
						message: "请输入关键字!",
						duration: 1000
					})
					return;
				}
				// _this.loading = true;
				const loading = this.openLoading();
				_this.$axios({
					url: '/getSearchpro',
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
								_this.finished = true
								_this.canInit = false
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
									let sjList = [],
										qdList = [],
										hdList = []
									item.ext.forEach((extItem) => {
										if (extItem.design == '设计') {
											if (extItem.speed == '' || extItem.speed == null) {
												extItem.speed = 0
											} else {
												extItem.speed = parseInt(extItem.speed)
											}
											sjList.push(extItem.speed)
										} else if (extItem.design == '前端') {
											if (extItem.speed == '' || extItem.speed == null) {
												extItem.speed = 0
											} else {
												extItem.speed = parseInt(extItem.speed)
											}
											qdList.push(extItem.speed)
										} else if (extItem.design == '后端') {
											if (extItem.speed == '' || extItem.speed == null) {
												extItem.speed = 0
											} else {
												extItem.speed = parseInt(extItem.speed)
											}
											hdList.push(extItem.speed)
										}
									})
									let sj = 0,
										qd = 0,
										hd = 0
									if (sjList.length == 0) {
										sj = 0
									} else {
										for (var i = 0; i < sjList.length; i++) {
											sj += sjList[i]
										}
									}

									if (qdList.length == 0) {
										qd = 0
									} else {
										for (var i = 0; i < qdList.length; i++) {
											qd += qdList[i]
										}
									}

									if (hdList.length == 0) {
										hd = 0
									} else {
										for (var i = 0; i < hdList.length; i++) {
											hd += hdList[i]
										}
									}

									if (sj == 0) {
										item.sjScore = 0
									} else {
										item.sjScore = parseInt(sj / sjList.length)
									}

									if (qd == 0) {
										item.qdScore = 0
									} else {
										item.qdScore = parseInt(qd / qdList.length)
									}

									if (hd == 0) {
										item.hdScore = 0
									} else {
										item.hdScore = parseInt(hd / hdList.length)
									}
								})

								res.data.data.forEach((item) => {
									res.data.data.forEach((item) => {
										let time = _this.DateMinus(_this.DayChange(new Date()), item.shangx_time)
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
								// _this.isLoading = false;
								// _this.loading = false;
								loading.close();
								this.projectList = res.data.data
							} else {
								// _this.isLoading = false;
								// _this.loading = false;
								loading.close();
								_this.$toast({
									message: "暂无相关内容!",
									duration: 1000
								})
							}
						}, 1000)
					} else {
						loading.close();
						this.$toast({
							message: "" + res.data.msg + "!",
							duration: 1000
						})
					}
				}).catch(() => {

				})
			},
			//下拉刷新
			onLoad() { //上拉加载
				let self = this;
				if (this.canInit) {
					setTimeout(() => {


						if (this.dataNum.length - this.projectList.length <= 8) {
							this.finished = true;
						}
						this.findListOne()
						this.page = this.page + 1
						this.loadingcontent = false;
					}, 500);
				}
			},
			onRefresh() {
				//下拉刷新
				setTimeout(() => {
					this.finished = false;
					this.isLoading = false;
					this.findList()
				}, 500);
			},
			scrollChange() {
				let Index = document.getElementById('index')
				Index.scrollIntoView()
			},
			showPopup() {
				let userId = this.uid
				let ifBussiness = false
				this.personList.forEach((item) => {
					if (item.id == userId) {
						ifBussiness = true;
						return;
					}
				})
				if (ifBussiness) {
					this.dialogTableVisible = true;
					this.dialogFormVisible = true;
					this.projectInfo = {
						name: '',
						lxtime: this.Change(new Date()),
						sxtime: this.Change(new Date()),
						seller: '',
						plot: '',
						money: ''
					}
				} else {
					this.$toast({
						message: '您不是商务人员,无法添加项目！',
						duration: 1000
					})
				}
			},
			hideModal() {
				this.show = false;
			},
			showfinishModal(id, user_id) {
				this.projectId = id
				this.projectFinish.info_details = '';
				this.finishModalShow = true;
				this.finishTime = '';
			},
			scoreSubmit() {
				let _this = this;
				let data = [];
				let ifPass = false;
				_this.projectDetailsList.forEach((item) => {
					let obj = {}
					obj.uid = _this.uid;
					obj.eva_id = _this.projectId;
					obj.zx_post = item.design;
					obj.zx_name = item.zx_name;
					obj.m_center = _this.projectFinish.info_details;
					// obj.creat_time = _this.Change(new Date());
					obj.creat_time = _this.finishTime;
					obj.sorce = 10;
					obj.Job_share = item.score_value * 5 + '%' ? item.score_value * 5 + '%' : 0 + '%';
					obj.customer = item.kh_value;
					if (!item.kh_value) {
						_this.$toast({
							message: '评价不能为空!'
						})
					}
					data.push(obj)
				})
				if (!_this.finishTime.split(' ')[0]) {
					_this.$toast({
						message: '完结时间不能为空!'
					});
					return;
				}
				if (!_this.projectFinish.info_details) {
					_this.$toast({
						message: '总评不能为空!'
					});
					return;
				}
				const loading = this.openLoading();
				_this.$axios({
					url: '/getScore',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: qs.stringify(data),
				}).then((res) => {
					if (res.data.errcode == 0) {
				setTimeout(() => {
					// this.loading = false
					loading.close();
					_this.finishModalShow = false;
					setTimeout(() => {
						_this.$toast({ message: '评分成功！' });
						// _this.findList();
						_this.projectList.splice(_this.nowprojectIndex, 1);
					}, 500)
				}, 500)
					} else {
						setTimeout(() => {
							// this.loading = false
							loading.close();
							_this.finishModalShow = false;
							setTimeout(() => {
								_this.$toast({
									message: "" + res.data.msg + "",
									duration: 1000
								})
							}, 500)
						}, 500)
					}
				}).catch(() => {
					setTimeout(() => {
						// this.loading = false
						loading.close();
						_this.finishModalShow = false;
						setTimeout(() => {
							_this.$toast({
								message: "请求失败!",
								duration: 1000
							})
						}, 500)
					}, 500)
				})
			},
			Change(d) {
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
			showProject(index, e, pIndex, checked) {
				e.stopPropagation();
				let id = index
				let lastIndex = sessionStorage.getItem('lastShowIndex')
				this.projectDetailsList = []
				this.findDetails(id)
				this.projectList.forEach((item, index) => {
					item.checked = false;
					if (item.id == id) {
						item.checked = !checked;
					}
				})
				this.nowprojectIndex = pIndex
				sessionStorage.setItem('lastShowIndex', pIndex)
			},
			toLogin() {
				localStorage.removeItem('role')
				this.$router.replace({
					path: '/login'
				})
			},
			DateMinus(date1, date2) {
				var sdate = new Date(date1);
				var now = new Date(date2);
				var days = now.getTime() - sdate.getTime();
				var day = parseInt(days / (1000 * 60 * 60 * 24));
				return day;
			},
			findList() {
				this.$axios({
					url: '/getxslist',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data) {
						res.data.data.forEach((item) => {
							item.checked = false;
						})
						this.finished = true
						this.canInit = false
						this.dataNum = res.data.data.length
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
							let sjList = [],
								qdList = [],
								hdList = []
							item.ext.forEach((extItem) => {
								if (extItem.design == '设计') {
									if (extItem.speed == '' || extItem.speed == null) {
										extItem.speed = 0
									} else {
										extItem.speed = parseInt(extItem.speed)
									}
									sjList.push(extItem.speed)
								} else if (extItem.design == '前端') {
									if (extItem.speed == '' || extItem.speed == null) {
										extItem.speed = 0
									} else {
										extItem.speed = parseInt(extItem.speed)
									}
									qdList.push(extItem.speed)
								} else if (extItem.design == '后端') {
									if (extItem.speed == '' || extItem.speed == null) {
										extItem.speed = 0
									} else {
										extItem.speed = parseInt(extItem.speed)
									}
									hdList.push(extItem.speed)
								}
							})
							let sj = 0,
								qd = 0,
								hd = 0
							if (sjList.length == 0) {
								sj = 0
							} else {
								for (var i = 0; i < sjList.length; i++) {
									sj += sjList[i]
								}
							}

							if (qdList.length == 0) {
								qd = 0
							} else {
								for (var i = 0; i < qdList.length; i++) {
									qd += qdList[i]
								}
							}

							if (hdList.length == 0) {
								hd = 0
							} else {
								for (var i = 0; i < hdList.length; i++) {
									hd += hdList[i]
								}
							}

							if (sj == 0) {
								item.sjScore = 0
							} else {
								item.sjScore = parseInt(sj / sjList.length)
							}

							if (qd == 0) {
								item.qdScore = 0
							} else {
								item.qdScore = parseInt(qd / qdList.length)
							}

							if (hd == 0) {
								item.hdScore = 0
							} else {
								item.hdScore = parseInt(hd / hdList.length)
							}
						})

						this.projectList = res.data.data
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
								let sjList = [],
									qdList = [],
									hdList = []
								item.ext.forEach((extItem) => {
									if (extItem.design == '设计') {
										if (extItem.speed == '' || extItem.speed == null) {
											extItem.speed = 0
										} else {
											extItem.speed = parseInt(extItem.speed)
										}
										sjList.push(extItem.speed)
									} else if (extItem.design == '前端') {
										if (extItem.speed == '' || extItem.speed == null) {
											extItem.speed = 0
										} else {
											extItem.speed = parseInt(extItem.speed)
										}
										qdList.push(extItem.speed)
									} else if (extItem.design == '后端') {
										if (extItem.speed == '' || extItem.speed == null) {
											extItem.speed = 0
										} else {
											extItem.speed = parseInt(extItem.speed)
										}
										hdList.push(extItem.speed)
									}
								})
								let sj = 0,
									qd = 0,
									hd = 0
								if (sjList.length == 0) {
									sj = 0
								} else {
									for (var i = 0; i < sjList.length; i++) {
										sj += sjList[i]
									}
								}

								if (qdList.length == 0) {
									qd = 0
								} else {
									for (var i = 0; i < qdList.length; i++) {
										qd += qdList[i]
									}
								}

								if (hdList.length == 0) {
									hd = 0
								} else {
									for (var i = 0; i < hdList.length; i++) {
										hd += hdList[i]
									}
								}

								if (sj == 0) {
									item.sjScore = 0
								} else {
									item.sjScore = parseInt(sj / sjList.length)
								}

								if (qd == 0) {
									item.qdScore = 0
								} else {
									item.qdScore = parseInt(qd / qdList.length)
								}

								if (hd == 0) {
									item.hdScore = 0
								} else {
									item.hdScore = parseInt(hd / hdList.length)
								}
							})
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

						} else {
							this.finished = true;
							this.canInit = false;
						}
					} else {
						this.finished = true;
						this.canInit = false;
					}
				}).catch((error) => {
					console.log(error)
				})
			},
			findDetails(id) {
				var params = new URLSearchParams();
				let _this = this;
				params.append("xm_id", id);
				_this.$axios({
					url: '/getxsdes',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					if (res.data.errcode == 0) {
						if (res.data.data) {
							res.data.data.forEach((item) => {
								if (item.count_speed == '' || item.count_speed == undefined) {
									this.projectList[this.nowprojectIndex].mainValue = 0
								} else {
									this.projectList[this.nowprojectIndex].mainValue = parseInt(item.count_speed)
								}
								if (item.speed == '' || item.speed == undefined) {
									item.speed = 0
								} else {
									item.speed = parseInt(item.speed)
								}
							})
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
							let sjSpeed = 0,
								qdSpeed = 0,
								hdSpeed = 0,
								sjnum = 0,
								qdnum = 0,
								hdnum = 0;
							res.data.data.forEach((item) => {
								if (item.design == '设计') {
									sjSpeed += parseInt(item.speed)
									sjnum++;
								} else if (item.design == '前端') {
									qdSpeed += parseInt(item.speed)
									qdnum++;
								} else if (item.design == '后端') {
									hdSpeed += parseInt(item.speed)
									hdnum++;
								}
							})
							let num1 = 0,
								num2 = 0,
								num3 = 0
							if (sjSpeed == 0 || sjnum == 0) {
								this.sjProject.score = 0;
							} else {
								this.sjProject.score = parseInt(sjSpeed / sjnum);
							}
							if (qdSpeed == 0 || qdnum == 0) {
								this.qdProject.score = 0;
							} else {
								this.qdProject.score = parseInt(qdSpeed / qdnum);
							}
							if (hdSpeed == 0 || hdnum == 0) {
								this.hdProject.score = 0;
							} else {
								this.hdProject.score = parseInt(hdSpeed / hdnum);
							}


							num1 = sjnum == 0 ? 0 : 1
							num2 = qdnum == 0 ? 0 : 1
							num3 = hdnum == 0 ? 0 : 1
							this.qdProject.num = qdnum;
							this.sjProject.num = sjnum;
							this.hdProject.num = hdnum;

							if (num1 + num2 + num3 == 0) {
								this.mainValue = 0
							} else {
								this.mainValue = parseInt((this.hdProject.score + this.qdProject.score + this.sjProject.score) / (num1 + num2 +
									num3))
							}
							res.data.data.forEach((item) => {
								item.worker = '';
								item.getscore = '';
								item.score_value = 0;
								item.kh_value = '特别优秀,受到客户的认可';
							})
							// console.log(item)
							this.projectDetailsList = res.data.data
							console.log(res.data.data)
						} else {
							this.projectDetailsList = [];
							this.mainValue = 0
							this.$toast({
								message: '当前项目暂时无详情,请联系执行人员添加!',
								duration: 1000
							});
						}
					} else {
						this.projectDetailsList = [];
						this.mainValue = 0
						this.$toast({
							message: '当前项目暂时无详情,请联系执行人员添加!',
							duration: 1000
						});
					}
				}).catch(() => {

				})
			},
			AddFrom() {
				let data = this.projectInfo
				if (data.name == '') {
					this.$toast({
						message: '项目名不能为空!',
						duration: 1000
					});
					return;
				}
				if (data.lxtime == '') {
					this.$toast({
						message: '立项时间不能为空!',
						duration: 1000
					});
					return;
				}
				if (data.sxtime == '') {
					this.$toast({
						message: '上线时间不能为空!',
						duration: 1000
					});
					return;
				}
				if (data.seller == '') {
					this.$toast({
						message: '销售姓名不能为空!',
						duration: 1000
					});
					return;
				}
				if (data.plot == '') {
					this.$toast({
						message: '策划姓名不能为空!',
						duration: 1000
					});
					return;
				}

				if (data.money == '') {
					this.$toast({
						message: '金额不能为空!',
						duration: 1000
					});
					return;
				}
				if (!this.CompareDate(data.lxtime, data.sxtime)) {
					this.$toast({
						message: '上线时间不能在立项时间之前!',
						duration: 1000
					});
					return;
				}
				// this.loading = true;
				const loading = this.openLoading();
				var params = new URLSearchParams();
				let id = localStorage.getItem('id', )
				let uid = this.uncompileStr(id).split('&&')[1]
				params.append("user_id", uid);
				params.append("pro_name", data.name);
				params.append("lix_time", data.lxtime);
				params.append("shangx_time", data.sxtime);
				params.append("sale_name", data.seller);
				if (data.plot == '无') {
					params.append("plan_name", '');
				} else {
					params.append("plan_name", data.plot);
				}
				params.append("price", data.money);
				this.$axios({
					url: '/getAddpro',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					if (res.data) {
						if (res.data.errcode == 0) {
							setTimeout(() => {
								this.dialogTableVisible = false;
								this.dialogFormVisible = false;
								// this.loading = false;
								loading.close();
								setTimeout(() => {
									this.$toast({
										message: '新增成功!',
										duration: 1000
									});
									this.findPerson()
									this.findList()
								}, 500)
							}, 500)
						} else {
							setTimeout(() => {
								this.dialogTableVisible = false;
								this.dialogFormVisible = false;
								// this.loading = false;
								loading.close();
								setTimeout(() => {
									this.$toast({
										message: "" + res.data.msg + "!",
										duration: 1000
									});
								}, 500)
							}, 500)
						}
					}
				}).catch(() => {
					setTimeout(() => {
						this.dialogTableVisible = false;
						this.dialogFormVisible = false;
						// this.loading = false;
						loading.close();
						setTimeout(() => {
							this.$toast({
								message: "请求失败!",
								duration: 1000
							});
						}, 500)
					}, 500)
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
						this.SellerList = []
						this.PlanList = []
						res.data.data.forEach((item) => {
							if (item.bm_type == 3 || item.bm_type == 8) {
								if (item.id == this.uid) {
									this.SellerList.push(item.user_name)
								}
							} else if (item.bm_type == 4) {
								this.PlanList.push(item.user_name)
							}
						})

						let list = [];
						for (let i = 0; i <= 20; i++) {
							let obj = {};
							obj.text = i * 5;
							obj.value = i;
							list.push(obj)
						}

						this.projectScore.score.list = list;

						this.PlanList.unshift('无')
						this.personList = res.data.data
					}
				}).catch(() => {

				})
			},
			getDays() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var d = new Date(year, month, 0);
				return d.getDate();
			},
			uncompileStr(code) {
				code = unescape(code);
				var c = String.fromCharCode(code.charCodeAt(0) - code.length);
				for (var i = 1; i < code.length; i++) {
					c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
				}
				return c;
			},
			CompareDate(startTime, endTime) {
				return ((new Date(startTime.replace(/-/g, "\/"))) <= (new Date(endTime.replace(/-/g, "\/"))));
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
			}
		},
		created() {
			let _this = this;
			let role = localStorage.getItem('role');
			// this.loading = true;
			const loading = this.openLoading();

			this.findPerson();
			// this.loading = false;
			loading.close();
			let id = localStorage.getItem('id')
			let uid = this.uncompileStr(id).split('&&')[1]
			this.uid = uid
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
	.operate {
		display: flex;
		justify-content: space-between;
		position: relative;
		z-index: 1000;
	}

	.type {
		display: flex;
		padding: 10px 10px;
		letter-spacing: 1px;
		font-size: 14px;
		justify-content: space-between;

		>div:nth-child(1) {
			width: 30%;

			>span:nth-child(1) {
				margin-right: 10px;
				letter-spacing: 2px;
			}
		}

		>div:nth-child(1) .type>div:nth-child(2) {
			width: 65%;
		}
	}


	.rate {
		margin: 15px 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		text-align: center;

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
		position: fixed;
		bottom: 0px;
		width: 100%;
		padding: 10px 25px 25px;
		background-color: #f5f5f5;
		box-sizing: border-box;
		z-index: 1000;
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
		padding: 0 25px;
		justify-content: center;
	}

	.van-submit {
		display: block;
		width: 100%;
		height: 35px;
		line-height: 34px;
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
		padding-left: 20px;
	}

	.info {
		width: 65%;
		text-align: left;
		word-break: break-all;
		word-wrap: break-word;
	}

	.info span {
		color: #b1b1b1;
	}

	.time-picker {
		animation: popup 0.3s ease;
	}

	@keyframes popup {
		0% {
			transform: translateY(200px);
		}

		10% {
			transform: translateY(180px);
		}

		20% {
			transform: translateY(160px);
		}

		30% {
			transform: translateY(140px);
		}

		40% {
			transform: translateY(120px);
		}

		50% {
			transform: translateY(100px);
		}

		60% {
			transform: translateY(80px);
		}

		70% {
			transform: translateY(60px);
		}

		80% {
			transform: translateY(40px);
		}

		90% {
			transform: translateY(20px);
		}

		100% {
			transform: translateY(0px);
		}
	}

	.wc-page-content {
		padding-bottom: 85px;
	}

	.card-type-name {
		margin: 0 5px;
	}

	#finishForm .el-form-item__label {
		text-align: center;
	}

	.card-bottom-content {
		display: flex;
		flex-direction: column;
	}

	.card-bottom {
		flex-direction: row;
		justify-content: space-between;
	}

	.small-rate .rate-container .rate {
		margin: 0 auto;
	}

	.small-rate .rate-container .rate>div {
		margin: 0 5px;
	}

	.s-rate {
		display: flex;
		flex-direction: row;
	}

	.type-time {
		font-size: 12px;
		text-align: left;
		transform: scale(0.9);
		transform-origin: left;
		color: #c3c3c3;
	}

	.schedule {
		padding: 0px 10px 10px;
		text-align: right;
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
		padding: 10px 10px;
		// background: #409EFF;
		// border-radius: 5px;
		// color: #fff;
		cursor: pointer;
		font-size: 12px;
	}

	.price_num {
		font-size: 12px;
	}

	.score {
		max-width: 50%;
	}

	.el-form-item__label {
		white-space: nowrap;
	}

	.finish_modal .el-dialog__body {
		padding: 0 5px 0;
	}

	.btn-item {
		text-align: center;
		width: 100%;
		justify-content: center;
	}

	// .data_center {
	// 	margin: 10px 0;
	// 	display: flex;
	// 	justify-content: space-between;
	// 	align-items: center;
	// }

	// table tr td {
	// 	padding: 6px;
	// 	border: 1px solid #eee;
	// 	position: relative;
	// }

	// .data_select {
	// 	position: absolute;
	// 	left: 50%;
	// 	bottom: 0px;
	// 	transform: translateX(-50%);
	// 	color: #fff;
	// }

	// .data_active {
	// 	background: rgba(64, 158, 225, 0.5);
	// }
	// .type {
	// 	flex-direction: column;
	// }
	// .container_top {
	// 	display: flex;
	// 	justify-content: space-between;
	// 	width: 100% !important;
	// }
</style>
