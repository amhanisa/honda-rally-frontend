<template>
  <div>
    <h1>Honda Challenge Dashboard</h1>

    <div class="container mx-auto">
      <div class="sm:mx-auto max-w-4xl mx-5 p-5 rounded-md shadow-md mb-5">
        <div class="flex flex-col sm:flex-row justify-between sm:items-end">
          <div>
            <p class="text-left font-bold text-sm mb-2">Select Category:</p>
            <div class="flex flex-col sm:flex-row">
              <select v-model="type" @change="applyType">
                <option disabled>Please select one</option>
                <option value="COMMUNITY">Community</option>
                <option value="CONSUMENT">Consument</option>
                <option value="MEDIA">Media</option>
                <option value="MANAGER">Manager</option>
              </select>
              <button @click="applyType" class="btn">
                <IconRefresh class="mr-2" />
                <span class="font-bold"> Refresh </span>
              </button>
              <button @click="logout" class="btn">
                <IconLogout class="mr-2" />
                <span class="font-bold"> Logout </span>
              </button>
            </div>
          </div>
          <div>
            <p class="text-left font-bold text-sm mt-3 sm:mb-2">
              Website Status:
            </p>
            <button
              @click="openModalEnableWebsite"
              class="btn btn-green"
              :class="{
                'btn-red':
                  this.enableWebsite === 0 || this.enableWebsite === false,
              }"
            >
              <span
                v-if="this.enableWebsite === 1 || this.enableWebsite === true"
                class="font-bold"
              >
                Enabled
              </span>
              <span v-else class="font-bold"> Disabled </span>
            </button>
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
              <td class="font-bold text-lg w-36">Team Name</td>
              <td class="font-bold text-lg w-36">Score</td>
              <td class="font-bold text-lg w-5">Config</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in teams"
              :key="index"
              class="border-b-2 border-gray-100"
            >
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
                <button @click="deleteTeam(item)" class="btn-sm">
                  <IconTrash class="h-4 w-4" />
                </button>
              </td>
            </tr>
            <tr>
              <td colspan="4" class="h-14 py-4">
                <button @click="openModalAdd" class="btn btn-long">
                  <IconAdd class="mr-2" />
                  <span class="font-bold">Add Team</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Footer></Footer>

    <Modal v-show="this.showModalAdd" @close="this.closeModalAdd">
      <template v-slot:header>Add Team</template>
      <template v-slot:body>
        <label for="first-name" class="block text-sm font-medium text-gray-700">
          Team Name
        </label>
        <input
          type="text"
          name="first-name"
          id="first-name"
          v-model="inputTeamName"
          autocomplete="given-name"
          class="input"
        />
      </template>
      <template v-slot:footer>
        <button @click="addTeam" class="btn btn-primary">Add</button>
      </template>
    </Modal>

    <Modal v-show="this.showModalEdit" @close="closeModalEdit">
      <template v-slot:header>Edit Team</template>
      <template v-slot:body>
        <div class="mb-2">
          <label for="first-name" class="block text-sm font-bold text-gray-700">
            Team Name
          </label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            autocomplete="given-name"
            v-model="this.inputTeamName"
            class="input"
          />
        </div>
        <div>
          <label for="first-name" class="block text-sm font-bold text-gray-700">
            Score
          </label>
          <input
            type="text"
            name="first-name"
            id="first-name"
            autocomplete="given-name"
            v-model="this.inputTeamScore"
            @blur="calculate(this.inputTeamScore)"
            class="input"
          />
        </div>
      </template>
      <template v-slot:footer>
        <button @click="updateTeam()" class="btn btn-primary">Update</button>
      </template>
    </Modal>

    <Modal v-show="this.showModalDelete" @close="this.closeModalDelete">
      <template v-slot:header>Delete Team</template>
      <template v-slot:body>
        <p>
          Are you sure to delete
          <span class="font-bold">{{ inputTeamName }}</span
          >?
        </p>
      </template>
      <template v-slot:footer>
        <button @click="destroyTeam" class="btn btn-primary">Delete</button>
      </template>
    </Modal>

    <Modal
      v-show="this.showModalEnableWebsite"
      @close="this.closeModalEnableWebsite"
    >
      <template v-slot:header>Active/Deactive Website</template>
      <template v-slot:body>
        <p>
          Are you sure to
          <span v-if="this.enableWebsite" class="font-bold">disable</span>
          <span v-else class="font-bold">enable</span>
          the website?
        </p>
      </template>
      <template v-slot:footer>
        <button @click="toggleEnableWebsite" class="btn btn-primary">
          Okay
        </button>
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
import IconTrash from "../assets/IconTrash.vue";
import IconAdd from "../assets/IconAdd";
import IconRefresh from "../assets/IconRefesh.vue";
import IconLogout from "../assets/IconLogout.vue";

export default {
  name: "CommunityDashboard",

  components: {
    Modal,
    IconSetting,
    IconTrash,
    IconAdd,
    IconRefresh,
    IconLogout,
    Footer,
  },

  data() {
    return {
      type: "",
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
