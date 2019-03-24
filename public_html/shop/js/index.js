class Index {
    constructor(source, container) {
        this.source = source;
        this.container = container;
        this.items = []; // массив для товаров на странице
        this.cartItems = []; // массив для товаров добавляемых в корзину
        this.totalPrice = 0; // итоговая стоимость всех товаров в корзине
        this.cartCount = 0; // счётчик кол-ва товаров в корзине
        this._init();
    }

    _init() {
        fetch(this.source)
            .then(result => result.json())
            .then(data => {
                for (let product of data) {
                    this.items.push(product);
                    this._renderItem(product);
                }
            })
    }

    _renderItem(product) { //показываем товары на странице
        let $container = $('<div/>', {
            class: 'item-product',
            'data-product': product.id
        });
        $container.appendTo($(this.container));
        let $link = $('<a/>', {
            class: 'product',
            href: 'single-page.html'
        });
        let $parrentAdd = $('<div/>', {
            class: 'parrent-addtocart'
        });
        let $add = $('<a/>', {
            class: 'add',
            text: 'Add To Cart',
            href: "shopping-cart.html",
            'data-id': product.id
        });
        let $priceRaiting = $('<div/>', {
            class: 'price-rating-container'
        });
        let $itemRating = $('<div/>', {
            class: 'item-rating',
        });
        $link.appendTo($container);
        $link.append(`<img src="${product.src}" alt="product image">`);
        $link.append(`<p class="mango-people-text">${product.text}</p>`);
        $link.append($priceRaiting);
        $priceRaiting.append(`<p class="mango-people-price">$${product.price}</p>`);
        $priceRaiting.append($itemRating);
        this._renderItemRating(product.rating, $itemRating);
        $parrentAdd.appendTo($container);
        $add.appendTo($parrentAdd);
        $add.click(e => {
            e.preventDefault();
            this._addToCart(product.id);
        })
    }

    _addToCart(id) { // добавляем товар в корзину
        let find = this.items.find(product => product.id === id);
        this._addToCollection(find.id);
        if (this.cartItems.find(product => product.id === id).quantity === 1) {
            this._renderCart(find);
        } else {
            this._updateCart(find);
        }
        this.totalPrice += +find.price;
        this.cartCount++;
        this._renderTotalPrice();
        this._updateCartCount();
    }

    _getItemRating(rating) { // получаем рейтинг товара (звёздочки)
        let semiStar = rating.split('.')[1];
        if (semiStar !== undefined) {
            semiStar = 1;
        } else {
            semiStar = 0;
        }
        rating = parseInt(rating);
        let stars = {
            fullStars: rating,
            semiStar: semiStar,
            emptyStars: 5 - rating - semiStar
        };
        return stars;
    }

    _renderItemRating(rating, container){ // отображаем рейтинг товара (звёздочки)
        let stars = this._getItemRating(rating);
        for (let i = 0; i < stars.fullStars; i++) {
            container.append(`<img class="${'rating-star'}" src="img/stars/star-solid.svg">`);
        }
        if (stars.semiStar === 1) {
            container.append(`<img class="${'rating-star'}" src="img/stars/star-half-alt-solid.svg">`);
        }
        for (let i = 0; i < stars.emptyStars; i++) {
            container.append(`<img class="${'rating-star'}" src="img/stars/star-regular.svg">`);
        }
    }

    _addToCollection(id) { // добавляем товар в новый массив (массив для корзины)
        let find = this.items.find(product => product.id === id);
        let addedProduct = find;
        if (addedProduct.hasOwnProperty('quantity')) {
            this.cartItems[this.cartItems.indexOf(addedProduct)].quantity++;
        } else {
            addedProduct['quantity'] = 1;
            this.cartItems.push(addedProduct);
        }
    }

    _renderCart(item) { // показываем товар в корзине
        let $container = $('<div/>', {
            class: 'drop-cart-block',
            'data-id': item.id
        });
        $container.appendTo('.drop-items');
        $container.append(`<img class="cart-mini-img" src='${item.src}' alt="product ${item.id}">`);
        let $cartItemInfo = $('<div/>', {
            class: 'cart-item-info'
        });
        $cartItemInfo.appendTo($container);
        let $reboxZane = $('<p/>', {
            class: 'rebox-zane',
            text: 'rebox zane'
        });
        $reboxZane.appendTo($cartItemInfo);
        let $ratingItem = $('<div/>', {
            class: 'rating-item'
        });
        $ratingItem.appendTo($cartItemInfo);
        this._renderItemRating(item.rating, $ratingItem);
        let $cartItemPrice = $('<p/>', {
            class: 'cart-item-price',
            text: `${this.cartItems.find(product => product.id === item.id).quantity} x $${item.price}`
        });
        $cartItemPrice.appendTo($cartItemInfo);
        let $delBtnBlock = $('<div class="delBtn-block"></div>');
        $delBtnBlock.appendTo($container);
        let $delBtn = $(`<button class="delBtn fa fa-times-circle"></button>`);
        $delBtn.appendTo($delBtnBlock);
        $delBtn.click(() => {
            this._remove(item.id);
        })
    }

    _updateCart(item) { // обнавляем информацию в корзине (кол-во и цены)
        let $container = $(`div[data-id="${item.id}"]`);
        $container.find('.cart-item-price')
            .text(`${this.cartItems.find(product => product.id === item.id).quantity} x $${item.price}`);
    }

    _remove(id) { // удаляем товар из корзины
        let find = this.cartItems.find(product => product.id === id);
        if(find.quantity > 1){
            find.quantity--;
            this._updateCart(find);
        } else {
            this.cartItems.splice(this.cartItems.indexOf(find), 1);
            delete find.quantity;
            $(`div[data-id="${id}"]`).remove();
        }
        this.totalPrice -= +find.price;
        this.cartCount--;
        this._renderTotalPrice();
        this._updateCartCount();
    }

    _renderTotalPrice(){ // показываем итоговую стоимость
        $('.cart-total-price').text(`$${this.totalPrice}`);
    }

    _updateCartCount(){ // обновляем счётчик товаров в корзине
        $('.cart-count').text(`${this.cartCount}`);
    }
}