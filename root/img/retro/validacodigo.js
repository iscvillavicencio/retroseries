function validar(){
    var n1 = document.getElementById("n1").value;
    var n2 = document.getElementById("n2").value;
    var n3 = document.getElementById("n3").value;
    var n4 = document.getElementById("n4").value;
    var n5 = document.getElementById("n5").value;
    var n6 = document.getElementById("n6").value;
    var codigo = n1 + n2 + n3 + n4 + n5 + n6;

    if(n1 !="" && n2 !="" && n3 !="" && n4 !="" && n5 !="" && n6 != ""){
   
        $.ajax({
            type: "GET",
            crossDomain: true,   
            url: cn + "ValidarCodigo&Codigo="+codigo,
            success: function (result) {

                if(result != ""){
                    localStorage.setItem("UserCode", result);
                    location.href="actualizarpwd.html";
                }
                else{
                    ToastError("El código no es valido");
                  
                }
            },
            error: function (jqXmlHttpRequest, textStatus, errorThrown) {
            
              ToastError('Verifique su conexión');
            }
        });
           
    }
    else{
        ToastWarning('Agregue el código.');
     
    }
    
  }