<script setup lang="ts">
// import { sortAndDeduplicateDiagnostics } from 'typescript'; // Make the build weight more then 1 MB
import { RouterLink } from 'vue-router';
let name            = defineModel("name", {required: true ,default: ""})
let email           = defineModel("email", {default: ""})
let password        = defineModel("password", {default: ""})
let confirmPassword = defineModel("confirmPassword", {default: ""})
let isFormValid=false
async function handleSignUp(){
  const obj = {
    name: name.value,
    email: email.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  }
  let response = await fetch("/api/V1/signup", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  let jresponse = await response.json()
  console.log(jresponse)
}

function checkValidity() {
  let valid = true
  if (name.value.length <= 3) {
    valid = false
    //console.log(name);
  }
  if (email.value.match(/(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)/) == null) {
    valid = false
    //console.log(email); 
  }
  if (password.value.length < 8) {
    valid = false
    //console.log(password);
  }
  if (password.value != confirmPassword.value) {
    valid = false
  }
  if (valid) {
    //console.log("valid");
  }
  isFormValid = valid
}

</script>

<template>
<div class="auth-container">
    <div class="auth-box">
      <h1>Sign Up</h1>
      <form @submit.prevent="handleSignUp" @change="checkValidity" @input="checkValidity">
        <div class="form-group">
          <label for="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            v-model.capitalize="name" 
            required
            placeholder="Enter your full name"
          >
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required
            placeholder="Enter your email"
          >
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required
            placeholder="Choose a password"
          >
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword" 
            required
            placeholder="Confirm your password"
          >
        </div>
        <button type="submit" :disabled="!isFormValid">Sign Up</button>
        <p class="auth-link">
          Already have an account? 
          <RouterLink to="/signin">Sign In</RouterLink>
        </p>
      </form>
    </div>
  </div>
</template>

<style>
/* Shared styles for both components */
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.auth-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.auth-link {
  text-align: center;
  margin-top: 1rem;
  color: #666;
}

.auth-link a {
  color: #4CAF50;
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>