<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <a-layout class="layout" style="height: inherit">
    <a-layout-header>
      <img
        alt="Vue logo"
        class="logo"
        src="@/assets/logo.svg"
        width="38"
        height="38"
      />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <RouterView />
    </a-layout-content>
    <a-layout-footer style="text-align: center; padding: 15px 50px;">
      凌晨 ©2025 Created by Vite
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
.layout :deep(.ant-layout-content) {
  padding: 0 15px !important;
}
.layout :deep(.ant-layout-content > main) {
  height: 100%;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: rgb(185, 221, 113);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: #fff;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    margin: 0;
  }
}
</style>
