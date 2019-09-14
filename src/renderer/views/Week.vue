<template>
  <div class="week-page">
      <div class="week-head">
            <div class="day-info day-col"
                v-for="index in 7" :key="index" 
                :class="{'ml-5': index > 1, 
                    'day-child': (index % 2), 
                    'day-head-active': index == current_day_of_week }">
                <span class="ml-5">{{getDayNameInfo(index)}} 
                    <b :class=" {'day-hilight': index == current_day_of_week }">
                        {{getDayNumberInfo(index)}}
                    </b>
                </span>
            </div>
      </div>
      <div class="week-body clearfix">
          
          <div class="todo-col day-col" 
            v-for="index in 7" :key="index" 
            :class="{'ml-5': index > 1, 
                'day-child': (index % 2), 
                'day-head-active': index == current_day_of_week}">
                <div class="add-todo-btn">
                    <img :src="add_img" alt="" srcset="" @click="toggleTaskModal">
                </div>
          </div>
          <tag-todo v-for="(item, index) in todos" :key="index*1000" :index="index" :item="item"></tag-todo>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
import Todo from '../models/Todo'
import AddImg from '../assets/Add.png'
import TagTodo from '../components/TagTodo'
import {mapActions, mapState} from 'vuex'

export default {
    components: {TagTodo},
    data() {
        return {
            first_day_of_week: moment().startOf('isoWeek'),
            current_day_of_week: parseInt(moment().isoWeekday()),
            todos: []
        }
    },
    computed: {
        ...mapState({
            refresh_todo: state => state.Task.refresh_todo
        }),
        model: _ => new Todo(),
        add_img: _ => AddImg
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        ...mapActions([
            'toggleTaskModal'
        ]),
        getDayNameInfo(index) {
            var date = moment().startOf('isoWeek')
            if(index == 1) {
                return date.format('ddd')
            } else {
                return date.add(index - 1, 'days').format('ddd')
            }
        },
        getDayNumberInfo(index) {
            var date = moment().startOf('isoWeek')
            if(index == 1) {
                return date.format('DD')
            } else {
                return date.add(index - 1, 'days').format('DD')
            }
        },
        fetchData() {
            this.model.fetch((err, data) => {
                this.todos = data
            })
        }
    },
    watch: {
        refresh_todo(value) {
            this.fetchData()
        }
    }
}
</script>

<style>

</style>