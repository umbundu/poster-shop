new Vue({
    el: "#app",
    data: {
        total: 0,
       
        products: [],
        cart: [],
        search: "",
        lastSearch: "",
        loading: false
    },
    methods: {
        addToCart: function (product) {
            this.total += product.price;
            var found = false;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === product.id) {
                    found = true;
                    this.cart[i].qty++;              
                }
            } 
            if (!found) {
                this.cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    qty: 1
                });
            } 
        },
        inc: function(item) {
            item.qty++;
           this.total += item.price;
        },
        dec: function(item) {
            item.qty--;
            this.total -= item.price;
            if (item.qty <= 0) {
                // index of current item in cart array
                var i = this.cart.indexOf(item);
                // remove item from array
                this.cart.splice(i, 1);
            }
        },
        onSubmit: function() {
            this.products = [];
            this.loading = true;
            var path="/search?q=".concat(this.search);
            this.$http.get(path)
                .then(function(response) {
                    //setTimeout(function() {
                        this.lastSearch = this.search;
                        this.products = response.body;  
                        this.loading = false;   
                    //}.bind(this), 1000);                                 
                });
        }
    },
    filters: {
        currency: function(price) {
            return "$".concat(price.toFixed(2));
        }
    }
});

