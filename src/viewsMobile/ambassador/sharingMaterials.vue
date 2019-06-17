<template>
    <div class="share-wrap" v-loading="loading">
        <div class="share-info">
            <div class="share-title"><i></i>Your URL</div>
            <div class="share-link">
                <span>{{ url }}</span><img @click="copyUrl(url)" src="../../assets/public-img/icon-copy.png" />
            </div>
        </div>
        <div class="share-info">
            <div class="share-title"><i></i>Your QR Code</div>
            <div class="share-code">
                <img :src="qr_code" />
            </div>
        </div>
        <div class="commission">Share your exclusive URL or QR code with your friends, once a new user has registered and top-up through your share, you will receive a commission.</div>
    </div>
</template>

<script>
import { ambassadorShare } from '@/api/base/'
export default {
    data () {
        return {
            url: '',
            qr_code: '',
            loading:true
        }
    },
    mounted () {
        this.getShareData()
    },
    methods: {
        getShareData() {
            ambassadorShare().then(res => {
                this.loading = false
                const data = res.data
                this.url = data.url.replace(/(\")/g, "")
                this.qr_code = data.qr_code.replace(/(\")/g, "")
            }).catch(error => {
                this.loading = false
                this.$message({
                    message: 'Network interruption, please refresh and retry',
                    type: 'error',
                    duration: 3000
                })
            })
        },
        // 复制粘贴

        copyUrl(data){
            let url = data;
            let oInput = document.createElement('input');
            oInput.value = url;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象;
            document.execCommand("Copy"); // 执行浏览器复制命令
            this.$message({
                message: '已成功复制到剪切板',
                type: 'success'
            });
            oInput.remove()
       }
    }
}
</script>

<style lang="scss" scoped>
.share-info{
    background:#fff;
    margin-top:20px;
    padding: 0 20px 70px 20px;
    .share-title{
        height:70px;
        line-height:70px;
        border-bottom:1px solid #EBEBEB;
        font-size:20px;
        font-weight:500;
        i{
            display:inline-block;
            width:4px;
            height:25px;
            background:#FFD277;
            vertical-align: sub;
            margin-right:10px;
        }
    }
    .share-link{
       margin-top:30px;
       font-size:16px;
       img{
          display:inline-block;
          width: 24px;
          height:24px;
          vertical-align: bottom;
          margin-left:25px;
          cursor:pointer;
       }
    }
    .share-code{
        img{
            display:block;
            width:247px;
            margin:54px auto 15px;
        }
    }
}
.commission{
    font-size:12px;
    line-height:25px;
    padding:20px;
}
</style>


