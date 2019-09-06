<template>
  <div class="week-page">
      <div class="week-head">
            <div class="day-info day-col"
                v-for="index in 7" :key="index" 
                :class="{'ml-5': index > 1, 
                    'day-child': (index % 2), 
                    'day-head-active': index == (current_day_of_week + 1) }">
                <span class="ml-5">{{getDayNameInfo(index)}} 
                    <b :class=" {'day-hilight': index == (current_day_of_week + 1) }">
                        {{getDayNumberInfo(index)}}
                    </b>
                </span>
            </div>
      </div>
      <div class="week-body">
          <div class="todo-task">
              
          </div>
          <div class="todo-col day-col" 
            v-for="index in 7" :key="index" 
            :class="{'ml-5': index > 1, 
                'day-child': (index % 2), 
                'day-head-active': index == (current_day_of_week + 1)}">
          </div>
      </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            first_day_of_week: moment().startOf('isoWeek'),
            current_day_of_week: parseInt(moment().startOf('isoWeek').format('d'))
        }
    },
    mounted() {
        console.log(this.current_day_of_week)
    },
    methods: {
        
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
        }
    }
}
</script>

<style>

</style>