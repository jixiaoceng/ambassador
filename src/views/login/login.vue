<template>
    <div class="register-container">
        <div class="register-logo">
            <img src="../../assets/public-img/pc-logo.png" />
            <span>Global Ambassador Program</span>
        </div>
        <div class="register-form-wrap">
            <img src="../../assets/public-img/pc-logo.png" />
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
                    placeholder="Username/Email"
                    name="username"
                    type="text"
                    auto-complete="on"
                    />
                </el-form-item>
                <el-form-item class="enter" prop="password">
                    <el-input
                    :type="passwordType"
                    v-model="registerForm.password"
                    :placeholder="`Password`"
                    name="password2"
                    auto-complete="on"
                    @keyup.enter.native="handleregister" />
                </el-form-item>
                <!-- <a class="pointer forgot-password"><a href="https://member.lingoace.com/accounts/password/reset/?container=mobile">Forgot password？</a></p> -->
                <span class="err-info"></span>
                <el-button
                    class="btn-register"
                    :loading="loading"
                    type="primary"
                    @click.native.prevent="handleregister">Log in</el-button>
            </el-form>
            <router-link tag="p" class="go-account" to="/register">Don't have an account? <em>Sign Up</em></router-link>
        </div>
        <p class="footer-communication">Copyright © 2019 LingoAce. All Rights Reserved.</p>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { tokenAuth, getAmbassadorDetai } from '@/api/base/'
    export default {
        name: 'login',
        data () {
            return {
                registerForm: {
                    username: '',
                    password: ''
                },
                registerRules: {
                    username: [{ required: true, trigger: 'blur' }],
                    password: [{ required: true, trigger: 'blur'}]
                },
                passwordType: 'password',
                loading: false,
                showDialog: false
                }
        },
        methods: {
            handleregister () {
                this.$refs.registerForm.validate(valid => {
                    if (valid) {
                        this.loading = true
                        tokenAuth(this.registerForm).then(res => {
                            this.setToken(res.data.token)
                            this.changeMenuIndex(0)
                            getAmbassadorDetai().then(res => {
                                this.changeMenuIndex(0)
                                this.setUserInfo(res.data.user)
                                res.data.first_name ? this.$router.push({ path: '/ambassador/myInvitation' }) : this.$router.push({ path: '/ambassador/addDetails' })
                            })
                            
                        }).catch(error => {
                            this.loading = false
                            this.$message({
                                message: 'The username/Email and password don`t match',
                                type: 'error',
                                duration: 3000
                            })
                        })
                    }
                })
            },
            ...mapMutations({
                setToken: 'SET_TOKEN',
                changeMenuIndex: 'CHANGE_MENU_INDEX',
                setUserInfo: 'SET_USER_INFO'
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
 body,html{
    height:100% !important;
 }
</style>
