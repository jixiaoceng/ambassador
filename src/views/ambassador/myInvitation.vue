<template>
    <div class="invitation-wrap" v-loading="loading">
        <div class="search-wrap">
            <div class="invitation-lt">
                <el-button-group class="type-btn">
                    <el-button @click="getMonthData(1)">Last month</el-button>
                    <el-button @click="getMonthData(2)">This month</el-button>
                </el-button-group>
            </div>
            <div class="invitation-rt">
                <div class="block">
                    <el-date-picker
                    v-model="timeValue"
                    type="daterange"
                    range-separator="~"
                    style="width:100%"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    :editable=false
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <el-button class="go-btn" @click="searchTime" type="primary">Go</el-button>
            </div>
        </div>
        <lingo-ace-card title="Invitation Records" class="table-wrapper marginTp20" v-if="tableData">
            <el-table
                :data="tableData"
                tooltip-effect="dark"
                :border="true"
                style="width: 100%">
                <el-table-column align="center" label="NO" width="60">
                    <template slot-scope="scope">{{ scope.$index + 1 }}</template>
                </el-table-column>
                <el-table-column align="center" prop="username" label="Invited"></el-table-column> 
                <!-- 首充时间 -->
                <el-table-column align="center" label="Topup date">
                    <template slot-scope="scope">{{ scope.row.created_on | formatUTC }}</template>
                </el-table-column>
                <!-- 首充金额 -->
                <el-table-column align="center" prop="amount" label="Topup"></el-table-column>
                <!-- 试听课时间 -->
                <el-table-column align="center" label="Trail date">
                    <template slot-scope="scope">{{ scope.row.trail_date | formatUTC }}</template>
                </el-table-column>
                <!-- 注册时间 -->
                <el-table-column align="center" label="Date joined">
                    <template slot-scope="scope">{{ scope.row.date_joined | formatUTC }}</template>
                </el-table-column>
            </el-table>
        </lingo-ace-card>
        <!-- 分页 -->
        <lingo-ace-pagination
        :total="total"
        :current-page="currentPage"
        :page-size="perPage"
        @getCurrentPage="getCurrentPage"></lingo-ace-pagination>
    </div>
</template>

<script>
import { getAmbassadorInvitations } from '@/api/base/'
export default {
    data () {
        return {
            timeValue: [],
            // 搜索条件
            searchData: {
                start_time: '',
                end_time: '',
                page: 1
            },
            tableData:[],
            // 当前页
            currentPage: 1,
            // 总共多少个dom
            total: 0,
            // 每页多少数据
            perPage: 20,
            loading:true
        }
    },
    created () {
        this.getInvitationsData()
    },
    methods: {
        getInvitationsData () {
            getAmbassadorInvitations(this.searchData).then(res => {
                this.loading = false
                this.tableData = JSON.parse(res.data.data)
                this.total = JSON.parse(res.data.count)
            }).catch(error => {
                this.loading = false
                this.$message({
                    message: 'Network interruption, please refresh and retry',
                    type: 'error',
                    duration: 3000
                })
            })
        },
        searchTime() { // 日期搜索
            if(this.timeValue.length > 0){
                this.searchData.start_time = this.timeValue[0]
                this.searchData.end_time = this.timeValue[1]
                this.searchData.page = 1
                this.getInvitationsData()
            }
        },
        // 获取当前页码
        getCurrentPage (currentPage) {
            this.searchData.page = currentPage
            this.getInvitationsData()
        },
        // 上个月本月 1上月2本月
        getMonthData(type) {
            var myDate = new Date();
            var year = myDate.getFullYear()
            var month = type == '1' ? myDate.getMonth() : myDate.getMonth()+1; 
            var day = myDate.getDate();
            day = day < 10 ? "0" + day : day
            month = month < 10 ? "0" + month : month
            var myDates = new Date(year, month, 0);
            var lastDay = year + "-" + month + "-" + myDates.getDate();//上个月的最后一天
            var stareTime = year + '-' + month + '-' + '01';
            var endTime = type == '1' ? lastDay : year + '-' + month + '-' + day;
            this.searchData.start_time = stareTime
            this.searchData.end_time = endTime
            this.searchData.page = 1
            this.getInvitationsData()
        }
    }
   
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.invitation-wrap{
    background:#fff;
    overflow:hidden;
    padding:0 20px 30px 20px;
    min-height:calc(90vh - 50px);
}
.search-wrap{
    margin-top:20px;
    overflow:hidden;
    .invitation-lt{
        float:left;
        display:flex;
        margin-bottom:20px;
        button {
            padding: 8px 10px;
        }
    }
    .invitation-rt{
        float:right;
        display:flex;
        text-align: right;
        .go-btn{
            margin-left:10px;
            height:30px;
            line-height:30px;
            padding:0 15px;
        }
    }
}
.marginTp20{
    margin-top:20px;
}

</style>
