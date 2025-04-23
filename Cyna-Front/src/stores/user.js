import { defineStore } from "pinia";
import Serv_Url from "../main.ts";


export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    returnUrl: null,
    urlResetPassword: null,
  }),

  actions: {
    async fetchUser() {
      const res = await fetch(Serv_Url + '/user');

      const user = await res.json();
      this.user = user;
    },
    async setReturnUrl(url) {
      this.returnUrl = await url;
    },
    async signUp(nom, prenom ,email, password) {
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
    async signIn(email, password) {
      try {
      const res = await fetch(Serv_Url + '/user/login', {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (res){
        const user = await res.json();
        this.user = user;
        if (this.returnUrl != null){
          window.location.href = this.returnUrl;
          this.returnUrl = null;
        }else {
          window.location.href = "/";
        }
      }
      } catch (e) {
        document.querySelector('.msg-alert').style.display = 'block';
        console.log(e);
    }
    },
    async resetPassword(email) {
      try {
      const res = await fetch(Serv_Url + '/reset-password', {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      document.querySelector('.reset-link').style.display = 'block';
      this.urlResetPassword =  window.location.origin + "/update-password?token=" + data.token
      } catch (e) {
      console.log(e);
      }
    },
    async newPassword(password) {
      try { 
      const params = new URLSearchParams(window.location.search.substring(1));
      const token = params.get("token");
      const res = await fetch(Serv_Url + '/update-password', {
        method: "POST",
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      } catch (e) {
      console.log(e);
      }
    },
    async logout() {
      this.user = null;
      localStorage.removeItem('user');
    },
  },
});