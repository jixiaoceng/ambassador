<template>
    <div class="register-container">
        <div class="register-form-wrap">
            <img src="../../assets/public-img/pc-logo.png" />
            <em class="mobile-tit">Global Ambassador Program</em>
            <el-form
                ref="registerForm"
                :model="registerForm"
                :rules="registerRules"
                class="register-form"
                auto-complete="on"
                label-position="left">
                <el-form-item class="username" prop="username">
                    <el-input
                    v-model="registerForm.username"
                    :placeholder="`Username`"
                    name="username"
                    type="text"
                    auto-complete="on"
                    @keyup.enter.native="getRegistration"
                    />
                </el-form-item>
                
                <el-form-item class="password" prop="email">
                    <el-input
                    v-model="registerForm.email"
                    :placeholder="`Email address`"
                    name="email"
                    auto-complete="on" 
                    @keyup.enter.native="getRegistration"/>
                </el-form-item>
                <el-form-item class="username" prop="password1">
                    <el-input
                    :type="passwordType"
                    v-model="registerForm.password1"
                    :placeholder="`Password`"
                    name="password1"
                    auto-complete="on"
                    @keyup.enter.native="getRegistration"/>
                </el-form-item>
                <el-form-item class="enter" prop="password2">
                    <el-input
                    :type="passwordType"
                    v-model="registerForm.password2"
                    :placeholder="`Re-enter password`"
                    name="password2"
                    auto-complete="on" 
                    @keyup.enter.native="getRegistration"/>
                </el-form-item>
                <span class="err-info"></span>
                <el-button
                    class="btn-register"
                    :loading="loading"
                    type="primary" @click.native.prevent="getRegistration">Sign Up</el-button>
            </el-form>
            <router-link tag="p" class="go-account" to="/login">Already have an account? <em> Log in</em></router-link>
        </div>
        <p class="footer-communication">Copyright © 2019 LingoAce. All Rights Reserved.</p>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { registration } from '@/api/base/'
    export default {
        name: 'register',
        data () {
            const validateUsername = (rule, value, callback) => {
                const userReg = /^[A-Za-z0-9]{4,16}$/;
                if (!userReg.test(value)) {
                    callback(new Error('Invalid username'))
                } else {
                    callback()
                }
            }
            const validateEmail = (rule, value, callback) => {
                const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
                if (!emailReg.test(value)) {
                    callback(new Error('Invalid Email'))
                } else {
                    callback()
                }
            }
            const validatePassword = (rule, value, callback) => {
                if(this.registerForm.password1 && this.registerForm.password2){
                    if (this.registerForm.password1 != this.registerForm.password2) {
                        callback(new Error('Two password inconsistencies'))
                    } else {
                        callback()
                    }
                }
            }
            return {
                registerForm: {
                    username: '',
                    email: '',
                    password1: '',
                    password2: ''
                },
                registerRules: {
                    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                    email: [{ required: true, trigger: 'blur', validator: validateEmail }],
                    password1: [
                        { required: true, trigger: 'blur', validator: validatePassword },
                        { min: 8, message: 'Password must contain at least 8 characters', trigger: 'blur' }
                    ],
                    password2: [
                        { required: true, trigger: 'blur', validator: validatePassword },
                        { min: 8, message: 'Password must contain at least 8 characters', trigger: 'blur' }
                    ]
                },
                passwordType: 'password',
                loading: false
            }
        },
        methods: {
            getRegistration () {
                this.$refs.registerForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        registration(this.registerForm).then(res => {
                            this.setToken(res.data.key)
                            this.$router.push({ path: '/ambassador/addDetails' })

                        }).catch(error => {
                            this.loading = false
                            const errInfo = Object.keys(error.response.data)
                            const msg = errInfo[0] == 'username' ? 'The username has been used ' : 'The Email has been registered'
                            this.$message({
                                message: msg,
                                type: 'error',
                                duration: 3000
                            })
                        })
                    }
                })
            },
            ...mapMutations({
                setToken: 'SET_TOKEN'
            })
        },
        computed: {
            ...mapGetters([
                'themeColor',
                'device'
            ])
        },
    }
</script>
<style lang="scss" scoped>
    .mobile-tit{
        font-size:22px;
        color:#fff;
        display: block;
        font-style:normal;
        text-align:center;
        margin-top:24px;
    }
    .register-container .register-form-wrap{
        margin: 5vh auto;
    }
</style>
