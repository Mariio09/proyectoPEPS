foto = '';
window.onload  = ()=>{
  document.getElementById('foto').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function() {
        foto = reader.result;
        console.log(foto);
      };
      reader.readAsDataURL(file);
  }
});
}

async function anadir() {
  matricula = document.getElementById('matricula').value;
  marca = document.getElementById('marca').value;
  modelo = document.getElementById('modelo').value;
  descripcion = document.getElementById('descripcion').value;
  precio = document.getElementById('precio').value;

  if(typeof matricula == 'string' && matricula && typeof marca == 'string' && marca && typeof modelo == 'string' && modelo && typeof descripcion == 'string' && parseFloat(precio) > 0){
    let headersList = {
      "Content-Type": "application/json"
    }
  
    let bodyContent = JSON.stringify({ "matricula": matricula, "marca": marca, "modelo": modelo, "descripcion": descripcion, "precio": precio, "foto": foto });
  
    let response = await fetch("/api/coches", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });
  
    let data = await response.text();
    data = JSON.parse(data);
    if (data.status == 'OK') {
      url = window.location.href.split('/')[2];
      window.location.href = "https://" + url + "/login.html";
    }
  }else{
    document.getElementById('errormsg').classList.remove('hidden');
  }

  

}