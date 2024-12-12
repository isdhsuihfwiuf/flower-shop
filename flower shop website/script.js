let cart = []; // 购物车数据

// 添加商品到购物车
function addToCart(button) {
    const name = button.dataset.name; // 商品名称
    const price = parseFloat(button.dataset.price); // 商品价格
    
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++; // 商品已存在，增加数量
    } else {
        cart.push({ name, price, quantity: 1 }); // 新商品加入购物车
    }
    updateCart(); // 更新购物车显示
}

// 更新购物车显示
function updateCart() {
    const cartList = document.getElementById('cart-list');
    const totalPrice = document.getElementById('total-price');

    cartList.innerHTML = ''; // 清空购物车列表
    let total = 0;

    // 遍历购物车内所有商品，添加至购物车列表
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} - ￥${item.price} x ${item.quantity}
            <button class="quantity-btn" onclick="updateQuantity('${item.name}', 'increase')">+</button>
            <button class="quantity-btn" onclick="updateQuantity('${item.name}', 'decrease')">-</button>
            <button class="quantity-btn" onclick="removeFromCart('${item.name}')">删除</button>
        `;
        cartList.appendChild(listItem);
        total += item.price * item.quantity; // 计算总价
    });

    // 更新总价显示
    totalPrice.textContent = `总价：￥${total.toFixed(2)}`; // 保留两位小数
}

// 更新商品数量
function updateQuantity(name, action) {
    const item = cart.find(item => item.name === name);
    if (item) {
        if (action === 'increase') {
            item.quantity++;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity--;
        }
    }
    updateCart(); // 更新购物车显示
}

// 删除商品
function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name); // 删除商品
    updateCart(); // 更新购物车显示
}

// 结算
function checkout() {
    if (cart.length === 0) {
        alert('购物车为空！');
        return;
    }
    alert(`结算成功！总价：￥${calculateTotal().toFixed(2)}`);
    cart = []; // 清空购物车
    updateCart(); // 更新购物车显示
}

// 计算总价
function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// 监听 DOMContentLoaded 事件确保脚本加载完后执行
document.addEventListener('DOMContentLoaded', () => {
    // 确保“加入购物车”按钮的事件绑定
    const addToCartButtons = document.querySelectorAll('.cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const name = e.target.dataset.name; // 商品名称
            const price = parseFloat(e.target.dataset.price); // 商品价格
            addToCart(e.target); // 调用添加到购物车函数
        });
    });
});
