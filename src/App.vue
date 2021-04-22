<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style lang="scss">
:root {
  --blue: #009dcc;
  --dark_blue: #0055a4;
  --darker_blue: #1a455f;
  --light_blue: #14809b;
  --red: #ea5b0f;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body, html  {
  margin: 0;
  padding: 0;
}
ul {
  margin-top: 0;
  padding-left: 0;
}
li {
  list-style-type: none;
}
a {
  text-decoration: none;
  color: #000;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
}


// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
