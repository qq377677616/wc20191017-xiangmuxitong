<script src="../common/Blob.js"></script>
<script src="../common/jquery.table2excel.js"></script>
<template>
	<div id="scheduling">
		<div class="wc-page-top">
			<div class="top-name">
				<div class="top-close iconfont icon-zuojiantou" @click="backLast"><span>返回</span></div>
				<div class="top-title">项目排期表</div>
			</div>
		</div>

		<div class="table" border="1">
			<div class="block class_time">
				<label for="time">选择时间</label>
				<el-date-picker v-model="tableData.toTime" type="daterange" align="right" unlink-panels range-separator="至" format="yyyy-MM-dd"
				 start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" id="time">
				</el-date-picker>
				<el-button class='btn_table' type='primary' @click="addInfo" plain>添加</el-button>
				<el-button class='btn_table' type='danger' @click="delTable" plain>删除</el-button>
				<el-button class='btn_table' type='primary' v-if="port" id="excell" @click="method5('dataTable')" plain>导出Excle表格</el-button>
			</div>
			<table class="table2excel" id="dataTable">
				<thead>
					<tr>
						<td style="text-align: center;min-width: 300px;height:40px;line-height:40px;" rowspan="2">项目排期时间顺序</td>
						<td style="text-align: center;min-width: 300px;" rowspan="2">开始日</td>
						<td style="text-align: center;min-width: 300px;" rowspan="2">结束日</td>
						<td style="text-align: center;min-width: 100px;" rowspan="2">持续天数(工作日)</td>
						<td style="text-align: center;min-width: 100px;height:40px;line-height:40px;" v-for="(timeItem,timeIndex) in tableData.timeList"
						 :key="timeIndex" v-html="timeItem.time"></td>
					</tr>
					<tr>
						<td style="text-align: center;height:40px;line-height:40px;" v-for="(timeItem,timeIndex) in tableData.timeList"
						 :key="timeIndex" v-html="timeItem.xq"></td>
					</tr>
				</thead>
				<tbody>
										<tr v-for="(typeItem,typeIndex) in tableData.typeList" :key="typeIndex">
						<td style="text-align: center;height:40px;line-height:40px;" v-html="typeItem.sign" :rowspan="typeItem.sign ==  '设计制作' ? 2 : 1"
						 v-if="typeItem.sign !=  '后期动效制作'"></td>
						<td style="border-right:1px solid #000  !important;text-align: center;height:40px;line-height:40px;" v-html="typeItem.fromTime"></td>
						<td style="text-align: center;height:40px;line-height:40px;" v-html="typeItem.toTime"></td>
						<td style="color:red !important;text-align: center;height:40px;line-height:40px;" v-html="typeItem.payTime == 0 ? '-' : typeItem.payTime"></td>
						<td style="text-align: center;height:40px;line-height:40px;background:#dcdcdc" v-for="(n,lastIndex) in typeItem.lastTime"
						 :index="lastIndex"></td>
						<td :style="{'backgroundColor': detailItem.bgcolor,'text-align': 'center','height':'40px','line-height':'40px'}" v-for="(detailItem,detailIndex) in typeItem.details"
						 :key="detailIndex" :class="['select',{'active':typeItem.details[detailIndex].active}]" :colspan="detailItem.payTime"
						 v-html="detailItem.name" @click="showUpdate(typeIndex,detailIndex)">
						</td>
						<td style="text-align: center;height:40px;line-height:40px;" v-for="(m,index) in typeItem.afterTime" :class="{'active':typeItem.active}"
						 :index="(typeItem.lastTime + typeItem.payTime + index)"></td>
					</tr>




				</tbody>
				<tfoot>
					<tr>
						<td style="height:40px;line-height:40px;text-align: center;min-width: 300px;" rowspan="2">项目排期时间顺序</td>
						<td style="text-align: center;min-width: 100px;" rowspan="2">开始日</td>
						<td style="text-align: center;min-width: 100px;" rowspan="2">结束日</td>
						<td style="text-align: center;min-width: 100px;" rowspan="2">持续天数(工作日)</td>
						<td style="text-align: center;min-width: 100px;height :40px;line-height:40px;" v-for="(timeItem,timeIndex) in tableData.timeList"
						 :key="timeIndex" v-html="timeItem.time"></td>
					</tr>
					<tr>
						<td style="text-align: center;height :40px;line-height:40px;" v-for="(timeItem,timeIndex) in tableData.timeList"
						 :key="timeIndex" v-html="timeItem.xq"></td>
					</tr>
					<tr>
						<td style="text-align: center;color:red;height :40px;line-height:40px;" :colspan="tableData.timeList.length + 4">注：以上项目排期均以客户反馈不影响该模块开发时间为准</td>
					</tr>
				</tfoot>
			</table>

			<!-- 			<div class="btn-box">
				<div class='btn btn-outer' v-if="port" @click="method5('dataTable')">导出Excle表格</div>
				<div class='btn btn-outer btn-add' v-if="useAdd" @click="addInfo">添加</div>
				<div class='btn btn-outer btn-del ' v-if="useAdd" @click="delTable">删除</div>
			</div> -->
			<Footer></Footer>
		</div>

		<el-dialog :visible.sync="dialogFormVisible" :append-to-body='true'>
			<el-form ref="form" label-width="80px">
				<el-form-item label="类别">
					<el-select v-model="tableData.kind" placeholder="请选择">
						<el-option v-for="(item,index) in tableData.kinds" :key="index" :value="item.sign">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="sureAdd" plain>确定添加</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog :visible.sync="updateVisible" :append-to-body='true'>
			<el-form ref="form" label-width="80px">
				<el-form-item label="模块">
					<el-select v-model="tableData.module" placeholder="请选择" @change="changeKinds" disabled>
						<el-option v-for="(item,index) in tableData.moduleList" :key="index" :value="item.sign">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类别">
					<el-select v-model="tableData.kind" :disabled="tableData.kindsList == ''" placeholder="请选择" disabled>
						<el-option v-for="(item,index) in tableData.kindsList" :key="index" :value="item.sign">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择时间">
					<el-date-picker v-model="updateTime" type="daterange" align="right" unlink-panels range-separator="至" format="yyyy-MM-dd"
					 start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" id="time" @change="timeChange"
					 :editable="false">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="warning" @click.native="addUpdate(tableData.module,tableData.kind)" plain>修改</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

		<el-dialog :visible.sync="dialogForm" :append-to-body='true' class="scheduling_dialog">
			<el-form ref="form" label-width="80px">
				<el-form-item label="模块">
					<el-select v-model="tableData.module" placeholder="请选择" @change="changeKinds">
						<el-option v-for="(item,index) in tableData.moduleList" :key="index" :value="item.sign">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="类别">
					<el-select v-model="tableData.kind" :disabled="tableData.kindsList == ''" placeholder="请选择">
						<el-option v-for="(item,index) in tableData.kindsList" :key="index" :value="item.sign">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="选择时间">
					<el-date-picker v-model="mainTime" type="daterange" align="right" unlink-panels range-separator="至" format="yyyy-MM-dd"
					 start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" id="time" @change="timeChange"
					 :editable="false">
					</el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click.native="sureAdd" plain>确定添加</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
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
				updateVisible: false,
				updateTime: ''
			};
		},
		components: {
			Footer: () => import('components/footer.vue'),
		},
		mounted() {
			const loading = this.openLoading();
			this.findTabel()
			loading.close();
		},
		methods: {
			showUpdate(typeIndex, detailIndex) {
				// if(!this.useAdd){
				// 	return;
				// }
				let projectId = this.xms_id;
				console.log(this.tableData)
				console.log(typeIndex, detailIndex)
				this.updateTime = new Array(this.tableData.typeList[typeIndex].details[detailIndex].start_time, this.tableData.typeList[
					typeIndex].details[detailIndex].toTime)
				console.log(this.tableData.typeList[typeIndex].details[detailIndex])
				this.tableData.module = this.tableData.typeList[typeIndex].sign;
				this.tableData.kind = this.tableData.typeList[typeIndex].details[detailIndex].name;
				this.tableData.id = this.tableData.typeList[typeIndex].details[detailIndex].id;
				this.updateVisible = true;

			},
			addUpdate(modal, type) {
				let _this = this;
				var params = new URLSearchParams();
				params.append('xms_id', this.xms_id);
				params.append('start_time', _this.DayChange(_this.updateTime[0]));
				params.append('end_time', _this.DayChange(_this.updateTime[1]));
				params.append('model', modal);
				params.append('type', type);
				params.append('id', this.tableData.id);
				console.log(_this.DayChange(_this.updateTime[0]), _this.DayChange(_this.updateTime[1]));
				_this.$confirm('确认操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then((res) => {
					// this.loading = true;
					const loading = this.openLoading();
					_this.$axios({
						url: '/getSchedulingup',
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
										message: "修改成功!",
										duration: 1000
									})
									this.updateVisible = false;
									_this.findTabel();
								}, 500)
							}, 500)
						} else {
							setTimeout(() => {
								// this.loading = false;
								loading.close();
								setTimeout(() => {
									this.$toast({
										message: "" + res.data.msg + "!",
										duration: 1000
									})
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
							item.payTime = _this.getDaysBetween(item.fromTime, item.toTime, 0)
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
					console.log(this.getDayAll(this.tableData.fromTime, this.tableData.toTime))
					this.tableData.timeList = this.getDayAll(this.tableData.fromTime, this.tableData.toTime)

					this.tableData.typeList.forEach((item, index) => {
						if (item.details == '') {
							if (item.toTime == '') {
								item.afterTime = this.getDaysBetween(this.tableData.fromTime, this.tableData.toTime, 0);
							}
						} else {
							item.fromTime = item.details[0].fromTime
							item.toTime = item.details[item.details.length - 1].toTime

							item.payTime = this.getDaysBetween(item.fromTime, item.toTime, 0);
							if (item.toTime == '') {
								if (item.toTime == this.tableData.toTime) {
									item.afterTime = 0
								} else {
									if (item.toTime == this.tableData.toTime) {
										item.afterTime = this.getDaysBetween(item.toTime, this.tableData.toTime);
									} else {
										item.afterTime = this.getDaysBetween(item.toTime, this.tableData.toTime);
									}
								}
							} else {
								if (item.toTime == this.tableData.toTime) {
									item.afterTime = 0
								} else {
									if (item.toTime == this.tableData.toTime) {
										item.afterTime = this.getDaysBetween(item.toTime, this.tableData.toTime);
									} else {
										item.afterTime = this.getDaysBetween(item.toTime, this.tableData.toTime);
									}
								}

							}
						}
					})

					let payTime = 0;
					this.tableData.typeList.forEach((item) => {
						if (item.details != '') {
							item.lastTime = this.getDaysBetween(this.tableData.fromTime, item.fromTime)
						} else {
							item.lastTime = 0
						}
					})
					var tableData = this.tableData
					tableData.typeList.forEach((item) => {
						for (let prop in item.details) {
							if (prop == 0) {
								item.details[prop].before = this.getDaysBetween(item.details[prop].fromTime, item.fromTime, 1);
							} else {
								item.details[prop].before = this.getDaysBetween(item.details[prop - 1].toTime, item.details[prop].fromTime,
									1);
								if (prop == item.details.length - 1) {
									item.details[prop].after = this.getDaysBetween(item.details[prop].toTime, item.toTime, 1);
								}
							}
						}
					})
					tableData.typeList.forEach((item) => {
						let beforeList = new Array();
						for (let prop in item.details) {
							var length = item.details[prop].before;

							if (prop == 0) {
								for (let i = 0; i < item.details[prop].before; i++) {
									let obj = new Object();
									beforeList.push(obj);
								}
								beforeList.push(item.details[prop])
							} else {
								for (let i = 0; i < item.details[prop].before; i++) {
									let obj = new Object();
									beforeList.push(obj);
								}
								beforeList.push(item.details[prop])
								if (prop == item.details[prop].length - 1) {
									for (let i = 0; i < item.details[prop].after; i++) {
										let obj = new Object();
										beforeList.push(obj)
									}
								}

							}
						}
						item.details = beforeList

					})
					this.tableData = tableData;


				}).catch(() => {

				})
			},
			getDaysBetween(dateString1, dateString2, keywords) {
				var days = Math.floor((Date.parse(dateString2) - Date.parse(dateString1)) / 86400000)
				switch (keywords) {
					case 0:
						days++;
						break;
					case 1:
						days--;
						break;
					default:
						break;
				}
				return days;
			},
			addInfo() {
				this.dialogForm = true;
				this.tableData.module = ''
				this.tableData.kind = ''
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
				var params = new URLSearchParams();
				params.append('xms_id', this.xms_id);
				params.append('start_time', _this.DayChange(_this.mainTime[0]));
				params.append('end_time', _this.DayChange(_this.mainTime[1]));
				params.append('model', model);
				params.append('type', type);
				_this.$confirm('确认操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then((res) => {
					// this.loading = true;
					const loading = this.openLoading();
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
								// this.loading = false;
								loading.close();
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
								// this.loading = false;
								loading.close();
								setTimeout(() => {
									this.$toast({
										message: "" + res.data.msg + "!",
										duration: 1000
									})
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
			getDate(datestr) {
				var temp = datestr.split("-");
				var date = new Date(temp[0], temp[1], temp[2]);
				return date;
			},
			getDayAll(begin, end) {
				var dateAllArr = new Array();
				var ab = begin.split("-");
				var ae = end.split("-");
				var db1 = new Date(begin);
				var de1 = new Date(end);
				// db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);				
				// de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
				var unixDb = db1.getTime();
				var unixDe = de1.getTime();
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
			delTable() {
				this.$confirm('此操作将永久删除该排期表, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// this.loading = true
					const loading = this.openLoading();
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
								// this.loading = false;
								loading.close();
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
								// this.loading = false;
								loading.close();
								setTimeout(() => {
									this.$toast({
										message: "" + res.data.msg + "!",
										duration: 1000
									})
								}, 500)
							}, 500)
						}
					}).catch(() => {
						// this.loading = false;
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
			this.findPerson()
			this.verify()
		}
	}
</script>

<style>
	#scheduling {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	#scheduling .btn-box {
		display: flex;
		justify-content: center;
		margin: 10px;
		height: 30px;
		line-height: 30px;
	}

	.btn-outer {
		display: flex;
		align-items: center;
		padding: 20px 50px;
		letter-spacing: 1px;
		/* display: inline-block; */
		background: #2db7f5;
		border-radius: 0.15rem;
		color: #fff;
	}

	.table {
		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		padding: 0 1rem;
		margin: 0 auto;
		min-height: 100vh;
		align-items: center;
		position: relative;
		padding-bottom: 1rem;
	}

	#scheduling .el-range-separator {
		width: 10% !important;
	}

	#scheduling .block {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 0.2rem;
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

	table tr td {
		padding: 0.1rem 0.3rem;
		border: 1px solid #000 !important;
		text-align: center;
		white-space: nowrap;
		color: #000;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	tbody tr:last-child td:last-child {
		color: #fff;
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

	tfoot tr:last-child td {
		color: red;
		padding: 0.2rem 0;
		text-align: center;
		border: 1px solid #000;
	}

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

	#testDivTable {
		width: 100%;
		display: table;
	}

	#testDivTable>div {
		display: table-row;
	}

	#testDivTable>div>div {
		display: table-cell;
		vertical-align: middle;
	}

	.class_time button {
		margin-left: 20px !important;
	}

	.table>table {
		margin-top: 20px;
	}
</style>
