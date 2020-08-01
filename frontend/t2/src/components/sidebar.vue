<template>
  <div class="sidebar-wrapper bg-light border-right border-top">
      <div v-if="queueData" id="sidebarContainer" class="friendList">
          <div v-for="(user, index) in queueData.users" :key="index" class="friendTile bg-light">
              <div class='icon-container'>
                <img :src="user.avi"/>
                <div :class='checkStatus(user)'>
                </div>
            </div>
            <p> {{ user.status }} </p>
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
    methods:{
        checkStatus(user){
            if(user.status.toLowerCase() === "online"){
                return "status-online"
            }else{
                return "status-busy"
            }
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


.friendTile img{
  float: left;
  max-width: 60px;
  width: 100%;
  height: 60px;
  margin-right: 20px;
  border-radius: 50%;
  max-height: 60px;
  overflow: hidden;
  width: auto;

}

.icon-container {
  width: 60px;
  height: 60px;
  position: relative;
}

.status-circle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: grey;
  border: 2px solid white;
  bottom: 0;
  right: 0;
  position: absolute;
}

.status-online {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: green;
  border: 2px solid white;
  bottom: 0;
  right: 0;
  position: absolute;
}
.status-busy {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: yellow;
  border: 2px solid white;
  bottom: 0;
  right: 0;
  position: absolute;
}

.friendTile{
    display: inline;

}
/* .friendTile .last {

} */
</style>