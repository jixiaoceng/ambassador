<template>
    <div class="footer-wrap">
        <el-row type="flex" justify="space-around" class="footer-info">
            <el-col :span="5">
                <div class="left-code">
                    <p>WeChat</p>
                    <img src="../../../../assets/public-img/footer-code.png" />
                </div>
            </el-col>
            <el-col :span="19">
                <div class="footer-right">
                    <el-row :gutter="24">
                        <el-col :span="5">
                            <span>WhatsApp：</span>
                            <em>+65 86183670</em>
                        </el-col>
                        <el-col :span="5">
                            <span>Phone: </span>
                            <em>+65 86183670</em>
                        </el-col>
                        <el-col :span="6">
                            <span>E-mail: </span>
                            <em>support@pplingo.com</em>
                        </el-col>
                        <el-col :span="8">
                            <span>Address: </span>
                            <em>36 Robinson,#02-00, Singapore, 068877</em>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24" class="footer-communication">Copyright © 2019 LingoAce. All Rights Reserved.</el-row>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'Footers',
    data () {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
    .footer-wrap{
        height: 268px;
        background: #35475C;
        width:100%;
        overflow:hidden;
        padding:0 80px;
        .footer-info {
            margin-top: 40px;
            .left-code{
                p {
                    font-size: 20px;
                    color: #fff;
                    line-height: 28px;
                    margin:0;
                }
                img {
                    width:134px;
                    margin-top:10px;
                }
            }
            .footer-right{
                color: #fff;
                font-size: 16px;
                margin-top:40px;
                line-height:24px;
                em,span{
                    display: block;
                    font-style: inherit;
                }
                em {
                    font-size:14px;
                    padding-top:6px;
                }
                .footer-communication{
                    font-size:12px;
                    color:#fff;
                    padding-top:44px;
                    margin-left:30% !important;
                }
            }
        }
    }
</style>
