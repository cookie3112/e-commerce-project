if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready);
}else{
    ready()
}

function ready(){
    var nbuttons =document.getElementsByClassName('btn-btn-danger');
    console.log(nbuttons);
    for(var i=0; i < nbuttons.length; i++){
     var button = nbuttons[i];
        button.addEventListener('click',removebut);
    }

    var itemquant = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0; i < itemquant.length ;i++){
        var number= itemquant[i];
        number.addEventListener('change',quantupdated);
    }


    var addtocartbut = document.getElementsByClassName('probtn');
    for(var i = 0; i < addtocartbut.length ;i++){
        var number= addtocartbut[i];
        number.addEventListener('click',addtocartclicked);
    }
}

function addtocartclicked(event){
    //alert("entered into add to cart func")
    var button = event.target;
    var shopitem = button.parentElement.parentElement;
    var title= shopitem.getElementsByClassName('item_name')[0].innerText;
    var price= shopitem.getElementsByClassName('item-price')[0].innerText;
    var imgsrc= shopitem.getElementsByClassName('item_img')[0].src;
    console.log(title,price,imgsrc);
    additemtocart(title,price,imgsrc);
    updatetot();
}

function additemtocart(title,price,imgsrc){
    var cartrow = document.createElement('div');
    //alert("added to cart");
    cartrow.classList.add('cart-row')
    var cartitems = document.getElementsByClassName('cart-items')[0];
    var cartitemnames = cartitems.getElementsByClassName('cart-item-title');
    for(var i=0; i< cartitemnames.length;i++){
        if(cartitemnames[i].innerText == title){
            alert("item already in cart, update the cart (o.O)");
            return;

        }
    }
    var cartrowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imgsrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn-btn-danger" type="button">REMOVE</button>
        </div>`;
    cartrow.innerHTML = cartrowContents;
    cartitems.append(cartrow);
    cartrow.getElementsByClassName('btn-btn-danger')[0].addEventListener('click',removebut);
    cartrow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantupdated);
}

function removebut(event){
    var butclicked = event.target;
    butclicked.parentElement.parentElement.remove();
    updatetot();
}

function quantupdated(event){
    var inp = event.target;
    if(isNaN(inp.value) || inp.value <= 0){
        inp.value = 1;
    }
    updatetot();
}

function updatetot(){
    var cartitem = document.getElementsByClassName('cart-items')[0];
    var cartrows = cartitem.getElementsByClassName('cart-row');
    var tot = 0;
    for(var i =0; i< cartrows.length; i++){
        var cr=cartrows[i];
        var rowprice = cr.getElementsByClassName('cart-price cart-column')[0];
        var rowitemcount = cr.getElementsByClassName('cart-quantity-input')[0];
        var price= parseFloat(rowprice.innerText.replace('₹',''));
        var quant = rowitemcount.value;
        tot = tot + (price * quant);
    }
    tot = Math.round(tot * 100)/100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '₹'+tot;
}