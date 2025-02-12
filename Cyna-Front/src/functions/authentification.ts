import Serv_Url from "../main.ts";
import {reactive} from 'vue';
// import {useRouter} from "vue-router";

export default {
  name: "Connexion",
  setup() {
    const data = reactive({
      email: '',
      password: ''
    });

    const submit = async () => {
      await fetch(Serv_Url + '/login', {
        method: 'POST',
        body: JSON.stringify(data),
        mode: "no-cors"
      });

    }

    return {
      data,
      submit
    }
  }
}
