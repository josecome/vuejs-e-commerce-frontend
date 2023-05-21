<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'

  const route = useRoute()
  const localToken = ref('no_token')
  const list_of_products = ref([])
  const product_status = ref([])
  let product_type = route.params.category
  const link = ref(`http://127.0.0.1:8000/api/products_for_sale/${ product_type }`)
  console.log(link.value)
  const getData = async () => {
    const v = { "products": "all" }
    const res = await axios.get(link.value, v,
      {
        headers: {
            Accept: 'application/json',
            //'Content-Type': 'application/json',
            Authorization: `Bearer ${ localToken.value }`
        }
      }
      
      );
      list_of_products.value = res.data;
      console.log(res);
  }
  const setDataInForm = () => {
    console.log('test')
  }
  onMounted(getData);

</script>
<style>
  @import "bootstrap/dist/css/bootstrap.css";
  @import "bootstrap-icons/font/bootstrap-icons.css";
</style>
<template>
  <div class="album py-5 bg-light">
    <div class="container">
        <div id="app" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div v-for="product_item in list_of_products" :key="id" class="col">
                <div class="card shadow-sm">
                <text x="80%" y="80%" fill="#eceeef" dy=".3em">
                   <img :src="'http://127.0.0.1:8000/storage/images/products/' + product_item.image_link"
                   :title="product_item.product"
                   style="width: 100%; height: 100%;"
                />
                </text>
                <div class="card-body" style='background-color: #D4E6F1;'>
                    <p class="card-text">{{ product_item.description }}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button"  @click="checkProduct($event, product_item.id, product_item.product)"
                                class="btn btn-sm btn-outline-secondary"
                                style="color: white;"
                                :class="product_status[product_item.id] === 1 ? 'addToChrt' : 'rmvToChrt'"
                            >
                               {{ product_status[product_item.id] !== null && product_status[product_item.id] === 1 ? 'Remove from Cart' : 'Add to Cart' }}
                            </button>
                            <label class="btn btn-sm btn-outline-secondary">{{ '$' + product_item.price  }}</label>
                        </div>
                    <div v-if="product_status[product_item.id] === 1" class="bi bi-cart-check Icn" style="color: #239B56;"></div>
                </div>
            </div>
            </div>
        </div>   
  </div>
</div>   
  </div>
</template>