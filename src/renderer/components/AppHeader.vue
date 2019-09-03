<template>
    <div class="app-header">
        <el-row>
            <el-col :span="12">
                <span class="date-title">
                    <strong>August</strong>, 2019
                </span>
            </el-col>
            <el-col :span="12">
                <button class="add-task-btn" @click="toggleTaskModal">
                    <i class="el-icon-circle-plus-outline"></i><span>Add task</span> 
                </button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    methods: {
        ...mapActions([
            'toggleTaskModal'
        ]),
    }
}
</script>

<style lang="scss">

</style>