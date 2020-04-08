<template>
  <div class="d-flex" id="wrapper">
    <sidebar/>
  <div class="page-content-wrapper">
      <queue-comp/>
      <chat-comp/>
  </div>
</div>
</template>
<script>
import chatComp from "./chat.vue";
import queueComp from "./queue.vue";
import sidebar from "./sidebar.vue";
export default {
    name: "homeScreen",
    components: {
      chatComp,
      queueComp,
      sidebar
    }
}
</script>
<style scoped>
.page-content-wrapper {
  min-width: 0;
  width: 100%;
}
</style>