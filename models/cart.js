// const { delete } = require("../Routes/viewRoutes");

module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;
    this.finalprice = oldCart.finalprice || 0;
    this.predis = oldCart.predis || 0;
    this.discount = oldCart.discount || 0;
    this.delivery = oldCart.delivery || 0;

    this.add = function (item, id) {
        var storedItem = this.items[id];
        if (!storedItem) {
            storedItem = this.items[id] = {
                item: item,
                qty: 0,
                price: 0,


            };
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        // storedItem.fakeprice = storedItem.item.maxprice * storedItem.qty
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
        this.predis += storedItem.item.maxprice;
        this.discount = this.predis - this.totalPrice;
        this.delivery = this.totalPrice > 5500 ? 0 : 200;
        this.finalprice = this.totalPrice + (this.totalPrice * 0.08) + this.delivery

        // this.fakeprice += storedItem.item.maxprice;


    };

    this.reduceByOne = function (id) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
        this.totalQty--;
        this.totalPrice -= this.items[id].item.price;
        this.delivery = this.totalPrice > 5500 ? 0 : 200;
        this.finalprice = this.totalPrice + (this.totalPrice * 0.08) + this.delivery
        this.predis -= this.items[id].item.maxprice;
        this.discount = this.predis - this.totalPrice;


        if (this.items[id].qty <= 0) {
            delete this.items[id];
        }

    };

    this.increaseByOne = function (id) {
        this.items[id].qty++;
        this.items[id].price += this.items[id].item.price;
        this.totalQty++;
        this.totalPrice += this.items[id].item.price;
        this.delivery = this.totalPrice > 5500 ? 0 : 200;
        this.finalprice = this.totalPrice + (this.totalPrice * 0.08) + this.delivery
        this.predis += this.items[id].item.maxprice;
        this.discount = this.predis - this.totalPrice;

    }

    this.removeItem = function (id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        this.predis -= (this.items[id].item.maxprice * this.items[id].qty);
        this.discount = this.predis - this.totalPrice;

        delete this.items[id];

    }

    this.generateArray = function () {
        let arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};