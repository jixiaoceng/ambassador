<template>
  <el-row type="flex" justify="space-between" class="navbar" :style="{color: themeColor}">
    <el-col :span="24" v-if="device !== 'mobile'" class="brand">
        <img src="../../../../assets/public-img/logo.png" alt="Lingoace">
        <span>Global Ambassador Program</span>
    </el-col>
    <!-- <el-col :span="8" class="exit-btn" v-if="pathName != 'addDetails'">
        <span @click="open">Exit</span>
        <img @click="open" src="../../../../assets/public-img/nav-exit-icon.png" />
    </el-col> -->
  </el-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Hamburger from '@/components/Hamburger'
import HandleToken from '@/utils/auth'
const handleToken = new HandleToken()

export default {
    name: 'Navbar',
    dats(){
        return {
            pathName:''
        }
    },
    components: {
        Hamburger
    },
    computed: {
        ...mapGetters([
            'device',
            'themeColor'
        ])
    },
    created (){
        this.pathName = this.$route.name; // 注册信息填写页面隐藏Exit
    },
    methods: {
        open() {
            this.$confirm('Confirm to log out', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            center: true
            }).then(() => {
                handleToken.removeToken()
                this.changeMenuIndex(0)
                this.$router.push({ path: '/login' })
            }).catch(() => {         
            });
        },
        ...mapMutations({
            'changeMenuIndex': 'CHANGE_MENU_INDEX'
        })
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    border-radius: 0px !important;
    height: 82px;
    line-height: 82px;
    background:#fff;
    .brand {
        font-size: 16px;
        margin:0 20px 0 10px;
        img{
            height:35px;
            vertical-align: sub;
            margin-right:10px;
        }
    }
    .hamburger-container {
        margin: 0 20px
    }
    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }
    .exit-btn{
        font-size:16px;
        text-align:right;
        vertical-align: middle;
        line-height:82px;
        cursor: pointer;
        img{
            margin:0 120px 0 10px;
            vertical-align: inherit;
        }
    }
}
</style>
