import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    initialized: false,
    released: {},
    pokemonTypes: [],
    maxCP: []
  },
  mutations: {
    INIT(state, payload) {
      state.released = payload.released;
      state.pokemonTypes = payload.pokemonTypes;
      state.maxCP = payload.maxCP;
      state.initialized = true;
    }
  },
  actions: {
    async initialize(ctx) {
      if (!ctx.state.initialized) {
        const releasedPromise = axios({
          method: "GET",
          url: "https://pokemon-go1.p.rapidapi.com/released_pokemon.json",
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
            "x-rapidapi-key": "1fb9c2c8a3mshe7d94a4b7788554p146d5bjsnd74b1f69ca80"
          }
        });
        const typesPromise = axios({
          method: "GET",
          url: "https://pokemon-go1.p.rapidapi.com/pokemon_types.json",
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
            "x-rapidapi-key": "1fb9c2c8a3mshe7d94a4b7788554p146d5bjsnd74b1f69ca80"
          }
        });
        const maxCPPromise = axios({
          method: "GET",
          url: "https://pokemon-go1.p.rapidapi.com/pokemon_max_cp.json",
          headers: {
            "content-type": "application/octet-stream",
            "x-rapidapi-host": "pokemon-go1.p.rapidapi.com",
            "x-rapidapi-key": "1fb9c2c8a3mshe7d94a4b7788554p146d5bjsnd74b1f69ca80"
          }
        });
        try {
          const [released, pokemonTypes, maxCP] = await Promise.all([releasedPromise, typesPromise, maxCPPromise]);
          ctx.commit('INIT', {
            released: released.data,
            pokemonTypes: pokemonTypes.data,
            maxCP: maxCP.data
          })
        } catch (e) {
          console.error(e);
        }
      }
    }
  },
  getters: {

  }
})

export default store;