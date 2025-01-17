<template>
  <div class="container">
    <div class="wrapper">
      <div class="company-info">
        <ul>
          <li><i class="fa fa-road"></i> 10 rue de Penthièvre 75008 Paris</li>
          <li><i class="fa fa-phone"></i> +33 1 89 70 14 36</li>
          <li><i class="fa fa-envelope"></i>contact@cyna-it.fr</li>
          <li><i class="fa fa-map"> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3184.598655404628!2d2.3165953999999997!3d48.8731085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66f92d97833e7%3A0xa369c34f0b09cf72!2s10%20Rue%20de%20Penthi%C3%A8vre%2C%2075008%20Paris!5e1!3m2!1sfr!2sfr!4v1736945723410!5m2!1sfr!2sfr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></i></li>
        </ul>
      </div>
      <div class="contact">
        <h3>Contact</h3>
        <form id="contact-form">
          <p>
            <label>Nom</label>
            <input type="text" name="name" id="name" required>
          </p>
          <p>
            <label>Prenom</label>
            <input type="text" name="company" id="company">
          </p>
          <p>
            <label>E-mail </label>
            <input type="email" name="email" id="email" required>
          </p>
          <p>
            <label>Numéro de téléphone</label>
            <input type="text" name="phone" id="phone">
          </p>
          <p class="full">
            <label>Message</label>
            <textarea name="message" rows="5" id="message"></textarea>
          </p>
          <p class="full">
            <button type="submit">Envoyer</button>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>


@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700,900&display=swap');

<style scoped>
.container {
  margin-top: 80px;
}

ul {
  list-style: none;
  padding: 0;
}

.brand {
  text-align: center;
  font-weight: 300;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.brand span {
  color: #ffffff;
}



.wrapper>* {
  padding: 1em;
}


.company-info {
  background: #C3C9DD;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.company-info h3,
.company-info ul {
  text-align: center;
  margin: 0 0 1rem 0;
}


.contact {
  background: #dcdfea;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}


.contact form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

.contact form label {
  display: block;
}

.contact form p {
  margin: 0;
}

.contact form .full {
  grid-column: 1 / 3;
}

.contact form button,
.contact form input,
.contact form textarea {
  width: 100%;
  padding: 1em;
  border: solid 1px #302082;
  border-radius: 4px;
  background-color: #C3C9DD;
}

.contact form textarea {
  resize: none;
}

.contact form button {
  background: #302082;
  border: 0;
  color: #e4e4e4;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
}

.contact form button:hover,
.contact form button:focus {
  background: #3952a3;
  color: #ffffff;
  outline: 0;
  transition: background-color 2s ease-out;
}


@media only screen and (min-width: 700px) {
  .wrapper {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }

  .wrapper>* {
    padding: 2em;
  }

  .company-info {
    border-radius: 4px 0 0 4px;
  }

  .contact {
    border-radius: 0 4px 4px 0;
  }

  .company-info h3,
  .company-info ul,
  .brand {
    text-align: left;
  }
}
</style>