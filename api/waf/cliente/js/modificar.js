foto = '';
window.onload  = ()=>{
  document.getElementById('foto').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function() {
           foto = reader.result;
      };
  }
});
}

window.onload = async function() {
    try {
        let coche = await getCoche();
        pintarCoche(JSON.parse(coche));
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
    
    return await response.text();
    
}


function pintarCoche(coche){
    document.getElementById('form-container').innerHTML += "<button onclick='modificar("+coche.id+")'>Modificar</button>";
    document.getElementById('cocheId').innerHTML = coche.id;
    document.getElementById('matricula').value = coche.matricula;
    document.getElementById('marca').value = coche.marca;
    document.getElementById('descripcion').value = coche.descripcion;
    document.getElementById('modelo').value = coche.modelo;
    document.getElementById('precio').value = coche.precio;
    document.getElementById('foto').value = coche.foto;
}

async function modificar(id){

    mat = document.getElementById('matricula').value;
    marc = document.getElementById('marca').value;
    desc = document.getElementById('descripcion').value;
    modelo = document.getElementById('modelo').value;
    precio = document.getElementById('precio').value;

    let headersList = {
        "Content-Type": "application/json"
       }
       
       let bodyContent = JSON.stringify({"id":id,"matricula":mat,"marca":marc,"modelo":modelo,"descripcion":desc,"precio":precio,"foto":foto});
       
       let response = await fetch("/api/coches", { 
         method: "PUT",
         body: bodyContent,
         headers: headersList
       });
       
       let data = await response.text();
       data = JSON.parse(data);

       if(data.status == "OK"){
        url = window.location.href.split('/')[2];
        location.href = "https://"+url+"/admin.html";
       }
       
}