<template>
  <!------------------|header|-->
  <headerComponent></headerComponent>

  <!------------------|main|-------->
  <router-view></router-view>

</template>


<script>
import headerComponent from './pages/dashboard/layout/header.vue'

export default {
  components: {headerComponent}
}
</script>
