function EnviarCorreo(){


    var mail = document.getElementById("txtUsu").value;
    //alert(cn + "RecuperarPwd&Email="+mail);
    $.ajax({
        type: "GET",
        crossDomain: true,   
        url: cn + "RecuperarPwd&Email="+mail,

        success: function (result) {

        

              location.href="codigo.html";


            
        },
        error: function (jqXmlHttpRequest, textStatus, errorThrown) {
            ToastError('Verifique su conexión');
        
        }
    });

}