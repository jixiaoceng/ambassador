<template>
    <el-scrollbar class="lingoace-pagination">
        <el-pagination
            class="text-right"
            background
            layout="total, prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :total="total">
        </el-pagination>
    </el-scrollbar>
</template>

<script>
export default {
    props: {
        // 当前页
        currentPage: {
            type: Number || String,
            default: 1
        },
        // 默认多少条
        pageSize: {
            type: Number || String,
            default: 10
        },
        // 一共多少个元素
        total: {
            type: Number || String,
            default: 0
        }
    },
    methods: {
        handleCurrentChange (currentPage) {
            this.$emit('getCurrentPage', currentPage)
        },
        handleSizeChange (pageSize) {
            this.$emit('getPerPage', pageSize)
        }
    }
}
</script>

<style lang="scss" scoped>
.lingoace-pagination{
  margin: 20px 0 0
}
</style>
