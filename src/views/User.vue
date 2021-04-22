<template>
  <div class="about">
    USER {{ this.$store.getters.getUser }}
    <div class="container" v-if="user != null">
      <h1>This is an User page</h1>
      <h2>Bienvenue {{ user.nickname }}</h2>
      <p> {{ user }} </p>
      <p>{{user.id}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "Home",
  components: {
  },
  data() {
    return {
      user: null
    };
  },
  created() {
    // get uid from url params
    const getUrl = new Promise((resolve) => {
      let url_string = window.location.href
      let url = new URL(url_string)
      let uid = url.pathname.split('/')
      this.uid = uid[2]
      resolve()
    })
    getUrl
      .then(() => {
        const usersInStore = this.$store.getters.getUsers

        if (usersInStore.length != 0) {
          // on filtre les users pour trouver celui qui correspond à l'id
          const userFounded = usersInStore.filter(user => user.id === this.uid)

          if (userFounded.length != 0) {
            this.user = userFounded[0]
          } else {
            this.getUser(this.uid)
          }
        } else {
          // récupéré via une requete
          this.getUser(this.uid)
        }
      })
      .then(() => {
        // On stocke le userId dans le store
        this.$store.dispatch('mutateUserId', this.uid)
      })
  },
  mounted () {
  },
  methods: {
    getUser (uid) {
      axios
        .get("https://api.rocketfid.com/user/" + uid, {
          headers: {
            "X-Instance": "rainbow",
            "X-Token": 'KOPDhKhIeLHZSCsfx/WUp2HPSYaNWBaZr9ifxFHTL3W5e1ItQVTEVPdeuhuB2J8vqaFAQmDbLQV4aRynfEYy0MnTSmYTIwFE9adtspjvRrL97MF2urNTBjYrXfwipk6dL2RXX1HW3Z+48BdF7/UkVEVUWBo56P1KghyMaB3XfC18Qw5HelCj6OH7fZcIhK/KxvWHc0Xx62bjwewi31Wnj8g=',
            "X-Lang": "fr",
            "X-Widget-Version": "3.0.1",
            "Content-Type": "application/json",
            "Accept": "*/*",
          },
        })
        .then((response) => (this.user = response.data))
        .then(() => {
          // stockage du user dans un tableau du store pour éviter une requête au cas où on a déjà visité ce profil
          this.$store.dispatch('mutateUsers', this.user)
        })
        .catch((error) => console.log('erreur:', error))
    },
    
  }
}
</script>
