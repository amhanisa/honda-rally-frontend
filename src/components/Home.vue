<template>
  <div>
    <Header></Header>
    <div class="container mx-auto">
      <div class="flex flex-row justify-center mt-8">
        <img src="../assets/rank1.svg" alt="Rank 1" class="h-16" />
        <img src="../assets/rank2.svg" alt="Rank 2" class="h-16" />
        <img src="../assets/rank3.svg" alt="Rank 3" class="h-16" />
      </div>
      <div class="max-w-md p-5 mx-5 mt-4 sm:mx-auto shadow-xl rounded-md">
        <div class="flex flex-col">
          <p class="font-bold text-lg mb-3 text-gray-400">Select Category</p>
          <router-link class="btn my-4 btn-home" to="/community">
            Community
          </router-link>
          <router-link class="btn my-4 btn-home" to="/consument">
            Consument
          </router-link>
          <router-link class="btn my-4 btn-home" to="/media">
            Media
          </router-link>
          <router-link class="btn my-4 btn-home" to="/manager">
            Manager
          </router-link>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  name: "Home",
  components: {
    Header,
    Footer,
  },
};
</script>