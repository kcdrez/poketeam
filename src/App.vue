<template>
  <div class="container">
  	<div class="row">
  		<div class="col-6 offset-3 text-center">
		  	<div class="input-group input-group-sm">
			    <input class="form-control" type="text" v-model="pokemonName" @keyup.enter="getDetails">
		  		<div class="input-group-append">
			    	<button @click="getDetails" class="btn btn-primary">Get Pokemon</button>
		  		</div>
		  	</div>
  		</div>
  	</div>
  	<div class="row text-center">
	    <div v-if="details" class="col-6 offset-3">
	      <div>Name: <span class="text-capitalize">{{details.name}}</span></div>
	      <div>Type{{details.types.length > 1 ? 's': '' }}: 
	      	<typeIcon v-for="{type} in details.types" :type="type.name" class="d-inline-block ml-1" />
	      </div>
	    </div>
  	</div>
  	<template v-if="details">
	  	<div class="row">
	  		<div class="col-6 offset-3 text-center">
	    		<img :src="details.sprites.front_default">
	  		</div>
	  	</div>
	    <div class="row">
	    	<template v-for="category in typing">
		    	<div class="col" v-if="category.values.length > 0">
		    		{{category.label}} (x{{category.modifier.toFixed(2)}})
		    		<typeIcon v-for="type in category.values" :key="type" :type="type" class="text-center" />
		    	</div>
	    	</template>
	    </div>
  	</template>
  </div>
</template>

<script>
  import axios from 'axios';
  import {unvue, distinct} from '../utils';
  import typeIcon from './components/typeIcon.vue'

  export default {
    name: 'app',
    components: {
    	typeIcon
    },
    data() {
      return {
        pokemonName: 'gyarados',
        details: null,
        typeEffectiveness: {}
      }
    },
    computed: {
      typing() {
        const {double_damage_from, half_damage_from, no_damage_from} = this.typeEffectiveness;

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
      }
    },
    methods: {
      async getDetails() {
        this.details = (await axios({
          method:"GET",
          url: `https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`
        })).data;
        this.resetTypeEffectiveness();
        for (let i = 0; i < this.details.types.length; i++) {
          const damageRelations = (await axios({
            method:"GET",
            url: this.details.types[i].type.url
          })).data.damage_relations;
          Object.entries(damageRelations).forEach(([category, value]) => {
            this.typeEffectiveness[category] = this.typeEffectiveness[category].concat(value);
          })
        }
      },
      resetTypeEffectiveness() {
        this.typeEffectiveness = {
          double_damage_from: [],
          double_damage_to: [],
          half_damage_from: [],
          half_damage_to: [],
          no_damage_from: [],
          no_damage_to: []
        }
      }
    },
    created() {
      this.resetTypeEffectiveness();
    }
  };
</script>

<style scoped lang="scss">
	img { 
		height: 300px;
	}
</style>
