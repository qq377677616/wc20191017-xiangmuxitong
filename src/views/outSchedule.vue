<script src="../common/Blob.js"></script>
<script src="../common/jquery.table2excel.js"></script>
<template>
	<div id="scheduling">
		<div class="wc-page-top">
			<div class="top-name">
				<div class="top-close iconfont icon-Group-" @click="backLast"><span>返回</span></div>
				<div class="top-title">项目评分表</div>
			</div>
		</div>
		<div class="table" border="1">
			<div class="block">
				<label for="time">选择时间</label>
				<el-date-picker v-model="tableData.toTime" type="daterange" align="right" unlink-panels range-separator="至" format="yyyy-MM-dd"
				 start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" id="time">
				</el-date-picker>
				<div class="drawTable" @click="createTable">生成表格</div>
			</div>
			<table class="table2excel" id="dataTable">
				<thead>
					<tr>
						<td style="text-align: center;">序号</td>
						<td style="text-align: center;">项目名称</td>
						<td style="text-align: center;">商务</td>
						<td style="text-align: center;">前端开发</td>
						<td style="text-align: center;">工作占比</td>
						<td style="text-align: center;">备注</td>
						<td style="text-align: center;">后端开发</td>
						<td style="text-align: center;">工作占比</td>
						<td style="text-align: center;">备注</td>
						<td style="text-align: center;">设计开发</td>
						<td style="text-align: center;">工作占比</td>
						<td style="text-align: center;">备注</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(newItem,newIndex) in newList" :key="newIndex">

						<td style="text-align: center;" v-html="newIndex"></td>
						<td style="text-align: center;" v-html="newItem.pro_name"></td>
						<td style="text-align: center;" v-html="newItem.sale_name"></td>



						<td>
							<div style="text-align: center;" v-for="qdItem,qdIndex in newItem.qdList" :key="qdIndex" v-html="qdItem.zx_name"></div>
							<div style="color:#fff;text-align: center;" class='tab_null' v-for="obj in newItem.num - parseInt(newItem.qdList.length)">无</div>
						</td>



						<td>
							<div style="text-align: center;" v-for="qdItem,qdIndex in newItem.qdList" :key="qdIndex" v-html="qdItem.score"></div>
							<div style="color:#fff;text-align: center;" class='tab_null' v-for="obj in newItem.num - parseInt(newItem.qdList.length)">无</div>
						</td>


						<td>
							<div style="text-align: center;" v-for="qdItem,qdIndex in newItem.qdList" :key="qdIndex" v-html="qdItem.m_center"></div>
							<div style="text-align: center;color:#fff" class='tab_null' v-for="obj in newItem.num - parseInt(newItem.qdList.length)">无</div>
						</td>


						<td>
							<div style="text-align: center;" v-for="hdItem,hdIndex in newItem.hdList" :key="hdIndex" v-html="hdItem.zx_name"></div>
							<div style="text-align: center;color:#fff" class='tab_null' v-for="obj in newItem.num - parseInt(newItem.hdList.length)">无</div>
						</td>

						<td>
							<div style="text-align: center" v-for="hdItem,hdIndex in newItem.hdList" :key="hdIndex" v-html="hdItem.score"></div>
							<div style="text-align: center;color:#fff" class='tab_null' v-for="obj in newItem.num - parseInt(newItem.hdList.length)">无</div>
						</td>


						<td>
							<div style="text-align: center;" v-for="hdItem,hdIndex in newItem.hdList" :key="hdIndex" v-html="hdItem.m_center"></div>
							<div style="text-align: center;color:#fff" class='tab_null' v-for="obj in newItem.num - parseInt(newItem.hdList.length)">无</div>
						</td>




						<td>
							<div style="text-align: center;" v-for="sjItem,sjIndex in newItem.sjList" :key="sjIndex" v-html="sjItem.zx_name"></div>
							<div style="color:#fff" class='tab_null' v-for="obj in newItem.num - parseInt(newItem.sjList.length)">无</div>
						</td>


						<td>
							<div style="text-align: center;" v-for="sjItem,sjIndex in newItem.sjList" :key="sjIndex" v-html="sjItem.score"></div>
							<div style="color:#fff" class='tab_null' v-for="obj in newItem.num - parseInt(newItem.sjList.length)">无</div>
						</td>


						<td>
							<div style="text-align: center;" v-for="sjItem,sjIndex in newItem.sjList" :key="sjIndex" v-html="sjItem.m_center"></div>
							<div style="color:#fff" class='tab_null' v-for="obj in newItem.num - parseInt(newItem.sjList.length)">无</div>
						</td>


					</tr>


				</tbody>
				<tfoot>
					<tr>
						<td style="text-align: center;">序号</td>
						<td style="text-align: center;">项目名称</td>
						<td style="text-align: center;">商务</td>
						<td style="text-align: center;">前端开发</td>
						<td style="text-align: center;">工作占比</td>
						<td style="text-align: center;">备注</td>
						<td style="text-align: center;">后端开发</td>
						<td style="text-align: center;">工作占比</td>
						<td style="text-align: center;">备注</td>
						<td style="text-align: center;">设计开发</td>
						<td style="text-align: center;">工作占比</td>
						<td style="text-align: center;">备注</td>
					</tr>
				</tfoot>
			</table>
			<div class="btn-box">
				<div class='btn btn-outer' v-if="port" id="excell" @click="method5('dataTable')">导出Excle表格</div>
				<div class='btn btn-outer btn-add' v-if="useAdd" @click="addInfo">添加</div>
				<div class='btn btn-outer btn-del ' v-if="useAdd" @click="delTable">删除</div>
			</div>
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
					toTime: '2019-08-20',
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
			// this.findDetails(this.xm_id)

			this.findTabel()
			// this.createTable();
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
					console.log(table)
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
				console.log(this.DayChange(new Date(this.tableData.toTime[0])))
				console.log(this.DayChange(new Date(this.tableData.toTime[1])))
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
								}

							})
							pItem.sjList = sjList
							pItem.qdList = qdList
							pItem.hdList = hdList
							let arrLen = new Array(parseInt(sjList.length), parseInt(qdList.length), parseInt(hdList.length))
							let arrNew = _this.bubbleSort(arrLen);

							pItem.num = arrNew[2]

						})
						console.log(res.data.data)

						this.newList = res.data.data
						console.log(newList)
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
						console.log(res.data.data)
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
						console.log(arrList[2].length)
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
						console.log(newList)
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
			changeKinds(val) {
				let _this = this;
				_this.tableData.moduleList.forEach((item) => {
					if (item.sign == val) {
						_this.tableData.kindsList = item.list
						_this.tableData.kind = item.list[0].sign
					}
				})
			},
			findTabel() {
				let _this = this
				var params = new URLSearchParams();
				params.append('xms_id', this.xms_id)
				_this.$axios({
					url: '/getSchedlist',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					let typeList = _this.tableData.typeList
					typeList.forEach((item) => {
						item.details = []
						item.fromTime = '';
						item.toTime = '';
						item.afterTime = this.tableData.timeList.length;
						item.lastTime = 0;
						item.payTime = 0;
					})
					this.tableData.fromTime = '';
					this.tableData.toTime = '';
					typeList.forEach((typeItem) => {
						typeItem.details = []
					})
					let bgColorList = this.tableData.colorList
					res.data.data.forEach((item) => {
						typeList.forEach((typeItem) => {
							item.name = item.type
							item.fromTime = item.start_time
							item.toTime = item.end_time
							item.payTime = _this.getDayAll(item.fromTime, item.toTime).length
							let bgcolor = 'none'
							bgColorList.forEach((bgItem) => {
								if (bgItem.name == item.type) {
									bgcolor = bgItem.bg
									return false;
								}
							})
							if (item.model == typeItem.sign) {
								item.bgcolor = bgcolor
								typeItem.details.push(item)
							}
						})
					})
					this.tableData.typeList = typeList
					this.tableData.typeList.forEach((item) => {
						if (item.details != '') {
							item.details.forEach((dItem) => {
								if (this.tableData.toTime == '') {
									this.tableData.toTime = dItem.toTime
								}
								if (this.tableData.fromTime == '') {
									this.tableData.fromTime = dItem.fromTime
								}
								let endTime = this.DateMinus(this.tableData.toTime, dItem.toTime)
								let fromTime = this.DateMinus(dItem.fromTime, this.tableData.fromTime)
								if (endTime > 0) {
									this.tableData.toTime = dItem.toTime
								}
								if (fromTime > 0) {
									this.tableData.fromTime = dItem.fromTime
								}
							})
						}
					})
					this.tableData.timeList = this.getDayAll(this.tableData.fromTime, this.tableData.toTime)
					this.tableData.typeList.forEach((item, index) => {
						if (item.details == '') {
							if (item.toTime == '') {
								item.afterTime = this.getDayAll(this.tableData.fromTime, this.tableData.toTime).length
							}
						} else {
							item.fromTime = item.details[0].fromTime
							item.toTime = item.details[item.details.length - 1].toTime
							item.payTime = this.getDayAll(item.fromTime, item.toTime).length
							if (item.toTime == '') {
								if (item.toTime == this.tableData.toTime) {
									item.afterTime = 0
								} else {
									if (item.toTime == this.tableData.toTime) {
										item.afterTime = this.getDayAll(item.toTime, this.tableData.toTime).length
									} else {
										item.afterTime = this.getDayAll(item.toTime, this.tableData.toTime).length - 1
									}
								}
							} else {
								if (item.toTime == this.tableData.toTime) {
									item.afterTime = 0
								} else {
									if (item.toTime == this.tableData.toTime) {
										item.afterTime = this.getDayAll(item.toTime, this.tableData.toTime).length
									} else {
										item.afterTime = this.getDayAll(item.toTime, this.tableData.toTime).length - 1
									}
								}

							}
						}
					})
					let payTime = 0;
					this.tableData.typeList.forEach((item) => {
						if (item.details != '') {
							item.lastTime = this.getDayAll(this.tableData.fromTime, item.fromTime).length - 1
						} else {
							item.lastTime = 0
						}
					})
				}).catch(() => {

				})
			},
			addInfo() {
				this.dialogForm = true;
				this.tableData.module = ''
				this.tableData.kind = ''
			},
			Record(mainIndex, e, timeIndex) {
				this.touch = true;
				this.mainIndex = mainIndex
				this.beforeIndex = timeIndex
			},
			changeRecord(mainIndex, timeIndex) {
				this.mainIndex = mainIndex
				if (this.touch) {
					let payTime = timeIndex + 1
					this.payTime = payTime
				}
			},
			showDialog(mainIndex, e, timeIndex) {
				this.touch = false
				this.mainIndex = mainIndex
				this.detailsIndex = timeIndex
				this.payTime = timeIndex - this.beforeIndex + 1
				var el = e.currentTarget;
				let typeList = this.tableData.typeList
				typeList.forEach((item, index) => {
					item.details.forEach((dItem) => {
						if (item.index == 0) {
							dItem.active = false;
						} else {
							dItem.active = true;
						}
					})
				})
				this.dialogFormVisible = true;
				this.tableData.typeList = typeList;
			},
			scrollChange() {
				let Index = document.getElementById('index')
				Index.scrollIntoView()
			},
			sureAdd() {
				let mainIndex = this.mainIndex
				let kind = this.tableData.kind
				let payTime = this.payTime
				let _this = this,
					model = _this.tableData.module,
					type = _this.tableData.kind
				let resultEnd = false
				_this.tableData.typeList.forEach((item) => {
					if (item.details != '') {
						let result = item.details.some((dItem) => {
							return dItem.name == kind
						})
						if (result) {
							resultEnd = true
						}
					}
				})
				if (resultEnd) {
					_this.$toast({
						message: "类型已存在!",
						duration: 1000
					})
					return;
				}
				if (model == '') {
					_this.$toast({
						message: "请选择模块!",
						duration: 1000
					})
					return;
				}
				if (type == '') {
					_this.$toast({
						message: "请选择类别!",
						duration: 1000
					})
					return;
				}
				if (_this.mainTime == '') {
					_this.$toast({
						message: "请选择时间!",
						duration: 1000
					})
					return;
				}
				if (_this.DayChange(_this.mainTime[0]) == '' || _this.DayChange(_this.mainTime[1]) == '') {
					_this.$toast({
						message: "请选择时间!",
						duration: 1000
					})
					return;
				}
				// else {
				//     if(_this.mainTime[0].getDay() == 0 || _this.mainTime[0].getDay() == 6 || _this.mainTime[1].getDay() == 0 || _this.mainTime[1].getDay() == 6){
				//         _this.$toast({
				//             message : "起始时间不能为周末!",
				//             duration : 1000
				//         })
				//         return ;
				//     }
				// }
				var params = new URLSearchParams();
				params.append('xms_id', this.xms_id);
				params.append('start_time', _this.DayChange(_this.mainTime[0]));
				params.append('end_time', _this.DayChange(_this.mainTime[1]));
				params.append('model', model);
				params.append('type', type);
				// let obj = new Object();
				// obj.xms_id = 91;
				// obj.start_time = start_time;
				// obj.end_time = end_time;
				// obj.model = model;
				// obj.type = type;
				_this.$confirm('确认操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then((res) => {
					this.loading = true;
					_this.$axios({
						url: '/getScheduling',
						method: 'post',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data: params
					}).then((res) => {
						if (res.data.errcode == 0) {
							setTimeout(() => {
								this.loading = false;
								setTimeout(() => {
									this.$toast({
										message: "添加成功!",
										duration: 1000
									})
									this.dialogForm = false;
									_this.findTabel();
								}, 500)
							}, 500)
						} else {
							setTimeout(() => {
								this.loading = false;
								setTimeout(() => {
									this.$toast({
										message: "" + res.data.msg + "!",
										duration: 1000
									})
								}, 500)
							}, 500)
						}

					}).catch(() => {

					})
				}).catch(() => {

				});


			},
			getDate(datestr) {
				var temp = datestr.split("-");
				var date = new Date(temp[0], temp[1], temp[2]);
				return date;
			},
			getDayAll(begin, end) {
				var dateAllArr = new Array();
				var ab = begin.split("-");
				var ae = end.split("-");
				var db = new Date();
				db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
				var de = new Date();
				de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
				var unixDb = db.getTime();
				var unixDe = de.getTime();
				let time = []
				for (var k = unixDb; k <= unixDe;) {
					// if((new Date(parseInt(k))).getDay() < 6 && (new Date(parseInt(k))).getDay() != 0){

					//     date.time = ((new Date(parseInt(k))).getMonth()+1) +"-"+ (new Date(parseInt(k))).getDate()
					//     var xq = '日一二三四五六'.charAt((new Date(parseInt(k))).getDay());
					//     date.xq = xq
					//     // date.
					//     time.push(date)
					// }
					let date = {

					}
					date.time = ((new Date(parseInt(k))).getMonth() + 1) + "-" + (new Date(parseInt(k))).getDate()
					var xq = '日一二三四五六'.charAt((new Date(parseInt(k))).getDay());
					date.xq = xq
					// date.
					time.push(date)

					k = k + 24 * 60 * 60 * 1000;
				}
				return time;
			},
			createTable() {
				this.findResult();
				// this.tableData.timeList = this.getDayAll(this.DayChange(new Date(this.tableData.toTime[0])), this.DayChange(new Date(
				// 	this.tableData.toTime[1])))
				// this.tableData.typeList.forEach((item) => {
				// 	item.details = []
				// 	item.fromTime = '';
				// 	item.toTime = '';
				// 	item.afterTime = this.tableData.timeList.length;
				// 	item.lastTime = 0;
				// 	item.payTime = 0;
				// })
			},
			delTable() {
				this.$confirm('此操作将永久删除该排期表, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.loading = true
					let params = new URLSearchParams();
					params.append('xms_id', this.xms_id);
					this.$axios({
						url: '/getSchedDel',
						method: 'post',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						data: params
					}).then((res) => {
						if (res.data.errcode == 0) {
							setTimeout(() => {
								this.loading = false;
								setTimeout(() => {
									this.$toast({
										message: '删除成功!',
										duration: 1000
									});
									this.findTabel()
									this.tableData.timeList = []
								}, 500)
							}, 500)
						} else {
							setTimeout(() => {
								this.loading = false;
								setTimeout(() => {
									this.$toast({
										message: '请求失败!',
										duration: 1000
									});
								}, 500)
							}, 500)
						}
					}).catch(() => {
						this.loading = false;
						setTimeout(() => {
							this.$toast({
								message: '请求失败!',
								duration: 1000
							});
						}, 500)
					})
				}).catch(() => {})
			},
			DateMinus(date1, date2) {
				var sdate = new Date(date1);
				var now = new Date(date2);
				var days = now.getTime() - sdate.getTime();
				var day = parseInt(days / (1000 * 60 * 60 * 24));
				return day;
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
			formatDate(date) {
				var date = new Date(date)
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var hour = date.getHours();
				var minute = date.getMinutes();
				var second = date.getSeconds();
				return year + "-" + this.formatTen(month) + "-" + this.formatTen(day) + " " + this.formatTen(hour) + ":" + this.formatTen(
					minute) + ":" + this.formatTen(second);
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
						res.data.data.forEach((item) => {
							if (item.id == this.id) {
								if (item.user_depar == '产品') {
									this.useAdd = true
								}
							}
						})
					}
				}).catch(() => {

				})
			}
		},
		created() {
			// Date.prototype.format=function (){
			//     var s='';
			//     s+=this.getFullYear()+'-';          // 获取年份。
			//     s+=(this.getMonth()+1)+"-";         // 获取月份。
			//     s+= this.getDate();                 // 获取日。
			//     return(s);                          // 返回日期。
			// };
			// let older = '2018-07-20';
			// let newer = '2018-08-30'
			//  初始化，查询表格
			// this.tableData.timeList = this.getDayAll(older,newer)

			let role = localStorage.getItem('role')
			this.role = role
			this.xms_id = localStorage.getItem('xms_id')
			let id = localStorage.getItem('id', )
			let uid = this.uncompileStr(id).split('&&')[1]
			this.id = uid
			this.tableData.typeList.forEach((item, index) => {
				item.fromTime = item.details[0].fromTime
				item.toTime = item.details[item.details.length - 1].toTime
				item.payTime = this.getDayAll(item.fromTime, item.toTime).length
				item.details.forEach((dItem) => {
					dItem.payTime = this.getDayAll(dItem.fromTime, dItem.toTime).length
				})
			})
			this.tableData.typeList.forEach((item) => {
				item.details = []
				item.fromTime = '';
				item.toTime = '';
				item.afterTime = this.tableData.timeList.length;
				item.lastTime = 0;
				item.payTime = 0;
			})
			this.findPerson()
			this.verify()
		}
	}
</script>

<style scoped="scoped">
	.table #dataTable tr td {
		border-right:1px solid #000000 !important;
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
		height: 100%;
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
		justify-content: center;
		flex-direction: column;
		padding: 0 1rem;
		margin: 0 auto;
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
		padding: 0.1rem 0.5rem;
		background: #2db7f5;
		color: #fff;
		border-radius: 0.2rem;
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
		padding: 5px 10px !important;
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
</style>
