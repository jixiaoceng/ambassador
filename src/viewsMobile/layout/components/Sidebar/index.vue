<template>
    <div>
        <el-scrollbar wrap-class="scrollbar-wrapper" class="sidebar-wrap user-select-no">
            <div class="head-portrait">
                <img src="@/assets/public-img/head-portrait.png" alt="">
                <span>{{ userInfoData.username }}</span>
            </div>
            <div
            v-for="(item, index) in slideMap"
            :style="{'color': index == menuIndex ? themeColor : '#3B3B4D'}"
            :key="index"
            class="menu-item text-center"
            :class="{'menu-active': index == menuIndex}"
            @click="clickFirstMenu(index,item)">
            <em></em>
            <i :class="index == menuIndex ? `${item.icon} active` : `${item.icon}`"></i><br>
            <span class="menu-text">{{ item.title }}</span>
            </div>
            <div class="head-portrait log-out">
                <img @click="open" src="@/assets/public-img/icon-logout.png" alt="">
                <span @click="open">Log Out</span>
            </div>
            <div class="head-portrait log-out"></div>
        </el-scrollbar>

    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import HandleToken from '@/utils/auth'
const handleToken = new HandleToken()
export default {
    data () {
        return {
            path: '',
            userInfoData: {},
            slideMap: {} // pc 没有退出和footer
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
    created () {
        const mapSlide = [
            {
                'title': 'Contact Us',
                'icon': 'icon-contact',
                'path': '/ambassador/contactUs'
            }
            
        ]
        this.slideMap = [...this.menuMap,...mapSlide]
    },
    mounted () {
        this.path = this.$route.path
        this.userInfoData = this.userInfo ? this.userInfo : this.$router.push({ path: '/login' })
        this.userInfoData = typeof(this.userInfoData) == 'string' ? JSON.parse(this.userInfoData) : this.userInfoData
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
            overflow:hidden;
            img {
                display:block;
                width: 112px;
                height:112px;
                margin:20px auto 18px;
            }
            span{
                display:block;
                font-size:14px;
                color:#6C7B8A;
               text-align: center;
               margin-bottom:20px;
            }
        }
        .menu-item {
            height:90px;
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
                &.icon-contact {
                    background:url(../../../../assets/public-img/icon-contact.png) no-repeat;
                    background-size:contain;
                }
                &.icon-contact.active{
                    background:url(../../../../assets/public-img/icon-contact-active.png) no-repeat;
                }
                 
            }
            span{
                display:block;
                font-size:14px;
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
        .log-out{
            height:120px;
            border-top:1px solid #F5F4F7;
            img{
                width:25px;
                height:25px;
            }
            span{
                font-size:14px;
                color:#3B3B4D;
            }
        }
    }
    .el-message-box{
        width:auto;
    }
</style>
