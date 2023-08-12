<template>
  <v-app>
    <app-bar />

    <v-container class="container">
      <v-main>
        <router-view />
      </v-main>
    </v-container>

    <bottom-bar />
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from "@/components/AppBar.vue";
import BottomBar from "@/components/BottomBar.vue";
</script>
