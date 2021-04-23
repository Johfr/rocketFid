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
  font-family: "Poppins", Helvetica, Arial, sans-serif;
  // font-family: Avenir, Helvetica, Arial, sans-serif;
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

// CLASSES
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 15px;
  padding-right: 15px;
}
.btn {
  min-width: 100px;
  border: unset;
  border-radius: 8px;
  a {
    display: block;
    padding: 10px 20px;
    color: #fff;
  }

  &.btn-primary {
    background-color: var(--darker_blue);
  }
}
.h3 {
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.d-none {
  display: none;
}

.border-top {
  margin-top: 30px !important;
  padding-top: 20px;
  border-top: 1px solid #cecece;
}

.border-bottom {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #cecece;
}
</style>
