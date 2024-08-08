function verProductos() {
    
    $("#datosPersona").html('');
         var t = document.getElementById("mySelect").value;
         var r = localStorage.getItem("rol");
    
          $.ajax({
              url:cn + "PMedical&Tipo="+t+ "&Rol="+r, success: function (result) {    
              //  console.log(result);  
                  var x = result.replace(/\\r\\n/g, '');  

                  localStorage.setItem("prod", x);  
                  var data = JSON.parse(x)  

                  $datos = $('#datosPersona');
                  $tabla = $('<table id="tablacursos" class="table table-condensed"><tr><th></th></table>');
                  for (var i = 0; i < data.length; i++) {
                      var n = data[i].name.substring(0,100);
                      var img = data[i].img;
                      img = "img/paracetamol.jpg";
                     
                      var $tr = $('<tr style="border-top: solid 0.5px #d8e2ef; "></tr>');
                          $tr.append('<div class="col-12 p-card" style="width:100%"><div class="row" ><div class="col-sm-5 col-md-4"><div class="position-relative h-sm-100"><a onclick="modal(\''+data[i].name +'|' + data[i].id+'\')" class="d-block h-100" ><img class="img-fluid fit-cover w-sm-100 h-sm-100 rounded-1 absolute-sm-centered"src=\"'+img+'\" alt=""/></a><div class="badge rounded-pill bg-success position-absolute top-0 end-0 me-2 mt-2 fs--2 z-index-2">Nuevo</div></div></div><div class="col-sm-7 col-md-8"><div class="row" ><div class="col-lg-8" style=" padding-left: 3px;!important"><h5 class="mt-3 mt-sm-0"><a onclick="modal(\''+data[i].name +'|' + data[i].id+'\')" class="text-dark fs-0 fs-lg-1">'+ n +'</a></h5><p class="fs--1 mb-2 mb-md-3"><a class="text-500"href="#!">'+ data[i].descr +'</a></p></div><div class="col-lg-4 d-flex justify-content-between flex-column"><div> <table ><tr><td class="td_tablita"><h4 class="fs-1 fs-md-2 text-warning mb-0"> $ ' + data[i].price +' </h4></td><td class="td_tablita2"><a id=\"'+data[i].id +'|'+ n +'\" style="cursor:pointer" name=\"'+data[i].price+'\" onclick="addcarro(this)" class="btn btn-sm btn-primary d-lg-block mt-lg-2" href="#!"><span class="fas fa-cart-plus"> </span></a></td></tr></table> </div></div></div></div></div></div>');
                      $tabla.append($tr);
                  }
                  $datos.append($tabla);                      
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
           Lobibox.notify("success", {
            msg: 'Agregado al carrito',
            position: "bottom center" 
          });
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
console.log(cartArray);
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
          console.log(jqXmlHttpRequest);
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
           Lobibox.notify("info", {
            msg: 'Agregue articulos al carrito',
            position: "bottom center" 
        });
           
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