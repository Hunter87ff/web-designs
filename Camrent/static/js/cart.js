function sel(class_id){return document.querySelector(class_id);}
function selAll(class_id){return document.querySelectorAll(class_id);}
function addClass(class_id, class_name){return class_id.classList.add(class_name);}
function removeClass(class_id, class_name){return class_id.classList.remove(class_name);}
function toggleClass(class_id, class_name){return class_id.classList.toggle(class_name);}


const cart = JSON.parse(localStorage.getItem('cart'));

function removeCart(e){
    var cart_items = sel('.cart-items');
    data = cart[e.dataset.obj_count];
    cart.splice(parseInt(e.dataset.obj_count), 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    sel("#cart-count").innerHTML = cart.length;
    cart_items.removeChild(sel(`#cart-item-${e.dataset.obj_count}`));
    let price = 0;
    let _total = sel('#cart-total');
    if(cart.length == 0){
        sel('.cart-items').innerHTML = '<h1>No Items In Cart</h1>';
        _total.innerHTML = price;
    }
    cart.forEach(element => {
        price += element.price*element.days;
        _total.innerHTML = price;
    });
}

function cartDay(e){
    // console.log(e);
    let cart = JSON.parse(localStorage.getItem('cart'));
    let _total = sel('#cart-total');
    let price = 0;
    let _days = sel(`#cart-day-${e.dataset.count}-${e.dataset.prod_name}`);
    cart[e.dataset.count].days = e.value;
    // if(cart[e.dataset.count].days>e.value){
    //     let decreased = cart[e.dataset.count].days-e.value;
    //     price = cart[e.dataset.count].price*decreased;
    //     _total.innerHTML = parseInt(_total.innerHTML)-price;
    // }
    // else{
    //     let increased = e.value-cart[e.dataset.count].days;
    //     price = cart[e.dataset.count].price*increased;
    //     _total.innerHTML = parseInt(_total.innerHTML)+price;
    // }
    
    _days.innerHTML = `${e.value} day`;
    localStorage.setItem('cart', JSON.stringify(cart));
    reloadPage();
}


if(!cart){
    sel('.loader').style.display = 'none';
    sel('.cart-items').innerHTML = '<h1>No Items In Cart</h1>';
}
if(cart){
    let obj_count = 0;
    let price = 0;
    let _total = sel('#cart-total')
    sel("#cart-count").innerHTML = cart.length;
    var cart_items = sel('.cart-items');
    cart.forEach(element => {
        var elm = document.createElement('div');
        elm.classList.add('cart-item');
        elm.id = `cart-item-${obj_count}`;
        var option = ``;
        for(let i=1; i<=10; i++){
            // console.log(`i: ${i} element.days: ${element.days}`);
            option+=`<option ${i==element.days?'selected':''} value="${i}">${i} Days</option>`}
        elm.innerHTML = `<img src="${element.img}" alt="product">
        <div class="cart-item-info">
        <h3>${element.name} <span class='product-price'>₹${element.price}</span></h3>
        <p id='cart-day-${obj_count}-${element.prod_name}'>${element.days} day</p>
        <select data-count=${obj_count} data-prod_name=${element.prod_name} class="btn name="days" id="days" onchange="cartDay(this)">
        ${option}
        </select>
        <button data-obj_count=${obj_count} class="btn" onclick="removeCart(this)">Remove</button>
        </div>`;
        obj_count += 1;
        cart_items.appendChild(elm);
        price += element.price*element.days;
        _total.innerHTML = price;
    }
    );
    sel('.loader').style.display = 'none';
}
