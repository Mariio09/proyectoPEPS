
window.onload = async function(){
    console.log('asdasda')
    lista = await getCoches();
    console.log(lista);
}

async function getCoches(){
    let headersList = {

    }
    
    let response = await fetch("http://localhost:9094/coches", { 
      method: "GET",
      headers: headersList
    });
    
    let data = await response.text();
    console.log(data);
    
}