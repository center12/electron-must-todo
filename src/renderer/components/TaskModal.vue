<template>
  <el-dialog
    :visible.sync="show_dialog"
    width="300px"
    :show-close="false"
  >
    <div class="t-title p-15  t-row">
        <el-row>
            <el-col :span="20">
                <textarea-autosize
                    placeholder="New Task"
                    ref="someName"
                    class="task-title"
                    v-model="form.title"
                    ></textarea-autosize>
            </el-col>
            <el-col :span="4" v-click-outside="hideColorPicker">
                <button class="add-color-btn" :style="{'background-color': form.color.hex}" @click="toggleColorPicker"></button>
                <div class="color-picker"  v-if="show_color">
                    <compact-picker v-model="form.color" />
                </div>
            </el-col>
        </el-row>
    </div>
    <div class="t-row p-15  t-date-time">
       <p class="date-desc">Aug 12, 2019  2PM to 3 PM  </p>
       <div class="date-detail">
           <el-row :gutter="10">
               <el-col :span="6" class="text-right text-label">Start</el-col>
               <el-col :span="8" class="text-date">Aug 12, 2019 </el-col>
               <el-col :span="8" class="text-date">10:00 PM </el-col>
           </el-row>
           <el-row :gutter="10">
               <el-col :span="6" class="text-right text-label">Start</el-col>
               <el-col :span="8" class="text-date">Aug 12, 2019 </el-col>
               <el-col :span="8" class="text-date">10:00 PM </el-col>
           </el-row>
       </div>
    </div>
  </el-dialog>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import { Compact } from 'vue-color'
import ClickOutside from 'vue-click-outside'
export default {
    components: {
        'compact-picker': Compact
    },
    directives: {
        ClickOutside
    },
    data() {
        let default_color = {
            hex: "#AEA1FF",
            rgba: {
                r: 174,
                g: 161,
                b: 255,
                a: 1
            },
        }
        return {
            form: {
                title: "",
                color: {...default_color},
                start_time: "",
                start_date: ""
            },
            show_color: false,
        }
    },
    computed: {
        show_dialog: {
            get() {
                return this.$store.state.Task.show_dialog
            },
            set() {
                this.closeTaskModal()
            }
        }
    },
    methods: {
        ...mapActions([
            'toggleTaskModal',
            'closeTaskModal'
        ]),
        toggleColorPicker() {
            this.show_color = !this.show_color
        },
        hideColorPicker() {
            this.show_color = false
        },
    },
    watch: {
        'form.color'(value) {
            console.log(value)
        }
    }
}
</script>

<style>

</style>