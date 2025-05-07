import { defineStore } from "pinia";
import Serv_Url from "../main.ts";



export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    userNotConfirm: null,
    returnUrl: null,
    urlResetPassword: null,
    urlConfirmEmail: null,
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
        const data = await res.json();
        this.urlConfirmEmail =  window.location.origin + "/confirm-email?token=" + data.token
        document.querySelector('.confirm-link').style.display = 'block';
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
        const resText = await res.text()
        if (resText == "mail not verified"){
          const userNotConfirm = await fetch(Serv_Url + '/user/searchByEmail', {
            method: "POST",
            body: JSON.stringify({ email }),
          });
          this.userNotConfirm = await userNotConfirm.json();
          document.querySelector('.msg-alert-mail').style.display = 'block';
        }
        else if (resText == "user not found" || resText == "authentification failed"){
          document.querySelector('.msg-alert').style.display = 'block';
        } 
        else{
          const user = await res.json();
          this.user = user;
          if (this.returnUrl != null){
            window.location.href = this.returnUrl;
            this.returnUrl = null;
          }else {
            window.location.href = "/";
          }
        }
      }
      } catch (e) {
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
      this.urlConfirmEmail =  window.location.origin + "/update-password?token=" + data.token
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
      if (res){
        window.location.href = "/";
      }
      } catch (e) {
      console.log(e);
      }
    },
    async confirmEmail() {
      try {
      const params = new URLSearchParams(window.location.search.substring(1));
      const token = params.get("token");
      const res = await fetch(Serv_Url + '/confirm-email', {
        method: "POST",
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (res){
        document.querySelector('.confirm-email').style.display = 'block';
      }
      } catch (e) {
      console.log(e);
      }
    },
    async newConfirmEmail() {
      try {
      const user = this.userNotConfirm 
      const res = await fetch(Serv_Url + '/new-confirm-email', {
        method: "POST",
        body: JSON.stringify({ user }),
      });
      const data = await res.json();
      if (res){
        this.urlConfirmEmail =  window.location.origin + "/confirm-email?token=" + data.token
        document.querySelector('.confirm-link').style.display = 'block';
      }
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