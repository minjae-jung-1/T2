<template>
  <div>
      
  </div>
</template>

<script>
// put Imports here

export default {
    name: "profile",
    props: ["userId"],
    data() {
        return {
            user: {}
        }
    },
    methods: {
        async getProfile() {
            const res = await axios.get(`https://localhost:3000/api/users/${userId}`);
            if (res.status === 200){
                this.user = res.data;
            }
        }
    },
    mounted() {
        this.getProfile();
        console.log("shit happenin?", this.userId);
        // anything you want to run on page load
    }
}
</script>

<style>

</style>