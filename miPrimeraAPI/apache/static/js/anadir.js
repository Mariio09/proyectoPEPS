async function anadir() {
  matricula = document.getElementById('matricula').value;
  marca = document.getElementById('marca').value;
  modelo = document.getElementById('modelo').value;
  descripcion = document.getElementById('descripcion').value;
  precio = document.getElementById('precio').value;
  foto = document.getElementById('foto').value;

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
    window.location.href = "http://" + url + "/login.html";
  }

}