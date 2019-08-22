<template>
  <div id="app">
    <title-bar></title-bar>
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import TitleBar from './components/TitleBar'
  import AppHeader from './components/AppHeader'
  export default {
    name: 'must-todo',
    components: {
      TitleBar,
      AppHeader
    }
  }
</script>

<style lang="scss">
  @import './styles/app.scss';
  /* CSS */
</style>
