<template>
    <div class="content">
        <article v-for="(listItem,listIndex) in dataList" :key="listIndex" >
            <h3 v-html="listItem.plot"></h3>

<!--                <section>-->
<!--                    <span class="point-time point-yellow"></span>-->
<!--                    <time datetime="2019-07-20">-->
<!--                        <span v-html="listItem.startTime">2019-07-20</span>-->
<!--                    </time>-->
<!--                    <span class="point-time point-yellow"></span>-->
<!--                </section>-->

            <section v-for="(kindsItem, kindsIndex) in listItem.kinds" :key="kindsIndex">
                <div>
                    <span class="point-time point-yellow" :style="{'backgroundColor':colorList[kindsIndex]}"></span>
                    <time datetime="2019-07-20" >
                        <span v-html="kindsItem.startTime">2019-07-20</span>
                        <span class="cost" v-show="kindsItem.sign != ''">(5天) <span class="text-gray">(07-20,07-21,07-21,07-21,07-21,07-21,07-21,07-21)</span><br><span>为工作日</span></span>
                    </time>
                    <aside>
                        <p class="things" v-html="kindsItem.sign"></p>
                    </aside>
                    <span class="point-time point-yellow"></span>
                </div>
            </section>
<!--            <section v-for="(kindsItem, kindsIndex) in listItem.kinds" :key="kindsIndex">-->
<!--                <div>-->
<!--                    <span class="point-time point-yellow" :style="{'backgroundColor':colorList[kindsIndex]}"></span>-->
<!--                    <time datetime="2019-07-20" >-->
<!--                        <span v-html="kindsItem.endTime">2019-07-20</span>-->
<!--                        <span class="cost" v-show="kindsItem.sign != ''">(5天) <span class="text-gray">(07-20,07-21,07-21,07-21,07-21,07-21,07-21,07-21)</span><br><span>为工作日</span></span>-->
<!--                    </time>-->
<!--                    <aside>-->
<!--                        <p class="things" v-html="kindsItem.sign"></p>-->
<!--                    </aside>-->
<!--                    <span class="point-time point-yellow"></span>-->
<!--                </div>-->
<!--            </section>-->


<!--                    <section >-->
<!--                        <div>-->
<!--                            <span class="point-time point-yellow"></span>-->
<!--                            <time datetime="2019-07-20" >-->
<!--                                <span v-html="kindsItem.endTime">2019-07-20</span>-->
<!--                                <span class="cost" v-show="kindsItem.sign != ''">(5天) <span class="text-gray">(07-20,07-21,07-21,07-21,07-21,07-21,07-21,07-21)</span><br><span>为工作日</span></span>-->
<!--                            </time>-->
<!--                            <aside>-->
<!--                                <p class="things" v-html="kindsItem.sign"></p>-->
<!--                            </aside>-->
<!--                            <span class="point-time point-yellow"></span>-->
<!--                        </div>-->
<!--                    </section>-->



<!--                <section>-->
<!--                    <span class="point-time point-yellow"></span>-->
<!--                    <time datetime="2019-07-20">-->
<!--                        <span v-html="listItem.endTime">2019-07-20</span>-->
<!--                    </time>-->
<!--                    <span class="point-time point-yellow"></span>-->
<!--                </section>-->

<!--                <section v-for="(kindsItem, kindsIndex) in listItem.kinds" :key="kindsIndex">-->
<!--                    <span class="point-time point-yellow"></span>-->
<!--                    <time datetime="2019-07-20" v-if="(kindsIndex+1) != listItem.kinds.length">-->
<!--                        <span v-html="kindsItem.startTime">2019-07-20</span>-->
<!--                        <span class="cost">(5天) <span class="text-gray">(07-20,07-21,07-21,07-21,07-21,07-21,07-21,07-21)</span><br><span>为工作日</span></span>-->
<!--                    </time>-->
<!--                    <aside>-->
<!--                        <p class="things" v-html="kindsItem.sign"></p>-->
<!--                    </aside>-->
<!--                    <span class="point-time point-yellow"></span>-->
<!--                </section>-->

        </article>


        <el-dialog :visible.sync="dialogFormVisible" :append-to-body='true'>
            <el-form ref="form" label-width="80px">
                <el-form-item label="类别">
                    <el-select v-model="kind" placeholder="请选择">
                        <el-option
                                v-for="item in kinds"
                                :key="item.id"
                                :value="item.sign">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click.native="sureAdd">确定添加</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "app",
        data () {
            return {
                dialogFormVisible : false,
                kind : '',
                colorList : ['#F4B084','#f8c8ad','#c6e0b4','#c9c9c9','#9bc2e6','#ffd966','#ed7d31','#c65911'],
                kinds : [{
                    id : 0,
                    sign : '首页确定'
                },{
                    id : 1,
                    sign : '设计制作阶段'
                },{
                    id : 2,
                    sign : '设计确认'
                },{
                    id : 3,
                    sign : '后期动效制作'
                },{
                    id : 4,
                    sign : '后端开发'
                },{
                    id : 5,
                    sign : '前端开发',
                },{
                    id : 6,
                    sign : '测试',
                },{
                    id : 7,
                    sign : '提审',
                }],
                dataList : [{
                    id : 0,
                    plot : '设计',
                    startTime : '2019-07-20',
                    endTime : '2019-08-06',
                    kinds : [{
                        id : 0,
                        sign : '首页确定',
                        startTime : '2019-07-20',
                        endTime : '2019-07-25',
                    },{
                        id : 1,
                        sign : '设计制作阶段',
                        startTime : '2019-07-25',
                        endTime : '2019-07-30'
                    },{
                        id : 2,
                        sign : '设计确认',
                        startTime : '2019-07-30',
                        endTime : '2019-08-06'
                    }]
                },{
                    id : 1,
                    plot : '后期动效制作',
                    startTime : '2019-08-06',
                    endTime : '2019-08-10',
                    kinds : [{
                        id : 1,
                        sign : '后期动效制作',
                        startTime : '2019-08-06',
                        endTime : '2019-08-10',
                    }]
                },{
                    id : 2,
                    plot : '技术开发阶段',
                    startTime : '2019-08-11',
                    endTime : '2019-08-20',
                    kinds : [{
                        id : 1,
                        sign : '前端开发阶段',
                        startTime : '2019-08-12',
                        endTime : '2019-08-20',
                    },{
                        id : 2,
                        sign : '后端开发阶段',
                        startTime : '2019-08-13',
                        endTime : '2019-08-18',
                    }]
                },{
                    id : 4,
                    plot : '测试',
                    startTime : '2019-08-19',
                    endTime : '2019-08-20',
                    kinds : [{
                        id : 1,
                        sign : '测试',
                        startTime : '2019-08-19',
                        endTime : '2019-08-20',
                    }]
                },{
                    id : 5,
                    plot : '提审',
                    startTime : '2019-08-20',
                    endTime : '2019-08-21',
                    kinds : [{
                        id : 1,
                        sign : '提审',
                        startTime : '2019-08-20',
                        endTime : '2019-08-21',
                    }]
                }]
            }
        },created() {
            this.dataList.forEach((item)=>{
                let obj = new Object()
                obj.sign = ''

                item.kinds.forEach((kindsItem)=>{
                    obj.startTime = kindsItem.endTime
                    obj.timeList = this.getDayAll(kindsItem.startTime,kindsItem.endTime)
                })
                item.kinds.push(obj)
            })
        },
        methods : {
            getDayAll(begin,end){
                var dateAllArr = new Array();
                var ab = begin.split("-");
                var ae = end.split("-");
                var db = new Date();
                db.setUTCFullYear(ab[0], ab[1]-1, ab[2]);
                var de = new Date();
                de.setUTCFullYear(ae[0], ae[1]-1, ae[2]);
                var unixDb=db.getTime();
                var unixDe=de.getTime();
                let time = []
                for(var k=unixDb;k<=unixDe;){
                    if((new Date(parseInt(k))).getDay() < 6 && (new Date(parseInt(k))).getDay() != 0){
                        let date = {

                        }
                        date.time = ((new Date(parseInt(k))).getMonth()+1) +"-"+ (new Date(parseInt(k))).getDate()
                        var xq = '日一二三四五六'.charAt((new Date(parseInt(k))).getDay());
                        date.xq = xq
                        // date.
                        time.push(date)
                    }
                    k=k+24*60*60*1000;
                }
                return time;
            },
            DayChange(d){
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
                data=
                    date.getFullYear() +
                    seperator1 +
                    month +
                    seperator1 +
                    strDate
                return data;
            },
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    article,section,time,aside{display:block;}

    body {
        color: #9f9f9f;
        background: #fff;
        font-size: 1.16em;
        font-family: 'Lato', Calibri, Arial, sans-serif;
    }

    .point-time {
        content: "";
        position: absolute;
        width: 13px;
        height: 13px;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background: #1c87bf;
        margin-left: -4px;
        border-radius: 50%;
        box-shadow: 0 0 0 5px #fff;
    }

    .text-red {
        color: #f6393f;
    }

    .text-blue {
        color: #1c87bf;
    }

    .text-green {
        color: #95c91e;
    }

    .text-yellow {
        color: #ffb902;
    }
    .text-gray {
        color:#aaa;
    }
    .text-purple {
        color: #d32d93;
    }

    .point-red {
        background-color: #f6393f;
    }

    .point-blue {
        background-color: #1c87bf;
    }

    .point-green {
        background-color: #95c91e;
    }

    .point-yellow {
        background-color: #ffb902;
    }

    .point-purple {
        background-color: #d32d93;
    }

    .content {
        width: 90%;
        margin: 30px auto;
    }
    .content article {
        position: relative;
    }
    .content article > h3 {
        height: 20px;
        line-height: 20px;
        text-align: left;
        font-size: 0.5rem;
        color: #1d1d1d;
        padding: 10px 0 20px;
        margin-bottom:20px;
    }
    .content article section {
        margin: 0 0 17px;
        position: relative;
        display: flex;
        justify-content: space-between;
        text-align: center;
        font-size: 0.4rem;
        word-break:break-all;
        min-height:2rem;
    }
    .content article section:last-child {
        min-height:0.5rem;
    }
    .content article section:before {
        content: "";
        width: 5px;
        top: 17px;
        bottom: -17px;
        left: 50%;
        min-height:2rem;
        transform: translateX(-120%);
        background: #e6e6e6;
        position: absolute;
    }
    .content article section:last-child:before {
        display: none;
    }
    .content article section time {
        width: 40%;
        display: block;
    }
    .content article section time > span {
        display: block;
        text-align: right;
    }
    .content article section aside {
        color: #3a3a38;
        padding-bottom: 15px;
        width: 45%;
        text-align: justify;
        display: flex;
        align-items: center;
        /*white-space: nowrap;*/
    }
    .content article section .brief {
        color: #9f9f9f;
    }
    .cost {
        font-size: 12px;
        letter-spacing: 0.5px;
        margin-top:15px;
        color:#aaa;
    }
    section > div {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
</style>
