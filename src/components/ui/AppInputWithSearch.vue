<template>
  <div @blur="componentFocusOut" tabindex="0" ref="search" class="search">
    <div :class="[{ 'search__not-result': !isOpenSearchResult, 'search__input-disabled': disabledControl }, 'search__input']">
      <input
        type="text"
        placeholder="Например, Санкт-петербург"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="inputFocusOut"
        :disabled="disabledControl"
      />
      <div class="search__icon icon" v-if="!disabledControl">
        <div class="icon__removed" v-if="!load && modelValue">
          <img src="../../assets/xmark.png" alt="xmark" @click.prevent="modelValue = ''" />
        </div>
        <div class="icon__loader" v-if="load">
          <app-loader></app-loader>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div v-if="isOpenSearchResult" class="search__result">
        <hr class="search__line" />
        <ul>
          <li v-for="city in cities">
            <div class="search__result-item" @mousedown="getResult(city)">
              {{ city.label }}
            </div>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AppInputWithSearch",

  emits: ["update:modelValue", "getResult"],

  props: {
    modelValue: {
      type: String,
    },
    data: {
      type: Array,
      default: [],
    },
    disabledControl: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isOpenSearchResult: false,
      cities: this.data,
      load: this.loading,
    };
  },

  methods: {
    getResult(result) {
      if (result) {
        this.$emit("getResult", result);
      } else {
        this.isOpenSearchResult = false;
      }
    },

    componentFocusOut() {
      if (this.isOpenSearchResult) {
        this.isOpenSearchResult = false;
      }
    },

    inputFocusOut() {
      this.$refs.search.focus();
      this.componentFocusOut();
    },
  },

  watch: {
    data(newValue, oldValue) {
      if (newValue !== oldValue && newValue.length > 2) {
        this.cities = newValue;
        this.isOpenSearchResult = true;
      } else {
        this.isOpenSearchResult = false;
        this.cities = [];
      }
    },
    loading(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.load = newValue;
      }
    },
  },
};
</script>

<style scoped>
.search {
  width: 100%;
  position: relative;
}
.search__input {
  display: flex;
  height: 48px;
  background: #ffffff;
  border: 1px solid rgba(151, 151, 151, 0.5);
  border-radius: 5px;
  padding: 12px 16px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom: 1px solid rgba(151, 151, 151, 0.5);
}
.search__input-disabled {
  background: #bbb9b9;
}
.search__input input {
  width: 100%;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: calc(23 / 18 * 100%);
  color: #272727;
}
.search__not-result {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom: 1px solid rgba(151, 151, 151, 0.5);
}
.search__input:disabled {
  background: none;
}
.search__input input,
.search__input input:focus-visible {
  border: none !important;
  outline: none;
}
.search__icon {
  display: flex;
  align-items: center;
}
.icon__removed {
  margin-right: 5px;
}
.icon__removed img {
  width: 12px;
  height: 12px;
  cursor: pointer;
}

.search__result {
  border: 1px solid rgba(151, 151, 151, 0.5);
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  max-height: 150px;
  left: 0;
  right: 0;
  overflow: auto;
  position: absolute;
  z-index: 99999;
  background: #ffffff;
  box-sizing: border-box;
  padding: 0px 0px 12px 0px;
}
.search__result ul {
  list-style-type: none;
  margin: 0;
  padding-inline-start: 0px;
  font-weight: 400;
  font-size: 18px;
  line-height: calc(24 / 18 * 100%);
  color: #979797;
}
.search__result ul li {
  cursor: pointer;
}
.search__result ul li:hover {
  color: #272727;
}
.search__result-item {
  padding-left: 10px;
}

.icon__loader {
  width: 20px;
  height: 20px;
}

@media (max-width: 563px) {
  .search__input input {
    font-size: 14px;
  }
  .search__result ul {
    font-size: 14px;
  }
}
</style>
