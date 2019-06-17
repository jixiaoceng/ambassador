<template>
    <el-scrollbar wrap-class="sidebar-wrap" class="first-wrapper user-select-no">
        <div class="head-portrait">
            <img src="@/assets/public-img/head-portrait.png" alt="">
            <span>{{ userInfoData.username }}</span>
        </div>
        <div
        v-for="(item, index) in menuMap"
        :style="{'color': index == menuIndex ? themeColor : '#3B3B4D'}"
        :key="index"
        class="menu-item text-center"
        :class="{'menu-active': index == menuIndex}"
        @click="clickFirstMenu(index,item)">
        <em></em>
        <i :class="index == menuIndex ? `${item.icon} active` : `${item.icon}`"></i><br>
        <span class="menu-text">{{ item.title }}</span>
        </div>
    </el-scrollbar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    data () {
        return {
            path: '',
            userInfoData: {}
        }
    },
    computed: { 
        ...mapGetters([
            'themeColor',
            'menuIndex',
            'menuMap',
            'userInfo'
        ])
    },
    mounted () {
        this.path = this.$route.path
        this.userInfoData = this.userInfo ? this.userInfo : this.$router.push({ path: '/login' })
        this.userInfoData = typeof(this.userInfoData) == 'string' ? JSON.parse(this.userInfoData) : this.userInfoData
    },
    methods: {
        clickFirstMenu (index,item) {
            this.changeMenuIndex(index)
            this.$router.push({ path: item.path })
        },
        ...mapMutations({
            'changeMenuIndex': 'CHANGE_MENU_INDEX'
        })
    }
}
</script>


<style lang="scss" scoped>
    .sidebar-wrap{
        text-align: center;
        font-size:18px;
        .head-portrait{
            img {
                display:block;
                width: 112px;
                height:112px;
                margin:50px auto 18px;
            }
            span{
                display:block;
                font-size:14px;
                color:#6C7B8A;
               text-align: center;
               margin-bottom:38px;
            }
        }
        .menu-item {
            height:102px;
            border-top:1px solid #F5F4F7;
            overflow:hidden;
            cursor:pointer;
            position:relative;
            i{
                width: 26px;
                height:26px;
                display:inline-block;
                margin:20px auto 8px auto;
                &.icon-invitation {
                    background:url(../../../../assets/public-img/icon-invitation.png) no-repeat;
                    background-size:contain;
                }
                &.icon-invitation.active{
                    background:url(../../../../assets/public-img/icon-invitation-active.png) no-repeat;
                    background-size:contain;
                }
                &.icon-share {
                    background:url(../../../../assets/public-img/icon-share.png) no-repeat;
                    background-size:contain;
                }
                &.icon-share.active{
                    background:url(../../../../assets/public-img/icon-share-active.png) no-repeat;
                    background-size:contain;
                }
                &.icon-personal {
                    background:url(../../../../assets/public-img/icon-personal.png) no-repeat;
                    background-size:contain;
                }
                &.icon-personal.active{
                    background:url(../../../../assets/public-img/icon-personal-active.png) no-repeat;
                    background-size:contain;
                }
            }
            span{
                display:block;
            }
            em{
                display:block;
                position: absolute;
                left:0;
                top:0;
                width:6px;
                height:102px;
                background:#fff;
            }
        }
        .menu-active{
            background:#F7F9F9;
            em{
                background:#24CBDA;
            }
        }
    }
</style>
