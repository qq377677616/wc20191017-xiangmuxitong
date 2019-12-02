<script src="../common/Blob.js"></script>
<script src="../common/jquery.table2excel.js"></script>
<template>
	<div id="scheduling">
		<div class="wc-page-top">
			<div class="top-name">
				<div class="top-close iconfont icon-zuojiantou" @click="backLast"><span>返回</span></div>
				<div class="top-title">项目消化情况</div>
			</div>
		</div>
		<div class="table" border="1">
			<el-form class='form-box'>
				<el-form-item label="部门选择">
					<el-select v-model="nowPart" placeholder="请选择">
						<el-option v-for="item in part" :key="item" :value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="searchResult">查询</el-button>
				</el-form-item>
			</el-form>
			<table class="table2excel" id="dataTable">
				<thead>
					<tr>
						<td style="min-width: 100px;background-color:#666;color:#fff;text-align:center;height:50px;line-height:50px">序号</td>
						<td style="min-width: 100px;background-color:#666;color:#fff;text-align:center;height:50px;line-height:50px">姓名</td>
						<td style="min-width: 100px;background-color:#666;color:#fff;text-align:center;height:50px;line-height:50px">项目个数</td>
						<td style="min-width: 300px;background-color:#666;color:#fff;text-align:center;height:50px;line-height:50px">项目名称</td>
						<td style="min-width: 100px;background-color:#666;color:#fff;text-align:center;height:50px;line-height:50px">项目进度</td>
						<td style="min-width: 300px;background-color:#666;color:#fff;text-align:center;height:50px;line-height:50px">项目地址</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(tableItem,tableIndex) in tableResult" :key="tableIndex">
						<td style="text-align:center;height:50px;line-height:50px;border-botom:1px solid #000;" v-html="tableIndex+1"></td>
						<td style="text-align:center;height:50px;line-height:50px;border-botom:1px solid #000;" v-html="tableItem.name"></td>
						<td style="text-align:center;height:50px;line-height:50px;border-botom:1px solid #000;" v-html="tableItem.resultList.length"></td>
						<td style="text-align:center;" class='has_content'>
							<div style="text-align:center;height:50px;line-height:50px;border-botom:1px solid #000;" v-for="(resultItem,resultIndex) in tableItem.resultList"
							 :key="resultIndex" v-html="resultItem.pro_name"></div>
						</td>
						<td class='has_content'>
							<div style="color:red;text-align:center;height:50px;line-height:50px;border-botom:1px solid #000;"
							 v-for="(resultItem,resultIndex) in tableItem.resultList" :key="resultIndex" v-html="resultItem.count_speed + '%'"></div>
						</td>
						<td class='has_content'>
							<div style="text-align:center;height:50px;line-height:50px;border-botom:1px solid #000;color:#000"
							 v-for="(resultItem,resultIndex) in tableItem.resultList" :key="resultIndex">
								<span v-if="resultItem.xm_url" v-html="resultItem.xm_url"></span>
								<img style="display: inline-block;width: 35px;height:35px;margin-top:7.5px;" :src="resultItem.xmimg" v-if="resultItem.xmimg"/>
							</div>
						</td>
					</tr>

				</tbody>
				<tfoot>
					<tr>
						<td style="background-color:#666;color:#fff;text-align:center;height:50px;line-height:50px;">序号</td>
						<td style="background-color:#666;color:#fff;text-align:center;height:50px;line-height:50px">姓名</td>
						<td style="background-color:#666;color:#fff;text-align:center;height:50px;line-height:50px">项目个数</td>
						<td style="min-width: 300px;background-color:#666;color:#fff;text-align:center;height:50px;line-height:50px">项目名称</td>
						<td style="background-color:#666;color:#fff;text-align:center;height:50px;line-height:50px">项目进度</td>
						<td style="min-width: 300px;background-color:#666;color:#fff;text-align:center;height:50px;line-height:50px">项目地址</td>
					</tr>
				</tfoot>
				<Footer></Footer>
			</table>
			<div class="btn-box">
				<div class='btn btn-outer' @click="method5('dataTable')">导出Excle表格</div>
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
				nowPart: '',
				part: ['设计', '前端', '后端'],
				tableResult: [],
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
				start_time: '',
				end_time: '',
				idTmr: ''
			};
		},
		components: {
			Footer: () => import('components/footer.vue'),
		},
		mounted() {
			this.xm_id = localStorage.getItem("xm_id")
		},
		methods: {
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
			}
		},
		created() {
			let role = localStorage.getItem('role')
			this.role = role
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
		min-height : 100vh;
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
		padding: 0;
		position: relative;
	}

	.table table tr td>div {
		/* padding: 5px 10px !important; */
		position: relative;
		border-bottom: 1px solid #000000;
	}

	.table table tr td>div:last-child {
		border-bottom: none;
	}

	.table table tr td {
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

	.table table tr .has_content {
		padding: 0;
	}

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
</style>
