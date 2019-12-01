if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){
    var nbuttons =document.getElementsByClassName('btn-btn-danger')
    console.log(nbuttons)
    for(var i=0; i < nbuttons.length; i++){
     var button = nbuttons[i]
        button.addEventListener('click',removebut)
    }

    var itemquant = document.getElementsByClassName('cart-quantity-input')
    for(var i = 0; i < itemquant.length ;i++){
        var number= itemquant[i]
        number.addEventListener('change',quantupdated)
    }


    var addtocartbut = document.getElementsByClassName('probtn')
    for(var i = 0; i < addtocartbut.length ;i++){
        var number= addtocartbut[i]
        number.addEventListener('click',addtocartclicked)
    }
}

function addtocartclicked(event){
    //alert("entered into add to cart func")
    var button = event.target
    var shopitem = button.parentElement.parentElement
    var title= shopitem.getElementsByClassName('item_name')[0].innerText
    var price= shopitem.getElementsByClassName('item-price')[0].innerText
    var img_src= shopitem.getElementsByClassName('item_img')[0].src
    console.log(title,price,img_src)
    additemtocart(title,price,img_src)
}

function additemtocart(title,price,img_src){
    var cartrow = document.createElement('div')
    cartrow.innerHTML=title
    var cartitems = document.getElementsByClassName('cart-items')
    cartitems.append(cartrow)
}

function removebut(event){
    var butclicked = event.target
    butclicked.parentElement.parentElement.remove()
    updatetot()
}

function quantupdated(event){
    var inp = event.target
    if(isNaN(inp.value) || inp.value <= 0){
        inp.value = 1
    }
    updatetot()
}

function updatetot(){
    var cartitem = document.getElementsByClassName('cart-items')[0]
    var cartrows = cartitem.getElementsByClassName('cart-row')
    var tot = 0
    for(var i =0; i< cartrows.length; i++){
        var cr=cartrows[i]
        var rowprice = cr.getElementsByClassName('cart-price cart-column')[0]
        var rowitemcount = cr.getElementsByClassName('cart-quantity-input')[0]
        var price= parseFloat(rowprice.innerText.replace('$',''))
        var quant = rowitemcount.value
        tot = tot + (price * quant)
    }
    tot = Math.round(tot * 100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText = '₹'+tot
}