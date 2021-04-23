<template>
  <div class="user-presentation">
    <img class="user-card_img" :src="userCardPresentation.media.url" alt="" />
    <h2 class="user-card_pseudo">{{ userCardPresentation.nickname }}</h2>
    <p class="user-card_level">
      <span class="user-card_level-text">Rang</span>
      <span class="user-card_level-number"> {{ userCardPresentation.level }} </span>
    </p>

    <div class="user-card_followers-container">
      <p class="user-card_followers-block">
        <span class="user-card_followers-number">
          {{ userCardPresentation.followingcount }}
        </span>
        <span class="user-card_followers-text">
          {{
            userCardPresentation.followingcount === 1 || userCardPresentation.followingcount === 0
              ? "Abonnement"
              : "Abonnements"
          }}
        </span>
      </p>
      <p class="user-card_followers-block">
        <span class="user-card_followers-number">
          {{ userCardPresentation.followercount }}
        </span>
        <span class="user-card_followers-text">
          {{
            userCardPresentation.followercount === 1 || userCardPresentation.followercount === 0
              ? "Abonné"
              : "Abonnés"
          }}
        </span>
      </p>
    </div>
    <div class="user-card_bio">
      <p class="user-card_bio-text">
        {{
          userCardPresentation.biography === null || userCardPresentation.biography === ""
            ? "Pas encore de présentation"
            : userCardPresentation.biography
        }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'userCardPresentation.',
  props: {
    userCardPresentation: Object
  }
}
</script>


<style scoped lang="scss">
.user-card_img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
  .user-card_pseudo {
    margin-bottom: 0;
    text-transform: lowercase;
    font-weight: 700;
    font-size: 28px;

    &:first-letter {
      text-transform: capitalize;
    }
  }

  .user-card_level {
    margin-top: 5px;
    font-size: 14px;
    color: #869196;

    .user-card_level-number {
      font-weight: 700;
    }
  }

  .user-card_followers-container {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 15px;

    .user-card_followers-block {
      display: flex;
      flex-direction: column;
    }
    .user-card_followers-number {
      font-weight: 700;
    }
    .user-card_followers-text {
      font-size: 13px;
    }
  }

  .user-card_bio {
    border-top: 1px solid #ececec;
    .user-card_bio-text {
      font-size: 14px;
      color: #859095;
    }
  }
</style>
