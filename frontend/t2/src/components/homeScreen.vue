<template>
  <div class="container">
      <queue-comp/>
      <chat-comp/>
  </div>
</template>
<script>
import chatComp from "./chat.vue";
import queueComp from "./queue.vue";
export default {
    name: "homeScreen",
    components: {
      chatComp,
      queueComp
    }
}
</script>