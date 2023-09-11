<script setup>
import { ref, reactive, onBeforeMount, onMounted, watch } from 'vue'
const prod = ref([])
const has_data = ref(false)
const page = ref('')
const product = reactive({ id: '', product: '', description: '', price: '', image_link: '' })
</script>
<template>
  <main>
    <h1>Add New Product</h1>
    <form @submit.prevent class="" enctype="multipart/form-data">
      <div class="">
        <br />
        <div class="mb-3">
          <label class=""></label>
          <div class="">
            <h3>Details</h3>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Product:</label>
          <div class="">
            <input type="hidden" name="id" id="id" required maxlength="20" v-model="product.id" />
            <input
              type="text"
              name="product"
              id="id_cid"
              required
              maxlength="20"
              v-model="product.product"
            />
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Description:</label>
          <div class="">
            <input
              type="text"
              name="description"
              id="id_name"
              required
              maxlength="100"
              v-model="product.description"
            />
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Price:</label>
          <div class="">
            <input
              type="number"
              name="price"
              id="id_price"
              required
              maxlength="100"
              v-model="product.price"
            />
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">Image Upload:</label>
          <div class="">
            <input type="hidden" name="image_link" v-model="product.image_link" />
            <input type="file" name="image" id="id_file" />
          </div>
        </div>
        <input type="hidden" name="category" value="{{ page }}" />
        <div class="mb-3">
          <label class=""></label>
          <div class=""></div>
        </div>
      </div>
    </form>
  </main>
</template>
<style scoped>
main {
  padding: 20px;
}
</style>
