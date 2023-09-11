<script setup>
const category = ref('');
const products = ref([]);
</script>
<template>
        <main>
        <a :href="'/product_form?pg=' + category.value" style="float: left; padding-right: 4px;">
            <button type="button" class="btn btn-link">Add new</button>
        </a>
        <table class="table table-striped">
            <thead class="">
                <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>User ID</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <div v-for='product in products' :key='product.id' >
                    <tr>
                        <td>{{ product.id }}</td>
                        <td>{{ product.product }}</td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.description }}</td>
                        <td>{{ product.category }}</td>
                        <td>{{ product.user_id }}</td>
                        <td><img :src="'/storage/images/products/' + product.image_link"
                                style="width: 60px; height: 40px;" /></td>
                        <td>
                            <a href="/product_form?t=edit&id={{ product.id }}&pg={{ category }}"
                                style="float: left; padding-right: 4px;">
                                <button type="button" class="btn btn-primary">Edit</button>
                            </a>
                            <form action="/delete/">
                                <button type="submit" class="btn btn-danger">Delete</button>
                            </form>
                        </td>
                    </tr>
                </div>
            </tbody>
        </table>
    </main>
</template>