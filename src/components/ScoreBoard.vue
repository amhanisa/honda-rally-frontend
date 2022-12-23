<template>
  <div>
    <div class="container mx-auto">
      <div class="max-w-xl sm:mx-auto p-5 pt-0 rounded-md shadow-xl mx-5 mt-0">
        <div class="list-complete-item mb-1">
          <span class="w-28 font-bold text-2xl">Rank</span>
          <span class="w-96 font-bold text-2xl">Dealer Name</span>
          <span class="w-28 font-bold text-2xl">Count</span>
        </div>
        <hr class="mb-1 border-t-2" />
        <transition-group name="list-complete" tag="ul">
          <li v-for="(item, index) in teams" :key="item.id" class="list-complete-item my-2">
            <span v-if="index === 0" class="w-28">
              <img src="../assets/rank1.svg" alt="Rank 1" class="w-12 mx-auto" />
            </span>
            <span v-else-if="index === 1" class="w-28">
              <img src="../assets/rank2.svg" alt="Rank 2" class="w-12 mx-auto" />
            </span>
            <span v-else-if="index === 2" class="w-28">
              <img src="../assets/rank3.svg" alt="Rank 3" class="w-12 mx-auto self-center" />
            </span>
            <span v-else class="w-28">{{ index + 1 }}</span>

            <span v-if="index < 3" class="w-96 font-bold text-2xl self-center">{{ item.team }}</span>
            <span v-else class="w-96">{{ item.team }}</span>

            <span v-if="index < 3" class="w-28 font-bold text-2xl self-center">{{ item.score }}</span>
            <span v-else class="w-28">{{ item.score }}</span>
          </li>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Scoreboard",
  props: ["teams"],
};
</script>