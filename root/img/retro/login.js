function login() {
    var user = document.getElementById("username").value;
    var recordar = document.getElementById("basic-checkbox").checked;

     localStorage.setItem('usuario', user);
                           //setTimeout(window.location.href = "servN.html", 5000);	
     
      var pwd = document.getElementById("password").value;

      //user = window.btoa(user);  //quitar para el ws de ema
      //pwd = window.btoa(pwd);  //quitar para el ws de ema
  
     
      if(user != '' && pwd != ''){  
   
      $.ajax({
          type: "GET",
          crossDomain: true,   
          url: cn + "Loginapp&User="+user+"&Pwd="+pwd ,

          success: function (result) {

        
              var res1 = result.split('<');
              var res2 = res1[0].split(',');
              if (res2[0] != "") {

               if(recordar == true){
                localStorage.setItem("sesion", 1);
               }
               else{
                localStorage.removeItem("sesion");
               }

             
                   
                   localStorage.setItem("usuario", user);
                   localStorage.setItem("idUser", res2[0]); 
                   localStorage.setItem("Nombre", res2[1]); 
                   localStorage.setItem("rol", res2[2]);
                   setTimeout(window.location.href = "inicio.html", 5000);	
              }
              else{  
                ToastError("Datos Incorrectos");
              }
          },
          error: function (jqXmlHttpRequest, textStatus, errorThrown) {
            ToastWarning("Verifique su conexión");
          }
      });
      }
      else{
        ToastWarning("Agregue los datos solicitados");
      }          
  }

  function cerrar(){
    localStorage.removeItem("sesion");
    window.location.href = "login.html"
  }