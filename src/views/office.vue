<template>
	<div class="office page-show" v-if="showOffice" v-cloak>
		<div class="wc-page-top">
			<div class="top-name">
				<div class="top-close iconfont icon-zuojiantou" @click="backLast"><span>返回</span></div>
				<div class="top-title">职员列表</div>
			</div>
		</div>
		<div class="search-content">
			<el-input @click.native="inputClick($event)" placeholder="请输入中文关键字" v-model="search" @blur="scrollChange" clearable>
			</el-input>
			<el-button class="search" @click.native="Search">搜索</el-button>
		</div>
		<van-collapse v-model="activeName" accordion>
			<van-collapse-item v-for="(Item,Index) in BranchList" :title="Item.branch" :value="Item.personList.length" class="office-list-content"
			 :key="Index" :name="Index" :disabled="Item.personList ==''">
				<div class="office-list">
					<div class="office-info" v-for="(personItem,personIndex) in Item.personList" :key="personIndex">
						<div class="office-name">
							<span>{{personItem.name }}</span><span class="office-phone">
								{{personItem.user_phone}}
								<!--                                <a :href="'tel:'+(personItem.user_phone)">{{personItem.user_phone}}</a>-->
							</span>
						</div>
						<div>
							<van-icon name="delete" color="red" size="20px" @click.native="deletePerson(personItem.id)" />
						</div>
					</div>
				</div>
			</van-collapse-item>
		</van-collapse>
		<div class="van-submit-box main-submit-box">
			<van-button type="info" class="van-submit" @click.native="showPopup">添加职员</van-button>
			<Footer></Footer>
		</div>
		<el-dialog class="office_dialog" :visible.sync="dialogFormVisible" :append-to-body='true'>
			<el-form ref="form" label-width="80px">
				<el-form-item label="职员姓名">
					<el-input @click.native="inputClick($event)" v-model="personInfo.name" @blur="scrollChange" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="手机号码">
					<el-input @click.native="inputClick($event)" v-model="personInfo.phone" @blur="scrollChange" placeholder="请输入手机号码"
					 type="tel" maxlength="11"></el-input>
				</el-form-item>
				<el-form-item label="职员岗位">
					<el-select v-model="personInfo.post" placeholder="请选择岗位">
						<el-option v-for="item in postList" :key="item.id" :value="item.design">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item class="sure-add-form">
					<el-button type="primary" class="sure-add" @click.native="addPerson">确定添加</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<van-loading v-show="loading" class="loading" />

	</div>
</template>

<script>
	import qs from 'qs'
	export default {
		name: "app",
		data() {
			return {
				activeName: '0',
				personInfo: {
					name: '',
					post: '',
					phone: ''
				},
				show: false,
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
				}],
				showPost: false,
				showOffice: false,
				dialogTableVisible: false,
				dialogFormVisible: false,
				branchIndex: 0,
				loading: false,
				search: ''
			};
		},
		components: {
			Footer: () => import('components/footer.vue'),
		},
		methods: {
			inputClick(e) {
				e.target.focus();
				// e.currentTarget.focus();
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
						message: '请求失败!',
						duration: 1000
					})
				})
			},
			scrollChange() {
				let Index = document.getElementById('index')
				Index.scrollIntoView()
			},
			deletePerson(id) {
				this.$confirm('此操作将永久删除该职员, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.deleteAjax(id);
				}).catch(() => {

				});
			},
			showPopup() {
				this.personInfo = {
					name: '',
					post: '',
					phone: ''
				}
				this.dialogTableVisible = true;
				this.dialogFormVisible = true;
			},
			ChangePost(value) {
				this.personInfo.post = value;
				this.showPost = false;
			},
			backLast() {
				// this.showOffice = false
				this.$router.replace({
					name: 'administration'
				})
			},
			addPerson() {
				if (this.personInfo.name == '') {
					this.$toast({
						message: '名字不能为空！',
						duration: 1000
					});
					return;
				}
				if (this.personInfo.phone == '') {
					this.$toast({
						message: '电话不能为空！',
						duration: 1000
					});
					return;
				}
				if (!(/^1[3456789]\d{9}$/.test(this.personInfo.phone))) {
					this.$toast({
						message: '手机号码有误!',
						duration: 1000
					});
					return false;
				}
				let Index = ''
				this.postList.forEach((item) => {
					if (this.personInfo.post == item.design) {
						Index = item.id
					}
				})
				var params = new URLSearchParams();
				params.append("user_name", this.personInfo.name);
				params.append("user_phone", this.personInfo.phone);
				params.append("user_depar", this.personInfo.post);
				params.append("bm_type", Index);
				this.dialogFormVisible = false
				this.dialogTableVisible = false
				this.addAjax(params)
			},
			addAjax(params) {
				let _this = this;
				_this.loading = true;
				this.$axios({
					url: '/getAdmin',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					if (res.data) {
						setTimeout(() => {
							_this.loading = false;
							setTimeout(() => {
								_this.$toast({
									message: '添加成功!',
									duration: 1000
								});
								_this.findPerson();
							}, 500)
						}, 500)
					} else {
						setTimeout(() => {
							_this.loading = false;
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
						this.loading = false
						setTimeout(() => {
							this.$toast({
								message: "请求失败!",
								duration: 1000
							})
						}, 500)
					}, 500)
				})
			},
			deleteAjax(id) {
				var params = new URLSearchParams();
				params.append("id", id);
				let _this = this;
				// _this.loading = true;
				const loading = this.openLoading();
				_this.$axios({
					url: '/getdel',
					method: 'post',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: params
				}).then((res) => {
					if (res.data) {
						setTimeout(() => {
							// _this.loading = false;
							loading.close();
							setTimeout(() => {
								_this.$toast({
									message: '删除成功!',
									duration: 1000
								});
								_this.findPerson();
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
						// this.loading = false
						loading.close();
						setTimeout(() => {
							this.$toast({
								message: "请求失败!",
								duration: 1000
							})
						}, 500)
					}, 500)
				})
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
					_this.BranchList.forEach((item) => {
						item.personList = []
					})
					if (res.data) {
						res.data.data.forEach((item) => {
							if (item.bm_type >= 1) {
								_this.addList(item.id, item.user_name, item.bm_type - 1, item.user_phone)
							}
						})
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
			}
		},
		created() {
			this.loading = true;
			this.findPerson()
			this.loading = false;
		},
		mounted() {
			this.showOffice = true
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

<style scoped>
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
		color: #2db7f5;
	}

	.van-collapse-item__title {
		position: relative;
	}

	.office-num {
		position: absolute;
		top: -50px;
		z-index: 999;
	}
</style>
