<template>
  <div class="user-stats">    
    <!-- SCORE -->
    <ul class="stats_list">
      <li class="stats_item border-bottom">
        <span class="item_text">
          Total
        </span>
        <span class="item_number-container">
          <span class="item_number">
            {{userStats.score.total}}
          </span>
        </span>
      </li>
      <li class="stats_item">
        <span class="item_text">
          Daily
        </span>
        <span class="item_number-container">
          <span class="item_number">
            {{userStats.score.daily}}
          </span>
          <span class="item_number-divisor">
            /500
          </span>
        </span>
      </li>
      <li class="stats_item">
        <span class="item_text">
          Weekly
        </span>
        <span class="item_number-container">
          <span class="item_number">
            {{userStats.score.weekly}}
          </span>
          <span class="item_number-divisor">
            /4000
          </span>
        </span>
      </li>
      <li class="stats_item">
        <span class="item_text">
          Monthly
        </span>
        <span class="item_number-container">
          <span class="item_number">
            {{userStats.score.monthly}}
          </span>
          <span class="item_number-divisor">
            /20000
          </span>
        </span>
      </li>
      <li class="stats_item border-top">
        <span class="item_text">
          Challenge terminé
        </span>
        <span class="item_number-container">
          <span class="item_number">
            {{userStats.statistic.achievement.all.done}}
          </span>
          <span class="item_number-divisor">
            /100
          </span>
        </span>
      </li>
      <li class="stats_item">
        <span class="item_text">
          Challenge en cours
        </span>
        <span class="item_number-container">
          <span class="item_number">
            {{userStats.statistic.achievement.all.total}}
          </span>
          <span class="item_number-divisor">
            /300
          </span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UserStats',
  props: {
    userStats: Object
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

  .item_text {
    font-size: 15px;
  }
  .item_number {
    font-weight: 600;
  }
  .item_number-divisor {
    font-size: 13px;
  }
}
</style>
