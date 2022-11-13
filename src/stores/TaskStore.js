import { defineStore  } from "pinia";
import { useAuthStore } from "./authStore";

export const useTaskStore = defineStore('taskStore',{
    state: () => ({
        tasks:[],
        loading:false,
        count: 0,
    }),
    actions:{
        async getTasks() {
            const user  = useAuthStore()
            this.loading = true
            const res = await fetch('http://localhost:4000/api/workouts/',{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                }
            })
            const data = await res.json()

            this.tasks = data
            this.loading= false
        },
       async addTask(task){
        const user  = useAuthStore()

            const res = await fetch('http://localhost:4000/api/workouts/',{
                method: 'POST',
                body: JSON.stringify(task),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                }
            }).then(() => {
                this.getTasks()
            })
            if (res.error) {
                console.log(res.error);
            }
        },
        async deleteTask(_id){
            const user  = useAuthStore()
            const res = await fetch("http://localhost:4000/api/workouts/" + _id,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                }
            }).then(() => {
                this.getTasks()
            })
            if (res.error) {
                console.log(res.error);
            }
        },
        async toggleFav(_id) {
            const user  = useAuthStore()
            const res = await fetch("http://localhost:4000/api/workouts/" + _id,{
                method: 'PATCH',
                body: JSON.stringify({isFav: this.isFav = !this.isFav}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                }
            }).then(async() => {
               await this.getTasks()
            })
            if (res.error) {
                console.log(res.error);
            }
        }
    },
    getters: {
        favs() {
            return  this.tasks.filter(t => t.isFav)
        },
        favCount() {
            return this.tasks.reduce((p,c) => {
                return c.isFav ? p + 1 : p
            },0)
        },
        totalCount: (state) => {
            return state.tasks.length
        }
    }
})