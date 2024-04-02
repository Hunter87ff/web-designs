function sel(class_id){return document.querySelector(class_id);}
function selAll(class_id){return document.querySelectorAll(class_id);}
function addClass(class_id, class_name){return class_id.classList.add(class_name);}
function removeClass(class_id, class_name){return class_id.classList.remove(class_name);}
function toggleClass(class_id, class_name){return class_id.classList.toggle(class_name);}

const cart = localStorage.getItem('cart');
if(cart){
    const cart_items = JSON.parse(cart);
    const cart_count = sel('.cart_count');
    cart_count.innerText = cart_items.length;
}
