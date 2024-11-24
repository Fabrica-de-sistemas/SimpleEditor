<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
const isLoggedIn = false
const username = ""
function handleLogout(){}
</script>

<template>
  <nav class="navbar">
    <div class="nav-brand">
      <RouterLink to="/">Simple Text Editor</RouterLink>
    </div>
    <div class="nav-links">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/about" class="nav-link">About</RouterLink>
      <RouterLink to="/config" class="nav-link">Config</RouterLink>
    </div>
    <div class="nav-auth">
      <template v-if="!isLoggedIn">
        <RouterLink to="/signin" class="auth-button">Sign In</RouterLink>
        <RouterLink to="/signup" class="auth-button">Sign Up</RouterLink>
      </template>
      <template v-else>
        <span class="username">{{ username }}</span>
        <button @click="handleLogout" class="auth-button">Logout</button>
      </template>
    </div>
  </nav>
  <RouterView/>
</template>

<style scoped>
.navbar {
  background-color: #4CAF50;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-brand a {
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-auth {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.auth-button {
  padding: 0.5rem 1rem;
  border: 1px solid white;
  border-radius: 4px;
  background: transparent;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
}

.auth-button:hover {
  background: white;
  color: #4CAF50;
}

.username {
  color: white;
  margin-right: 1rem;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-links, .nav-auth {
    width: 100%;
    justify-content: center;
  }
}
</style>