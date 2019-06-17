<template>
    <div>
        <el-container class="app-inner">
            <el-header>
                <navbar />
            </el-header>
            <el-container>
                <el-container class="main-container">
                    <section class="app-main flex-wrapper">
                        <el-aside style="width:200px;">
                            <sidebar />
                        </el-aside>
                        <el-main ref="scrollDom">
                            <transition name="fade-transform" mode="out-in">
                                <router-view :key="key"/>
                            </transition>
                        </el-main>
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
import { Navbar, Sidebar, Footers } from '../layout/components'
export default {
    data () {
        return {
            scrollDom: null
        }
    },
    components: {
        Navbar,
        Sidebar,
        Footers
    },
    methods: {

    },
    computed: {
        key () {
            return this.$route.fullPath
        }
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
    background:#F5F4F7;
    margin:20px 20px;
    box-shadow:0px 2px 30px 0px rgba(0,0,0,0.06);
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
}
</style>
