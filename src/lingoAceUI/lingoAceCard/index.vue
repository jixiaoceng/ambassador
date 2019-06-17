<template>
    <div class="lingoace-card-wrapper">
        <div class="lingoace-card-header flex-wrapper flex-space-between flex-column-center">
            <div class="lingoace-header-title">
                {{ title }}
            </div>
            <div>
                <slot name="header-right"></slot>
            </div>
        </div>
        <div class="screent-card-content">
        <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: '标题'
        }
    },
    data () {
        return {
            isOpenScreen: true
        }
    },
    methods: {
        toggleScreem () {
            this.isOpenScreen = !this.isOpenScreen
        }
    }
}
</script>

<style lang="scss" scoped>
.lingoace-card-wrapper {
    width: 100%;
    overflow: hidden;
    background: #fff;
    border: 1px solid #f3f3f3;
    .lingoace-card-header {
        padding: 0 20px;
        line-height: 50px;
        background-color: #F5F4F7;
        border-bottom: 1px solid #f3f3f3;
        .lingoace-header-title {
            font-size:14px;
            .lingoace-icon {
                margin-right: 5px;
            }
        }
    }
    .screent-card-content {
        padding: 10px;
        height: auto;
        .el-select {
            width: 100% !important;
        }
    }
}
</style>
