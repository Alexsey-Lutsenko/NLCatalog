<template>
  <div class="wrapper">
    <component v-if="layout" :is="layout + '-layout'"></component>
    <div class="page__container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import MainLayout from "./layouts/MainLayout.vue";

export default {
  name: "App",
  data() {
    return {
      route: useRoute(),
      sityId: 1,
    };
  },

  mounted() {
    if (!localStorage.getItem("cityId")) {
      localStorage.setItem("cityId", 1);
    }
  },

  computed: {
    layout() {
      return this.route.meta.layout;
    },
  },

  components: {
    MainLayout,
  },
};
</script>

<style scoped>
.page__container {
  margin: 72px 0px 0px 0px;
}
</style>
