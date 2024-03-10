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