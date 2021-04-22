<template>
  <header class="header">
    <h1 class="h1">{{ msg }}</h1>
  </header>
</template>

<script>
export default {
  name: 'GamificationHeader',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  margin-bottom: 50px;
  color: #fff;
  background-color: var(--darker_blue);
  background-image: url('../assets/pattern-dark-logo.svg');
  background-repeat: no-repeat;
  background-size: 75%;
  background-position: 50% 40%;
}
.h1 {
  text-transform: uppercase;
}
</style>
