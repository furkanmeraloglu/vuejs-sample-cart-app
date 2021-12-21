Vue.component('iphoneDetail', {
    template: `<div>
    <p class="card-text"> {{ description }}</p>
    <ul><li v-for="detail in details"> {{ detail }}</li></ul>
    </div>`,
    props: {
        iphone: {
            type: Object,
            required: true,
        }
    },
    computed: {
        description() {
            return this.iphone.description;
        },
        details() {
            return this.iphone.details;
        }
    }
});
Vue.component('product', {
    template:
        `<div class="container my-5">
        <div class="row d-flex justify-content-center align-items-center">
            <div class="card mb-3" style="max-width: 1000px; border: none;">
                <div class="row g-0">
                    <div class="col-md-4 p-3 d-flex align-items-center">
                        <img :src="image" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8 p-3">
                        <div class="card-body">
                            <h5 class="card-title">{{ product }}</h5>
                            <p v-if="stock > 10" class="btn btn-success my-2" style="pointer-events: none">In Stock
                            </p>
                            <p v-else-if="stock <= 10 && stock > 0"
                               class="btn btn-warning my-2" style="pointer-events: none">
                                {{ stock + ' ' + product + ' left.'}}
                            </p>
                            <p v-else class="btn btn-danger" style="pointer-events: none">Out of Stock</p><br>
                            <p class="btn btn-outline-secondary" style="pointer-events: none">Shipping Cost: {{ shipping }}</p>
                            <iphoneDetail :iphone="iphone"></iphoneDetail>
                            <div>
                                <button @click="updateProduct(index)" v-for="(variant, index) in variants"
                                        :key="variant.variantId" type="button"
                                        class="btn btn-sm m-1 my-3 color-box"
                                        :style="{ backgroundColor: variant.variantColor }">
                                    {{ variant.variantColor }}
                                </button>
                            </div>
                            <br>
                            <button  @click="addToCart" type="submit"
                                    :disabled="!inStock"
                                    class="btn btn-outline-success m-1"> Add to Cart
                            </button>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        iphone: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            product: 'iPhone 11',
            selectedVariant: 0,
            variants: [
                {
                    variantId: 2233,
                    variantColor: "Black",
                    variantImage: "source/images/iphone/black-iphone.jpeg",
                    variantQuantity: 25,
                },
                {
                    variantId: 2234,
                    variantColor: "Green",
                    variantImage: "source/images/iphone/green-iphone.jpeg",
                    variantQuantity: 10,
                },
                {
                    variantId: 2235,
                    variantColor: "Purple",
                    variantImage: "source/images/iphone/purple-iphone.jpeg",
                    variantQuantity: 3,
                },
                {
                    variantId: 2236,
                    variantColor: "Red",
                    variantImage: "source/images/iphone/red-iphone.jpeg",
                    variantQuantity: 13,
                },
                {
                    variantId: 2237,
                    variantColor: "White",
                    variantImage: "source/images/iphone/white-iphone.jpeg",
                    variantQuantity: 40,
                },
                {
                    variantId: 2238,
                    variantColor: "Yellow",
                    variantImage: "source/images/iphone/yellow-iphone.jpeg",
                    variantQuantity: 15,
                },
            ],
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
            this.variants[this.selectedVariant].variantQuantity--;
        },
        updateProduct(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        stock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        inStock() {
            return (this.variants[this.selectedVariant].variantQuantity > 0);
        },
        shipping() {
            return this.premium === true ? 'Free' : '$2.99'
        }
    },
});

var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: [],
        iphone: {
            description: "The iPhone is a line of touchscreen-based smartphones designed and marketed by Apple Inc. that use Apple's iOS mobile operating system",
            details: ["12MB Camera", "11 Hours Battery Life", "128 GB Storage", "6.1 Inch Screen"],
        },
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        }
    }
});