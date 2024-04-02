function sel(class_id){return document.querySelector(class_id);}
function selAll(class_id){return document.querySelectorAll(class_id);}
function addClass(class_id, class_name){return class_id.classList.add(class_name);}
function removeClass(class_id, class_name){return class_id.classList.remove(class_name);}
function toggleClass(class_id, class_name){return class_id.classList.toggle(class_name);}


const cart = JSON.parse(localStorage.getItem('cart'));

// const cart = [
// {"name":"DSLR Camera","prod_name":"dslr_cam","price":"450","days":1,"img":"../static/img/banner/banner1.jpg"},
// {"name":"Camera Lens","prod_name":"camera_lens","price":"200","days":1,"img":"https://i1.adis.ws/i/canon/eos-r6-mark-ii-lifestyle-45-16x9-hero_c2336c777a564e06a17e3db9cf917431?$hero-header-half-16by9-dt-jpg$"},
// {"name":"Camera Flash","prod_name":"camera_flash","price":"150","days":1,"img":"https://static.bhphotovideo.com/explora/sites/default/files/04-TTL-Flash.jpg"}

function removeCart(e){
    console.log(e);
}


if(!cart){
    sel('.loader').style.display = 'none';
    sel('.cart-items').innerHTML = '<h1>No Items In Cart</h1>';
}
if(cart){
    let price = 0;
    let _total = sel('#cart-total')
    sel("#cart-count").innerHTML = cart.length;
    var cart_items = sel('.cart-items');
    cart.forEach(element => {
        var elm = document.createElement('div');
        elm.classList.add('cart-item');
        elm.innerHTML = `<img src="${element.img}" alt="product">
        <h3>${element.name}</h3>
        <p>₹${element.price}</p>
        <p>${element.days} day</p>
        <button class="btn" onclick="removeCart()">Remove</button>`;
        cart_items.appendChild(elm);
        price += element.price*element.days;
        _total.innerHTML = price;
    }
    );
    sel('.loader').style.display = 'none';
}
