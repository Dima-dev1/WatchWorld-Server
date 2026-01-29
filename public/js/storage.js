const storage = {
    CART_KEY: "WatchCart",
    FAV_KEY: "WatchFav",
    getCart() {
        const cart = localStorage.getItem(this.CART_KEY)
        return cart ? JSON.parse(cart) : []
    },
    addToCart(product) {
        const cart = this.getCart()
        const exisitingIndex = cart.findIndex((item) => item.id === product.id)
        if (exisitingIndex > -1) {
            cart[exisitingIndex].quantity += 1
        } else {
            cart.push({...product,quantity:1})
        }
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart))
        return cart
    },
    removeFromCart(productId) {
        let cart = this.getCart()
        cart = cart.filter((item) => item.id !== productId)
        localStorage.setItem(this.CART_KEY, JSON.stringify(cart))
        return cart
    },
    clearCart() {
        localStorage.removeItem(this.CART_KEY)
    },
    getCartTotal() {
        const cart = this.getCart()
        return cart.reduce((total,item) => {
            return total + (item.price * item.quantity)
        },0)
    },
    getCartCount() {
        const cart = this.getCart()
        return cart.reduce((count,item) => {
            return count + item.quantity
        },0)
    },
    updateCartQuantity(productId,quantity) {
        const cart = this.getCart()
        const item = cart.find((item) => item.id === productId)
        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId)
            }
            item.quantity = quantity
            localStorage.setItem(this.CART_KEY, JSON.stringify(cart))
        }
        return cart
    },
    getFav() {
        const fav = localStorage.getItem(this.FAV_KEY)
        return fav ? JSON.parse(fav) : []
    },
    addToFav(product) {
        const fav = this.getFav()
        const exisitingIndex = fav.findIndex((item) => item.id === product.id)
        if (exisitingIndex > -1) {
            fav[exisitingIndex].quantity += 1
        } else {
            fav.push({...product,quantity:1})
        }
        localStorage.setItem(this.FAV_KEY, JSON.stringify(fav))
        return fav
    },
    removeFromFav(productId) {
        let fav = this.getFav()
        fav = fav.filter((item) => item.id !== productId)
        localStorage.setItem(this.FAV_KEY, JSON.stringify(fav))
        return fav
    },
    clearFav() {
        localStorage.removeItem(this.FAV_KEY)
    },
    getFavTotal() {
        const fav = this.getFav()
        return fav.reduce((total,item) => {
            return total + (item.price * item.quantity)
        },0)
    },
    getFavCount() {
        const fav = this.getFav()
        return fav.reduce((count,item) => {
            return count + item.quantity
        },0)
    },
    updateFavQuanitity(productId,quantity) {
        const fav = this.getFav()
        const item = fav.find((item) => item.id === productId)
        if (item) {
            if (quantity <= 0) {
                this.removeFromFav(productId)
            }
            item.quantity = quantity
            localStorage.setItem(this.FAV_KEY, JSON.stringify(fav))
        }
        return fav
    }
}