<script setup>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  const localToken = ref('no_token')
  const categories = ref([])
  const link = ref('http://127.0.0.1:8000/api/')
  
  const getData = async () => {
    const v = { "categories": "all" }
    const res = await axios.get(link.value, v,
      {
        headers: {
            Accept: 'application/json',
            //'Content-Type': 'application/json',
            Authorization: `Bearer ${ localToken.value }`
        }
      }
      
      );
      categories.value = res.data;
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
  <main>
    <div class="album py-5 bg-light">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <div v-for="category in categories" :key="id" class="col">
          <div class="col">
          <div class="card shadow-sm">
             <text x="80%" y="80%" fill="#eceeef" dy=".3em">
                <a :href="'http://127.0.0.1:5173/products_for_sale/' + category.category">
                    <img :src="'http://127.0.0.1:8000/storage/images/prod_categories/' + category.category + '.jpg'"
                        :alt="category.category"
                        :title="category.category"
                    />
                </a>
            </text>
            <div class="card-body">
              <p class="card-text">{{ category.description }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                <i class="bi bi-pencil-square" style="padding-right: 16px;" data-toggle="modal" data-target="#exampleModal"
                    onClick="setDataInForm()"  title="Update Category Information"></i>
                <a href="{{ '/product/' + category.category }}" class="bi bi-gear" style="color: gray" title="Manage the list of Products"></a>
                  <!--<button type="button" class="btn btn-sm btn-outline-secondary">kk</button>
                  <button type="button" class="btn btn-sm btn-outline-secondary">qq</button>-->
                </div>
                <small class="text-muted">_</small>
              </div>
            </div>
          </div>
        </div>
        </div>  
      </div>
      </div>  
    </div>      

  <button type="button" class="btn btn-primary">
    Add New Category
  </button>

  </main>
</template>
