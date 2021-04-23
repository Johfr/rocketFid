<template>
  <div class="user-stats">    
    <!-- SCORE -->
    <ul class="stats_list">
      <li class="stats_item">
        <span class="item_text">
          social
        </span>
        <span class="item_number-container">
          <span class="item_number">
            {{ userSocial.social.length === 0 ? '/' : userSocial.social }}
          </span>
        </span>
      </li>
      <li class="stats_item">
        <span class="item_text">
          website
        </span>
        <span class="item_number-container">
          <span class="item_number">
            {{userSocial.website === null ? '/' : userSocial.website}}
          </span>
        </span>
      </li>
      <li class="stats_item">
        <span class="item_text">
          team
        </span>
        <span class="item_number-container">
          <span class="item_number">
            {{ userSocial.team.length === 0 ? '/' : userSocial.team }}
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UserSocial',
  props: {
    userSocial: Object
  }
}
</script>


<style scoped lang="scss">
.stats_item {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  padding-left: 15px;
  padding-right: 15px;
  color: #3e4040;
  
  .item_number {
    font-weight: 600;
  }
  .item_number-divisor {
    font-size: 13px;
  }
}
</style>
