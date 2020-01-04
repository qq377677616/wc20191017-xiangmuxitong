<template>
	<div id="member" :class="{'marTop':marTop}">
		<div :class=" ['member_main',{'member-enter': showData.member},{'member-leave': !showData.member}]">
			<div class="wc-page-top">
				<div class="top-name">
					<div class="top-close iconfont icon-zuojiantou" @click="backLast"><span>返回</span></div>
					<div class="top-title">网晨项目管理系统-个人中心</div>
				</div>
			</div>
			<div class="member_menu">
				<el-row class="tac">
					<el-col :span="24">
						<el-menu default-active="1" class="el-menu-vertical-demo">
							<el-menu-item class="icon_menu icon_head" index="1" @click="showHead">
								<i class="el-icon-picture-outline-round"></i>
								<span slot="title">头像</span>
								<div class="icon_right head_img">
									<el-image :src="member.infoImg" fit="cover"> </el-image>
									<i class="el-icon-arrow-right"></i>
								</div>
							</el-menu-item>
<!-- 							<el-menu-item class="icon_menu" index="2" @click="showName">
								<i class="el-icon-user"></i>
								<span slot="title">姓名</span>
								<div class="icon_right">
									<span v-html="member.infoName"></span>
									<i class="el-icon-arrow-right"></i>
								</div>
							</el-menu-item> -->
							<el-menu-item class="icon_menu" index="2">
								<i class="el-icon-user"></i>
								<span slot="title">姓名</span>
								<div class="icon_right">
									<span v-html="member.infoName"></span>
									<i class="el-icon-arrow-right" style='opacity: 0;'></i>
								</div>
							</el-menu-item>
							<el-menu-item class="icon_menu" index="3" @click="showPhone">
								<i class="el-icon-mobile-phone"></i>
								<span slot="title">更改预留手机号</span>
								<div class="icon_right">
									<span v-html="member.tel"></span>
									<i class="el-icon-arrow-right" :style="[{'opacity' : canChange ? 1 : 0}]"></i>
								</div>
							</el-menu-item>
							<el-menu-item class="icon_menu" index="4" @click="showPin">
								<i class="el-icon-unlock"></i>
								<span slot="title">更改登录密码</span>
								<div></div>
								<div class="icon_right">
									<i class="el-icon-arrow-right"></i>
								</div>
							</el-menu-item>
							<el-menu-item class="icon_menu" index="5" @click="showPlot">
								<i class="el-icon-coin"></i>
								<div class="plot_box">
									<div><span>{{plot}}</span></div>
									<div class="plot_from"><span>湖南网晨网络科技有限公司</span><span class="plot_line">/</span><span>{{plot}}</span></div>
								</div>
								
								<div class="icon_right">
									
									<i class="el-icon-arrow-right"></i>
								</div>
							</el-menu-item>
						</el-menu>
					</el-col>
				</el-row>
			</div>
		</div>
		<div :class=" ['member_other','member_head',{'member-enter': showData.head}]">
			<div class="wc-page-top">
				<div class="top-name">
					<div class="top-close iconfont icon-zuojiantou" @click="backInfo"><span>返回</span></div>
					<div class="top-title">头像</div>
				</div>
			</div>
			<div class="member_content member_img">
				<el-image :src="memberUpdate.update_img" v-if="memberUpdate.update_img" fit="cover">

				</el-image>
				<input type="file" class="upload" @change="addImg($event)" ref="inputer">
			</div>
		</div>
		<div :class=" ['member_other','member_name',{'member-enter': showData.name}]">
			<div class="wc-page-top">
				<div class="top-name">
					<div class="top-close iconfont icon-zuojiantou" @click="backInfo"><span>返回</span></div>
					<div class="top-title">姓名</div>
					<div class="project-num" @click="checkName">
						<i class='el-icon-check'></i>
					</div>
				</div>
			</div>
			<div class="member_content member_update_name">
				<el-input @blur="scrollChange" @focus="addTop" @click.native="inputClick($event)" placeholder="请输入姓名" v-model="memberUpdate.update_name"
				 clearable>
				</el-input>
			</div>
		</div>
		<div :class=" ['member_other','member_phone',{'member-enter': showData.phone}]">
			<div class="wc-page-top">
				<div class="top-name">
					<div class="top-close iconfont icon-zuojiantou" @click="backInfo"><span>返回</span></div>
					<div class="top-title">更改手机号</div>
				</div>
				<div class="project-num" @click="checkPhone">
					<i class='el-icon-check'></i>
				</div>
			</div>
			<div class="member_content member_update_phone">
				<el-input type='tel' maxlength='11' @blur="scrollChange" @focus="addTop" @click.native="inputClick($event)"
				 placeholder="请输入手机号" v-model="memberUpdate.update_phone" clearable>
				</el-input>
<!-- 				<el-input type='tel' @blur="scrollChange" @focus="addTop" @click.native="inputClick($event)" placeholder="请输入验证码"
				 v-model="memberUpdate.update_code" clearable>
					<el-button slot="append" @click.native="send()">
						<span v-show="show">发送验证码</span>
						<span v-show="!show">{{time}}</span>
					</el-button>
				</el-input> -->
			</div>
		</div>
		<div :class=" ['member_other','member_pin',{'member-enter': showData.pin}]">
			<div class="wc-page-top">
				<div class="top-name">
					<div class="top-close iconfont icon-zuojiantou" @click="backInfo"><span>返回</span></div>
					<div class="top-title">更改密码</div>
				</div>
				<div class="project-num" @click="checkPwd">
					<i class='el-icon-check'></i>
				</div>
			</div>
			<div class="member_content member_update_pwd">
				<div class="update_type_box">
					<div :class="['update_type','update_type_left',{'active' : updatePwd.type == 0}]" @click="checkUpdate(0)">手机号</div>
					<div :class="['update_type','update_type_right',{'active' : updatePwd.type != 0}]" @click="checkUpdate(1)">密码</div>
				</div>
				<div class="update_from_phone" v-if="updatePwd.type == 0">
					<el-input type='tel' @blur="scrollChange" @focus="addTop" @click.native="inputClick($event)" placeholder="请输入手机号"
					 maxlength='11' v-model="member.tel" clearable disabled>
					</el-input>
					<el-input type='tel' @blur="scrollChange" @focus="addTop" @click.native="inputClick($event)" placeholder="请输入验证码"
					 v-model="updatePwd.type_phone.code" clearable>
						<el-button slot="append" @click.native="send()">
							<span v-show="show">发送验证码</span>
							<span v-show="!show">{{time}}</span>
						</el-button>
					</el-input>
					<el-input maxlength='20' type='password' @blur="scrollChange" @focus="addTop" @click.native="inputClick($event)"
					 placeholder="密码,少于20位" v-model="updatePwd.type_phone.password" clearable>
					</el-input>
					<el-input maxlength='20' type='password' @blur="scrollChange" @focus="addTop" @click.native="inputClick($event)"
					 placeholder="确认密码,小于20位" v-model="updatePwd.type_phone.repeat" clearable>
					</el-input>
				</div>
				<div class="update_from_pwd" v-else>
					<el-input type='tel' @blur="scrollChange" @focus="addTop" @click.native="inputClick($event)" placeholder="请输入手机号"
					 maxlength='11' v-model="member.tel" clearable disabled>
					</el-input>
					<el-input maxlength='20' type="password" @blur="scrollChange" @focus="addTop" @click.native="inputClick($event)"
					 placeholder="旧密码,少于20位" v-model="updatePwd.type_pwd.initial" clearable>
					</el-input>
					<el-input maxlength='20' type="password" @blur="scrollChange" @focus="addTop" @click.native="inputClick($event)"
					 placeholder="新密码,少于20位" v-model="updatePwd.type_pwd.password" clearable>
					</el-input>
					<el-input maxlength='20' type="password" @blur="scrollChange" @focus="addTop" @click.native="inputClick($event)"
					 placeholder="确认密码,少于20位" v-model="updatePwd.type_pwd.repeat" clearable>
					</el-input>
				</div>
			</div>
		</div>
		<div :class=" ['member_other','member_plot',{'member-enter': showData.plot}]">
			<div class="wc-page-top">
				<div class="top-name">
					<div class="top-close iconfont icon-zuojiantou" @click="backInfo"><span>返回</span></div>
					<div class="top-title">{{plot}}</div>
				</div>
			</div>
			<div class="member_content">
				<!-- <div v-for="(typeItem, typeIndex) in newPerson">
					<div class="person_info_box" v-if="typeItem.data != ''">
						<div class="person_letter" v-html="typeItem.letter"></div>
						<ul>
							<li class="person_menu" v-for="personItem,personIndex in typeItem.data" v-html="personItem.user_name"></li>
						</ul>
					</div>
					</ul>
				</div> -->
				<div class="search-content">
					<el-input @click.native="inputClick($event)" placeholder="请输入中文关键字" v-model="search" @blur="scrollChange" clearable>
					</el-input>
					<el-button class="search" @click.native="Search">搜索</el-button>
				</div>
				<van-collapse v-model="activeName" accordion>
					<van-collapse-item v-for="(Item,Index) in BranchList" :title="Item.branch" :value="Item.personList.length" class="office-list-content" :key="Index" :name="Index" :disabled="Item.personList ==''">
						<div class="office-list">
							<div class="office-info" v-for="(personItem,personIndex) in Item.personList" :key="personIndex">
								<div class="office-name">
									<span>{{personItem.name }}</span><span class="office-phone">
										{{personItem.user_phone}}
										<!--                                <a :href="'tel:'+(personItem.user_phone)">{{personItem.user_phone}}</a>-->
									</span>
								</div>
							</div>
						</div>
					</van-collapse-item>
				</van-collapse>
			</div>
		</div>
		
		
		<Footer></Footer>
	</div>
</template>

<script>
	import qs from 'qs'
	export default {
		data() {
			return {
				showData: {
					head: false,
					name: false,
					phone: false,
					pin: false,
					plot: false
				},
				member: {
					infoImg: '',
					infoName: '',
					tel: '',
				},
				memberUpdate: {
					update_phone: '',
					update_code: '',
					update_name: '',
					update_img: ''
				},
				updatePwd: {
					type: 0,
					type_phone: {
						phone: '',
						password: '',
						repeat: '',
						code: ''
					},
					type_pwd: {
						initial: '',
						password: '',
						repeat: ''
					}
				},
				typeList: ['行政', '商务', '执行'],
				role: '',
				formData: new FormData(),
				imgs: {},
				imgLen: 0,
				person: [],
				newPerson: [],
				show: true,
				marTop: false,
				total: 59,
				time: '59s',
				uid : '',
				activeName: '0',
				personInfo: {
					name: '',
					post: '',
					phone: ''
				},
				postList: [{
						id: 1,
						design: '行政'
					},
					{
						id: 2,
						design: '产品'
					},
					{
						id: 3,
						design: '商务'
					},
					{
						id: 4,
						design: '策划'
					},
					{
						id: 5,
						design: '设计'
					},
					{
						id: 6,
						design: '前端'
					},
					{
						id: 7,
						design: '后端'
					},
					{
						id: 8,
						design: '总经办'
					},
					{
						id: 9,
						design: '测试'
					},
					{
						id: 10,
						design: '公共'
					}
				],
				BranchList: [{
					id: 1,
					branch: '行政',
					personList: []
				}, {
					id: 2,
					branch: '产品',
					personList: []
				}, {
					id: 3,
					branch: '商务',
					personList: []
				}, {
					id: 4,
					branch: '策划',
					personList: []
				}, {
					id: 5,
					branch: '设计',
					personList: []
				}, {
					id: 6,
					branch: '前端',
					personList: []
				}, {
					id: 7,
					branch: '后端',
					personList: []
				}, {
					id: 8,
					branch: '总经办',
					personList: []
				}, {
					id: 9,
					branch: '测试',
					personList: []
				}, {
					id: 10,
					branch: '公共',
					personList: []
				}],
				showPost: false,
				showOffice: false,
				dialogTableVisible: false,
				dialogFormVisible: false,
				branchIndex: 0,
				loading: false,
				search: '',
				canChange : true,
				plot : ''
			}
		},
		components: {
			Footer: () => import('components/footer.vue'),
		},
		methods: {
			findPerson() {
				let _this = this;
				_this.$axios({
					url: '/getnamelist',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					_this.BranchList.forEach((item) => {
						item.personList = []
					})
					if (res.data) {
						res.data.data.forEach((item) => {
							if (item.bm_type >= 1) {
								_this.addList(item.id, item.user_name, item.bm_type - 1, item.user_phone);								
							}					
						})
						// _this.newPerson = _this.pySort(res.data.data, res.data.data)
					}
				}).catch(() => {
						
				})
			},
			addList(id, name, index, user_phone) {
				let data = {}
				data.id = id
				data.name = name
				data.user_phone = Number(user_phone)
				this.BranchList[index].personList.push(data)
			},
			findUser() {
				let _this = this;
				let params = new URLSearchParams();
				params.append('id',this.uid)
				_this.$axios({
					url: '/getCenterselect',
					method: 'post',
					data: params,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data) {
						_this.member.infoImg = res.data.data[0].headimg ? res.data.data[0].headimg : require('../assets/head.png');
						_this.member.infoName = res.data.data[0].user_name;
						_this.member.tel = res.data.data[0].user_phone;
						// _this.member.tel = '18692501862';
						//修改页查询 赋值
						_this.memberUpdate.update_img = _this.member.infoImg;
						_this.memberUpdate.update_name = _this.member.infoName;
						if(_this.member.tel == '16666666666' || _this.member.tel == '18888888888' || _this.member.tel == '19999999999'){
							_this.canChange = false;
						}
					}
				}).catch(() => {

				})
			},
			checkPwd() {
				let _this = this;
				if (_this.updatePwd.type == 0) {
					if (_this.updatePwd.type_phone.code == '' || _this.updatePwd.type_phone.code == null) {
						_this.$toast({
							message: '验证码不能为空!',
							duration: 1000
						});
						return;
					}
					if (_this.updatePwd.type_phone.password == '' || _this.updatePwd.type_phone.password == null) {
						_this.$toast({
							message: '密码不能为空!',
							duration: 1000
						});
						return;
					}
					if (_this.updatePwd.type_phone.repeat == '' || _this.updatePwd.type_phone.repeat == null) {
						_this.$toast({
							message: '确认密码不能为空!',
							duration: 1000
						});
						return;
					}
					if (_this.updatePwd.type_phone.password != _this.updatePwd.type_phone.repeat) {
						_this.$toast({
							message: '两次输入的密码不一致!',
							duration: 1000
						});
						return;
					}
					_this.checkByPhone();
				} else {
					if (_this.updatePwd.type_pwd.initial == '' || _this.updatePwd.type_pwd.initial == null) {
						_this.$toast({
							message: '旧密码不能为空!',
							duration: 1000
						});
						return;
					}
					if (_this.updatePwd.type_pwd.password == '' || _this.updatePwd.type_pwd.password == null) {
						_this.$toast({
							message: '新密码不能为空!',
							duration: 1000
						});
						return;
					}
					if (_this.updatePwd.type_pwd.repeat == '' || _this.updatePwd.type_pwd.repeat == null) {
						_this.$toast({
							message: '确认密码不能为空!',
							duration: 1000
						});
						return;
					}
					if (_this.updatePwd.type_pwd.password != _this.updatePwd.type_pwd.repeat) {
						_this.$toast({
							message: '两次输入的密码不一致!',
							duration: 1000
						});
						return;
					}
					_this.checkByPwd();
				}
			},
			checkByPhone() {
				let _this = this;
				let params = new URLSearchParams();
				params.append('user_phone',_this.member.tel);		// 手机号
				params.append('password',_this.updatePwd.type_phone.password);		//密码
				params.append('password_two',_this.updatePwd.type_phone.repeat);	//确认密码	
				params.append('yzm',_this.updatePwd.type_phone.code);  // 旧密码
				const loading = _this.openLoading();
				
				_this.$axios({
					url: '/password_sms',
					method: 'post',
					data: params,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.errcode == '0') {
						setTimeout(()=>{
							loading.close();
							_this.$toast({
								message: '修改成功!',
								duration: 1000
							});
						},500)						
					}else {
						setTimeout(()=>{
							loading.close();
							_this.$toast({
								message: res.data.msg +'!',
								duration: 1000
							});
						},500)	
					}
				}).catch(() => {
						setTimeout(()=>{
							loading.close();
							_this.$toast({
								message: '请求失败!',
								duration: 1000
							});
						},500)	
				})
			},
			checkByPwd() {
				let _this = this;
				let params = new URLSearchParams();
				params.append('user_phone',this.member.tel);		// 手机号
				params.append('password',this.updatePwd.type_pwd.password);		//密码
				params.append('password_two',this.updatePwd.type_pwd.repeat);	//确认密码	
				params.append('password_old',this.updatePwd.type_pwd.initial);  // 旧密码
				const loading = _this.openLoading();
				_this.$axios({
					url: '/password_old',
					method: 'post',
					data: params,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then((res) => {
					if (res.data.errcode == '0') {
						setTimeout(()=>{
							loading.close();
							_this.$toast({
								message: '修改成功!',
								duration: 1000
							});
						},500)						
					}else {
						setTimeout(()=>{
							loading.close();
							_this.$toast({
								message: res.data.msg +'!',
								duration: 1000
							});
						},500)	
					}
				}).catch(() => {
						setTimeout(()=>{
							loading.close();
							_this.$toast({
								message: '请求失败!',
								duration: 1000
							});
						},500)	
				})
			},
			checkPhone() {
				let _this = this;
				if(!_this.canChange){
					return;
				}
				if (_this.memberUpdate.update_phone == '' || _this.memberUpdate.update_phone == null) {
					_this.$toast({
						message: '手机号不能为空!',
						duration: 1000
					});
					return;
				}
				if(_this.memberUpdate.update_phone == _this.member.tel){
					_this.$toast({
						message: '手机号不能一致!',
						duration: 1000
					});
					return;
				}
				_this.$confirm('您确定要修改手机号?这会影响到账号登录!', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let params = new FormData();
					params.append('id',_this.uid);
					params.append('user_phone',_this.memberUpdate.update_phone)
					_this.changePhone(params)
				})
			},
			changePhone(params){
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
					if (res.data.errcode == '0') {
						setTimeout(()=>{
							loading.close();
							setTimeout(()=>{
								_this.$toast({
									message : '修改成功!',
									duration : 1000
								})
								_this.member.tel = _this.memberUpdate.update_phone;
							},500)
						},500)
					}else {
						setTimeout(()=>{
							loading.close();
							setTimeout(()=>{
								_this.$toast({
									message : res.data.msg + '!',
									duration : 1000
								})
							},500)
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
			checkName() {
				let _this = this;
				if (_this.memberUpdate.update_name == '' || _this.memberUpdate.update_name == null) {
					_this.$toast({
						message: '姓名不能为空!',
						duration: 1000
					});
					return;
				}
				_this.member.infoName = _this.memberUpdate.update_name;

			},
			addTop() {
				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				// var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if (isAndroid) {
					this.marTop = true
				}

			},
			scrollChange() {
				var u = navigator.userAgent;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if (isiOS) {
					let Index = document.getElementById('index')
					Index.scrollIntoView()
				} else if (isAndroid) {
					this.marTop = false
				}
			},
			inputClick(e) {
				e.currentTarget.focus();
			},
			sendCode() {
				var params = new URLSearchParams();
				let name = this.member.tel
				params.append("user_phone", name);
				let _this = this;
				_this.$axios({
					url: '/request_phone_code',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					if (res.data.errcode == 0) {
						_this.$toast({
							message: "" + res.data.msg + "!",
							duration: 1000
						})
					} else {
						_this.$toast({
							message: "" + res.data.msg + "!",
							duration: 1000
						})
					}
				}).catch(() => {
					_this.$toast({
						message: "请求失败!",
						duration: 1000
					})
				})
			},
			send() {
				if (this.show) {
					// if (this.userInfo.username == '') {
					// 	this.$toast({
					// 		message: '手机号不能为空！',
					// 		duration: 1000
					// 	})
					// 	return;
					// }
					this.sendCode();
					this.show = false
					this.countDown()
				}
			},
			countDown() {
				let clock = window.setInterval(() => {
					this.total--
					this.time = this.total + 's'
					if (this.total == 0) {
						this.show = true
						this.time = '59s'
						this.total = 59
						window.clearInterval(clock)
					}
				}, 1000)
			},
			pySort(arr, empty) {
				var $this = this;
				if (!String.prototype.localeCompare)
					return null;
				var letters = "ABCDEFGHJKLMNOPQRSTWXYZ".split('');
				var zh = "阿八嚓哒妸发旮哈讥咔了痳拏噢妑七呥扨它穵夕丫帀".split('');
				// var zh = "啊吧嚓的e发噶哈就看了吗你哦怕去人省他我西要".split('');
				var arrList = [];
				for (var m = 0; m < arr.length; m++) {
					let obj = new Object();
					obj.user_name = arr[m].user_name;
					obj.id = arr[m].id;
					obj.user_depar = arr[m].user_depar
					obj.user_phone = arr[m].user_phone
					arrList.push(obj);
				}
				var result = [];
				var curr;
				for (var i = 0; i < letters.length; i++) {
					curr = {
						letter: letters[i],
						data: []
					};
					if (i != 26) {
						for (var j = 0; j < arrList.length; j++) {
							var initial = arrList[j].user_name.charAt(0); //截取第一个字符
							arrList[j].user_name.charAt(0);
							if (arrList[j].user_name.charAt(0) == letters[i] || arrList[j].user_name.charAt(0) == letters[i].toLowerCase()) { //首字符是英文的
								curr.data.push(arrList[j]);
							} else if (zh[i] != '*' && $this.isChinese(initial)) { //判断是否是无汉字,是否是中文
								if (initial.localeCompare(zh[i]) >= 0 && (!zh[i + 1] || initial.localeCompare(zh[i + 1]) < 0)) { //判断中文字符在哪一个类别
									curr.data.push(arrList[j]);
								}
							}
						}
					} else {
						for (var k = 0; k < arrList.length; k++) {
							var ini = arrList[k].user_name.charAt(0); //截取第一个字符
							if (!$this.isChar(ini) && !$this.isChinese(ini)) {
								curr.data.push(arrList[k]);
							}
						}
					}
					if (empty || curr.data.length) {
						result.push(curr);
						//curr.data.sort(function(a,b){
						//  return b.localeCompare(a);    //排序,英文排序,汉字排在英文后面
						//});
					}
				}
				return result;
			},
			isChinese: function(temp) {
				var re = /[^\u4E00-\u9FA5]/;
				if (re.test(temp)) {
					return false;
				}
				return true;
			},
			isChar: function(char) {
				var reg = /[A-Za-z]/;
				if (!reg.test(char)) {
					return false;
				}
				return true;
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
				// _this.memberUpdate.update_img = this.getObjectURL(this.fil[0]);
				// this.member.infoImg = _this.memberUpdate.update_img
				let params = new FormData();
				params.append('user_phone',this.member.tel)
				params.append('id',this.uid);
				params.append('headimg',this.fil[0])
				this.checkHead(params);
			},
			checkHead(params){
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
						setTimeout(()=>{
							loading.close();
							setTimeout(()=>{
								_this.memberUpdate.update_img = res.data.data.headimg ? res.data.data.headimg : require('../assets/head.png')
								_this.member.infoImg = _this.memberUpdate.update_img;
							},500)
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
			checkUpdate(num) {
				this.updatePwd.type = num;
			},
			handleAvatarSuccess(res, file) {
				this.infoImg = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isLt2M) {
					this.$toast({
						message: '上传头像图片大小不能超过 2MB!',
						duration: 1000
					});
				}
				return isLt2M;
			},
			addList(id, name, index, user_phone) {
				let data = {}
				data.id = id
				data.name = name
				data.user_phone = Number(user_phone)
				this.BranchList[index].personList.push(data)
			},
			showPlot() {
				this.findPerson();
				this.showData.plot = true;
				this.search = ''
			},
			showPin() {
				this.showData.pin = true
			},
			showPhone() {
				let _this = this;
				if(!_this.canChange){
					return;
				}
				if(_this.member.tel == '18888888888' || _this.member.tel == '199999999999' || _this.member.tel == '166666666666'){
					return;
				}
				_this.showData.phone = true
			},
			showHead() {
				this.showData.head = true
			},
			showName() {
				this.showData.name = true
			},
			backInfo() {
				this.showData = {
					head: false,
					name: false,
					phone: false,
					pin: false,
					plot: false
				}
			},
			handleRemove(file, fileList) {
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
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
			uncompileStr(code) {
				code = unescape(code);
				var c = String.fromCharCode(code.charCodeAt(0) - code.length);
				for (var i = 1; i < code.length; i++) {
					c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
				}
				return c;
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
				const loading = this.openLoading();
				_this.$axios({
					url: '/getSearchu',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: qs.stringify(data)
				}).then((res) => {
					if (res.data.errcode == 0) {
						setTimeout(() => {
							if (res.data.data.length > 0) {
								_this.BranchList.forEach((item) => {
									item.personList = []
								})
								// _this.loading = false;
								loading.close();
								res.data.data.forEach((item) => {
									if (item.bm_type >= 1) {
										_this.addList(item.id, item.user_name, item.bm_type - 1, item.user_phone)
									}
								})
							} else {
								// _this.loading = false;
								loading.close();
								this.$toast({
									message: "暂无相关人员!",
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
					loading.close();
					this.$toast({
						message : '请求失败!',
						duration : 1000
					})
				})
			}
		},
		created() {
			let _this = this;
			let role = localStorage.getItem('role')
			this.role = role
			let id = localStorage.getItem('id', )
			let uid = _this.uncompileStr(id).split('&&')[1];
			let postList = this.postList;
			let plot = '';
			let type = localStorage.getItem('type')
			for(var prop in postList){
				if(postList[prop].id == type){
					plot = postList[prop].design
				}
			}
			this.plot = plot;
			this.uid = uid;
			this.loading = true;
			let workList = [];
			for(let i =0;i<100;i++){
				if(i%5 == 0){
					workList.push(i)
				}
			}
			this.workList = workList;
			this.findPerson();
			this.findUser();
			this.loading = false;
			window.addEventListener('beforeunload', e => {
				sessionStorage.removeItem('lastShowIndex')
			});
		},
		mounted() {
			this.showOffice = true;
			
		},
		computed: {
			phone(tel) {
				return () => {
					return 'tel:' + tel
				}
			}
		}
	}
</script>
<style scoped="scoped">
	#member {
		min-height: 100vh;
		/* background: #fff; */
	}

	.member_menu {
		padding-top: 50px;
		min-height: 100%;
	}

	.icon_head {
		height: 80px;
	}

	.icon_menu {
		position: relative;
		border-bottom: 1px solid #DEDEDE;
		display: flex;
		align-items: center;
		padding: 15px 15px !important;
		min-height: 60px;
	}

	.icon_right {
		position: absolute;
		right: 15px;
		top: 50%;
		transform: translateY(-50%);
	}

	.el-icon-arrow-right {
		margin-right: 0;
		margin-left: 5px;
	}

	.head_img {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.head_img .el-image {
		height: 100%;
		width: 65px;
		height: 65px;
		border-radius: 50%;
	}

	.plot_box {
		display: flex;
		flex-direction: column;
		margin: 5px 0;
	}

	.plot_box>div {
		display: flex;
		height: 25px;
		align-items: center;
	}

	/* 	.el-menu-item, .el-submenu__title {
		height : ;
		line-height : 1;
	} */
	.plot_from {
		color: #aaa;
		transform: scale(0.9);
		transform-origin: left;
	}

	.plot_from .plot_line {
		margin: 0 5px;
	}

	.member-enter {
		transform: translateX(0) !important;
		transition: 0.25s;
	}

	.member-leave {
		transform: translateX(0);
		transition: 0.25s;
	}

	#member {
		position: relative;
		overflow-x: hidden;
	}

	.member_main {
		width: 100%;
		position: absolute;
		z-index: 99;
		top: 0;
	}

	.member_other {
		width: 100%;
		position: fixed;
		z-index: 999;
		top: 0;
		min-height: 100vh;
		height: 100vh;
		background: #fff;
		transform: translateX(100%);
		transition: 0.25s;
		/* overflow: hidden; */
	}

	.member_plot {
		/* 		overflow-y: hidden;
		overflow-x: hidden; */
	}

	.wc-page-top {
		top: 0;
	}

	.member_content {
		padding-top: 60px;
		/* padding : 50px 30px 0; */
		height: 100vh;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
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

	.member_img {
		min-height: 100vh;
		background: rgba(0, 0, 0, 1);
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top: initial;
	}

	.update_type_box {
		display: flex;
		justify-content: center;
		margin-bottom: 30px;
	}

	.update_type {
		padding: 10px 30px;
	}

	.update_type_left {
		border: 1px solid #ddd;
		border-radius: 5px 0 0 5px;
		border-right: none;
	}

	.update_type_right {
		border: 1px solid #ddd;
		border-radius: 0 5px 5px 0;
		border-left: none;
	}

	.update_type.active {
		background: #089ddf;
		color: #fff;
		border-color :#089ddf;
	}

	.el-image {
		position: relative;
	}

	.upload {
		width: 100%;
		height: 100%;
		opacity: 0;
		position: absolute;
	}

	.person_info_box {}

	.person_letter {
		background: #ddd;
		color: #aaa;
		padding: 0px 10px;
	}

	.person_menu {
		padding: 20px 10px;
		border-bottom: 1px solid #ddd;
	}
	
	html,
	body {
		background: #f5f5f5;
		width: 100%;
		height: 100%;
	}
	
	.office {
		width: 100%;
		height: 100%;
	}
	
	.office-list {
		background: #fff;
	}
	
	.office-info {
		padding: 5px 0px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #b1b1b1;
	}
	
	.office .van-cell {
		border-radius: 5px;
	}
	
	.main-submit-box {
		display: flex;
		box-sizing: border-box;
		width: 100%;
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
		padding: 10px 45px 30px;
		position: fixed;
		bottom: 0;
		justify-content: center;
	}
	
	.van-submit {
		display: block;
		width: 100%;
		height: 35px;
		line-height: 34px;
		font-size: 16px;
	}
	
	.office .search-content {
		padding-top: 50px;
	}
	
	.office .office-phone {
		margin-left: 10px;
		color: #2db7f5 !important;
	}
	
	.van-collapse-item__title {
		position: relative;
	}
	
	.office-num {
		position: absolute;
		top: -50px;
		z-index: 999;
	}
	.member_content .van-collapse {
		padding-bottom:0;
		margin-top:30px;
	}
	.office-list-content .van-collapse-item__content {
		margin: 5px 10px 20px;
	}
	.office-list-content {
		margin: 0;
		padding:0;
	}
</style>
