new Vue({
    el: "#app",
    data: {
        total: 0,
        seen: false,
        url: "https://www.google.com",
        products: [
            {title: "Product 1", id: 1, price: 10.00 },
            {title: "Product 2", id: 2, price: 5.00  },
            {title: "Product 3", id: 3, price: 20.00 }
        ],
        cart: []
    },
    methods:
    {
        addToCart: function(product) {            
            this.total += product.price;
            console.log(product);
        }
    }
});

