function sel(class_id){
    return document.querySelector(class_id);
}
function selAll(class_id){
    return document.querySelectorAll(class_id);
}
function addClass(class_id, class_name){
    return class_id.classList.add(class_name);
}
function removeClass(class_id, class_name){
    return class_id.classList.remove(class_name);
}
function toggleClass(class_id, class_name){
    return class_id.classList.toggle(class_name);
}

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
    sel("#submit_btn").name = e.name;
    sel("#check_item_name").innerText = `Are You Sure To Rent ${e.name.replace("_"," ").toUpperCase()}?`;
}

function cancel_checkout(){sel('.checkout').style.display = 'none';}

var products = sel('.products');
fetch('../static/js/products.json')
.then(response => response.json())
.then(data => {
    data.forEach(element => {
        // console.log(element);
        var elm = document.createElement('div');
        elm.classList.add('product');
        elm.innerHTML = `<img src="${element.img}" alt="product">
        <h3>${element.name}</h3>
        <!--<p>${element.price}</p>-->
        <div style="display: flex; " class="btns">
            <button class="btn">Add To Cart</button>
            <button data-price=${element.price} name=${element.prod_name} onclick="checkout(this)" class="btn">Rent</button>
        </div>`;
        products.appendChild(elm);
    });
    sel('.loader').style.display = 'none';
});

sel("#days").addEventListener("input", function(){
    sel("#days_val").innerText = `${prc*this.value}/${this.value} Days`;
});

sel(".confirmation").addEventListener("click", function(){
    if(sel("#agree").checked){
        sel("#submit_btn").style.display = "block";
    }if(!sel("#agree").checked){
        sel("#submit_btn").style.display = "none";
    }
});
