<template>
    <div>
        <el-dialog
        title="配置code"
        :visible.sync="dialogVisible"
        width="50%"
        @close="closeDialog">
            <el-form 
                ref="form" 
                :model="formData"
                label-width="120px"
            >
                <el-form-item label="code"> 
                    <el-input v-model="formData.data_code"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="ok">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ['nodeJson'], // 输入框的文本
    data() {
        return {
            formData: {},
            dialogVisible: true,
        }
    },
    created() {
        this.nodeJson ? this.formData = Object.assign({}, this.nodeJson) : this.formData = {}
    },
    methods: {
        closeDialog() { // 关闭弹窗
            this.dialogVisible = false
            this.$emit('closeDialog')
        },
        ok() { // 确定
            this.$emit('updateNode', JSON.stringify(this.formData))
        },
    },
}
</script>

<style lang="scss" scoped>

</style>