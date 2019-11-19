<template>
  <div class="type-icon-component" :class="[{'clickable': hoverClick}, type.toLowerCase()]">
    <span class="px-3">{{type}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        required: true
      },
      hoverClick: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style scoped lang="scss">
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

    &.clickable:hover {
      background-color: #9c9c63;
    }
  }
  .fire {
    background-color: #F08030;
    border-color: #9C531F;

    &.clickable:hover {
      background-color: #ed6d12;
    }
  }
  .fighting {
    background-color: #C03028;
    border-color: #7D1F1A;

    &.clickable:hover {
      background-color: #94241e;
    }
  }
  .water {
    background-color: #6890F0;
    border-color: #445E9C;

    &.clickable:hover {
      background-color: #4578ed;
    }
  }
  .flying {
    background-color: #A890F0;
    border-color: #6D5E9C;

    &.clickable:hover {
      background-color: #8462ea;
    }
  }
  .grass {
    background-color: #78C850;
    border-color: #4E8234;

    &.clickable:hover {
      background-color: #5fae37;
    }
  }
  .poison {
    background-color: #A040A0;
    border-color: #682A68;

    &.clickable:hover {
      background-color: #803380;
    }
  }
  .electric, .lightning {
    background-color: #F8D030;
    border-color: #A1871F;

    &.clickable:hover {
      background-color: #f6c709;
    }
  }
  .ground {
    background-color: #E0C068;
    border-color: #927D44;

    &.clickable:hover {
      background-color: #d8b041;
    }
  }
  .psychic {
    background-color: #F85888;
    border-color: #A13959;

    &.clickable:hover {
      background-color: #f73b73;
    }
  }
  .rock {
    background-color: #B8A038;
    border-color: #786824;

    &.clickable:hover {
      background-color: #9c8830;
    }
  }
  .ice {
    background-color: #98D8D8;
    border-color: #638D8D;

    &.clickable:hover {
      background-color: #7ecece;
    }
  }
  .bug {
    background-color: #A8B820;
    border-color: #6D7815;

    &.clickable:hover {
      background-color: #8b981b;
    }
  }
  .dragon {
    background-color: #7038F8;
    border-color: #4924A1;

    &.clickable:hover {
      background-color: #5009f6;
    }
  }
  .ghost {
    background-color: #705898;
    border-color: #493963;

    &.clickable:hover {
      background-color: #604a82;
    }
  }
  .dark, .darkness {
    background-color: #705848;
    border-color: #49392F;

    &.clickable:hover {
      background-color: #5d493c;
    }
  }
  .steel, .metal {
    background-color: #B8B8D0;
    border-color: #787887;

    &.clickable:hover {
      background-color: #a3a3c2;
    }
  }
  .fairy {
    background-color: #EE99AC;
    border-color: #9B6470;

    &.clickable:hover {
      background-color: #e97c94;
    }
  }
  .clickable {
    cursor: pointer;
  }
</style>