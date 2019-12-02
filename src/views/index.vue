<template>
	<div id="index">
		<transition name="fade">
			<router-view class="child-view"></router-view>
		</transition>
	</div>
</template>

<script>
	// import MtaH5 from 'mta-h5-analysis'
	import animate from 'animate.css'
	export default {
		name: "index",
		data() {
			return {
				transitionName: "",
				role: "",
				typeList: ["行政", "商务", "执行"],
			};
		},
		created() {
			// alert(123)
			// this.findUser();
			let _this = this;
			let role = localStorage.getItem('role')
			if (
				role == "underfind" ||
				role == "" ||
				role == null ||
				role == "null"
			) {
				_this.$router.replace({
					name: "login"
				});
			} else {
				if (
					_this.uncompileStr(role).split("&&")[0] == _this.typeList[0]
				) {
					_this.$router.replace({
						name: "administration"
					});
				} else if (
					_this.uncompileStr(role).split("&&")[0] == _this.typeList[1]
				) {
					_this.$router.replace({
						name: "commercial"
					});

				} else if (
					_this.uncompileStr(role).split("&&")[0] == _this.typeList[2]
				) {
					_this.$router.replace({
						name: "execute"
					});
				} else {
					_this.$router.replace({
						name: "login"
					});
				}
			}
		},
		methods: {
			findUser() {
				let role = localStorage.getItem("role");
				let _this = this;
				var params = new URLSearchParams();
				params.append("user_phone", this.uncompileStr(role).split("&&")[1]);
				_this.$axios({
						url: "/getsearchuser",
						method: "post",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						data: params
					})
					.then(res => {
						if (res.data.errcode == 0) {
							if (res.data.msg == 1) {
								_this.role = role;
								if (
									role == "underfind" ||
									role == "" ||
									role == null ||
									role == "null"
								) {
									_this.$router.replace({
										name: "login"
									});
								} else {
									if (
										_this.uncompileStr(role).split("&&")[0] == _this.typeList[0]
									) {
										_this.$router.replace({
											name: "administration"
										});
									} else if (
										_this.uncompileStr(role).split("&&")[0] == _this.typeList[1]
									) {
										_this.$router.replace({
											name: "commercial"
										});

									} else if (
										_this.uncompileStr(role).split("&&")[0] == _this.typeList[2]
									) {
										_this.$router.replace({
											name: "execute"
										});
									} else {
										_this.$router.replace({
											name: "login"
										});
									}
								}
							} else {
								_this.$router.replace({
									name: "login"
								});
							}
						}
					})
					.catch(() => {});
			},
			uncompileStr(code) {
				code = unescape(code);
				var c = String.fromCharCode(code.charCodeAt(0) - code.length);
				for (var i = 1; i < code.length; i++) {
					c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
				}
				return c;
			},
			compileStr(code) {
				var c = String.fromCharCode(code.charCodeAt(0) + code.length);
				for (var i = 1; i < code.length; i++) {
					c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
				}
				return escape(c);
			}
		}
		// beforeRouteEnter(to, from, next) {
		// 	let _this = this;
		// 	let path = to.path;
		// 	var role = localStorage.getItem('role')
		// 	if (
		// 		role == "underfind" ||
		// 		role == "" ||
		// 		role == null ||
		// 		role == "null"
		// 	) {
		// 		// _this.$router.replace({
		// 		// 	name: "login"
		// 		// });
		// 		next('/login')
		// 	} else {
		// 		if (
		// 			uncompileStr(role).split("&&")[0] == '行政'
		// 		) {
		// 			// _this.$router.replace({
		// 			// 	name: "administration"
		// 			// });
		// 			next('/administration')
		// 		} else if (
		// 			uncompileStr(role).split("&&")[0] == '商务'
		// 		) {
		// 			// _this.$router.replace({
		// 			// 	name: "commercial"
		// 			// });
		// 			next('/commercial')

		// 		} else if (
		// 			uncompileStr(role).split("&&")[0] == '执行'
		// 		) {
		// 			// _this.$router.replace({
		// 			// 	name: "execute"
		// 			// });
		// 			next('/execute')
		// 		} else {
		// 			// _this.$router.replace({
		// 			// 	name: "login"
		// 			// });
		// 			next('/login')
		// 		}
		// 	}
		// 	function uncompileStr(code) {
		// 		code = unescape(code);
		// 		var c = String.fromCharCode(code.charCodeAt(0) - code.length);
		// 		for (var i = 1; i < code.length; i++) {
		// 			c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
		// 		}
		// 		return c;
		// 	}
		// }
	};
</script>

<style scoped>
	.fade-enter-active,
	.fade-leave-active {
		transition: all 0.4s ease;
	}

	.fade-enter {
		/*//进入时的动画*/
		transform: translateX(80%);
		opacity: 0;
	}

	.fade-leave-active {
		/*//离开时的动画*/
		transform: translateX(-30%);
		opacity: 0;
	}
</style>
