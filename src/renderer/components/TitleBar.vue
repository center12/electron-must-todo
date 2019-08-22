<template>
    <div class="title-bar">
        <el-radio-group v-model="view_mode" 
            size="mini" 
            fill="rgba(175, 147, 233, 0.2)" 
            text-color="#000000"
            class="view-mode">
            <el-radio-button label="day" >Day</el-radio-button>
            <el-radio-button label="week" >Week</el-radio-button>
            <el-radio-button label="month" >Month</el-radio-button>
        </el-radio-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
            view_mode: "week"
        }
    }
}
</script>

<style lang="scss">

</style>