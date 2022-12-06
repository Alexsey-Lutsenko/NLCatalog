<template>
  <div class="layout">
    <div class="layout__container _container">
      <div class="layout__location location">
        <div class="location__block" @click="show">
          <div class="location__icon">
            <img src="../assets/geo.png" alt="geo" />
          </div>
          <div class="location__sity">{{ city }}</div>
        </div>
      </div>
    </div>
  </div>
  <app-modal :show="showModal" @exit="showModal = false">
    <template #modalHeader>
      <div>Выбор населённого пункта:</div>
    </template>
    <template #modalBody>
      <div class="modal__find-block">
        <app-input-with-search
          class="modal__input"
          v-model="findCityLabel"
          :data="cities"
          :loading="loading"
          @getResult="getFindCity"
        ></app-input-with-search>
        <app-button-submit class="modal__button-submit" :disabled="btnDisabled" @click="submit">Подтвердить</app-button-submit>
      </div>
    </template>
  </app-modal>
</template>

<script>
export default {
  data() {
    return {
      cities: [],
      findCityLabel: "",
      cityObject: null,
      city: null,
      loading: false,
      showModal: false,
      btnDisabled: true,
    };
  },

  mounted() {
    this.axios.get(`https://nlstar.com/api/catalog3/v1/city/?id=${this.cityId}`).then((res) => (this.city = res.data.data.city));
  },

  methods: {
    show() {
      this.findCityLabel = "";
      this.showModal = true;
    },
    getFindCity(city) {
      this.findCityLabel = city.label;
      this.cityObject = city;
      this.btnDisabled = false;
    },
    submit() {
      this.city = this.cityObject.city;
      localStorage.setItem("cityId", this.cityObject.id);
      this.$store.commit("setCityId", this.cityObject.id);
      this.showModal = false;
      this.btnDisabled = true;
    },
  },

  watch: {
    async findCityLabel(newValue, oldValue) {
      if (newValue.length > 2 && newValue !== oldValue) {
        this.loading = true;
        await this.axios
          .get(`https://nlstar.com/api/catalog3/v1/city/?term=${this.findCityLabel}`)
          .then((res) => (this.cities = res.data.data))
          .catch((err) => console.log(err));
        this.loading = false;
      }
    },
  },

  computed: {
    cityId() {
      return localStorage.getItem("cityId");
    },
  },
};
</script>

<style scoped>
.layout {
  height: 72px;
  background: #ffffff;
  position: fixed;
  width: 100%;
  z-index: 9999;
  box-shadow: 0px 2px 4px rgba(39, 39, 39, 0.1);
}
.layout__container {
}
.layout__location {
}
.location {
  padding: 25px 0;
  display: flex;
  align-items: center;
}
.location__block {
  cursor: pointer;
  display: flex;
}
.location__icon {
  display: flex;
  align-items: center;
  margin-right: 8px;
}
.location__icon:hover ~ .location__sity {
  text-decoration: underline;
}
.location__sity {
  font-size: 15px;
  line-height: calc(24 / 15 * 100%);
}
.location__sity:hover {
  text-decoration: underline;
}
.modal__find-block {
  display: flex;
  justify-content: space-between;
}
.modal__button-submit {
  margin-left: 18px;
}
</style>
