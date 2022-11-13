<template>
  <div class="register">
    <form @submit.prevent="register">
        <input type="text" placeholder="Email.." name="email" v-model="email"><br><br>
       <input type="password" name="password" placeholder="********" v-model="password"><br><br>
       <button>Submit</button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/authStore";
export default {
     data(){
        return{
            email: "",
            password: "",
        }
    },
    methods: {
        async register() {
            console.log(this.email,this.password);
            await this.userStore.signin(this.email, this.password);
        }    
        },
setup(){
    const userStore = useAuthStore();

    return {userStore}
}
}
</script>

<style scoped>
.register{
    margin-top: 3rem;
}
form input{
    margin-top: 1rem;
}
form button{
    margin-top: 3rem;
}
</style>