<template>
  <div class="user_page">
    <!-- HEADER  -->
    <Header msg="" />

    <div class="container user_page-container" v-if="user != null">
      <!-- SIDEBAR  -->
      <aside class="user_aside-container">
        <!-- Card Info Presentation -->
        <div class="user_aside">
          <div class="user-card_container">
            <UserCardPresentation :userCardPresentation="user" />
          </div>
        </div>

        <!-- Card Score -->
        <div class="user_aside">
          <div class="user-card_title-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xml:space="preserve"
              version="1.1"
              style="
                shape-rendering: geometricPrecision;
                text-rendering: geometricPrecision;
                image-rendering: optimizeQuality;
              "
              viewBox="0 0 847 1058.75"
              x="0px"
              y="0px"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <defs></defs>
              <g>
                <path
                  class="fil0"
                  d="M26 26l794 0 0 794 -794 0 0 -794zm465 330l188 0c10,0 14,12 6,18l-153 110 59 180c3,9 -8,16 -15,11l-153 -112 -152 112c-8,5 -18,-2 -15,-11l59 -180 -153 -110c-8,-6 -4,-18 6,-18l188 0 58 -179c3,-9 16,-9 19,0l58 179z"
                />
              </g>
            </svg>
            <h2 class="h1">Points</h2>
          </div>

          <div class="user-card_container">
            <UserStats :userStats="user" />
          </div>
        </div>

        <!-- Card Social -->
        <div class="user_aside">
          <div class="user-card_title-container">
            <img class="user-card_img social" :src="user.media.url" alt="" />
            <h2 class="h1">Social</h2>
          </div>

          <div class="user-card_container">
            <UserSocial :userSocial="user" />
          </div>
        </div>
      </aside>

      <!-- MAIN -->
      <main class="user_main">
        <div id="nav" class="text-right">
          <button class="btn btn-primary">
            <router-link to="/">Home</router-link>
          </button>
        </div>
        <!-- TITLE  -->
        <div class="user_main-title border-bottom">
          <h1
            class="h1 text-left onglet active"
            @click="showContentFn"
          >
            Challenges
          </h1>
          <h1
            class="h1 text-left onglet"
            @click="showContentFn"
          >
            Classement
          </h1>
        </div>
        <div class="challenge_container" v-if="showContent">
          <UserChallenges :userChallenges="user" />
        </div>
        <div class="challenge_container" v-else>
          <UserClassement :userClassement="user.expertizes" />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Header from "@/components/Header.vue"
import UserStats from "@/components/UserStats.vue"
import UserSocial from "@/components/UserSocial.vue"
import UserCardPresentation from "@/components/UserCardPresentation.vue"
import UserChallenges from "@/components/UserChallenges.vue"
import UserClassement from "@/components/UserClassement.vue"

export default {
  name: "Home",
  components: {
    Header,
    UserStats,
    UserSocial,
    UserCardPresentation,
    UserChallenges,
    UserClassement

  },
  data() {
    return {
      user: null,
      userChallengeDatas: null,
      showContent: true
    }
  },
  created() {
    // get uid from url params
    const getUrl = new Promise((resolve) => {
      let url_string = window.location.href
      let url = new URL(url_string)
      let uid = url.pathname.split("/")
      this.uid = uid[2]
      resolve()
    })
    getUrl
      .then(() => {
        const usersInStore = this.$store.getters.getUsers

        if (usersInStore.length != 0) {
          // on filtre les users pour trouver celui qui correspond à l'id
          const userFounded = usersInStore.filter(
            (user) => user.id === this.uid
          )

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
        this.$store.dispatch("mutateUserId", this.uid)
      })
  },
  mounted() {
  },
  methods: {
    getUser(uid) {
      axios
        .get("https://api.rocketfid.com/user/" + uid, {
          headers: {
            "X-Instance": "rainbow",
            "X-Token": process.env.VUE_APP_TOKEN,
            "X-Lang": "fr",
            "X-Widget-Version": "3.0.1",
            "Content-Type": "application/json",
            "Accept": "*/*",
          },
        })
        .then((response) => {
          this.user = response.data
        })
        .then(() => {
          // stockage du user dans un tableau du store pour éviter une requête au cas où on a déjà visité ce profil
          this.$store.dispatch("mutateUsers", this.user)
        })
        .then(() => {
          // on tri les données des challenges
          this.userChallengeDatas = this.user.statistic.achievement.category
        })
        .catch((error) => console.log("erreur:", error))
    },
    showContentFn (e) {
      const onglets = document.querySelectorAll('.onglet')

      for(let onglet of onglets) {
        onglet.classList.remove('active')
      }

      e.target.classList.add('active')

      this.showContent = !this.showContent
    }
  },
}
</script>

<style scoped lang="scss">
.user_page-container {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
}
.user_aside {
  margin-bottom: 50px;
  position: relative;
  top: -125px;
}
.user-card_title-container {
  display: flex;
  align-items: center;

  svg {
    width: 25px;
    margin-right: 15px;
    fill: red;
  }
}
.user-card_container {
  min-width: 300px;
  max-width: 300px;
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  box-shadow: 0px 0px 35px #e8e8e8;

  &:first-child {
    box-shadow: 0px 15px 15px -5px #e8e8e8;
  }
}

.user-card_img {
  &.social {
    width: 30px;
    height: 30px;
    margin-right: 15px;
    border-radius: unset;
  }
}
// MAIN
.user_main {
  min-width: calc(100% - 300px);
  padding-right: 30px;
  box-sizing: border-box;

  @media screen and(min-width: 920px) {
    padding-left: 100px;
  }
}
.user_main-title {
  display: flex;
  flex-flow: row wrap;

  .onglet {
    margin-bottom: 0;
    text-transform: uppercase;
    opacity: 0.5;
    cursor: pointer;

    &:first-child {
      padding-right: 20px;
      border-right: 1px solid #000;
    }

    &:not(:first-child) {
      padding-left: 20px;
    }

    &.active {
      opacity: 1;
      pointer-events: none;
    }
  }
}
</style>
