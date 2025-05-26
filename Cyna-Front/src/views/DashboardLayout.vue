<template>
  <div class="dashboard-layout">
    <div class="row g-0">
      <div class="col-md-3 col-lg-2">
        <Sidebar />
      </div>
      <div class="col-md-9 col-lg-10">
        <div class="content-area p-4">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from "../components/Sidebar.vue";
export default defineComponent({
  name: 'DashboardLayout',
  components: {
    Sidebar
  }
});
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.content-area {
  min-height: 100vh;
  background-color: #ffffff;
}
</style>