<template>
  <el-dialog
    :visible.sync="show_dialog"
    width="320px"
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
       <p class="date-desc">{{time_work_preview}} </p>
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
                    :picker-options="pickerOptionsStart"
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
                    :picker-options="pickerOptionsEnd"
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
                <button class="done-btn" v-loading="busy" @click="save">Done</button>
            </el-col>
        </el-row>
    </div>
  </el-dialog>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import { Compact } from 'vue-color'
import moment from 'moment'
import Todo from '../models/Todo' 

let yesterday =  Date.now() - 86400000
let default_color = {
    hex: "#AEA1FF",
    rgba: {
        r: 174,
        g: 161,
        b: 255,
        a: 1
    },
}

export default {
    components: {
        'compact-picker': Compact
    },
    data() {
        
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
            busy: false,
            pickerOptionsStart: {
                disabledDate(date) {
                    return date.getTime() < yesterday
                }
            },
            pickerOptionsEnd: {
                disabledDate: this.disabledDateEnd
            }
        }
    },
    computed: {
        ...mapState( {
            current_data_edit: state => state.Task.current_data_edit
        }),
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
        },
        time_work_preview: {
            get() {
                var date_time = [this.formatDate(this.form.start_date)]
                date_time.push(this.formatTime(this.form.start_time))
                date_time.push('to')
                if(this.form.start_date == this.form.end_date) {
                    date_time.push(this.formatTime(this.form.end_time))
                } else {
                    date_time.push(this.formatDate(this.form.end_date))
                    date_time.push(this.formatTime(this.form.end_time))
                }
                return date_time.join(' ')
            }
        }
    },
    methods: {
        ...mapActions([
            'toggleTaskModal',
            'closeTaskModal',
            'refreshTodo'
        ]),
        formatDate(date) {
            return moment(date, 'YYYY/MM/DD').format('MMM DD, YYYY')
        },
        formatTime(time) {
            return moment(time, 'HH:mm').format('LT')
        },
        save() {
            if(!this.validate() || this.busy) return false
            this.busy = true
            var todo = new Todo()
            todo.create(this.form, (err, item) => {
                this.busy = false
                this.refreshTodo()
                this.closeTaskModal()
            })
        },
        resetForm(item = {}) {
            this.form = {
                title: item.title ? item.title : "",
                color: item.color ? item.color : {...default_color},
                start_time: item.start_time ? item.start_time : moment().format('HH:mm'),
                start_date: item.start_date ? item.start_date : moment().format('YYYY/MM/DD'),
                end_date: item.end_date ? item.end_date : moment().format('YYYY/MM/DD'),
                end_time: item.end_time ? item.end_time : moment().add(1, 'hour').format('HH:mm'),
                alert: item.alert ? item.alert : 10,
                note: item.note ? item.note : ""
            }
        },
        validate() {
            if(!this.form.title) {
                this.showError('Title invalid')
                return false
            }
            if(!this.form.start_date) {
                this.showError('Start date invalid')
                return false
            }
            if(!this.form.start_time) {
                this.showError('Start time invalid')
                return false
            }
            if(!this.form.end_date) {
                this.showError('End date invalid')
                return false
            }
            if(!this.form.end_time) {
                this.showError('End time invalid')
                return false
            }
            return true
        },
        showError(message) {
            this.$message({
                showClose: true,
                message: message,
                type: 'error'
            });
        },  
        disabledDateEnd(date) {
            return date.getTime() < moment(this.form.start_date).valueOf()
        }
    },
    watch: {
        'form.color'(value) {
            this.show_color = false
        },
        'form.start_date'(value) {
            if(moment(this.form.end_date).unix() < moment(value).unix()) {
                this.form.end_date = value
            }
        },
        'current_data_edit'(value) {
            if(Object.keys(value).length > 0) {
                this.resetForm(value)
            } else {
                this.resetForm()
            }
        },
    }
}
</script>

<style>

</style>