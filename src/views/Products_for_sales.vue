<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'

  const route = useRoute()
  const localToken = ref('no_token')
  const list_of_products = ref([])
  const product_status = ref([])
  const count = ref(0)

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
  const checkProduct = (e, id, b) => {
            var chk = e.target.textContent;
            product_status[id] = 1;
            chk === "Add to Cart" ? count.value++ : count.value--;
            chk === "Add to Cart" ? Product_in_cart(id, "p") : Product_in_cart(id, "r") //p -> put in Cart and r -> remove from cart
            chk === "Add to Cart" ? product_status[id] = 1 : product_status[id] = 0;
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
          <div style="height: 60px; width: 100%; background-color: #EAEDED;">
            <span style="float: left; font-size: 28px; padding: 8px;"><strong>Available Products</strong></span>
            <a href="#" class="notification" style="float: right; padding: 8px;"
            data-toggle="modal" data-target="#myModal"
            >
                <span class="bi bi-cart-check Icn"></span>
                <span class="badge">{{ count }}</span>
            </a>
        </div>
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

  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content" style="width: 100%;">
        <div class="modal-header" style="width: 100%;">
          <h4 class="modal-title" style="float: left;"><strong>Products in Cart</strong></h4>
          <button type="button" class="close" data-dismiss="modal" style="float: right;">&times;</button>
        </div>
        <div id="prodInCart" class="modal-body">
          <table>
                <thead>
                    <tr>
                        <th>Product</th><th>Price</th><th>Qnty</th><th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(product_item_in_cart, index) in Products_in_Cart"
                        :key="id"
                        class="col"
                        style="border-bottom: 2px solid #BFC9CA; padding: 6px;">
                        <td>
                            {{ product_item_in_cart.product }}
                        </td>
                        <td>
                            {{ format_to_money_style(product_item_in_cart.price) }}
                        </td>
                        <td>
                            <input type='number'
                                style='width: 60px'
                                :disabled="purchase_status !== 'Order'"
                                v-model = "Qnty_of_Products_in_Cart[index]"
                                v-on:change="ChangeProductQnty(product_item_in_cart.id, index)"
                            />
                        </td>
                        <td>
                            <i @click="Product_in_cart(product_item_in_cart.id, 'r')" class="bi bi-x-octagon-fill" style="float: right; padding-left: 6px; color: #E74C3C;"></i>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <strong>Total</strong>
                        </td>
                        <td>
                        <strong>{{ total_price_to_pay }}</strong>
                        </td>
                        <td>

                        </td>
                    </tr>
                </tbody>
          </table>
        </div>
        <div class="modal-footer">
           <form action="/confirm_payment" method="POST" v-show="purchase_status === 'Purchase'">
               <input type="hidden" name="ids" v-model="Ids_of_Products_in_Cart" />
               <input type="hidden" name="totalprice" value="{{ total_price_to_pay }}" />
               <button type="submit" class="btn btn-danger">Purchase</button>
           </form>
          <button type="button" :class="purchase_status === 'Order' ? 'btn btn-success' : 'btn btn-danger'"
              @click="MarkAsOrdered()"  v-show="purchase_status !== 'Purchase'">Order</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>

    </div>
  </div>
<!--                                                 -->
</template>