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
            <el-col :span="4">
                <el-popover
                    placement="bottom"
                    v-model="show_color"
                    popper-class="color-picker"
                    >
                    <template slot="reference">
                        <button class="add-color-btn" 
                        :style="{'background-color': form.color.hex}" 
                        ></button>
                    </template>
                    <div >
                        <compact-picker v-model="form.color" />
                    </div>
                </el-popover>
                
                
            </el-col>
        </el-row>
    </div>
    <div class="t-row p-15  t-date-time">
       <p class="date-desc">Aug 12, 2019  2PM to 3 PM  </p>
       <div class="date-detail">
           <el-row :gutter="10">
               <el-col :span="6" class="text-right text-label">Start</el-col>
               <el-col :span="8" class="text-date">
                   <el-date-picker
                    v-model="form.start_date"
                    type="date"
                    format="MMM dd, yyyy"
                    class="input-date"
                    popper-class="date-custom"
                    prefix-icon="no-icon"
                    size="mini"
                    value-format="yyyy/MM/dd"
                    placeholder="Pick a day">
                    </el-date-picker>
                </el-col>
               <el-col :span="8" class="text-date">
                    <el-time-picker
                    v-model="form.start_time"
                    format="hh:mm A"
                    class="input-date"
                    prefix-icon="no-icon"
                    value-format="HH:mm"
                    placeholder="time">
                    </el-time-picker>
               </el-col>
           </el-row>
           <el-row :gutter="10">
               <el-col :span="6" class="text-right text-label">End</el-col>
               <el-col :span="8" class="text-date">
                   <el-date-picker
                    v-model="form.end_date"
                    type="date"
                    format="MMM dd, yyyy"
                    class="input-date"
                    popper-class="date-custom"
                    prefix-icon="no-icon"
                    size="mini"
                    value-format="yyyy/MM/dd"
                    placeholder="Pick a day">
                    </el-date-picker>
               </el-col>
               <el-col :span="8" class="text-date">
                   <el-time-picker
                    v-model="form.end_time"
                    format="hh:mm A"
                    class="input-date"
                    value-format="HH:mm"
                    prefix-icon="no-icon"
                    placeholder="time">
                    </el-time-picker>
               </el-col>
           </el-row>
           <el-row :gutter="10">
               <el-col :span="6" class="text-right text-label">Alert</el-col>
               <el-col :span="18" class="text-date">
                   <el-select v-model="form.alert" class="alert-select" placeholder="Select">
                        <el-option
                            v-for="(item, index) in alert_option"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                            >
                        </el-option>
                    </el-select>
               </el-col>
               
           </el-row>
       </div>
       
    </div>
    <div class="t-row p-15 task-note">
        <textarea-autosize
        placeholder="Take Note"
        ref="task_note"
        class="task-title"
        v-model="form.note"
        ></textarea-autosize>
    </div>
    <div class="t-row p-15 t-button">
        <el-row>
            <el-col :span="12" class="text-center">
                <button class="close-btn" @click="closeTaskModal">Close</button>
            </el-col>
            <el-col :span="12" class="text-center">
                <button class="done-btn" @click="save">Done</button>
            </el-col>
        </el-row>
    </div>
  </el-dialog>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import { Compact } from 'vue-color'
import moment from 'moment'

export default {
    components: {
        'compact-picker': Compact
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
                start_time: moment().format('HH:mm'),
                start_date: moment().format('YYYY/MM/DD'),
                end_date: moment().format('YYYY/MM/DD'),
                end_time: moment().add(1, 'hour').format('HH:mm'),
                alert: 10,
                note: ""
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
        },
        alert_option: _ => {
            return [
                {
                    value: 10,
                    label: '10 mins Before'
                },
                {
                    value: 20,
                    label: '20 mins Before'
                },
                {
                    value: 30,
                    label: '30 mins Before'
                },
            ]
        } 
    },
    methods: {
        ...mapActions([
            'toggleTaskModal',
            'closeTaskModal'
        ]),
        save() {
            
        },
    },
    watch: {
        'form.color'(value) {
            this.show_color = false
        },
    }
}
</script>

<style>

</style>