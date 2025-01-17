<template>
  <div class="form-container">
    <h2 class="text-center mb-4">
      Formulaire de <span class="text-success">contact</span>
    </h2>
    <form @submit.prevent="handleSubmit">

      <div class="mb-3">
        <label class="form-label" for="nom">Nom *</label>
        <input
            id="nom"
            v-model="form.nom"
            class="form-control custom-input"
            required
            type="text"
        />
      </div>


      <div class="mb-3">
        <label class="form-label" for="prenom">Prénom *</label>
        <input
            id="prenom"
            v-model="form.prenom"
            class="form-control custom-input"
            required
            type="text"
        />
      </div>

      <div class="mb-3">
        <label class="form-label" for="email">E-mail *</label>
        <input
            id="email"
            v-model="form.email"
            class="form-control custom-input"
            required
            type="email"
        />
      </div>


      <div class="mb-3">
        <label class="form-label" for="telephone">Numéro de téléphone</label>
        <input
            id="telephone"
            v-model="form.telephone"
            class="form-control custom-input"
            type="tel"

        />
      </div>


      <div class="mb-3">
        <label class="form-label" for="message">Message *</label>
        <textarea
            id="message"
            v-model="form.message"
            class="form-control custom-input"
            required
            rows="4"
        ></textarea>
      </div>


      <button class="btn btn-primary custom-button" type="submit">
        Envoyer
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        message: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log("Formulaire soumis :", this.form);
      alert("Votre formulaire a été envoyé !");
    },
  },
};
</script>

<style>

.form-container {
  width: 50%;
  max-width: none;
  margin: 0 auto;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: #3a3a3a;
  background-color: #f4f3f9;
}


h2 {
  color: #ffffff;
}


.custom-input {
  border: none;
  background-color: #e4e3ec;
  border-radius: 10px;
  padding: 10px 15px;
}


.custom-button {
  background-color: #6c4af4;
  color: #ffffff;
  border-radius: 20px;
  padding: 10px 20px;
  border: none;
}

.custom-button:hover {
  background-color: #5a3ae1;
}


body {
  background-color: #2f217b;
}

form {
  text-align: left;
}

.form-label, .form-control {
  text-align: left;
  color: blue;
}

.form-control:focus {
  border-color: blue;
  box-shadow: 0 0 5px rgba(0, 0, 255, 0.5);

}

</style>
  