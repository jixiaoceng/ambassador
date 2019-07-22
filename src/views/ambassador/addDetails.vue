<template>
    <div>
        <el-container class="app-inner">
            <el-header>
                <navbar />
            </el-header>
            <el-container>
                <el-container class="main-container">
                    <section class="app-main flex-wrapper flex-direction-column">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="details-ruleForm">
                            <el-form-item label="First name：" prop="first_name">
                                <el-input v-model="ruleForm.first_name" maxlength="30" @keyup.enter.native="submitForm"></el-input>
                            </el-form-item>
                            <el-form-item label="Last name：" prop="last_name">
                                <el-input v-model="ruleForm.last_name" maxlength="30" @keyup.enter.native="submitForm"></el-input>
                            </el-form-item>
                            <el-form-item label="Gender：" prop="gender">
                                <el-select v-model="ruleForm.gender" placeholder="Please select" style="width:100%" >
                                    <el-option
                                        v-for="item in genderData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Birthday：" prop="birthdate">
                                <el-date-picker
                                    v-model="ruleForm.birthdate"
                                    type="date"
                                    placeholder="Please select"
                                    format="yyyy-MM-dd "
                                    style="width:100%"
                                    :picker-options="pickerOptions"
                                    :editable=false
                                    value-format="yyyy-MM-dd">
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item label="Residence country：" prop="country_of_residence">
                                <el-select v-model="ruleForm.country_of_residence" placeholder="Please select" style="width:100%">
                                    <el-option
                                        v-for="item in countryData"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Occupation：">
                                <el-input v-model="ruleForm.occupation" maxlength="32"></el-input>
                            </el-form-item>
                            <el-form-item label="WhatsApp：" >
                                <img src="../../assets/public-img/icon-add.png" alt="">
                                <el-input style="width:86px" v-model="ruleForm.country_calling_code" maxlength="3" placeholder="65"></el-input>
                                <el-input style="width:140px;" v-model="ruleForm.telephone_no" maxlength="16" placeholder="telephone number"></el-input>
                            </el-form-item>
                            <el-form-item label="WeChat：">
                                <el-input v-model="ruleForm.wechat" maxlength="32"></el-input>
                            </el-form-item>
                            <p class="error-info">Please fill in the information with *, then click submit</p>
                            <el-form-item>
                                <el-button class="submit-btn" type="primary" @click.native.prevent="submitForm">Submit</el-button>
                            </el-form-item>
                        </el-form>
                    </section>
                </el-container>
            </el-container>
        </el-container>
        <section class="footer-bottom">
            <footers />
        </section>
    </div>
</template>

<script>
import { Navbar, Footers } from '../layout/components'
import { genderData, countryData } from '@/filters'
import { mapGetters, mapMutations } from 'vuex'
import { ambassadorDetai, getAmbassadorDetai } from '@/api/base/'
export default {
    data () {
        return {
            ruleForm: {
                first_name: '',
                last_name: '',
                gender: '',
                birthdate: '',
                country_of_residence: '',
                occupation: '',
                country_calling_code: '',
                telephone_no: '',
                wechat: ''
            },

            rules: {
                first_name: [{ required: true, trigger: 'blur' }],
                last_name: [{ required: true, trigger: 'blur' }],
                gender: [{ required: true, trigger: 'change' }],
                birthdate: [{ required: true, trigger: 'change' }],
                country_of_residence: [{ required: true, trigger: 'change' }]
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6;//如果没有后面的-8.64e6就是不可以选择今天的
                }
            },
            genderData: '',
            countryData:''
        }
    },
    components: {
        Navbar,
        Footers
    },
    created () {
        this.genderData = genderData
        this.countryData = countryData
    },
    methods: {
        submitForm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    ambassadorDetai(this.ruleForm).then(res => {
                        getAmbassadorDetai().then(res => {
                            this.changeMenuIndex(0)
                            this.setUserInfo(res.data.user)
                            this.$router.push({ path: '/ambassador/myInvitation' })
                        })
                    }).catch(error => {
                        this.$message({
                            message: 'The username/Email and password don`t match',
                            type: 'error',
                            duration: 3000
                        })
                    })
                }
            });
        },
        ...mapMutations({
            changeMenuIndex: 'CHANGE_MENU_INDEX',
            setUserInfo: 'SET_USER_INFO'
        })
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
    min-height: calc(90vh - 50px);
    position: relative;
    overflow: hidden;
    flex: 1;
    box-sizing: border-box;
    background:#fff;
    margin:20px;
    .details-ruleForm{
        width:430px;
        margin:60px auto;
    }
    .error-info {
        color: #ED6456;
        font-size:12px;
        padding:20px 0;
        margin-left:100px;
    }
    .el-form-item .el-form-item{
        margin-bottom:0;
    }
    .submit-btn{
        width: 278px;
        height:46px;
        font-size:16px;
        font-weight:500;
        margin-left:-50px;
        border-radius:23px;
    }
    .add-icon{
        color:#24CBDA;
    }
}
</style>
