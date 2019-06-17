<template>
    <div class="personal-wrap" v-loading="loading">
        <div class="personal-tp">
            <div class="personal-edit"><span @click="dialogFormVisible = true">Edit</span></div>
            <section class="app-main flex-wrapper flex-direction-column">
                <div class="personal-info">
                    <label>Username：</label>
                    <span>{{ personalForm.username }}</span>
                </div>
                <div class="personal-info">
                    <label>Email：</label>
                    <span>{{ personalForm.email }}</span>
                </div>
                <div class="personal-info">
                    <label>First name：</label>
                    <span>{{ ruleForm.first_name }}</span>
                </div>
                <div class="personal-info">
                    <label>Last name：</label>
                    <span>{{ ruleForm.last_name }}</span>
                </div>
                <div class="personal-info">
                    <label>Gender：</label>
                    <span>{{ ruleForm.gender }}</span>
                </div>
                <div class="personal-info">
                    <label>Birthday：</label>
                    <span>{{ ruleForm.birthdate }}</span>
                </div>
                <div class="personal-info">
                    <label>Residence country：</label>
                    <span>{{ handleState(ruleForm.country_of_residence) }}</span>
                </div>
                <div class="personal-info">
                    <label>Occupation：</label>
                    <span>{{ ruleForm.occupation }}</span>
                </div>
                <div class="personal-info">
                    <label>WhatsApp：</label>
                    <span>{{ ruleForm.country_calling_code }} {{ ruleForm.telephone_no }}</span>
                </div>
                <div class="personal-info">
                    <label>WeChat：</label>
                    <span>{{ ruleForm.wechat }}</span>
                </div>
            </section>
        </div>
        <div class="personal-bt">
            <div class="personal-title">
                <div class="left" @click="paypalVisible = !paypalVisible"><i></i>Paypal<em :class="{'rotate': !paypalVisible}"></em></div>
                <div class="right" v-if="paypalVisible && !paypalHave">
                    <span class="payment-edit" @click="paypalEdit">Edit</span>
                    <span v-if="accountForm.default_account == 'PayPal'" class="payment-default active">Default</span>
                    <span v-else class="payment-default" @click="defaultAccountFun('PayPal')">Set as Default</span>
                </div>
            </div>
            <div v-if="paypalVisible">
                <section class="paypal-edit" v-if="paypalHave">
                    <div class="paypal-email">
                        <input type="text" placeholder="Paypal Email" @keyup.enter.native="paypalSubmit" v-model="accountForm.paypal_email">
                        <span v-if="errEmail" class="err-info">Invalid email</span>
                    </div>
                    <div class="paypal-btn">
                        <span @click="getAmbassadorAccountData">Cancel</span>
                        <span class="active" @click="paypalSubmit">OK</span>
                    </div>
                </section>
                <section class="haveInfo" v-else>
                    <p>{{ accountForm.paypal_email }} </p>
                </section>
            </div>
        </div>
        <div class="personal-bt personal-marTp">
            <div class="personal-title">
                <div class="left" @click="debitVisible = !debitVisible"><i></i>Debit Card<em :class="{'rotate': !debitVisible}"></em></div>
                <div class="right" v-if="debitVisible && !debitHave">
                    <span class="payment-edit" @click="debitEdit">Edit</span>
                    <span v-if="accountForm.default_account == 'Debit'" class="payment-default active">Default</span>
                    <span v-else class="payment-default" @click="defaultAccountFun('Debit')">Set as Default</span>
                </div>
            </div>
            <div v-if="debitVisible">
                <section v-if="debitHave" class="app-main flex-wrapper flex-direction-column">
                    <el-form :model="accountForm" label-position="top" :rules="rules" ref="accountForm" label-width="240px" class="details-cardForm">
                        <el-form-item label="Beneficiary's Name：" prop="beneficiary_name">
                            <el-input v-model="accountForm.beneficiary_name" @keyup.enter.native="debitForm"></el-input>
                        </el-form-item>
                        <el-form-item label="Beneficiary's Address：" prop="beneficiary_address">
                            <el-input type="textarea" v-model="accountForm.beneficiary_address" @keyup.enter.native="debitForm"></el-input>
                        </el-form-item>
                        <el-form-item label="Beneficiary's Bank Name：" prop="beneficiary_bank_name">
                            <el-input v-model="accountForm.beneficiary_bank_name" @keyup.enter.native="debitForm"></el-input>
                        </el-form-item>
                        <el-form-item label="Beneficiary's Bank Address：" prop="beneficiary_bank_address">
                            <el-input type="textarea" v-model="accountForm.beneficiary_bank_address" @keyup.enter.native="debitForm"></el-input>
                        </el-form-item>
                        <el-form-item label="Swift Code/IBAN：" class="code-iban" prop="swift_code">
                            <el-input style="width:43%" v-model="accountForm.swift_code" placeholder="Swift Code" @keyup.enter.native="debitForm" maxlength="11"></el-input>
                            <span>or</span>
                            <el-input style="width:43%" v-model="accountForm.iban" placeholder="iban" @keyup.enter.native="debitForm" maxlength="34" ></el-input>
                        </el-form-item>
                        <el-form-item label="Beneficiary's Account Number：" prop="beneficiary_account_number">
                            <el-input v-model="accountForm.beneficiary_account_number" @keyup.enter.native="debitForm"></el-input>
                        </el-form-item>
                        
                        <el-form-item style="text-align:center">
                            <el-button class="submit-btn" @click="getAmbassadorAccountData">Cancel</el-button>
                            <el-button class="submit-btn active" type="primary" @click.native.prevent="debitForm">OK</el-button>
                        </el-form-item>
                    </el-form>
                </section>
                <section v-else  class="app-main personal-disable">
                    <div class="personal-info">
                        <label>Beneficiary's Name：</label>
                        <span>{{ accountForm.beneficiary_name }}</span>
                    </div>
                    <div class="personal-info">
                        <label>Beneficiary's Address：</label>
                        <span>{{ accountForm.beneficiary_address }}</span>
                    </div>
                    <div class="personal-info">
                        <label>Beneficiary's Bank Name：</label>
                        <span>{{ accountForm.beneficiary_bank_name }}</span>
                    </div>
                    <div class="personal-info">
                        <label>Beneficiary's Bank Address：</label>
                        <span>{{ accountForm.beneficiary_bank_address }}</span>
                    </div>
                    <div class="personal-info">
                        <label>Swift Code/IBAN：</label>
                        <span v-if="accountForm.swift_code && accountForm.iban">{{ accountForm.swift_code }}/{{ accountForm.iban }}</span>
                        <span v-else>{{ accountForm.swift_code }}{{ accountForm.iban }}</span>
                    </div>
                    <div class="personal-info">
                        <label>Beneficiary's Account Number：</label>
                        <span>{{ accountForm.beneficiary_account_number }}</span>
                    </div>
                </section>
                
            </div>
        </div>
        <!-- 弹框 -->
        <el-dialog title="" class="layer-wrap"  :append-to-body="true" :visible.sync="dialogFormVisible" width="90%" style="border-radius:10px;">
            <img class="layer-tp-bg" src="../../assets/public-img/layer-user-info.png" />
            <el-form :model="ruleForm" label-position="top" :rules="rulesEid" ref="ruleForm" label-width="180px" class="details-ruleForm">
                <h4 class="edit-info">Edit personal information</h4>
                <el-form-item label="First name：" prop="first_name">
                    <el-input v-model="ruleForm.first_name" maxlength="30" @keyup.enter.native="handleregister"></el-input>
                </el-form-item>
                <el-form-item label="Last name：" prop="last_name">
                    <el-input v-model="ruleForm.last_name" maxlength="30" @keyup.enter.native="handleregister"></el-input>
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
                        :editable=false
                        :picker-options="pickerOptions"
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
                    <el-input type="textarea" maxlength="32" v-model="ruleForm.occupation"></el-input>
                </el-form-item>
                <el-form-item label="WhatsApp：" >
                    <img src="../../assets/public-img/icon-add.png" alt="">
                    <el-input style="width:20%" v-model="ruleForm.country_calling_code" maxlength="3" placeholder="65"></el-input>
                    <el-input style="width:70%" v-model="ruleForm.telephone_no" maxlength="16" placeholder="telephone number"></el-input>
                </el-form-item>
                <el-form-item label="WeChat：">
                    <el-input v-model="ruleForm.wechat" maxlength="32"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button style="margin-left:30px; display:inline-block" @click="getPersonalData">Cancel</el-button>
                    <el-button class="submit-btn" style="display:inline-block;" type="primary" @click.native.prevent="handleregister">Conflrm</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { getAmbassadorDetai, PutAmbassadorDetai, ambassadorAccount, getAmbassadorAccount, PutAmbassadorAccount } from '@/api/base/'
import { mapGetters, mapMutations } from 'vuex'
import { genderData, countryData } from '@/filters'
export default {
    data () {
        const validateBeneficiaryName = (rule, value, callback) => {
            const userReg = /^[A-Za-z0-9]{1,64}$/;
            if (!userReg.test(value)) {
                callback(new Error('Invalid Beneficiary`s Name：'))
            } else {
                callback()
            }
        }
        const validateCodeIban = (rule, value, callback) => {
            if(!this.accountForm.swift_code && !this.accountForm.iban){
                callback(new Error('Swift Code/IBAN is required'))
            }else if(this.accountForm.swift_code && this.accountForm.swift_code.length > 11){
                callback(new Error('Invalid Swift Code'))
            }else if(this.accountForm.iban && this.accountForm.iban.length > 34){
                callback(new Error('Invalid IBAN'))
            }else{
                callback()
            }
        }
        return {
            personalForm: {
                username: '',
                email: ''
            },
            ruleForm: {},
            userId : '',
            rulesEid: {
                first_name: [{ required: true, trigger: ['blur','change'] }],
                last_name: [{ required: true, trigger: ['blur','change'] }],
                gender: [{ required: true, trigger: 'change' }],
                birthdate: [{ required: true, trigger: 'change' }],
                country_of_residence: [{ required: true, trigger: 'change' }]
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now() - 8.64e6;//如果没有后面的-8.64e6就是不可以选择今天的
                }
            },
            dialogFormVisible: false, // 弹框
            genderData: '',
            loading:true,
            countryData:'',
            accountForm: {},
            paypalVisible: false, // 是否展示paypal
            debitVisible: false, // 是否展示paypal
            paypalHave: false, // 是否填写过paypal
            debitHave: false, // 是否填写过debit
            defaultAccount:'', //默认付款方式
            debitActive: false, // debot是不是编辑
            paypalActive: false, // paypal是不是编辑
            errEmail: false, // paypal 邮箱验证
            rules: {
                beneficiary_name: [
                    { required: true, trigger: ['blur','change'], validator: validateBeneficiaryName }
                ],
                beneficiary_address: [{ required: true, trigger: [['blur','change'],'change'] }],
                beneficiary_bank_name: [{ required: true, trigger: ['blur','change'] }],
                beneficiary_bank_address: [{ required: true, trigger: ['blur','change'] }],
                swift_code: [
                    { validator:validateCodeIban, trigger: ['blur','change'] },
                    { min: 1, max: 11, message: 'Invalid Swift Code', trigger: ['blur','change'] }
                ],
                iban: [
                    { validator:validateCodeIban, trigger: ['blur','change'] },
                    { min: 1, max: 34, message: 'Invalid IBAN', trigger: ['blur','change'] }
                ],
                beneficiary_account_number: [
                    { required: true, trigger: ['blur','change'] },
                    { min: 1, max: 34, message: 'Invalid Beneficiary`s Account Number', trigger: ['blur','change'] }
                ]
            }
        }
    },
    computed: { 
        ...mapGetters([
            'userInfo'
        ])
    },
    mounted () {
        const { username, email, user_id } = typeof(this.userInfo) == 'string' ? JSON.parse(this.userInfo) : this.userInfo
        this.personalForm.username = username
        this.personalForm.email = email
        this.userId = user_id
        this.genderData = genderData
        this.countryData = countryData
        this.getPersonalData()
        this.getAmbassadorAccountData()
    },
    methods:{
        debitForm() { // 储蓄卡
            this.$refs.accountForm.validate((valid) => {
                if (valid) {
                    this.submitEditData('debitEid')
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        paypalSubmit () { // paypal
            const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
            if (!emailReg.test(this.accountForm.paypal_email)) {
                this.errEmail = true
            } else {
                this.errEmail = false
                this.submitEditData('paypal')
            }
        },
        submitEditData(tage) {
            this.accountForm.default_account = this.accountForm.default_account ? this.accountForm.default_account : this.accountForm.beneficiary_name ? 'Debit' : 'PayPal'
            const { user, ...params } = this.accountForm
            if (this.debitActive) { //是编辑
                PutAmbassadorAccount(params).then(res => {
                    this.accountForm = res.data
                    tage == 'debitEid' ? this.debitHave = false : this.paypalHave = false
                }).catch(error => {
                    this.$message({
                        message: 'Network interruption, please refresh and retry',
                        type: 'error',
                        duration: 5000
                    })
                })
            }else {
                ambassadorAccount(params).then(res => {
                    this.accountForm = res.data
                    tage == 'debitEid' ? this.debitHave = false : this.paypalHave = false
                }).catch(error => {
                    this.$message({
                        message: 'Network interruption, please refresh and retry',
                        type: 'error',
                        duration: 5000
                    })
                })
            }
            
        },
        // 用户信息编辑
        handleregister () {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    const { user, ...params } = this.ruleForm
                    PutAmbassadorDetai(params).then(res => {
                        this.ruleForm = res.data
                        this.dialogFormVisible = false
                    }).catch(error => {
                        this.$message({
                            message: 'The username/Email and password don`t match',
                            type: 'error',
                            duration: 5000
                        })
                    })
                }
            });
        },
        // 获取合伙人信息
        getPersonalData() {
            getAmbassadorDetai().then(res => {
                this.loading = false
                this.ruleForm = res.data
                this.dialogFormVisible = false
            })
        },
        // 获取合伙人账号
        getAmbassadorAccountData() {
            getAmbassadorAccount().then(res => {
                this.accountForm = res.data
                if (this.accountForm.paypal_email) {
                    this.paypalHave = false
                    this.paypalVisible = true
                }else{
                    this.paypalHave = true
                    this.paypalVisible = false
                }
                if (this.accountForm.beneficiary_name) {
                    this.debitHave = false
                    this.debitVisible = true
                }else{
                    this.debitHave = true
                    this.debitVisible = false
                }
            })
        },

        // 储蓄卡编辑
        debitEdit() {
            this.debitHave = !this.debitHave
            this.debitActive = true
        },

        // paypal 编辑
        paypalEdit() {
            this.paypalHave = !this.paypalHave
            this.debitActive = true
        },
        // 设置默认账号
        defaultAccountFun(type) {
            this.accountForm.default_account = type
            const { user, ...params } = this.accountForm
            PutAmbassadorAccount(params).then(res => {
                this.accountForm = res.data
            }).catch(error => {
                this.$message({
                    message: 'Network interruption, please refresh and retry',
                    type: 'error',
                    duration: 3000
                })
            })
        },
        // 国家
        handleState (state) {
            return state === 'CN' ? 'China' : state === 'US' ? 'United States' : state === 'SG' ? 'Singapore' : state === 'UK' ? 'United Kingdom' : state === 'AU' ? 'Australia' : 'Indonesia'
        }
    }
}
</script>


<style lang="scss" scoped>
.personal-tp{
    margin-top:20px;
    background:#fff;
    padding:20px 0 20px 0;
    .personal-edit{
        text-align:right;
        span{
            display:inline-block;
            width:72px;
            height:30px;
            line-height:30px;
            border:1px solid #24CBDA;
            border-radius:15px;
            margin-right:20px;
            font-size:14px;
            color:#24CBDA;
            text-align:center;
            cursor: pointer;
        }
    }
    .personal-info{
        line-height:30px;
        font-size:14px;
        margin-top:18px;
        padding:3px 0;
        label{
            display:block;
            font-size:14px;
            padding-left:20px;
            line-height:36px;
        }
        span {
            display:block;
            min-height:30px;
            background: #F7F7F7;
            margin:0 20px;
            padding:0 20px;
            word-wrap:break-word;
        }
    }
   
}

.personal-disable{
    .personal-info{
        line-height:30px;
        font-size:14px;
        margin-top:18px;
        padding:3px 0;
        label{
            display:block;
            font-size:14px;
            line-height:36px;
        }
        span {
            display:block;
            min-height:30px;
            background: #F7F7F7;
            padding:0 20px;
            word-wrap:break-word;
        }
    }
}
.personal-bt{
    margin-top:20px;
    background:#fff;
    padding:0 30px;
    .personal-title{
        height:60px;
        line-height:60px;
        border-top:1px solid #EBEBEB;
        font-size:18px;
        font-weight:500;
        color:#24CBDA;
       
        i{
            display:inline-block;
            width:4px;
            height:25px;
            background:#FFD277;
            vertical-align: sub;
            margin-right:10px;
        }
    }
    .left{
        cursor:pointer;
        em{
            display:inline-block;
            width:0;
            height:0;
            border-width:5px 5px 0;
            border-style:solid;
            border-color:#24CBDA transparent transparent;
            vertical-align: middle;
            margin-left:8px;
            &.rotate{
                transform-origin:center center;
                transform: rotate(180deg);
                -webkit-transform: rotate(180deg);
                -moz-transform: rotate(180deg); 
                -ms-transform: rotate(180deg);
                -o-transform: rotate(180deg);
                transition: transform 0.2s;
                -moz-transition: -moz-transform 0.2s;
                -moz-transition: -moz-transform 0.2s;
                -o-transition: -o-transform 0.2s;
                -ms-transition: -ms-transform 0.2s;
            }
        }
    }
    .right{
        span{
            font-weight:400;
            display:inline-block;
            cursor:pointer;
            &.payment-edit{
                font-size:16px;
                color:#24CBDA;
                text-decoration: underline;
                margin-right:10px;
            }
            &.payment-default{
                padding:0 15px;
                border:1px solid #24CBDA;
                color:#24CBDA;
                font-size:14px;
                height:30px;
                line-height:30px;
                border-radius:25px;
            }
            &.active{
                background:#24CBDA;
                color:#fff;
            }
        }
    }
    .paypal-edit{
        background: #FAFAFA;
        overflow:hidden;
        padding-bottom:25px;
        width:100%;
        .paypal-email{
            height:40px;
            margin:30px auto 15px;
            position:relative;
            input{
                width:80%;
                height:30px;
                line-height:30px;
                padding-left:20px;
                border:1px solid #CDCDCD;
                border-radius:4px;
                font-size:16px;
                display:block;
                margin:0 auto;
                &:focus{
                    outline:none;
                }
            }
            span{
                color: #F56C6C;
                font-size: 12px;
                line-height: 1;
                padding-top: 4px;
                position: absolute;
                top: 100%;
                left: 0;
            }
        }
        .paypal-btn{
            text-align:center;
            span {
                display:inline-block;
                width:30%;
                height:30px;
                line-height:30px;
                text-align:center;
                font-size:14px;
                color:#24CBDA;
                border-radius:15px;
                border:1px solid #24CBDA;
                margin:0 10px;
                cursor: pointer;
                &.active,&:hover{
                    background: #24CBDA;
                    color:#fff;
                }
            }
        }
    }
    .haveInfo{
        background:#fff;
        text-align:center;
        overflow:hidden;
        padding-bottom:25px;
        width:100%;
    }
}
.personal-marTp{
    margin-top:0;
    padding-bottom:20px;
    .flex-wrapper{
        margin:20px auto 0;
        .code-iban{
            span{
                padding:0 3px;
            }
        }
        button {
            margin:0 10px;
            padding:9px 20px;
        }
    }
}
.layer-wrap{
    height:90vh;
    overflow:scroll;
    .edit-info{
        font-size:22px;
        font-weight:400;
        line-height:40px;
        text-align:center;
        color:#3B3B4D;
        margin: 20px auto;
    }
    .layer-tp-bg{
        position:absolute;
        left:0;top:0;
        width:100%;
    }
    .el-button{
        padding:9px 20px;
    }
}
.details-ruleForm{
    margin-top:60px !important;
}

</style>

