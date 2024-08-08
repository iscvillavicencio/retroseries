function ActualizarPwd(){

    var pwd1 = document.getElementById("pwd1").value;
    var pwd2 = document.getElementById("pwd2").value;
    var mail = localStorage.getItem("UserCode");

    if(pwd1 != "" || pwd2  != ""){

        if(pwd1 == pwd2){

            $.ajax({
                type: "GET",
                crossDomain: true,   
                url: cn + "ActualizarPwd&Email=" + mail + "&Pwd=" + pwd1,
        
                success: function (result) {
        
                      location.href="inicio.html";
                },
                error: function (jqXmlHttpRequest, textStatus, errorThrown) {
                    ToastError('Ocurrio un error');
                }
            });

        }
        else{
            ToastInfo('Las contraseñas no coinciden');
        }

    }
    else{
        ToastWarning('Agregue los campos solicitados');
    }

 


}