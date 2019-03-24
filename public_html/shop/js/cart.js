class Cart {
    constructor(source, container) {
        this.source = source;
        this.container = container;
        this.cartItems = [];
        this.amount = 0;
        this._init();
    }

    _init() {
        this._renderCartHeader();
        this._render();
        fetch(this.source)
            .then(result => result.json())
            .then(data => {
                for (let product of data.contents) {
                    this.cartItems.push(product);
                    this._renderItem(product);
                    this.amount += +product.price * product.quantity;
                    this._renderSum();
                }
            })
    }

    _render() {
        let $clearBtn = $('.clear-button');
        $clearBtn.click(() => {
            this._clearCart();
            this.amount = 0;
            this._renderSum();
        });
    }

    _renderCartHeader() {
        let $cartHeader = $('<div/>', {
            class: 'cart-info-header'
        });
        $cartHeader.appendTo($(this.container));
        $cartHeader.append($('<h3 class="product-details">product details</h3>'));
        $cartHeader.append($('<h3 class="cart-info-headers">UNITE PRICE</h3>'));
        $cartHeader.append($('<h3 class="cart-info-headers">QUANTITY</h3>'));
        $cartHeader.append($('<h3 class="cart-info-headers">SHIPPING</h3>'));
        $cartHeader.append($('<h3 class="cart-info-headers">SUBTOTAL</h3>'));
        $cartHeader.append($('<h3 class="cart-info-headers">ACTION</h3>'));
    }

    _renderItem(product) {
        let $container = $('<div/>', {
            class: 'product-line',
            'data-product': product.id,
        });
        let $productImg = $(`<div/>`, {
            class: 'product-img'
        });
        let $img = $('<img/>', {
            class: 'product-img-size',
            'src': product.src
        });
        let $productImgInfo = $('<div/>', {
            class: 'product-img-info'
        });
        let $productImgText = $('<p/>', {
            class: 'product-img-text',
            text: 'MANGO PEOPLE T-SHIRT'
        });
        let $colorSize = $('<div/>', {
            class: 'color-size'
        });
        $container.appendTo($(this.container));
        $productImg.appendTo($($container));
        $img.appendTo($($productImg));
        $productImgInfo.appendTo($($productImg));
        $productImgText.appendTo($($productImgInfo));
        $colorSize.appendTo($($productImgInfo));
        $colorSize.append($(`<p class="color-size-text">Color: <span class="cst-value">${product.color}</span></p>`));
        $colorSize.append($('<p class="color-size-text">Size: <span class="cst-value">XII</span></p>'));
        $container.append($(`<div class="unite-style">$${product.price}</div>`));
        $container.append($(`<div class="unite-style"><input type="number" class="unite-quantity" value="${product.quantity}"></div>`));
        $container.append($(`<div class="unite-style">${product.shipping}</div>`));
        $container.append($(`<div class="unite-style subtotal-price">$${product.price * product.quantity}</div>`));
        let $delBtn = $(`<button class="delBtn fa fa-times-circle"></button>`);
        $delBtn.click(() => {
            this._remove(product.id)
        });
        $container.append($(`<div class="unite-style"></div>`).append($($delBtn)));
    }

    _updateCart(product) {
        let $container = $(`div[data-product="${product.id}"]`);
        $container.find(`.unite-quantity`).attr('value', `${product.quantity}`);
        $container.find(`.subtotal-price`).text(`$${product.price * product.quantity}`);
    }

    _remove(id) {
        let find = this.cartItems.find(product => product.id === id);
        if (find.quantity > 1) {
            find.quantity--;
            this._updateCart(find);
        } else {
            this.cartItems.splice(this.cartItems.indexOf(find), 1);
            $(`div[data-product="${id}"]`).remove();
        }
        if (this.cartItems.length === 0) {
            $(`div[class="cart-info-header"]`).remove();
        }
        this.amount -= find.price;
        this._renderSum();
    }

    _renderSum() {
        $('.subtotal-text').text(`SUB TOTAL   $${this.amount}`);
        $('.grand-total-price').text(`$${this.amount}`);
    }

    _clearCart() {
        while (this.cartItems.length > 0) {
            this.cartItems.pop();
        }
        $(this.container).empty();
    }
}