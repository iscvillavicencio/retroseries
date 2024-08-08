function verProductos() {
    
    $("#datosPersona").html('');
         var t = document.getElementById("mySelect").value;
         var r = localStorage.getItem("rol");
    
          $.ajax({
              url:cn + "PMedical&Tipo="+t+ "&Rol="+r, success: function (result) {    
                  var x = result.replace(/\\r\\n/g, '');  
                  localStorage.setItem("prod", x);  
                  var data = JSON.parse(x)  
                  var html = "";            
                  for (var i = 0; i < data.length; i++) {
                      var n = data[i].name.substring(0,100);
                      var img = data[i].img;
                      img = "img/paracetamol.jpg";                    
                      var $tr = $('<tr style="border-top: solid 0.5px #d8e2ef; "></tr>');
                      //html = html + '<article class="col-6 col-xxl-4 rowx"><div class="card h-100 overflow-hidden"><div class="card-body p-0 d-flex flex-column justify-content-between"><div><div class="hoverbox text-center"><img class="w-100 h-100 fit-cover" src="img/paracetamol.jpg" alt=""></div><div class="p-3"><h5 class="fs-0 mb-2"><a onclick="modal(\''+data[i].name +'|' + data[i].id+'\')" class="text-dark"> '+ n +' </a></h5><h5 class="fs-0"><a>'+ data[i].descr +'</a></h5></div></div><div class="row g-0 mb-3 align-items-end"><div class="col ps-3"><h4 class="fs-1 text-warning d-flex align-items-center"><span>$ ' + data[i].price +'</span></h4></div><div class="col-auto pe-3"><a id=\"'+data[i].id +'|'+ n +'\" style="cursor:pointer" name=\"'+data[i].price+'\" onclick="addcarro(this)" class="btn btn-sm btn-primary d-lg-block mt-lg-2" href="#!"><span class="fas fa-cart-plus"></span></a></div></div></div></article>';              
                      html = html + '<article class="col-6 col-xxl-4"><div class="card h-100 overflow-hidden"><div class="card-body p-0 d-flex flex-column justify-content-between"><div><div class="hoverbox text-center"><img class="w-100 h-100 fit-cover" src="img/paracetamol.jpg" alt=""></div><div class="p-3"><h5 class="fs-0 mb-2"><a onclick="modal(\''+data[i].name +'|' + data[i].id+'\')" class="text-dark">'+ n +'</a></h5><h5 class="fs-0"><a>'+ data[i].descr +'</a></h5></div></div><div class="row g-0 mb-3 align-items-end"><div class="col ps-3"><h4 class="fs-1 text-warning d-flex align-items-center"><span>$ ' + data[i].price +'</span></h4></div><div class="col-auto pe-3"><a id=\"'+data[i].id +'|'+ n +'\" style="cursor:pointer" name=\"'+data[i].price+'\" onclick="addcarro(this)" class="btn btn-sm btn-primary d-lg-block mt-lg-2" href="#!"><span class="fas fa-cart-plus"></span></a></div></div></div></article>';
                 
                    }
                  document.getElementById("datosPersona").innerHTML = html;     
              }
          });
      }
      function modal(val){
         var cad = val.split('|');
         document.getElementById("divpro").innerHTML = cad[0];
         document.getElementById("btnMod").click();
      }


      function ini(){
window.location.href = "dashboard.html";
}
var shoppingCart = function () { 
cart = [];
// Constructor
function Item(idco, name, price, count, desc) {
this.idco = idco;
this.name = name;
this.price = price;
this.count = count;
this.desc = desc;
}
function saveCart() {

sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
}
function loadCart() {
cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
}
if (sessionStorage.getItem("shoppingCart") != null) {
loadCart();
}
var obj = {};
obj.addItemToCart = function (idco, name, price, count, desc) {
for (var item in cart) {
if (cart[item].name == name) {
 cart[item].count++;
 saveCart();
 return;
}
}
var item = new Item(idco, name, price, count, desc);
cart.push(item);
saveCart();
};
obj.setCountForItem = function (name, count) {
for (var i in cart) {
if (cart[i].name == name) {
 cart[i].count = count;
 break;
}
}
};
obj.removeItemFromCart = function (name) {
for (var item in cart) {
if (cart[item].name == name) {
 cart[item].count--;
 if (cart[item].count === 0) {
   cart.splice(item, 1);
 }
 break;
}
}
saveCart();
};
obj.removeItemFromCartAll = function (name) {
for (var item in cart) {
if (cart[item].name == name) {
 cart.splice(item, 1);
 break;
}
}
saveCart();
};
obj.clearCart = function () {
cart = [];
saveCart();
};
obj.totalCount = function () {
var totalCount = 0;
for (var item in cart) {
totalCount += cart[item].count;
}
return totalCount;
};
obj.totalCart = function () {
var totalCart = 0;
for (var item in cart) {
totalCart += cart[item].price * cart[item].count;
}
return Number(totalCart.toFixed(2));
};
obj.listCart = function () {
var cartCopy = [];
for (i in cart) {
item = cart[i];
itemCopy = {};
for (p in item) {
 itemCopy[p] = item[p];
}
itemCopy.total = Number(item.price * item.count).toFixed(2);
cartCopy.push(itemCopy);
}
return cartCopy;
};
return obj;
}();

$('.add-to-cart').click(function (event) {
event.preventDefault();
var name = $(this).data('name');
var price = Number($(this).data('id'));
shoppingCart.addItemToCart(name, price, 1);
displayCart();
});
function comprovartotal(){
var totalCart = 0;
for (var item in cart) {
totalCart += cart[item].price * cart[item].count;
}
return Number(totalCart.toFixed(2));
}
function addcarro(event){ //Aqui se agrega el producto al modal
 // alert(event.id);
var vertot = comprovartotal(); //obtengo el total de la compra
var idcompra = "";
if(vertot == 0){ // si el total es mayor a 0 mantengo el mismo id de compra
localStorage.setItem('idcompra', uuidv4());
}
idcompra = localStorage.getItem('idcompra');
var cad = event.id.split('|');
var name = cad[0];
var price = Number(event.name);
var idco = idcompra;
var desc = cad[1];
shoppingCart.addItemToCart(idco, name, price, 1, desc);
displayCart();
ToastSuccess("Agregado al carrito");
}


$('.clear-cart').click(function () {
shoppingCart.clearCart();
displayCart();
});
function uuidv4() {
return 'xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
return v.toString(16);
});
}
function displayCart() {
var cartArray = shoppingCart.listCart();
var output = "";
//console.log(cartArray);
for (var i in cartArray) {
output += "<tr>" +

"<td style='padding-right: 0rem; padding-left: 0rem;'>" +
"<div class='row gx-card mx-0 align-items-center border-bottom border-200' style='padding: 0rem 0rem;'><div class='col-8 py-3'><div class='d-flex align-items-center'><div class='flex-1'><h5 class='fs-0'><a class='text-900' href='#'><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>" + cartArray[i].desc + " </font></font></a></h5>      <div class='fs--2 fs-md--1'><a class='delete-item text-danger' data-name=" + cartArray[i].name + " href='#'><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>Eliminar</font></font></a></div></div></div></div><div class='col-4 py-3'><div class='row align-items-center'><div class='col-md-8 d-flex justify-content-end justify-content-md-center order-1 order-md-0'><div><div class='input-group input-group-sm flex-nowrap' data-quantity='data-quantity'><button class='minus-item btn btn-sm btn-outline-secondary border-300 px-2' data-type='minus' data-name=" + cartArray[i].name + "><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>-</font></font></button><input class='item-count form-control text-center px-2 input-spin-none' type='number' min='1' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "' aria-label='Cantidad (al dólar más cercano)' style='width: 50px'><button class='plus-item btn btn-sm btn-outline-secondary border-300 px-2' data-type='plus' data-name=" + cartArray[i].name + "><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>+</font></font></button></div></div></div><div class='col-md-4 text-end ps-0 order-0 order-md-1 mb-2 mb-md-0 text-600'><font style='vertical-align: inherit;'><font style='vertical-align: inherit;'>$ " + cartArray[i].total + " </font></font></div></div></div></div>" +
"</td>" +
"</tr>";
}
$('.show-cart').html(output);
$('.total-cart').html("$ " + shoppingCart.totalCart());
$('.total-count').html(shoppingCart.totalCount());
}
function guardarOrden(JsonArticulos, IdCompra, Total, Email){    
 JsonArticulos = '{' + '\"Articulos\":' + '\"' + JsonArticulos + '\"}';

 //alert(cn + "InsertPedido&IdCompra=" + IdCompra + "&Total=" + Total + "&usu=" + Email);
 
 $.ajax({
         type: "post",
           url: cn + "InsertPedido&IdCompra=" + IdCompra + "&Total=" + Total + "&usu=" + Email,
         crossDomain: true,
         data: JsonArticulos,  
         dataType : 'json',  
         headers: {
         },        
         success: function (data) {  
         document.getElementById("btnClear").click();
         document.getElementById("divtot").style.display = 'none';
         document.getElementById("msgBien").style.display = 'block';
         document.getElementById("alerta").value = 'Pedido solicitado con exito';
         document.getElementById("icosu").style.display = 'block';               
          setTimeout(function(){ 
             document.getElementById("divtot").style.display = 'block';
         document.getElementById("msgBien").style.display = 'none';
         document.getElementById("icosu").style.display = 'none';
           }, 3000);                                   
         },
         error: function (jqXmlHttpRequest, textStatus, errorThrown) {  
          //console.log(jqXmlHttpRequest);
             document.getElementById("icoer").style.display = 'block';
             document.getElementById("divtot").style.display = 'none';
             document.getElementById("msgBien").style.display = 'block';
             document.getElementById("alerta").value = 'Ha ocurrido un error';
             setTimeout(function(){ 
             document.getElementById("divtot").style.display = 'block';
         document.getElementById("msgBien").style.display = 'none';
         document.getElementById("icoer").style.display = 'none';

           }, 3000);
         },
     });
}
function ordenarcompra(){
var cartArray = shoppingCart.listCart();

if(cartArray[0] != undefined){
var vertot = comprovartotal();
var user = localStorage.getItem("usuario");

//user = window.atob(user);
var art = JSON.stringify(cartArray).replace(/"/g, "'");


guardarOrden(art, cartArray[0].idco, vertot, user);
}
else{
  ToastInfo('Agregue articulos al carrito');
}
}
// Delete item button
$('.show-cart').on("click", ".delete-item", function (event) {
var name = $(this).data('name');
shoppingCart.removeItemFromCartAll(name);
displayCart();
});
// -1
$('.show-cart').on("click", ".minus-item", function (event) {
var name = $(this).data('name');
shoppingCart.removeItemFromCart(name);
displayCart();
});
// +1
$('.show-cart').on("click", ".plus-item", function (event) {
var name = $(this).data('name');
shoppingCart.addItemToCart("", name, "", "");
displayCart();
});
// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
var name = $(this).data('name');
var count = Number($(this).val());
shoppingCart.setCountForItem(name, count);
displayCart();
});
displayCart();