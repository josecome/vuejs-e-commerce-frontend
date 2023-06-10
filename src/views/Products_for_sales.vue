<script setup>
  import { ref, onBeforeMount, onMounted, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  import Modal from "@/components/Cart.vue";

  const route = useRoute()
  let product_type = route.params.category

  const localToken = ref('no_token')
  const list_of_products = ref([])
  const product_status = ref([])
  const Products_in_Cart = ref([])
  const count = ref(0)
  const Ids_of_Products_in_Cart = ref([])
  const Qnty_of_Products_in_Cart = ref([])
  const purchase_status = ref('Order')
  const total_price_to_pay = ref(0)
  const category_options = ref([])
  const selected_category = ref('' + product_type)
  
  const link = ref(`http://127.0.0.1:8000/api/products_for_sale/${ product_type }`)
  console.log(link.value)
  const getData = async () => {
    const v = { "products": "all" }
    localToken.value = localStorage.getItem('token')
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
  let cartModal= ref(null);

  function showCart() {
    cartModal.value.show();
  }
  function hideCart() {
    cartModal.value.hide();
  }
  const updateCart = () => {
    /*count.value = Products_in_Cart.value.length
    Ids_of_Products_in_Cart.value = list_of_products.value.map((ids_column) => { return ids_column.id })
    Qnty_of_Products_in_Cart.value = list_of_products.value.map((qnty_column) => { return qnty_column.qnty })
    console.log('Qnty: ' + Qnty_of_Products_in_Cart)*/
  }
  const checkProduct = (e, id, b) => {
    var chk = e.target.textContent;
    product_status[id] = 1;
    chk === "Add to Cart" ? count.value++ : count.value--;
    chk === "Add to Cart" ? Product_in_cart(id, "p") : Product_in_cart(id, "r") //p -> put in Cart and r -> remove from cart
    chk === "Add to Cart" ? product_status[id] = 1 : product_status[id] = 0;
  }
  const Product_in_cart = async (id, v) => {
    var rs_response = "";
    if(v === "p"){
      await axios.post('/add_product_in_cart', {//put data
        id: id
      })
      .then((response) => {
      rs_response = response.data
        console.log("rs: " + rs_response)
      }, (error) => {
                    rs_response = error;
      });
    } else if(v === "r") {
      await axios.delete(`/delete_item_in_cart/${ id }`)
      .then((response) => {
        rs_response = response.data
      }, (error) => {
        rs_response = error;
      });
        console.log('rs: ' + rs_response)
    }
    Products_in_Cart.value = rs_response
    updateCart();
  }
  const ChangeProductQnty = async ( id, v) => {
    await axios.patch(`/cartupdate/${ id }`, {
      qnty: Qnty_of_Products_in_Cart[v]
    })
    .then((response) => {
      rs_response = response.data
      Products_in_Cart.value = rs_response
      updateCart();
    }, (error) => {
      rs_response = error;
    });
    console.log(rs_response)
  }
  const MarkAsOrdered = () => {
    purchase_status.value = 'Purchase'
  }
  const format_to_money_style = (v) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return formatter.format(v);
  }
  async function callOtherCategory() {
    if (confirm(`Show ${ selected_category.value } products`) == true) {
      try {
        const rs = await axios.get(`/products_for_sale_list/${ this.selected_category }`)
        list_of_products.value = rs.data
      } catch(err) {
        console.log(err)
      }
    }
  }
  const getDataInCart = async () => {
    console.log('Get Product in Cart' + localToken.value)
    const v = { "products": "all" }
    const res = await axios.get('http://127.0.0.1:8000/api/productincart/1', v,
      {
        headers: {
          Accept: 'application/json',
            //'Content-Type': 'application/json',
          Authorization: `Bearer ${ localToken.value }`
        }
      }      
      );     
      console.log('Get Product in Cart: ' + res.data)
      Products_in_Cart.value = res.data;
      updateCart();
      
      //Later this code will be removed from here
      const rs = await axios.get('http://127.0.0.1:8000/api/', v,
      {
        headers: {
          Accept: 'application/json',
            //'Content-Type': 'application/json',
          Authorization: `Bearer ${ localToken.value }`
        }
      }         
      ) //get data
      console.log('z')
      console.log(rs.data)
      category_options.value = rs.data.map((ctgry) => ctgry.category);
  };
  watch(selected_category, (val, oldval) => {
        callOtherCategory();
  });    
  onBeforeMount(
    getData
  );
  onMounted(
    getDataInCart
  );

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
            <span style="float: left; font-size: 28px; padding: 8px;"><strong>
                Available Products
                <select v-model="selected_category">
                    <option disabled value="">Other category</option>
                    <option v-for="category in category_options" :value="category">
                        {{ category }}
                    </option>
                </select>
            </strong></span>
            <a href="#" class="notification" style="float: right; padding: 8px;"
            @click="showCart"
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
  <Modal title="Products in Cart" ref="cartModal">
    <template #body>
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
    </template>
    <template #footer>
      <form action="/confirm_payment" method="POST" v-show="purchase_status === 'Purchase'">
        <input type="hidden" name="ids" v-model="Ids_of_Products_in_Cart" />
        <input type="hidden" name="totalprice" value="{{ total_price_to_pay }}" />
        <button type="submit" class="btn btn-danger">Purchase</button>
      </form>
      <button type="button" :class="purchase_status === 'Order' ? 'btn btn-success' : 'btn btn-danger'"
        @click="MarkAsOrdered()"  v-show="purchase_status !== 'Purchase'">Order</button>
      <button type="button" class="btn btn-default" @click="hideCart">Close</button>
    </template>
</Modal>
<!--                                                 -->
</template>