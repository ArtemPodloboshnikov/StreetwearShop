<template>
    <div :class="`card ${$attrs.class}`">
        <img class="image" :src="src" :alt="alt" />
        <div class="titles">
            <h1>{{brand}}</h1>
            <h3>{{model.length >= 16 ? (model.slice(0, 16) + '...') : model}}</h3>
        </div>
        <div class="price">
            <h1>{{price}}₽</h1>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: 'Card',
        props: {
            brand: {
                type: String,
                required: true
            },
            model: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            src: {
                type: String,
                required: true
            },
            alt: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>

  .card h3,
  .card h1 {
    margin: 0;
    padding: 0;
  }

  .card {
    display: grid;
    grid-template-rows: 70% 20% 10%;
    height: 390px;
  }
  .titles {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-items: center;
    background: var(--danger);
    text-align: center;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .price {
    background: var(--warn);
    text-align: center;
    color: var(--dark);
  }
</style>