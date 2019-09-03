<template>
  <div id="app">
    <title-bar></title-bar>
    <app-header></app-header>
    <task-modal></task-modal>
    <div class="todo-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import TitleBar from './components/TitleBar'
  import AppHeader from './components/AppHeader'
  import TaskModal from './components/TaskModal'
  export default {
    name: 'must-todo',
    components: {
      TitleBar,
      AppHeader,
      TaskModal
    }
  }
</script>

<style lang="scss">
  @import './styles/app.scss';
  /* CSS */
  body {
    -webkit-app-region: drag;
  }
</style>
