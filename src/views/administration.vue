<template>
    <div id="administration">
        <div class="wc-page-top">
            <div class="top-name">
                <div class="top-close iconfont icon-Group-" @click="toLogin"><span>退出登录</span></div>
                <div class="top-title">网晨项目管理系统-行政端</div>
                <div class="project-num" v-html="projectList.length"></div>
            </div>
        </div>


        <div class="wc-page-content">

            <div class="search-content">
                <el-input
                        placeholder="请输入中文关键字"
                        v-model="search"
                        @blur="scrollChange"
                        clearable>
                </el-input>
                <el-button class="search" @click.native="Search">搜索</el-button>
            </div>
            <div class="statistics">
				<div class="output" @click="toOutput()">导出</div>
                <div class="statistics_box" v-for="(statistItem, statistIndex) in colorList" :key="statistIndex">
                    <div :class="[{'icon-money':true}]" :style="{backgroundColor : statistItem.color }"  ></div>
                    <span v-html="statistItem.num"></span>
                </div>
            </div>
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list v-model="loadingcontent" :finished="finished" @load="onLoad">
                    <!-- 加载的内容-->
                    <div class="project-card-box" v-for="(projectItem,projectIndex) in projectList" :key="projectIndex">
                        <div class="project-card" @click.stop="showProject(projectItem.id,$event,projectIndex,projectItem.checked)">
                            <div class="card-top">
                                <div :class="[{'icon-dot':true}]" :style="{backgroundColor : colorSelect(projectItem.price)}"></div>
                                <div class="card-top-left" v-html="projectItem.pro_name">
                                </div>
                                <div class="card-top-right">
                                    <span class="card-left-type">销售:</span><span v-html="projectItem.sale_name"></span>
                                    <span class="card-right-type">策划:</span><span v-html="projectItem.plan_name"></span>
                                </div>
                            </div>
                            <div class="card-bottom">
                                <div class="card-bottom-left">
                                    <span class="setting-time-title">立项时间:</span><span class="setting-time" v-html="projectItem.lix_time"></span>
                                </div>
                                <div class="card-bottom-right">
                                    <span class="up-time-title">上线时间:</span><span class="up-time" v-html="projectItem.shangx_time"></span>
                                </div>
                                <div class="actual-line-time">
                                    <span class="up-time-title">实际上线时间:</span><span class="up-time" v-html="projectItem.creat_time"></span>
                                </div>
                            </div>
                        </div>
                        <div :class="{'type-wrapper':true,'showframe':projectItem.checked}" v-show="projectItem.checked">
                            <div class="type-wrapper-list-details">
                                <div class="type-wrapper-container" v-if="sjProject.nameList != ''">
                                    <div class="type">
                                        <div class="type-top">
                                            <span>设计</span>
                                            <div class="type-bottom-name">
                                     <span class="type-name-title" v-for="(sjItem,sjIndex) in sjProject.nameList" :key="sjIndex">
                                        <span v-html="sjItem.zx_name"></span>
                                     </span>
                                            </div>


                                        </div>
                                        <div class="info">
                                            <span>销售评分:</span>
                                            <span v-html="sjProject.score"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="type-wrapper-container" v-if="cpProject.nameList != ''">
                                    <div class="type">
                                        <div>
                                            <span>产品</span>
                                            <!--<div class="name">-->
                                            <!--<span></span>-->
                                            <!--</div>-->
                                            <div class="type-bottom-name">
                                     <span class="type-name-title" v-for="(cpItem,cpIndex) in cpProject.nameList" :key="cpIndex">
                                        <span v-html="cpItem.zx_name"></span>
                                    </span>
                                            </div>
                                        </div>
                                        <div class="info">
                                            <span>销售评分:</span>
                                            <span v-html="cpProject.score"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="type-wrapper-container" v-if="qdProject.nameList != ''">
                                    <div class="type">
                                        <div>
                                            <span>前端</span>
                                            <!--<div class="name">-->
                                            <!--<span></span>-->
                                            <!--</div>-->
                                            <div class="type-bottom-name">
                                        <span class="type-name-title" v-for="(qdItem,qdIndex) in qdProject.nameList" :key="qdIndex">
                                        <span style="display: block" v-html="qdItem.zx_name"></span>
                                    </span>
                                            </div>

                                        </div>
                                        <div class="info">
                                            <span>销售评分:</span>
                                            <span v-html="qdProject.score"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="type-wrapper-container" v-if="hdProject.nameList != ''">
                                    <div class="type">
                                        <div>
                                            <span>后端</span>
                                            <!--<div class="name">-->
                                            <!--<span></span>-->
                                            <!--</div>-->

                                            <div class="type-bottom-name">
                                        <span class="type-name-title" v-for="(hdItem,hdIndex) in hdProject.nameList" :key="hdIndex">
                                        <span v-html="hdItem.zx_name">
                                        </span>
                                    </span>
                                            </div>
                                        </div>
                                        <div class="info">
                                            <span>销售评分:</span>
                                            <span v-html="hdProject.score"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="type-wrapper-container" v-if="csProject.nameList != ''">
                                    <div class="type">
                                        <div>
                                            <span>测试</span>
                                            <!--<div class="name">-->
                                            <!--<span></span>-->
                                            <!--</div>-->
                                            <div class="type-bottom-name">
                                        <span class="type-name-title" v-for="(csItem,csIndex) in csProject.nameList" :key="csIndex">
                                        <span style="display: block" v-html="csItem.zx_name"></span>
                                    </span>
                                            </div>

                                        </div>
                                        <div class="info">
                                            <span>销售评分:</span>
                                            <span v-html="qdProject.score"></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="appraise-container" v-if="content">
                                    <div class="info-appraise">
                                        <span v-html="content"></span>
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
            <van-button type="info" class="add-submit" @click="toOffice">职员列表</van-button>
        </div>
        <van-popup v-model="show" class="main-popup">
            <div class="modal-form">
                <van-cell-group>
                    <van-field
                            v-model="personInfo.name"
                            clearable
                            label="职员姓名"
                            placeholder="请输入姓名"
                            @blur="scrollChange"
                    />
                    <van-field
                            v-model="personInfo.phone"
                            clearable
                            label="手机后四位"
                            placeholder="请输入手机后四位"
                            @blur="scrollChange"
                    />
                    <van-field
                            readonly
                            clickable
                            label="职员岗位"
                            :value="personInfo.post"
                            placeholder="请输入岗位"
                            @click="showPost = true"
                    />
                    <div class="van-submit-box">
                        <van-button type="info" class="van-submit">确定添加</van-button>
                    </div>

                </van-cell-group>
                <van-icon class="close-popup" color="#fff" name="close" @click="hideModal" />
            </div>
        </van-popup>
        <van-loading v-show="loading" class="loading"/>
        <div class="nodata" v-show="projectList == ''">暂无数据</div>
    </div>
</template>
<script>
    import qs from 'qs'
    export default {
        name: "administration",
        data(){
            return {
                typeList : ['行政','商务','执行'],
                search : '',
                colorList :[{
                    color : 'green',
                    num : 0,
                    priceList : [{
                        title : '0-3W'
                    },{
                        title : '0-5W'
                    }]
                },{
                    color : 'blue',
                    num : 0,
                    priceList : [{
                        title : '3-8W'
                    },{
                        title : '5-10W'
                    }]
                },{
                    color : 'orange',
                    num : 0,
                    priceList : [{
                        title : '8-15W'
                    },{
                        title : '10-15W'
                    }]
                },{
                    color : 'red',
                    num : 0,
                    priceList : [{
                        title : '15W以上'
                    }]
                }],
                show: false,
                postList : ['前端工程师', '后端设计师', 'UI设计师', '销售专员', '产品经理'],
                showPost : false,
                personInfo : {
                    name : '',
                    post :  '',
                    phone : ''
                },
                showIndex : null,
                groupIndex : 0,
                personIndex : 0,
                    loading: false,
                    projectList : [],
                    projectDetails : {},
                    pid : 0,
                    nowIndex : 0,
                projectDetailList : [],
                content : '',
                sjProject : {
                    score : '',
                    nameList : []
                },
                cpProject : {
                    score : '',
                    nameList : []
                },
                qdProject : {
                    score : '',
                    nameList : []
                },
                hdProject : {
                    score : '',
                    nameList : []
                },
                csProject : {
                    score : '',
                    nameList : []
                },
                deviceList: [],//用于存放加载的数据
                totalPage: 0,
                pageNumber: 0,
                loadingcontent: false,//控制上拉加载的加载动画
                finished: false,//控制在页面往下移动到底部时是否调用接口获取数据
                isLoading: false,//控制下拉刷新的加载动画
                page : 1,
                canInit : true,
                dataNum : 0
            }
        },
        computed : {
            text(Rate) {
                return this.Rate.toFixed(0) + '%'
            },
            colorSelect(money) {
                return (money)=> {
                    let color = ''
                    if(money == '0-3W' || money == '0-5W'){
                        color = 'green'
                    }else if(money == '3-8W' || money == '5-10W') {
                        color = 'blue'
                    }else if(money == '8-15W' || money == '10-15W') {
                        color = 'orange'
                    }else if(money == '15W以上'){
                        color = 'red'
                    }
                    return color
                }
            }
        },
        mounted () {
            let type = localStorage.getItem('type');
            setTimeout(()=>{
                if(type==1){
                    MtaH5.clickStat("xz")
                }else if(type == 2){
                    MtaH5.clickStat("cp")
                }else if(type == 3){
                    MtaH5.clickStat("sw")
                }else if(type == 4){
                    MtaH5.clickStat("ch")
                }else if(type == 5){
                    MtaH5.clickStat("sj")
                }else if(type == 6 || type == 7){
                    MtaH5.clickStat("js")
                }else if(type == 8){
                    MtaH5.clickStat("zjb")
                }
            },1500)
        },
        methods : {
            toOutput(){
                // localStorage.setItem('xm_id',xm_id)
                this.$router.replace({name:'outschedule'})
            },
            Search(){
                let _this = this;
                let search = _this.search
                let data = {
                    keywords : search
                }
                if(search == ''){
                    this.$toast({
                        message : "请输入关键字!",
                        duration : 1000
                    })
                    return;
                }
                _this.loading = true;
                _this.$axios({
                    url: '/getSearchadmin',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data : qs.stringify(data)
                }).then((res)=>{
                    if(res.data.errcode == 0){

                        setTimeout(()=>{
                            if(res.data.data.length > 0){
                                this.finished = true;
                                this.canInit = false;
                                res.data.data.forEach((item)=>{
                                    item.checked = false;
                                    item.creat_time = this.ChangeDate(item.creat_time)
                                })
                                _this.isLoading = false;
                                _this.loading = false;
                                this.projectList = res.data.data
                            }else {
                                _this.isLoading = false;
                                _this.loading = false;
                                this.$toast({
                                    message : "暂无相关内容!",
                                    duration : 1000
                                })
                            }
                        },1000)
                    }else {
                        this.$toast({
                            message : ""+res.data.msg+"!",
                            duration : 1000
                        })
                    }
                }).catch(()=>{

                })
            },
            init() {
                let self = this;
                self.findList()
                self.isLoading = false; //关闭下拉刷新效果
                self.$toast({
                    message : '刷新成功！',
                    duration : 1000
                })
            },
            //下拉刷新
            onLoad() {      //上拉加载
                let self = this;
                if(this.canInit){
                    setTimeout(() => {
                        if( this.dataNum.length  - this.projectList.length <=8){
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
                this.canInit = false
                setTimeout(() => {
                    this.finished = false;
                    this.isLoading = false;
                    this.findList()
                }, 500);
            },
            scrollChange(){
                let Index = document.getElementById('index')
                Index.scrollIntoView()
            },
            showPopup() {
                this.show = true;
            },
            ChangePost(value) {
                this.personInfo.post = value;
                this.showPost = false;
            },
            hideModal(){
                this.show =false;
            },
            toOffice(){
                this.$router.replace({name:'office'})
            },
            showProject(index,e,pIndex,checked){
                e.preventDefault()
                let id = index
                let lastIndex = sessionStorage.getItem('lastShowIndex')
                    this.content = ''
                    this.projectDetailList = [];
                    this.hdProject.nameList = []
                    this.qdProject.nameList = []
                    this.cpProject.nameList = []
                    this.sjProject.nameList = []
                    this.csProject.nameList = []
                    this.findDetails(id)

                this.projectList.forEach((item,index)=>{
                    item.checked = false;
                    if(item.id == id){
                        item.checked = !checked;
                    }
                })
                this.projectList[pIndex].checked = !checked;
                sessionStorage.setItem('lastShowIndex',pIndex)
            },
            toLogin(){
                localStorage.setItem('role',"")
                this.$router.replace({name:'login'})
            },
            findList(){
                this.$axios({
                    url: '/geproxzlist',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).then((res)=>{
                    if(res.data.data){
                        this.finished = true;
                        this.canInit = false;
                        this.dataNum = res.data.data.length
                        let colorList = this.colorList
                        colorList.forEach((item)=>{
                            item.num = 0
                        })
                        res.data.data.forEach((item)=>{
                            colorList.forEach((cItem)=>{
                                let mount = cItem.priceList.some((priceItem)=>{
                                    return priceItem.title == item.price
                                })
                                if(mount) {
                                    cItem.num ++;
                                }
                            })
                        })
                        res.data.data.forEach((item)=>{
                            item.checked = false;
                            item.creat_time = this.ChangeDate(item.creat_time)
                        })
                        this.projectList = res.data.data
                    }
                }).catch(()=>{

                })
            },
            findListOne(){
                let data = {
                    page : this.page
                }
                this.$axios({
                    url: '/geproxzlist2',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data : qs.stringify(data)
                }).then((res)=>{
                    if(res.data) {
                        if(res.data.errcode == 0){
                            this.busy = false;
                            if(res.data.data){
                                res.data.data.forEach((item)=>{
                                    item.checked = false;
                                    item.creat_time = this.ChangeDate(item.creat_time)
                                })
                                let colorList = this.colorList
                                res.data.data.forEach((item)=>{
                                    colorList.forEach((cItem)=>{
                                        let mount = cItem.priceList.some((priceItem)=>{
                                            return priceItem.title == item.price
                                        })
                                        if(mount) {
                                            cItem.num ++;
                                        }
                                    })
                                })
                                this.colorList = colorList
                                console.log(this.page)
                                if(this.page == 0){
                                    this.projectList = res.data.data
                                }else {
                                    res.data.data.forEach((item)=>{
                                        this.projectList.push(item)
                                    })
                                    if(res.data.data.length < 8){
                                        this.isLoading = false;
                                    }

                                }
                            }
                        }else {
                            this.finished = true;
                            this.canInit = false;
                        }
                    }else {
                        this.finished = true;
                        this.canInit = false;
                    }
                }).catch(()=>{

                })
            },
            ChangeDate(d){
                var date = new Date(Date.parse(d.replace(/-/g, "/")));
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var Hours = date.getHours();
                var Minutes = date.getMinutes();
                // var Seconds = date.getSeconds();
                var seperator1 = '-'
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                if (Hours >= 0 && Hours <= 9) {
                    Hours = "0" + Hours;
                }
                if (Minutes >= 0 && Minutes <= 9) {
                    Minutes = "0" + Minutes;
                }
                var data = ''
                data=
                    year +
                    seperator1 +
                    month +
                    seperator1 +
                    strDate + ' ' + Hours + ":" + Minutes
                return data;
            },
            findDetails(id){
                var params = new URLSearchParams();
                params.append("eva_id",id);
                this.$axios({
                    url: '/geproxzdes',
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: params
                }).then((res)=>{
                    if(res.data){
                        let sjList = [],
                            qdList = [],
                            cpList = [],
                            hdList = [],
                            csList = []
                        this.projectDetailList = res.data.data
                        res.data.data.forEach((item)=>{
                            let data = {
                                zx_name : item.zx_name
                            }
                            if(item.zx_post == '设计'){
                                sjList.push(data)
                                this.sjProject.score = item.sorce
                            }else if(item.zx_post == '前端'){
                                qdList.push(data)
                                this.qdProject.score = item.sorce
                            }else if(item.zx_post == '产品'){
                                cpList.push(data)
                                this.cpProject.score = item.sorce
                            }else if(item.zx_post == '后端'){
                                hdList.push(data)
                                this.hdProject.score = item.sorce
                            }else if(item.zx_post == '测试'){
                                csList.push(data)
                                this.csProject.score = item.sorce
                            }
                        })
                        this.hdProject.nameList = hdList
                        this.qdProject.nameList = qdList
                        this.cpProject.nameList = cpList
                        this.sjProject.nameList = sjList
                        this.csProject.nameList = csList
                        this.content = res.data.data[0].m_center
                    }
                }).catch(()=>{
                })
            },
            uncompileStr(code){
                code = unescape(code);
                var c=String.fromCharCode(code.charCodeAt(0)-code.length);
                for(var i=1;i<code.length;i++){
                    c+=String.fromCharCode(code.charCodeAt(i)-c.charCodeAt(i-1));
                }
                return c;
            },
        },
        created() {
            let _this = this;
            let role = localStorage.getItem('role')
            if(role == 'underfind' || role == '' || role == null || role == 'null') {
                _this.$router.replace({name:'login'});
            }else {
                if(_this.uncompileStr(role).split('&&')[0] == _this.typeList[0]){
                    _this.$router.replace({name:'administration'});
                }else if(_this.uncompileStr(role).split('&&')[0] == _this.typeList[1]){
                    _this.$router.replace({name:'commercial'});
                }else if(_this.uncompileStr(role).split('&&')[0] == _this.typeList[2]){
                    _this.$router.replace({name:'execute'});
                }else {
                    _this.$router.replace({name:'login'});
                }
            }
            this.loading = true;
            // this.findListOne();
            this.loading = false;
            window.addEventListener('beforeunload', e => {
                sessionStorage.removeItem('lastShowIndex')
            });
        },destroyed() {
            sessionStorage.removeItem('lastShowIndex')
        }
    }
</script>

<style scoped lang="less">
.type {
    display: flex;
    padding:10px 10px;
    letter-spacing: 1px;
    font-size: 14px;

    >div {
        display: flex;
    }
    >div:nth-child(1) {
        width: 45%;

        >span:nth-child(1) {
            margin-right:10px;
            letter-spacing: 2px;
            color:#b1b1b1;
        }
    }

    > div:nth-child(1)
    .type > div:nth-child(2) {
        width: 70%;
    }
}
    .type-wrapper {
        background-color:#fff;
        margin:10px 15px;
        border-radius: 5px;
    }
    .rate {
        margin:15px 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: center;

        > div {
            margin-right:20px;
        }
    }
    .rate
    .type-kind {
        margin-top:5px;
        font-size:14px;

        span {
            letter-spacing: 1px;
        }
    }
    .rate-val {
        font-size:14px;
        span:nth-child(1) {
            margin-right:10px;
            letter-spacing: 1px;
        }
    }
    .rate-info {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-right:15px;
        padding-bottom:15px;

        .van-button {
            margin-left:10px;
            height:25px;
            line-height: 24px;
            letter-spacing: 1px;
        }
        .van-button--disabled {
            opacity: 1;
        }
    }
    .submit-box {
        display: block;
        /*margin:10px 25px;*/
        /*box-sizing: border-box;*/
        position: fixed;
        bottom: 0px;
        width: 100%;
        padding: 20px 25px;
        box-sizing: border-box;
        background: #f5f5f5;
    }
    .add-submit {
        font-size: 16px;
        letter-spacing: 1px;
        width: 100%;
        border-radius: 5px;
    }
    .main-popup {
        width: 80%;
        border-radius:5px;
        background: transparent;
    }
    .modal-form {
        position: relative;
        background: #ffffff;
        border-radius: 5px;
    }
    .main-popup .van-cell-group {
        border-radius: 5px;
        padding:20px 20px;
    }
    .time-picker {
        position: fixed;
        bottom:0px;
        width:100%;
        z-index: 9999;
    }
    .modal-form .van-cell {
        padding:20px 20px;
    }
    .van-cell:nth-child(1),.van-cell:last-child {
        margin:0px 0px;
    }
    .van-popup {
        overflow: initial;
    }
    .close-popup {
        color:#fff;
        font-size:30px;
        position: absolute;
        bottom:-45px;
        left:50%;
        z-index: 99999;
        transform: translate(-50%);
    }
    .van-submit-box {
        display: flex;
        margin-top: 20px;
        padding:0 45px;
        justify-content: center;
    }
    .van-submit {
        display: block;
        width: 100%;
        height:35px;
        line-height:34px;
        font-size: 16px;
    }
    .icon-dot {
        width: 10px;
        height:10px;
        border-radius: 50%;
        position: absolute;
    }
    .green {
        background: green;
    }
    .blue {
        background:blue
    }
    .red {
        background: red;
    }
    .orange {
        background : orange;
    }
    .card-top {
        position: relative;
    }
    .card-top-left {
        padding-left: 20px;
    }
    .info {
        width:70%;
        >span:nth-child(1) {
            color:#b1b1b1;
        }
        >span:nth-child(2) {
            color:#089ddf;
            margin-left:10px;
            letter-spacing: 0;
        }
    }
    .appraise-container {
        padding:10px 10px;
        color:#666;
        letter-spacing: 1px;
        font-size: 16px;
    }
    .info-score {
        border: none;
        width: 50px;
        color:#1989f8;
        margin-left:20px;
    }
    .type-bottom-name {
        display: inline-block;
    }
    .type-name-title {
        display: block;
        padding-bottom:2px;
        letter-spacing: 1px;
    }
	.output {
		padding: 5px 20px;
		background-color:#089ddf;
		border-radius:5px;
		color:#fff;
		cursor: pointer;
		margin-right:5px;
	}
</style>
