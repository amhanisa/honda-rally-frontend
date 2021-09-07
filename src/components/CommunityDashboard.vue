<template>
  <div>
    <h1>Community Dashboard</h1>

    <div class="container max-w-4xl mx-auto p-5 shadow-xl">
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
                <IconAdd class="mr-2" /> <span class="font-bold">Add Team</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
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

export default {
  name: "CommunityDashboard",

  components: {
    Modal,
    IconSetting,
    IconTrash,
    IconAdd,
    Footer,
  },

  data() {
    return {
      team: 1,
      teams: [],
      showModalAdd: false,
      showModalEdit: false,
      showModalDelete: false,
      inputTeamId: "",
      inputTeamName: "",
      inputTeamScore: "",
    };
  },

  created() {
    axios.get(`${CONFIG.API_URL}/getAll`).then((res) => {
      console.log(res);
      this.teams = res.data;
    });
  },

  methods: {
    addTeam() {
      axios
        .post(`${CONFIG.API_URL}/addTeam`, { team: this.inputTeamName })
        .then((res) => {
          console.log(res);
          this.teams.push({
            id: res.data.id,
            team: this.inputTeamName,
            score: 0,
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

    openModalAdd() {
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
