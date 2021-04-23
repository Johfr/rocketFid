<template>
  <div class="user-challenges">
    <ul
      v-for="(classement, index) in userClassement"
      :key="classement.id"
      class="challenge_list"
    >
      <li class="challenge_item">
        <div class="item_title-container">
          <svg
            class="challenge_icon"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 3"
            viewBox="0 0 64 80"
            x="0px"
            y="0px"
          >
            <path d="M29.184,47h5.631a2.982,2.982,0,0,0-5.631,0Z" />
            <path
              d="M32,51c-.409,0-1,.778-1,2,0,1.2.6,2,1,2s1-.778,1-2S32.407,51,32,51Z"
            />
            <path
              d="M36.9,47h2.658l-2.25-6H26.692l-2.25,6H27.1a5,5,0,0,1,9.8,0Z"
            />
            <path
              d="M47,20.545V8.691L32,3.067,17,8.691V20.545L32,33.67ZM25.41,25.807a1,1,0,0,1-.372-1.083L26.8,18.571l-6.191-2.653a1,1,0,0,1,.152-1.89l7.518-1.88L31.08,5.605a1,1,0,0,1,1.838,0l2.805,6.543,7.519,1.88a1,1,0,0,1,.151,1.89L37.2,18.571l1.758,6.153a1,1,0,0,1-1.517,1.107L32,22.2l-5.446,3.631A1,1,0,0,1,25.41,25.807Z"
            />
            <path
              d="M32.554,20.166l3.736,2.491-1.252-4.383A1,1,0,0,1,35.6,17.08l4.272-1.831-5.12-1.28a1,1,0,0,1-.677-.576L32,8.538l-2.082,4.855a1,1,0,0,1-.676.576l-5.121,1.28,4.272,1.831a1,1,0,0,1,.568,1.194l-1.253,4.383,3.736-2.491a1.006,1.006,0,0,1,1.11,0Z"
            />
            <path
              d="M47,25.545V23.2L32.658,35.751a1,1,0,0,1-1.317,0L17,23.2v2.343L32,38.671Z"
            />
            <path
              d="M29,53c0-2.243,1.317-4,3-4s3,1.757,3,4-1.317,4-3,4H47V52.413L43.585,49H20.414L17,52.413V57H32C30.317,57,29,55.242,29,53Zm8,0h6v2H37ZM27,55H21V53h6Z"
            />
            <polygon
              points="15 20.999 9.618 20.999 11.618 24.998 15 24.998 15 20.999"
            />
            <path d="M48,59H16a1,1,0,1,0,0,2H48a1,1,0,0,0,0-2Z" />
            <polygon
              points="15 14.999 6.618 14.999 8.618 18.998 15 18.998 15 14.999"
            />
            <polygon
              points="48.999 24.998 52.382 24.998 54.382 20.999 48.999 20.999 48.999 24.998"
            />
            <polygon
              points="15 8.999 3.618 8.999 5.618 12.998 15 12.998 15 8.999"
            />
            <polygon
              points="49 8.999 49 12.998 58.382 12.998 60.382 8.999 49 8.999"
            />
            <polygon
              points="48.999 18.998 55.382 18.998 57.382 14.999 49 14.999 48.999 18.998"
            />
          </svg>
          <div class="item_title-subcontainer">
            <span class="h3">{{ classement.name }}</span>
          </div>
        </div>
        <div class="item_container">
          <div class="item_text-container">
            <span class="item_text"> Niveau : </span>
            <span class="item_number-container">
              <span class="item_number">
                {{ classement.level }}
              </span>
            </span>
          </div>
          <div class="item_text-container">
            <span class="item_text"> Niveau : </span>
            <span class="item_number-container">
              <span class="item_number">
                {{ classement.levelname }}
              </span>
            </span>
          </div>
          <div class="item_text-container ratio">
            <span class="item_text"> total : </span>
            <span class="item_number-container">
              <span class="item_number">
                {{ classement.score }}
                <span class="item_number-divisor"> /{{classement.nextlevelscore}} </span>
              </span>
            </span>
              
            <div class="user-score_container">
              <span class="user-score" :data-score="classementRatios[index]"></span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UserClassement",
  data() {
    return {
      classementRatios: []
    }
  },
  props: {
    userClassement: Array,
  },
  created() {
    // calcul du ratio score/nextlevel
    this.userClassement.forEach((classement) => {
      const ratio = Math.round((classement.score * 100) / (classement.score + classement.nextlevelscore))
      this.classementRatios.push(ratio)
    })
  },
};
</script>


<style scoped lang="scss">

.item_text-container {
  &.ratio {
    display: flex;
  }
}
.user-score_container {
  max-width: 50px;
  height: 5px;
  margin-top: 13px;
  margin-left: 10px;
  background-color: #fff;
  .user-score {
    background-color: var(--darker_blue);
  }
}
</style>
