<script >
import { useAuthStore } from "./stores/authStore";
import {useRouter} from "vue-router";


export default {
  methods: {
    async logout() {
      console.log('user logged out');
      await this.userStore.logout()
      await this.router.push('/login')
    }
  },
  setup(){
    const userStore = useAuthStore();
const router = useRouter();
return{userStore,router}
  }
}
</script>

<template>
  <div class="app">
    <header>
      <div>
        <nav class="nav">
          <h2 class="logo">Workout <span>Buddy</span></h2>
          <ul>
            <li>{{ userStore.username }}</li>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
            <div class="log">
              <li><router-link to="/register">Register</router-link></li>
            <li><router-link to="/login">Login</router-link></li>
            </div>
            <div v-if="userStore.user != null">
              <button @click="logout">Logout</button>
            </div>
          </ul>
        </nav>
      </div>
    </header>
    <router-view/>
  </div>
</template>

<style scoped>
.nav{
  display: flex;
  justify-content: space-between;
}
.logo{
  color: gray;
  font-size: 32px;
}
.logo span {
  color: #ffd859;
}
ul{
  list-style: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
ul li a{
  color: black;
  text-decoration: none;
  padding-left: 0.5rem;
}
.log{
  display: flex;
}
</style>
