<template>
  <div>
    <profile-nav-bar />
    <login />
    <money />
    <profile-list />
  </div>
</template>

<script>
import Login from "./children/Login";
import Money from "./children/Money";
import ProfileList from "./children/ProfileList";
import ProfileNavBar from "./children/ProfileNavBar.vue";
export default {
  name: "Profile",
  components: {
    Login,
    Money,
    ProfileList,
    ProfileNavBar,
  },
};
</script>

<style scoped>
</style>
