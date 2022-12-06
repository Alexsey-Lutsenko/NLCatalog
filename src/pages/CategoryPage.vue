<template>
  <div class="category__container _container">
    <div class="category__loader" v-if="loading">
      <app-loader></app-loader>
    </div>
    <div class="category__header" v-if="!loading">
      <div class="category__icon">
        <img src="../assets/leftarrow.png" alt="leftarrow" @click.prevent="back" />
      </div>
      <div class="category__title">{{ category.name }}</div>
      <div class="category__menutogger" @click.prevent="menuToggle">sub-меню</div>
    </div>
    <div class="catalog__body" v-if="!loading">
      <div class="catalor__saitbar saitbar" v-if="category.children.length > 2">
        <div class="saitbar__body">
          <div class="saitbar__items">
            <div :class="[{ saitbar__item_active: activeMenu === 0 }, 'saitbar__item']" @click.prevent="getGoods(0)">
              <div class="saitbar__text">Все продукты</div>
              <div class="saitbar__load" v-if="subCategoryLoad && activeMenu === 0">
                <app-loader></app-loader>
              </div>
            </div>
            <div
              :class="[{ saitbar__item_active: activeMenu === child.id }, 'saitbar__item']"
              v-for="child in category.children"
              @click.prevent="getGoods(child)"
            >
              <div class="saitbar__text">{{ child.name }}</div>
              <div class="saitbar__load" v-if="subCategoryLoad && activeMenu === child.id">
                <app-loader></app-loader>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="catalog__goods goods">
        <div class="goods__body">
          <div class="goods__cards">
            <div class="goods__card card-goods" v-for="good in goods">
              <div class="card-goods__image _ibg">
                <img :src="good.main_image_thumb_300" alt="" />
              </div>
              <div class="card-goods__body">
                <div class="card-goods__info">
                  <div class="card-goods__smalltext">{{ good.category.name }}</div>
                  <div class="card-goods__title">{{ good.present_name }}</div>
                  <div class="card-goods__description">{{ good.comment_name }}</div>
                  <div class="card-goods__price">{{ good.price }} ₽</div>
                </div>
                <div :class="[{ 'card-goods__button_alloved': !good.alloved && !good.available }, 'card-goods__button']">
                  <a href="#">{{ good.alloved || good.available ? "В корзину" : "Нет в наличии" }}</a>
                </div>
              </div>
            </div>
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
      category: {},
      goods: null,
      loading: true,
      subCategoryLoad: false,
      slug: this.$route.params.slug,
      subcategorySlug: this.$route.params.subcategorySlug,
      activeMenu: 0,
    };
  },

  mounted() {
    this.initialData(this.cityId);
  },

  methods: {
    async initialData(cityId) {
      let subCategory;
      this.loading = true;
      await this.axios
        .get(`https://nlstar.com/ru/api/catalog3/v1/menutags/?city_id=${cityId}`)
        .then(async (res) => {
          this.category = res.data.tags.find((cat) => cat.slug === this.slug);
          subCategory = this.category.children.find((cat) => cat.slug === this.subcategorySlug);
          await this.getGoods(subCategory || 0);
        })
        .catch((err) => console.log(err));

      this.loading = false;
    },

    back() {
      this.$router.push("/");
    },

    menuToggle() {
      document.querySelector(".saitbar").classList.toggle("_lock");
    },

    async getGoods(subCategory) {
      this.subCategoryLoad = true;
      if (subCategory === 0) {
        this.activeMenu = 0;
        await this.axios
          .get(`https://nlstar.com/ru/api/catalog3/v1/menutags/${this.slug}/?city_id=${this.cityId}`)
          .then((res) => {
            this.goods = res.data.products;
            this.$router.push({ path: `/category/${this.slug}/` });
          })
          .catch((err) => console.log(err));
      } else {
        this.activeMenu = subCategory.id;
        await this.axios
          .get(`https://nlstar.com/ru/api/catalog3/v1/menutags/${subCategory.slug}/?city_id=${this.cityId}`)
          .then((res) => {
            this.goods = res.data.products;
            this.$router.push({ path: `/category/${this.slug}/${subCategory.slug}/` });
          })
          .catch((err) => console.log(err));
      }
      if (document.querySelector(".saitbar")) {
        document.querySelector(".saitbar").classList.toggle("_lock");
      }
      this.subCategoryLoad = false;
    },
  },

  watch: {
    cityId(newValue) {
      this.initialData(newValue);
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
._lock {
  display: none;
}
.category__container {
}
.category__header {
  margin: 42px 0 24px 0;
  display: flex;
  align-items: center;
  align-items: center;
}
.category__loader {
  margin: 42px 0px 0px 0px;
  width: 50px;
  height: 50px;
}
.category__icon {
}
.category__icon:hover {
  cursor: pointer;
}
.category__title {
  margin: 0px 0px 0px 10px;
  font-size: 44px;
  line-height: 100%;
}
.category__menutogger {
  margin: 0px 0px 0px 10px;
  display: none;
  border: 1px solid #979797;
  border-radius: 20px;
  padding: 2px 5px;
}
.category__menutogger:hover {
  background: #979797;
}
.catalog__body {
  display: flex;
  margin: 0px 0px 50px 0px;
}
.catalor__saitbar {
}
.catalog__goods {
}

.saitbar {
}
.saitbar__body {
  width: 240px;
  margin: 0px 34px 0px 0px;
}
.saitbar__items {
}
.saitbar__item {
  padding: 8px 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: calc(24 / 16 * 100%);
  color: #202648;
  border-bottom: 1px solid #e9eef3;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.saitbar__item:hover {
  background: #e9eef3;
  cursor: pointer;
}
.saitbar__item_active {
  background: #e9eef3;
}
.saitbar__text {
}
.saitbar__load {
  display: flex;
  align-items: flex-end;
  width: 20px;
  height: 20px;
}

.goods {
}
.goods__body {
}
.goods__cards {
  display: flex;
  flex-wrap: wrap;
  margin: -12px;
}
.goods__card {
}

.card-goods {
  margin: 12px;
  height: 100%;
}
.card-goods__image {
  width: 271px;
  display: block;
  padding: 100% 0 0 0;
}
.card-goods__body {
  width: 271px;
  background: #ffffff;
  padding: 15px 20px 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  height: 300px;
}
.card-goods__info {
}
.card-goods__smalltext {
  margin: 0px 0px 4px 0px;
  font-weight: 400;
  font-size: 14px;
  line-height: 100%;
  color: #979797;
}
.card-goods__title {
  margin: 0px 0px 9px 0px;
  font-size: 20px;
  line-height: calc(24 / 20 * 100%);
}
.card-goods__description {
  margin: 0px 0px 14px 0px;
  font-weight: 400;
  font-size: 16px;
  line-height: calc(20 / 16 * 100%);
}
.card-goods__price {
  margin: 0px 0px 16px 0px;
  font-size: 26px;
  line-height: calc(24 / 26 * 100%);
}
.card-goods__button {
  background: linear-gradient(270deg, #ffa800 0%, #ff6f00 100%);
  border-radius: 24px;
  font-size: 18px;
  line-height: calc(24 / 18 * 100%);
  padding: 6px 65px;
  cursor: pointer;
  box-shadow: 0px 5px 10px #ffa800;
  transition: all 0.3s ease 0s;
}
.card-goods__button:hover {
  box-shadow: 0px 10px 10px #ffa800;
}
.card-goods__button a {
  color: #ffffff;
}
.card-goods__button_alloved {
  border: 2px solid rgba(151, 151, 151, 0.3);
  border-radius: 24px;
  box-shadow: none;
  background: #ffffff;
  padding: 6px 50px;
  cursor: default;
}
.card-goods__button_alloved:hover {
  box-shadow: none;
}
.card-goods__button_alloved a {
  color: rgba(39, 39, 39, 0.5);
  cursor: default;
}

@media (min-width: 891px) {
  ._lock {
    display: block;
  }
}

@media (max-width: 890px) {
  .saitbar {
    position: absolute;
    z-index: 2;
    background: #e5e5e5;
    border-right: 1px solid #979797;
    border-bottom: 1px solid #979797;
    padding: 0px 0px 20px 0px;
  }
  .category__menutogger {
    display: block;
  }
  .goods {
    margin: 0px 0px 0px 20px;
  }
  .goods__cards {
    justify-content: center;
  }
  .card-goods__image {
    width: 240px;
    display: block;
    padding: 90% 0 0 0;
  }
  .card-goods__body {
    width: 240px;
    height: 270px;
  }
  .card-goods__smalltext {
  }
  .card-goods__title {
    font-size: 16px;
  }
  .card-goods__description {
    font-size: 14px;
  }
  .card-goods__price {
  }
  .card-goods__button {
    padding: 6px 40px;
  }
  .card-goods__button_alloved {
    padding: 6px 30px;
  }
}

@media (max-width: 767px) {
  .category__loader {
    margin: 42px 0px 0px 0px;
    width: 30px;
    height: 30px;
  }
  .category__icon img {
    width: 20px;
    height: 20px;
  }
  .category__title {
    font-size: 24px;
  }
}

@media (max-width: 563px) {
  .goods {
    margin: 0px 0px 0px 20px;
  }
  .card-goods__image {
    width: 180px;
    display: block;
    padding: 90% 0 0 0;
  }
  .card-goods__body {
    width: 180px;
  }
  .card-goods__smalltext {
  }
  .card-goods__title {
    font-size: 16px;
  }
  .card-goods__description {
    font-size: 14px;
  }
  .card-goods__price {
  }
  .card-goods__button {
    font-size: 15px;
    padding: 6px 30px;
  }
  .card-goods__button_alloved {
    padding: 6px 10px;
  }
  .category__loader {
    margin: 42px 0px 0px 0px;
    width: 30px;
    height: 30px;
  }
  .category__icon img {
    width: 20px;
    height: 20px;
  }
  .category__title {
    font-size: 18px;
  }
}
</style>
