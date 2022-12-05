<template>
  <div class="catalog">
    <div class="catalog__container _container">
      <div class="catalog__header">
        <h1>Каталог товаров</h1>
      </div>
      <div class="catalog__loader" v-if="loading">
        <app-loader></app-loader>
      </div>
      <div class="catalog__cards" v-else>
        <div class="catalog__card card-catalog" v-for="category in categories">
          <div :style="{ color: category.text_color }" class="card-catalog__title">{{ category.name }}</div>
          <div class="card-catalog__image _ibg">
            <img :src="category.image" :alt="category.name" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categories: null,
      loading: false,
    };
  },

  mounted() {
    this.getCategories(this.cityId);
  },

  methods: {
    async getCategories(cityId) {
      this.loading = true;
      await this.axios
        .get(`https://nlstar.com/ru/api/catalog3/v1/menutags/?sity_id=${cityId}`)
        .then((res) => (this.categories = res.data.tags))
        .catch((err) => console.log(err));
      this.loading = false;
    },
  },

  watch: {
    cityId(newValue) {
      this.getCategories(newValue);
    },
  },

  computed: {
    cityId() {
      return this.$store.getters.getCityId;
    },
  },
};
</script>

<style scoped>
.catalog {
  margin: 0px 0px 50px 0px;
}
.catalog__container {
}
.catalog__header {
  margin: 35px 0px 20px 0px;
  font-size: 44px;
  line-height: 100%;
  color: #272727;
}
.catalog__loader {
  width: 50px;
  height: 50px;
}
.catalog__cards {
  display: flex;
  flex-wrap: wrap;
  margin: -11px;
}
.catalog__card {
}
.card-catalog {
  margin: 11px;
  position: relative;
}
.card-catalog:hover {
  cursor: pointer;
}
.card-catalog__title {
  position: absolute;
  font-size: 24px;
  line-height: calc(28 / 24 * 100%);
  top: 20px;
  left: 20px;
  z-index: 2;
}
.card-catalog__image {
  min-width: 271px;
  display: block;
  padding: 56% 0 0 0;
}
.card-catalog__image img {
  border-radius: 5px;
}

@media (max-width: 1181px) {
  .catalog__cards {
    justify-content: center;
  }
}
@media (max-width: 767px) {
  .catalog__header {
    text-align: center;
    font-size: 32px;
  }
}
</style>
