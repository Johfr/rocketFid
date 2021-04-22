<template>
  <div class="home">
    <GamificationHeader msg="Bouygues Users Ranking"/>
    <!-- <div>{{ datas }}</div> -->
    <!-- <ul>
      <li @click="loadDatas">1</li>
      <li @click="loadDatas">2</li>
      <li @click="loadDatas">
        <button href="" v-if="page === 3 ? disabled : '3'"> 3 </button>
      </li>
      <li @click="loadDatas">4</li>
      <li @click="loadDatas">5</li>
      <li @click="loadDatas">6</li>
      <li @click="loadDatas">7</li>
    </ul> -->
    <!-- <p>{{ datas }}</p> -->
    <p class="loading-datas" v-show="loading">Chargement...</p>
    <!-- <div class="user-list_container" v-for="user in datas" :key="user.id"> -->
      <div class="container">
      <ul class="user-list">
        <li class="user-item" v-for="user in datas" :key="user.id">
          <router-link :to="'user/' + user.performer.id" class="user-link" title="voir le profil">
          <!-- <a class="user-link" :href="user.performer.id" title="voir le profil"> -->
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
            <span class="user_last-answer" v-if="user.action.link">
              <strong>Dernier sujet :</strong>
              <a class="user_last-post" :href="user.action.link" title="voir le dernier post">
                <!-- {{ user.action.name }} -->
                voir le post
              </a>
            </span>
            <!-- <span v-if="user.action.alias"><strong>Alias :</strong> {{ user.action.alias }}</span> -->
            <!-- <li><a :href="user.contenttype.url">photo</a></li> -->
            <!-- <p>{{ user }}</p> -->
          <!-- </a> -->
          </router-link>
        </li>
      </ul>
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
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
      // json: [
      //     {
      //       "id": "607ffaf65cf28bcc3e8b4578",
      //       "datecreation": {
      //         "date": "2021-04-21 10:14:14.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "datecreationtz": {
      //         "date": "2021-04-21 12:14:14.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "follow": [],
      //       "system": [],
      //       "achievement": [],
      //       "action": {
      //         "name": "particper au forum pendant 3 heures",
      //         "score": 80,
      //         "link": null,
      //         "alias": "MARATHON3",
      //         "donecount": 1,
      //         "expertizes": [],
      //         "meta": []
      //       },
      //       "level": null,
      //       "monster": [],
      //       "media": [],
      //       "comment": null,
      //       "performer": {
      //         "id": "607718ba5af28b7a398b4568",
      //         "nickname": "LUDOVIC C.",
      //         "media": {
      //           "url": "https://api.rocketfid.com/media/default/rainbow/user/"
      //         },
      //         "levelupdated": "",
      //         "role": "user",
      //         "team": [],
      //         "uuid": "unavailable"
      //       },
      //       "private": 0,
      //       "sponsor": [],
      //       "hidden": 0,
      //       "visibility": "public",
      //       "externalid": null
      //     },
      //     {
      //       "id": "607ff9d85cf28b303e8b4576",
      //       "datecreation": {
      //         "date": "2021-04-21 10:09:28.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "datecreationtz": {
      //         "date": "2021-04-21 12:09:28.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "follow": [],
      //       "system": [],
      //       "achievement": {
      //         "id": "54465479d8b991b8718b4613",
      //         "name": "Semi Marathon",
      //         "status": "published",
      //         "score": 200,
      //         "media": {
      //           "id": "545b93fad7b991f76f8b45c4",
      //           "deletable": 0,
      //           "idlibrary": null,
      //           "sitekey": null,
      //           "md5": null,
      //           "version": null,
      //           "contenttype": "",
      //           "url": "https://api.rocketfid.com/media/545b93fad7b991f76f8b45c4/"
      //         },
      //         "successmessage": null,
      //         "order": 0,
      //         "link": null,
      //         "frequency": null,
      //         "timeframe": null
      //       },
      //       "action": [],
      //       "level": null,
      //       "monster": [],
      //       "media": [],
      //       "comment": null,
      //       "performer": {
      //         "id": "5fd27b455bf28b40208b4577",
      //         "nickname": "MENDRIKA R.",
      //         "media": {
      //           "url": "https://api.rocketfid.com/media/default/rainbow/user/"
      //         },
      //         "levelupdated": "",
      //         "role": "user",
      //         "team": [],
      //         "uuid": "unavailable"
      //       },
      //       "private": 0,
      //       "sponsor": [],
      //       "hidden": 0,
      //       "visibility": "public",
      //       "externalid": null
      //     },
      //     {
      //       "id": "607ff9d85cf28b303e8b4579",
      //       "datecreation": {
      //         "date": "2021-04-21 10:09:28.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "datecreationtz": {
      //         "date": "2021-04-21 12:09:28.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "follow": [],
      //       "system": [],
      //       "achievement": [],
      //       "action": {
      //         "name": "particper au forum pendant 3 heures",
      //         "score": 80,
      //         "link": null,
      //         "alias": "MARATHON3",
      //         "donecount": 1,
      //         "expertizes": [],
      //         "meta": []
      //       },
      //       "level": null,
      //       "monster": [],
      //       "media": [],
      //       "comment": null,
      //       "performer": {
      //         "id": "5fd27b455bf28b40208b4577",
      //         "nickname": "MENDRIKA R.",
      //         "media": {
      //           "url": "https://api.rocketfid.com/media/default/rainbow/user/"
      //         },
      //         "levelupdated": "",
      //         "role": "user",
      //         "team": [],
      //         "uuid": "unavailable"
      //       },
      //       "private": 0,
      //       "sponsor": [],
      //       "hidden": 0,
      //       "visibility": "public",
      //       "externalid": null
      //     },
      //     {
      //       "id": "607ff9d55af28bfc6f8b4567",
      //       "datecreation": {
      //         "date": "2021-04-21 10:09:24.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "datecreationtz": {
      //         "date": "2021-04-21 12:09:24.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "follow": [],
      //       "system": [],
      //       "achievement": {
      //         "id": "54465479d8b991b8718b4605",
      //         "name": "En savoir plus",
      //         "status": "published",
      //         "score": 10,
      //         "media": {
      //           "id": "545b93fcd8b9917f7e8b49db",
      //           "deletable": 0,
      //           "idlibrary": null,
      //           "sitekey": null,
      //           "md5": null,
      //           "version": null,
      //           "contenttype": "",
      //           "url": "https://api.rocketfid.com/media/545b93fcd8b9917f7e8b49db/"
      //         },
      //         "successmessage": null,
      //         "order": 0,
      //         "link": null,
      //         "frequency": null,
      //         "timeframe": null
      //       },
      //       "action": [],
      //       "level": null,
      //       "monster": [],
      //       "media": [],
      //       "comment": null,
      //       "performer": {
      //         "id": "607fb6b55af28b35518b4570",
      //         "nickname": "STEPHANE B.",
      //         "media": {
      //           "url": "https://api.rocketfid.com/media/default/rainbow/user/"
      //         },
      //         "levelupdated": "",
      //         "role": "user",
      //         "team": [],
      //         "uuid": "unavailable"
      //       },
      //       "private": 0,
      //       "sponsor": [],
      //       "hidden": 0,
      //       "visibility": "public",
      //       "externalid": null
      //     },
      //     {
      //       "id": "607ff9d55af28bfc6f8b456a",
      //       "datecreation": {
      //         "date": "2021-04-21 10:09:24.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "datecreationtz": {
      //         "date": "2021-04-21 12:09:24.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "follow": [],
      //       "system": [],
      //       "achievement": [],
      //       "action": {
      //         "name": " a posé une question: Câble coaxial BOX THD compatible avec la Box DSL ?",
      //         "score": 20,
      //         "link": "https://forum.bouyguestelecom.fr/questions/2662332-cable-coaxial-box-thd-compatible-box-dsl",
      //         "alias": "new_question",
      //         "donecount": 1,
      //         "expertizes": [
      //           2483
      //         ],
      //         "meta": []
      //       },
      //       "level": null,
      //       "monster": [],
      //       "media": [],
      //       "comment": null,
      //       "performer": {
      //         "id": "607fb6b55af28b35518b4570",
      //         "nickname": "STEPHANE B.",
      //         "media": {
      //           "url": "https://api.rocketfid.com/media/default/rainbow/user/"
      //         },
      //         "levelupdated": "",
      //         "role": "user",
      //         "team": [],
      //         "uuid": "unavailable"
      //       },
      //       "private": 0,
      //       "sponsor": [],
      //       "hidden": 0,
      //       "visibility": "public",
      //       "externalid": null
      //     },
      //     {
      //       "id": "607ff8175af28bf76e8b456f",
      //       "datecreation": {
      //         "date": "2021-04-21 10:01:54.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "datecreationtz": {
      //         "date": "2021-04-21 12:01:54.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "follow": [],
      //       "system": [],
      //       "achievement": {
      //         "id": "54465479d8b991b8718b4604",
      //         "name": "Première fois",
      //         "status": "published",
      //         "score": 20,
      //         "media": {
      //           "id": "545b93fed7b99127148b4876",
      //           "deletable": 0,
      //           "idlibrary": null,
      //           "sitekey": null,
      //           "md5": null,
      //           "version": null,
      //           "contenttype": "",
      //           "url": "https://api.rocketfid.com/media/545b93fed7b99127148b4876/"
      //         },
      //         "successmessage": null,
      //         "order": 0,
      //         "link": null,
      //         "frequency": null,
      //         "timeframe": null
      //       },
      //       "action": [],
      //       "level": null,
      //       "monster": [],
      //       "media": [],
      //       "comment": null,
      //       "performer": {
      //         "id": "607ff7bb5af28bc36e8b4571",
      //         "nickname": "WENDY N.",
      //         "media": {
      //           "url": "https://api.rocketfid.com/media/default/rainbow/user/"
      //         },
      //         "levelupdated": "",
      //         "role": "user",
      //         "team": [],
      //         "uuid": "unavailable"
      //       },
      //       "private": 0,
      //       "sponsor": [],
      //       "hidden": 0,
      //       "visibility": "public",
      //       "externalid": null
      //     },
      //     {
      //       "id": "607ff8185af28bf76e8b4572",
      //       "datecreation": {
      //         "date": "2021-04-21 10:01:54.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "datecreationtz": {
      //         "date": "2021-04-21 12:01:54.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "follow": [],
      //       "system": [],
      //       "achievement": [],
      //       "action": {
      //         "name": " a répondu à la question: restitution de cle 4G?",
      //         "score": 10,
      //         "link": "https://forum.bouyguestelecom.fr/questions/2577296-restitution-cle-4g",
      //         "alias": "new_answer",
      //         "donecount": 1,
      //         "expertizes": [
      //           2485
      //         ],
      //         "meta": []
      //       },
      //       "level": null,
      //       "monster": [],
      //       "media": [],
      //       "comment": null,
      //       "performer": {
      //         "id": "607ff7bb5af28bc36e8b4571",
      //         "nickname": "WENDY N.",
      //         "media": {
      //           "url": "https://api.rocketfid.com/media/default/rainbow/user/"
      //         },
      //         "levelupdated": "",
      //         "role": "user",
      //         "team": [],
      //         "uuid": "unavailable"
      //       },
      //       "private": 0,
      //       "sponsor": [],
      //       "hidden": 0,
      //       "visibility": "public",
      //       "externalid": null
      //     },
      //     {
      //       "id": "607ff5985cf28b623b8b4575",
      //       "datecreation": {
      //         "date": "2021-04-21 09:51:20.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "datecreationtz": {
      //         "date": "2021-04-21 11:51:20.000000",
      //         "timezone_type": 1,
      //         "timezone": "+00:00"
      //       },
      //       "follow": [],
      //       "system": [],
      //       "achievement": {
      //         "id": "54465479d8b991b8718b4613",
      //         "name": "Semi Marathon",
      //         "status": "published",
      //         "score": 200,
      //         "media": {
      //           "id": "545b93fad7b991f76f8b45c4",
      //           "deletable": 0,
      //           "idlibrary": null,
      //           "sitekey": null,
      //           "md5": null,
      //           "version": null,
      //           "contenttype": "",
      //           "url": "https://api.rocketfid.com/media/545b93fad7b991f76f8b45c4/"
      //         },
      //         "successmessage": null,
      //         "order": 0,
      //         "link": null,
      //         "frequency": null,
      //         "timeframe": null
      //       },
      //       "action": [],
      //       "level": null,
      //       "monster": [],
      //       "media": [],
      //       "comment": null,
      //       "performer": {
      //         "id": "607ff32b5cf28be4398b456b",
      //         "nickname": "sebd59",
      //         "media": {
      //           "id": "607ff32c5bf28bb3058b4574",
      //           "v": null,
      //           "url": "https://api.rocketfid.com/media/607ff32c5bf28bb3058b4574/"
      //         },
      //         "levelupdated": "",
      //         "role": "user",
      //         "team": [],
      //         "uuid": "unavailable"
      //       },
      //       "private": 0,
      //       "sponsor": [],
      //       "hidden": 0,
      //       "visibility": "public",
      //       "externalid": null
      //     }
      // ],
      datas: null,
      UserRanked: null,
      page: 0,
      loading: false
    };
  },
  created() {
    // this.requestData(this.page)
    this.datas = this.json
  },
  mounted () {
    this.getNextDatas()
    // setTimeout(() => {
    // this.loadDatas()
    // }, 2000)
  },
  // updated () {
  //   console.log('hello', this.datas)
  // },
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
                Accept: "*/*",
              },
            })
            // .then(() => {
            //   this.loading = true
            //   console.log('loading')
            // })
            .then((response) => (this.datas.push(...response.data)))
            // .then(() => {
            //   setTimeout(() => {
            //     this.loading = false
            //   }, 500)
            // })
            // .then(console.log('fk', this.datas))
            .catch((error) => console.log('erreur:', error))
            
        }
      }
    },
    loadDatas () {

      let observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry) => {
          console.log('entry :', entry.isIntersecting)
          console.log('entry :', entry.intersectionRatio)
        })
      }, {
        threshold: [0.5, 0.75]
      })
      
      let target = document.querySelector('.user-list')
      observer.observe(target)

      // this.page = e.target.textContent
      // console.log(e.target.textContent)
      // this.requestData(this.page)
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
  padding: 15px;
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