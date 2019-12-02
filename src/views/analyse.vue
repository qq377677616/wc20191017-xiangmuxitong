<script src="../common/Blob.js"></script>
<script src="../common/jquery.table2excel.js"></script>
<template>
	<div id="scheduling">
		<div class="wc-page-top">
			<div class="top-name">
				<div class="top-close iconfont icon-zuojiantou" @click="backLast"><span>返回</span></div>
				<div class="top-title">项目分析</div>
			</div>
		</div>
		<div class="table" border="1">
<!-- 			<div class="search-content">
				<el-input @click.native="inputClick($event)" placeholder="请输入行业名" v-model="p_search" @blur="scrollChange" clearable>
				</el-input>
				<el-button class="search" @click.native="proSearch">搜索</el-button>
			</div> -->
			<div class="search-content">
				<el-input @click.native="inputClick($event)" placeholder="请输入项目名" v-model="search" @blur="scrollChange" clearable>
				</el-input>
				<el-button class="search" @click.native="Search">搜索</el-button>
				<el-button class="search" @click.native="addAnalyse">添加项目分析</el-button>
				<el-button class='btn_table' type='primary' id="excell" @click="method5('dataTable')" plain>导出Excle表格</el-button>
			</div>
			<table class="table2excel" id="dataTable">
				<thead>
					<tr>
						<td style="min-width: 400px;background-color:#fffd38;color:#000;text-align:center;height:100px;line-height:100px;font-weight: bold;">项目名称</td>
						<td style="min-width: 400px;background-color:#fffd38;color:#000;text-align:center;height:100px;line-height:100px;font-weight: bold;">链接</td>
						<td style="min-width: 100px;background-color:#fffd38;color:#000;text-align:center;height:100px;line-height:100px;font-weight: bold;">是否上线</td>
						<td style="min-width: 100px;background-color:#fffd38;color:#000;text-align:center;height:100px;line-height:100px;font-weight: bold;">上线日期</td>
						<td style="min-width: 100px;background-color:#fffd38;color:#000;text-align:center;height:100px;line-height:100px;font-weight: bold;">交付日期</td>
						<td style="min-width: 100px;background-color:#fffd38;color:#000;text-align:center;height:100px;line-height:100px;font-weight: bold;">平台</td>
						<td style="min-width: 100px;background-color:#fffd38;color:#000;text-align:center;height:100px;line-height:100px;font-weight: bold;">商务</td>
						<td style="min-width: 400px;background-color:#fffd38;color:#000;text-align:center;height:100px;line-height:100px;font-weight: bold;">备注(1 表示已做了案例分析)</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="dataItem in dataList" :key="dataItem.id">
						<td style="text-align:center;height:100px;line-height:100px;border-botom:1px solid #000;" >{{dataItem.pro_name}}</td>
						<td style="text-align:center;height:100px;line-height:100px;border-botom:1px solid #000;" v-if="dataItem.pro_url != ''">{{dataItem.pro_url}}</td>
						<td style="text-align: center;height:100px;
    " v-else>
							<img width="80px" height="80px" class='pro_img' :src="dataItem.pro_img"/>
						</td>
						<td style="text-align:center;height:100px;line-height:100px;border-botom:1px solid #000;" >{{dataItem.online_type == 1 ? '已上线' : '未上线'}}</td>
						<td style="text-align:center;height:100px;line-height:100px;border-botom:1px solid #000;" >{{dataItem.online_time}}</td>
						<td style="text-align:center;height:100px;line-height:100px;border-botom:1px solid #000;" >{{dataItem.deliver_time}}</td>
						<td style="text-align:center;height:100px;line-height:100px;border-botom:1px solid #000;" >{{dataItem.platform}}</td>
						<td style="text-align:center;height:100px;line-height:100px;border-botom:1px solid #000;" >{{dataItem.sale_name}}</td>
						<td style="text-align:center;height:100px;line-height:100px;border-botom:1px solid #000;" >{{dataItem.remarks}}</td>
					</tr>
				</tbody>
<!-- 				<tfoot>
					<tr>
						<td style="background-color:#fffd38;color:#000;text-align:center;height:50px;line-height:50px;font-weight: bold;">序号</td>
						<td style="background-color:#fffd38;color:#000;text-align:center;height:50px;line-height:50px;font-weight: bold;">姓名</td>
						<td style="background-color:#fffd38;color:#000;text-align:center;height:50px;line-height:50px;font-weight: bold;">项目个数</td>
						<td style="min-width: 300px;background-color:#fffd38;color:#000;text-align:center;height:50px;line-height:50px;font-weight: bold;">项目名称</td>
						<td style="background-color:#fffd38;color:#000;text-align:center;height:50px;line-height:50px;font-weight: bold;">项目进度</td>
						<td style="min-width: 300px;background-color:#fffd38;color:#000;text-align:center;height:50px;line-height:50px;font-weight: bold;">项目地址</td>
					</tr>
				</tfoot> -->
				<Footer></Footer>
			</table>
		</div>


		<el-dialog :visible.sync="finishModalShow" :append-to-body='true' class='finish_modal'>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.project">
					<template slot="prepend">项目名称:</template>
				</el-input>
			</div>
			<div class='input_form input_link'>
				<div  class='input_type'>
					<div>
						<div :class="[{'type_active':link_type == 1}]" @click='changLink(1)'>使用链接</div>
						<div :class="[{'type_active':link_type == 2}]" @click='changLink(2)'>使用上传</div>	
					</div>
					<div class='type_info'>(填写链接或者上传太阳码)</div>
				</div>
				<el-input placeholder="请输入内容" v-model="result.link" v-if="link_type == 1">
					<template slot="prepend">链接:</template>
				</el-input>
				
				<div class='pro_position' v-else>
<!-- 					<van-uploader
					  v-model="result.image"
					  :max-count='1'
					/>
					
					 -->
					<div class='pro_position'>				
<!-- 						<div class="member_content member_img">
							<el-image :src="result.image" v-if="result.image" fit="cover">
					
							</el-image>
							<input type="file" class="upload" @change="inputerAdd($event)" ref="inputerAdd">
						</div> -->
						<van-uploader v-model="result.image" :after-read="afterRead" />
					</div>
				</div>
			</div>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.online_type">
					<template slot="prepend">是否已上线:</template>
				</el-input>
			</div>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.online_time">
					<template slot="prepend">上线日期:</template>
				</el-input>	
			</div>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.deliver_time">
					<template slot="prepend">交付日期:</template>
				</el-input>	
			</div>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.platform">
					<template slot="prepend">平台:</template>
				</el-input>
			</div>
			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.sale_name">
					<template slot="prepend">商务:</template>
				</el-input>
			</div>
			<van-field
			    v-model="result.remarks"
			    rows="3"
			    autosize
			    label="备注(1 表示已做了案例分析)"
			    type="textarea"
			    placeholder="请输入留言"
				class='remarks'
			  />
<!-- 			<div class='input_form'>
				<el-input placeholder="请输入内容" v-model="result.case">
					<template slot="prepend">备注(1 表示已做了案例分析):</template>
				</el-input>
			</div> -->
			<div class='add_submit' @click="addCenter"><el-button type='primary' plain>提交</el-button></div>
		</el-dialog>
<!-- 		<van-loading v-show="loading" class="loading" /> -->

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
				typeList: ['行政', '商务', '执行'],
				search: '',
				p_search: '',
				finishModalShow : false,
				result : {
					image : [],
					name : '',
					url : '',
					project : '',
					link : '',
					online : '',
					platform : '',
					remarks : '',
					online_type : '',
					online_time : '',
					deliver_time : '',
					sale_name : '',
					files : ''
				},
				dataList : [],
				link_type : 1
			};
		},
		components: {
			Footer: () => import('components/footer.vue'),
		},
		mounted() {
			let _this = this;
			const loading = _this.openLoading()
			this.xm_id = localStorage.getItem("xm_id");
			setTimeout(()=>{
				loading.close()
			},500)
		},
		methods: {
			afterRead(file) {
				// 此时可以自行将文件上传至服务器
			
				console.log(file.file);
				this.result.files = file.file
				// this.getUrl(file)
			},
			inputerAdd(event){
				let _this = this;
				
				let inputDOM = this.$refs.inputerAdd;
				// 通过DOM取文件数据
				this.fil = inputDOM.files;
				console.log(this.fil[0])
				//调用上传图片的接口;
				// _this.memberUpdate.update_img = this.getObjectURL(this.fil[0]);
				// this.member.infoImg = _this.memberUpdate.update_img
				// this.getUrl(this.fil[0]);
				this.result.files = this.fil[0];
			},
			findCenter(){			
				this.$axios({
					url: '/getNovanalsel',
					method: 'GET',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
				}).then((res) => {
					if(res.data.data){
						let data = res.data.data ? res.data.data : [];
						data.forEach((item)=>{
							item.online_time = item.online_time.split(' ')[0] ? item.online_time.split(' ')[0] : item.online_time;
							item.deliver_time = item.deliver_time.split(' ')[0] ? item.deliver_time.split(' ')[0] : item.deliver_time;
						})
						this.dataList = data;
					}

				}).catch(() => {

				})
			},
			addCenter(){
				let _this = this;
				let result = _this.result;
								const loading = _this.openLoading();
				var params = new URLSearchParams();
				let formData = new FormData();
				console.log(result)
				let data = {
					// uid : 85,
					uid : _this.uid,
					pro_name : result.project,
					platform : result.platform,
					url_type : _this.link_type,
					remarks : result.remarks ,
					online_type : result.online_type,
					online_time : result.online_time,
					deliver_time : result.deliver_time,
					pro_img : result.image ? result.image : '',
					pro_url : result.link
				}
				console.log(data)
				formData.append("uid", 85);				
				formData.append("pro_name", result.project);  // 销售姓名
				formData.append("platform", result.platform);  // 平台 
				formData.append("url_type", _this.link_type); // 1 代表此项目是url 2 代表太阳码
				formData.append("remarks",result.remarks);  // 1 表示已做案例分析  其他为文字描述
				formData.append("online_type", result.online_type); // 1 未上线 2 已上线
				formData.append("online_time", result.online_time);	// 上线日期
				formData.append("deliver_time", result.deliver_time); // 交付日期
				formData.append("sale_name", result.sale_name);
				formData.append("pro_img", result.files); // 图片	
				formData.append("pro_url", result.link);	// 地址
				this.$axios({
					url: '/getNovanal',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: formData
				}).then((res) => {
					if (res.data) {						
						setTimeout(() => {
							loading.close();
							console.log(res.data)
							if(res.data.errcode == '0'){
								setTimeout(() => {
									_this.$toast({
										message: '添加成功！',
										duration: 1000
									});
									_this.finishModalShow = false;
									_this.findCenter();
								}, 500)
							}else {
								_this.$toast({
									message: res.data.msg,
									duration: 1000
								});
								_this.finishModalShow = false;
							}
							
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
			changLink(num){
				let _this = this;
				console.log(_this.link_type)
				_this.link_type = num;
			},
			addAnalyse(){
				let _this = this;
				
				if(_this.uid != 85) {
					_this.$toast({
						message : '您没有权限！',
						duration : 1000
					});
					return;
				}
				_this.finishModalShow = true;
			},
			scrollChange() {
				let Index = document.getElementById('index')
				Index.scrollIntoView()
			},
			inputClick(e) {
				e.target.focus();
				// e.currentTarget.focus();
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
			Search(){
				let _this = this;
				if(_this.search == ''){
					_this.$toast({
						message : '请输入项目名!',
						duration : 1000
					});
					return ;
				}
				var params = new URLSearchParams();
				params.append('keywords',this.search);
				const loading = this.openLoading()
				this.$axios({
					url: '/getSearchanalysis',	
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data : params
				}).then((res) => {
					if(res.data.data){
						let data = res.data.data.data ? res.data.data.data : [];
						setTimeout(()=>{
							loading.close();
								setTimeout(()=>{
									if(data.length > 0){
										data.forEach((item)=>{
											item.online_time = item.online_time.split(' ')[0] ? item.online_time.split(' ')[0] : item.online_time;
											item.deliver_time = item.deliver_time.split(' ')[0] ? item.deliver_time.split(' ')[0] : item.deliver_time;
										})
										this.dataList = data;
									}else {
										_this.$toast({
											message : '暂无相关内容!',
											duration : 1000
										})
									}

								},500)
						},500)

					}else {
						setTimeout(()=>{
							loading.close();
						},500)
					}
				}).catch(() => {
					setTimeout(()=>{
						loading.close();
							setTimeout(()=>{
								_this.$toast({
									message : '请求失败!',
									duration : 1000
								})
							},500)
					},500)		
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
			this.role = role;
			let id = localStorage.getItem('id')
			let uid = this.uncompileStr(id).split('&&')[1]
			this.uid = uid;
			// this.uid = 85;
			this.findCenter()
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
	.table2excel {
		margin-top: 20px;
		margin-bottom : 40px;
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
	
	
	.input_form {
		margin-bottom : 15px;
	}
/* 	.input_form>div:nth-child(1) {
		margin-bottom: 20px;
	} */
	
	
	.submit_box {
		display: flex;
		justify-content: center;
	}
	
	.submit_box button {
		padding: 10px 25px;
	}
	.input_title {
		display: flex;;
		align-items: center;
	}
	.c_info {
		font-size : 24px;
		margin-left : 20px;
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
		width: 80px;
		height: 80px;
		line-height: 80px;
		text-align: center;
	}
	
	.avatar {
		width: 80px;
		height: 80px;
		display: block;
	}
	
	.pro_position {
		/* margin-right : 20px; */
		display: flex;
		justify-content: center;
		margin-left : 20px;
	}
	.pro_position span {
		margin-right : 20px;
	}
	.input_link {
/* 		display: flex;
		flex-direction: row; */
	}
	.input_type >div {
		min-width: 90px;
		display: flex;
		margin-bottom : 20px;
	}
	.input_type > div > div{
		padding : 10px 20px;
	}
	.input_type > div > div:nth-child(1){
		border-radius: 5px 0 0 5px;
	}
	.input_type > div > div:nth-child(2){
		border-radius: 0 5px 5px 0;
	}
	.input_type .type_active {
		background:#089ddf;
		color : #fff;
	}
	.add_submit {
		margin-top : 20px;
		text-align: center;
	}
	.add_submit  button {
		padding : 10px 30px;
	}
	.remarks {
		font-size : 13px;
	}
/* 	.remarks .van-field__label {
		min-width: auto;
	} */
	.type_info {
		font-size : 12px;
		color : #bbb;
		margin-left : 20px;
	}
	.input_type {
		display: flex;
		align-items: center;
	}
	.input_type > div > div {
		cursor: pointer;
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
 