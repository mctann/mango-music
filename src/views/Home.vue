<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Search artist, album, title"
          v-model="searchText"
          variant="solo-filled"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-btn color="primary" @click="searchMusic">Search</v-btn>
      </v-col>
    </v-row>

    <v-row v-if="musicList.length > 0">
      <v-col cols="12">
        Search for
        <span class="text-primary font-weight-medium">{{
          displaySearchText
        }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(list, index) in musicList" cols="12" :key="index">
        <v-card color="grey-lighten-5" rounded="">
          <div class="d-flex flex-no-wrap">
            <v-avatar class="ma-3" size="125" rounded="0">
              <v-img
                :src="list.artworkUrl100"
                cursor="pointer"
                rounded
                @click="openModal(list)"
              >
                <v-icon class="overlay-icon">mdi-play-circle</v-icon></v-img
              >
            </v-avatar>
            <div>
              <div class="text-caption text-uppercase px-4 pt-2">
                {{ getTitleCard(list.artistName, list.releaseDate) }}
              </div>
              <v-card-title>
                <div class="headerClass">
                  {{ list.trackName }}
                </div>
              </v-card-title>

              <v-card-item>
                <v-chip
                  variant="elevated"
                  :color="getChipColorClass(list.primaryGenreName)"
                >
                  {{ list.primaryGenreName }}
                </v-chip>
              </v-card-item>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Modal dialog for playing sound -->
    <v-dialog v-model="modalOpen" max-width="400">
      <v-card>
        <v-card-title> {{ selectedMusic.trackName }} </v-card-title>
        <v-card-text>
          <!-- Add your sound player component here -->
          <!-- For example, you can use an HTML5 audio element -->
          <audio controls autoplay>
            <source :src="selectedMusic.previewUrl" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </v-card-text>
        <v-card-actions>
        <v-spacer/>
          <v-btn color="primary" @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import { ref } from "vue"; // Import ref for reactive properties
import MusicDataService from "@/services/MusicDataService";
import Music from "@/types/Music";

export default {
  setup() {
    // Define searchText as a reactive property
    const searchText = ref("");
    const displaySearchText = ref("");
    const modalOpen = ref(false);
    const selectedMusic = ref<Music>({
      trackName: "",
      artistName: "",
      artworkUrl100: "",
      primaryGenreName: "",
    });
    const musicList = ref<Music[]>([]);

    // Define a computed property for generating color classes
    const getChipColorClass = (genre: string) => {
      // Define color logic based on genre
      switch (genre) {
        case "Pop":
          return "primary";
        case "Rock":
          return "red";
        case "Alternative":
          return "yellow";
        case "Electronica":
          return "deep-purple";
        case "Hard Rock":
          return "indigo";
        case "Metal":
          return "teal";
        default:
          return "blue";
      }
    };

    // Define a computed property for title card
    const getTitleCard = (artist: string, releaseDate: Date) => {
      const date = new Date(releaseDate);
      return `${artist} • ${date.getFullYear()}`;
    };

    // Define search Music method
    const searchMusic = async () => {
      try {
        const response = await MusicDataService.getAll({
          searchTerm: searchText.value,
        });
        // Use searchText.value to access the value
        displaySearchText.value = searchText.value;
        musicList.value = response;
      } catch (error) {
        console.error("Error fetching music tracks:", error);
      }
    };

    const openModal = (list: Music) => {
      selectedMusic.value = list;
      modalOpen.value = true;

    };

    const closeModal = () => {
      modalOpen.value = false;
    };

    // Return variables and methods for use in the template
    return {
      searchText,
      displaySearchText,
      musicList,
      selectedMusic,
      modalOpen,
      getChipColorClass,
      getTitleCard,
      searchMusic,
      openModal,
      closeModal,
    };
  },
};
</script>

<style scoped>
.headerClass {
  white-space: normal;
}

.overlay-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  color: white;
  cursor: pointer;
}
</style>
