<template>
    <div class="tag-todo" 
        :style="{
            top: (top + index * 40 + (index > 0 ? 5 : 0)) +'px',
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
            <p class="tag-start-time">{{item.start_time}}</p>
        </div>
    </div>
</template>

<script>
import Todo from '../models/Todo'
import CheckBox from './CheckBox'
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
            top: 180,
            width: 100,
        }
    },
    computed: {
        background_color: {
            get() {
                let color = this.item.color.rgba
                return 'rgba(' + color.r +', '+ color.g +', '+ color.b +',' + color.a * 0.1 + ')'
            }
        }
    },
    mounted() {
        this.config()
        window.onresize = _ => {
            this.config()
        }
    },
    methods: {
        config() {
            let _width = window.innerWidth
            let one_day = (_width - 16 - 30) / 7
            this.width = one_day
            
        },
        
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
</style>