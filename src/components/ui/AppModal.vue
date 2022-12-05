<template>
  <teleport to="body">
    <Transition name="modal">
      <div class="modal">
        <div v-if="show" class="modal__mask">
          <div class="modal__wrapper" @click.prevent="exit">
            <div class="modal__container" @click.stop>
              <div class="modal__exit">
                <img src="../../assets/xmark.png" alt="xmark" @click.prevent="$emit('exit')" />
              </div>
              <div class="modal__header">
                <slot name="modalHeader"></slot>
              </div>

              <div class="modal__body">
                <slot name="modalBody"></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </teleport>
</template>

<script>
export default {
  name: "AppModal",
  emits: ["exit"],
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    disabledBtnSubmit: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      disabledSubmit: this.disabledBtnSubmit,
    };
  },

  methods: {
    exit() {
      this.$emit("exit");
    },
  },

  watch: {
    disabledBtnSubmit(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.disabledSubmit = this.disabledBtnSubmit;
      }
    },
  },
};
</script>

<style scoped>
.modal__mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 100%;
  background-color: rgba(53, 54, 71, 0.8);
  display: flex;
  transition: opacity 0.3s ease;
  overflow: auto;
}
.modal__wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: start;
}
.modal__container {
  width: 769px;
  margin: 30vh 15px;
  padding: 32px 18px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 10px;
  transition: all 0.3s ease;
}
.modal__exit {
  display: flex;
  justify-content: end;
  margin-top: -14px;
}
.modal__exit img {
  cursor: pointer;
}
.modal__header {
  font-size: 20px;
  line-height: calc(24 / 20 * 100%);
}
.modal__body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.indent-left {
  margin-left: 5px;
}

.modal-enter-from .modal__container,
.modal-leave-to .modal__container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
