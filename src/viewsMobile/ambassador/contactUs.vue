<template>
    <div class="logout-wrap">
        <p><em>WhatsApp：</em><span>+65 86183670</span></p>
        <p><em>Phone: </em><span>+65 86183670</span></p>
        <p><em>E-mail:</em> <span>support@pplingo.com</span></p>
        <p><em>Address: </em><span>36 Robinson,#02-00, Singapore, 068877</span></p>
        <img src="@/assets/public-img/footer-code.png" />
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
    .logout-wrap{
        height:calc(100vh - 50px);
        margin-top:20px;
        background:#fff;
        padding:20px 20px;
        p{
            padding-bottom:20px;
            font-size:14px;
            em{
                display:block;
                font-style: normal;
                font-size:16px;
            }
            span{
                display:block;
                padding-top:10px;
            }
        }
        img{
            display:block;
            margin:10px auto;
        }
    }
</style>


