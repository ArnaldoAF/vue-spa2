<template>
  <nav class="nav has-shadow">
    <div class="container">
      <router-link to="/" exact>
        <img src="" alt="Vue SPA" />
      </router-link>
      <router-link class="nav-item is-tab" to="/category/front-end" exact>Front-End</router-link>
      <router-link class="nav-item is-tab" to="/category/mobile" exact>Mobile</router-link>
      <router-link class="nav-item is-tab" to="/login">Login</router-link>
    </div>
  </nav>
</template>