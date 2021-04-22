<template>
  <div class="home">
    <GamificationHeader msg="Bouygues Users Ranking"/>

    <div class="container">
      <ul class="user-list" v-show="datas != null">
        <li class="user-item" v-for="user in datas" :key="user.id">
          <router-link :to="'user/' + user.performer.id" class="user-link" title="voir le profil">
            <span>
              <img class="user-avatar" :src="user.performer.media.url" alt="">
            </span>
            <span>
              {{ user.performer.nickname }}
            </span>
            <!-- <span class="user_id">
              <strong>Id :</strong> 
              {{ user.id }}
            </span> -->
            <span class="user_role">
              <strong>role :</strong> 
              {{ user.performer.role }}
            </span>
            <span v-if="user.action.score ? user.action.score : user.action.score = '0'">
              <!-- <strong>Score :</strong> -->
              <!-- {{ user.action.score }} -->
              <div :class="['user-score_container', {'zero' : user.action.score === '0'}]">
                <span class="user-score" :data-score="user.action.score"></span>
              </div>
            </span>
            <!-- <span v-if="user.action.alias"><strong>Alias :</strong> {{ user.action.alias }}</span> -->
            <!-- <li><a :href="user.contenttype.url">photo</a></li> -->
            <!-- <p>{{ user }}</p> -->
          </router-link>
          <span class="user_last-answer" v-if="user.action.link">
            <strong>Dernier sujet :</strong>
            <a class="user_last-post" :href="user.action.link" title="voir le dernier post">
              <!-- {{ user.action.name }} -->
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
import GamificationHeader from '@/components/GamificationHeader.vue'
import axios from "axios"
import json from "@/assets/datas.json"

export default {
  name: "Home",
  components: {
    GamificationHeader
  },
  data() {
    return {
      json: json,
      datas: null,
      UserRanked: null,
      page: 0,
      userId: null,
      loading: false
    };
  },
  // computed: {
  //   userId: () => {
  //     const x = this.$store.getters.getUserId
  //     return x
  //   }
  // },
  created() {
    // this.requestData(this.page)
    this.datas = this.json
    // récupération du userId dans le storage
    this.userId = this.$store.getters.getUserId
  },
  mounted () {
    this.getNextDatas()
  },
  methods: {
    requestData (page) {
      this.loading = true
      axios
        .get("https://api.rocketfid.com/activity/cache/all/" + page + "/25/", {
          headers: {
            // Authorization: 'Bearer ' + varToken
            "X-Instance": "rainbow",
            "X-Lang": "fr",
            "X-Widget-Version": "3.0.1",
            "Content-Type": "application/json;charset=UTF-8",
            Accept: "*/*",
          },
        })
        .then((response) => (this.datas = response.data))
        .then(() => (this.loading = false))
        .catch((error) => console.log('erreur:', error))
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
            .then((response) => (this.datas.push(...response.data)))
            .catch((error) => console.log('erreur:', error))
            
        }
      }
    }
  }
}
</script>

<style lang="scss">
.loading-datas {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 9;
  background-color: #fff;
}
.user-list {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  gap: 30px;
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