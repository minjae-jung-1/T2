<template>
  <div class="sidebar-wrapper bg-light border-right border-top">
      <div v-if="queueData" id="sidebarContainer" class="friendList">
          <div v-for="(user, index) in queueData.users" :key="index" class="friendTile bg-light">
              {{ user }}
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: "sidebar",
    data() {
        return {

        }
    },
    computed: {
        queueData() {
            return this.$store.getters.getQueue;
        }
    }
}
</script>

<style>
.sidebar-wrapper {
  min-height: calc(100vh - 48px);
  transition: margin .25s ease-out;
  border-top: 1px;

}
.friendList {
    width: 15rem;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
}

/* .friendTile .last {

} */
</style>