<template>
    <el-popover
        placement="bottom"
        :title="item.title"
        trigger="click"
        v-model="show_action"
        >
        <template slot="reference">
            <div class="tag-todo" 
                :style="{
                    top: style_top + 'px',
                    left: style_left + 'px',
                    'background-color': background_color,
                    width: width + 'px'
                }">
                <check-box v-model="item.done"></check-box>
                <div class="t-content" 
                    :style="{
                        color: item.color.hex
                    }"
                    >
                    <p class="tag-title">{{item.title}}</p>
                    <p class="tag-start-time">{{start_time}}</p>
                </div>
            </div>
        </template>
        <div class="tag-action">
            <ul class="tag-action-ul">
                <li class="action-row action-done" @click="onDone">
                    <i class="el-icon-success"></i>
                    Done
                </li>
                <li class="action-row action-cancel" @click="onCancel">
                    <i class="el-icon-error"></i>
                    Cancel
                </li>
                <li class="action-row action-edit" @click="onEdit">
                    <i class="el-icon-edit"></i>
                    Edit
                </li>
                <li class="action-row action-delete" @click="onDelete">
                    <i class="el-icon-delete"></i>
                    Delete
                </li>
            </ul>
        </div>
    </el-popover>
</template>

<script>
import Todo from '../models/Todo'
import CheckBox from './CheckBox'
import moment from 'moment'
import {mapActions} from 'vuex'

export default {
    components: {CheckBox},
    props: {
        item: {
            type: Object,
            default: {}
        },
        index: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            top: 185,
            left: 8,
            width: 100,
            one_day: 0,
            show_action: false
        }
    },
    computed: {
        background_color: {
            get() {
                let color = this.item.color.rgba
                return 'rgba(' + color.r +', '+ color.g +', '+ color.b +',' + color.a * 0.1 + ')'
            }
        },
        start_time: {
            get() {
                return  moment(this.item.start_time, 'HH:mm').format('LT')
            }
        },
        start_date: {
            get() {
                return  moment(this.item.start_date).isoWeekday()
            }
        },
        day_range: {
            get() {
                var range = moment(this.item.end_date).isoWeekday() - moment(this.item.start_date).isoWeekday()
                return range + 1
            }
        },
        style_top: {
            get() {
                return this.top + this.index * 40 + (this.index - 1) * 5
            }
        },
        style_left: {
            get() {
                return this.left + (this.start_date - 1) * (5 + this.one_day)
            }
        }
    },
    mounted() {
        
        this.config()
        window.addEventListener('resize', _ => {
            this.config()
        })
    },
    methods: {
        ...mapActions([
            'toggleTaskModal',
            'closeTaskModal'
        ]),
        config() {
            let _width = window.innerWidth
            this.one_day = (_width - 16 - 30) / 7
            this.width = this.one_day * this.day_range + (this.day_range - 1) * 5
        },
        onDone() {
            this.show_action = false
        },
        onCancel() {
            this.show_action = false
        },
        onEdit() {
            this.show_action = false
            this.toggleTaskModal(this.item)
        },
        onDelete() {
            this.show_action = false
            this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: 'Delete completed'
                });
            }).catch(() => {});
        }
    }
}
</script>

<style lang="scss">
.tag-todo {
    position: absolute;
    display: flex;
    height: 40px;
    font-size: 12px;
    line-height: 18px;
    p {
        margin: 0;
    }
}
.t-content {
    padding: 5px 0;
    width: 100%;
    .tag-title {
        font-weight: 600;
    }
}
.tag-action-ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
}
.action-row {
    padding: 5px;
    &:hover {
        background-color: #fbfbfb;
        cursor: pointer;
    }
}
.action-done {
    color: #219653;
}
.action-cancel {
    color: #EB5757;
}
.action-edit {
    color: #383535;
}
.action-delete {
    color: #383535;
}
</style>