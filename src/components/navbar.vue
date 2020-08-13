<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link :to="{name: 'home'}" class="navbar-brand">Home</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-toggler" aria-controls="navbar-toggler" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbar-toggler">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link :to="{name: 'typing'}" class="nav-link">Typing</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{name: 'strong'}" class="nav-link">Strongest Pokemon</router-link>
        </li>        
      </ul>
      <div class="navbar-text">
        <small>Version: {{version}}</small>
      </div>
    </div>
  </nav>
</template>

<script>
  import {version} from '../../package.json';

  export default {
    name: 'navbar',
    data() {
      return {
        version
      }
    }
  };
</script>