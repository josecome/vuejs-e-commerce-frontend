<script setup>
import TheWelcome from '../components/TheWelcome.vue'
</script>

<template>
  <main>
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
             <a href="" >
                <img src="{{ '/images/products/' + product_item.image_link }}"
                     title="{{ product_item.product }}"
                     style="width: 100%; height: 100%;"
                />
            </a>
            </text>
            <div class="card-body" style='background-color: #D4E6F1;'>
              <p class="card-text">{{ product_item.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button"  @click="checkProduct($event, product_item.id, product_item.product)"
                        class="btn btn-sm btn-outline-secondary"
                        style="color: white;"
                        :class="{{ product_status[product_item.id] === 1 ? 'addToChrt' : 'rmvToChrt' }}"
                    >
                        {{ product_status[product_item.id] !== null && product_status[product_item.id] === 1 ? 'Remove from Chart' : 'Add to Chart' }}
                   </button>
                  <label class="btn btn-sm btn-outline-secondary">${{ product_item.price }}</label>
                </div>
                <div v-if="product_status[product_item.id] === 1" class="bi bi-cart-check Icn" style="color: #239B56;"></div>
              </div>
            </div>
            </div>
          </div>  
  </main>
</template>
