<script setup>
import { onMounted, ref } from "vue";
import { Modal } from "bootstrap";
defineProps({
  title: {
    type: String,
    default: "<<Title goes here>>",
  },
  addedToCart: {
    type: Boolean,
    default: false,
  }
});
let modalEle = ref(null);
let thisModalObj = null;

onMounted(() => {
  thisModalObj = new Modal(modalEle.value);
});
function _show() {
  thisModalObj.show();
}
function _hide() {
  thisModalObj.hide();
}
defineExpose({ show: _show, hide: _hide });
</script>

<template>
  <div class="modal fade" id="prodModal" tabindex="-1" aria-labelledby=""
    aria-hidden="true" ref="modalEle">
    <div class="modal-dialog">
      <div class="modal-content" style="width: 700px;">
        <div class="modal-header">
          <h5 class="modal-title" id="prodModalLabel"><i v-show="addedToCart" class='bi bi-check-circle'></i>{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot name="body" />
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>

        </div>
      </div>
    </div>
  </div>
</template>