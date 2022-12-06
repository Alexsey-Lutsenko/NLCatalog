<template>
  <button href="#" class="app__button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "AppButtonSubmit",
};
</script>

<style scoped>
.app__button {
  padding: 14px 25px;
  font-size: 16px;
  line-height: calc(21 / 16 * 100%);
  letter-spacing: 1.75px;
  text-transform: uppercase;
  border-radius: 24px;
  background: linear-gradient(270deg, #ffa800 0%, #ff6f00 100%);
  color: #ffffff;
  cursor: pointer;
}
.app__button:disabled,
.app__button[disabled] {
  cursor: default;
  color: #acacac;
  background: #ffffff;
  box-shadow: 0px 2px 10px rgba(151, 151, 151, 0.2);
}

@media (max-width: 563px) {
  .app__button {
    font-size: 10px;
    padding: 14px 5px;
  }
}
</style>
