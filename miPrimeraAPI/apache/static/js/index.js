
window.onload = async function(){
    try {
      lista = await getCoches();
    } catch (error) {
      console.log(error)
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
    document.getElementById('containerCoches').innerHTML += "<div class='fotoCoche' ><img style='width:90%' src='./assets/"+ coche.foto+"' /><p>"+coche.marca+" "+coche.modelo+"</p></div>"
  });
}