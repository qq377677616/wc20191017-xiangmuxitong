<template>
    <div :class="['login',
    {'marTop':marTop}]">
        <div class="login-descript">
            <div><span>登录</span></div>
            <div><span>使用手机验证码登录</span></div>
        </div>
        <div class="login-form">
            <div class="login-box login-name">
                <i class="icon-login iconfont icon-yonghu"></i>
                <input v-model="userInfo.username" class="login-input"
                       @blur="scrollChange" @focus="addTop" type="tel" placeholder="手机号" maxlength="11">
                <i class="iconfont icon-Group-1 login-delete" v-show="userInfo.username != ''" @click="clearName"></i>
            </div>
            <div class="login-box login-code">
                <i class="icon-login iconfont icon-suo"></i>
                <input v-model="userInfo.code" class="login-input" type="tel"
                       @blur="scrollChange" @focus="addTop" placeholder="验证码" maxlength="6">
                <i class="iconfont icon-Group-1 login-delete" v-show="userInfo.code != ''" @click="clearCode"></i>
                <div class="send-code">
                    <span  class="send-title" @click="send">
                        <span v-show="show">发送验证码</span>
                        <span v-show="!show">{{time}}</span>
                    </span>
                </div>
            </div>
            <div class="login-submit">
                <el-button type="primary" class="btn-submit" @click.native="login">登录</el-button>
            </div>
        </div>
        <van-loading v-show="loading" class="loading"/>
    </div>
</template>

<script>
    export default {
        name: "app",
        data(){
            return {
                typeList : ['行政','商务','执行'],
                userTitle : '用户ID',
                userInfo : {
                    username : '',
                    code : ''
                },
                show : true,
                total : 59,
                time : '59s',
                userList : [{
                    id : 211,
                    username : 18888888888,
                    code: 123456,
                    type : 0
                },{
                    id : 212,
                    username : 19999999999,
                    code: 123456,
                    type : 1
                },{
                    id : 213,
                    username : 16666666666,
                    code: 123456,
                    type : 2
                }],
                loading : false,
                marTop : false
            }
        }
        ,
        mounted () {
        },
        methods : {
            addTop(){
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                // var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(isAndroid) {
                    this.marTop = true
                }
            },
            scrollChange(){
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(isiOS){
                    let Index = document.getElementById('index')
                    Index.scrollIntoView()
                }else if(isAndroid){
                    this.marTop = false
                }
            },
            send() {
                if(this.show) {
                    if(this.userInfo.username == ''){
                        this.$toast({
                            message:'手机号不能为空！',
                            duration : 1000
                        })
                        return;
                    }
                    this.sendCode();
                    this.show = false
                    this.countDown()
                }
            },
            countDown() {
                let clock = window.setInterval(() => {
                    this.total --
                    this.time = this.total + 's'
                    if(this.total == 0){
                        this.show = true
                        this.time = '59s'
                        this.total = 59
                        window.clearInterval(clock)
                    }
                },1000)
            },
            login(){
                if(this.userInfo.username == ''){
                    this.$toast({
                        message:'手机号不能为空！',
                        duration : 1000
                    })
                    return;
                }
                if(this.userInfo.code == ''){
                    this.$toast(
                    {
                        message:'验证码不能为空！',
                        duration : 1000
                    })
                    return;
                }
                this.loginSend();
                // this.userList.forEach((item,index)=>{
                //     if(this.userInfo.username == item.username){
                //         if(this.userInfo.code == item.code){
                //             localStorage.setItem('role',this.compileStr(this.typeList[index]+"&&"+this.userInfo.username+""))
                //             // localStorage.setItem('role',this.compileStr(this.typeList[item.type]))
                //             if(index == 0){
                //                 this.$router.replace({name:'administration'})
                //             }else if(index ==1) {
                //                 this.$router.replace({name:'commercial'})
                //             }else if(index == 2){
                //                 this.$router.replace({name:'execute'})
                //             }
                //             return;
                //         }
                //         this.$toast(
                //             {
                //                 message:'验证码错误！',
                //                 duration : 1000
                //             })
                //         return;
                //     }
                // })
            },
            sendCode(){
                var params = new URLSearchParams();
                let name = this.userInfo.username
                params.append("user_phone",name);
                let _this = this;
                _this.$axios({
                    url: '/request_phone_code',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data : params
                }).then((res)=>{
                        if(res.data.errcode == 0){
                            _this.$toast(
                                {
                                    message:""+res.data.msg+"!",
                                    duration : 1000
                                })
                        }else {
                            _this.$toast(
                                {
                                    message:""+res.data.msg+"!",
                                    duration : 1000
                                })
                        }
                }).catch(()=>{
                    _this.$toast(
                        {
                            message:"请求失败!",
                            duration : 1000
                        })
                })
            },
            loginSend(){
                var params = new URLSearchParams();
                let name = this.userInfo.username
                let code = this.userInfo.code
                params.append("user_phone",name);
                params.append("yzm",code);
                let ifcs = false;
                let Index = 0;
                let _this = this;
                let nowId = 0;
                _this.userList.some((item,index)=>{
                    if(item.username == name && item.code == 123456){
                        ifcs = true;
                        Index = index;
                        nowId = item.id
                    }
                })
                if(ifcs) {
                    localStorage.setItem('id',_this.compileStr(_this.userTitle+"&&"+_this.userList[Index].id+""))
                    localStorage.setItem('role',this.compileStr(_this.typeList[Index]+"&&"+_this.userInfo.username+""))
                    // localStorage.setItem('role',this.compileStr(this.typeList[item.type]))
                    if(Index == 0){
                        localStorage.setItem('type',1)
                        _this.$router.replace({name:'administration'})
                    }else if(Index ==1) {
                        localStorage.setItem('type',3)
                        _this.$router.replace({name:'commercial'})
                    }else if(Index == 2){
                        localStorage.setItem('type',5)
                        _this.$router.replace({name:'execute'})
                    }
                    return;
                }else {
                    _this.$axios({
                        url: '/login',
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data : params
                    }).then((res)=>{
                        if(res.data.errcode == 0){
                            setTimeout(()=>{
                                _this.loading = false;
                                let type = res.data.data.bm_type
                                localStorage.setItem('id',_this.compileStr(_this.userTitle+"&&"+res.data.data.id+""))
                                localStorage.setItem('type',type)
                                if(type == 1){
                                    localStorage.setItem('role',_this.compileStr(_this.typeList[0]+"&&"+res.data.data.user_phone+""))
                                    _this.$router.replace({name:'administration'})
                                }else if(type ==3 || type == 4 || type == 8) {
                                    localStorage.setItem('role',_this.compileStr(_this.typeList[1]+"&&"+res.data.data.user_phone+""))
                                    _this.$router.replace({name:'commercial'})
                                }else if(type == 2 || type == 5 || type == 6 || type == 7){
                                    localStorage.setItem('role',_this.compileStr(_this.typeList[2]+"&&"+res.data.data.user_phone+""))
                                    _this.$router.replace({name:'execute'})
                                }
                            },500)

                        }else {
                            _this.$toast(
                                {
                                    message:""+res.data.msg+"",
                                    duration : 1000
                                })
                        }
                    }).catch(()=>{
                        setTimeout(()=>{
                            this.loading = false
                            setTimeout(()=>{
                                this.$toast({
                                    message : "请求失败!",
                                    duration : 1000
                                })
                            },500)
                        },500)
                    })
                }
            },
            clearName(){
                this.userInfo.username = ''
            },
            clearCode(){
                this.userInfo.code = ''
            },
            compileStr(code){
                var c=String.fromCharCode(code.charCodeAt(0)+code.length);
                for(var i=1;i<code.length;i++){
                    c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
                }
                return escape(c);
          }

        },
        created() {
            let _this = this;
            document.onkeydown = function() {
                let key = window.event.keyCode;
                if (key == 13) {
                    _this.login();
                }
            };
        }
    }
</script>

<style scoped>
    html,body {
        background-color:#fff;
    }
    .login {
        padding:0 25px;
        box-sizing: border-box;
        width: 100%;
        height:100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background: #fff;
    }
    .login-descript >div:nth-child(1) span{
        font-size: 24px;
        font-weight: 600;
        letter-spacing: 2px;
    }
    .login-descript >div:nth-child(2) {
        margin-top:10px;
    }
    .login-descript >div:nth-child(2) span{
        color:#666;
        font-size: 14px;
    }
    .login-form {
        margin-top:30px;
    }
    .login-submit {
        margin-top:100px;
        width: 100%;
        padding:10px;
        box-sizing: border-box;
    }
    .login-submit > .btn-submit {
        width: 100%;
    }
    .login-submit .el-button {
        padding:10px 20px;
    }
    .btn-send {
        color:#3a8ee6;
        background: #fff;
        border: none;
    }

    .icon-login {
        color:#409EFF;
    }
    .login-box {
        padding:10px 0;
        border-bottom:1px solid #b1b1b1;
        position: relative;
    }
    .login-code{
        margin-top:20px;
    }
    .login-input {
        border: none;
        outline: none;
        padding:0px 10px;

    }
    .login-name .login-input {
        width: 95%;
        box-sizing: border-box;
    }
    .login-code .login-input {
        width: 65%;
        box-sizing: border-box;
    }
    .login-delete {
        color: #dddddd;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right:100px;
        cursor: pointer;
    }
    .login-code {
        position: relative;
    }
    .send-code {
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 14px;
        color:#1989f8;
    }
    .send-code .send-title {
        position: relative;
        cursor: pointer;
    }
    .send-code .send-title:before {
        content: '';

        height:1em;
        display: inline-block;
        background: #dddddd;
        width: 1px;
        position: absolute;
        left:0;
        top:50%;
        transform: translateY(-50%);
    }
    .send-title span {
        display: inline-block;
        width:80px;
        margin-left:10px;
        text-align: center;
    }
    .marTop {
        padding-top:300px;
        padding-bottom:300px;
    }
</style>
