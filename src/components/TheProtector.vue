<template>
  <div class="container mx-auto">
    <div class="sm:max-w-xs mx-5 sm:mx-auto p-5 rounded-md shadow-2xl">
      <label
        for="first-name"
        class="block text-sm text-left font-bold text-gray-700"
      >
        Password
      </label>
      <input
        v-model="this.password"
        type="password"
        class="
          mt-1
          focus:ring-indigo-500
          focus:border-indigo-500
          block
          w-full
          shadow-sm
          sm:text-sm
          border-gray-300
          rounded-md
          mb-3
        "
      />
      <p v-if="this.error" class="my-2 text-red-500">Password Salah</p>
      <button @click="checkPassword" class="btn btn-primary">OK</button>
    </div>
  </div>
</template>
<script>
import router from "../router";

export default {
  data() {
    return {
      password: "",
      error: false,
    };
  },

  methods: {
    checkPassword() {
      console.log(this.password);
      if (this.password === "aingganteng") {
        localStorage.setItem("user-password", this.password);
        this.error = false;
        router.push("/app");
      } else {
        this.error = true;
      }
    },
  },
};
</script>