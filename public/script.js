new Vue({
    el: "#app",
    data: {
        total: 0,
       
        products: [
            {title: "Product 1", id: 1, price: 10.00 },
            {title: "Product 2", id: 2, price: 5.00  },
            {title: "Product 3", id: 3, price: 20.00 },
            {title: "Product 4", id: 4, price: 40.00 }
        ],
        cart: []
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
            console.log("onSubmit called");
        }
    },
    filters: {
        currency: function(price) {
            return "$".concat(price.toFixed(2));
        }
    }
});

