<template>
  <div class="submit">
    <form @submit.prevent="login">
        <input type="text" placeholder="Email.." name="email" v-model="email"><br><br>
       <input type="password" name="password" placeholder="********" v-model="password"><br><br>
       <button>Submit</button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/authStore";
import {useRouter} from "vue-router";
import { useTaskStore } from "../stores/TaskStore"

export default {
    data(){
        return{
            email: "",
            password: "",
        }
    },
    methods: {
        async login() {
            console.log(this.email,this.password);
            await this.userStore.signUp(this.email, this.password)
            if (this.userStore.user !== null) {
               await this.router.push('/')
              await this.TaskStore.getTasks()
            }
            
        }    
        },
    setup(){
       const userStore = useAuthStore();
       const TaskStore = useTaskStore();
       const router = useRouter()

       return{userStore,router,TaskStore};
    }

}
</script>

<style scoped>
.submit{
    margin-top: 3rem;
}
form input{
    margin-top: 1rem;
}
form button{
    margin-top: 3rem;
}
</style>