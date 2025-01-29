window.onload = async function() {
    try {
        let lista = await getCoches();
        pintarCoches(JSON.parse(lista));  // Convierte el string a objeto JSON
    } catch (error) {
        console.log("Error al obtener los coches:", error);
    }
}

// Función para obtener los coches desde la API
async function getCoches() {
    let headersList = {}; // Aquí podrías agregar cabeceras si es necesario

    let response = await fetch("/api/coches", { 
        method: "GET",
        headers: headersList
    });

    if (!response.ok) {
        throw new Error("No se pudo obtener la lista de coches.");
    }

    let data = await response.text(); // Obtiene la respuesta como texto

    return data; // Retorna los datos
}

// Función para pintar los coches en la tabla
function pintarCoches(lista) {
    let tbody = document.getElementById("tablaCoches"); // Seleccionamos el tbody

    lista.forEach(coche => {
        // Creamos una fila de la tabla para cada coche
        let fila = `
            <tr>
                <td>${coche.matricula}</td>
                <td>${coche.marca}</td>
                <td>${coche.modelo}</td>
                <td>${coche.descripcion}</td>
                <td>${coche.precio}€</td>
                <td><img src="./assets/${coche.foto}" alt="${coche.marca} ${coche.modelo}" style="width:80px; border-radius:5px;"></td>
                <td><button class="btn btn-primary" onclick="editarCoche(${coche.id})</td>
                <td><button class="btn btn-primary" onclick="borrarCoche(${coche.id})</td>
            </tr>
        `;
        // Agregamos la fila al tbody
        tbody.innerHTML += fila;
    });
}
