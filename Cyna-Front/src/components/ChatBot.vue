<template>
  <div class="botIcon" :class="{ showBotSubject: show }">
    <div class="botIconContainer">
      <div class="iconInner" @click="toggleChat">
        <i class="fa fa-commenting" aria-hidden="true"></i>
      </div>
    </div>

    <div class="Layout Layout-open Layout-expand Layout-right">
      <div class="Messenger_messenger">
        <div class="Messenger_header">
          <h4 class="Messenger_prompt">Comment puis-je vous aider ?</h4>
          <span class="chat_close_icon" @click="closeChat">
                        <i class="fa fa-window-close" aria-hidden="true"></i>
                    </span>
        </div>

        <div class="Messenger_content">
          <div class="Messages">
            <div class="Messages_list">
              <div v-for="(msg, index) in messages" :key="index" :class="['msg', msg.user ? 'user' : '']">
                                <span class="avtr">
                                    <figure style="background-image: url('https://example.com/avatar.png')"></figure>
                                </span>
                <span class="responsText" :class="{ typing: msg.typing }" v-html="msg.text"></span>
              </div>
            </div>


            <div v-if="showSuggestions" class="preset-options">
              <button v-for="(opt, i) in visibleSuggestions" :key="i" class="preset-option"
                      @click="handleSuggestion(opt)">
                {{ opt.question }}
              </button>


              <div v-if="suggestions.length > maxVisibleSuggestions" style="margin-top: 10px;">
                <button @click="showAllSuggestions = !showAllSuggestions" class="preset-option"
                        style="font-style: italic;">
                  {{ showAllSuggestions ? 'Voir moins ▲' : 'Voir plus ▼' }}
                </button>
              </div>
            </div>


            <div class="links-utiles" style="margin-top: 10px; font-size: 12px;">
              Liens utiles : <a href="/faq.html">FAQ</a> | <a href="/catalogue.html">Catalogue</a> | <a
                href="/contact.html">Contact</a>
            </div>

            <div class="support-message" style="margin-top: 10px; font-size: 12px; color: #666;">
              Si aucune option ne vous convient, contactez-nous par mail à
              <a href="mailto:support@votresite.com">support@votresite.com</a>.
            </div>
          </div>

          <form @submit.prevent="sendMessage">
            <div class="Input Input-blank">
              <input v-model="inputText" class="Input_field" placeholder="Send a message..."/>
              <button type="submit" class="Input_button Input_button-send">
                <div class="Icon">
                  <svg viewBox="1496 193 57 54" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.4299,44.5306 L16.5956,44.5306 L21.0499,20.4236..." fill="#96AAB4"/>
                  </svg>
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';

const showAllSuggestions = ref(false);

const maxVisibleSuggestions = 2;

const visibleSuggestions = computed(() => {
  return showAllSuggestions.value ? suggestions : suggestions.slice(0, maxVisibleSuggestions);
});

const pendingResponse = ref(false);


const failedAttempts = ref(0);

function showSuggestionsDelayed(ms = 2500) {
  setTimeout(() => {
    showSuggestions.value = true;
  }, ms);
}

const show = ref(false);
const inputText = ref('');
const messages = ref([]);
const userName = ref('');
const showSuggestions = ref(false);

const suggestions = [
  {
    question: 'Quels produits proposez-vous ?',
    answer: 'Nous proposons une gamme complète de solutions SaaS de sécurité (SOC, EDR, XDR).'
  },
  {
    question: 'Différences entre SOC, EDR et XDR ?',
    answer: "Le SOC se consacre à la surveillance, l'EDR détecte les incidents sur les terminaux, le XDR regroupe toutes les données."
  },
  {
    question: 'Comment passer commande ?',
    answer: "Pour passer commande, parcourez notre catalogue et suivez le paiement sécurisé."
  },
  {
    question: 'Quels moyens de paiement sont acceptés ?',
    answer: 'Nous acceptons les cartes bancaires (Visa, Mastercard) et PayPal.'
  },
  {
    question: 'Dois-je créer un compte pour acheter ?',
    answer: 'Il est recommandé de créer un compte pour suivre vos commandes.'
  },
  {
    question: 'Comment modifier mon abonnement ?',
    answer: "Connectez-vous à votre compte et allez dans la section 'Mon Compte'."
  },
  {
    question: 'Quels sont les avantages de vos solutions ?',
    answer: "Nos solutions offrent sécurité, simplicité de gestion et flexibilité."
  },
  {
    question: 'Où puis-je trouver votre FAQ ?',
    answer: "Consultez notre FAQ : <a href='/faq.html'>FAQ</a>."
  },
  {
    question: 'Comment contacter le support ?',
    answer: "Par mail : <a href='mailto:support@votresite.com'>support@votresite.com</a>."
  }
];


function closeChat() {
  show.value = false;
}

function appendMsg(text, isUser = false) {
  messages.value.push({
    text,
    user: isUser,
    typing: text === '...'
  });
}

const rules = [
  {
    intent: "paiement",
    keywords: ["payer", "paiement", "carte", "visa", "paypal"],
    response: "Nous acceptons Visa, Mastercard et PayPal."
  },
  {
    intent: "produits",
    keywords: ["produit", "offre", "solution", "logiciel"],
    response: "Nous proposons une gamme complète de solutions SaaS (SOC, EDR, XDR)."
  },
  {
    intent: "compte",
    keywords: ["compte", "inscription", "s'inscrire", "créer un compte"],
    response: "Créer un compte vous permet de suivre vos commandes et gérer vos abonnements."
  },
  {
    intent: "support",
    keywords: ["support", "aide", "contact", "problème"],
    response: "Contactez notre support à <a href='mailto:support@votresite.com'>support@votresite.com</a>."
  },
  {
    intent: "incompris",
    keywords: [],
    response: "Désolé, je n’ai pas compris votre demande. Pouvez-vous reformuler ?"
  }
];


function getSmartResponse(input) {
  const message = input.toLowerCase();
  let bestMatch = {score: 0, response: rules.find(r => r.intent === 'incompris').response};
  let found = false;

  for (const rule of rules) {
    let score = 0;
    for (const keyword of rule.keywords) {
      if (message.includes(keyword)) {
        score++;
      }
    }

    if (score > bestMatch.score) {
      bestMatch = {score, response: rule.response};
      found = true;
    }
  }

  // S'il a rien compris...
  if (!found) {
    failedAttempts.value++;
    if (failedAttempts.value >= 3) {
      return `Désolé, j’ai encore du mal à comprendre. 👉 <strong>Souhaitez-vous parler à un conseiller ?</strong> <br><a href="mailto:support@votresite.com">Contacter un conseiller</a>`;
    }
  } else {
    // reset compteur si une réponse correcte est trouvée
    failedAttempts.value = 0;
  }

  return bestMatch.response;
}

function sendMessage() {
  const msg = inputText.value.trim();
  if (!msg) return;

  appendMsg(msg, true);
  inputText.value = '';
  showSuggestions.value = false;

  if (!userName.value) {
    userName.value = msg.split(' ')[0];
    appendMsg(`Enchanté ${userName.value}, comment puis-je vous aider ?`);
    showSuggestionsDelayed();
  } else {
    pendingResponse.value = true;
    appendMsg('...', false);

    setTimeout(() => {

      messages.value[messages.value.length - 1].text = getSmartResponse(msg);
      pendingResponse.value = false;

      showSuggestionsDelayed();
    }, 1500);
  }
}

function handleSuggestion(opt) {
  appendMsg(opt.question, true);
  appendMsg(opt.answer);
  showSuggestions.value = false;

  setTimeout(() => {
    showSuggestions.value = true;
  }, 1000);
}

function toggleChat() {
  show.value = true;
  if (messages.value.length === 0) {
    appendMsg("Bonjour, quel est votre prénom ?");
    showSuggestions.value = true;
  }
}
</script>

<style scoped>
@import '../style.css';
</style>