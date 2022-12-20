<template>
  <div>
    <h1>SPK Dashboard</h1>

    <div class="container mx-auto">
      <div class="sm:mx-auto max-w-4xl mx-5 p-5 rounded-md shadow-md mb-5">
        <div class="flex flex-col sm:flex-row justify-between sm:items-end">
          <div>
            <div class="flex flex-col sm:flex-row">
              <button @click="applyType" class="btn">
                <IconRefresh class="mr-2" />
                <span class="font-bold"> Refresh </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto">
      <div class="max-w-4xl sm:mx-auto mx-5 p-5 shadow-xl">
        <table class="w-full">
          <thead>
            <tr class="border-b-2 border-gray-100">
              <td class="font-bold text-lg w-12">No</td>
              <td class="font-bold text-lg w-36">Dealer Name</td>
              <td class="font-bold text-lg w-36">Count</td>
              <td class="font-bold text-lg w-5">Config</td>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, index) in teams" :key="index">
              <tr v-if="index == 1" class="border-b-2 border-gray-100">
                <td class="team-number">{{ index + 1 }}</td>
                <td class="team-name">
                  {{ item.team }}
                </td>
                <td class="team-score">
                  {{ item.score }}
                </td>
                <td class="flex items-center justify-center h-14">
                  <button @click="editTeam(item)" class="btn-sm">
                    <IconSetting class="h-4 w-4" />
                  </button>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <Footer></Footer>

    <Modal v-show="this.showModalEdit" @close="closeModalEdit">
      <template v-slot:header>Edit Team</template>
      <template v-slot:body>
        <div class="mb-2">
          <label for="first-name" class="block text-sm font-bold text-gray-700">
            Dealer Name
          </label>
          <input disabled type="text" name="first-name" id="first-name" autocomplete="given-name"
            v-model="this.inputTeamName" class="input" />
        </div>
        <div>
          <label for="first-name" class="block text-sm font-bold text-gray-700">
            SPK Count
          </label>
          <input type="text" name="first-name" id="first-name" autocomplete="given-name" v-model="this.inputTeamScore"
            @blur="calculate(this.inputTeamScore)" class="input" />
        </div>
      </template>
      <template v-slot:footer>
        <button @click="updateTeam()" class="btn btn-primary">Update</button>
      </template>
    </Modal>

  </div>
</template>

<script>
import CONFIG from "../config/config";
import axios from "axios";
import Modal from "./Modal.vue";
import Footer from "./Footer.vue";
import IconSetting from "../assets/IconSetting.vue";
import IconRefresh from "../assets/IconRefesh.vue";

export default {
  name: "DealerTwo",

  components: {
    Modal,
    IconSetting,
    IconRefresh,
    Footer,
  },

  data() {
    return {
      type: "SPK",
      teams: [],
      showModalAdd: false,
      showModalEdit: false,
      showModalDelete: false,
      showModalEnableWebsite: false,
      enableWebsite: null,
      inputTeamId: "",
      inputTeamName: "",
      inputTeamScore: "",
    };
  },

  mounted() {
    axios.get(`${CONFIG.API_URL}/checkAccess`).then((res) => {
      console.log(res);
      this.enableWebsite = res.data;
    });

    this.applyType();
  },

  methods: {
    applyType() {
      if (!this.checkType()) {
        return;
      }

      axios.get(`${CONFIG.API_URL}/getAll?type=${this.type}`).then((res) => {
        console.log(res);
        this.teams = res.data;
      });
    },

    checkType() {
      if (this.type === "") {
        alert("select category dulu");
        return false;
      }
      return true;
    },

    calculate(item) {
      this.inputTeamScore = eval(item);
    },

    addTeam() {
      axios
        .post(`${CONFIG.API_URL}/addTeam`, {
          team: this.inputTeamName,
          type: this.type,
        })
        .then((res) => {
          console.log(res);
          this.teams.push({
            id: res.data.id,
            team: this.inputTeamName,
            score: 0,
            type: this.type,
          });
          this.closeModalAdd();
        });
    },
    editTeam(team) {
      this.openModalEdit();
      console.log(team);
      this.inputTeamId = team.id;
      this.inputTeamName = team.team;
      this.inputTeamScore = team.score;
    },
    updateTeam() {
      const newData = {
        id: this.inputTeamId,
        team: this.inputTeamName,
        score: this.inputTeamScore,
      };

      axios.post(`${CONFIG.API_URL}/updateTeam`, newData).then((res) => {
        console.log(res);
        this.teams[
          this.teams.findIndex((team) => team.id === this.inputTeamId)
        ] = newData;

        this.closeModalEdit();
      });
    },
    deleteTeam(team) {
      this.openModalDelete();
      this.inputTeamId = team.id;
      this.inputTeamName = team.team;
    },
    destroyTeam() {
      axios
        .post(`${CONFIG.API_URL}/deleteTeam`, { id: this.inputTeamId })
        .then((res) => {
          console.log(res);
          this.teams.splice(
            this.teams.findIndex((team) => team.id === this.inputTeamId),
            1
          );
          this.closeModalDelete();
        });
    },
    toggleEnableWebsite() {
      axios
        .post(`${CONFIG.API_URL}/toggleEnableWebsite`, {
          value: !this.enableWebsite,
        })
        .then((res) => {
          console.log(res);
          this.enableWebsite = !this.enableWebsite;
          console.log(this.enableWebsite);
          this.closeModalEnableWebsite();
        });
    },

    openModalAdd() {
      if (!this.checkType()) {
        return;
      }
      this.inputTeamId = "";
      this.inputTeamName = "";
      this.showModalAdd = true;
    },
    closeModalAdd() {
      this.showModalAdd = false;
    },
    openModalEdit() {
      this.showModalEdit = true;
    },
    closeModalEdit() {
      this.showModalEdit = false;
    },
    openModalDelete() {
      this.showModalDelete = true;
    },
    closeModalDelete() {
      this.showModalDelete = false;
    },
    openModalEnableWebsite() {
      this.showModalEnableWebsite = true;
    },
    closeModalEnableWebsite() {
      this.showModalEnableWebsite = false;
    },

    logout() {
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
