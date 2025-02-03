window.onload = async function() {
    try {
        let lista = await getCoche();
        pintarCoches(JSON.parse(lista));
    } catch (error) {
        console.log("Error al obtener los coches:", error);
    }
}

async function getCoche(){

    id = window.location.href.split('id=')[1];

    let headersList = {

    }
    
    let response = await fetch("/api/coches/"+id, { 
      method: "GET",
      headers: headersList
    });
    
    let data = await response.text();
    console.log(data);
    
}