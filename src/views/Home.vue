<template>
  <div class="home">
    <Header msg="Bouygues Users Ranking"/>
    
    <div v-if="errored">
      <p>erreur serveur, merci de recharger la page</p>
    </div>
    <div class="container" v-else>
      <ul class="user-list">
        <li class="user-item" v-for="user in datas" :key="user.id">
          <router-link :to="'user/' + user.performer.id" class="user-link" title="voir le profil">
            <span>
              <img class="user-avatar" :src="user.performer.media.url" alt="">
            </span>
            <span>
              {{ user.performer.nickname }}
            </span>
            <span class="user_role">
              <strong>role :</strong> 
              {{ user.performer.role }}
            </span>
            <span v-if="user.action.score ? user.action.score : user.action.score = '0'">
              <div :class="['user-score_container', {'zero' : user.action.score === '0'}]">
                <span class="user-score" :data-score="user.action.score"></span>
              </div>
            </span>
          </router-link>
          <span class="user_last-answer" v-if="user.action.link">
            <strong>Dernier sujet :</strong>
            <a class="user_last-post" :href="user.action.link" title="voir le dernier post">
              voir le post
            </a>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import axios from "axios"
// import json from "@/assets/datas.json"

export default {
  name: "Home",
  components: {
    Header
  },
  data() {
    return {
      errored: false,
      datas: null,
      UserRanked: null,
      page: 0,
      userId: null
    };
  },
  created() {
    const datasInStore = this.$store.getters.getDatas

    if (datasInStore != null) {
      this.datas = this.$store.getters.getDatas
    } else {
      this.requestData(this.page)
    }
    // this.datas = this.json
    // récupération du userId dans le storage
    this.userId = this.$store.getters.getUserId
  },
  mounted () {
    this.getNextDatas()
  },
  methods: {
    requestData (page) {
      axios
        .get("https://api.rocketfid.com/activity/cache/all/" + page + "/25/", {
          headers: {
            "X-Instance": "rainbow",
            "X-Lang": "fr",
            "X-Widget-Version": "3.0.1",
            "Content-Type": "application/json;charset=UTF-8",
            "Accept": "*/*",
          },
        })
        .then((response) => {
          this.datas = response.data
          this.$store.dispatch('mutateDatas', this.datas)
        })
        .catch((error) => {
          console.log('erreur:', error)
          this.errored = true
        })
    },
    getNextDatas() {
      window.onscroll = () => {
        let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.page += 1
          axios
            .get("https://api.rocketfid.com/activity/cache/all/" + this.page + "/25/", {
              headers: {
                "X-Instance": "rainbow",
                "X-Lang": "fr",
                "X-Widget-Version": "3.0.1",
                "Content-Type": "application/json;charset=UTF-8",
                "Accept": "*/*",
              },
            })
            .then((response) => {
              this.datas.push(...response.data)
              this.$store.dispatch('mutateDatas', this.datas)
            })
            .catch((error) => console.log('erreur:', error))
            
        }
      }
    }
  }
}
</script>

<style lang="scss">
.user-list {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  gap: 30px;
  margin-bottom: 200px;
}
.user-item {
  min-width: 300px;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 3px #ccc;
  transition: .6s;
  position: relative;
  top: 0;

  &:hover {
    top: -10px;
    box-shadow: 1px 0px 15px #ccc;
    opacity: .9;
  }
}
.user-link {
  display: flex;
  flex-direction: column;
  background-image: url('../assets/pattern-logo.png');
  background-repeat: no-repeat;
  background-size: 10%;
}
.user-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.user-score_container {
  width: 200px;
  height: 10px;
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 8px;
  overflow: hidden;
  background-color: #e7e7e7;

  &.zero {
    display: none;
  }

  .user-score {
    display: block;
    height: 100%;
    background-color: var(--blue);
    transition: 1s;

    &[data-score = "0"] {
      width: 0%;
    }
    
    @for $i from 1 through 100 {
      &[data-score = "#{$i}"] {
        width: $i * 1%;
      }
    }
  }
}
.user_last-answer {
  display: block;
  margin-top: 15px;

  .user_last-post {
    color: #05f;
  }
}
.user_role {
  font-size: 14px;
  opacity: .4;
  color: #174c67;
}
.user_id {
  position: absolute;
  transform: rotate(90deg);
  right: -74px;
  top: 98px;
  font-size: 14px;
  opacity: .4;
  color: #174c67;
}
</style>