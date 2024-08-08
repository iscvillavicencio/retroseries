 function verProductos() {
           $("#datosPersona").html('');
                var r = localStorage.getItem("rol");
                var user = localStorage.getItem("usuario");
                var txtuser = document.getElementById("txtuser");
                var p = document.getElementById("txtp").value;
                var usup = "";
                //user = window.atob(user);
                if(r != "Administrador"){                 
                  txtuser.value = user;
                  txtuser.readOnly = true;
                  usup = txtuser.value;
                }
                else{
                  if(txtuser.value == ""){
                    usup = "-1";
                  }
                  else{
                    usup = txtuser.value;
                  }
                }  
                if(p == ""){
                  p = "-1";
                }  
                var est = document.getElementById("mySelect").value;                
                var f1 = document.getElementById("txtf1").value;
                var f2 = document.getElementById("txtf2").value;
                console.log(cn + "ListaPedidosMed&usu="+usup+"&Pedido="+ p +"&FechaIni="+ f1 + "&FechaFin="+ f2+"&Estatus="+est, );
                 $.ajax({
                     url: cn + "ListaPedidosMed&usu="+usup+"&Pedido="+ p +"&FechaIni="+ f1 + "&FechaFin="+ f2+"&Estatus="+est, 
                     success: function (result) {   

               
                                     
                         var x = result.replace(/\\r\\n/g, '');  
                         localStorage.setItem("prod", x);  
                         var data = JSON.parse(x);
                         console.log("Los datos:  " + data.length);

                         if(data.length == 0){
                          ToastWarning("No se encontraron resultados");
                          document.getElementById("datosPersona").innerHTML = "<div class='text-400 fw-normal fs--2'>No se encontraron resultados</div>"
                         }

                         $datos = $('#datosPersona');
                         $tabla = $('<table id="tablacursos" class="table table-borderless fs--1 mb-0"><tr></tr></table>');
                            
                         for (var i = 0; i < data.length; i++) {
                          var dir = data[i].Direccion;
                          var est = "";
                          var clase = "";
                           if(data[i].Estatus == 'p'){
                            est = "Pendiente";
                            clase = "form-check-input-warning imgWarning";
                          }
                          if(data[i].Estatus == 'c'){
                            est = "En camino";
                            clase = "form-check-input-primary imgPrimary";
                          }
                          if(data[i].Estatus == 't'){
                            est = "Entregado";
                            clase = "form-check-input-success imgSuccess";
                          }
                          if(data[i].Estatus == 'x'){
                            est = "Cancelado";
                            clase = "form-check-input-danger imgDanger";
                          }
                          if(dir == ""){
                            dir = "x";
                          }
                          var $tr = $('<tr class="border-bottom" onclick="modal(\''+data[i].IdCompra +'|' + data[i].total+'|' + est +'|' + r +'|' + dir +'\')"></tr>');  
				                 $tr.append('<th class="ps-0 pt-0">Total: $'+ data[i].total +'<div class="text-400 fw-normal fs--2">Fecha: '+ data[i].FechaCompra +'</div><div class="text-400 fw-normal fs--2">No Pedido: <b>'+ data[i].IdCompra +'</div></th><th class="pe-0 text-end pt-0"><center><input class="form-check-input rounded-circle form-check-line-through p-2 '+clase+'" type="checkbox" checked><p class="txtEstatus">'+ est +'</p></center></th>');
                             $tabla.append($tr);
                         }
                         $datos.append($tabla);                      
                     }
                 });
             }
             function modal(val){
              var cad = val.split('|');
              listarArticulosPedido(cad[0], cad[1], cad[2], cad[3], cad[4]);
              localStorage.setItem("idc", cad[0]);                       
                document.getElementById("btnM").click();
             }
             function listarArticulosPedido(idcompra, total, estatus, rol, dir){
             var cl = "";
              if(estatus == "Pendiente"){
                estatus = "SOLICITUD RECIBIDA, PEDIDO PENDIENTE DE ENVÍO";
                if(rol == "Administrador"){
                  document.getElementById("btnenviado").style.display = 'block';
                  document.getElementById("btnterminado").style.display = 'none';
                }
              }
              if(estatus == "En camino"){
                estatus = "SU PEDIDO YA ESTA EN CAMINO";
                if(rol == "Administrador"){
                  document.getElementById("btnterminado").style.display = 'block';
                  document.getElementById("btnenviado").style.display = 'none';
                }
              }
              if(estatus == "Entregado"){
                estatus = "PEDIDO ENTREGADO";
                 if(rol == "Administrador"){
                  document.getElementById("btnenviado").style.display = 'none';
                  document.getElementById("btnterminado").style.display = 'none';
                }
              }
              if(dir == "x" || dir=="null"){
                dir = "No se agrego un domicilio";
                cl = "badge badge rounded-pill badge-soft-danger";
              }
              else{
                cl = "badge badge rounded-pill badge-soft-primary";
              }
              $("#datosPersona2").html('');
                  $.ajax({
                     url: cn + "ListaArtPedidosMed&IdCompra="+idcompra, 
                     success: function (result) {    

                         var x = result.replace(/\\r\\n/g, '');  
                         localStorage.setItem("prod", x);  
                         var data = JSON.parse(x)  
                         $datos = $('#datosPersona2');
                         $tabla = $('<table id="tablacursos" style="font-size:12px" class="table table-striped"><tr><th>Producto</th><th style="text-align: center">Precio</th><th style="text-align: center">Cant</th><th style="text-align: center">Total</th></tr> <tfoot><tr><th>Id Pedido: '+ idcompra +'</th><th style="text-align: center"></th><th style="text-align: center">Total:</th><th style="text-align: center"><span class="badge badge rounded-pill badge-soft-danger">$ '+ total +'</span></th></tr><tr><td colspan="4" style="text-align: center">'+ estatus +'</td></tr><tr><td colspan="4" style="text-align: center"><span class=\"'+cl+'\" style="width:100%"><textarea class="areaDir" readonly>'+ dir +'</textarea></span></td></tr></tfoot></table><input type="text" style="display:none; font-size: 1px; " id="txtdir" value=\"'+dir+'\"/>');
                         for (var i = 0; i < data.length; i++) {                          
                          var $tr = $('<tr></tr>');  
                         $tr.append('<td style="font-size: 10px">'+ data[i].Producto +'</td><td style="text-align: center"><span class="badge badge rounded-pill badge-soft-success">$ '+ data[i].Precio +'</span></td><td style="text-align: center"><span class="badge badge rounded-pill badge-soft-warning">'+ data[i].Cantidad +'</span></td><td style="text-align: center"><span class="badge badge rounded-pill badge-soft-primary">$ '+ data[i].Total +'</span></td>');
                             $tabla.append($tr);
                         }
                         $datos.append($tabla);                      
                     }
                 });
             }
      function estatus(est){
        var dir = document.getElementById("txtdir").value; 
        var idc = localStorage.getItem("idc");
        if(dir != "No se agrego un domicilio"){
            $.ajax({
                type: "GET",
                url: cn + "CambiarEstatusPedidoMed&IdCompra=" + idc + "&Estatus=" + est,
                success: function (result) {
               
                      verProductos();
                      ToastSuccess("Estatus Modificado");
                },
                error: function (jqXmlHttpRequest, textStatus, errorThrown) {   
                }
            });
            }
            else{
                  ToastError("El usuario no agrego una dirección de entrega, favor de verificar");
            }
         }