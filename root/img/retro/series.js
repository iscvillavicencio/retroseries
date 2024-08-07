
const  series = async() =>{
    try {
      const res = await fetch('https://lamamadecraig.somee.com/ws/wscraig.ashx?Comando=SeleccionarSeries', {
        method: "GET"
      })
      if(!res?.ok){
        console.log("🚫Error: "+res.status+" ⚠️Ups!. Algo salio mal");
        return
      }
      const data = await res.json();
      if (data != undefined) {
       // alert(data);
        const elements = [];
  
        for (let i = 0; i < data.length; i++) {
          const $tr = $('<tr style="border-top: solid 0.5px #d8e2ef; "></tr>');
          const card = `
            <div class="col-4">
                              <a id="${data[i].idSerie}|${data[i].Nombre}|${data[i].Ruta}" onclick="verSerie(this.id)" href="https://play.google.com/store/apps/details?id=isc.retro">
                                <center>
                                <span class="circle-dashed form-check-input-primary">
                                 
                                  <img src="${data[i].Imagen}" width="50" alt="">
                                </span>
                                </center>
                                <p class="mb-0 fw-medium text-800 fs--2 pt-1">${data[i].Nombre}</p>
                              </a>
                              <br>
                          </div>
          `;
          elements.push(card);
        }
        const html = elements.join('');
        document.getElementById('divSeries').innerHTML = html;
        $("#loading").hide();
      }
    } catch (error) {
      console.log('Error: Ups!. Algo salio mal ' + error);
    } finally {
      //Aqui se puede ocultar el loader
    }
  };


  function verSerie(valor){
    var ruta = valor.split("|");
    localStorage.setItem("SerieSelec", valor);
    setTimeout(function() {
        window.location.href = "#";
}, 1000);
    
  }