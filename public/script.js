
var LOAD_NUM = 4;
var watcher;

//setTimeout(function () {

    new Vue({
        el: "#app",
        data: {
            total: 0,

            products: [],
            cart: [],
            search: "cat",
            lastSearch: "",
            loading: false,
            results: []
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
            inc: function (item) {
                item.qty++;
                this.total += item.price;
            },
            dec: function (item) {
                item.qty--;
                this.total -= item.price;
                if (item.qty <= 0) {
                    // index of current item in cart array
                    var i = this.cart.indexOf(item);
                    // remove item from array
                    this.cart.splice(i, 1);
                }
            },
            onSubmit: function () {
                this.products = [];
                this.results = [];
                this.loading = true;
                var path = "/search?q=".concat(this.search);
                this.$http
                    .get(path)
                    .then(function (response) {
                        //setTimeout(function() {
                        this.lastSearch = this.search;
                        this.results = response.body;
                        this.appendResults();
                        this.loading = false;
                        //}.bind(this), 1000);  // need to use bind to access Vue this context to work                            
                    });
            },
            appendResults: function () {
                if (this.products.length < this.results.length) {
                    var toAppend = this.results.slice(this.products.length, this.products.length + LOAD_NUM);
                    this.products = this.products.concat(toAppend);
                }
            }
        },
        filters: {
            currency: function (price) {
                return "$".concat(price.toFixed(2));
            }
        },
        created: function () {
            this.onSubmit();
        },
        updated: function () {

            var elem = document.querySelector("#product-list-bottom");
            watcher = scrollMonitor.create(elem);
            watcher.enterViewport(this.appendResults);

        },
        beforeUpdate: function () {
            if (watcher) {
                watcher.destroy();
                watcher = null;
            }
        }

    });
//}, 3000);



