
window.onload = async function(){
    try {
      lista = await getCoches();
    } catch (error) {
      console.log(error);
    }
    pintarCoches(JSON.parse(lista));
}

async function getCoches(){
    let headersList = {

    }
    
    let response = await fetch("/api/coches", { 
      method: "GET",
      headers: headersList
    });
    
    let data = await response.text();

    return data;
    
}

function pintarCoches(lista){
  lista.forEach(coche => {
    document.getElementById('containerCoches').innerHTML += "<div class='fotoCoche' ><div style='width:100%; background-image:url("+coche.foto+"); background-repeat: no-repeat; background-size:contain; min-height:12em; background-position: center;'></div><div><p>"+coche.marca+" "+coche.modelo+"</p><p class='precio'>"+coche.precio+"€ - IVA*<span></span></p></div></div>"

  });
}