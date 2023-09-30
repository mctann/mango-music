<template>
  <v-app class="app">
    <div class="layout">
      <app-bar />

      <v-container>
        <v-main>
          <router-view />
        </v-main>
      </v-container>

      <bottom-bar />
    </div>
  </v-app>
</template>

<script lang="ts" setup>
import AppBar from "@/components/AppBar.vue";
import BottomBar from "@/components/BottomBar.vue";
</script>
