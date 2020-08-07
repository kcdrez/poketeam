<template>
  <div>
    <navbar />
    <h1 class="text-center">Strong Pokemon</h1>
    <div class="container">
      <div class="row">
        <div class="col-lg-2 col-md-4 col-sm-6 text-center" v-for="typing in results" :key="typing.type">
          <typeIcon :type="typing.type" @click.native="selected = typing" hoverClick class="mx-1" />
        </div>
      </div>
      <div class="row" v-if="selected">
        <template v-for="(pokemon, index) in selected.pokemon">
          <div class="col-lg-4 col-md-6 col-sm-12 text-center" v-if="index <= 11" :key="pokemon.pokemon_id">
            <img :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon_id}.png`">
            <div>{{pokemon.pokemon_name}}</div>
            <div>Max CP: {{pokemon.max_cp}}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {unvue} from '../../utils';
  import typeIcon from '../components/typeIcon.vue';

  export default {
    name: 'StrongestPokemon',
    components: { typeIcon },
    data() {
      return {
        selected: null
      }
    },
    computed: {
      ...mapState({
        results(state) {
          const {released, pokemonTypes, maxCP} = state;
          const ignoredForms = ['Purified', 'Normal', 'Shadow'];

          const mapping = maxCP.reduce((arr, pokemonCP) => {
            if (pokemonCP.pokemon_id in released) {
              const matchedPokemon = pokemonTypes.find(pokemonType => {
                return pokemonCP.form === pokemonType.form &&
                  pokemonCP.pokemon_id === pokemonType.pokemon_id;
              });
              if (matchedPokemon) {
                matchedPokemon.type.forEach(type => {
                  const found = arr.find(x => x.type === type);
                  if (found) {
                    const formAlreadyIncluded = found.pokemon.some(pokemon => pokemon.pokemon_name === pokemonCP.pokemon_name && ignoredForms.includes(pokemon.form)) && ignoredForms.includes(pokemonCP.form);
                    if (!formAlreadyIncluded) {
                      found.pokemon.push(pokemonCP);
                      found.pokemon.sort((a, b) => {
                        if (a.max_cp > b.max_cp) return -1;
                        else if (b.max_cp > a.max_cp) return 1;
                        else return 0;
                      })
                    }
                  }
                  else {
                    arr.push({
                      type, pokemon: [pokemonCP]
                    })
                  }
                })
              }
              else console.warn(`Couldnt find a matching pokemon: `, unvue(pokemonCP));
            }
            return arr;
          }, [])
          .sort((a, b) => {
            if (a.type > b.type) return 1;
            else if (b.type > a.type) return -1;
            else return 0;
          })
          return mapping;
        }
      })
    }
  };
</script>

<style scoped>
  img {
    height: 300px;
    margin: auto;
    display: block;
  }
</style>