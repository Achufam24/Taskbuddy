import { defineStore } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const useAuthStore = defineStore('auth',{
    id:'auth',
    state: () => ({
        token: JSON.parse(localStorage.getItem('user')) || null,
        // user:null,
        isLoggedIn: false,
        user:{}
    }),
    actions: {
        async signUp(email,password) {
           const res =  await fetch("http://localhost:4000/api/user/login/",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password }),
           });
           const user = await res.json()
           localStorage.setItem('user', JSON.stringify(user['token']));
           console.log(user);
           this.user = user['token'];
        },
        async signin(email,password) {
            const res = await fetch('http://localhost:4000/api/user/signup/',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            })
            const user = await res.json();
            localStorage.setItem('user', JSON.stringify(user['token']));
            console.log(user);
            this.user = user['token'];
        },
        logout() {
            localStorage.removeItem('user')
        }
    },
    persist: localStorage
});