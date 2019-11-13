<template>
	<div class="type-icon-component" :class="type">
		<span class="px-3">{{type}}</span>
	</div>
</template>

<script>
	export default {
		props: {
			type: {
				type: String,
				required: true
			}
		}
	};
</script>

<style scoped>
	.type-icon-component {
		border-radius: 20px;
		color: white;
		border: 1px solid;
	}
	span {
		text-transform: capitalize;
	}
	.normal {
		background-color: #A8A878;
		border-color: #C6C6A7;
	}
	.fire {
		background-color: #F08030;
		border-color: #9C531F;
	}
	.fighting {
		background-color: #C03028;
		border-color: #7D1F1A;
	}
	.water {
		background-color: #6890F0;
		border-color: #445E9C;
	}
	.flying {
		background-color: #A890F0;
		border-color: #6D5E9C;
	}
	.grass {
		background-color: #78C850;
		border-color: #4E8234;
	}
	.poison {
		background-color: #A040A0;
		border-color: #682A68;
	}
	.electric, .lightning {
		background-color: #F8D030;
		border-color: #A1871F;
	}
	.ground {
		background-color: #E0C068;
		border-color: #927D44;
	}
	.psychic {
		background-color: #F85888;
		border-color: #A13959;
	}
	.rock {
		background-color: #B8A038;
		border-color: #786824;
	}
	.ice {
		background-color: #98D8D8;
		border-color: #638D8D;
	}
	.bug {
		background-color: #A8B820;
		border-color: #6D7815;
	}
	.dragon {
		background-color: #7038F8;
		border-color: #4924A1;
	}
	.ghost {
		background-color: #705898;
		border-color: #493963;
	}
	.dark, .darkness {
		background-color: #705848;
		border-color: #49392F;
	}
	.steel, .metal {
		background-color: #B8B8D0;
		border-color: #787887;
	}
	.fairy {
		background-color: #EE99AC;
		border-color: #9B6470;
	}
</style>