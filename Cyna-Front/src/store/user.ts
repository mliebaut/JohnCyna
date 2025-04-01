import { defineStore } from "pinia";
import Serv_Url from "../main.ts";


export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const res = await fetch(Serv_Url + '/user');

      const user = await res.json();
      this.user = user;
    },
    async signUp(nom: string, prenom: string,email: string, password: string) {
      try {
      const res = await fetch(Serv_Url + '/user/create', {
        method: "POST",
        body: JSON.stringify({ nom, prenom ,email, password }),
      });
      if (res){
        const user = await res.json()
        this.user = user;
        window.location.href = "/";
      }
      } catch (e) {
        console.log(e)
    }
    },
    async signIn(email: string, password: string) {
      try {
      const res = await fetch(Serv_Url + '/user/login', {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (res){
        const user = await res.json();
        this.user = user;
        window.location.href = "/";
      }
      } catch (e) {
        alert("L'e-mail ou le mot de passe est incorrect");
        console.log(e);
    }
    },
    async logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
  },
});