<script src="../common/Blob.js"></script>
<script src="../common/jquery.table2excel.js"></script>
<template>
	<div id="scheduling">
		<div class="wc-page-top">
			<div class="top-name">
				<div class="top-close iconfont icon-zuojiantou" @click="backLast"><span>返回</span></div>
				<div class="top-title">项目评分表</div>
			</div>
		</div>
		<div class="table" border="1">
			<div class="block">
				<label for="time">选择时间</label>
				<el-date-picker v-model="tableData.toTime" type="daterange" align="right" unlink-panels range-separator="至" format="yyyy-MM-dd"
				 start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" id="time">
				</el-date-picker>
				<el-button class='btn_table' type='primary' @click="createTable" plain>生成表格</el-button>
				<el-button class='btn_table' type='primary'  v-if="port" id="excell" @click="method5('dataTable')" plain>导出Excle表格</el-button>
<!-- 				<div class="drawTable" @click="createTable">生成表格</div>
				<div class='drawTable btn btn-outer' v-if="port" id="excell" @click="method5('dataTable')">导出Excle表格</div> -->
			</div>
			<table class="table2excel" id="dataTable">
				<thead>
					<tr style="background:#ffff00">
						<td style="min-width:300px; center;height:50px;line-height: 50px;">序号</td>
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">项目名称</td>
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">上线时间</td>
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">项目评级</td>
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">商务</td>
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">产品</td>
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">策划</td>			
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">前端开发</td>
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">工作占比</td>
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">客户满意度评价</td>
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">后端开发</td>
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">工作占比</td>
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">客户满意度评价</td>
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">设计开发</td>
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">工作占比</td>
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">客户满意度评价</td>
						<td style="min-width:300px;text-align: center;height:50px;line-height: 50px;">商务总评</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(newItem,newIndex) in newList" :key="newIndex">
						<td style="min-width:300px; text-align: center;" v-html="newIndex+1"></td>
						<td style="text-align: center;" v-html="newItem.pro_name"></td>
						<td style="text-align: center;" v-html="newItem.creat_time"></td>
						<td :style="[{'text-align': 'center','color': '#fff','background':colorSelect(newItem.price)}]" v-html="nameSelect(newItem.price)"></td>
						<td style="text-align: center;" v-html="newItem.sale_name"></td>
						<td style="text-align: center;" v-html="newItem.zx_cp"></td>
						<td style="text-align: center;" v-html="newItem.plan_name"></td>
						
						<td>
							<div style="text-align: center;height:50px;line-height: 50px;" v-for="(qdItem,qdIndex) in newItem.qdList" :key="qdIndex"
							 v-html="qdItem.zx_name"></div>
							<div style="color:#fff;text-align: center;height:50px;line-height: 50px;" class='tab_null' v-for="(obj,objIndex) in newItem.num - parseInt(newItem.qdList.length)"
							 :key="obj.id"></div>
						</td>
						<td>
							<div style="text-align: center;height:50px;line-height: 50px;" v-for="(qdItem,qdIndex) in newItem.qdList" :key="qdIndex"
							 v-html="qdItem.Job_share"></div>
							<div style="color:#fff;text-align: center;height:50px;line-height: 50px;" class='tab_null' v-for="(obj,objIndex) in newItem.num - parseInt(newItem.qdList.length)"
							 :key="obj.id"></div>
						</td>
						<td>
							<div style="text-align: center;height:50px;line-height: 50px;" v-for="(qdItem,qdIndex) in newItem.qdList" :key="qdIndex"
							 v-html="qdItem.customer"></div>
							<div style="color:#fff;text-align: center;height:50px;line-height: 50px;" class='tab_null' v-for="(obj,objIndex) in newItem.num - parseInt(newItem.qdList.length)"
							 :key="obj.id"></div>
						</td>
						<td>
							<div style="text-align: center;height:50px;line-height: 50px;" v-for="(hdItem,hdIndex) in newItem.hdList" :key="hdIndex"
							 v-html="hdItem.zx_name"></div>
							<div style="text-align: center;color:#fff;height:50px;line-height: 50px;" class='tab_null' v-for="(obj,objIndex) in newItem.num - parseInt(newItem.hdList.length)"
							 :key="obj.id"></div>
						</td>
						<td>
							<div style="text-align: center;height:50px;line-height: 50px;" v-for="(hdItem,hdIndex) in newItem.hdList" :key="hdIndex"
							 v-html="hdItem.Job_share"></div>
							<div style="text-align: center;color:#fff;height:50px;line-height: 50px;" class='tab_null' v-for="(obj,objIndex) in newItem.num - parseInt(newItem.hdList.length)"
							 :key="obj.id"></div>
						</td>
						<td>
							<div style="text-align: center;height:50px;line-height: 50px;" v-for="(hdItem,hdIndex) in newItem.hdList" :key="hdIndex"
							 v-html="hdItem.customer"></div>
							<div style="text-align: center;color:#fff;height:50px;line-height: 50px;" class='tab_null' v-for="(obj,objIndex) in newItem.num - parseInt(newItem.hdList.length)"
							 :key="obj.id"></div>
						
						</td>	
						<td>
							<div style="text-align: center;height:50px;line-height: 50px;" v-for="(sjItem,sjIndex) in newItem.sjList" :key="sjIndex"
							 v-html="sjItem.zx_name"></div>
							<div style="text-align: center;color:#fff;height:50px;line-height: 50px;" class='tab_null' v-for="(obj,objIndex) in newItem.num - parseInt(newItem.sjList.length)"
							 :key="obj.id"></div>
						</td>
						<td>
							<div style="text-align: center;height:50px;line-height: 50px;" v-for="(sjItem,sjIndex) in newItem.sjList" :key="sjIndex"
							 v-html="sjItem.Job_share"></div>
							<div style="text-align: center;color:#fff;height:50px;line-height: 50px;" class='tab_null' v-for="(obj,objIndex) in newItem.num - parseInt(newItem.sjList.length)"
							 :key="obj.id"></div>
						</td>
						<td>
							<div style="text-align: center;height:50px;line-height: 50px;border-bottom:1px solid #000;" v-for="(sjItem,sjIndex) in newItem.sjList" :key="sjIndex"
							 v-html="sjItem.customer"></div>
							<div style="text-align: center;color:#fff;height:50px;line-height: 50px;border-bottom:1px solid #000;" class='tab_null' v-for="(obj,objIndex) in newItem.num - parseInt(newItem.sjList.length)"
							 :key="obj.id"></div>
						</td>
						<td style="text-align: center;" v-html="newItem.pro[0].m_center"></td>						
					</tr>
				</tbody>

				<Footer></Footer>
			</table>
		</div>

			

		<van-loading v-show="loading" class="loading" />

	</div>
</template>

<script>
	// import '@/common/Blob.js'
	// import '@/common/Export2Excel.js'
	import '@/common/jquery.table2excel.js'
	export default {
		name: "scheduling",
		data() {
			return {
				tableData: {
					fromTime: '2019-07-20',
					toTime: '',
					timeList: [],
					kind: '',
					nameList: ['设计制作阶段', '首页确定', '设计确认', '后期动效制作', '后端开发', '前端开发', '测试', '提审'],
					colorList: [{
							name: '设计制作阶段',
							bg: '#F4B084'
						},
						{
							name: '首页确定',
							bg: '#f8c8ad'
						},
						{
							name: '设计确认',
							bg: '#c6e0b4'
						}, {
							name: '后期动效制作',
							bg: '#c9c9c9'
						},
						{
							name: '后端开发',
							bg: '#9bc2e6'
						},
						{
							name: '前端开发',
							bg: '#ffd966'
						},
						{
							name: '测试',
							bg: '#ed7d31'
						},
						{
							name: '提审',
							bg: '#c65911'
						}
					],
					module: '',
					moduleList: [{
						id: 0,
						sign: '设计制作',
						list: [{
								id: 0,
								sign: '首页确定'
							},
							{
								id: 1,
								sign: '设计制作阶段'
							}, {
								id: 2,
								sign: '设计确认'
							}
						]
					}, {
						id: 1,
						sign: '后期动效制作',
						list: [{
							id: 1,
							sign: '后期动效制作'
						}]
					}, {
						id: 1,
						sign: '后端开发',
						list: [{
							id: 1,
							sign: '后端开发'
						}]
					}, {
						id: 1,
						sign: '前端开发',
						list: [{
							id: 1,
							sign: '前端开发'
						}]
					}, {
						id: 1,
						sign: '测试',
						list: [{
							id: 1,
							sign: '测试'
						}]
					}, {
						id: 1,
						sign: '提审',
						list: [{
							id: 1,
							sign: '提审'
						}]
					}],
					kindsList: [],
					typeList: [{
							id: 0,
							sign: '设计制作',
							fromTime: '2019-07-20',
							toTime: '2019-07-31',
							payTime: 8,
							lastTime: 0,
							afterTime: 22,
							index: 1,
							details: [{
								id: 0,
								name: '首页确定',
								fromTime: '2019-07-20',
								toTime: '2019-07-24',
								payTime: 2
							}, {
								id: 1,
								name: '设计制作阶段',
								fromTime: '2019-07-25',
								toTime: '2019-07-27',
								payTime: 2
							}, {
								id: 2,
								name: '设计确认',
								fromTime: '2019-07-28',
								toTime: '2019-07-31',
								payTime: 4
							}]
						},
						{
							id: 1,
							sign: '后期动效制作',
							fromTime: '2019-08-01',
							toTime: '2019-08-07',
							lastTime: 8,
							afterTime: 17,
							payTime: 5,
							index: 1,
							details: [{
								id: 3,
								name: '后期动效制作',
								fromTime: '2019-08-01',
								toTime: '2019-08-07',
								payTime: 5
							}]
						},
						{
							id: 2,
							sign: '后端开发',
							fromTime: '2019-08-08',
							toTime: '2019-08-23',
							payTime: 12,
							lastTime: 13,
							afterTime: 5,
							index: 1,
							details: [{
								id: 4,
								name: '后端开发',
								fromTime: '2019-08-08',
								toTime: '2019-08-23',
								payTime: 12
							}]
						}, {
							id: 3,
							sign: '前端开发',
							fromTime: '2019-08-08',
							toTime: '2019-08-23',
							payTime: 12,
							lastTime: 13,
							afterTime: 5,
							index: 1,
							details: [{
								id: 5,
								name: '前端开发',
								fromTime: '2019-08-08',
								toTime: '2019-08-23',
								payTime: 12
							}]
						}, {
							id: 4,
							sign: '测试',
							fromTime: '2019-08-24',
							toTime: '2019-08-29',
							payTime: 3,
							lastTime: 25,
							afterTime: 1,
							index: 1,
							details: [{
								id: 6,
								name: '测试',
								payTime: 4,
								fromTime: '2019-08-24',
								toTime: '2019-08-29',
							}]
						}, {
							id: 5,
							sign: '提审',
							fromTime: '2019-08-30',
							toTime: '2019-08-30',
							payTime: 1,
							lastTime: 29,
							afterTime: 0,
							index: 1,
							details: [{
								id: 7,
								name: '提审',
								payTime: 1,
								fromTime: '2019-08-30',
								toTime: '2019-08-30',
							}]
						}
					]
				},
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
				end_time: '',
				count: 0,
				dialogFormVisible: false,
				typename: '',
				index: 0,
				touch: false,
				mainIndex: 0,
				detailsIndex: 0,
				payTime: 0,
				beforeIndex: 0,
				mainTime: '',
				dialogForm: false,
				typeIndex: 0,
				loading: false,
				xms_id: 0,
				typeList: ['行政', '商务', '执行'],
				role: 0,
				personList: [],
				type: '',
				useAdd: false,
				port: false,
				typeList: ['行政', '商务', '执行'],
				search: '',
				colorList: ['blue', 'green', 'orange', 'red'],
				show: false,
				postList: ['前端工程师', '后端设计师', 'UI设计师', '销售专员', '产品经理'],
				showPost: false,
				personInfo: {
					name: '',
					post: '',
					phone: ''
				},
				showIndex: null,
				groupIndex: 0,
				personIndex: 0,
				loading: false,
				projectList: [],
				projectDetails: {},
				pid: 0,
				nowIndex: 0,
				projectDetailList: [],
				content: '',
				sjProject: {
					score: '',
					nameList: []
				},
				cpProject: {
					score: '',
					nameList: []
				},
				qdProject: {
					score: '',
					nameList: []
				},
				hdProject: {
					score: '',
					nameList: []
				},
				csProject: {
					score: '',
					nameList: []
				},
				deviceList: [], //用于存放加载的数据
				totalPage: 0,
				pageNumber: 0,
				loadingcontent: false, //控制上拉加载的加载动画
				finished: false, //控制在页面往下移动到底部时是否调用接口获取数据
				isLoading: false, //控制下拉刷新的加载动画
				page: 0,
				canInit: true,
				xm_id: 0,
				newList: [],
				idTmr: ''
			};
		},
		mounted() {
			this.xm_id = localStorage.getItem("xm_id")
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
			nameSelect(money){
				return (money) => {
					let color = ''
					if (money == '0-3W' || money == '0-5W') {
						color = '绿色'
					} else if (money == '3-8W' || money == '5-10W') {
						color = '蓝色'
					} else if (money == '8-15W' || money == '10-15W') {
						color = '橙色'
					} else if (money == '15W以上') {
						color = '红色'
					}
					return color
				}
			}
		},
		methods: {
			Cleanup() {
				window.clearInterval(idTmr);
				CollectGarbage();
			},
			method5(tableid) {
				if (!this.newList.length) {
					this.$toast({
						message: "请选择日期生成表格!",
						duration: 1000
					})
					return;
				}
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
			findResult() {
				var params = new URLSearchParams();
				let _this = this;
				let start = this.DayChange(new Date(this.tableData.toTime[0]));
				let end = this.DayChange(new Date(this.tableData.toTime[1]));
				params.append("first", start);
				params.append("last", end);
				this.$axios({
					url: '/getscreenxz',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					if (res.data) {
						this.projectDetailList = res.data.data
						res.data.data.forEach((item)=>{
							item.zx_cp = '';
							item.creat_time = item.creat_time.split(' ')[0] ? item.creat_time.split(' ')[0] : item.creat_time;
						})
						console.log(res.data.data)
						res.data.data.forEach((pItem, pIndex) => {
							let sjList = [],
								qdList = [],
								hdList = []
							pItem.pro.forEach((item) => {
									
								let data = {
									zx_name: item.zx_name,
									score: item.sorce,
									m_center: item.m_center,
									sale_name: pItem.sale_name,
									pro_name: pItem.pro_name,
									customer : item.customer,
									Job_share : item.Job_share
								}
								if (item.zx_post == '设计') {
									sjList.push(data)
									this.sjProject.score = item.sorce
								} else if (item.zx_post == '前端') {
									qdList.push(data)
									this.qdProject.score = item.sorce
								} else if (item.zx_post == '后端') {
									hdList.push(data)
									this.hdProject.score = item.sorce
								} else if (item.zx_post == '产品') {
									pItem.zx_cp = item.zx_name
								}
							})
							pItem.sjList = sjList
							pItem.qdList = qdList
							pItem.hdList = hdList
							let arrLen = new Array(parseInt(sjList.length), parseInt(qdList.length), parseInt(hdList.length))
							let arrNew = _this.bubbleSort(arrLen);

							pItem.num = arrNew[2]

						})
							
						this.newList = res.data.data
							
						this.content = res.data.data[0].m_center
					}
				}).catch(() => {})
			},
			findDetails(id) {
				var params = new URLSearchParams();
				params.append("eva_id", id);
				this.$axios({
					url: '/geproxzdes',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					if (res.data) {
						let sjList = [],
							qdList = [],
							cpList = [],
							hdList = [],
							csList = []
						this.projectDetailList = res.data.data
						res.data.data.forEach((item) => {
							let data = {
								zx_name: item.zx_name,
								score: item.sorce,
								m_center: item.m_center
							}
							if (item.zx_post == '设计') {
								sjList.push(data)
								this.sjProject.score = item.sorce
							} else if (item.zx_post == '前端') {
								qdList.push(data)
								this.qdProject.score = item.sorce
							} else if (item.zx_post == '产品') {
								cpList.push(data)
								this.cpProject.score = item.sorce
							} else if (item.zx_post == '后端') {
								hdList.push(data)
								this.hdProject.score = item.sorce
							} else if (item.zx_post == '测试') {
								csList.push(data)
								this.csProject.score = item.sorce
							}
						})
						this.hdProject.nameList = hdList
						this.qdProject.nameList = qdList
						this.cpProject.nameList = cpList
						this.sjProject.nameList = sjList
						this.csProject.nameList = csList
						let arrList = new Array();
						arrList.push(hdList)
						arrList.push(qdList)
						arrList.push(sjList)

						let newList = new Array();
						for (let i = 0; i < arrList[2].length; i++) {
							let obj = new Object();
							obj.qdname = ''
							obj.qdscore = ''
							obj.qddescribe = ''
							obj.hdname = ''
							obj.hdscore = ''
							obj.hddescribe = ''
							obj.sjname = ''
							obj.sjscore = ''
							obj.sjdescribe = ''

							hdList.forEach((item, index) => {
								if (index == i) {
									obj.hdname = item.zx_name;
									obj.hdscore = item.sorce;
									obj.hddescribe = item.m_center
								}
							})
							qdList.forEach((item, index) => {
								if (index == i) {
									obj.qdname = item.zx_name;
									obj.qdscore = item.sorce;
									obj.qddescribe = item.m_center
								}
							})
							sjList.forEach((item, index) => {

								if (index == i) {
									obj.sjname = item.zx_name;
									obj.sjscore = item.sorce;
									obj.sjdescribe = item.m_center
								}
							})
							newList.push(obj)
						}
						this.newList = newList

						this.content = res.data.data[0].m_center
					}
				}).catch(() => {})
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
			findList() {
				this.$axios({
					url: '/geproxzlist',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.data) {
						this.finished = true;
						this.canInit = false;
						res.data.data.forEach((item) => {
							item.checked = false;
							item.creat_time = this.ChangeDate(item.creat_time)
						})
						this.projectList = res.data.data
					}
				}).catch(() => {

				})
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
			uncompileStr(code) {
				code = unescape(code);
				var c = String.fromCharCode(code.charCodeAt(0) - code.length);
				for (var i = 1; i < code.length; i++) {
					c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
				}
				return c;
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
			timeChange(val) {
				let _this = this;
			},
			scrollChange() {
				let Index = document.getElementById('index')
				Index.scrollIntoView()
			},
			getDate(datestr) {
				var temp = datestr.split("-");
				var date = new Date(temp[0], temp[1], temp[2]);
				return date;
			},
			createTable() {
				if(!this.tableData.toTime[0] ||  !this.tableData.toTime[1]){
					this.$toast({
						message: "请选择日期生成表格!",
						duration: 1000
					})
					return;
				}
				const loading = this.openLoading();
				this.findResult();
				loading.close();
			},
			table2Excel(filename) {
				$(".table2excel").table2excel({
					exclude: ".noExl", //class="noExl"的列不导出
					name: "Excel Document Name",
					filename: filename, //文件名称
					fileext: ".xls", //文件后缀名
					exclude_img: true, //导出图片
					exclude_links: true, //导出超链接
					exclude_inputs: true //导出输入框内容
				});
			},
			formatTen(num) {
				return num > 9 ? (num + "") : ("0" + num);
			},
			verify() {
				var system = {
					win: false,
					mac: false,
					xll: false,
					ipad: false
				};
				//检测平台
				var p = navigator.platform;
				system.win = p.indexOf("Win") == 0;
				system.mac = p.indexOf("Mac") == 0;
				system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
				system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
				//跳转语句，如果是PC访问就自动跳转到所要访问的页面http://www.电脑.com
				if (system.win || system.mac || system.xll || system.ipad) {
					//默认访问http://www.电脑.com
					this.port = true
				} else {
					this.port = false
				}
			},
		},
		created() {
			let role = localStorage.getItem('role')
			this.role = role
			this.xms_id = localStorage.getItem('xms_id')
			let id = localStorage.getItem('id', )
			let uid = this.uncompileStr(id).split('&&')[1]
			this.id = uid
			this.verify()
		}
	}
</script>

<style scoped="scoped">
	.table #dataTable tr td {
		border-right: 1px solid #000000 !important;
	}

	.tab_null {
		color: transparent;
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
	}

	.btn-outer {
		padding: 0.1rem 0.5rem;
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
		padding-bottom : 1rem;
	}

	.table2excel {
		margin-top: 20px;
	}

	#scheduling .el-range-separator {
		width: 10% !important;
	}

	#scheduling .block {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#scheduling label {
		margin-right: 0.2rem;
	}

	.drawTable {
		margin-left: 0.25rem;
		padding: 10px 30px;
		background: #2db7f5;
		color: #fff;
		border-radius: 25px;
		cursor: pointer;
	}

	td>div {
		border-bottom: 0.026667rem solid #000 !important;
	}

	td>div:last-child {
		border-bottom: none !important;
	}

	.table table tr td {
		padding: 0;
		position: relative;
	}

	.table thead tr:nth-child(1) td,
	.table tfoot tr:nth-child(1) td {
		padding: 5px 10px !important;
	}

	.table table tr td>div {
		position: relative;
	}

	.table table tr td>.tab_null {
		color: #fff;
	}


	thead tr:nth-child(1) td {
		padding: 5px 10px !important;
	}

	table tr td {
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

	/*.table2excel {*/
	/*    max-width: 90%;*/
	/*}*/
	/*thead tr:nth-child(1) {*/
	/*    border-top:2px solid #000;*/
	/*}*/
	thead tr:nth-child(1) td:nth-child(1) {
		border-right: 2px solid #000 !important;
	}

	tbody tr td:nth-child(1) {
		border-right: 2px solid #000 !important;
	}

	tfoot tr:nth-child(1) td:nth-child(1) {
		border-right: 2px solid #000 !important;
	}

	.active {
		background: rgba(0, 0, 0, 0.1);
	}

	table tbody tr td.before {
		background: rgba(0, 0, 0, 0.1);
	}

	.block {
		display: flex;
		justify-content: center;

	}

	.block .el-date-editor {
		max-width: 50%;
	}

	.el-date-editor .el-range-separator {
		width: 10% !important;
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
	
	.btn_table {
		margin-left: 20px;
	}
</style>
