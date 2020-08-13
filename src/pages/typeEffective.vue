<template>
  <div id="type-effectiveness-page">
    <navbar />
    <div class="container my-2">
      <div class="row">
        <div class="col">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link active" 
                href="#search" 
                id="search-tab" 
                data-toggle="tab" 
                aria-controls="search" 
                aria-selected="true">Search</a>
            </li>
            <li class="nav-item" v-for="(pokemon, index) in pokemonTeam" :key="`team` + index">
              <a class="nav-link text-capitalize" 
                :href="`#pokemon_${pokemon.details.id}`" 
                :id="`tab_${pokemon.details.id}`" 
                data-toggle="tab" 
                :aria-controls="`pane_${pokemon.details.id}`" 
                aria-selected="false">
                {{pokemon.details.name}}
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div class="tab-pane fade show active text-center" role="tabpanel" id="search" aria-labelledby="search-tab">
              <div class="input-group input-group-sm search">
                <div class="input-group-prepend">
                  <div class="input-group-text">Name</div>
                </div>
                <autocomplete :search="getList"
                              :getResultValue="getName"
                              @submit="searchPokemon = $event"
                              class="autocomplete-container">
                </autocomplete>
                <div class="input-group-append">
                  <button @click="search" class="btn btn-success">Search</button>
                </div>
              </div>
              <template v-if="myPokemon !== null">
                <button class="btn btn-primary btn-sm my-2"
                        @click="addToTeam(myPokemon)">Add</button>
                <pokemonDetails :pokemon="myPokemon" />
              </template>
              <div class="text-danger" v-else-if="error !== null">
                {{error}}
              </div>
            </div>
            <div v-for="(pokemon, index) in pokemonTeam" 
                  class="tab-pane fade text-center" 
                  role="tabpanel" 
                  :id="`pokemon_${pokemon.details.id}`" 
                  :aria-labelledby="`tab_${pokemon.details.id}`"
                  :key="`pokemon` + index">
              <button class="btn btn-sm btn-danger my-2" @click="remove(index)">Remove</button>
              <pokemonDetails :pokemon="pokemon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import {unvue, distinct} from '../../utils';
  import typeIcon from '../components/typeIcon.vue';
  import pokemonDetails from '../components/pokemonDetails.vue';

  export default {
    name: 'app',
    components: {
      typeIcon, pokemonDetails
    },
    data() {
      return {
        searchPokemon: {},
        pokemonTeam: [],
        myPokemon: null,
        error: null,
        searchText: ''
      }
    },
    computed: {
      optimized() {
        const typing = this.pokemonTeam.reduce((acc, pokemon) => {
          pokemon.details.types.forEach(type => {
            if (!(type.type.name in acc))
              acc[type.type.name] = 0;
            acc[type.type.name]++;
          })
          return acc;
        }, {})
        return {
          typing
        }
      },
      fullList() {
        return Object.values(this.$store.state.released);
      }
    },
    methods: {
      async search() {
        if ('id' in this.searchPokemon) {
          try {
            this.myPokemon = await this.getDetails(this.searchPokemon.id);
          } catch (e) {
            this.error = "That Pokémon could not be found!";
          }
        }
      },
      async getDetails(id) {
        try {
          const details = (await axios({
            method:"GET",
            url: `https://pokeapi.co/api/v2/pokemon/${id}`
          })).data;
          const typing = {
            double_damage_from: [],
            double_damage_to: [],
            half_damage_from: [],
            half_damage_to: [],
            no_damage_from: [],
            no_damage_to: []
          };
          for (let i = 0; i < details.types.length; i++) {
            const damageRelations = (await axios({
              method:"GET",
              url: details.types[i].type.url
            })).data.damage_relations;

            Object.entries(damageRelations).forEach(([category, value]) => {
              typing[category] = typing[category].concat(value);
            })
          }
          return {details, typing: this.calculateTyping(typing)}
        } catch (e) {
          throw e;
        }
      },
      calculateTyping(typeEffectiveness) {
        const {double_damage_from, half_damage_from, no_damage_from} = typeEffectiveness;

        const doubleMod = 1.4;
        const neutralMod = 1;
        const halfMod = 0.714;
        const immuneMod = .51;
        let quadruple = [];
        let double = [];
        let neutral = ['normal', 'fire', 'fighting', 'water', 'flying', 'grass', 'poison', 'electric', 'ground', 'psychic', 'rock', 'ice', 'bug', 'dragon', 'ghost', 'dark', 'fairy', 'steel'];
        let half = [];
        let quarter = [];
        let immune = [];
        let superImmune = [];
        let alreadyChecked = [];

        unvue(neutral).forEach(type => {
          const modifier = isAffected(double_damage_from, type, doubleMod) *
            isAffected(half_damage_from, type, halfMod) *
            isAffected(no_damage_from, type, immuneMod);
          const rounded = Number(modifier.toFixed(2));
          if (rounded !== 1) neutral = neutral.filter(x => x !== type);
          coinSorter(rounded, type);
        })

        function isAffected(arr, type, modifier) {
          const index = neutral.findIndex(x => x === type);
          if (index > -1) neutral.splice(index, 1);
          switch (arr.filter(x => x.name === type).length) {
            case 0:
              return 1;
            case 1: 
              return modifier;
            case 2:
              return modifier * modifier;
            default:
              console.warn("Unknown number of instances", arr, type);
              return 1;
          }
        }
        function coinSorter(modifier, data) {
          switch (modifier) {
            case Number((doubleMod * doubleMod).toFixed(2)):
              quadruple.push(data);
              break;
            case Number(doubleMod.toFixed(2)):
              double.push(data);
              break;
            case Number(neutralMod.toFixed(2)):
              neutral.push(data);
              break;
            case Number(halfMod.toFixed(2)):
              half.push(data);
              break;
            case Number(immuneMod.toFixed(2)):
              immune.push(data);
              break;
            case Number((immuneMod * halfMod).toFixed(2)):
              quarter.push(data);
              break;
            case Number((immuneMod * immuneMod).toFixed(2)):
              superImmune.push(data);
              break;
            default:
              console.warn("Unknown sorting", modifier, unvue(data));
          }
        }

        return [
          {
            label: 'Mega Effective',
            values: quadruple,
            modifier: doubleMod * doubleMod
          }, 
          {
            label: 'Super Effective',
            values: double,
            modifier: doubleMod
          }, 
          {
            label: 'Neutral',
            values: neutral,
            modifier: neutralMod
          }, 
          {
            label: 'Resistant',
            values: half,
            modifier: halfMod
          }, 
          {
            label: 'Immune',
            values: immune,
            modifier: immuneMod
          },
          {
            label: 'Super Resistant',
            values: quarter,
            modifier: immuneMod * halfMod
          },
          {
            label: 'Super Immune',
            values: superImmune,
            modifier: immuneMod * immuneMod
          }
        ]
      },
      addToTeam(pokemonData) {
        const index = this.pokemonTeam.findIndex(x => x.details.id === pokemonData.details.id);
        if (index == -1) this.pokemonTeam.push(pokemonData);
        this.myPokemon = null;
        this.$nextTick(() => {
          $(`#tab_${pokemonData.details.id}`).tab('show');
        })
      },
      remove(index) {
        this.pokemonTeam.splice(index, 1);
        $('#search-tab').tab('show');
      },
      getList(input) {
        return this.fullList.filter(x => x.name.toLowerCase().includes(input.toLowerCase()));
      },
      getName(val) {
        return val.name;
      }
    },
    watch: {
      pokemonTeam: {
        deep: true,
        handler(newVal) {
          localStorage.setItem('pokemonList', JSON.stringify(newVal.map(x => x.details.name)));
        }
      }
    },
    async created() {
      const pokeList = JSON.parse(localStorage.getItem('pokemonList'));
      if (Array.isArray(pokeList)) {
        for (let i = 0; i < pokeList.length; i++) {
          this.pokemonTeam.push(await this.getDetails(pokeList[i]))
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  img { 
    height: 300px;
  }
  .input-group.search {
    max-width: 500px;
    text-align: center;
    margin: .25rem auto;
  }
</style>

<style lang="scss">
  #type-effectiveness-page {
    .autocomplete-container {
      display: flex;
      flex-grow: 1;
    }
    .autocomplete {
      width: 100%;
    }
    .autocomplete-input {
      border-radius: 0;
      background-color: white;
      padding: 5px 10px 5px 45px;
      border-color: #ced4da;
      font-size: .875rem;
    }
    ul.autocomplete-result-list {
      border-color: #ced4da;
      font-size: .875rem;
      li {
        padding: 5px 10px 5px 45px;
      }
    }
  }
</style>
