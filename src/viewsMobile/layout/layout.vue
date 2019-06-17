<template>
    <div :class="classObj" class="app-wrapper">
        <el-container class="app-inner">
            <el-header>
                <navbar-slide />
            </el-header>
            <el-container>
                <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
                <sidebar v-if="device==='mobile'&&sidebar.opened" class="sidebar-container"/>
            </el-container>
            <el-container>
                <section class="app-main flex-wrapper">
                    <el-main ref="scrollDom">
                        <transition name="fade-transform" mode="out-in">
                            <router-view :key="key"/>
                        </transition>
                    </el-main>
                </section>
            </el-container>
        </el-container>
        <!-- <section class="footer-bottom">
            <footers />
        </section> -->
    </div>
</template>

<script>
import { NavbarSlide, Sidebar } from '../layout/components'
import { mapGetters, mapMutations } from 'vuex'
import ResizeMixin from './mixin/ResizeHandler'
export default {
    data () {
        return {
            scrollDom: null
        }
    },
    components: {
        NavbarSlide,
        Sidebar
    },
    mixins: [ResizeMixin],
    methods: {
        handleClickOutside () {
            this.closeSideBar({ withoutAnimation: false })
        },
        ...mapMutations({
            'closeSideBar': 'CLOSE_SIDEBAR'
        })
    },
    computed: {
        key () {
            return this.$route.fullPath
        },
        sidebar () {
            return this.$store.state.app.sidebar
        },
        device () {
            return this.$store.state.app.device
        },
        classObj () {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
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
