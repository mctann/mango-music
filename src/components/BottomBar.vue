<template>
  <v-bottom-navigation app fixed grow v-model="activeItem" color="primary" >
    <v-btn value="home" icon>
      <v-icon>mdi-home</v-icon>
      <span>Home</span>
    </v-btn>

    <v-btn value="search" icon>
      <v-icon>mdi-magnify</v-icon>
      <span>Search</span>
    </v-btn>

    <v-btn value="library" icon>
      <v-icon>mdi-library</v-icon>
      <span>Library</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script lang="ts">
export default {
  data: () => ({
    activeItem: "home" as string,
  }),
};
</script>
