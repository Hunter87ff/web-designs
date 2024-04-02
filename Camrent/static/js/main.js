function sel(class_id){return document.querySelector(class_id);}
function selAll(class_id){return document.querySelectorAll(class_id);}
function addClass(class_id, class_name){return class_id.classList.add(class_name);}
function removeClass(class_id, class_name){return class_id.classList.remove(class_name);}
function toggleClass(class_id, class_name){return class_id.classList.toggle(class_name);}

// function that will take int input and sleep for that time
function sleep(second) {
    return new Promise(resolve => setTimeout(resolve, second*1000));
}



sel(".main").addEventListener("click", function(e){
    let map = sel("#bhadrakMap");
    if(map.classList.contains("showb")){
    sel("#bhadrakMap").classList.remove("showb");
    }
});

function menu_toggle(){
    sel('.menu').classList.toggle('active');
    sel('#menu_btn').classList.toggle('rotate');
}
var prc = 0;
function checkout(e){
    var chk = sel('.checkout');
    chk.style.display = 'flex';
    sel("#lb_days").innerHTML = `Enter Days(Rs. ${e.dataset.price}/day)`;
    prc = e.dataset.price;
    sel("#days_val").innerHTML = `${prc*sel("#days").value}/${sel("#days").value} Days`;
    sel("#submit_btn").name = e.name;
    sel("#check_item_name").innerText = `Are You Sure To Rent ${e.name.replace("_"," ").toUpperCase()}?`;
}

function addCart(e){
    data = {name:e.dataset.pname, prod_name: e.name, price: e.dataset.price, days: 1, img: e.dataset.img};
    var cart = localStorage.getItem('cart');
    if(cart == null){
        cart = [];
        cart.push(data);
    }                     
    else{
        cart = JSON.parse(cart);
        if(cart.includes(data)){alert('Already Added'); return;}
        if(cart.length>7){alert('You can only add 8 items to cart'); return;}
        cart.push(data);}
    localStorage.setItem('cart', JSON.stringify(cart));
    let addedCart = sel(".addedCart");
    addedCart.classList.add("slideDown");
    sleep(1).then(() => {
        addedCart.classList.remove("slideDown");
    });
}
function cancel_checkout(){sel('.checkout').style.display = 'none';}

var products = sel('.products');
if(products){
fetch('./static/js/products.json')
.then(response => response.json())
.then(data => {
    data.forEach(element => {
        var elm = document.createElement('div');
        elm.classList.add('product');
        elm.innerHTML = `<img src="${element.img}" alt="product">
        <h3>${element.name}</h3>
        <!--<p>${element.price}</p>-->
        <div style="display: flex; " class="btns">
            <button data-pname="${element.name}"  data-price=${element.price} data-img=${element.img} name=${element.prod_name} onclick="addCart(this)" class="btn">Add To Cart</button>
            <button data-price=${element.price} name=${element.prod_name} onclick="checkout(this)" class="btn">Rent</button>
        </div>`;
        products.appendChild(elm);
    });
    sel('.loader').style.display = 'none';
});
}
 var days = sel("#days");
 if(days){
    days.addEventListener("input", function(){
    sel("#days_val").innerText = `${prc*this.value}/${this.value} Days`;
});
 }
try {
    sel(".confirmation").addEventListener("click", function(){
        if(sel("#agree").checked){
            sel("#submit_btn").style.display = "block";
        }if(!sel("#agree").checked){
            sel("#submit_btn").style.display = "none";
        }
    });
} catch (error) {
    console.log(error);
}

console.clear();