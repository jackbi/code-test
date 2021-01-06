<template>
    <section style="height: 100%;">
        <div id="myDiagramDivRight" style="height: 100%; background-color: rgb(255, 255, 255,0); position: relative; -webkit-tap-highlight-color: rgba(255, 255, 255, 0); cursor: auto;"></div>
    </section>
</template>

<script>
import createDuBang from './index.js';
export default {
    data() {
        return {
            newCreate: {},
            jsonData: {}
        }
    },
    created() {},
    mounted() {
        this.init();
    },
    methods: {
        init() {
            // 把LS中的值拿出来 放到go中渲染
            this.jsonData = localStorage.getItem('goNodeData')
            let params = {
                rightName: 'myDiagramDivRight',
            };
            let newCreate = new createDuBang(params);
            this.newCreate = newCreate;
            this.newCreate.init();
            this.newCreate.load(JSON.parse(this.jsonData));
        }
    }
}
</script>

<style lang="scss" scoped>

</style>