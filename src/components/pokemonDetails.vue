<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-md-12">
        <img :src="pokemon.details.sprites.front_default">
      </div>
      <div class="col-lg-6 col-md-12">
        <img :src="pokemon.details.sprites.front_shiny">
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <div>Name: <span class="text-capitalize">{{pokemon.details.name}}</span></div>
        <span>Type{{pokemon.details.types.length > 1 ? 's': '' }}:</span>
        <typeIcon v-for="{type} in pokemon.details.types" :type="type.name" class="d-inline-block ml-1" :key="type.name" />
      </div>
    </div>
    <div class="row mb-3">
      <template v-for="category in pokemon.typing">
        <div class="col-lg-2 col-md-4 col-sm-12 my-2" v-if="category.values.length > 0" :key="category.label">
          <div>{{category.label}} (x{{category.modifier.toFixed(2)}})</div>
          <typeIcon v-for="type in category.values" :key="type" :type="type" class="text-center" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import typeIcon from './typeIcon.vue';

  export default {
    name: 'PokemonDetails',
    components: {typeIcon},
    props: {
      pokemon: {
        type: Object,
        required: true
      }
    }
  };
</script>

<style scoped lang="scss">
  img { 
    height: 600px;
    width: 300px;
    object-fit: contain;
    margin: -50%;
  }
</style>